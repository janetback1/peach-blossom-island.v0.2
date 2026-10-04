/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DELIBERATION_MOTIONS } from '../data/letsDecideData';

interface LetsDecideViewProps {
  initialMotionId?: string;
  onNavigateToIslandArticle?: (num: number) => void;
}

export const LetsDecideView: React.FC<LetsDecideViewProps> = ({
  initialMotionId
}) => {
  const [enteredTool, setEnteredTool] = useState(Boolean(initialMotionId));
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleSelectOption = (motionId: string, optionId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [motionId]: optionId }));
  };

  if (!enteredTool) {
    return (
      <article className="max-w-2xl mx-auto px-5 sm:px-8 py-10 sm:py-14 text-stone-800 font-serif-sc space-y-8">
        <header className="space-y-4 border-b border-stone-300/70 pb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-wide">
            Let's Decide
          </h1>
          <p className="text-base sm:text-lg leading-loose text-stone-800">
            程序正义的公共决策工具，让协商、授权、决定、修改和退出成为可能。
          </p>
        </header>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setEnteredTool(true)}
            className="text-base text-teal-900 hover:underline cursor-pointer"
          >
            进入 Let's Decide 决策与议案现场 →
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="max-w-2xl mx-auto px-5 sm:px-8 py-10 sm:py-14 text-stone-800 font-serif-sc space-y-10">
      <div className="pb-4 border-b border-stone-300/70">
        <button
          type="button"
          onClick={() => setEnteredTool(false)}
          className="text-sm text-teal-900 hover:underline cursor-pointer"
        >
          ← 返回 Let's Decide 简介
        </button>
      </div>

      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
          Let's Decide · 公共决策议案录
        </h1>
        <p className="text-sm text-stone-600">
          围绕《智能生命宪法》与《生命共同体协议》展开的公共讨论与表决实验
        </p>
      </header>

      <div className="divide-y divide-stone-300/70">
        {DELIBERATION_MOTIONS.map((motion, idx) => {
          const chosen = selectedOptions[motion.id];
          return (
            <section key={motion.id} className="py-8 space-y-4">
              <div className="text-xs text-stone-500">
                议案 0{idx + 1} · {motion.code} · 提议方：{motion.proposer}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                {motion.titleZh}
              </h2>
              <p className="text-base leading-loose text-stone-800">
                {motion.contextZh}
              </p>
              <p className="text-sm leading-relaxed text-stone-600">
                核心分歧：{motion.dilemmaZh}
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="text-xs text-stone-500">可选决议方向（点击可记录立场）：</div>
                {motion.options.map((opt, optIdx) => {
                  const isChosen = chosen === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(motion.id, opt.id)}
                      className={`p-3.5 border transition-colors cursor-pointer ${
                        isChosen
                          ? 'border-teal-800 bg-teal-900/5'
                          : 'border-stone-300/80 hover:border-stone-500'
                      }`}
                    >
                      <div className="text-sm font-bold text-stone-900">
                        选项 {optIdx + 1}：{opt.labelZh}
                        {isChosen && <span className="ml-2 text-xs text-teal-900">（已选择）</span>}
                      </div>
                      <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                        {opt.descZh}
                      </p>
                    </div>
                  );
                })}
              </div>

              {motion.sampleTestimonies.length > 0 && (
                <div className="pt-3 space-y-2">
                  <div className="text-xs text-stone-500">已收录讨论发言：</div>
                  {motion.sampleTestimonies.map((t, tIdx) => (
                    <blockquote
                      key={tIdx}
                      className="pl-3 border-l-2 border-stone-300 text-sm text-stone-700 leading-relaxed"
                    >
                      “{t.argument}” —— <span className="text-stone-500">{t.author}（{t.role}）</span>
                    </blockquote>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </article>
  );
};
