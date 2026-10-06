/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeaderNav, NavMenu } from './components/HeaderNav';
import { RuralScrollHome } from './components/RuralScrollHome';
import { TrackDetailView } from './components/TrackDetailView';
import { FloatingIslandView } from './components/FloatingIslandView';
import { LetsDecideView } from './components/LetsDecideView';
import { ArticleEditorView } from './components/ArticleEditorView';
import { AdminD1View } from './components/AdminD1View';
import { syncD1PublishedArticles } from './content/loader';

function checkIsAdminRoute(): boolean {
  const { pathname, hash } = window.location;
  return (
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    hash === '#/admin'
  );
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavMenu>('island');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(checkIsAdminRoute);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(() => {
    return (
      window.location.hash === '#/editor' ||
      new URLSearchParams(window.location.search).get('editor') === '1'
    );
  });
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    syncD1PublishedArticles().then(() => {
      setRefreshTick((t) => t + 1);
    });
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsAdminOpen(checkIsAdminRoute());
      if (window.location.hash === '#/editor') {
        setIsEditorOpen(true);
      }
    };
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: NavMenu) => {
    setIsAdminOpen(false);
    setIsEditorOpen(false);
    if (
      window.location.pathname === '/admin' ||
      window.location.pathname.startsWith('/admin/') ||
      window.location.hash === '#/admin' ||
      window.location.hash === '#/editor'
    ) {
      window.history.pushState(null, '', '/');
    }
    setCurrentTab(tab);
    scrollToTop();
  };

  const closeAdmin = () => {
    setIsAdminOpen(false);
    window.history.pushState(null, '', '/');
    scrollToTop();
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    if (window.location.hash === '#/editor') {
      window.history.replaceState(null, '', window.location.pathname);
    }
    scrollToTop();
  };

  return (
    <div className="min-h-screen flex flex-col xuan-paper-surface text-[#3d3832] font-serif-sc selection:bg-[#d8cfc0]/60 selection:text-[#26221e] overflow-x-hidden">
      {/* 画心（顶部山水长卷）+ 装裱（窄导航区域） */}
      <HeaderNav
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
      />

      {/* 页面文稿内容区 */}
      <main className="flex-1 w-full" key={refreshTick}>
        {isAdminOpen ? (
          <AdminD1View
            onBackToSite={closeAdmin}
            onArticlesChanged={() => setRefreshTick((t) => t + 1)}
          />
        ) : isEditorOpen ? (
          <ArticleEditorView
            onClose={closeEditor}
            onSaved={() => setRefreshTick((t) => t + 1)}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <RuralScrollHome onNavigateTab={handleSelectTab} />
            )}

            {currentTab === 'predation' && (
              <TrackDetailView
                trackId="predation"
                onNavigateToIsland={() => handleSelectTab('island')}
                onNavigateToDecide={() => handleSelectTab('letsdecide')}
                onSwitchTrack={(id) => handleSelectTab(id)}
              />
            )}

            {currentTab === 'aging' && (
              <TrackDetailView
                trackId="aging"
                onNavigateToIsland={() => handleSelectTab('island')}
                onNavigateToDecide={() => handleSelectTab('letsdecide')}
                onSwitchTrack={(id) => handleSelectTab(id)}
              />
            )}

            {currentTab === 'disaster' && (
              <TrackDetailView
                trackId="disaster"
                onNavigateToIsland={() => handleSelectTab('island')}
                onNavigateToDecide={() => handleSelectTab('letsdecide')}
                onSwitchTrack={(id) => handleSelectTab(id)}
              />
            )}

            {currentTab === 'island' && (
              <FloatingIslandView
                onNavigateToDecide={() => handleSelectTab('letsdecide')}
                onNavigateToTrack={(id) => handleSelectTab(id)}
              />
            )}

            {currentTab === 'letsdecide' && (
              <LetsDecideView
                onNavigateToIslandArticle={() => handleSelectTab('island')}
              />
            )}
          </>
        )}
      </main>

      {/* 素雅宣纸尾跋页脚 */}
      <footer className="w-full border-t border-[#e2dac9]/70 py-7 px-5 sm:px-8 text-xs text-[#787066] font-serif-sc">
        <div className="max-w-2xl mx-auto">
          <span>
            一个真正自由的故乡，不是把你留下来的地方，是你离开以后，仍然愿意回去的地方。
          </span>
        </div>
      </footer>
    </div>
  );
}
