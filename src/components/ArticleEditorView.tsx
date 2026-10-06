/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { articleStorage, serializeMarkdownFile } from '../content/storage';
import { getAllArticles, getArticleByPath } from '../content/loader';

interface ArticleEditorViewProps {
  onClose?: () => void;
  onSaved?: () => void;
}

export const ArticleEditorView: React.FC<ArticleEditorViewProps> = ({
  onClose,
  onSaved
}) => {
  const [filePath, setFilePath] = useState('content/zh/civdesk/test.md');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [articles, setArticles] = useState(() => getAllArticles());

  const handleLoadArticle = (targetPath: string) => {
    const doc = getArticleByPath(targetPath);
    if (doc) {
      setFilePath(doc.path);
      setTitle(doc.title);
      setDescription(doc.description);
      setContent(doc.content);
      setFeedback(`已加载：${doc.path}（当前状态：${doc.status}）`);
    }
  };

  const handleSaveDraft = () => {
    if (!filePath.trim()) {
      setFeedback('请填写文件路径');
      return;
    }
    const saved = articleStorage.saveArticle({
      path: filePath,
      title: title || '未命名草稿',
      description,
      content,
      status: 'draft'
    });
    setArticles(getAllArticles());
    if (onSaved) onSaved();
    setFeedback(`草稿已保存至浏览器 localStorage：${saved.path}`);
  };

  const handleSubmit = () => {
    if (!filePath.trim()) {
      setFeedback('请填写文件路径');
      return;
    }
    if (!title.trim()) {
      setFeedback('请填写标题');
      return;
    }
    const saved = articleStorage.saveArticle({
      path: filePath,
      title,
      description,
      content,
      status: 'published'
    });
    setArticles(getAllArticles());
    if (onSaved) onSaved();
    setFeedback(`已提交（status: published，已写入 localStorage）：${saved.path}`);
  };

  const previewMarkdown = serializeMarkdownFile({
    title: title || '文章标题',
    description,
    status: 'published',
    content
  });

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-3 pb-12 text-stone-800 font-serif-sc space-y-5">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <label className="block text-xs sm:text-sm font-bold text-stone-900">
              文件路径
            </label>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="返回列表"
                className="min-w-[32px] min-h-[32px] flex items-center justify-center text-sm text-teal-900 hover:underline cursor-pointer shrink-0"
              >
                ↩
              </button>
            )}
          </div>
          <input
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            placeholder="content/zh/civdesk/test.md"
            className="w-full px-3 py-2 bg-white/80 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-teal-800 font-mono"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-stone-900">
            标题
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="测试文章"
            className="w-full px-3 py-2 bg-white/80 border border-stone-300 text-base text-stone-900 focus:outline-none focus:border-teal-800"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-stone-900">
            简介
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder=""
            className="w-full px-3 py-2 bg-white/80 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-teal-800"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-stone-900">
            内容
          </label>
          <textarea
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2.5 bg-white/80 border border-stone-300 text-base leading-relaxed text-stone-900 focus:outline-none focus:border-teal-800"
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-5 py-2 border border-stone-400 bg-[#f4f0e6] hover:bg-stone-200/70 text-sm text-stone-800 cursor-pointer"
          >
            保存草稿
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 border border-teal-900 bg-teal-900 text-[#f8f6f0] hover:bg-teal-800 text-sm cursor-pointer"
          >
            提交
          </button>
        </div>

        {feedback && (
          <p className="text-sm text-teal-900 pt-1">
            {feedback}
          </p>
        )}
      </div>

      {/* 已有文件与本地草稿加载列表 */}
      <div className="pt-8 border-t border-stone-300/70 space-y-3">
        <div className="text-xs text-stone-500">
          已有文章与本地草稿（点击可载入编辑器）：
        </div>
        <ul className="space-y-2 text-sm">
          {articles.map((doc) => (
            <li key={doc.path} className="flex items-baseline justify-between gap-2">
              <button
                type="button"
                onClick={() => handleLoadArticle(doc.path)}
                className="text-left text-teal-900 hover:underline font-mono text-xs cursor-pointer"
              >
                {doc.path}
              </button>
              <span className="text-xs text-stone-500">
                {doc.title}（{doc.status}）
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Markdown 格式预览 */}
      <details className="pt-4 border-t border-stone-300/70 text-xs text-stone-600">
        <summary className="cursor-pointer select-none">查看生成的 Markdown 源文件格式</summary>
        <pre className="mt-3 p-3 bg-stone-200/50 border border-stone-300/80 overflow-x-auto font-mono text-xs text-stone-800 whitespace-pre-wrap">
          {previewMarkdown}
        </pre>
      </details>
    </div>
  );
};
