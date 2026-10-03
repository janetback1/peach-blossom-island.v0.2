/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CivDeskTrack {
  id: 'aging' | 'predation' | 'disaster';
  titleZh: string;
  titleEn: string;
  tagline: string;
  leadQuestion: string;
  descriptionZh: string;
  whyChallenged: string;
  scientificDossiers: {
    id: string;
    title: string;
    domain: string;
    currentStage: 'Lab Experiment' | 'Clinical Trials' | 'Engineering Pilot' | 'Thought Experiment';
    summary: string;
    radicalInquiry: string;
    failedAttemptsLogged: string;
    hopefulDirection: string;
  }[];
}

export const CIVDESK_MANIFESTO = {
  headline: "CivDesk｜文明问题编辑部",
  subheadline: "为什么？既然人类已经有能力改变世界，为什么不能试着改变那些让生命长期痛苦的东西？",
  prologue: `这个世界有一些痛苦，已经存在了太久。
久到我们不再觉得它们奇怪。

生命会衰老，会生病，会死亡。
生命为了活下去，会吃掉其他生命，也会被其他生命吃掉。
洪水、风暴、地震、疾病和饥饿，会突然摧毁生命已经建立的一切。

我们把这些叫作：
“自然规律。”
“生存竞争。”
“人生无常。”
然后继续生活。

但我们有一个问题：
为什么？
为什么自然规律就不能研究？
为什么生存竞争就不能减少？
为什么死亡无法避免，就意味着疾病和衰老也只能接受？
为什么自然灾害无法消灭，就意味着我们不能想办法让生命少受一点伤害？

最让我们感到荒谬的，也许不是这些痛苦本身。
而是人类已经拥有了观察、实验、制造和改变世界的能力，却常常在这些问题面前选择扭过头去。
我们会制造能够飞上太空的机器，会让机器进入人体，会修改基因，会制造新的材料，会让计算机替我们思考。
但面对生命最基本的痛苦，我们却经常说：
“没办法。”

CivDesk 不接受这三个字作为问题的终点。
我们不知道答案。也不认为所有问题都有答案。
但我们想把问题重新摆到桌面上。`,
  methodology: [
    { step: "01", name: "找论文", desc: "穿透学术象牙塔，检索关于衰老逆转、无细胞制造与抗灾极境架构的严谨同行评审文献。" },
    { step: "02", name: "找技术", desc: "挖掘冷门但关键的工程突破：山中因子、精密发酵、柔性海洋阻尼与量子冷存储。" },
    { step: "03", name: "找实验者", desc: "与全球拒绝接受“世界本就如此”的科学家、独立工程师与哲学实验团队对话。" },
    { step: "04", name: "记录失败", desc: "不隐藏技术黑天鹅与伦理反冲，完整保留每一场未达成预期的科学实验档案。" },
    { step: "05", name: "把它们放在一起", desc: "交汇于“桃花浮岛”与“Let's Decide”，将技术化为可退出的生存容器与自愿契约。" }
  ]
};

