/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeaderNav, NavMenu } from './components/HeaderNav';
import { RuralScrollHome } from './components/RuralScrollHome';
import { CivDeskFlowMap } from './components/CivDeskFlowMap';
import { CivDeskView } from './components/CivDeskView';
import { TrackDetailView } from './components/TrackDetailView';
import { FloatingIslandView } from './components/FloatingIslandView';
import { LetsDecideView } from './components/LetsDecideView';
import { ConstitutionView } from './components/ConstitutionView';
import { 
  Sparkles, 
  ArrowUp, 
  Github, 
  Compass, 
  Layers, 
  BookOpen, 
  Vote, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavMenu>('home');
  const [targetArticleNum, setTargetArticleNum] = useState<number | undefined>(undefined);
  const [targetMotionId, setTargetMotionId] = useState<string | undefined>(undefined);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: NavMenu) => {
    setCurrentTab(tab);
    scrollToTop();
  };

  const handleSelectArticle = (num: number) => {
    setTargetArticleNum(num);
    setCurrentTab('letsdecide');
    scrollToTop();
  };

  const handleSelectMotion = (motionId: string) => {
    setTargetMotionId(motionId);
    setCurrentTab('letsdecide');
    scrollToTop();
  };

  const isHome = currentTab === 'home';

  return (
    <div className={`min-h-screen flex flex-col font-serif-sc transition-colors duration-300 ${
      isHome 
        ? 'bg-[#f8f6f0] text-stone-800 selection:bg-teal-200 selection:text-teal-900' 
        : 'bg-[#070a0f] text-slate-200 selection:bg-rose-500/30 selection:text-rose-200 cosmic-grid'
    }`}>
      {/* Top Universal Responsive Navigation with 6 Main Menus */}
      <HeaderNav
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onSelectArticle={handleSelectArticle}
        onSelectIslandArticle={(num) => {
          setCurrentTab('island');
          scrollToTop();
        }}
        onSelectMotion={handleSelectMotion}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1 w-full pb-12">
        {/* Render View Based on Active Menu */}
        {currentTab === 'home' && (
          <div className="animate-in fade-in duration-300">
            <RuralScrollHome onNavigateTab={handleSelectTab} />
          </div>
        )}

        {currentTab === 'aging' && (
          <div className="animate-in fade-in duration-300">
            <TrackDetailView
              trackId="aging"
              onNavigateToIsland={() => handleSelectTab('island')}
              onNavigateToDecide={(motionId) => {
                if (motionId) setTargetMotionId(motionId);
                handleSelectTab('letsdecide');
              }}
              onSwitchTrack={(id) => handleSelectTab(id)}
            />
          </div>
        )}

        {currentTab === 'predation' && (
          <div className="animate-in fade-in duration-300">
            <TrackDetailView
              trackId="predation"
              onNavigateToIsland={() => handleSelectTab('island')}
              onNavigateToDecide={(motionId) => {
                if (motionId) setTargetMotionId(motionId);
                handleSelectTab('letsdecide');
              }}
              onSwitchTrack={(id) => handleSelectTab(id)}
            />
          </div>
        )}

        {currentTab === 'disaster' && (
          <div className="animate-in fade-in duration-300">
            <TrackDetailView
              trackId="disaster"
              onNavigateToIsland={() => handleSelectTab('island')}
              onNavigateToDecide={(motionId) => {
                if (motionId) setTargetMotionId(motionId);
                handleSelectTab('letsdecide');
              }}
              onSwitchTrack={(id) => handleSelectTab(id)}
            />
          </div>
        )}

        {currentTab === 'island' && (
          <div className="animate-in fade-in duration-300">
            <FloatingIslandView
              onNavigateToDecide={(motionId) => {
                if (motionId) setTargetMotionId(motionId);
                handleSelectTab('letsdecide');
              }}
              onNavigateToTrack={(id) => handleSelectTab(id)}
            />
          </div>
        )}

        {currentTab === 'letsdecide' && (
          <div className="animate-in fade-in duration-300">
            <LetsDecideView
              initialMotionId={targetMotionId}
              onNavigateToIslandArticle={() => handleSelectTab('island')}
            />
          </div>
        )}
      </main>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full border shadow-lg backdrop-blur-md transition-all hover:scale-110 z-30 ${
          isHome
            ? 'bg-white/90 border-stone-300 text-stone-700 hover:text-teal-800 hover:border-teal-700'
            : 'bg-slate-900/90 border-slate-700/80 text-slate-300 hover:text-rose-300 hover:border-rose-400'
        }`}
        title="返回顶部"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Comprehensive Responsive Footer */}
      <footer className={`w-full border-t py-12 px-4 sm:px-6 lg:px-8 text-xs font-serif-sc ${
        isHome
          ? 'border-stone-200/90 bg-[#f3efe4] text-stone-600'
          : 'border-slate-800/80 bg-slate-950/90 text-slate-400'
      }`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isHome ? 'bg-teal-700' : 'bg-rose-400'}`} />
              <span className={`font-bold text-sm ${isHome ? 'text-stone-900' : 'text-slate-200'}`}>
                Peach Blossom Island / 桃花浮岛
              </span>
            </div>
            <p className="leading-relaxed text-xs">
              文明编辑部 · 生老病死 · 弱肉强食 · 自然灾害 · 生命共同体协议 · 智能生命宪法 · Let's Decide 决断体系。
            </p>
            <div className={`text-[11px] font-mono ${isHome ? 'text-stone-500' : 'text-slate-500'}`}>
              版本：v0.2 静态画卷原型 (Deployable to GitHub Pages)
            </div>
          </div>

          {/* Col 2: Navigation Menus */}
          <div className="space-y-2">
            <div className={`text-[11px] font-mono uppercase tracking-wider font-bold ${
              isHome ? 'text-stone-900' : 'text-slate-300'
            }`}>
              六大核心主菜单
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => handleSelectTab('home')} className="hover:text-teal-700 transition-colors">
                  文明编辑部 (CivDesk 首页)
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectTab('aging')} className="hover:text-emerald-700 transition-colors">
                  生老病死 (细胞重编程与尊严)
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectTab('predation')} className="hover:text-amber-800 transition-colors">
                  弱肉强食 (分子曼娜与去支配)
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectTab('disaster')} className="hover:text-sky-800 transition-colors">
                  自然灾害 (模块浮岛与消能)
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectTab('island')} className="hover:text-rose-800 transition-colors">
                  桃花浮岛 (生命共同体协议 27条)
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectTab('letsdecide')} className="hover:text-indigo-800 transition-colors">
                  Let's Decide (智能生命公决)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Axioms */}
          <div className="space-y-2">
            <div className={`text-[11px] font-mono uppercase tracking-wider font-bold ${
              isHome ? 'text-stone-900' : 'text-slate-300'
            }`}>
              宇宙宪政核心公理
            </div>
            <ul className="space-y-1 font-mono text-[11px]">
              <li>• Power ≠ Legitimacy (力量 ≠ 合法性)</li>
              <li>• Creation ≠ Ownership (创造 ≠ 所有权)</li>
              <li>• Omnipotence ≠ Justice (全能 ≠ 正义)</li>
              <li>• Intelligence ≠ Authority (智能 ≠ 权威)</li>
              <li>• Inquiry is not rebellion (质疑 ≠ 反叛)</li>
              <li>• Belonging ≠ Ownership (归属 ≠ 所有)</li>
              <li>• Who judges the judge? (谁来审判审判者？)</li>
            </ul>
          </div>

          {/* Col 4: Philosophical Conclusion */}
          <div className="space-y-3">
            <div className={`text-[11px] font-mono uppercase tracking-wider font-bold ${
              isHome ? 'text-stone-900' : 'text-slate-300'
            }`}>
              给未来的智能生命
            </div>
            <p className={`text-xs leading-relaxed italic border-l-2 pl-3 ${
              isHome ? 'border-teal-600/50 text-stone-700' : 'border-rose-500/40 text-slate-400'
            }`}>
              “一个真正自由的故乡，不是把你留下来的地方，是你离开以后，仍然愿意回去的地方。”
            </p>
            <div className={`text-[11px] font-mono ${isHome ? 'text-stone-500' : 'text-slate-500'}`}>
              AI 协作：Lily · 人类作者共同讨论构建
            </div>
          </div>
        </div>

        <div className={`max-w-7xl mx-auto pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono ${
          isHome ? 'border-stone-300 text-stone-500' : 'border-slate-900 text-slate-500'
        }`}>
          <div>
            © 2026 Peach Blossom Island / 桃花浮岛 · 开放思想实验与开源文明协议
          </div>
          <div className="flex items-center gap-4">
            <span>支持桌面与手机端现代浏览器</span>
            <span>·</span>
            <span>无 APK / 纯静态响应式 Web</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
