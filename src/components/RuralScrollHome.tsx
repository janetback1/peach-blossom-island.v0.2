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
    <article className="max-w-2xl mx-auto px-5 sm:px-8 pt-6 pb-14 sm:pt-9 sm:pb-16 text-[#3d3832] font-serif-sc space-y-10">
      {/* 小而明确的页面标题 + 文明编辑部正文 */}
      <section className="space-y-5">
        <h1 className="text-base sm:text-lg font-medium text-[#2c2824] tracking-wider">
          {homeDoc?.title || '文明编辑部'}
        </h1>

        {homeDoc && (
          <div className="text-[15px] sm:text-base leading-[2.05] text-[#3d3832] whitespace-pre-line">
            {homeDoc.content}
          </div>
        )}
      </section>

      {/* 正式文章列表：只显示文章标题，标题本身即为入口 */}
      {publishedDocs.length > 0 && (
        <section className="border-t border-[#ded7c7]/80 pt-7">
          <ul className="space-y-4">
            {publishedDocs.map((doc) => (
              <li key={doc.path}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveArticlePath(doc.path);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left text-[15px] sm:text-base text-[#35302a] hover:text-[#B83A5A] transition-colors cursor-pointer"
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
