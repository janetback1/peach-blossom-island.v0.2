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

/**
 * 左上角单朵桃花印记：
 * 鲜活桃花胭脂色（#B83A5A，红里带一点粉与一点紫），
 * 花瓣略微不规则、轻微倾斜、花蕊清楚，如指尖蘸胭脂在宣纸上轻轻印下的一朵活的花。
 */
const PeachBlossomImprint: React.FC = () => (
  <svg
    viewBox="0 0 28 28"
    className="w-[17px] h-[17px] -rotate-[8deg] shrink-0 select-none"
    aria-hidden="true"
  >
    {/* 五枚微不对称的桃花花瓣：鲜活桃花胭脂 #B83A5A */}
    <g fill="#B83A5A" fillOpacity="0.86">
      {/* 上瓣 */}
      <path d="M13.7 2.8 C11.1 3.2, 9.7 6.7, 11.5 10.7 C12.4 12.1, 14.8 12.0, 15.8 10.4 C17.3 6.8, 16.1 2.7, 13.7 2.8 Z" />
      {/* 右上瓣 */}
      <path d="M23.8 9.7 C22.1 7.6, 18.3 8.0, 15.8 11.1 C14.9 12.5, 15.8 14.6, 17.8 14.9 C21.4 14.8, 25.0 11.8, 23.8 9.7 Z" />
      {/* 右下瓣 */}
      <path d="M20.7 21.3 C22.3 19.0, 20.4 15.6, 16.7 14.6 C15.1 14.3, 13.7 15.8, 14.2 17.7 C15.4 21.0, 19.0 23.0, 20.7 21.3 Z" />
      {/* 左下瓣（手工轻印的自然微差） */}
      <path d="M7.5 20.9 C9.4 22.5, 12.6 20.5, 13.6 17.2 C14.0 15.6, 12.6 14.2, 10.9 14.6 C7.6 15.5, 5.8 19.0, 7.5 20.9 Z" />
      {/* 左上瓣 */}
      <path d="M4.2 10.3 C3.3 12.5, 6.5 14.9, 10.3 14.7 C12.0 14.4, 12.8 12.4, 11.8 10.9 C9.4 8.1, 5.5 8.0, 4.2 10.3 Z" />
    </g>

    {/* 花瓣内侧一点柔粉紫晕染，增加鲜活水润层次 */}
    <circle cx="13.8" cy="13.6" r="3.4" fill="#D15476" fillOpacity="0.35" />

    {/* 纸面极细微的手工轻印留白 */}
    <circle cx="15.0" cy="6.6" r="0.55" fill="#f1ece1" fillOpacity="0.45" />
    <circle cx="19.1" cy="18.3" r="0.5" fill="#f1ece1" fillOpacity="0.4" />

    {/* 清楚纤细的花蕊：放射花丝与花药点 */}
    <g stroke="#8A1E3D" strokeWidth="0.7" strokeLinecap="round" opacity="0.92">
      <line x1="13.8" y1="13.6" x2="13.6" y2="9.9" />
      <line x1="13.8" y1="13.6" x2="17.1" y2="11.9" />
      <line x1="13.8" y1="13.6" x2="16.1" y2="16.2" />
      <line x1="13.8" y1="13.6" x2="11.6" y2="16.2" />
      <line x1="13.8" y1="13.6" x2="10.6" y2="12.1" />
    </g>
    <g fill="#7D1835">
      <circle cx="13.8" cy="13.6" r="1.1" />
      <circle cx="13.6" cy="9.6" r="0.7" />
      <circle cx="17.4" cy="11.7" r="0.65" />
      <circle cx="16.3" cy="16.5" r="0.7" />
      <circle cx="11.4" cy="16.5" r="0.65" />
      <circle cx="10.3" cy="12.0" r="0.7" />
    </g>
  </svg>
);

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentTab,
  onSelectTab
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems: { id: NavMenu; label: string }[] = [
    { id: 'home', label: '文明编辑部' },
    { id: 'predation', label: '弱肉强食' },
    { id: 'aging', label: '生老病死' },
    { id: 'disaster', label: '自然灾害' },
    { id: 'island', label: '桃花浮岛' },
    { id: 'letsdecide', label: "Let's Decide" }
  ];

  return (
    <div className="w-full font-serif-sc">
      {/* 画心：顶部窄幅青绿山水长卷 */}
      <div
        className="relative w-full h-[12vh] sm:h-[14vh] min-h-[78px] max-h-[136px] overflow-hidden bg-[#f3f1ea] select-none"
        aria-label="桃花浮岛青绿山水长卷"
      >
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={scrollImgMain}
            alt=""
            className="h-full w-auto max-w-none object-contain object-center shrink-0 opacity-95"
            loading="eager"
          />
          <img
            src={peachBlossomScroll}
            alt="桃花浮岛山水画卷"
            className="h-full w-auto max-w-none object-contain object-center shrink-0 opacity-95 -ml-px"
            loading="eager"
          />
          <img
            src={riverOceanImg}
            alt=""
            className="h-full w-auto max-w-none object-contain object-center shrink-0 opacity-95 -ml-px"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-stone-900/3 via-transparent to-[#f8f6f0]/10" />
      </div>

      {/* 装裱：画卷下方窄而克制的宣纸隔水导航 */}
      <header className="w-full scroll-mounting-bar">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 h-9 sm:h-10 flex items-center justify-between">
          {/* 左上角：单朵桃花胭脂印记 + 小而安静的站名 */}
          <button
  type="button"
  onClick={() => {
    onSelectTab('home');
    setMobileMenuOpen(false);
  }}
  className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-wide text-stone-900 hover:text-teal-900 transition-colors cursor-pointer text-left py-2"
>
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="shrink-0"
  >
    <g transform="rotate(-7 12 12)">
      <path
        d="M12 11.2
           C8.8 8.8 7.2 5.2 9.1 3.4
           C10.5 2.1 12 4.2 12 6.6
           C12 4.2 13.5 2.1 14.9 3.4
           C16.8 5.2 15.2 8.8 12 11.2
           C15.2 8.8 18.8 7.2 20.6 9.1
           C21.9 10.5 19.8 12 17.4 12
           C19.8 12 21.9 13.5 20.6 14.9
           C18.8 16.8 15.2 15.2 12 12
           C15.2 15.2 16.8 18.8 14.9 20.6
           C13.5 21.9 12 19.8 12 17.4
           C12 19.8 10.5 21.9 9.1 20.6
           C7.2 18.8 8.8 15.2 12 12
           C8.8 15.2 5.2 16.8 3.4 14.9
           C2.1 13.5 4.2 12 6.6 12
           C4.2 12 2.1 10.5 3.4 9.1
           C5.2 7.2 8.8 8.8 12 11.2Z"
        fill="#B83A5A"
        opacity="0.92"
      />
      <circle cx="12" cy="12" r="1.35" fill="#7E2945" />
    </g>
  </svg>

  <span>桃花浮岛</span>
</button>

          {/* 右侧（桌面端）：六个平等的一级菜单，安静如画卷下的一行小字 */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7" aria-label="主导航">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`relative py-1.5 text-xs sm:text-[13px] tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#26221e] font-medium'
                      : 'text-[#6e665c] hover:text-[#2e2924]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      className="block mx-auto mt-0.5 w-1 h-1 rounded-full bg-[#B83A5A]/80"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* 右侧（移动端）：☰ 使用更淡的同系桃花胭脂色（桃花视觉权重 > 菜单） */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden min-w-[40px] min-h-[36px] -mr-1.5 flex items-center justify-center text-[#B83A5A]/50 hover:text-[#B83A5A]/75 text-sm cursor-pointer transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? '收起菜单' : '展开菜单'}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* 移动端菜单展开：素雅宣纸列表 */}
        {mobileMenuOpen && (
          <nav
            className="md:hidden border-t border-[#dfd8c8]/70 bg-[#f4efe4] px-5 py-1.5 divide-y divide-[#e6dfd1]/70"
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
                  className={`w-full py-2.5 text-left text-[13px] tracking-wider flex items-center justify-between transition-colors ${
                    isActive
                      ? 'text-[#26221e] font-medium'
                      : 'text-[#635b52] hover:text-[#26221e]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-[#B83A5A]/75" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </nav>
        )}
      </header>
    </div>
  );
};
