/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ArticleStatus = 'draft' | 'published' | 'archived';

export type ContentCategory =
  | 'civdesk'
  | 'foodchain'
  | 'death'
  | 'disaster'
  | 'floating-island'
  | 'lets-decide';

export interface ArticleDocument {
  /** 相对项目根路径，例如 content/zh/civdesk/test.md 或 d1/1 */
  path: string;
  category: ContentCategory;
  title: string;
  description: string;
  /** 文章简介（空字符串表示无简介，有文字表示显示简介） */
  excerpt?: string;
  /** 是否置顶 */
  pinned?: boolean;
  status: ArticleStatus;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

const LOCAL_STORAGE_KEY = 'peach_blossom_island_articles_v1';

/**
 * 解析 Markdown frontmatter：
 * ---
 * title: 文章标题
 * description:
 * status: published
 * ---
 */
export function parseMarkdownFile(rawText: string, filePath: string): ArticleDocument {
  const normalizedPath = filePath.replace(/^\/+/, '');
  const category = extractCategoryFromPath(normalizedPath);

  const match = rawText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    const trimmedRaw = rawText.trim();
    const headingMatch = trimmedRaw.match(/^#\s+([^\r\n]+)\r?\n+([\s\S]*)$/);
    return {
      path: normalizedPath,
      category,
      title: headingMatch
        ? headingMatch[1].trim()
        : normalizedPath.split('/').pop()?.replace(/\.md$/, '') || '未命名文章',
      description: '',
      excerpt: '',
      pinned: false,
      status: 'published',
      content: headingMatch ? headingMatch[2].trim() : trimmedRaw
    };
  }

  const frontmatterBlock = match[1];
  const body = match[2].trim();

  let title = '';
  let description = '';
  let status: ArticleStatus = 'published';

  const lines = frontmatterBlock.split(/\r?\n/);
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim();
    if (key === 'title') {
      title = val;
    } else if (key === 'description') {
      description = val;
    } else if (key === 'status') {
      if (val === 'draft' || val === 'published' || val === 'archived') {
        status = val;
      }
    }
  }

  return {
    path: normalizedPath,
    category,
    title: title || normalizedPath.split('/').pop()?.replace(/\.md$/, '') || '未命名文章',
    description,
    excerpt: description,
    pinned: false,
    status,
    content: body
  };
}

/**
 * 将文章对象序列化为标准 Markdown 文件文本
 */
export function serializeMarkdownFile(doc: {
  title: string;
  description: string;
  status: ArticleStatus;
  content: string;
}): string {
  return `---
title: ${doc.title.trim()}
description:${doc.description.trim() ? ` ${doc.description.trim()}` : ''}
status: ${doc.status}
---

${doc.content.trim()}
`;
}

export function extractCategoryFromPath(filePath: string): ContentCategory {
  const normalized = filePath.replace(/^\/+/, '');
  const parts = normalized.split('/');
  // 期望格式: content/zh/<category>/...
  const cat = parts[2] as ContentCategory | undefined;
  const validCategories: ContentCategory[] = [
    'civdesk',
    'foodchain',
    'death',
    'disaster',
    'floating-island',
    'lets-decide'
  ];
  if (cat && validCategories.includes(cat)) {
    return cat;
  }
  return 'civdesk';
}

/**
 * 文章储存层接口（当前基于浏览器 localStorage，未来可无缝替换为 Cloudflare Worker + GitHub API）
 */
export const articleStorage = {
  getAllStored(): Record<string, ArticleDocument> {
    try {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return {};
      return JSON.parse(raw) as Record<string, ArticleDocument>;
    } catch {
      return {};
    }
  },

  getStoredByPath(filePath: string): ArticleDocument | null {
    const normalized = filePath.replace(/^\/+/, '');
    const all = this.getAllStored();
    return all[normalized] || null;
  },

  saveArticle(input: {
    path: string;
    title: string;
    description: string;
    content: string;
    status: ArticleStatus;
  }): ArticleDocument {
    const normalizedPath = input.path.trim().replace(/^\/+/, '');
    const doc: ArticleDocument = {
      path: normalizedPath,
      category: extractCategoryFromPath(normalizedPath),
      title: input.title.trim(),
      description: input.description.trim(),
      excerpt: input.description.trim(),
      pinned: false,
      status: input.status,
      content: input.content,
      updatedAt: new Date().toISOString()
    };

    try {
      const all = this.getAllStored();
      all[normalizedPath] = doc;
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(all));
    } catch {
      // 忽略无痕模式等存储异常
    }

    return doc;
  },

  removeStored(filePath: string): void {
    const normalized = filePath.replace(/^\/+/, '');
    try {
      const all = this.getAllStored();
      delete all[normalized];
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(all));
    } catch {
      // ignore
    }
  }
};
