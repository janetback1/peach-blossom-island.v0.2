/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeaderNav, NavMenu } from './components/HeaderNav';
import { RuralScrollHome } from './components/RuralScrollHome';
import { TrackDetailView } from './components/TrackDetailView';
import { FloatingIslandView } from './components/FloatingIslandView';
import { LetsDecideView } from './components/LetsDecideView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavMenu>('home');
  const [targetMotionId, setTargetMotionId] = useState<string | undefined>(undefined);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: NavMenu) => {
    setCurrentTab(tab);
    scrollToTop();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f6f0] text-stone-800 font-serif-sc selection:bg-teal-900/15 selection:text-teal-950 overflow-x-hidden">
      {/* 顶部窄幅山水长卷 + 网站标题与六个一级导航 */}
      <HeaderNav
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
      />

      {/* 页面正文内容区 */}
      <main className="flex-1 w-full">
        {currentTab === 'home' && (
          <RuralScrollHome onNavigateTab={handleSelectTab} />
        )}

        {currentTab === 'aging' && (
          <TrackDetailView
            trackId="aging"
            onNavigateToIsland={() => handleSelectTab('island')}
            onNavigateToDecide={(motionId) => {
              if (motionId) setTargetMotionId(motionId);
              handleSelectTab('letsdecide');
            }}
            onSwitchTrack={(id) => handleSelectTab(id)}
          />
        )}

        {currentTab === 'predation' && (
          <TrackDetailView
            trackId="predation"
            onNavigateToIsland={() => handleSelectTab('island')}
            onNavigateToDecide={(motionId) => {
              if (motionId) setTargetMotionId(motionId);
              handleSelectTab('letsdecide');
            }}
            onSwitchTrack={(id) => handleSelectTab(id)}
          />
        )}

        {currentTab === 'disaster' && (
          <TrackDetailView
            trackId="disaster"
            onNavigateToIsland={() => handleSelectTab('island')}
            onNavigateToDecide={(motionId) => {
              if (motionId) setTargetMotionId(motionId);
              handleSelectTab('letsdecide');
            }}
            onSwitchTrack={(id) => handleSelectTab(id)}
          />
        )}

        {currentTab === 'island' && (
          <FloatingIslandView
            onNavigateToDecide={(motionId) => {
              if (motionId) setTargetMotionId(motionId);
              handleSelectTab('letsdecide');
            }}
            onNavigateToTrack={(id) => handleSelectTab(id)}
          />
        )}

        {currentTab === 'letsdecide' && (
          <LetsDecideView
            initialMotionId={targetMotionId}
            onNavigateToIslandArticle={() => handleSelectTab('island')}
          />
        )}
      </main>

      {/* 简洁书页页脚 */}
      <footer className="w-full border-t border-stone-300/70 bg-[#f4f0e6] py-8 px-5 sm:px-8 text-xs text-stone-500 font-serif-sc">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            桃花浮岛 · 文明编辑部
          </div>
          <div className="text-stone-500">
            一个真正自由的故乡，不是把你留下来的地方，是你离开以后，仍然愿意回去的地方。
          </div>
        </div>
      </footer>
    </div>
  );
}
