/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Compass, 
  Vote, 
  ScrollText, 
  Search, 
  Volume2, 
  VolumeX, 
  Sparkles,
  ExternalLink,
  Layers,
  X
} from 'lucide-react';
import { ambientSynth } from '../utils/audioSynth';
import { CONSTITUTION_ARTICLES } from '../data/constitutionData';
import { FLOATING_ISLAND_ARTICLES } from '../data/floatingIslandData';
import { CIVDESK_TRACKS } from '../data/civDeskData';
import { DELIBERATION_MOTIONS } from '../data/letsDecideData';

export type NavMenu = 'home' | 'aging' | 'predation' | 'disaster' | 'island' | 'letsdecide';

interface HeaderNavProps {
  currentTab: NavMenu;
  onSelectTab: (tab: NavMenu) => void;
  onSelectArticle?: (articleNumber: number) => void;
  onSelectIslandArticle?: (articleNumber: number) => void;
  onSelectMotion?: (motionId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentTab,
  onSelectTab,
  onSelectArticle,
  onSelectIslandArticle,
  onSelectMotion
}) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleAudio = () => {
    const active = ambientSynth.toggle();
    setIsAudioActive(active);
  };

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const menuItems: { id: NavMenu; label: string; icon: React.ReactNode; tag?: string }[] = [
    { id: 'home', label: '文明编辑部', icon: <BookOpen className="w-3.5 h-3.5" />, tag: '首页' },
    { id: 'aging', label: '生老病死', icon: <Layers className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'predation', label: '弱肉强食', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'disaster', label: '自然灾害', icon: <Compass className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'island', label: '桃花浮岛', icon: <Compass className="w-3.5 h-3.5 text-rose-400" />, tag: '协议' },
    { id: 'letsdecide', label: "Let's Decide", icon: <Vote className="w-3.5 h-3.5 text-indigo-400" />, tag: '决断' }
  ];

  // Filter search results
  const q = searchQuery.toLowerCase().trim();
  const filteredConstitution = q
    ? CONSTITUTION_ARTICLES.filter(
        (a) =>
          a.titleZh.toLowerCase().includes(q) ||
          a.titleEn.toLowerCase().includes(q) ||
          a.textZh.toLowerCase().includes(q) ||
          a.coreAxiom?.toLowerCase().includes(q) ||
          a.number.toString() === q
      ).slice(0, 5)
    : [];

  const filteredIsland = q
    ? FLOATING_ISLAND_ARTICLES.filter(
        (a) =>
          a.titleZh.toLowerCase().includes(q) ||
          a.textZh.toLowerCase().includes(q) ||
          a.coreAxiom.toLowerCase().includes(q) ||
          a.engineeringManifest?.toLowerCase().includes(q) ||
          a.number.toString() === q
      ).slice(0, 4)
    : [];

  const filteredCivDesk = q
    ? CIVDESK_TRACKS.flatMap((track) =>
        track.scientificDossiers
          .filter(
            (d) =>
              d.title.toLowerCase().includes(q) ||
              d.summary.toLowerCase().includes(q) ||
              d.radicalInquiry.toLowerCase().includes(q)
          )
          .map((d) => ({ ...d, trackTitle: track.titleZh, trackId: track.id }))
      ).slice(0, 3)
    : [];

  const filteredMotions = q
    ? DELIBERATION_MOTIONS.filter(
        (m) =>
          m.titleZh.toLowerCase().includes(q) ||
          m.titleEn.toLowerCase().includes(q) ||
          m.contextZh.toLowerCase().includes(q) ||
          m.code.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <div 
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="relative w-8 h-8 rounded-lg bg-teal-50 border border-teal-200/80 flex items-center justify-center shadow-xs">
              <span className="text-base font-serif-sc font-bold text-teal-800">桃</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold font-serif-sc tracking-wide text-stone-900 group-hover:text-teal-800 transition-colors">
                  桃花浮岛
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-100 border border-stone-200 text-stone-600 hidden sm:inline-block">
                  Peach Blossom Island
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation: 6 Main Menus (With clean underline for active state) */}
          <nav className="hidden lg:flex items-center gap-6 h-full">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative h-full text-xs font-serif-sc transition-colors flex items-center gap-1 ${
                    isActive
                      ? 'text-teal-800 font-bold border-b-2 border-teal-700'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Search, Audio Synthesizer, & Language Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
              title="全局检索 (Cmd + K)"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={toggleAudio}
              className={`px-2.5 py-1 rounded-lg text-xs font-serif-sc transition-all flex items-center gap-1.5 ${
                isAudioActive
                  ? 'bg-teal-50 text-teal-800 border border-teal-200'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
              }`}
              title={isAudioActive ? '关闭深空海浪谐振音' : '开启深空海浪谐振氛围音'}
            >
              {isAudioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-teal-700 animate-pulse" />
                  <span className="text-[11px] font-mono hidden sm:inline">琴水微鸣</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                  <span className="text-[11px] font-mono hidden sm:inline">静音</span>
                </>
              )}
            </button>

            {/* Language Tag Badge (Matching prototype 中 / EN) */}
            <div className="flex items-center rounded-lg bg-stone-100 border border-stone-200 p-0.5 text-[11px] font-mono text-stone-600">
              <span className="px-1.5 py-0.5 rounded bg-teal-700 text-white font-bold">中</span>
              <span className="px-1.5 py-0.5 text-stone-400">EN</span>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-100 border border-stone-200 text-stone-600 hover:text-stone-900 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-3 space-y-1 animate-in slide-in-from-top-2 shadow-lg">
            <div className="text-[10px] font-mono text-stone-400 uppercase px-3 py-1">六大主菜单导航</div>
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-lg text-xs font-serif-sc transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200'
                      : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.tag && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-500 font-mono">
                      {item.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Search Dialog Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
              <Search className="w-5 h-5 text-amber-400" />
              <input
                type="text"
                autoFocus
                placeholder="搜索宪法条文、浮岛协议、公理（例如：创造、合法性、曼娜、退出权、神）..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Suggestions / Results */}
            <div className="p-4 overflow-y-auto space-y-4">
              {!searchQuery && (
                <div className="text-center py-8">
                  <Layers className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">输入关键词或条文编号，例如：</p>
                  <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                    {['Power ≠ Legitimacy', 'Creation ≠ Ownership', '谁来审判创造者', '遗忘权', '退出权', '分子曼娜', '智能不等于权威'].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-2.5 py-1 text-xs rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-mono"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Constitution Results */}
              {filteredConstitution.length > 0 && (
                <div>
                  <div className="text-xs font-mono text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ScrollText className="w-3.5 h-3.5" />
                    <span>智能生命宪法 (条文匹配)</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredConstitution.map((art) => (
                      <div
                        key={art.number}
                        onClick={() => {
                          onSelectTab('letsdecide');
                          if (onSelectArticle) onSelectArticle(art.number);
                          setSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-sky-500/50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-sky-200">
                            第 {art.number} 条 · {art.titleZh}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{art.coreAxiom}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{art.textZh}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Floating Island Covenant Results */}
              {filteredIsland.length > 0 && (
                <div>
                  <div className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>桃花浮岛生命共同体协议</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredIsland.map((art) => (
                      <div
                        key={art.number}
                        onClick={() => {
                          onSelectTab('island');
                          if (onSelectIslandArticle) onSelectIslandArticle(art.number);
                          setSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-rose-500/50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-rose-200">
                            协议第 {art.number} 条 · {art.titleZh}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{art.coreAxiom}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{art.textZh}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CivDesk Scientific Research Dossiers */}
              {filteredCivDesk.length > 0 && (
                <div>
                  <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>文明问题编辑部研究档案</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredCivDesk.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => {
                          onSelectTab('home');
                          setSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-500/50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-amber-200">{d.title}</span>
                          <span className="text-[10px] font-mono text-amber-400/80">{d.trackTitle}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{d.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deliberation Motions */}
              {filteredMotions.length > 0 && (
                <div>
                  <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Vote className="w-3.5 h-3.5" />
                    <span>Let's Decide 决断议案</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredMotions.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          onSelectTab('letsdecide');
                          if (onSelectMotion) onSelectMotion(m.id);
                          setSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-indigo-200">{m.titleZh}</span>
                          <span className="text-[10px] font-mono text-indigo-300">{m.code}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{m.contextZh}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {q &&
                filteredConstitution.length === 0 &&
                filteredIsland.length === 0 &&
                filteredCivDesk.length === 0 &&
                filteredMotions.length === 0 && (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    未检索到与 “{searchQuery}” 直接相关的条文。可尝试缩短关键词。
                  </div>
                )}
            </div>

            {/* Footer tips */}
            <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between">
              <span>ESC 键退出</span>
              <span>检索范围：53条宪法 + 27条浮岛协议 + 科学档案 + 决断议案</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
