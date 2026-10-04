/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ContentCategory } from '../content/storage';
import { getArticleByPath, getPublishedArticlesByCategory } from '../content/loader';
import { MarkdownArticleView } from './MarkdownArticleView';

interface TrackDetailViewProps {
  trackId: 'aging' | 'predation' | 'disaster';
  onNavigateToIsland: () => void;
  onNavigateToDecide: (motionId?: string) => void;
  onSwitchTrack: (trackId: 'aging' | 'predation' | 'disaster') => void;
}

const TRACK_CONFIG: Record<
  'aging' | 'predation' | 'disaster',
  { title: string; category: ContentCategory }
> = {
  predation: { title: '弱肉强食', category: 'foodchain' },
  aging: { title: '生老病死', category: 'death' },
  disaster: { title: '自然灾害', category: 'disaster' }
};

export const TrackDetailView: React.FC<TrackDetailViewProps> = ({
  trackId
}) => {
  const [activeArticlePath, setActiveArticlePath] = useState<string | null>(null);
  const { title, category } = TRACK_CONFIG[trackId];
  const articles = getPublishedArticlesByCategory(category);

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
        {title}
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
