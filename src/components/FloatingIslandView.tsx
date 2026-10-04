/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FLOATING_ISLAND_PREAMBLE,
  FLOATING_ISLAND_ARTICLES,
  FLOATING_ISLAND_EPILOGUE
} from '../data/floatingIslandData';

interface FloatingIslandViewProps {
  initialArticleNumber?: number;
  onNavigateToDecide: (motionId?: string) => void;
  onNavigateToTrack: (track: 'aging' | 'predation' | 'disaster') => void;
}

const PLANNED_TOPICS = [
  '海洋工程',
  '浮岛设计',
  '能源',
  '食物',
  '生态',
  '生活系统',
  '社会制度',
  '实验记录'
];

export const FloatingIslandView: React.FC<FloatingIslandViewProps> = ({
  initialArticleNumber
}) => {
  const [showCovenant, setShowCovenant] = useState(Boolean(initialArticleNumber));

  return (
    <article className="max-w-2xl mx-auto px-5 sm:px-8 py-10 sm:py-14 text-stone-800 font-serif-sc space-y-10">
      {/* 栏目主标题与简短说明 */}
      <header className="space-y-4 border-b border-stone-300/70 pb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-wide">
          桃花浮岛
        </h1>
        <p className="text-base sm:text-lg leading-loose text-stone-800">
          研究一种可以在海洋环境中长期生活的共同体，以及它的能源、食物、工程、生态和社会制度。
        </p>
      </header>

      {/* 后续逐步增加的研究目录 */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-stone-900">
          后续研究与实验目录
        </h2>
        <ul className="space-y-2 text-base text-stone-700 leading-relaxed">
          {PLANNED_TOPICS.map((topic) => (
            <li key={topic}>· {topic}</li>
          ))}
        </ul>
      </section>

      {/* 已定稿的《桃花浮岛：生命共同体协议》正式文本入口 */}
      <section className="space-y-6 border-t border-stone-300/70 pt-8">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-stone-900">
            已收录正式文本
          </h2>
          <div>
            <button
              type="button"
              onClick={() => setShowCovenant((prev) => !prev)}
              className="text-base text-teal-900 hover:underline cursor-pointer"
            >
              {showCovenant
                ? '收起《桃花浮岛：生命共同体协议》（全文二十七条） ↑'
                : '阅读《桃花浮岛：生命共同体协议》（全文二十七条） →'}
            </button>
          </div>
        </div>

        {showCovenant && (
          <div className="pt-6 border-t border-stone-200/90 space-y-8">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-stone-900">序言</h3>
              <div className="text-base leading-loose text-stone-800 whitespace-pre-line">
                {FLOATING_ISLAND_PREAMBLE}
              </div>
            </div>

            <div className="divide-y divide-stone-200/90 border-y border-stone-200/90">
              {FLOATING_ISLAND_ARTICLES.map((art) => (
                <div key={art.number} className="py-6 space-y-2">
                  <div className="text-xs text-stone-500">{art.chapterZh}</div>
                  <h4 className="text-base font-bold text-stone-900">
                    第 {art.number} 条　{art.titleZh}
                  </h4>
                  <p className="text-base leading-loose text-stone-800 whitespace-pre-line">
                    {art.textZh}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-stone-900">结语</h3>
              <div className="text-base leading-loose text-stone-800 whitespace-pre-line">
                {FLOATING_ISLAND_EPILOGUE}
              </div>
            </div>
          </div>
        )}
      </section>
    </article>
  );
};
