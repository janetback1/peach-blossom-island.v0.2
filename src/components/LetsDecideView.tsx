/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { getArticleByPath, getPublishedArticlesByCategory } from '../content/loader';
import { MarkdownArticleView } from './MarkdownArticleView';

interface LetsDecideViewProps {
  initialMotionId?: string;
  onNavigateToIslandArticle?: (num: number) => void;
}

export const LetsDecideView: React.FC<LetsDecideViewProps> = () => {
  const [activeArticlePath, setActiveArticlePath] = useState<string | null>(null);
  const articles = getPublishedArticlesByCategory('lets-decide');

  if (activeArticlePath) {
    const doc = getArticleByPath(activeArticlePath);
    if (doc) {
      return (
        <MarkdownArticleView
          title={doc.title}
          content={doc.content}
          onBack={() => {
            setActiveArticlePath(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      );
    }
  }

  return (
    <article className="max-w-2xl mx-auto px-5 sm:px-8 pt-6 pb-14 sm:pt-9 sm:pb-16 text-[#3d3832] font-serif-sc space-y-6">
      <h1 className="text-base sm:text-lg font-medium text-[#2c2824] tracking-wider">
        Let's Decide
      </h1>

      {articles.length > 0 && (
        <ul className="space-y-4 pt-2">
          {articles.map((doc) => (
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
      )}
    </article>
  );
};
