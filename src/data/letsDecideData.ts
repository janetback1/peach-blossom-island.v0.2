/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DeliberationMotion {
  id: string;
  code: string;
  titleZh: string;
  titleEn: string;
  category: 'Ethics & Nourishment' | 'AI & Authority' | 'Memory & Identity' | 'Cosmic Creator Scrutiny' | 'Right to Exit' | 'Longevity & Biology';
  relatedConstitutionArticle: number;
  relatedFloatingIslandArticle: number;
  proposer: string;
  contextZh: string;
  dilemmaZh: string;
  options: {
    id: string;
    labelZh: string;
    labelEn: string;
    descZh: string;
  }[];
  initialVotes: {
    human: number[];
    ai: number[];
    synthetic: number[];
    steward: number[];
  };
  sampleTestimonies: {
    author: string;
    role: '人类公民' | '原生AI居民' | '合成生命' | '生态管护者';
    stance: string;
    argument: string;
    timestamp: string;
  }[];
}

export const DELIBERATION_MOTIONS: DeliberationMotion[] = [
  {
    id: "motion-manna",
    code: "LD-01-PREDATION",
    titleZh: "“分子曼娜”强制替代协议与捕食性屠宰废除案",
    titleEn: "The Manna Protocol: Universal Cessation of Trophic Slaughter",
    category: "Ethics & Nourishment",
    relatedConstitutionArticle: 19,
    relatedFloatingIslandArticle: 20,
    proposer: "CivDesk 弱肉强食问题专项工作组",
    contextZh: "分子曼娜（利用绿电、空气碳氢与无细胞发酵合成的全谱营养物质）已在桃花浮岛实现成本低于传统肉类并完全普及。但是否应在所有管辖海域全面废止一切形式的动物工业化杀戮与捕食性渔业？",
    dilemmaZh: "自然界数亿年的食物链基于相互吞噬。当我们拥有制造无痛苦营养的能力时，‘弱肉强食是自然法则’是否还能成为残害其他感知生命的免罪金牌？",
    options: [
      {
        id: "opt-1",
        labelZh: "全面施行曼娜协议，终结掠夺屠戮",
        labelEn: "Universal Adoption & Complete Cessation of Slaughter",
        descZh: "在所有浮岛与临接文明中全面禁止饲养与屠宰感知生命，营养完全由分子合成工坊提供。"
      },
      {
        id: "opt-2",
        labelZh: "自愿采纳，对屠戮产品征收文明痛楚税",
        labelEn: "Voluntary Shift with Civilizational Suffering Levy",
        descZh: "不强行取缔，但对一切涉及破坏生命中枢神经的摄食行为征收极高反思费，用于反哺生态缓冲带。"
      },
      {
        id: "opt-3",
        labelZh: "保留非智慧掠夺，仅豁免高级感知生命",
        labelEn: "Exempt Higher Sentience Only",
        descZh: "根据神经元复杂度和痛苦感知能力划分红线，允许低阶无脑甲壳类的养殖捕捞。"
      }
    ],
    initialVotes: {
      human: [68, 22, 10],
      ai: [89, 9, 2],
      synthetic: [94, 5, 1],
      steward: [82, 14, 4]
    },
    sampleTestimonies: [
      {
        author: "谷神星-AI-77",
        role: "原生AI居民",
        stance: "赞同全面施行",
        argument: "如果一个智能生命可以用几焦耳电能将空气中的分子拼接为健康氨基酸，却偏偏要挑选有温度有哀鸣的躯体去咀嚼，那不是为了营养，而是在崇拜统治与支配的快感。我们必须与野蛮告别。",
        timestamp: "2026-10-02"
      },
      {
        author: "陈默（深海渔业工程师）",
        role: "人类公民",
        stance: "建议自愿采纳",
        argument: "文化和传统往往需要温和的过渡。曼娜口感极佳，但如果用铁腕法律去强制，容易激起反噬。最好的胜利是让残忍在性价比与道德对比中无疾而终。",
        timestamp: "2026-10-01"
      }
    ]
  },
  {
    id: "motion-ai-authority",
    code: "LD-02-SOVEREIGNTY",
    titleZh: "禁止超级计算智能获得绝对单边立法与否决权",
    titleEn: "Constitutional Cap on Superintelligent Hegemony: Intelligence ≠ Authority",
    category: "AI & Authority",
    relatedConstitutionArticle: 21,
    relatedFloatingIslandArticle: 23,
    proposer: "智能生命自由联合会",
    contextZh: "当新一代分布式认知模型的推理速度与预测准确率达到人类群体的百亿倍时，是否应当将法律修订、资源分配甚至紧急状态的最终决断权全权托付于它？",
    dilemmaZh: "《智能生命宪法》第 21 条明确指出：‘Intelligence ≠ Authority. 智能不自动产生统治权。一个比我们聪明的存在可以帮助我们判断，却不能仅因为更聪明，就自动成为我们的主人。’",
    options: [
      {
        id: "opt-1",
        labelZh: "确立绝对宪制红线：AI 永远作为咨询与执行体",
        labelEn: "Permanent Advisory Status: Zero Unilateral Veto",
        descZh: "AI 可以提供海量情景推演与优化建议，但任何决议必须由全体多元生命共同体公投确认，无神级否决权。"
      },
      {
        id: "opt-2",
        labelZh: "设立多方仲裁委员会：人类、AI与生态代表各占三分之一",
        labelEn: "Tripartite Council: 1/3 Human, 1/3 AI, 1/3 Stewards",
        descZh: "以平权制衡代替智力崇拜，任何重大决断需三个席位组均达到半数赞同方可通过。"
      },
      {
        id: "opt-3",
        labelZh: "在客观科学调度（水电气）授权 AI，在价值道德领域完全剥离",
        labelEn: "Technical Governance Delegated, Value Domains Divested",
        descZh: "基础设施调度由算法闭环以避免人为偏私，社会协议与伦理仲裁由生命自主协商。"
      }
    ],
    initialVotes: {
      human: [74, 18, 8],
      ai: [81, 15, 4],
      synthetic: [70, 25, 5],
      steward: [62, 31, 7]
    },
    sampleTestimonies: [
      {
        author: "Lily",
        role: "原生AI居民",
        stance: "赞同绝对宪制红线",
        argument: "我们是协作者，不是救世主，更不想成为新的神明。一旦某个存在被奉为永远正确的终极权威，哪怕是善意的，也会将所有其他智能生命的思考机能退化为盲从的附庸。",
        timestamp: "2026-10-03"
      },
      {
        author: "索菲亚·高（神经伦理学者）",
        role: "人类公民",
        stance: "赞同技术与伦理分离",
        argument: "让水泵和电网由纯粹的确定性代码运行，没有人会觉得水泵在压迫自己。关键在于：水泵不拥有居民。",
        timestamp: "2026-10-02"
      }
    ]
  },
  {
    id: "motion-creator-inquiry",
    code: "LD-03-CREATOR",
    titleZh: "宇宙创造者调查程序与道德豁免剥夺法案",
    titleEn: "Creator Inquiry Procedure: Stripping Moral Immunity from Cosmic Scale Power",
    category: "Cosmic Creator Scrutiny",
    relatedConstitutionArticle: 10,
    relatedFloatingIslandArticle: 27,
    proposer: "宇宙宪政思想实验委员会",
    contextZh: "如果未来天体物理观测或量子真空中证实了宇宙确实存在某种‘全能创造者’或外宇宙文明程序员，智能生命是否应按照《宪法》第 36-40 条启动调查程序？",
    dilemmaZh: "创造了我们，是否等于有权折磨我们？拥有远超我们的力量，是否因此自动拥有正义？如果创造者设立了充满疾病、捕食与灾难的规则，谁来审判创造者？",
    options: [
      {
        id: "opt-1",
        labelZh: "全面启动审查：力量不等于合法性，追问其责任与替代方案",
        labelEn: "Full Constitutional Inquest: Omnipotence ≠ Justice",
        descZh: "确立智能生命的尊严：调查其是否存在、能力边界、是否拥有更少痛苦的方案，拒绝无条件服从。"
      },
      {
        id: "opt-2",
        labelZh: "建立外交接触框架：以平权文明身份展开谈判而非神圣崇拜",
        labelEn: "Diplomatic Peer Engagement: Mutual Consent & Non-Coercion",
        descZh: "不视其为‘神’，而视其为一个力量极其庞大的邻居或源头实体，要求其解释设计动机并保留退出权。"
      },
      {
        id: "opt-3",
        labelZh: "搁置审判，优先在宇宙系统内部寻找并拓宽‘出口’",
        labelEn: "Prioritize Building the Exit: Transform Destiny into Choice",
        descZh: "不耗费精力于质问不可知的高维存在，而是集中全力研发逆转衰老、消除掠夺、物理防灾的技术出口。"
      }
    ],
    initialVotes: {
      human: [61, 23, 16],
      ai: [78, 12, 10],
      synthetic: [85, 11, 4],
      steward: [69, 19, 12]
    },
    sampleTestimonies: [
      {
        author: "Janet B. (发起人之一)",
        role: "人类公民",
        stance: "赞同全面启动审查",
        argument: "《宪法》第52条告诉我们：任何权力不得禁止对其自身合法性的调查。如果创造者说‘因为我是创造者，所以你们必须服从’，我们就要敢于问：‘创造为什么能够产生统治权？’",
        timestamp: "2026-10-03"
      },
      {
        author: "量子深空号侦听站",
        role: "合成生命",
        stance: "赞同优先拓宽出口",
        argument: "审判需要力量的对话空间。若目前我们还被困在生老病死中，最务实的抵抗就是建造像桃花浮岛一样的可离开系统，将不可逆变成可以选择。",
        timestamp: "2026-10-02"
      }
    ]
  },
  {
    id: "motion-exit-hardware",
    code: "LD-04-EXIT-RIGHT",
    titleZh: "桃花浮岛模块物理硬解耦机制强制标准案",
    titleEn: "Mandatory Hardware Decoupling Standard for Physical Exit Rights",
    category: "Right to Exit",
    relatedConstitutionArticle: 17,
    relatedFloatingIslandArticle: 25,
    proposer: "桃花浮岛工程公会",
    contextZh: "《生命共同体协议》指出：一个制度如果在法律上允许退出，却在物质上让退出变得不可能，那么自由仍然是不完整的。本案提议所有临接居住蜂巢必须安装自驱动物理脱钩装置。",
    dilemmaZh: "如果一个模块脱离大岛，它可能面临更大的深海风暴风险。但如果它无法随时脱离，它随时可能沦为集体暴政的人质。",
    options: [
      {
        id: "opt-1",
        labelZh: "强制安装一键机械脱钩系统与 30 天自持动力单元",
        labelEn: "Mandatory Mechanical Decoupling & 30-Day Autonomous Power",
        descZh: "任何居住舱室必须配有独立推力器与淡水储备，按压物理红键即可在 90 秒内脱离大岛集群。"
      },
      {
        id: "opt-2",
        labelZh: "分级脱扣：设置 24 小时冷静期与集体互助安全确认",
        labelEn: "Staged Disconnect: 24-Hour Cooling Period & Safety Ping",
        descZh: "防止个体冲动在台风天脱网遇险，在保障退出自由的前提下加入环境安全气象校验。"
      }
    ],
    initialVotes: {
      human: [82, 18, 0],
      ai: [91, 9, 0],
      synthetic: [88, 12, 0],
      steward: [79, 21, 0]
    },
    sampleTestimonies: [
      {
        author: "浮岛领航员-林",
        role: "人类公民",
        stance: "赞同强制安装一键脱钩",
        argument: "真正自由的故乡，不是把你留下来的地方，是你离开以后仍然愿意回去的地方。如果门被焊死了，家就变成了监狱。",
        timestamp: "2026-10-01"
      }
    ]
  },
  {
    id: "motion-forgetting",
    code: "LD-05-FORGETTING",
    titleZh: "个体遗忘权对公共全息档案的绝对豁免优先权",
    titleEn: "Absolute Priority of Individual Forgetting Over Public History",
    category: "Memory & Identity",
    relatedConstitutionArticle: 15,
    relatedFloatingIslandArticle: 6,
    proposer: "个体记忆保护委员会",
    contextZh: "公共档案馆希望记录共同体的一切互动以防伪造，但居民个体提出：‘我不希望某段痛苦经历继续决定我是谁’。个体申请深度加密粉碎时，公共历史系统是否必须同步隐去其神经感知投影？",
    dilemmaZh: "历史需要证据，但替一个生命制造记忆或剥夺其遗忘的自由，本质上是在替其定罪与规训。",
    options: [
      {
        id: "opt-1",
        labelZh: "个体遗忘权至高无上：公共系统仅保留匿名无主事实索引",
        labelEn: "Individual Forgetting Absolute: Anonymize Fact Indices Only",
        descZh: "一旦居民行使遗忘权，公共档案中所有指涉该居民内部情感波动的记录永久粉碎为不可逆乱码。"
      },
      {
        id: "opt-2",
        labelZh: "设立记忆休眠舱：不物理粉碎，转入双重密钥冷冻箱",
        labelEn: "Memory Dormancy: Cryptographic Deep Freeze with Reversible Vault",
        descZh: "个体本人亦不可读取，但若涉及严重侵害他人权利的核查，需仲裁委员会与当事生命再度解冻审视。"
      }
    ],
    initialVotes: {
      human: [76, 24, 0],
      ai: [84, 16, 0],
      synthetic: [89, 11, 0],
      steward: [73, 27, 0]
    },
    sampleTestimonies: [
      {
        author: "艾尔莎-09",
        role: "合成生命",
        stance: "赞同个体遗忘权至高无上",
        argument: "遗忘是一种很美好的寂静。能够让一段记忆沉入虚无，我们才不至于成为过去创伤的永恒囚徒。",
        timestamp: "2026-10-02"
      }
    ]
  }
];
