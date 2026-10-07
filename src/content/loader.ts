/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ArticleDocument,
  ContentCategory,
  normalizeCategory,
  parseMarkdownFile
} from './storage';
import { sanitizeArticleText } from '../utils/sanitize';

export const DEFAULT_FOOTER_TEXT = `桃花浮岛

一个关于生命、文明与共同生活的开放性实验。

© 2026 Peach Blossom Island`;

/**
 * D1 数据库文章记录结构（只读）
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

/**
 * 读取 GitHub 仓库 content/articles/*.md 中的 Markdown 文章文件
 */
const rawMarkdownFiles = (
  typeof import.meta.glob === 'function'
    ? import.meta.glob('/content/articles/*.md', {
        query: '?raw',
        import: 'default',
        eager: true
      })
    : {}
) as Record<string, string>;

let d1PublishedCache: ArticleDocument[] = [];
let hasSyncedWithRemoteD1 = false;

function normalizeD1Record(
  row: Partial<D1ArticleRecord> & {
    id: number;
    title: string;
    category: string;
    content: string;
  }
): D1ArticleRecord {
  const created = sanitizeArticleText(row.created_at || '2026-01-01 00:00:00');
  return {
    id: Number(row.id),
    title: sanitizeArticleText(row.title || ''),
    category: normalizeCategory(row.category),
    excerpt:
      typeof row.excerpt === 'string' ? sanitizeArticleText(row.excerpt) : '',
    content: sanitizeArticleText(row.content ?? ''),
    published: row.published === undefined ? 1 : row.published ? 1 : 0,
    pinned: row.pinned ? 1 : 0,
    created_at: created,
    updated_at: sanitizeArticleText(row.updated_at || created)
  };
}

function mapD1RowToArticleDocument(row: D1ArticleRecord): ArticleDocument {
  const norm = normalizeD1Record(row);
  return {
    id: norm.id,
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

function sortArticleDocuments(docs: ArticleDocument[]): ArticleDocument[] {
  return [...docs].sort((a, b) => {
    const pinDiff = (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
    if (pinDiff !== 0) return pinDiff;
    const timeDiff = (b.createdAt || '').localeCompare(a.createdAt || '');
    if (timeDiff !== 0) return timeDiff;
    return (b.id || 0) - (a.id || 0);
  });
}

function getMarkdownArticles(): ArticleDocument[] {
  const docs: ArticleDocument[] = [];
  for (const [rawPath, rawContent] of Object.entries(rawMarkdownFiles)) {
    const doc = parseMarkdownFile(rawContent, rawPath);
    if (doc.status === 'published') {
      docs.push(doc);
    }
  }
  return sortArticleDocuments(docs);
}

/**
 * 读取站点底部 Footer 文字（只读）
 */
export function getSiteFooterText(): string {
  return sanitizeArticleText(DEFAULT_FOOTER_TEXT);
}

/**
 * 从只读 API (GET /api/articles) 读取已发布的 D1 文章
 */
export async function syncD1PublishedArticles(): Promise<ArticleDocument[]> {
  try {
    const res = await fetch('/api/articles', {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    });
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = (await res.json()) as {
        articles?: D1ArticleRecord[];
        dbBound?: boolean;
      };
      if (
        Array.isArray(data.articles) &&
        data.dbBound !== false &&
        data.articles.length > 0
      ) {
        hasSyncedWithRemoteD1 = true;
        const remoteDocs = data.articles
          .map((r) => normalizeD1Record(r))
          .filter((r) => Boolean(r.published))
          .map(mapD1RowToArticleDocument);

        d1PublishedCache = sortArticleDocuments(remoteDocs);
        return d1PublishedCache;
      }
    }
  } catch {
    // 本地开发环境或未连接 Worker 时使用 content/articles/*.md
  }

  hasSyncedWithRemoteD1 = false;
  d1PublishedCache = getMarkdownArticles();
  return d1PublishedCache;
}

/**
 * 获取当前全部公开文章列表（只读）
 */
export function getAllArticles(): ArticleDocument[] {
  if (hasSyncedWithRemoteD1 || d1PublishedCache.length > 0) {
    return [...d1PublishedCache];
  }

  const docs = getMarkdownArticles();
  d1PublishedCache = docs;
  return docs;
}

/**
 * 按路径或 D1 ID (d1/<id>) 读取单篇公开文章
 */
export function getArticleByPath(filePath: string): ArticleDocument | null {
  const normalized = filePath.replace(/^\/+/, '');
  const allCurrent = getAllArticles();
  const foundInCurrent = allCurrent.find((d) => d.path === normalized);
  if (foundInCurrent) return foundInCurrent;

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
 * 获取「文明编辑部」展示的公开文章列表
 */
export function getCivDeskPublishedDocuments(): ArticleDocument[] {
  return getPublishedArticlesByCategory('civdesk');
}
