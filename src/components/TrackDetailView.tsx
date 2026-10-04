/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CIVDESK_TRACKS } from '../data/civDeskData';

interface TrackDetailViewProps {
  trackId: 'aging' | 'predation' | 'disaster';
  onNavigateToIsland: () => void;
  onNavigateToDecide: (motionId?: string) => void;
  onSwitchTrack: (trackId: 'aging' | 'predation' | 'disaster') => void;
}

const BRIEF_DESCRIPTIONS: Record<'aging' | 'predation' | 'disaster', string> = {
  aging:
    '研究生命从诞生、成长、衰老到死亡过程中，人类可以如何理解、减轻或改变其中的痛苦。',
  predation:
    '研究生命之间的竞争、捕食、支配与资源争夺，以及人类是否能够设计出不同于自然竞争的社会制度与技术。',
  disaster:
    '研究洪水、风暴、地震、疾病、饥荒等自然力量，以及人类如何通过技术、制度与共同体降低它们造成的伤害。'
};

export const TrackDetailView: React.FC<TrackDetailViewProps> = ({
  trackId
}) => {
  const track = CIVDESK_TRACKS.find((t) => t.id === trackId) || CIVDESK_TRACKS[0];
  const [showArchive, setShowArchive] = useState(false);

  return (
    <article className="max-w-2xl mx-auto px-5 sm:px-8 py-10 sm:py-14 text-stone-800 font-serif-sc space-y-10">
      {/* 栏目主标题与简短说明 */}
      <header className="space-y-4 border-b border-stone-300/70 pb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-wide">
          {track.titleZh}
        </h1>
        <p className="text-base sm:text-lg leading-loose text-stone-800">
          {BRIEF_DESCRIPTIONS[trackId]}
        </p>
      </header>

      {/* 已封存的核心问题与正式研究笔记（文字目录形式，保持页面简洁） */}
      <section className="space-y-4">
        <p className="text-base leading-loose text-stone-700">
          {track.leadQuestion}
        </p>
        <p className="text-base leading-loose text-stone-700 whitespace-pre-line">
          {track.descriptionZh}
        </p>

        <div className="pt-4">
          <button
            type="button"
            onClick={() => setShowArchive((prev) => !prev)}
            className="text-sm text-teal-900 hover:underline cursor-pointer"
          >
            {showArchive
              ? '收起已收录的研究档案 ↑'
              : `展开已收录的「${track.titleZh}」研究档案（共 ${track.scientificDossiers.length} 篇） →`}
          </button>
        </div>

        {showArchive && (
          <div className="mt-6 pt-6 border-t border-stone-300/70 divide-y divide-stone-200/90">
            {track.scientificDossiers.map((dossier, idx) => (
              <div key={dossier.id} className="py-6 space-y-2.5">
                <div className="text-xs text-stone-500">
                  0{idx + 1} · {dossier.domain}
                </div>
                <h2 className="text-base sm:text-lg font-bold text-stone-900">
                  {dossier.title}
                </h2>
                <p className="text-base leading-loose text-stone-800">
                  {dossier.summary}
                </p>
                <p className="text-sm leading-relaxed text-stone-700">
                  问题追问：{dossier.radicalInquiry}
                </p>
                <p className="text-sm leading-relaxed text-stone-600">
                  失败与局限记录：{dossier.failedAttemptsLogged}
                </p>
                <p className="text-sm leading-relaxed text-stone-600">
                  研究方向：{dossier.hopefulDirection}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </article>
  );
};
