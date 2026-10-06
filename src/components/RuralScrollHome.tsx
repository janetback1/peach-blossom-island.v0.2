/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavMenu } from './HeaderNav';
import { getArticleByPath, getCivDeskPublishedDocuments } from '../content/loader';
import { MarkdownArticleView } from './MarkdownArticleView';

interface RuralScrollHomeProps {
  onNavigateTab: (tab: NavMenu, subId?: string) => void;
}

export const RuralScrollHome: React.FC<RuralScrollHomeProps> = () => {
  const [activeArticlePath, setActiveArticlePath] = useState<string | null>(null);

  const homeDoc = getArticleByPath('content/zh/civdesk/home.md');
  const publishedDocs = getCivDeskPublishedDocuments();

  if (activeArticlePath) {
    const selectedDoc = getArticleByPath(activeArticlePath);
    if (selectedDoc) {
      return (
        <MarkdownArticleView
          title={selectedDoc.title}
          content={selectedDoc.content}
          onBack={() => {
            setActiveArticlePath(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      );
    }
  }

  return (
    <article className="max-w-2xl mx-auto px-5 sm:px-8 pt-3 pb-12 sm:pt-4 sm:pb-14 text-[#3d3832] font-serif-sc space-y-6">
      {/* 文明编辑部正文（去除与顶部导航重复的「文明编辑部」标题） */}
      {homeDoc && (
        <section>
          <div className="text-[14.5px] sm:text-[15px] leading-[2.0] text-[#3d3832] whitespace-pre-line">
            {homeDoc.content}
          </div>
        </section>
      )}

      {/* 正式文章列表：与顶部菜单使用统一字号 */}
      {publishedDocs.length > 0 && (
        <section className="border-t border-[#ded7c7]/80 pt-4">
          <ul className="space-y-2.5">
            {publishedDocs.map((doc) => (
              <li key={doc.path}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveArticlePath(doc.path);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left text-[13px] sm:text-sm text-[#35302a] hover:text-[#B83A5A] transition-colors cursor-pointer"
                >
                  {doc.title}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
};
