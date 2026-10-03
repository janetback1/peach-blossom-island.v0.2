/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CIVDESK_TRACKS, CivDeskTrack } from '../data/civDeskData';
import { 
  Activity, 
  ShieldAlert, 
  Waves, 
  Microscope, 
  HelpCircle, 
  AlertTriangle, 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  CheckCircle2, 
  FileText,
  Compass,
  Vote
} from 'lucide-react';

interface TrackDetailViewProps {
  trackId: 'aging' | 'predation' | 'disaster';
  onNavigateToIsland: () => void;
  onNavigateToDecide: (motionId?: string) => void;
  onSwitchTrack: (trackId: 'aging' | 'predation' | 'disaster') => void;
}

export const TrackDetailView: React.FC<TrackDetailViewProps> = ({
  trackId,
  onNavigateToIsland,
  onNavigateToDecide,
  onSwitchTrack
}) => {
  const track = CIVDESK_TRACKS.find((t) => t.id === trackId) || CIVDESK_TRACKS[0];
  const [activeDossierId, setActiveDossierId] = useState<string | null>(null);

  const getTheme = () => {
    switch (trackId) {
      case 'aging':
        return {
          icon: <Activity className="w-5 h-5 text-emerald-400" />,
          titleColor: 'text-emerald-300',
          badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
          gradient: 'from-emerald-950/40 via-slate-900 to-slate-950',
          glow: 'bg-emerald-500/10'
        };
      case 'predation':
        return {
          icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
          titleColor: 'text-amber-300',
          badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
          gradient: 'from-amber-950/40 via-slate-900 to-slate-950',
          glow: 'bg-amber-500/10'
        };
      case 'disaster':
        return {
          icon: <Waves className="w-5 h-5 text-cyan-400" />,
          titleColor: 'text-cyan-300',
          badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
          gradient: 'from-cyan-950/40 via-slate-900 to-slate-950',
          glow: 'bg-cyan-500/10'
        };
    }
  };

  const theme = getTheme();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Top Breadcrumb & Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>文明编辑部</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-200 font-bold">{track.titleZh}</span>
        </div>

        {/* Quick Switcher among 3 tracks */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <button
            onClick={() => onSwitchTrack('aging')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              trackId === 'aging' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>生老病死</span>
          </button>
          <button
            onClick={() => onSwitchTrack('predation')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              trackId === 'predation' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>弱肉强食</span>
          </button>
          <button
            onClick={() => onSwitchTrack('disaster')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              trackId === 'disaster' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            <span>自然灾害</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <section className={`relative p-8 md:p-12 rounded-3xl bg-gradient-to-br ${theme.gradient} border border-slate-800 shadow-2xl overflow-hidden`}>
        <div className={`absolute top-0 right-0 w-96 h-96 ${theme.glow} rounded-full blur-3xl pointer-events-none`} />

        <div className="relative z-10 max-w-3xl">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono mb-4 ${theme.badgeBg}`}>
            {theme.icon}
            <span>CivDesk Pillar Track · {track.titleEn}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold font-serif-sc tracking-tight text-slate-100">
            {track.titleZh}
          </h1>

          <p className="mt-3 text-base md:text-lg text-slate-300 font-serif-sc leading-relaxed">
            {track.tagline}
          </p>

          <div className="mt-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>CivDesk 核心追问</span>
            </div>
            <p className="text-sm md:text-base font-serif-sc font-bold text-slate-100 leading-relaxed">
              “{track.leadQuestion}”
            </p>
          </div>
        </div>
      </section>

      {/* Philosophical Deconstruction */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>为何拒绝“世界本来就是这样” (Philosophical Deconstruction)</span>
        </div>
        <p className="text-sm md:text-base text-slate-300 font-serif-sc leading-relaxed whitespace-pre-line">
          {track.descriptionZh}
        </p>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs md:text-sm text-slate-400 font-serif-sc italic">
          注记：{track.whyChallenged}
        </div>
      </div>

      {/* Deep Scientific Dossiers */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Microscope className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold font-serif-sc text-slate-100">
              前沿论文、关键技术与失败记录
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {track.scientificDossiers.length} 项正在推进的研究档案
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {track.scientificDossiers.map((dossier) => {
            const isExpanded = activeDossierId === dossier.id;

            return (
              <div
                key={dossier.id}
                className={`p-6 rounded-2xl bg-slate-900 border transition-all duration-300 flex flex-col justify-between ${
                  isExpanded
                    ? 'border-amber-400/80 shadow-xl shadow-amber-500/10'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                      {dossier.domain}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {dossier.currentStage}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-serif-sc text-slate-100 mt-2">
                    {dossier.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                    {dossier.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800">
                  <div className="text-xs text-amber-200/90 font-serif-sc italic bg-amber-500/5 p-3 rounded-xl border border-amber-500/10 mb-3">
                    “{dossier.radicalInquiry}”
                  </div>

                  {isExpanded && (
                    <div className="space-y-2 mt-3 pt-3 border-t border-slate-800/80 text-xs">
                      <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/40 text-rose-300 font-mono">
                        <strong className="block text-rose-400 text-[10px] mb-1">已记录的失败教训：</strong>
                        {dossier.failedAttemptsLogged}
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-emerald-300 font-mono">
                        <strong className="block text-emerald-400 text-[10px] mb-1">有希望的工程方向：</strong>
                        {dossier.hopefulDirection}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setActiveDossierId(isExpanded ? null : dossier.id)}
                    className="w-full mt-2 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-mono text-slate-300 transition-colors flex items-center justify-center gap-1 border border-slate-800"
                  >
                    <span>{isExpanded ? '收起档案详情' : '展开失败记录与攻坚突破'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Direct Bridge to Island & Let's Decide */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold font-serif-sc text-slate-100">
            将本领域的科学探索转化为现实生存形态与宇宙投票
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-serif-sc max-w-xl">
            桃花浮岛为本领域提供了海上物理实验温床；而 Let's Decide 决断议事厅则由人类与AI共同为伦理边界投票。
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToIsland}
            className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-serif-sc transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4 text-rose-400" />
            <span>前往桃花浮岛工程节点</span>
          </button>
          <button
            onClick={() => onNavigateToDecide()}
            className="px-4 py-2.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 text-xs font-serif-sc transition-colors flex items-center gap-1.5"
          >
            <Vote className="w-4 h-4 text-indigo-400" />
            <span>进入议事厅决断</span>
          </button>
        </div>
      </div>
    </div>
  );
};
