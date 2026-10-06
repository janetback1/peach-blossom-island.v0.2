/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ArticleDocument,
  ContentCategory,
  articleStorage,
  parseMarkdownFile
} from './storage';
import {
  DEFAULT_SEED_ARTICLES,
  normalizeTitleForMatch
} from './defaultArticles';

/**
 * D1 数据库文章记录结构（含简介 excerpt 与置顶 pinned）
 */
export interface D1ArticleRecord {
  id: number;
  title: string;
  category: ContentCategory;
  excerpt: string;
  content: string;
  published: number;
  pinned: number;
  created_at: string;
  updated_at: string;
}

const LOCAL_D1_PREVIEW_KEY = 'peach_blossom_d1_preview_articles_v1';
const LOCAL_D1_SEEDED_KEY = 'peach_blossom_d1_preview_seeded_v2';

/**
 * 通过 Vite 原生 import.meta.glob 读取 /content/zh/ 下的所有静态 Markdown 文件
 */
const rawMarkdownFiles = import.meta.glob('/content/zh/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

/**
 * 内存缓存：从 Cloudflare Worker (/api/articles) 获取的已发布 D1 文章
 */
let d1PublishedCache: ArticleDocument[] = [];
let hasSyncedWithRemoteD1 = false;

function normalizeCategory(rawCategory: string): ContentCategory {
  const map: Record<string, ContentCategory> = {
    'floating-island': 'floating-island',
    '桃花浮岛': 'floating-island',
    foodchain: 'foodchain',
    '弱肉强食': 'foodchain',
    death: 'death',
    '生老病死': 'death',
    disaster: 'disaster',
    '自然灾害': 'disaster',
    'lets-decide': 'lets-decide',
    "Let's Decide": 'lets-decide',
    civdesk: 'civdesk',
    '文明编辑部': 'civdesk'
  };
  return map[rawCategory] || 'foodchain';
}

function normalizeD1Record(row: Partial<D1ArticleRecord> & { id: number; title: string; category: string; content: string }): D1ArticleRecord {
  const created = row.created_at || '2026-01-01 00:00:00';
  return {
    id: Number(row.id),
    title: row.title || '',
    category: normalizeCategory(row.category),
    excerpt: typeof row.excerpt === 'string' ? row.excerpt : '',
    content: row.content ?? '',
    published: row.published === undefined ? 1 : row.published ? 1 : 0,
    pinned: row.pinned ? 1 : 0,
    created_at: created,
    updated_at: row.updated_at || created
  };
}

function mapD1RowToArticleDocument(row: D1ArticleRecord): ArticleDocument {
  const norm = normalizeD1Record(row);
  return {
    path: `d1/${norm.id}`,
    category: norm.category,
    title: norm.title,
    description: norm.excerpt,
    excerpt: norm.excerpt,
    pinned: Boolean(norm.pinned),
    status: norm.published ? 'published' : 'draft',
    content: norm.content,
    createdAt: norm.created_at,
    updatedAt: norm.updated_at || norm.created_at
  };
}

function sortD1RowsForPublic(rows: D1ArticleRecord[]): D1ArticleRecord[] {
  return [...rows].sort((a, b) => {
    const pinDiff = (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
    if (pinDiff !== 0) return pinDiff;
    const timeDiff = (b.created_at || '').localeCompare(a.created_at || '');
    if (timeDiff !== 0) return timeDiff;
    return b.id - a.id;
  });
}

function sortD1RowsForAdmin(rows: D1ArticleRecord[]): D1ArticleRecord[] {
  return [...rows].sort((a, b) => {
    const pinDiff = (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
    if (pinDiff !== 0) return pinDiff;
    const timeDiff = (b.updated_at || '').localeCompare(a.updated_at || '');
    if (timeDiff !== 0) return timeDiff;
    return b.id - a.id;
  });
}

/**
 * 本地预览环境下读取模拟 D1 数据（首次访问时自动补齐内置正式文章）
 */
export function getLocalPreviewD1Rows(): D1ArticleRecord[] {
  try {
    const raw = window.localStorage.getItem(LOCAL_D1_PREVIEW_KEY);
    let rows: D1ArticleRecord[] = [];
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        rows = parsed.map((r) => normalizeD1Record(r));
      }
    }

    const seeded = window.localStorage.getItem(LOCAL_D1_SEEDED_KEY);
    if (!seeded) {
      const existingTitles = new Set(
        rows.map((r) => normalizeTitleForMatch(r.title))
      );
      let nextId = rows.reduce((max, r) => (r.id > max ? r.id : max), 0) + 1;

      for (const seed of DEFAULT_SEED_ARTICLES) {
        const normTitle = normalizeTitleForMatch(seed.title);
        if (!existingTitles.has(normTitle)) {
          rows.push({
            id: nextId++,
            title: seed.title,
            category: seed.category,
            excerpt: seed.excerpt,
            content: seed.content,
            published: seed.published,
            pinned: seed.pinned,
            created_at: seed.created_at,
            updated_at: seed.created_at
          });
          existingTitles.add(normTitle);
        }
      }

      window.localStorage.setItem(LOCAL_D1_PREVIEW_KEY, JSON.stringify(rows));
      window.localStorage.setItem(LOCAL_D1_SEEDED_KEY, '1');
    }

    return sortD1RowsForAdmin(rows);
  } catch {
    return DEFAULT_SEED_ARTICLES.map((seed, idx) => ({
      id: idx + 1,
      title: seed.title,
      category: seed.category,
      excerpt: seed.excerpt,
      content: seed.content,
      published: seed.published,
      pinned: seed.pinned,
      created_at: seed.created_at,
      updated_at: seed.created_at
    }));
  }
}

export function saveLocalPreviewD1Rows(rows: D1ArticleRecord[]): void {
  try {
    const normalized = rows.map((r) => normalizeD1Record(r));
    window.localStorage.setItem(
      LOCAL_D1_PREVIEW_KEY,
      JSON.stringify(normalized)
    );
    window.localStorage.setItem(LOCAL_D1_SEEDED_KEY, '1');
  } catch {
    // ignore storage errors
  }
}

/**
 * 在本地预览环境中安全补齐缺失的内置正式文章
 */
export function syncLocalMissingDefaultArticles(): number {
  const rows = getLocalPreviewD1Rows();
  const existingTitles = new Set(
    rows.map((r) => normalizeTitleForMatch(r.title))
  );
  let nextId = rows.reduce((max, r) => (r.id > max ? r.id : max), 0) + 1;
  let added = 0;

  for (const seed of DEFAULT_SEED_ARTICLES) {
    const normTitle = normalizeTitleForMatch(seed.title);
    if (!existingTitles.has(normTitle)) {
      rows.push({
        id: nextId++,
        title: seed.title,
        category: seed.category,
        excerpt: seed.excerpt,
        content: seed.content,
        published: seed.published,
        pinned: seed.pinned,
        created_at: seed.created_at,
        updated_at: seed.created_at
      });
      existingTitles.add(normTitle);
      added += 1;
    }
  }

  if (added > 0) {
    saveLocalPreviewD1Rows(rows);
  }
  return added;
}

/**
 * 从 Cloudflare Worker /api/articles 同步已发布的 D1 文章至前端缓存
 */
export async function syncD1PublishedArticles(): Promise<ArticleDocument[]> {
  try {
    const res = await fetch('/api/articles', {
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    });
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = (await res.json()) as {
        articles?: D1ArticleRecord[];
        dbBound?: boolean;
      };
      if (Array.isArray(data.articles) && data.dbBound !== false) {
        hasSyncedWithRemoteD1 = true;
        const normalizedRows = sortD1RowsForPublic(
          data.articles
            .map((r) => normalizeD1Record(r))
            .filter((r) => Boolean(r.published))
        );
        d1PublishedCache = normalizedRows.map(mapD1RowToArticleDocument);
        return d1PublishedCache;
      }
    }
  } catch {
    // 非 Worker 环境或离线时回退至本地预览存储
  }

  hasSyncedWithRemoteD1 = false;
  const localPublished = sortD1RowsForPublic(
    getLocalPreviewD1Rows().filter((r) => Boolean(r.published))
  );
  d1PublishedCache = localPublished.map(mapD1RowToArticleDocument);
  return d1PublishedCache;
}

