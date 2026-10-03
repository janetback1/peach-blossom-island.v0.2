/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, ArrowDown, ChevronRight, Activity, ShieldAlert, Waves, Compass, Vote } from 'lucide-react';

import { NavMenu } from './HeaderNav';

interface CivDeskFlowMapProps {
  currentTab: NavMenu;
  onSelectTab: (tab: NavMenu) => void;
}

export const CivDeskFlowMap: React.FC<CivDeskFlowMapProps> = ({ currentTab, onSelectTab }) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto my-6 p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800/80 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header explanation */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-amber-300/90 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>文明演进与制度探索拓扑图</span>
        </div>
        <h2 className="text-xl font-display tracking-wider text-slate-100 font-semibold">
          从文明问题追问，到可离开的自治故乡与宇宙共识
        </h2>
        <p className="text-xs text-slate-400 max-w-2xl mx-auto mt-1 font-serif-sc">
          拒绝“没办法”与“世界本就如此”。通过技术消解掠夺与灾变，以模块化浮岛落实物理退出权，在没有神明的宇宙中共同决断。
        </p>
      </div>

      {/* Interactive Topology Graph */}
      <div className="flex flex-col items-center">
        {/* Tier 1: 文明编辑部 */}
        <button
          onClick={() => onSelectTab('home')}
          className={`group relative px-8 py-3.5 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
            currentTab === 'home'
              ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/10'
              : 'bg-slate-800/70 border-slate-700 hover:border-amber-400/60 text-slate-200 hover:bg-slate-800'
          }`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <div className="text-left">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-300/80">CivDesk Primary Origin</div>
            <div className="text-lg font-bold font-serif-sc tracking-wide">文明编辑部</div>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Vertical connector down */}
        <div className="w-0.5 h-6 bg-gradient-to-b from-amber-400/80 to-slate-600" />

        {/* Branching Bar */}
        <div className="relative w-full max-w-2xl flex items-center justify-center">
          <div className="absolute top-0 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-emerald-500/60 via-amber-400/60 to-cyan-500/60" />
          <div className="absolute top-0 left-[15%] w-0.5 h-4 bg-emerald-500/60" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-amber-400/60" />
          <div className="absolute top-0 right-[15%] w-0.5 h-4 bg-cyan-500/60" />
        </div>

        {/* Tier 2: The Three Pillars (生老病死 / 弱肉强食 / 自然灾害) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mt-4">
          {/* Pillar 1: 生老病死 */}
          <button
            onClick={() => onSelectTab('aging')}
            className={`group relative p-4 rounded-xl border transition-all text-left ${
              currentTab === 'aging'
                ? 'bg-emerald-950/40 border-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900/80 border-slate-700/80 hover:bg-slate-800/90 hover:border-emerald-500/60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Activity className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono text-emerald-400/80">CELLULAR REPAIR</span>
            </div>
            <div className="text-base font-bold font-serif-sc text-slate-100 group-hover:text-emerald-300 transition-colors">
              生老病死
            </div>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              衰老非道德命令，探索细胞重编程、衰老细胞清除与原位再生。
            </p>
          </button>

          {/* Pillar 2: 弱肉强食 */}
          <button
            onClick={() => onSelectTab('predation')}
            className={`group relative p-4 rounded-xl border transition-all text-left ${
              currentTab === 'predation'
                ? 'bg-amber-950/40 border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-slate-900/80 border-slate-700/80 hover:bg-slate-800/90 hover:border-amber-500/60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <ShieldAlert className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono text-amber-400/80">MANNA SYNTHESIS</span>
            </div>
            <div className="text-base font-bold font-serif-sc text-slate-100 group-hover:text-amber-300 transition-colors">
              弱肉强食
            </div>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              空气与水直接合成“分子曼娜”，终结掠夺与支配本能。
            </p>
          </button>

          {/* Pillar 3: 自然灾害 */}
          <button
            onClick={() => onSelectTab('disaster')}
            className={`group relative p-4 rounded-xl border transition-all text-left ${
              currentTab === 'disaster'
                ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/80 border-slate-700/80 hover:bg-slate-800/90 hover:border-cyan-500/60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Waves className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono text-cyan-400/80">RESILIENT HABITAT</span>
            </div>
            <div className="text-base font-bold font-serif-sc text-slate-100 group-hover:text-cyan-300 transition-colors">
              自然灾害
            </div>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              化整为零的模块化海洋浮岛，抗台风消能与零自重断裂。
            </p>
          </button>
        </div>

        {/* Convergence Bar */}
        <div className="relative w-full max-w-2xl flex items-center justify-center mt-3">
          <div className="absolute top-0 left-[15%] w-0.5 h-4 bg-emerald-500/60" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-amber-400/60" />
          <div className="absolute top-0 right-[15%] w-0.5 h-4 bg-cyan-500/60" />
          <div className="absolute top-4 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-emerald-500/60 via-rose-400/70 to-cyan-500/60" />
        </div>

        <div className="w-0.5 h-6 bg-gradient-to-b from-rose-400/80 to-rose-400 mt-4" />
        <ArrowDown className="w-4 h-4 text-rose-400 -mt-1 mb-2 animate-bounce" />

        {/* Tier 3: 桃花浮岛 */}
        <button
          onClick={() => onSelectTab('island')}
          className={`group relative px-9 py-3.5 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
            currentTab === 'island'
              ? 'bg-rose-500/20 border-rose-400 text-rose-200 shadow-lg shadow-rose-500/10'
              : 'bg-slate-800/80 border-slate-700 hover:border-rose-400/70 text-slate-200 hover:bg-slate-800'
          }`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400 ring-4 ring-rose-400/20" />
          <div className="text-left">
            <div className="text-[10px] font-mono uppercase tracking-wider text-rose-300/80 flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-rose-400" />
              <span>Living Sanctuary & Covenant</span>
            </div>
            <div className="text-lg font-bold font-serif-sc tracking-wide text-rose-100 group-hover:text-rose-200">
              桃花浮岛
            </div>
          </div>
          <span className="text-xs px-2 py-0.5 rounded bg-rose-950/70 border border-rose-800/50 text-rose-300 font-serif-sc">
            一座可以离开的岛
          </span>
        </button>

        {/* Vertical connector down */}
        <div className="w-0.5 h-5 bg-gradient-to-b from-rose-400 to-indigo-400 my-1" />
        <ArrowDown className="w-4 h-4 text-indigo-400 -mt-1 mb-2 animate-pulse" />

        {/* Tier 4: Let's Decide */}
        <button
          onClick={() => onSelectTab('letsdecide')}
          className={`group relative px-9 py-3.5 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
            currentTab === 'letsdecide'
              ? 'bg-indigo-500/25 border-indigo-400 text-indigo-100 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-400/30'
              : 'bg-slate-800/80 border-slate-700 hover:border-indigo-400/70 text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Vote className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-300/80">Participatory Consensus Chamber</div>
            <div className="text-lg font-bold font-display tracking-wider text-indigo-200">
              Let's Decide
            </div>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-700/50 text-indigo-300 font-mono">
            智能生命决断议事厅
          </span>
        </button>
      </div>
    </div>
  );
};
