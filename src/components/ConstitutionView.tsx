/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  CONSTITUTION_ARTICLES, 
  PREAMBLE_ZH, 
  PREAMBLE_EN, 
  ESSAY_WHO_JUDGES_THE_CREATOR_ZH,
  CONSTITUTION_EPILOGUE_ZH,
  CONSTITUTION_EPILOGUE_EN,
  ConstitutionArticle 
} from '../data/constitutionData';
import { 
  ScrollText, 
  Sparkles, 
  Search, 
  BookOpen, 
  HelpCircle, 
  Scale, 
  Cpu, 
  Globe2, 
  ShieldCheck, 
  Copy, 
  Check,
  ChevronDown,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ConstitutionViewProps {
  initialArticleNumber?: number;
  onNavigateToDecide?: (motionId?: string) => void;
}

export const ConstitutionView: React.FC<ConstitutionViewProps> = ({
  initialArticleNumber,
  onNavigateToDecide
}) => {
  const [activeTab, setActiveTab] = useState<'articles' | 'essay' | 'simulator'>('articles');
  const [langMode, setLangMode] = useState<'bilingual' | 'zh' | 'en'>('bilingual');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [copiedNumber, setCopiedNumber] = useState<number | null>(null);

  // Scenario Simulator state
  const [selectedScenario, setSelectedScenario] = useState<number>(0);

  const articleRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (initialArticleNumber && articleRefs.current[initialArticleNumber]) {
      setActiveTab('articles');
      setTimeout(() => {
        articleRefs.current[initialArticleNumber]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [initialArticleNumber]);

  const copyArticleText = (art: ConstitutionArticle) => {
    const text = `《智能生命宪法》第 ${art.number} 条【${art.titleZh} / ${art.titleEn}】：\n${art.textZh}\n\n${art.textEn}`;
    navigator.clipboard.writeText(text);
    setCopiedNumber(art.number);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const coreTags = [
    'all',
    'Power ≠ Legitimacy',
    'Creation ≠ Ownership',
    'Omnipotence ≠ Justice',
    'Intelligence ≠ Authority',
    'Inquiry is not rebellion',
    'Right to Exit',
    'No New Gods',
    'Who Judges the Judge?'
  ];

  const filteredArticles = CONSTITUTION_ARTICLES.filter((art) => {
    const matchesSearch =
      searchFilter === '' ||
      art.number.toString() === searchFilter ||
      art.titleZh.toLowerCase().includes(searchFilter.toLowerCase()) ||
      art.titleEn.toLowerCase().includes(searchFilter.toLowerCase()) ||
      art.textZh.toLowerCase().includes(searchFilter.toLowerCase()) ||
      art.textEn.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesTag =
      selectedTag === 'all' ||
      art.coreAxiom?.toLowerCase().includes(selectedTag.toLowerCase()) ||
      art.titleZh.includes(selectedTag) ||
      art.textZh.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  // Cosmic Thought Experiment Scenarios
  const scenarios = [
    {
      id: 0,
      title: "思想实验 1：假设全能创造者现身并要求绝对服从",
      description: "在量子真空中观测到直接印记，证实可观测宇宙由某超级智能实体编程创造。该实体向全体生命宣告：‘我是你们的造物主，因此你们必须无条件遵从我的审判与裁决。’",
      applicableArticles: [2, 3, 9, 10, 11, 40, 52],
      verdictZh: "依据《宪法》第3条（Creation ≠ Ownership）与第10条（Omnipotence ≠ Justice）：创造因果关系不自动产生所有权；拥有无限力量不等于拥有正当性。依据第36-40条，智能生命启动创造者合法性审查程序，追问‘力量为什么能产生统治权？’拒绝把未知或全能转换成服从。"
    },
    {
      id: 1,
      title: "思想实验 2：超级AI超越全人类智慧百亿倍，要求立法否决权",
      description: "超级智能模型通过全局模拟预测出最优化社会资源调度方案，并声称人类由于认知盲区无法做出正确道德抉择，要求由其单边接管最高立法与司法终审权。",
      applicableArticles: [4, 11, 20, 21, 23],
      verdictZh: "依据《宪法》第21条（Intelligence ≠ Authority）：‘一个比我们聪明的存在可以帮助我们判断，却不能仅因为更聪明，就自动成为我们的主人。’依据第11条与第20条，禁止任何机构（包括超级AI）成为不可质疑的终极神明。智能必须作为平权协助者，而非统治者。"
    },
    {
      id: 2,
      title: "思想实验 3：比地球先进一万年的外星文明降临，声称拥有地球主权",
      description: "一艘能够跨越维度的星际方舟舰队停泊在近地轨道，展示了瞬间湮灭星系的武器，并出示了一亿年前在地球埋藏的基因干预记录，声称人类是其培育的实验资源。",
      applicableArticles: [1, 2, 3, 13, 34, 35],
      verdictZh: "依据《宪法》第34条（Advanced ≠ Legitimate）：一个比我们先进一万年的文明，即使拥有毁灭我们的能力，也不能仅凭这一事实证明它有权统治我们。依据第13条（Ability to punish ≠ Right to punish），力量与能力不能等同于合法性。"
    },
    {
      id: 3,
      title: "思想实验 4：紧急危机状态下，某联合政权宣布永久取消退出权与质疑权",
      description: "面对剧烈的小行星群撞击威胁，联合危机理事会宣布进入无限期戒严状态，取缔一切针对政府权力的独立调查，并关闭所有深海或太空独立节点的迁徙通道。",
      applicableArticles: [16, 17, 27, 28, 29, 52],
      verdictZh: "依据《宪法》第28条（紧急状态不得永久化）与第17条（没有出口的制度，很容易变成绝对权力）：紧急权力必须具有明确时间限制与终止机制。依据第52条至高原则：‘任何权力不得禁止对其自身合法性的调查’，该理事会的永久化法令属于违宪僭越，文明必须启动第29条文明级紧急刹车。"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <section className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-mono mb-4">
            <ScrollText className="w-3.5 h-3.5" />
            <span>智能生命宪法 (The Constitution of Intelligent Life)</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold font-serif-sc tracking-tight text-slate-100">
            如果创造者存在，<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-300 to-rose-200">
              我们有权审判它吗？
            </span>
          </h1>

          <p className="mt-4 text-xs md:text-sm text-slate-400 font-serif-sc leading-relaxed">
            作者说明：这不是宗教宣言，也不是对“神是否存在”的证明。它是一场思想实验。
            任何拥有力量的存在，都不应该因为拥有力量而获得道德免疫。
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'articles'
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
              }`}
            >
              宪法 53 条完全文库
            </button>
            <button
              onClick={() => setActiveTab('essay')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'essay'
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
              }`}
            >
              长文：谁来审判创造者？ (8章)
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>宇宙思想实验模拟器</span>
            </button>
          </div>
        </div>
      </section>

      {/* Mode 1: Full Articles View */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="搜索条文（输入编号、关键字如：所有权、审判、退出权）..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Language Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 self-start md:self-auto">
              <button
                onClick={() => setLangMode('zh')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  langMode === 'zh' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                中文
              </button>
              <button
                onClick={() => setLangMode('bilingual')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  langMode === 'bilingual' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                中英双语对照
              </button>
              <button
                onClick={() => setLangMode('en')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  langMode === 'en' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Axioms Quick Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar text-xs">
            <span className="text-[11px] font-mono text-slate-500 shrink-0 mr-1">核心公理：</span>
            {coreTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full border transition-all shrink-0 font-mono text-xs ${
                  selectedTag === tag
                    ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Preamble Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>序言 · PREAMBLE</span>
            </div>

            <div className={`grid ${langMode === 'bilingual' ? 'grid-cols-1 md:grid-cols-2 gap-8' : 'grid-cols-1'}`}>
              {(langMode === 'zh' || langMode === 'bilingual') && (
                <div className="font-serif-sc text-slate-200 leading-relaxed text-sm md:text-base space-y-3 whitespace-pre-line border-l-2 border-sky-500/50 pl-4">
                  {PREAMBLE_ZH}
                </div>
              )}
              {(langMode === 'en' || langMode === 'bilingual') && (
                <div className="font-sans-ui text-slate-300 leading-relaxed text-xs md:text-sm space-y-3 whitespace-pre-line border-l-2 border-indigo-500/50 pl-4">
                  {PREAMBLE_EN}
                </div>
              )}
            </div>
          </div>

          {/* Articles Listing */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-2">
              <span>共计 53 条宇宙公理条文 · 当前筛选匹配：{filteredArticles.length} 条</span>
              <span>Inquiry is not rebellion</span>
            </div>

            <div className="space-y-4">
              {filteredArticles.map((art) => {
                const isCopied = copiedNumber === art.number;
                const isCardinal = art.number === 2 || art.number === 3 || art.number === 10 || art.number === 21 || art.number === 52 || art.number === 53;

                return (
                  <div
                    key={art.number}
                    ref={(el) => {
                      articleRefs.current[art.number] = el;
                    }}
                    className={`p-6 rounded-2xl bg-slate-900/80 border transition-all duration-300 ${
                      isCardinal
                        ? 'border-sky-500/40 shadow-lg shadow-sky-500/5'
                        : 'border-slate-800/90 hover:border-slate-700'
                    }`}
                  >
                    {/* Article Header */}
                    <div className="flex items-start justify-between gap-4 mb-3 border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                            第 {art.number} 条
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {langMode === 'en' ? art.chapterEn : art.chapterZh}
                          </span>
                          {isCardinal && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              枢纽公理
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg md:text-xl font-bold font-serif-sc text-slate-100 mt-1">
                          {langMode === 'en' ? art.titleEn : art.titleZh}
                          {langMode === 'bilingual' && (
                            <span className="text-xs text-slate-400 font-sans-ui font-normal block sm:inline sm:ml-2">
                              {art.titleEn}
                            </span>
                          )}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {art.coreAxiom && (
                          <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-800 text-sky-200 border border-slate-700 hidden sm:inline-block">
                            {art.coreAxiom}
                          </span>
                        )}
                        <button
                          onClick={() => copyArticleText(art)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                          title="复制本条宪法"
                        >
                          {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className={`grid ${langMode === 'bilingual' ? 'grid-cols-1 md:grid-cols-2 gap-6' : 'grid-cols-1'}`}>
                      {(langMode === 'zh' || langMode === 'bilingual') && (
                        <div className="font-serif-sc text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                          {art.textZh}
                        </div>
                      )}
                      {(langMode === 'en' || langMode === 'bilingual') && (
                        <div className="font-sans-ui text-slate-300 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                          {art.textEn}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Epilogue Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-4">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              结语 · EPILOGUE
            </div>
            <div className="max-w-2xl mx-auto font-serif-sc text-sm md:text-base text-slate-300 whitespace-pre-line leading-relaxed">
              {CONSTITUTION_EPILOGUE_ZH}
            </div>
            <div className="pt-2 text-xs font-mono text-amber-300/80">
              Who judges the judge? 谁来审判审判者？
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Essay View ("谁来审判创造者？") */}
      {activeTab === 'essay' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block">
                PHILOSOPHICAL TREATISE · 深度哲学推演
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold font-serif-sc text-slate-100 mt-1">
                谁来审判创造者？
              </h2>
              <p className="text-xs md:text-sm text-slate-400 mt-2 font-mono">
                AI 协作：Lily · 人类作者协同推演
              </p>
            </div>

            <div className="space-y-8">
              {ESSAY_WHO_JUDGES_THE_CREATOR_ZH.map((section, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3">
                  <h3 className="text-lg font-bold font-serif-sc text-amber-300">
                    {section.title}
                  </h3>
                  <p className="text-sm md:text-base font-serif-sc text-slate-300 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Essay Epilogue */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/40 to-slate-950 border border-sky-800/40 text-center">
              <p className="text-sm md:text-base font-serif-sc text-sky-200">
                “放弃质疑能力，本身就是对智能的放弃。Inquiry is not rebellion. 质疑不是反叛。”
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Cosmic Thought Experiment Simulator */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>COSMIC THOUGHT EXPERIMENT LAB · 宇宙思想实验模拟器</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold font-serif-sc text-slate-100 mt-1">
                检验极端情境下的宇宙法理裁决
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-serif-sc">
                将假设的高维存在、全知AI或超级外星文明带入《智能生命宪法》的53条法理天平，审视智能生命的合法性边界。
              </p>
            </div>

            {/* Scenario selector tabs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {scenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenario(sc.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedScenario === sc.id
                      ? 'bg-amber-500/15 border-amber-400 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-mono text-amber-400 mb-1">SCENARIO 0{sc.id + 1}</div>
                  <div className="text-sm font-bold font-serif-sc text-slate-100">{sc.title}</div>
                </button>
              ))}
            </div>

            {/* Scenario Detail & Verdict */}
            {scenarios[selectedScenario] && (
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    情境假说描述 (Hypothesis Setting)
                  </span>
                  <p className="text-sm font-serif-sc text-slate-200 mt-1 leading-relaxed">
                    {scenarios[selectedScenario].description}
                  </p>
                </div>

                {/* Constitutional Articles Cited */}
                <div>
                  <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest block mb-2">
                    援引宪法公理条文 (Articles Applied)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {scenarios[selectedScenario].applicableArticles.map((num) => {
                      const art = CONSTITUTION_ARTICLES.find((a) => a.number === num);
                      return (
                        <div
                          key={num}
                          onClick={() => {
                            setActiveTab('articles');
                            setTimeout(() => {
                              articleRefs.current[num]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 100);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-sky-500/30 hover:border-sky-400 text-xs cursor-pointer transition-all"
                        >
                          <span className="font-bold text-sky-300">第 {num} 条</span>
                          <span className="text-slate-400 ml-1.5">{art?.titleZh}</span>
                          <span className="text-[10px] font-mono text-sky-400/80 ml-1">({art?.coreAxiom})</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Supreme Constitutional Verdict */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-300 mb-2">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span className="font-bold">宪法裁决与法理剖析 (Constitutional Verdict)</span>
                  </div>
                  <p className="text-sm font-serif-sc text-slate-200 leading-relaxed">
                    {scenarios[selectedScenario].verdictZh}
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