/**
 * 获取当前生效的正式文章列表（以 D1 后台管理的文章为准，支持置顶、下架与简介修改）
 */
export function getAllArticles(): ArticleDocument[] {
  if (hasSyncedWithRemoteD1) {
    return [...d1PublishedCache];
  }

  if (d1PublishedCache.length > 0) {
    return [...d1PublishedCache];
  }

  const localPublished = sortD1RowsForPublic(
    getLocalPreviewD1Rows().filter((r) => Boolean(r.published))
  );
  return localPublished.map(mapD1RowToArticleDocument);
}

/**
 * 按文件路径或 D1 ID (d1/<id>) 读取单篇文章
 */
export function getArticleByPath(filePath: string): ArticleDocument | null {
  const normalized = filePath.replace(/^\/+/, '');

  if (normalized.startsWith('d1/')) {
    const foundInCache = d1PublishedCache.find((d) => d.path === normalized);
    if (foundInCache) return foundInCache;

    const idNum = Number(normalized.replace(/^d1\//, ''));
    const localFound = getLocalPreviewD1Rows().find((r) => r.id === idNum);
    if (localFound) return mapD1RowToArticleDocument(localFound);
  }

  const stored = articleStorage.getStoredByPath(normalized);
  if (stored) return stored;

  const rawKey = `/${normalized}`;
  const rawContent = rawMarkdownFiles[rawKey];
  if (rawContent !== undefined) {
    return parseMarkdownFile(rawContent, normalized);
  }

  return null;
}

/**
 * 获取指定一级栏目下所有公开（status === 'published'）的文章（置顶优先，其次按创建时间倒序）
 */
export function getPublishedArticlesByCategory(
  category: ContentCategory
): ArticleDocument[] {
  return getAllArticles().filter(
    (doc) => doc.category === category && doc.status === 'published'
  );
}

/**
 * 获取「文明编辑部」展示的正式文章列表（置顶优先，支持在 /admin 中直接编辑、发布、下架、置顶和修改简介）
 */
export function getCivDeskPublishedDocuments(): ArticleDocument[] {
  return getPublishedArticlesByCategory('civdesk');
}
