/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Cloudflare Worker Entry (peach-blossom-island-v0-2)
 * 提供基于 Cloudflare D1 (binding: DB) 的前台文章读取 API 与 /admin 后台管理 API，
 * 支持文章简介 (excerpt)、文章置顶 (pinned)、发布/下架 (published) 以及已有正式文章的自动无损迁移，
 * 其余请求交由静态 Assets (SPA) 处理。
 */

import {
  DEFAULT_SEED_ARTICLES,
  normalizeTitleForMatch
} from './src/content/defaultArticles';

export interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta?: {
    last_row_id?: number;
    changes?: number;
  };
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = unknown>(): Promise<D1Result<T>>;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run(): Promise<D1Result>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  exec(query: string): Promise<unknown>;
}

export interface AssetsFetcher {
  fetch(request: Request | string): Promise<Response>;
}

export interface Env {
  DB?: D1Database;
  ASSETS?: AssetsFetcher;
  /**
   * 可选环境变量：若设为 "true"，则当请求缺少 Cloudflare Access 认证头时拒绝访问后台 API
   */
  ADMIN_REQUIRE_ACCESS?: string;
}

export interface D1ArticleRow {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  published: number;
  pinned: number;
  created_at: string;
  updated_at: string;
}

const VALID_CATEGORIES = new Set([
  'floating-island',
  'foodchain',
  'death',
  'disaster',
  'lets-decide',
  'civdesk'
]);

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

/**
 * 将缺失的内置正式文章安全补齐到 D1（按规范化标题比对，绝不覆盖或重复插入已有文章）
 */
