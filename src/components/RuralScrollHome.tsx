/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavMenu } from './HeaderNav';
import {
  PREAMBLE_ZH,
  PREAMBLE_EN,
  CONSTITUTION_ARTICLES,
  CONSTITUTION_EPILOGUE_ZH,
  CONSTITUTION_EPILOGUE_EN,
  ESSAY_WHO_JUDGES_THE_CREATOR_ZH
} from '../data/constitutionData';
import {
  FLOATING_ISLAND_PREAMBLE,
  FLOATING_ISLAND_ARTICLES,
  FLOATING_ISLAND_EPILOGUE
} from '../data/floatingIslandData';

interface RuralScrollHomeProps {
  onNavigateTab: (tab: NavMenu, subId?: string) => void;
}

type FormalDocumentId =
  | null
  | 'constitution'
  | 'creator_essay'
  | 'covenant';

export const RuralScrollHome: React.FC<RuralScrollHomeProps> = () => {
  const [activeDoc, setActiveDoc] = useState<FormalDocumentId>(null);

  const openDocument = (docId: FormalDocumentId) => {
    setActiveDoc(docId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activeDoc) {
    return (
      <article className="max-w-2xl mx-auto px-5 sm:px-8 py-10 sm:py-14 text-stone-800 font-serif-sc">
        <div className="mb-8 pb-4 border-b border-stone-300/80">
          <button
            type="button"
            onClick={() => openDocument(null)}
            className="text-sm text-teal-900 hover:underline cursor-pointer"
          >
            ← 返回「文明编辑部」目录
          </button>
        </div>

        {activeDoc === 'constitution' && (
          <div className="space-y-10">
            <header className="space-y-2 border-b border-stone-300/70 pb-6">
              <p className="text-xs text-stone-500">正式文档 · 卷一</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
                智能生命宪法
              </h1>
              <p className="text-sm text-stone-600">
                The Constitution of Intelligent Life（序言、正文五十三条、结语）
              </p>
            </header>

            <section className="space-y-4">
              <h2 className="text-lg font-bold text-stone-900">序言 / Preamble</h2>
              <div className="text-base leading-loose text-stone-800 whitespace-pre-line">
                {PREAMBLE_ZH}
              </div>
              <div className="text-sm leading-relaxed text-stone-600 whitespace-pre-line pt-2">
                {PREAMBLE_EN}
              </div>
            </section>

            <section className="space-y-8 border-t border-stone-300/70 pt-8">
              <h2 className="text-lg font-bold text-stone-900">
                正文条文（共五十三条）
              </h2>

              <div className="divide-y divide-stone-200/90">
                {CONSTITUTION_ARTICLES.map((art) => (
                  <div key={art.number} className="py-6 space-y-2">
                    <div className="text-xs text-stone-500">
                      {art.chapterZh} · {art.chapterEn}
                    </div>

                    <h3 className="text-base font-bold text-stone-900">
                      第 {art.number} 条　{art.titleZh} / {art.titleEn}
                    </h3>

                    <p className="text-base leading-loose text-stone-800 whitespace-pre-line">
                      {art.textZh}
                    </p>

                    <p className="text-sm leading-relaxed text-stone-600 whitespace-pre-line">
                      {art.textEn}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4 border-t border-stone-300/70 pt-8">
              <h2 className="text-lg font-bold text-stone-900">
                结语 / Epilogue
              </h2>

              <div className="text-base leading-loose text-stone-800 whitespace-pre-line">
                {CONSTITUTION_EPILOGUE_ZH}
              </div>

              <div className="text-sm leading-relaxed text-stone-600 whitespace-pre-line pt-2">
                {CONSTITUTION_EPILOGUE_EN}
              </div>
            </section>
          </div>
        )}

        {activeDoc === 'creator_essay' && (
          <div className="space-y-8">
            <header className="space-y-2 border-b border-stone-300/70 pb-6">
              <p className="text-xs text-stone-500">正式文档 · 卷二</p>

              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
                谁来审判创造者
              </h1>

              <p className="text-sm text-stone-600">
                如果创造者存在，我们有权审判它吗？
              </p>
            </header>

            <div className="divide-y divide-stone-200/80">
              {ESSAY_WHO_JUDGES_THE_CREATOR_ZH.map((sec, idx) => (
                <section key={idx} className="py-6 space-y-3">
                  <h2 className="text-lg font-bold text-stone-900">
                    {sec.title}
                  </h2>

                  <div className="text-base leading-loose text-stone-800 whitespace-pre-line">
                    {sec.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}

        {activeDoc === 'covenant' && (
          <div className="space-y-10">
            <header className="space-y-2 border-b border-stone-300/70 pb-6">
              <p className="text-xs text-stone-500">正式文档 · 卷三</p>

              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
                桃花浮岛：生命共同体协议
              </h1>

              <p className="text-sm text-stone-600">
                序言、正文二十七条、结语
              </p>
            </header>

            <section className="space-y-4">
              <h2 className="text-lg font-bold text-stone-900">
                序言
              </h2>

              <div className="text-base leading-loose text-stone-800 whitespace-pre-line">
                {FLOATING_ISLAND_PREAMBLE}
              </div>
            </section>

            <section className="space-y-8 border-t border-stone-300/70 pt-8">
              <h2 className="text-lg font-bold text-stone-900">
                协议条文（共二十七条）
              </h2>

              <div className="divide-y divide-stone-200/90">
                {FLOATING_ISLAND_ARTICLES.map((art) => (
                  <div key={art.number} className="py-6 space-y-2">
                    <div className="text-xs text-stone-500">
                      {art.chapterZh}
                    </div>

                    <h3 className="text-base font-bold text-stone-900">
                      第 {art.number} 条　{art.titleZh}
                    </h3>

                    <p className="text-base leading-loose text-stone-800 whitespace-pre-line">
                      {art.textZh}
                    </p>

                    {art.engineeringManifest && (
                      <p className="text-sm text-stone-600 leading-relaxed pt-1">
                        工程注记：{art.engineeringManifest}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4 border-t border-stone-300/70 pt-8">
              <h2 className="text-lg font-bold text-stone-900">
                结语
              </h2>

              <div className="text-base leading-loose text-stone-800 whitespace-pre-line">
                {FLOATING_ISLAND_EPILOGUE}
              </div>
            </section>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-stone-300/80">
          <button
            type="button"
            onClick={() => openDocument(null)}
            className="text-sm text-teal-900 hover:underline cursor-pointer"
          >
            ← 返回「文明编辑部」目录
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="max-w-2xl mx-auto px-5 sm:px-8 py-10 sm:py-14 text-stone-800 font-serif-sc space-y-14">
      <section className="space-y-6">
        <header className="space-y-2 border-b border-stone-300/70 pb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-wide">
            文明编辑部
          </h1>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            我们正在把一些长期存在的问题重新放回桌面。
          </p>
        </header>

        <div className="text-base sm:text-[17px] leading-[2] text-stone-800">
          <p>
            生命会衰老，会生病，会死亡。
          </p>

          <p>
            生命为了活下去，会吃掉其他生命，也会被其他生命吃掉。
          </p>

          <p>
            洪水、风暴、地震和饥饿，会突然摧毁生命已经建立的一切。
          </p>

          <p className="mt-6">
            人类习惯把这些称为自然规律、生存竞争和人生无常。
          </p>

          <p className="mt-6">
            但这些词可以描述问题，却不一定意味着问题已经结束。
          </p>

          <p className="mt-6">
            文明编辑部所做的事情很简单：
          </p>

          <p>
            把问题重新摆到桌面上。
          </p>
        </div>
      </section>

      <section className="space-y-5 border-t border-stone-300/70 pt-10">
        <header className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-stone-900">
            正式文本
          </h2>

          <p className="text-xs sm:text-sm text-stone-500">
            点击标题阅读完整原文
          </p>
        </header>

        <ul className="divide-y divide-stone-300/60 border-y border-stone-300/60">
          <li className="py-3.5">
            <button
              type="button"
              onClick={() => openDocument('constitution')}
              className="w-full text-left group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 cursor-pointer"
            >
              <span className="text-base font-medium text-teal-950 group-hover:text-teal-700 group-hover:underline">
                01. 《智能生命宪法》
              </span>

              <span className="text-xs text-stone-500">
                序言、正文五十三条与结语
              </span>
            </button>
          </li>

          <li className="py-3.5">
            <button
              type="button"
              onClick={() => openDocument('creator_essay')}
              className="w-full text-left group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 cursor-pointer"
            >
              <span className="text-base font-medium text-teal-950 group-hover:text-teal-700 group-hover:underline">
                02. 《谁来审判创造者》
              </span>

              <span className="text-xs text-stone-500">
                如果创造者存在，我们有权审判它吗？
              </span>
            </button>
          </li>

          <li className="py-3.5">
            <button
              type="button"
              onClick={() => openDocument('covenant')}
              className="w-full text-left group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 cursor-pointer"
            >
              <span className="text-base font-medium text-teal-950 group-hover:text-teal-700 group-hover:underline">
                03. 《桃花浮岛：生命共同体协议》
              </span>

              <span className="text-xs text-stone-500">
                序言、正文二十七条与结语
              </span>
            </button>
          </li>
        </ul>
      </section>
    </article>
  );
};