export const CIVDESK_TRACKS: CivDeskTrack[] = [
  {
    id: "aging",
    titleZh: "生老病死",
    titleEn: "Birth, Aging, Illness & Death",
    tagline: "突破衰老作为“不可逆宿命”的技术迷思",
    leadQuestion: "生命为什么一定要衰老？疾病为什么必须夺走那么多生命？在死亡无法避免之前，我们能不能先减少疾病、痛苦和衰老？",
    descriptionZh: "我们寻找真正正在发生的研究。不神化技术，也不因为困难就停止寻找。将衰老视为生物系统积累的物理与表观损伤，而非神圣不可侵犯的道德法则。",
    whyChallenged: "人类历史上常把‘衰老与痛苦’当成神圣秩序的一部分，称其为自然法则。但自然发生并不等于道德上必须接受。",
    scientificDossiers: [
      {
        id: "dossier-senolytics",
        title: "衰老细胞靶向清除 (Senolytics) 与组织微环境重塑",
        domain: "表观遗传学 / 细胞生物学",
        currentStage: "Clinical Trials",
        summary: "衰老细胞（僵尸细胞）持续分泌促炎因子促使邻近健康细胞恶化。通过达沙替尼、槲皮素和新型特异性抗体偶联物，选择性诱导衰老细胞凋亡。",
        radicalInquiry: "如果生命体内的器官能够持续保持无炎症年轻态，我们是否可以将机体退行性病变从自然必然转变为工程故障？",
        failedAttemptsLogged: "过往泛靶向清除曾导致创面愈合延迟与血小板减少，需精准组织微环境特异性投送。",
        hopefulDirection: "mRNA 纳米脂质载体特异性识别老化受体，在不触碰健康干细胞前提下实现原位细胞更新。"
      },
      {
        id: "dossier-reprogramming",
        title: "部分细胞重编程：山中因子 (OSK) 的表观重置",
        domain: "再生医学 / 分子遗传学",
        currentStage: "Lab Experiment",
        summary: "利用 Oct4, Sox2, Klf4 脉冲式诱导，清除表观遗传噪声并重置 DNA 甲基化时钟，使神经节细胞与心肌细胞恢复幼态活性而不会退化为未分化肿瘤。",
        radicalInquiry: "生命的时钟是否只是储存在染色质包装层的一串可擦写代码？",
        failedAttemptsLogged: "持续全因子诱导容易引发畸胎瘤风险，因此严格采用瞬时可控脉冲表达。",
        hopefulDirection: "基于小分子诱导物的无病毒载体靶向逆转，在灵长类视神经损伤恢复实验中已取得突破。"
      },
      {
        id: "dossier-bioprinting",
        title: "高精度血管化 3D 生物打印与原位器官再生",
        domain: "生物制造 / 组织工程",
        currentStage: "Engineering Pilot",
        summary: "结合受体自体诱导多能干细胞，利用微流控立体光刻技术，打印具备完整微微血管毛细网的肾脏与肝小叶组织，实现排异反应为零的组织替换。",
        radicalInquiry: "生命身体的衰竭是否应像更换航天飞机磨损部件一样透明自由？",
        failedAttemptsLogged: "早期人工器官受限于超过 200 微米扩散极限无法建立毛细循环而中心坏死。",
        hopefulDirection: "全息双光子光刻与活性水凝胶基质结合，成功构建持续灌注超 60 天的人源肝滤泡单元。"
      }
    ]
  },
  {
    id: "predation",
    titleZh: "弱肉强食",
    titleEn: "Predation & The Ethics of Nourishment",
    tagline: "摆脱通过杀死生命维系生命的残忍逻辑",
    leadQuestion: "生命一定要通过杀死其他生命获得食物吗？如果有一天，我们能够直接制造蛋白质、脂肪、糖和其他营养物质呢？",
    descriptionZh: "如果食物可以越来越接近“吗哪”（Manna），生命之间的关系会不会发生根本变化？我们关注培养肉、合成食品、无细胞制造、人工细胞、分子机器，以及所有可能让食物摆脱杀戮的技术。同时，我们也研究另一个问题：即使资源足够，生命之间还需要互相支配吗？",
    whyChallenged: "‘物竞天择，弱肉强食’被某些人借用为社会欺凌与物种支配的合法性辩护。但当营养可以从阳光、空气和微藻直接合成，掠夺便不再是生存的刚需，而仅仅是一种落后惯性。",
    scientificDossiers: [
      {
        id: "dossier-manna-synthesis",
        title: "“分子曼娜”协议：空气捕碳与光电水解蛋白质合成",
        domain: "无细胞生物制造 / 碳捕集",
        currentStage: "Engineering Pilot",
        summary: "利用可再生光伏能源直接电解水制氢，驱动嗜氢产甲烷菌及酵母细胞器无细胞提取物，直接将空气中的 CO2 与氮转化为高纯度必需氨基酸与肽链。",
        radicalInquiry: "当人类不再需要通过屠宰农场或践踏生态链即可满足每一个细胞的能量需求，我们与动物、与自然的关系能否首次建立在真正平等的友爱之上？",
        failedAttemptsLogged: "初代单细胞蛋白存在核酸含量过高导致痛风的问题，经过酶解脱核酸工艺得以彻底解决。",
        hopefulDirection: "模块化集装箱式“曼娜”制造机，单日消耗 20 度绿电与 5 升水即可提供 4 人完整全谱营养。"
      },
      {
        id: "dossier-cellular-meat",
        title: "全肌纤维定向排列培养肉与多细胞微支架技术",
        domain: "农业生物技术 / 组织工程",
        currentStage: "Engineering Pilot",
        summary: "提取一滴动物羽毛或脱落毛囊干细胞，在植物基大豆蛋白/海藻酸钠微支架上定向分化为肌原纤维与脂肪小球，完全重现真实肉类风味与质感，零痛苦零屠戮。",
        radicalInquiry: "是否可以宣告‘为了口腹之欲必须伴随恐惧惨叫’的历史阶段永久终结？",
        failedAttemptsLogged: "对胎牛血清（FBS）的依赖曾让行业受到伦理质疑，现已实现100%无动物源化学定义培养基替代。",
        hopefulDirection: "连续灌流式生物反应器规模化量产，成本逼近传统工业养殖肉类，桃花浮岛将其作为标配营养源。"
      },
      {
        id: "dossier-anti-domination",
        title: "后匮乏生态学：支配本能的神经行为学解构",
        domain: "演化认知科学 / 行为社会学",
        currentStage: "Thought Experiment",
        summary: "从生物学底层探究：掠夺与等级支配究竟是匮乏环境下的应激演化遗留，还是智能生命的永恒宿命？如果物质与空间实现多节点自治充足，权力寻租的冲动将如何被制度引导消解？",
        radicalInquiry: "即使资源丰裕，为什么生命依然习惯于寻找顺民与替罪羊？我们如何设计出杜绝新神的共同体机制？",
        failedAttemptsLogged: "过往乌托邦公社大多因领袖个人魅力垄断与闭门狂热而走向溃败，缺乏制度退出权是致命硬伤。",
        hopefulDirection: "桃花浮岛提出‘临接而不归属’与物理离岛权，将权力随时可归还为分散零态。"
      }
    ]
  },
  {
    id: "disaster",
    titleZh: "自然灾害",
    titleEn: "Natural Disasters & Planetary Resilience",
    tagline: "在无常的大自然面前，构建永不倾覆的模块化方舟",
    leadQuestion: "我们不能命令海浪停止，不能让地震消失，不能让台风绕开所有人。但我们可以研究：怎样让建筑更安全？怎样让能源和水更加可靠？怎样让生命在灾害之后仍然能够生活？",
    descriptionZh: "桃花浮岛，就是我们对这个问题的一次长期实验。面对地质板块断裂与极端气候，不再用沉重的水泥硬抗大自然，而是化整为零，以柔克刚，以独立的多节点冗余保障文明香火永不熄灭。",
    whyChallenged: "面对地震、海啸与飓风，传统文明习惯于将灾害归因于‘天谴’或‘不可抗力的宿命’。CivDesk 寻找通过模块柔性工程与分布式生命支持将伤害降到趋近于零的可行范式。",
    scientificDossiers: [
      {
        id: "dossier-floating-breakwater",
        title: "张力腿仿生柔性浮式海洋平台与波浪消能拓扑",
        domain: "海洋工程 / 仿生材料学",
        currentStage: "Engineering Pilot",
        summary: "采用多自由度磁流变阻尼铰链连接的六角形模块，能将 15 米巨浪的冲击力在模块链网间色散化为微小震颤并就地转化为储能电能。",
        radicalInquiry: "为什么我们要将人类文明钉死在容易地震断裂的大陆板块死角，而不是栖居于柔韧自由的深蓝公海？",
        failedAttemptsLogged: "刚性超大浮体（VLFS）因海水疲劳应力集中易产生横向剪切断裂，已全面转向模块化非刚性自解耦设计。",
        hopefulDirection: "桃花浮岛原型基底采用玄武岩微孔发泡聚合材料，即使被鱼雷穿透或礁石撞击亦不会沉没。"
      },
      {
        id: "dossier-microgrids",
        title: "离网型闭环海水淡化与海洋温差发电 (OTEC) 单元",
        domain: "热能与动力工程 / 分离膜科学",
        currentStage: "Engineering Pilot",
        summary: "利用表层温水与千米深层冰冷海水之间的 22℃ 稳定温差进行朗肯循环发电，副产物为不含重金属的纯净超纯深层矿泉淡水，全年昼夜不间断输出。",
        radicalInquiry: "如果生命生存的水和电完全独立于任何国家电网和市政水管，霸权统治的物质根基还剩下什么？",
        failedAttemptsLogged: "深海取水冷水管（CWP）早期因自重过大与深海内波剪切脱落，现代采用自浮性碳纤维缠绕管解决。",
        hopefulDirection: "单个 500kW OTEC 模块可同时满足 1200 名居民全部电力与每日 30 吨纯净饮水需求。"
      },
      {
        id: "dossier-exit-hardware",
        title: "自组装模块化栖息地与一键物理脱扣解耦机制",
        domain: "机械机电一体化 / 安全工程",
        currentStage: "Engineering Pilot",
        summary: "将《生命共同体协议》第 25 条‘退出权成为基础设施’物理化：居住舱与核心环岛通过磁力锁连接，一旦遭遇危机或居民意愿变更，可在 3 分钟内物理脱开独立存活。",
        radicalInquiry: "如果退出成本在物理上就是零，那么共同体如何才能维系？唯有依靠爱、吸引力与真实的尊重。",
        failedAttemptsLogged: "传统螺栓锁止在海水中易生锈卡死，现代采用自退磁稀土常闭防爆锁具，断电默认处于脱钩安全态。",
        hopefulDirection: "离岛模块自备柔性气囊与应急光伏帆，可在海流中安全自主漂航并对接邻近的任意浮岛节点。"
      }
    ]
  }
];