async function seedMissingDefaultArticles(db: D1Database): Promise<number> {
  const { results: existingRows } = await db
    .prepare(`SELECT id, title FROM articles`)
    .all<{ id: number; title: string }>();

  const existingNormalizedTitles = new Set(
    (existingRows || []).map((r) => normalizeTitleForMatch(r.title))
  );

  let addedCount = 0;
  for (const seed of DEFAULT_SEED_ARTICLES) {
    const norm = normalizeTitleForMatch(seed.title);
    if (!existingNormalizedTitles.has(norm)) {
      await db
        .prepare(
          `INSERT INTO articles (title, category, excerpt, content, published, pinned, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(
          seed.title,
          seed.category,
          seed.excerpt,
          seed.content,
          seed.published,
          seed.pinned,
          seed.created_at,
          seed.created_at
        )
        .run();
      existingNormalizedTitles.add(norm);
      addedCount += 1;
    }
  }

  return addedCount;
}

/**
 * 确保 D1 表结构存在并兼容升级已有数据库（自动补充 excerpt 与 pinned 列，不破坏已有数据）
 */
async function ensureTableExists(db: D1Database): Promise<void> {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        excerpt TEXT NOT NULL DEFAULT '',
        content TEXT NOT NULL,
        published INTEGER NOT NULL DEFAULT 1,
        pinned INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')),
        updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now'))
      )`
    )
    .run();

  // 检查现有表的列，若旧表尚无 excerpt 或 pinned 字段则安全执行增量 ALTER TABLE
  const { results: columns } = await db
    .prepare(`PRAGMA table_info(articles)`)
    .all<{ name: string }>();
  const colNames = new Set((columns || []).map((c) => c.name));

  if (!colNames.has('excerpt')) {
    await db
      .prepare(`ALTER TABLE articles ADD COLUMN excerpt TEXT NOT NULL DEFAULT ''`)
      .run();
  }

  if (!colNames.has('pinned')) {
    await db
      .prepare(`ALTER TABLE articles ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0`)
      .run();
  }

  // 一次性自动将现有静态正式文章补齐到 D1（若尚未执行过），以便直接通过手机 /admin 管理全部正式文章
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS _admin_meta (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )`
    )
    .run();

  const seededFlag = await db
    .prepare(`SELECT value FROM _admin_meta WHERE key = 'seed_formal_articles_v1'`)
    .first<{ value: string }>();

  if (!seededFlag) {
    await seedMissingDefaultArticles(db);
    await db
      .prepare(
        `INSERT OR REPLACE INTO _admin_meta (key, value) VALUES ('seed_formal_articles_v1', '1')`
      )
      .run();
  }
}

function checkCloudflareAccess(request: Request, env: Env): {
  allowed: boolean;
  email: string | null;
} {
  const email =
    request.headers.get('Cf-Access-Authenticated-User-Email') ||
    request.headers.get('cf-access-authenticated-user-email') ||
    null;
  const jwt =
    request.headers.get('Cf-Access-Jwt-Assertion') ||
    request.headers.get('cf-access-jwt-assertion') ||
    null;

  if (env.ADMIN_REQUIRE_ACCESS === 'true' && !email && !jwt) {
    return { allowed: false, email: null };
  }

  return { allowed: true, email };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method.toUpperCase();

    // 1. 公开前台接口：获取已发布的 D1 文章列表（置顶优先，其次按创建时间倒序）
    if (pathname === '/api/articles' && method === 'GET') {
      if (!env.DB) {
        return jsonResponse({ articles: [], dbBound: false });
      }
      try {
        await ensureTableExists(env.DB);
        const category = url.searchParams.get('category');
        let stmt: D1PreparedStatement;
        if (category && VALID_CATEGORIES.has(category)) {
          stmt = env.DB
            .prepare(
              `SELECT id, title, category, excerpt, content, published, pinned, created_at, updated_at
               FROM articles
               WHERE published = 1 AND category = ?
               ORDER BY pinned DESC, datetime(created_at) DESC, id DESC`
            )
            .bind(category);
        } else {
          stmt = env.DB.prepare(
            `SELECT id, title, category, excerpt, content, published, pinned, created_at, updated_at
             FROM articles
             WHERE published = 1
             ORDER BY pinned DESC, datetime(created_at) DESC, id DESC`
          );
        }
        const { results } = await stmt.all<D1ArticleRow>();
        return jsonResponse({ articles: results || [], dbBound: true });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Database query error';
        return jsonResponse({ articles: [], dbBound: true, error: message }, 500);
      }
    }

    // 2. 后台管理接口：支持 /admin/api/articles 与 /api/admin/articles
    //    将其置于 /admin/api/* 下可使一条 Cloudflare Access (/admin*) 规则同时保护页面与 API
    const isAdminApi =
      pathname === '/admin/api/articles' ||
      pathname.startsWith('/admin/api/articles/') ||
      pathname === '/api/admin/articles' ||
      pathname.startsWith('/api/admin/articles/');

    if (isAdminApi) {
      const access = checkCloudflareAccess(request, env);
      if (!access.allowed) {
        return jsonResponse(
          { error: 'Unauthorized: Cloudflare Access authentication required.' },
          401
        );
      }

      if (!env.DB) {
        return jsonResponse(
          {
            error:
              '尚未绑定 D1 数据库 (binding: DB)。请在 Cloudflare Worker 设置中绑定 D1 数据库为 DB。',
            dbBound: false,
            articles: []
          },
          503
        );
      }

      try {
        await ensureTableExists(env.DB);

        // 手动触发补齐内置正式文章（仅补齐缺失项，不覆盖已有数据）
        if (pathname.endsWith('/articles/sync-defaults') && method === 'POST') {
          const addedCount = await seedMissingDefaultArticles(env.DB);
          const { results } = await env.DB
            .prepare(
              `SELECT id, title, category, excerpt, content, published, pinned, created_at, updated_at
               FROM articles
               ORDER BY pinned DESC, datetime(updated_at) DESC, id DESC`
            )
            .all<D1ArticleRow>();
          return jsonResponse({
            success: true,
            addedCount,
            articles: results || []
          });
        }

        const idMatch = pathname.match(/\/articles\/(\d+)$/);
        const articleId = idMatch ? Number(idMatch[1]) : null;

        // GET: 获取全部文章（含已发布与已下架，置顶优先）
        if (method === 'GET' && articleId === null) {
          const { results } = await env.DB
            .prepare(
              `SELECT id, title, category, excerpt, content, published, pinned, created_at, updated_at
               FROM articles
               ORDER BY pinned DESC, datetime(updated_at) DESC, id DESC`
            )
            .all<D1ArticleRow>();
          return jsonResponse({
            articles: results || [],
            dbBound: true,
            accessEmail: access.email
          });
        }

        // POST: 新建文章
        if (method === 'POST' && articleId === null) {
          const body = (await request.json()) as {
            title?: string;
            category?: string;
            excerpt?: string;
            content?: string;
            published?: boolean | number;
            pinned?: boolean | number;
          };

          const title = (body.title || '').trim();
          const category = (body.category || 'foodchain').trim();
          const excerpt = (body.excerpt ?? '').trim();
          const content = body.content ?? '';
          const published =
            body.published === undefined ? 1 : body.published ? 1 : 0;
          const pinned = body.pinned ? 1 : 0;

          if (!title) {
            return jsonResponse({ error: '请输入文章标题' }, 400);
          }
          if (!VALID_CATEGORIES.has(category)) {
            return jsonResponse({ error: '无效的文章栏目' }, 400);
          }

          const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
          const runResult = await env.DB
            .prepare(
              `INSERT INTO articles (title, category, excerpt, content, published, pinned, created_at, updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
            )
            .bind(title, category, excerpt, content, published, pinned, now, now)
            .run();

          const insertedId = runResult.meta?.last_row_id;
          const created = insertedId
            ? await env.DB
                .prepare(
                  `SELECT id, title, category, excerpt, content, published, pinned, created_at, updated_at
                   FROM articles WHERE id = ?`
                )
                .bind(insertedId)
                .first<D1ArticleRow>()
            : null;

          return jsonResponse({ article: created, success: true }, 201);
        }

        // PUT / PATCH: 更新文章、修改简介、切换发布/下架状态或切换置顶状态
        if ((method === 'PUT' || method === 'PATCH') && articleId !== null) {
          const existing = await env.DB
            .prepare(
              `SELECT id, title, category, excerpt, content, published, pinned, created_at, updated_at
               FROM articles WHERE id = ?`
            )
            .bind(articleId)
            .first<D1ArticleRow>();

          if (!existing) {
            return jsonResponse({ error: '未找到该文章' }, 404);
          }

          const body = (await request.json()) as {
            title?: string;
            category?: string;
            excerpt?: string;
            content?: string;
            published?: boolean | number;
            pinned?: boolean | number;
          };

          const nextTitle =
            body.title !== undefined ? body.title.trim() : existing.title;
          const nextCategory =
            body.category !== undefined ? body.category.trim() : existing.category;
          const nextExcerpt =
            body.excerpt !== undefined ? body.excerpt.trim() : (existing.excerpt ?? '');
          const nextContent =
            body.content !== undefined ? body.content : existing.content;
          const nextPublished =
            body.published !== undefined
              ? body.published
                ? 1
                : 0
              : existing.published;
          const nextPinned =
            body.pinned !== undefined
              ? body.pinned
                ? 1
                : 0
              : (existing.pinned ?? 0);

          if (!nextTitle) {
            return jsonResponse({ error: '文章标题不能为空' }, 400);
          }
          if (!VALID_CATEGORIES.has(nextCategory)) {
            return jsonResponse({ error: '无效的文章栏目' }, 400);
          }

          const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
          await env.DB
            .prepare(
              `UPDATE articles
               SET title = ?, category = ?, excerpt = ?, content = ?, published = ?, pinned = ?, updated_at = ?
               WHERE id = ?`
            )
            .bind(
              nextTitle,
              nextCategory,
              nextExcerpt,
              nextContent,
              nextPublished,
              nextPinned,
              now,
              articleId
            )
            .run();

          const updated = await env.DB
            .prepare(
              `SELECT id, title, category, excerpt, content, published, pinned, created_at, updated_at
               FROM articles WHERE id = ?`
            )
            .bind(articleId)
            .first<D1ArticleRow>();

          return jsonResponse({ article: updated, success: true });
        }

        // DELETE: 删除文章
        if (method === 'DELETE' && articleId !== null) {
          await env.DB
            .prepare(`DELETE FROM articles WHERE id = ?`)
            .bind(articleId)
            .run();
          return jsonResponse({ success: true });
        }

        return jsonResponse({ error: 'Method Not Allowed' }, 405);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Database error';
        return jsonResponse({ error: message }, 500);
      }
    }

    // 3. 其余请求交由 Cloudflare Assets 处理（SPA 路由回退至 index.html）
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  }
};
