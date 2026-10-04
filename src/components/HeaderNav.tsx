/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import peachBlossomScroll from '../assets/images/peach_blossom_scroll_v02_1791025529085.jpg';
import scrollImgMain from '../assets/images/scroll_panorama_main_1791020909631.jpg';
import riverOceanImg from '../assets/images/river_to_ocean_scroll_1791020942875.jpg';

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
  onSelectTab
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems: { id: NavMenu; label: string }[] = [
    { id: 'home', label: '文明编辑部' },
    { id: 'aging', label: '生老病死' },
    { id: 'predation', label: '弱肉强食' },
    { id: 'disaster', label: '自然灾害' },
    { id: 'island', label: '桃花浮岛' },
    { id: 'letsdecide', label: "Let's Decide" }
  ];

  return (
    <div className="w-full bg-[#f8f6f0] text-stone-800 font-serif-sc">
      {/* 1. 顶部窄幅长卷：占手机屏幕高度约 12%～18%，横向静态青绿山水画面 */}
      <div
        className="relative w-full h-[14vh] sm:h-[16vh] min-h-[88px] max-h-[156px] overflow-hidden bg-[#eae4d6] border-b border-stone-300/70 select-none"
        aria-label="桃花浮岛青绿山水横向长卷"
      >
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={scrollImgMain}
            alt="桃花浮岛山水长卷左段"
            className="h-full w-auto min-w-[34%] object-cover object-center shrink-0 opacity-95"
            loading="eager"
          />
          <img
            src={peachBlossomScroll}
            alt="桃花浮岛山水长卷中段"
            className="h-full w-auto min-w-[38%] object-cover object-center shrink-0 opacity-95 -ml-px"
            loading="eager"
          />
          <img
            src={riverOceanImg}
            alt="桃花浮岛山水长卷右段"
            className="h-full w-auto min-w-[34%] object-cover object-center shrink-0 opacity-95 -ml-px"
            loading="eager"
          />
        </div>
        {/* 宣纸温润边缘过渡 */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-stone-900/5 via-transparent to-[#f8f6f0]/40" />
      </div>

      {/* 2. 网站标题与一级导航 Header */}
      <header className="sticky top-0 z-40 w-full bg-[#f8f6f0]/95 backdrop-blur-sm border-b border-stone-300/80">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          {/* 左侧：桃花浮岛 */}
          <button
            type="button"
            onClick={() => {
              onSelectTab('home');
              setMobileMenuOpen(false);
            }}
            className="text-lg sm:text-xl font-bold tracking-wide text-stone-900 hover:text-teal-900 transition-colors cursor-pointer text-left py-2"
          >
            桃花浮岛
          </button>

          {/* 右侧（桌面端）：六个地位平等的一级栏目，保持一行排列 */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="主导航">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`relative py-4 text-sm tracking-wide transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-teal-900 font-semibold border-b-2 border-teal-800'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* 右侧（移动端）：汉堡菜单 ☰ */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center text-stone-800 hover:text-teal-900 text-xl cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? '收起导航菜单' : '展开导航菜单'}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* 移动端展开的六个一级栏目 */}
        {mobileMenuOpen && (
          <nav
            className="md:hidden border-t border-stone-300/70 bg-[#f8f6f0] px-5 py-2 divide-y divide-stone-200/80"
            aria-label="移动端主导航"
          >
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full min-h-[48px] py-3 text-left text-base flex items-center justify-between transition-colors ${
                    isActive
                      ? 'text-teal-900 font-semibold'
                      : 'text-stone-700 hover:text-stone-950'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs text-teal-800">当前栏目</span>}
                </button>
              );
            })}
          </nav>
        )}
      </header>
    </div>
  );
};
