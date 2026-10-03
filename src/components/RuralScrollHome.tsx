/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavMenu } from './HeaderNav';
import peachBlossomScroll from '../assets/images/peach_blossom_scroll_v02_1791025529085.jpg';
import { 
  ArrowRight, 
  HelpCircle, 
  Search, 
  FlaskConical, 
  Users, 
  Activity, 
  ShieldAlert, 
  Waves, 
  Compass, 
  Vote, 
  BookOpen,
  RotateCw
} from 'lucide-react';

interface RuralScrollHomeProps {
  onNavigateTab: (tab: NavMenu, subId?: string) => void;
}

export const RuralScrollHome: React.FC<RuralScrollHomeProps> = ({ onNavigateTab }) => {
  return (
    <div className="w-full bg-[#f8f6f0] text-stone-800 font-serif-sc min-h-screen">
      {/* 1. 主视觉：横向展开的青绿山水桃花浮岛长卷 */}
      <section className="relative w-full overflow-hidden border-b border-stone-200/90 shadow-sm bg-[#ede8dc]">
        {/* Scroll Picture Container: Full width, horizontal composition, serene and expansive */}
        <div className="relative w-full overflow-x-auto scrollbar-none select-none">
          <div className="relative w-full min-w-[1080px] lg:min-w-full">
            {/* The Master Hand-Painted Landscape (Qinglü Shanshui, no popups, no NPC markers, no foreground elders) */}
            <img
              src={peachBlossomScroll}
              alt="桃花浮岛青绿山水长卷 - 静态横屏山水画面"
              className="w-full h-auto max-h-[720px] object-cover object-center block"
              loading="eager"
            />

            {/* Subtle rice paper texture overlay & soft natural vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-900/20 via-transparent to-stone-900/5 mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f8f6f0] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Minimalist Inscription: 画面落款（克制、安静、不遮挡山水） */}
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-[11px] text-stone-500 font-serif-sc">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600/70" />
            <span>桃花浮岛 · 青绿山水乡村生活画卷 (v0.2 静态版)</span>
          </div>
          <span className="font-mono text-stone-400 hidden sm:inline">
            山林 · 田野 · 小桥 · 溪流 · 桃花 · 炊烟 · 海上浮岛
          </span>
        </div>
      </section>

      {/* 2. 核心题旨：CivDesk 文明编辑部与立项简述 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono text-teal-700 tracking-wider uppercase font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-600 inline-block" />
            <span>CivDesk 文明编辑部</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            重新编辑<br />
            我们习以为常的世界
          </h1>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed pt-2">
            人类很早就学会了接受世界：接受生老病死，接受弱肉强食，接受自然灾害，接受不公与支配。
            <br />
            但自然发生，并不等于我们在道德上必须接受。
            <br />
            桃花浮岛是一个开放的文明实验空间——提出问题，研究解决方案，实验，实践。
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onNavigateTab('home')}
              className="px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>进入文明编辑部</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('island')}
              className="px-5 py-2.5 rounded-lg bg-stone-200/90 hover:bg-stone-300 text-stone-800 text-xs font-medium transition-colors border border-stone-300/80"
            >
              了解桃花浮岛 →
            </button>
          </div>
        </div>
      </section>

      {/* 3. 六个核心主题入口卡片 (严格对照 67375eb0 原型构图与色调) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-stone-200/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
          {/* 1. 生老病死 */}
          <div
            onClick={() => onNavigateTab('aging')}
            className="group p-4 rounded-xl bg-[#eef6f0] border border-emerald-200/80 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-emerald-800">
                <Activity className="w-4 h-4" />
                <span className="font-bold text-sm">生老病死</span>
              </div>
              <div className="h-16 w-full rounded-lg bg-emerald-100/70 mb-2.5 overflow-hidden flex items-center justify-center text-emerald-700 text-xs font-mono">
                🌱 细胞再生与尊严
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                生命从出生到死亡，有哪些可以改变，哪些必须接受？
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-emerald-200/60 flex items-center text-xs font-semibold text-emerald-800 group-hover:translate-x-0.5 transition-transform">
              <span>进入</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          {/* 2. 弱肉强食 */}
          <div
            onClick={() => onNavigateTab('predation')}
            className="group p-4 rounded-xl bg-[#faf3ea] border border-amber-200/80 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-amber-900">
                <ShieldAlert className="w-4 h-4" />
                <span className="font-bold text-sm">弱肉强食</span>
              </div>
              <div className="h-16 w-full rounded-lg bg-amber-100/70 mb-2.5 overflow-hidden flex items-center justify-center text-amber-800 text-xs font-mono">
                🌾 分子曼娜合成
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                竞争、暴力与支配，是自然规律，还是人类制造的规则？
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center text-xs font-semibold text-amber-900 group-hover:translate-x-0.5 transition-transform">
              <span>进入</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          {/* 3. 自然灾害 */}
          <div
            onClick={() => onNavigateTab('disaster')}
            className="group p-4 rounded-xl bg-[#eaf3f8] border border-sky-200/80 hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-sky-900">
                <Waves className="w-4 h-4" />
                <span className="font-bold text-sm">自然灾害</span>
              </div>
              <div className="h-16 w-full rounded-lg bg-sky-100/70 mb-2.5 overflow-hidden flex items-center justify-center text-sky-800 text-xs font-mono">
                🌊 柔性消能浮岛
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                面对洪水、地震、风暴，我们能做什么？如何建立更安全的生存方式？
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-sky-200/60 flex items-center text-xs font-semibold text-sky-900 group-hover:translate-x-0.5 transition-transform">
              <span>进入</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          {/* 4. 桃花浮岛 */}
          <div
            onClick={() => onNavigateTab('island')}
            className="group p-4 rounded-xl bg-[#f9eceb] border border-rose-200/80 hover:border-rose-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-rose-900">
                <Compass className="w-4 h-4" />
                <span className="font-bold text-sm">桃花浮岛</span>
              </div>
              <div className="h-16 w-full rounded-lg bg-rose-100/70 mb-2.5 overflow-hidden flex items-center justify-center text-rose-800 text-xs font-mono">
                🌸 生命共同体协议
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                一座可以离开的岛，一个不断实验的生命共同体。
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-rose-200/60 flex items-center text-xs font-semibold text-rose-900 group-hover:translate-x-0.5 transition-transform">
              <span>进入</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          {/* 5. Let's Decide */}
          <div
            onClick={() => onNavigateTab('letsdecide')}
            className="group p-4 rounded-xl bg-[#efeef7] border border-indigo-200/80 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-indigo-900">
                <Vote className="w-4 h-4" />
                <span className="font-bold text-sm">Let's Decide</span>
              </div>
              <div className="h-16 w-full rounded-lg bg-indigo-100/70 mb-2.5 overflow-hidden flex items-center justify-center text-indigo-800 text-xs font-mono">
                ⚖️ 智能生命决断
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                程序正义的公共决策工具，让协商、授权、决定、修改和退出成为可能。
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-indigo-200/60 flex items-center text-xs font-semibold text-indigo-900 group-hover:translate-x-0.5 transition-transform">
              <span>进入</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          {/* 6. 文明编辑部 */}
          <div
            onClick={() => onNavigateTab('home')}
            className="group p-4 rounded-xl bg-[#f7f4ea] border border-stone-300/80 hover:border-stone-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-stone-800">
                <BookOpen className="w-4 h-4" />
                <span className="font-bold text-sm">文明编辑部</span>
              </div>
              <div className="h-16 w-full rounded-lg bg-stone-200/60 mb-2.5 overflow-hidden flex items-center justify-center text-stone-700 text-xs font-mono">
                📖 实验档案与反思
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                提出问题，分享研究，记录实验，讨论未来的人类文明。
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-stone-300/60 flex items-center text-xs font-semibold text-stone-800 group-hover:translate-x-0.5 transition-transform">
              <span>进入</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. 我们的文明实验方法四步循环 (对照 67375eb0 原型底部) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-4">
        <div className="p-6 md:p-8 rounded-2xl bg-[#f3efe4] border border-stone-200 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-stone-300/60 pb-4">
            <div>
              <h3 className="text-lg font-bold text-stone-900">我们的文明实验方法</h3>
              <p className="text-xs text-stone-600 mt-0.5">
                不是提供最终答案，而是持续提出问题、寻找可能、并在现实中进行实验。
              </p>
            </div>
            <div className="text-xs text-stone-500 font-mono flex items-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5 text-stone-600" />
              <span>新的问题，进入下一轮循环</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-white/80 border border-stone-200/80 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-mono font-bold text-xs flex items-center justify-center">
                ?
              </div>
              <div className="text-sm font-bold text-stone-900">1. 提出问题</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                从文明编辑部出发，重新审视那些被习以为常但很少追问的规则。
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-white/80 border border-stone-200/80 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 font-mono font-bold text-xs flex items-center justify-center">
                🔍
              </div>
              <div className="text-sm font-bold text-stone-900">2. 研究解决方案</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                从科学、技术、哲学、法律、社会组织等诸多角度寻找可能性。
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-white/80 border border-stone-200/80 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center">
                ⚗️
              </div>
              <div className="text-sm font-bold text-stone-900">3. 实验 (桃花浮岛)</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                在桃花浮岛的真实环境中测试新的生活方式、去支配伦理与韧性制度。
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-white/80 border border-stone-200/80 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-800 font-mono font-bold text-xs flex items-center justify-center">
                👥
              </div>
              <div className="text-sm font-bold text-stone-900">4. 实践 (Let's Decide)</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                通过程序正义的公共决断，将可行的方案带入现实公共政策与生命共识。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
