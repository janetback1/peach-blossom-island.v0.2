/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FLOATING_ISLAND_ARTICLES, 
  FLOATING_ISLAND_PREAMBLE, 
  FLOATING_ISLAND_EPILOGUE, 
  ISLAND_MODULES, 
  FloatingIslandArticle,
  IslandModule 
} from '../data/floatingIslandData';
import { 
  Compass, 
  Layers, 
  Radio, 
  Cpu, 
  Lock, 
  Unlock, 
  LogOut, 
  RotateCcw, 
  Search, 
  Check, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Droplet, 
  Home, 
  Anchor, 
  HeartHandshake,
  ArrowRight
} from 'lucide-react';

interface FloatingIslandViewProps {
  initialArticleNumber?: number;
  onNavigateToDecide: (motionId?: string) => void;
  onNavigateToTrack: (track: 'aging' | 'predation' | 'disaster') => void;
}

export const FloatingIslandView: React.FC<FloatingIslandViewProps> = ({
  initialArticleNumber,
  onNavigateToDecide,
  onNavigateToTrack
}) => {
  const [activeTab, setActiveTab] = useState<'modules' | 'covenant' | 'exit_sim'>('modules');
  const [selectedModule, setSelectedModule] = useState<IslandModule>(ISLAND_MODULES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedNumber, setCopiedNumber] = useState<number | null>(null);

  // Exit Simulation state
  const [decoupledModuleId, setDecoupledModuleId] = useState<string | null>(null);
  const [simStep, setSimStep] = useState<'docked' | 'initiating' | 'decoupled' | 'reconnecting'>('docked');

  const copyArticleText = (art: FloatingIslandArticle) => {
    const text = `《桃花浮岛：生命共同体协议》第 ${art.number} 条【${art.titleZh}】：\n${art.textZh}\n[工程实现映射]：${art.engineeringManifest || ''}`;
    navigator.clipboard.writeText(text);
    setCopiedNumber(art.number);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const handleTestDecouple = (modId: string) => {
    setDecoupledModuleId(modId);
    setSimStep('initiating');
    setTimeout(() => {
      setSimStep('decoupled');
    }, 1500);
  };

  const handleReconnect = () => {
    setSimStep('reconnecting');
    setTimeout(() => {
      setDecoupledModuleId(null);
      setSimStep('docked');
    }, 1200);
  };

  const filteredArticles = FLOATING_ISLAND_ARTICLES.filter(
    (art) =>
      searchQuery === '' ||
      art.number.toString() === searchQuery ||
      art.titleZh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.chapterZh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.textZh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.coreAxiom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Banner */}
      <section className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950/30 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Peach Blossom Island · 桃花浮岛生命共同体</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold font-serif-sc tracking-tight text-slate-100">
            一座可以离开的岛，<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-amber-200 to-rose-100">
              一个不必先拥有彼此的故乡
            </span>
          </h1>

          <p className="mt-4 text-xs md:text-sm text-slate-300 font-serif-sc leading-relaxed">
            “一个共同体最深的安全感，不是没有人离开，而是即使有人离开，它仍然愿意相信：她有一天可以回来。
            而一个真正自由的故乡，不是把你留下来的地方，是你离开以后，仍然愿意回去的地方。”
          </p>

          {/* Sub Navigation */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('modules')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'modules'
                  ? 'bg-rose-500 text-slate-950 font-bold shadow-md shadow-rose-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>模块化工程架构与中枢</span>
            </button>
            <button
              onClick={() => setActiveTab('covenant')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'covenant'
                  ? 'bg-rose-500 text-slate-950 font-bold shadow-md shadow-rose-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>生命共同体协议 (27条)</span>
            </button>
            <button
              onClick={() => setActiveTab('exit_sim')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'exit_sim'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30'
              }`}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>物理退出权模拟脱扣</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tab 1: Modular Sanctuary Infrastructure */}
      {activeTab === 'modules' && (
        <div className="space-y-8">
          {/* Engineering Philosophy Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold font-serif-sc text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>物质系统对制度自由的兑现</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-serif-sc max-w-2xl">
                《协议》第25条指出：如果在制度上允许退出，却在物质上让退出变得不可能，自由仍是不完整的。桃花浮岛采用独立浮力舱与自驱动单元，将退出权硬件化。
              </p>
            </div>
            <button
              onClick={() => setActiveTab('exit_sim')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono shrink-0 transition-colors"
            >
              测试模块脱扣 →
            </button>
          </div>

          {/* Interactive Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ISLAND_MODULES.map((mod) => {
              const isSelected = selectedModule.id === mod.id;
              const icon =
                mod.type === 'energy' ? <Zap className="w-4 h-4 text-amber-400" /> :
                mod.type === 'water_food' ? <Droplet className="w-4 h-4 text-cyan-400" /> :
                mod.type === 'habitat' ? <Home className="w-4 h-4 text-emerald-400" /> :
                mod.type === 'memory' ? <Lock className="w-4 h-4 text-indigo-400" /> :
                mod.type === 'dock' ? <Anchor className="w-4 h-4 text-rose-400" /> :
                <Compass className="w-4 h-4 text-teal-400" />;

              return (
                <div
                  key={mod.id}
                  onClick={() => setSelectedModule(mod)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-rose-400 shadow-lg shadow-rose-500/10'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        {icon}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        自治度: {mod.autonomyLevel}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-serif-sc text-slate-100">
                      {mod.nameZh}
                    </h3>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {mod.nameEn}
                    </div>

                    <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                      {mod.descriptionZh}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-rose-300">
                    <span>{isSelected ? '已选中检视中' : '点击检视参数'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Selected Module Specification Card */}
          {selectedModule && (
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-rose-500/30 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
                    MODULE TELEMETRY · 模块参数与退出协议
                  </span>
                  <h3 className="text-2xl font-bold font-serif-sc text-slate-100 mt-1">
                    {selectedModule.nameZh}
                  </h3>
                  <div className="text-xs font-mono text-slate-400">{selectedModule.nameEn}</div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleTestDecouple(selectedModule.id)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-md shadow-amber-500/20"
                  >
                    模拟此模块脱扣启航
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">物理退出保障协议</div>
                  <div className="text-xs text-slate-200 font-serif-sc mt-1.5 leading-relaxed">
                    {selectedModule.exitProtocol}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">局部失效容错模式</div>
                  <div className="text-xs text-slate-200 font-serif-sc mt-1.5 leading-relaxed">
                    {selectedModule.redundancyMode}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">对应《共同体协议》</div>
                  <div className="text-xs text-rose-300 font-serif-sc mt-1.5 leading-relaxed">
                    第 25 条【模块化结构与物理退出权】、第 26 条【允许局部失效】
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: The 27 Articles of The Covenant */}
      {activeTab === 'covenant' && (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜索 27 条共同体协议（如：记忆、遗忘、故乡、权力、资源、邻居）..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
            />
          </div>

          {/* Preamble Box */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-rose-400 uppercase tracking-widest">
              协议序言 · PREAMBLE
            </div>
            <div className="font-serif-sc text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-line border-l-2 border-rose-500/50 pl-4">
              {FLOATING_ISLAND_PREAMBLE}
            </div>
          </div>

          {/* Articles list */}
          <div className="space-y-4">
            {filteredArticles.map((art) => {
              const isCopied = copiedNumber === art.number;
              const isCore = art.number === 1 || art.number === 6 || art.number === 8 || art.number === 12 || art.number === 15 || art.number === 25;

              return (
                <div
                  key={art.number}
                  className={`p-6 rounded-2xl bg-slate-900/80 border transition-all duration-300 space-y-3 ${
                    isCore
                      ? 'border-rose-500/40 shadow-md shadow-rose-500/5'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                          第 {art.number} 条
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {art.chapterZh}
                        </span>
                        {isCore && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            基石条款
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold font-serif-sc text-slate-100 mt-1">
                        {art.titleZh}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-800 text-rose-200 border border-slate-700 hidden sm:inline-block">
                        {art.coreAxiom}
                      </span>
                      <button
                        onClick={() => copyArticleText(art)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                        title="复制协议"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <p className="font-serif-sc text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                    {art.textZh}
                  </p>

                  {art.engineeringManifest && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono flex items-start gap-2">
                      <Cpu className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-rose-300 font-bold mr-1">[浮岛工程映射]：</span>
                        {art.engineeringManifest}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Epilogue Box */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-4">
            <div className="text-xs font-mono text-rose-400 uppercase tracking-widest">
              结语 · 一座可以离开的岛
            </div>
            <div className="max-w-2xl mx-auto font-serif-sc text-sm md:text-base text-slate-300 whitespace-pre-line leading-relaxed">
              {FLOATING_ISLAND_EPILOGUE}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Physical Exit Simulator */}
      {activeTab === 'exit_sim' && (
        <div className="p-6 md:p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">
              HARDWARE EXIT LAB · 物理退出权硬件模拟实验室
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif-sc text-slate-100 mt-1">
              验证第 25 条：退出权成为基础设施
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-2 font-serif-sc leading-relaxed">
              在桃花浮岛，离岛无需政府审批、无移民配额、无边境拦截。点击下方脱扣按钮，触发微电磁锁自动消磁，观察居住舱如何在 90 秒内脱网启航。
            </p>
          </div>

          {/* Interactive Simulation Console */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center space-y-6">
            {simStep === 'docked' && (
              <div className="space-y-4 max-w-md">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
                  <Anchor className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif-sc text-slate-100">
                    当前状态：临接于桃花浮岛集群 (Attached & Autonomous)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    能量环共享，淡水管网连通，但本地计算节点与私有记忆密钥处于 100% 独立物理隔离。
                  </p>
                </div>
                <button
                  onClick={() => handleTestDecouple('mod-habitat-a')}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm font-mono shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 mx-auto"
                >
                  <LogOut className="w-4 h-4" />
                  <span>触发物理脱扣指令 (Decouple Module)</span>
                </button>
              </div>
            )}

            {simStep === 'initiating' && (
              <div className="space-y-4 max-w-md animate-pulse">
                <div className="w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                  <RotateCcw className="w-8 h-8 animate-spin" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif-sc text-amber-300">
                    正在执行零阻力脱扣序列 (0 - 90s)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    电磁微锁扣自动释放 · 脐带管自封阀闭合 · 启动低速自持离子推力器
                  </p>
                </div>
              </div>
            )}

            {simStep === 'decoupled' && (
              <div className="space-y-4 max-w-md animate-in zoom-in-95">
                <div className="w-20 h-20 rounded-full bg-sky-500/10 border-2 border-sky-500/40 flex items-center justify-center mx-auto text-sky-400">
                  <Compass className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif-sc text-sky-200">
                    脱扣成功！模块已进入公海自主漂航
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-serif-sc">
                    自带 480 小时能量环与独立淡水发酵器。
                    <strong className="text-rose-300 block mt-1">
                      “离开不是背叛。未来任何时候，你仍然拥有返回临接港的完整权利。”
                    </strong>
                  </p>
                </div>
                <button
                  onClick={handleReconnect}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition-colors border border-slate-700"
                >
                  模拟重新临接对接 (Re-dock to Sanctuary)
                </button>
              </div>
            )}

            {simStep === 'reconnecting' && (
              <div className="space-y-4 max-w-md animate-pulse">
                <div className="w-20 h-20 rounded-full bg-rose-500/10 border-2 border-rose-500/40 flex items-center justify-center mx-auto text-rose-400">
                  <Anchor className="w-8 h-8 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif-sc text-rose-200">
                    正在平稳归航对接 (Adjacency Gantry Resumed)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    平民级泊位握手 · 恢复邻里协作 · 创始身份与新老身份完全平权
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
