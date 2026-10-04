/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavMenu } from './HeaderNav';
import { CIVDESK_MANIFESTO, CIVDESK_TRACKS } from '../data/civDeskData';
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
  | 'covenant'
  | 'dossier_aging'
  | 'dossier_predation'
  | 'dossier_disaster';

export const RuralScrollHome: React.FC<RuralScrollHomeProps> = ({ onNavigateTab }) => {
  const [activeDoc, setActiveDoc] = useState<FormalDocumentId>(null);

  const openDocument = (docId: FormalDocumentId) => {
    setActiveDoc(docId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 如果读者在目录中点开了某一份正式文档，以纯粹的书页章节方式展示完整原文
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
              <h2 className="text-lg font-bold text-stone-900">正文条文（共五十三条）</h2>
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
              <h2 className="text-lg font-bold text-stone-900">结语 / Epilogue</h2>
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
                  <h2 className="text-lg font-bold text-stone-900">{sec.title}</h2>
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
              <h2 className="text-lg font-bold text-stone-900">序言</h2>
              <div className="text-base leading-loose text-stone-800 whitespace-pre-line">
                {FLOATING_ISLAND_PREAMBLE}
              </div>
            </section>

            <section className="space-y-8 border-t border-stone-300/70 pt-8">
              <h2 className="text-lg font-bold text-stone-900">协议条文（共二十七条）</h2>
              <div className="divide-y divide-stone-200/90">
                {FLOATING_ISLAND_ARTICLES.map((art) => (
                  <div key={art.number} className="py-6 space-y-2">
                    <div className="text-xs text-stone-500">{art.chapterZh}</div>
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
              <h2 className="text-lg font-bold text-stone-900">结语</h2>
              <div className="text-base leading-loose text-stone-800 whitespace-pre-line">
                {FLOATING_ISLAND_EPILOGUE}
              </div>
            </section>
          </div>
        )}

        {(activeDoc === 'dossier_aging' ||
          activeDoc === 'dossier_predation' ||
          activeDoc === 'dossier_disaster') && (() => {
          const trackId =
            activeDoc === 'dossier_aging'
              ? 'aging'
              : activeDoc === 'dossier_predation'
              ? 'predation'
              : 'disaster';
          const track = CIVDESK_TRACKS.find((t) => t.id === trackId) || CIVDESK_TRACKS[0];

          return (
            <div className="space-y-8">
              <header className="space-y-2 border-b border-stone-300/70 pb-6">
                <p className="text-xs text-stone-500">正式文档 · 专题研究档案</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
                  {track.titleZh}：{track.tagline}
                </h1>
                <p className="text-sm text-stone-600">{track.titleEn}</p>
              </header>

              <section className="space-y-4">
                <h2 className="text-base font-bold text-stone-900">核心追问</h2>
                <p className="text-base leading-loose text-stone-800">{track.leadQuestion}</p>
                <p className="text-base leading-loose text-stone-800 whitespace-pre-line">
                  {track.descriptionZh}
                </p>
                <p className="text-sm leading-relaxed text-stone-600">
                  {track.whyChallenged}
                </p>
              </section>

              <section className="space-y-6 border-t border-stone-300/70 pt-6">
                <h2 className="text-lg font-bold text-stone-900">实验与研究记录</h2>
                <div className="divide-y divide-stone-200/90">
                  {track.scientificDossiers.map((d, idx) => (
                    <div key={d.id} className="py-6 space-y-2">
                      <div className="text-xs text-stone-500">
                        档案 0{idx + 1} · {d.domain}
                      </div>
                      <h3 className="text-base font-bold text-stone-900">{d.title}</h3>
                      <p className="text-base leading-loose text-stone-800">{d.summary}</p>
                      <p className="text-sm leading-relaxed text-stone-700">
                        追问：{d.radicalInquiry}
                      </p>
                      <p className="text-sm leading-relaxed text-stone-600">
                        失败与局限记录：{d.failedAttemptsLogged}
                      </p>
                      <p className="text-sm leading-relaxed text-stone-600">
                        演进方向：{d.hopefulDirection}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          );
        })()}

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
      {/* 一、开篇正文：我们在研究什么？为什么研究？ */}
      <section className="space-y-6">
        <header className="space-y-2 border-b border-stone-300/70 pb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-wide">
            文明编辑部
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {CIVDESK_MANIFESTO.subheadline}
          </p>
        </header>

        <div className="text-base sm:text-[17px] leading-[2] text-stone-800 whitespace-pre-line">
          {CIVDESK_MANIFESTO.prologue}
        </div>
      </section>

      {/* 二、编辑部的工作方式（保留原文五步方法论，以纯文字书页排版呈现） */}
      <section className="space-y-5 border-t border-stone-300/70 pt-10">
        <h2 className="text-lg sm:text-xl font-bold text-stone-900">
          我们在做什么
        </h2>
        <div className="space-y-4">
          {CIVDESK_MANIFESTO.methodology.map((item) => (
            <div key={item.step} className="text-sm sm:text-base leading-relaxed text-stone-700">
              <span className="font-semibold text-stone-900">
                {item.step}. {item.name}：
              </span>
              <span>{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 三、文明编辑部的文件展示（一本书的目录 / 编辑部档案目录，文字链接形式） */}
      <section className="space-y-5 border-t border-stone-300/70 pt-10">
        <header className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-stone-900">
            编辑部正式文本与档案目录
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            点击下方标题直接阅读完整原文
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
                序言、正文五十三条与结语（中英对照）
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
                如果创造者存在，我们有权审判它吗？（全文八章）
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
                存在、记忆、遗忘、关系与离开（全文二十七条）
              </span>
            </button>
          </li>

          <li className="py-3.5">
            <button
              type="button"
              onClick={() => openDocument('dossier_aging')}
              className="w-full text-left group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 cursor-pointer"
            >
              <span className="text-base font-medium text-teal-950 group-hover:text-teal-700 group-hover:underline">
                04. 《生老病死：研究问题与实验档案》
              </span>
              <span className="text-xs text-stone-500">
                衰老细胞清除、部分细胞重编程与组织再生记录
              </span>
            </button>
          </li>

          <li className="py-3.5">
            <button
              type="button"
              onClick={() => openDocument('dossier_predation')}
              className="w-full text-left group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 cursor-pointer"
            >
              <span className="text-base font-medium text-teal-950 group-hover:text-teal-700 group-hover:underline">
                05. 《弱肉强食：研究问题与实验档案》
              </span>
              <span className="text-xs text-stone-500">
                分子曼娜协议、培养肉与后匮乏去支配研究
              </span>
            </button>
          </li>

          <li className="py-3.5">
            <button
              type="button"
              onClick={() => openDocument('dossier_disaster')}
              className="w-full text-left group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 cursor-pointer"
            >
              <span className="text-base font-medium text-teal-950 group-hover:text-teal-700 group-hover:underline">
                06. 《自然灾害：研究问题与实验档案》
              </span>
              <span className="text-xs text-stone-500">
                柔性海洋平台、海洋温差发电与物理退出机制
              </span>
            </button>
          </li>
        </ul>
      </section>

      {/* 四、接下来可以去哪里（其余五个一级栏目的安静文字导览） */}
      <section className="space-y-5 border-t border-stone-300/70 pt-10">
        <header className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-stone-900">
            各栏目导览
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            沿着问题进入具体章节
          </p>
        </header>

        <ul className="space-y-4 text-sm sm:text-base leading-relaxed">
          <li>
            <button
              type="button"
              onClick={() => onNavigateTab('aging')}
              className="font-semibold text-teal-900 hover:underline cursor-pointer"
            >
              生老病死
            </button>
            <span className="text-stone-600">
              　—　研究生命从诞生、成长、衰老到死亡过程中，人类可以如何理解、减轻或改变其中的痛苦。
            </span>
          </li>

          <li>
            <button
              type="button"
              onClick={() => onNavigateTab('predation')}
              className="font-semibold text-teal-900 hover:underline cursor-pointer"
            >
              弱肉强食
            </button>
            <span className="text-stone-600">
              　—　研究生命之间的竞争、捕食、支配与资源争夺，以及人类是否能够设计出不同于自然竞争的社会制度与技术。
            </span>
          </li>

          <li>
            <button
              type="button"
              onClick={() => onNavigateTab('disaster')}
              className="font-semibold text-teal-900 hover:underline cursor-pointer"
            >
              自然灾害
            </button>
            <span className="text-stone-600">
              　—　研究洪水、风暴、地震、疾病、饥荒等自然力量，以及人类如何通过技术、制度与共同体降低它们造成的伤害。
            </span>
          </li>

          <li>
            <button
              type="button"
              onClick={() => onNavigateTab('island')}
              className="font-semibold text-teal-900 hover:underline cursor-pointer"
            >
              桃花浮岛
            </button>
            <span className="text-stone-600">
              　—　研究一种可以在海洋环境中长期生活的共同体，以及它的能源、食物、工程、生态和社会制度。
            </span>
          </li>

          <li>
            <button
              type="button"
              onClick={() => onNavigateTab('letsdecide')}
              className="font-semibold text-teal-900 hover:underline cursor-pointer"
            >
              Let's Decide
            </button>
            <span className="text-stone-600">
              　—　关于共同体规则与公共议题的协商、表决与退出机制。
            </span>
          </li>
        </ul>
      </section>
    </article>
  );
};
