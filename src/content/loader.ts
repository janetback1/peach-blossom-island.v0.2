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
 * 通过 Vite 原生 import.meta.glob 读取 /content/zh/ 下的所有静态 Markdown 文件
 */
const rawMarkdownFiles = import.meta.glob('/content/zh/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

/**
 * 获取全部文章（合并静态仓库中的 Markdown 文件与浏览器 localStorage 中保存/提交的文章）
 */
export function getAllArticles(): ArticleDocument[] {
  const map = new Map<string, ArticleDocument>();

  // 1. 加载仓库静态 Markdown 文件
  for (const [rawPath, rawContent] of Object.entries(rawMarkdownFiles)) {
    const doc = parseMarkdownFile(rawContent, rawPath);
    map.set(doc.path, doc);
  }

  // 2. 合并 localStorage 中的草稿或已提交覆盖版本
  const stored = articleStorage.getAllStored();
  for (const [path, storedDoc] of Object.entries(stored)) {
    map.set(path, storedDoc);
  }

  return Array.from(map.values());
}

/**
 * 按文件路径读取单篇文章
 */
export function getArticleByPath(filePath: string): ArticleDocument | null {
  const normalized = filePath.replace(/^\/+/, '');
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
 * 获取首页「文明编辑部」展示的正式文章列表：
 * 包含《智能生命宪法》《谁来审判创造者》《桃花浮岛：生命共同体协议》，
 * 以及 civdesk 目录下其他已发布（status === 'published'）的正式文章（不含首页开篇文本 home.md）
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
