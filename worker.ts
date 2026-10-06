/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Cloudflare Worker Entry (peach-blossom-island-v0-2)
 * 提供基于 Cloudflare D1 (binding: DB) 的前台文章读取 API 与 /admin 后台管理 API，
 * 其余请求交由静态 Assets (SPA) 处理。
 */

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
  content: string;
  published: number;
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

async function ensureTableExists(db: D1Database): Promise<void> {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        content TEXT NOT NULL,
        published INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now')),
        updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now'))
      )`
    )
    .run();
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

    // 1. 公开前台接口：获取已发布的 D1 文章列表
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
              `SELECT id, title, category, content, published, created_at, updated_at
               FROM articles
               WHERE published = 1 AND category = ?
               ORDER BY datetime(created_at) DESC, id DESC`
            )
            .bind(category);
        } else {
          stmt = env.DB.prepare(
            `SELECT id, title, category, content, published, created_at, updated_at
             FROM articles
             WHERE published = 1
             ORDER BY datetime(created_at) DESC, id DESC`
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

        const idMatch = pathname.match(/\/articles\/(\d+)$/);
        const articleId = idMatch ? Number(idMatch[1]) : null;

        // GET: 获取全部文章（含已发布与已下架）
        if (method === 'GET' && articleId === null) {
          const { results } = await env.DB
            .prepare(
              `SELECT id, title, category, content, published, created_at, updated_at
               FROM articles
               ORDER BY datetime(updated_at) DESC, id DESC`
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
            content?: string;
            published?: boolean | number;
          };

          const title = (body.title || '').trim();
          const category = (body.category || 'foodchain').trim();
          const content = body.content ?? '';
          const published =
            body.published === undefined ? 1 : body.published ? 1 : 0;

          if (!title) {
            return jsonResponse({ error: '请输入文章标题' }, 400);
          }
          if (!VALID_CATEGORIES.has(category)) {
            return jsonResponse({ error: '无效的文章栏目' }, 400);
          }

          const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
          const runResult = await env.DB
            .prepare(
              `INSERT INTO articles (title, category, content, published, created_at, updated_at)
               VALUES (?, ?, ?, ?, ?, ?)`
            )
            .bind(title, category, content, published, now, now)
            .run();

          const insertedId = runResult.meta?.last_row_id;
          const created = insertedId
            ? await env.DB
                .prepare(
                  `SELECT id, title, category, content, published, created_at, updated_at
                   FROM articles WHERE id = ?`
                )
                .bind(insertedId)
                .first<D1ArticleRow>()
            : null;

          return jsonResponse({ article: created, success: true }, 201);
        }

        // PUT / PATCH: 更新文章或切换发布/下架状态
        if ((method === 'PUT' || method === 'PATCH') && articleId !== null) {
          const existing = await env.DB
            .prepare(
              `SELECT id, title, category, content, published, created_at, updated_at
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
            content?: string;
            published?: boolean | number;
          };

          const nextTitle =
            body.title !== undefined ? body.title.trim() : existing.title;
          const nextCategory =
            body.category !== undefined ? body.category.trim() : existing.category;
          const nextContent =
            body.content !== undefined ? body.content : existing.content;
          const nextPublished =
            body.published !== undefined
              ? body.published
                ? 1
                : 0
              : existing.published;

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
               SET title = ?, category = ?, content = ?, published = ?, updated_at = ?
               WHERE id = ?`
            )
            .bind(
              nextTitle,
              nextCategory,
              nextContent,
              nextPublished,
              now,
              articleId
            )
            .run();

          const updated = await env.DB
            .prepare(
              `SELECT id, title, category, content, published, created_at, updated_at
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
