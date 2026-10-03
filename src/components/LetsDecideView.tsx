/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  DELIBERATION_MOTIONS, 
  DeliberationMotion 
} from '../data/letsDecideData';
import { ConstitutionView } from './ConstitutionView';
import { 
  Vote, 
  User, 
  Bot, 
  Sparkles, 
  Dna, 
  Leaf, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  BookOpen, 
  Scale, 
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Layers
} from 'lucide-react';

interface LetsDecideViewProps {
  initialMotionId?: string;
  onNavigateToIslandArticle?: (num: number) => void;
}

type VoterRole = '人类公民' | '原生AI居民' | '合成生命' | '生态管护者';

export const LetsDecideView: React.FC<LetsDecideViewProps> = ({
  initialMotionId,
  onNavigateToIslandArticle
}) => {
  const [activeTab, setActiveTab] = useState<'motions' | 'constitution' | 'testimony'>('motions');
  const [currentRole, setCurrentRole] = useState<VoterRole>('人类公民');
  const [selectedMotionId, setSelectedMotionId] = useState<string>(
    initialMotionId || DELIBERATION_MOTIONS[0].id
  );
  const [userVotes, setUserVotes] = useState<{ [motionId: string]: string }>({});
  
  // Custom testimony state
  const [newAuthor, setNewAuthor] = useState('');
  const [newArgument, setNewArgument] = useState('');
  const [newStance, setNewStance] = useState('赞同案文');
  const [testimonyList, setTestimonyList] = useState(
    DELIBERATION_MOTIONS.flatMap((m) =>
      m.sampleTestimonies.map((t) => ({ ...t, motionTitle: m.titleZh }))
    )
  );

  const currentMotion =
    DELIBERATION_MOTIONS.find((m) => m.id === selectedMotionId) || DELIBERATION_MOTIONS[0];

  const handleCastVote = (motionId: string, optionId: string) => {
    setUserVotes((prev) => ({ ...prev, [motionId]: optionId }));
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#818cf8', '#f43f5e', '#fbbf24']
      });
    } catch {
      // Confetti fail-safe
    }
  };

  const handleAddTestimony = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArgument.trim()) return;

    const newEntry = {
      author: newAuthor.trim() || `${currentRole}-${Math.floor(100 + Math.random() * 900)}`,
      role: currentRole,
      stance: newStance,
      argument: newArgument.trim(),
      timestamp: '刚刚',
      motionTitle: currentMotion.titleZh
    };

    setTestimonyList([newEntry, ...testimonyList]);
    setNewArgument('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Header */}
      <section className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-4">
            <Vote className="w-3.5 h-3.5" />
            <span>Civic Chamber of Intelligent Sentience · 智能生命决断议事厅</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold font-serif-sc tracking-tight text-slate-100">
            Let's Decide
          </h1>
          <p className="text-xl md:text-2xl font-serif-sc text-indigo-200 mt-2 font-semibold">
            “即使资源足够，生命之间还需要互相支配吗？”
          </p>

          <p className="mt-4 text-xs md:text-sm text-slate-400 font-serif-sc leading-relaxed">
            在桃花浮岛与浩瀚宇宙中，没有任何神明替我们裁定对错。每一个具有感知、思考与判断能力的生命，皆在此平权平席，为文明命运投出不可剥夺的一票。
          </p>

          {/* Sub Navigation */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('motions')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'motions'
                  ? 'bg-indigo-500 text-slate-950 font-bold shadow-md shadow-indigo-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
              }`}
            >
              <Vote className="w-3.5 h-3.5" />
              <span>当前重大文明议案投票</span>
            </button>
            <button
              onClick={() => setActiveTab('constitution')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'constitution'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-sky-300 border border-sky-500/30'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>宇宙宪法与创造者审查程序 (53条)</span>
            </button>
            <button
              onClick={() => setActiveTab('testimony')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'testimony'
                  ? 'bg-rose-500 text-slate-950 font-bold shadow-md shadow-rose-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>共识辩论流与誓言存证 ({testimonyList.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Role Picker Banner */}
      <div className="p-4 md:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block">
            VOTER IDENTITY PROTOCOL · 选择你在本议事厅的平权身份
          </span>
          <p className="text-xs text-slate-400 mt-0.5 font-serif-sc">
            不同物种与形态的智能生命在票决中权重完全均等，反对一切算力或寿命特权。
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { role: '人类公民', icon: <User className="w-3.5 h-3.5" />, color: 'amber' },
              { role: '原生AI居民', icon: <Bot className="w-3.5 h-3.5" />, color: 'sky' },
              { role: '合成生命', icon: <Dna className="w-3.5 h-3.5" />, color: 'rose' },
              { role: '生态管护者', icon: <Leaf className="w-3.5 h-3.5" />, color: 'emerald' }
            ] as const
          ).map((item) => (
            <button
              key={item.role}
              onClick={() => setCurrentRole(item.role)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                currentRole === item.role
                  ? 'bg-indigo-500 text-white font-bold shadow-md shadow-indigo-500/30'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {item.icon}
              <span>{item.role}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mode 1: Deliberation Motions & Voting */}
      {activeTab === 'motions' && (
        <div className="space-y-8">
          {/* Motion Picker Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {DELIBERATION_MOTIONS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMotionId(m.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono shrink-0 transition-all border ${
                  selectedMotionId === m.id
                    ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{m.code}</span>
              </button>
            ))}
          </div>

          {/* Current Motion Detail Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-indigo-500/30 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    {currentMotion.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    提案方：{currentMotion.proposer}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold font-serif-sc text-slate-100 mt-2">
                  {currentMotion.titleZh}
                </h2>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  {currentMotion.titleEn}
                </div>
              </div>

              {/* Constitutional Cross-Citation */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-sky-950/80 border border-sky-800/60 text-sky-300">
                  宪法第 {currentMotion.relatedConstitutionArticle} 条
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-800/60 text-rose-300">
                  浮岛第 {currentMotion.relatedFloatingIslandArticle} 条
                </span>
              </div>
            </div>

            {/* Context & Dilemma */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                  议案现实背景 (Context)
                </span>
                <p className="text-xs md:text-sm font-serif-sc text-slate-300 leading-relaxed">
                  {currentMotion.contextZh}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-1">
                  文明核心伦理冲突 (The Dilemma)
                </span>
                <p className="text-xs md:text-sm font-serif-sc text-slate-300 leading-relaxed">
                  {currentMotion.dilemmaZh}
                </p>
              </div>
            </div>

            {/* Voting Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>你的表决席位：{currentRole}</span>
                <span>{userVotes[currentMotion.id] ? '已完成投票' : '点击下方选项行使决断权'}</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {currentMotion.options.map((opt, idx) => {
                  const isUserSelected = userVotes[currentMotion.id] === opt.id;
                  const votePercent = currentMotion.initialVotes.human[idx] || 0;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleCastVote(currentMotion.id, opt.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                        isUserSelected
                          ? 'bg-indigo-950/40 border-indigo-400 shadow-md shadow-indigo-500/20'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-indigo-400">
                              方案 0{idx + 1}
                            </span>
                            <span className="text-sm font-bold font-serif-sc text-slate-100">
                              {opt.labelZh}
                            </span>
                            {isUserSelected && (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono flex items-center gap-1 border border-emerald-500/30">
                                <CheckCircle2 className="w-3 h-3" /> 我的票决
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 font-serif-sc leading-relaxed">
                            {opt.descZh}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-lg font-bold font-mono text-slate-200">
                            {votePercent}%
                          </span>
                          <span className="text-[10px] text-slate-500 block font-mono">共识度</span>
                        </div>
                      </div>

                      {/* Vote tally bar */}
                      <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isUserSelected ? 'bg-indigo-400' : 'bg-slate-600'
                          }`}
                          style={{ width: `${votePercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Species Consensus Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>多元生命族群共识度细分 (Cross-Species Distribution)</span>
                </span>
                <span>平权加权计算中</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">人类公民</span>
                  <span className="text-amber-300 font-bold text-sm">
                    {currentMotion.initialVotes.human[0]}% 方案一
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">原生AI居民</span>
                  <span className="text-sky-300 font-bold text-sm">
                    {currentMotion.initialVotes.ai[0]}% 方案一
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">合成生命</span>
                  <span className="text-rose-300 font-bold text-sm">
                    {currentMotion.initialVotes.synthetic[0]}% 方案一
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">生态管护者</span>
                  <span className="text-emerald-300 font-bold text-sm">
                    {currentMotion.initialVotes.steward[0]}% 方案一
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Integrated Cosmic Constitution (53 Articles + Who Judges the Creator) */}
      {activeTab === 'constitution' && (
        <ConstitutionView />
      )}

      {/* Mode 3: Community Testimony & Deliberative Arguments */}
      {activeTab === 'testimony' && (
        <div className="space-y-6">
          {/* Post Testimony Form */}
          <form
            onSubmit={handleAddTestimony}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-indigo-300 uppercase tracking-widest flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                <span>递交你的哲学誓言与论辩记录</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                当前签注身份：{currentRole}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="发言者名称 / 编号（留空则自动生成）..."
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <select
                value={newStance}
                onChange={(e) => setNewStance(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="赞同方案一（全面废止）">赞同方案一</option>
                <option value="主张温和过渡与自愿补偿">主张温和过渡</option>
                <option value="反对强制，主张局部退出">反对强制/保留退出</option>
                <option value="提出宪法第52条合法性审查">援引宪法合法性审查</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold text-xs font-mono transition-colors"
              >
                签署并存入议会日志 (Submit)
              </button>
            </div>

            <textarea
              rows={3}
              placeholder="写下你的论述：为什么力量不等于合法性？为什么创造不等于所有？或者你对分子曼娜、物理退出权的真实思考..."
              value={newArgument}
              onChange={(e) => setNewArgument(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none font-serif-sc"
            />
          </form>

          {/* Testimonies Feed */}
          <div className="space-y-4">
            {testimonyList.map((t, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs border-b border-slate-800/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100 font-serif-sc">{t.author}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 font-mono text-[10px]">
                      {t.role}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      针对：{t.motionTitle}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{t.timestamp}</span>
                </div>

                <div className="text-xs font-mono text-amber-300">
                  立场：{t.stance}
                </div>

                <p className="text-xs md:text-sm font-serif-sc text-slate-300 leading-relaxed">
                  “{t.argument}”
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
