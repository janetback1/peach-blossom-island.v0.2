/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ContentCategory } from '../content/storage';
import {
  D1ArticleRecord,
  getLocalPreviewD1Rows,
  saveLocalPreviewD1Rows,
  syncD1PublishedArticles
} from '../content/loader';

interface AdminD1ViewProps {
  onBackToSite: () => void;
  onArticlesChanged: () => void;
}

const CATEGORY_OPTIONS: { value: ContentCategory; label: string }[] = [
  { value: 'floating-island', label: '桃花浮岛' },
  { value: 'foodchain', label: '弱肉强食' },
  { value: 'death', label: '生老病死' },
  { value: 'disaster', label: '自然灾害' },
  { value: 'lets-decide', label: "Let's Decide" },
  { value: 'civdesk', label: '文明编辑部' }
];

function getCategoryLabel(cat: string): string {
  return CATEGORY_OPTIONS.find((c) => c.value === cat)?.label || cat;
}

function nowFormatted(): string {
  return new Date().toISOString().replace('T', ' ').slice(0, 19);
}

export const AdminD1View: React.FC<AdminD1ViewProps> = ({
  onBackToSite,
  onArticlesChanged
}) => {
  const [articles, setArticles] = useState<D1ArticleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dbBound, setDbBound] = useState<boolean | null>(null);
  const [accessEmail, setAccessEmail] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // 编辑 / 新建模式状态
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ContentCategory>('foodchain');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState<boolean>(true);
  const [pinned, setPinned] = useState<boolean>(false);
  const [createdAt, setCreatedAt] = useState<string>('');
  const [updatedAt, setUpdatedAt] = useState<string>('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const showTempNotice = (msg: string) => {
    setNotice(msg);
    window.setTimeout(() => {
      setNotice((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const loadArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/admin/api/articles', {
        headers: { Accept: 'application/json' },
        cache: 'no-store'
      });
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = (await res.json()) as {
          articles?: D1ArticleRecord[];
          dbBound?: boolean;
          accessEmail?: string | null;
          error?: string;
        };
        if (res.status === 503 && data.dbBound === false) {
          setDbBound(false);
          setArticles(getLocalPreviewD1Rows());
          setLoading(false);
          return;
        }
        if (res.ok && Array.isArray(data.articles)) {
          setDbBound(true);
          setAccessEmail(data.accessEmail || null);
          setArticles(
            data.articles.map((r) => ({
              ...r,
              excerpt: r.excerpt ?? '',
              pinned: r.pinned ? 1 : 0
            }))
          );
          setLoading(false);
          return;
        }
      }
    } catch {
      // 本地预览环境回退
    }

    setDbBound(false);
    setArticles(getLocalPreviewD1Rows());
    setLoading(false);
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const handleStartCreate = () => {
    setEditingId(null);
    setTitle('');
    setCategory(
      filterCategory !== 'all'
        ? (filterCategory as ContentCategory)
        : 'foodchain'
    );
    setExcerpt('');
    setContent('');
    setPublished(true);
    setPinned(false);
    setCreatedAt('');
    setUpdatedAt('');
    setMode('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartEdit = (row: D1ArticleRecord) => {
    setEditingId(row.id);
    setTitle(row.title);
    setCategory(row.category);
    setExcerpt(row.excerpt ?? '');
    setContent(row.content);
    setPublished(Boolean(row.published));
    setPinned(Boolean(row.pinned));
    setCreatedAt(row.created_at);
    setUpdatedAt(row.updated_at);
    setMode('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async (targetPublished?: boolean) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      showTempNotice('请填写文章标题');
      return;
    }

    const finalPublished =
      targetPublished !== undefined ? targetPublished : published;
    const trimmedExcerpt = excerpt.trim();

    setSaving(true);
    try {
      if (dbBound) {
        const url =
          editingId === null
            ? '/admin/api/articles'
            : `/admin/api/articles/${editingId}`;
        const method = editingId === null ? 'POST' : 'PUT';
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: trimmedTitle,
            category,
            excerpt: trimmedExcerpt,
            content,
            published: finalPublished ? 1 : 0,
            pinned: pinned ? 1 : 0
          })
        });
        const data = (await res.json()) as {
          error?: string;
          article?: D1ArticleRecord;
        };
        if (!res.ok) {
          showTempNotice(data.error || '保存失败');
          setSaving(false);
          return;
        }
      } else {
        // 本地未绑定 D1 时的预览存储
        const rows = getLocalPreviewD1Rows();
        const now = nowFormatted();
        if (editingId === null) {
          const nextId =
            rows.reduce((max, r) => (r.id > max ? r.id : max), 0) + 1;
          rows.unshift({
            id: nextId,
            title: trimmedTitle,
            category,
            excerpt: trimmedExcerpt,
            content,
            published: finalPublished ? 1 : 0,
            pinned: pinned ? 1 : 0,
            created_at: now,
            updated_at: now
          });
        } else {
          const idx = rows.findIndex((r) => r.id === editingId);
          if (idx !== -1) {
            rows[idx] = {
              ...rows[idx],
              title: trimmedTitle,
              category,
              excerpt: trimmedExcerpt,
              content,
              published: finalPublished ? 1 : 0,
              pinned: pinned ? 1 : 0,
              updated_at: now
            };
          }
        }
        saveLocalPreviewD1Rows(rows);
      }

      await loadArticles();
      await syncD1PublishedArticles();
      onArticlesChanged();
      setMode('list');
      showTempNotice(editingId === null ? '已新建文章' : '已更新文章');
    } catch {
      showTempNotice('保存时发生网络错误');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (row: D1ArticleRecord) => {
    const nextPub = row.published ? 0 : 1;
    try {
      if (dbBound) {
        const res = await fetch(`/admin/api/articles/${row.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ published: nextPub })
        });
        if (!res.ok) {
          showTempNotice('状态更新失败');
          return;
        }
      } else {
        const rows = getLocalPreviewD1Rows().map((r) =>
          r.id === row.id
            ? { ...r, published: nextPub, updated_at: nowFormatted() }
            : r
        );
        saveLocalPreviewD1Rows(rows);
      }
      await loadArticles();
      await syncD1PublishedArticles();
      onArticlesChanged();
      showTempNotice(nextPub ? '已发布文章' : '已下架文章');
    } catch {
      showTempNotice('操作失败');
    }
  };

  const handleTogglePin = async (row: D1ArticleRecord) => {
    const nextPin = row.pinned ? 0 : 1;
    try {
      if (dbBound) {
        const res = await fetch(`/admin/api/articles/${row.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pinned: nextPin })
        });
        if (!res.ok) {
          showTempNotice('置顶状态更新失败');
          return;
        }
      } else {
        const rows = getLocalPreviewD1Rows().map((r) =>
          r.id === row.id
            ? { ...r, pinned: nextPin, updated_at: nowFormatted() }
            : r
        );
        saveLocalPreviewD1Rows(rows);
      }
      await loadArticles();
      await syncD1PublishedArticles();
      onArticlesChanged();
      showTempNotice(nextPin ? '已设为置顶' : '已取消置顶');
    } catch {
      showTempNotice('操作失败');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      if (dbBound) {
        const res = await fetch(`/admin/api/articles/${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) {
          showTempNotice('删除失败');
          return;
        }
      } else {
        const rows = getLocalPreviewD1Rows().filter((r) => r.id !== id);
        saveLocalPreviewD1Rows(rows);
      }
      setConfirmDeleteId(null);
      await loadArticles();
      await syncD1PublishedArticles();
      onArticlesChanged();
      showTempNotice('已删除文章');
    } catch {
      showTempNotice('删除失败');
    }
  };

  const filteredArticles =
    filterCategory === 'all'
      ? articles
      : articles.filter((a) => a.category === filterCategory);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-3 pb-14 text-[#3d3832] font-serif-sc space-y-3.5">
      {/* 紧凑单行顶部栏：页面标题与 ↩ 返回列表 / 新建文章 同行排列 */}
      <div className="flex items-center justify-between gap-2 border-b border-[#dfd8c8] pb-2">
        <div className="flex items-baseline gap-2 min-w-0">
          <h1 className="text-sm sm:text-[15px] font-medium text-[#2c2824] tracking-wider shrink-0">
            {mode === 'form'
              ? editingId === null
                ? '新建文章'
                : `编辑文章 #${editingId}`
              : '文章管理后台'}
          </h1>
          {mode === 'list' && (
            <span className="text-[11px] text-[#787066] truncate">
              {dbBound
                ? `D1 已连接${accessEmail ? ` · ${accessEmail}` : ''}`
                : '本地预览存储'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {mode === 'form' ? (
            <button
              type="button"
              onClick={() => setMode('list')}
              aria-label="返回列表"
              className="min-w-[32px] min-h-[32px] px-2.5 py-1 text-sm text-[#4a443c] hover:text-[#26221e] border border-[#d5ccb8] bg-[#f1ece1] transition-colors cursor-pointer flex items-center justify-center"
            >
              ↩
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStartCreate}
              className="min-h-[32px] px-3 py-1 text-xs bg-[#2c2824] text-[#f6f2e9] hover:bg-[#3d3832] transition-colors cursor-pointer"
            >
              + 新建文章
            </button>
          )}
          <button
            type="button"
            onClick={onBackToSite}
            className="min-h-[32px] px-2.5 py-1 text-xs border border-[#cfc6b4] text-[#4a443c] hover:text-[#26221e] transition-colors cursor-pointer"
          >
            返回前台
          </button>
        </div>
      </div>

      {notice && (
        <div className="px-3 py-1.5 text-xs bg-[#efe9da] border border-[#d5ccb8] text-[#2c2824]">
          {notice}
        </div>
      )}

      {mode === 'form' ? (
        /* 新建 / 编辑文章表单 */
        <div className="space-y-3">
          {editingId !== null && (
            <div className="text-[11px] text-[#787066] flex flex-wrap gap-x-4 gap-y-0.5 bg-[#efe9dc]/60 px-2.5 py-1.5 border border-[#e2dac9]">
              <span>创建：{createdAt || '-'}</span>
              <span>更新：{updatedAt || '-'}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs text-[#4a443c]">
              文章标题
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入文章标题"
              className="w-full min-h-[38px] px-3 py-1.5 text-base bg-[#faf7f0] border border-[#d5ccb8] text-[#26221e] focus:outline-none focus:border-[#8c8273]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="space-y-1">
              <label className="block text-xs text-[#4a443c]">
                文章所属栏目
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ContentCategory)}
                className="w-full min-h-[38px] px-2.5 py-1.5 text-base bg-[#faf7f0] border border-[#d5ccb8] text-[#26221e] focus:outline-none focus:border-[#8c8273]"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs text-[#4a443c]">
                发布状态
              </label>
              <select
                value={published ? '1' : '0'}
                onChange={(e) => setPublished(e.target.value === '1')}
                className="w-full min-h-[38px] px-2.5 py-1.5 text-base bg-[#faf7f0] border border-[#d5ccb8] text-[#26221e] focus:outline-none focus:border-[#8c8273]"
              >
                <option value="1">已发布（前台可见）</option>
                <option value="0">已下架（仅后台可见）</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs text-[#4a443c]">
                置顶状态
              </label>
              <select
                value={pinned ? '1' : '0'}
                onChange={(e) => setPinned(e.target.value === '1')}
                className="w-full min-h-[38px] px-2.5 py-1.5 text-base bg-[#faf7f0] border border-[#d5ccb8] text-[#26221e] focus:outline-none focus:border-[#8c8273]"
              >
                <option value="0">普通（按时间排列）</option>
                <option value="1">置顶（排在栏目最前）</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs text-[#4a443c]">
              文章简介（可选，留空则不显示简介）
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="可选：输入简短文章简介，留空则前台列表仅显示标题..."
              className="w-full px-3 py-1.5 text-sm leading-relaxed bg-[#faf7f0] border border-[#d5ccb8] text-[#26221e] focus:outline-none focus:border-[#8c8273]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs text-[#4a443c]">
              Markdown 正文
            </label>
            <textarea
              rows={13}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="在此输入或粘贴 Markdown 正文..."
              className="w-full px-3 py-2 text-base leading-relaxed bg-[#faf7f0] border border-[#d5ccb8] text-[#26221e] focus:outline-none focus:border-[#8c8273]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave(true)}
              className="min-h-[38px] px-4 py-1.5 text-xs sm:text-sm bg-[#2c2824] text-[#f6f2e9] hover:bg-[#3d3832] disabled:opacity-50 transition-colors cursor-pointer"
            >
              {saving ? '保存中...' : '保存并发布'}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave(false)}
              className="min-h-[38px] px-3.5 py-1.5 text-xs sm:text-sm border border-[#cfc6b4] bg-[#f1ece1] text-[#3d3832] hover:text-[#26221e] disabled:opacity-50 transition-colors cursor-pointer"
            >
              保存为下架
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => setMode('list')}
              className="min-h-[38px] px-3 py-1.5 text-xs sm:text-sm text-[#6e665c] hover:text-[#26221e] transition-colors cursor-pointer"
            >
              取消
            </button>
          </div>
        </div>
      ) : (
        /* 文章列表视图 */
        <div className="space-y-3">
          {/* 栏目筛选 */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setFilterCategory('all')}
              className={`px-2 py-0.5 text-xs whitespace-nowrap border cursor-pointer transition-colors ${
                filterCategory === 'all'
                  ? 'border-[#2c2824] bg-[#2c2824] text-[#f6f2e9]'
                  : 'border-[#dfd8c8] bg-[#f1ece1] text-[#635b52]'
              }`}
            >
              全部 ({articles.length})
            </button>
            {CATEGORY_OPTIONS.map((opt) => {
              const count = articles.filter(
                (a) => a.category === opt.value
              ).length;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFilterCategory(opt.value)}
                  className={`px-2 py-0.5 text-xs whitespace-nowrap border cursor-pointer transition-colors ${
                    filterCategory === opt.value
                      ? 'border-[#2c2824] bg-[#2c2824] text-[#f6f2e9]'
                      : 'border-[#dfd8c8] bg-[#f1ece1] text-[#635b52]'
                  }`}
                >
                  {opt.label} ({count})
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="py-6 text-xs sm:text-sm text-[#787066]">正在读取文章列表...</div>
          ) : filteredArticles.length === 0 ? (
            <div className="py-6 text-xs sm:text-sm text-[#787066] border border-[#e2dac9] bg-[#f1ece1]/50 px-3.5">
              当前栏目暂无文章。点击右上角「+ 新建文章」即可添加。
            </div>
          ) : (
            <ul className="divide-y divide-[#dfd8c8] border border-[#dfd8c8] bg-[#faf7f0]">
              {filteredArticles.map((row) => (
                <li key={row.id} className="p-3 sm:p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0">
                      <div className="text-[13.5px] sm:text-[14.5px] font-medium text-[#2c2824] break-words flex flex-wrap items-center gap-1.5">
                        {Boolean(row.pinned) && (
                          <span className="text-[11px] font-semibold text-[#B83A5A] shrink-0">
                            [置顶]
                          </span>
                        )}
                        <span>{row.title}</span>
                      </div>

                      {row.excerpt && row.excerpt.trim() !== '' && (
                        <p className="text-xs text-[#6e665c] leading-relaxed break-words">
                          {row.excerpt}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-[#6e665c]">
                        <span>栏目：{getCategoryLabel(row.category)}</span>
                        <span>
                          状态：
                          <strong
                            className={
                              row.published
                                ? 'text-[#2c2824] font-medium'
                                : 'text-[#8c8273] font-normal'
                            }
                          >
                            {row.published ? '已发布' : '已下架'}
                          </strong>
                        </span>
                        <span className="text-[#8a8175]">
                          更新：{row.updated_at}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 手机端友好操作按钮：编辑 / 发布或下架 / 置顶或取消置顶 / 删除 */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(row)}
                      className="min-h-[30px] px-2.5 py-0.5 text-xs border border-[#cfc6b4] bg-[#f1ece1] text-[#2c2824] hover:bg-[#e6dfd1] cursor-pointer"
                    >
                      编辑
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(row)}
                      className="min-h-[30px] px-2.5 py-0.5 text-xs border border-[#cfc6b4] bg-[#f6f2e9] text-[#4a443c] hover:text-[#26221e] cursor-pointer"
                    >
                      {row.published ? '下架' : '发布'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTogglePin(row)}
                      className={`min-h-[30px] px-2.5 py-0.5 text-xs border cursor-pointer ${
                        row.pinned
                          ? 'border-[#B83A5A]/50 bg-[#f6f2e9] text-[#B83A5A]'
                          : 'border-[#cfc6b4] bg-[#f6f2e9] text-[#4a443c] hover:text-[#26221e]'
                      }`}
                    >
                      {row.pinned ? '取消置顶' : '置顶'}
                    </button>

                    {confirmDeleteId === row.id ? (
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          className="min-h-[30px] px-2.5 py-0.5 text-xs bg-[#B83A5A] text-white cursor-pointer"
                        >
                          确认删除
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="min-h-[30px] px-2 py-0.5 text-xs text-[#6e665c] cursor-pointer"
                        >
                          取消
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(row.id)}
                        className="min-h-[30px] px-2.5 py-0.5 text-xs text-[#8a8175] hover:text-[#B83A5A] cursor-pointer"
                      >
                        删除
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
