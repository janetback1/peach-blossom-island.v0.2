/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CIVDESK_MANIFESTO, 
  CIVDESK_TRACKS, 
  CivDeskTrack 
} from '../data/civDeskData';
import { 
  Activity, 
  ShieldAlert, 
  Waves, 
  ArrowRight, 
  FileText, 
  Microscope, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface CivDeskViewProps {
  initialTrack?: string;
  onNavigateToIsland: () => void;
  onNavigateToDecide: (motionId?: string) => void;
}

export const CivDeskView: React.FC<CivDeskViewProps> = ({
  initialTrack,
  onNavigateToIsland,
  onNavigateToDecide
}) => {
  const [selectedTrackId, setSelectedTrackId] = useState<string>(initialTrack || 'all');
  const [activeDossierId, setActiveDossierId] = useState<string | null>(null);

  const displayedTracks = selectedTrackId === 'all'
    ? CIVDESK_TRACKS
    : CIVDESK_TRACKS.filter((t) => t.id === selectedTrackId);

  return (
    <div className="space-y-12 max-w-6xl mx-auto px-4 py-8">
      {/* Manifesto Hero Section */}
      <section className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Ambient atmospheric gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>CivDesk · 文明问题编辑部立项宣言</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold font-serif-sc tracking-tight text-slate-100 leading-tight">
            既然人类有能力改变世界，<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-amber-100">
              为什么还要对基本的痛苦说“没办法”？
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-slate-300 font-serif-sc leading-relaxed whitespace-pre-line">
            生命会衰老、会生病、会死亡；为了活着而吃掉其他生命；被洪水、风暴与地震突然摧毁。
            我们习惯于把它们称作“自然规律”、“生存竞争”、“人生无常”。
            但自然发生，不等于道德上必须接受。
            <strong className="text-amber-200"> CivDesk 不接受“世界本来就是这样”作为问题的终点。</strong>
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => setSelectedTrackId('aging')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-200 text-xs font-medium flex items-center gap-2 transition-colors"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>探索「生老病死」</span>
            </button>
            <button
              onClick={() => setSelectedTrackId('predation')}
              className="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-200 text-xs font-medium flex items-center gap-2 transition-colors"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>探索「弱肉强食」</span>
            </button>
            <button
              onClick={() => setSelectedTrackId('disaster')}
              className="px-4 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-200 text-xs font-medium flex items-center gap-2 transition-colors"
            >
              <Waves className="w-4 h-4 text-cyan-400" />
              <span>探索「自然灾害」</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5-Step Methodology */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg md:text-xl font-bold font-serif-sc text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>CivDesk 编辑部研究方法论</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              不神化技术，也不因为困难就停止寻找 · 记录失败比吹嘘胜利更有价值
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
            5 STEPS PIPELINE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {CIVDESK_MANIFESTO.methodology.map((m) => (
            <div
              key={m.step}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-amber-500/40 transition-colors"
            >
              <div className="text-2xl font-black font-mono text-amber-400/40 mb-1">{m.step}</div>
              <div className="text-sm font-bold font-serif-sc text-slate-200">{m.name}</div>
              <div className="text-xs text-slate-400 mt-2 leading-relaxed">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Track Selector Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setSelectedTrackId('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            selectedTrackId === 'all'
              ? 'bg-slate-100 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          全部三大前沿 (All 3 Tracks)
        </button>
        <button
          onClick={() => setSelectedTrackId('aging')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            selectedTrackId === 'aging'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>生老病死</span>
        </button>
        <button
          onClick={() => setSelectedTrackId('predation')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            selectedTrackId === 'predation'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>弱肉强食</span>
        </button>
        <button
          onClick={() => setSelectedTrackId('disaster')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            selectedTrackId === 'disaster'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Waves className="w-3.5 h-3.5 text-cyan-400" />
          <span>自然灾害</span>
        </button>
      </div>

      {/* Main Tracks Content */}
      <div className="space-y-12">
        {displayedTracks.map((track) => {
          const accentColor =
            track.id === 'aging'
              ? { border: 'border-emerald-500/40', bg: 'bg-emerald-500/10', text: 'text-emerald-300', badge: 'bg-emerald-950 text-emerald-300 border-emerald-800' }
              : track.id === 'predation'
              ? { border: 'border-amber-500/40', bg: 'bg-amber-500/10', text: 'text-amber-300', badge: 'bg-amber-950 text-amber-300 border-amber-800' }
              : { border: 'border-cyan-500/40', bg: 'bg-cyan-500/10', text: 'text-cyan-300', badge: 'bg-cyan-950 text-cyan-300 border-cyan-800' };

          return (
            <div
              key={track.id}
              className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6"
            >
              {/* Track Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border ${accentColor.badge}`}>
                      TRACK: {track.titleEn.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-500 font-serif-sc">
                      {track.tagline}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-serif-sc text-slate-100 mt-2">
                    {track.titleZh}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono text-slate-400 block">
                    连接解决方案
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={onNavigateToIsland}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-serif-sc transition-colors"
                    >
                      桃花浮岛工程节点 →
                    </button>
                    <button
                      onClick={() => onNavigateToDecide()}
                      className="px-3 py-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-300 text-xs font-serif-sc transition-colors"
                    >
                      议事厅决断投票 →
                    </button>
                  </div>
                </div>
              </div>

              {/* Lead Question & Philosophical Foundation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 mb-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>文明之问 (The Radical Question)</span>
                  </div>
                  <p className="text-sm font-serif-sc text-slate-200 leading-relaxed font-semibold">
                    “{track.leadQuestion}”
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>为何拒绝接受传统叙事</span>
                  </div>
                  <p className="text-xs font-serif-sc text-slate-300 leading-relaxed">
                    {track.whyChallenged}
                  </p>
                </div>
              </div>

              {/* Scientific Dossiers Cards */}
              <div className="space-y-4">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Microscope className="w-4 h-4 text-amber-400" />
                  <span>前沿科学档案与正在进行的实验 (Scientific Dossiers)</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {track.scientificDossiers.map((dossier) => {
                    const isExpanded = activeDossierId === dossier.id;

                    return (
                      <div
                        key={dossier.id}
                        className={`p-5 rounded-2xl bg-slate-950/80 border transition-all duration-300 flex flex-col justify-between ${
                          isExpanded
                            ? 'border-amber-400/80 shadow-lg shadow-amber-500/10'
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          {/* Dossier Header */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                              {dossier.domain}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              {dossier.currentStage}
                            </span>
                          </div>

                          <h4 className="text-base font-bold font-serif-sc text-slate-100 mt-2">
                            {dossier.title}
                          </h4>

                          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                            {dossier.summary}
                          </p>
                        </div>

                        {/* Radical inquiry highlight */}
                        <div className="mt-4 pt-3 border-t border-slate-800/80">
                          <div className="text-[11px] text-amber-200/90 font-serif-sc italic bg-amber-500/5 p-2.5 rounded-lg border border-amber-500/10 mb-3">
                            “{dossier.radicalInquiry}”
                          </div>

                          {/* Failures & Hopeful toggles */}
                          {isExpanded ? (
                            <div className="space-y-2 mt-2 pt-2 border-t border-slate-800/60 text-xs">
                              <div className="p-2 rounded bg-rose-950/30 border border-rose-900/40 text-rose-300">
                                <span className="font-mono font-bold block mb-0.5 text-[10px] text-rose-400">
                                  已记录的失败教训：
                                </span>
                                {dossier.failedAttemptsLogged}
                              </div>
                              <div className="p-2 rounded bg-emerald-950/30 border border-emerald-900/40 text-emerald-300">
                                <span className="font-mono font-bold block mb-0.5 text-[10px] text-emerald-400">
                                  有希望的工程方向：
                                </span>
                                {dossier.hopefulDirection}
                              </div>
                            </div>
                          ) : null}

                          <button
                            onClick={() => setActiveDossierId(isExpanded ? null : dossier.id)}
                            className="w-full mt-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-mono text-slate-300 transition-colors flex items-center justify-center gap-1 border border-slate-800"
                          >
                            <span>{isExpanded ? '收起实验档案' : '查看失败记录与攻坚方向'}</span>
                            <ArrowRight className="w-3 h-3 text-amber-400" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Bridge CTA */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-rose-950/50 via-slate-900 to-indigo-950/50 border border-slate-800 text-center space-y-4">
        <h3 className="text-xl md:text-2xl font-bold font-serif-sc text-slate-100">
          从文明实验室，驶向现实的海上居所与公识议会
        </h3>
        <p className="text-xs md:text-sm text-slate-400 max-w-2xl mx-auto font-serif-sc">
          所有的科学论文与哲学反思，最终都在《桃花浮岛：生命共同体协议》中被转化为抗风浪的模块化工程，并在《Let's Decide》由全体智能生命共同票决。
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onNavigateToIsland}
            className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs md:text-sm shadow-lg shadow-rose-500/20 transition-all font-serif-sc"
          >
            登上海上桃花浮岛 →
          </button>
          <button
            onClick={() => onNavigateToDecide()}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 text-xs md:text-sm transition-all font-mono"
          >
            进入 Let's Decide 议事厅 →
          </button>
        </div>
      </section>
    </div>
  );
};
