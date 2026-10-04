/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface MarkdownArticleViewProps {
  title: string;
  content: string;
  onBack?: () => void;
}

export const MarkdownArticleView: React.FC<MarkdownArticleViewProps> = ({
  title,
  content,
  onBack
}) => {
  const blocks = content.split(/\r?\n\r?\n+/);

  return (
    <article className="max-w-2xl mx-auto px-5 sm:px-8 pt-6 pb-14 sm:pt-9 sm:pb-16 text-[#3d3832] font-serif-sc space-y-7">
      {onBack && (
        <div>
          <button
            type="button"
            onClick={onBack}
            className="text-xs sm:text-sm text-[#6e665c] hover:text-[#2c2824] transition-colors cursor-pointer"
          >
            ← 返回
          </button>
        </div>
      )}

      <header className="pb-2">
        <h1 className="text-lg sm:text-xl font-medium text-[#2c2824] tracking-wider">
          {title}
        </h1>
      </header>

      <div className="space-y-5">
        {blocks.map((block, idx) => {
          const trimmed = block.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith('## ')) {
            return (
              <h2
                key={idx}
                className="text-base sm:text-[17px] font-medium text-[#2c2824] pt-5 border-t border-[#e2dac9]/70 first:border-t-0 first:pt-0 tracking-wide"
              >
                {trimmed.replace(/^##\s+/, '')}
              </h2>
            );
          }

          if (trimmed.startsWith('### ')) {
            return (
              <h3
                key={idx}
                className="text-[15px] sm:text-base font-medium text-[#2c2824] pt-2"
              >
                {trimmed.replace(/^###\s+/, '')}
              </h3>
            );
          }

          return (
            <p
              key={idx}
              className="text-[15px] sm:text-base leading-[2.05] text-[#3d3832] whitespace-pre-line"
            >
              {trimmed}
            </p>
          );
        })}
      </div>

      {onBack && (
        <div className="pt-8 border-t border-[#e2dac9]/80">
          <button
            type="button"
            onClick={onBack}
            className="text-xs sm:text-sm text-[#6e665c] hover:text-[#2c2824] transition-colors cursor-pointer"
          >
            ← 返回
          </button>
        </div>
      )}
    </article>
  );
};
