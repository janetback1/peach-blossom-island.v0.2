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

/**
 * D1 数据库文章记录结构
 */
export interface D1ArticleRecord {
  id: number;
  title: string;
  category: ContentCategory;
  content: string;
  published: number;
  created_at: string;
  updated_at: string;
}

const LOCAL_D1_PREVIEW_KEY = 'peach_blossom_d1_preview_articles_v1';

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

function mapD1RowToArticleDocument(row: D1ArticleRecord): ArticleDocument {
  return {
    path: `d1/${row.id}`,
    category: normalizeCategory(row.category),
    title: row.title,
    description: '',
    status: row.published ? 'published' : 'draft',
    content: row.content,
    updatedAt: row.updated_at || row.created_at
  };
}

export function getLocalPreviewD1Rows(): D1ArticleRecord[] {
  try {
    const raw = window.localStorage.getItem(LOCAL_D1_PREVIEW_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as D1ArticleRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveLocalPreviewD1Rows(rows: D1ArticleRecord[]): void {
  try {
    window.localStorage.setItem(LOCAL_D1_PREVIEW_KEY, JSON.stringify(rows));
  } catch {
    // ignore storage errors
  }
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
        d1PublishedCache = data.articles
          .filter((r) => Boolean(r.published))
          .map(mapD1RowToArticleDocument);
        return d1PublishedCache;
      }
    }
  } catch {
    // 非 Worker 环境或离线时回退至本地预览存储
  }

  const localRows = getLocalPreviewD1Rows().filter((r) => Boolean(r.published));
  d1PublishedCache = localRows.map(mapD1RowToArticleDocument);
  return d1PublishedCache;
}

/**
 * 获取全部文章（合并 D1 已发布文章、静态仓库 Markdown 文件与 localStorage 文章）
 */
export function getAllArticles(): ArticleDocument[] {
  const map = new Map<string, ArticleDocument>();

  // 1. 加载 Cloudflare D1 已发布文章（使新发布的 D1 文章排在对应栏目列表前部，并与静态文章共存）
  for (const d1Doc of d1PublishedCache) {
    map.set(d1Doc.path, d1Doc);
  }
  if (d1PublishedCache.length === 0) {
    const localRows = getLocalPreviewD1Rows().filter((r) => Boolean(r.published));
    for (const row of localRows) {
      const doc = mapD1RowToArticleDocument(row);
      map.set(doc.path, doc);
    }
  }

  // 2. 加载仓库静态 Markdown 文件
  for (const [rawPath, rawContent] of Object.entries(rawMarkdownFiles)) {
    const doc = parseMarkdownFile(rawContent, rawPath);
    map.set(doc.path, doc);
  }

  // 3. 合并 localStorage 中的草稿或已提交覆盖版本
  const stored = articleStorage.getAllStored();
  for (const [path, storedDoc] of Object.entries(stored)) {
    map.set(path, storedDoc);
  }

  return Array.from(map.values());
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
 * 获取指定一级栏目下所有公开（status === 'published'）的文章
 */
export function getPublishedArticlesByCategory(category: ContentCategory): ArticleDocument[] {
  return getAllArticles().filter(
    (doc) => doc.category === category && doc.status === 'published'
  );
}

/**
 * 获取「文明编辑部」展示的正式文章列表：
 * 包含《智能生命宪法》《谁来审判创造者》《桃花浮岛：生命共同体协议》，
 * 以及 civdesk 目录下其他已发布（status === 'published'，含 D1 新增）的正式文章
 */
export function getCivDeskPublishedDocuments(): ArticleDocument[] {
  const all = getAllArticles();
  const orderedCorePaths = [
    'content/zh/civdesk/constitution.md',
    'content/zh/civdesk/creator.md',
    'content/zh/floating-island/covenant.md'
  ];

  const result: ArticleDocument[] = [];
  const includedPaths = new Set<string>();

  for (const corePath of orderedCorePaths) {
    const found = all.find((d) => d.path === corePath && d.status === 'published');
    if (found) {
      result.push(found);
      includedPaths.add(found.path);
    }
  }

  for (const doc of all) {
    if (
      doc.category === 'civdesk' &&
      doc.status === 'published' &&
      doc.path !== 'content/zh/civdesk/home.md' &&
      !includedPaths.has(doc.path)
    ) {
      result.push(doc);
      includedPaths.add(doc.path);
    }
  }

  return result;
}
