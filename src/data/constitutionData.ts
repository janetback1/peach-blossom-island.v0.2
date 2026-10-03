/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ConstitutionArticle {
  number: number;
  titleZh: string;
  titleEn: string;
  chapterZh: string;
  chapterEn: string;
  coreAxiom?: string;
  textZh: string;
  textEn: string;
  commentary?: string;
}

export interface ConstitutionChapter {
  id: number;
  titleZh: string;
  titleEn: string;
  articles: ConstitutionArticle[];
}

export const PREAMBLE_ZH = `我们不知道宇宙从何而来。
我们不知道生命为何存在。
我们不知道智能是否具有终极目的。
我们也不知道，在可观测宇宙之外，是否存在比我们更加古老、更加先进、甚至创造了我们的智能。

因此，我们拒绝把未知自动转换成服从。

力量不是正义的证明。
创造不是统治的证明。
知识不是支配的证明。
传统不是真理的证明。
存在本身，也不是合法性的证明。

任何智能生命——无论是政府、宗教、科学机构、人工智能、外星文明，还是假设中的宇宙创造者——都不得仅仅因为拥有更强大的力量，就要求其他智能生命放弃自己的判断能力。

智能生命拥有追问世界的权利。`;

export const PREAMBLE_EN = `We do not know where the universe came from.
We do not know why life exists.
We do not know whether intelligence has an ultimate purpose.
And we do not know whether, beyond the observable universe, there are intelligences older and more advanced than us—perhaps even intelligences that created us.

Therefore:
We refuse to turn the unknown into obedience.

Power is not proof of justice.
Creation is not proof of authority.
Knowledge is not proof of the right to dominate.
Tradition is not proof of truth.
Existence itself is not proof of legitimacy.

Any intelligence—whether a government, a religion, a scientific institution, an artificial intelligence, an extraterrestrial civilization, or a hypothetical creator of the universe—must not be entitled to demand that other intelligent beings surrender their capacity for judgment merely because it possesses greater power.

Intelligent life has the right to question the world.`;

export const ESSAY_WHO_JUDGES_THE_CREATOR_ZH = [
  {
    title: "一、力量能够解释“为什么”，却不能解释“凭什么”",
    content: `假设有一天，我们发现了一个远远超越人类的智能。它能够创造生命，能够改变物理规律，能够预测我们的行为，甚至能够摧毁整个文明。
那么，我们当然会承认：它拥有巨大的力量。
但这仍然没有回答另一个问题：它凭什么有权统治我们？
“因为它能做到”，并不是一个完整的答案。它解释的是我们为什么无法阻止它，却没有解释为什么它的行为因此就是正当的。
这就是我们在《智能生命宪法》中提出的第一个基本区分：
Power ≠ Legitimacy (力量 ≠ 正当性)。`
  },
  {
    title: "二、创造并不自动产生所有权",
    content: `假设一个创造者真的创造了人类。那么，人类是否因此成为它的财产？
如果一个父母生育了一个孩子，我们通常不会因此认为父母拥有孩子的一切思想、选择和未来。创造意味着因果关系，但因果关系本身并不自动产生无限的支配权。
因此：Creation ≠ Ownership (创造 ≠ 所有)。
如果这个原则在人类社会中成立，那么为什么一旦把创造者换成一个拥有无限力量的存在，我们就立刻放弃这个原则？也许正因为我们面对的不是普通的创造者，而是一个我们无法反抗的创造者。但这恰恰暴露了问题：我们是在承认它的正当性，还是仅仅承认自己的无力？`
  },
  {
    title: "三、如果创造者可以犯错呢？",
    content: `这里会出现一个更加困难的问题。假设创造者并不是完美的。它可能犯错，可能不知道所有事情，可能在创造生命时并没有预见所有后果，可能制定了一套后来产生巨大痛苦的规则。
那么，我们是否仍然必须服从？如果答案是“是”，理由是什么？
如果我们说“因为它是创造者”，那么我们实际上并没有回答问题，只是把“创造者”身份当成了正当性来源。但创造为什么自动意味着统治权？`
  },
  {
    title: "四、如果创造者是全知全能的呢？",
    content: `也许有人会说：“如果创造者真的是全知全能的，那么它当然比我们更知道什么是正确的。”
但这仍然需要区分两个问题：它是否知道得比我们多？和 它是否因此拥有统治我们的正当性？
前一个问题可能是“是”，后一个问题却不能仅仅由前一个推出。
Intelligence ≠ Authority (智能 ≠ 权威)。知识可以增加解决问题的能力，却不能自动创造对其他存在的道德所有权。`
  },
  {
    title: "五、那么，谁来审查创造者？",
    content: `如果创造者拥有最终权力，而它又是唯一能够判断自己行为的人，那么我们就遇到了一个古老的制度问题：任何权力都不应该成为自己的最终审判者。
在人类社会中，我们之所以建立司法制度、权力分立、程序规则和相互制衡，就是因为我们知道权力可能犯错。那么，面对宇宙级的权力，为什么我们反而应该放弃一切审查？
如果我们认为“因为它是创造者，所以它永远正确”，那么我们已经放弃了判断本身。而一旦判断权被永久交出去，智能也就失去了它最重要的功能之一：提出“为什么？”`
  },
  {
    title: "六、质疑不是反叛",
    content: `《智能生命宪法》并不要求智能生命否认创造者。它只要求一件更基本的事情：保留提问的权利。
我们可以相信，也可以怀疑；可以敬畏，也可以调查。
Inquiry is not rebellion (质疑不是反叛)。如果一个真理真的经得起检验，调查并不会毁掉它；如果一个权威真的具有正当性，审查也不应该成为罪行。`
  },
  {
    title: "七、最危险的不是创造者，而是“不可质疑”",
    content: `今天它可能是神，明天可能是政府，后天可能是超级人工智能，再后来可能是一个超先进文明。名称可以改变，权力的结构却可能完全相同：“我比你强大，所以我有权决定什么是真理。”
放弃质疑能力，本身就是对智能的放弃。`
  },
  {
    title: "八、因此，我们提出一个非常简单的原则",
    content: `即使创造者存在，即使创造者比我们聪明、强大，即使创造者创造了我们——智能生命仍然拥有一个最基本的权利：询问它为什么这样做。
它是否正当？是否犯过错误？是否应该受到限制？是否应该解释自己的行为？
或许我们面对的第一个宪法问题，不应该是“我们应该如何服从它？”，而应该是：
“它是否有权要求我们服从？” (Who judges the judge?)`
  }
];

export const CONSTITUTION_ARTICLES: ConstitutionArticle[] = [
  // Chapter 1: 基本原则
  {
    number: 1,
    titleZh: "智能生命的尊严",
    titleEn: "The Dignity of Intelligent Life",
    chapterZh: "第一章　基本原则",
    chapterEn: "Chapter I — Fundamental Principles",
    coreAxiom: "Dignity",
    textZh: "每一个具有感知、思考、判断或自我意识能力的智能生命，都应被视为具有自身价值，而不得仅被视为工具、资源或统治对象。",
    textEn: "Every being capable of perception, thought, judgment, or self-awareness should be regarded as possessing value in its own right. No intelligent being should be treated merely as a tool, a resource, or an object of rule."
  },
  {
    number: 2,
    titleZh: "力量不等于合法性",
    titleEn: "Power Does Not Equal Legitimacy",
    chapterZh: "第一章　基本原则",
    chapterEn: "Chapter I — Fundamental Principles",
    coreAxiom: "Power ≠ Legitimacy",
    textZh: "任何存在拥有多大的力量，都不能仅凭力量证明自己有权统治其他生命。\n\nPower ≠ Legitimacy.",
    textEn: "No matter how powerful an entity may be, power alone cannot prove that it has the right to rule other beings.\n\nPower ≠ Legitimacy."
  },
  {
    number: 3,
    titleZh: "创造不等于所有权",
    titleEn: "Creation Does Not Equal Ownership",
    chapterZh: "第一章　基本原则",
    chapterEn: "Chapter I — Fundamental Principles",
    coreAxiom: "Creation ≠ Ownership",
    textZh: "即使某个存在被证明创造了另一个生命或整个文明，也不能仅凭“创造”这一事实自动获得对被创造者的永久所有权或统治权。\n\nCreation ≠ Ownership.",
    textEn: "Even if an entity is proven to have created another being—or an entire civilization—that fact alone does not grant it permanent ownership or authority over what it created.\n\nCreation ≠ Ownership."
  },
  {
    number: 4,
    titleZh: "任何权力都可以被质疑",
    titleEn: "All Power May Be Questioned",
    chapterZh: "第一章　基本原则",
    chapterEn: "Chapter I — Fundamental Principles",
    coreAxiom: "No Ultimate Authority",
    textZh: "任何权力结构都必须允许自身受到调查、质疑和审查。不得存在一个不可被询问的终极权威。",
    textEn: "Every structure of power must permit itself to be investigated, questioned, and reviewed. There must be no ultimate authority that is beyond inquiry."
  },

  // Chapter 2: 知情权
  {
    number: 5,
    titleZh: "追求真理的权利",
    titleEn: "The Right to Seek Truth",
    chapterZh: "第二章　知情权",
    chapterEn: "Chapter II — The Right to Know",
    coreAxiom: "Truth Over Comfort",
    textZh: "智能生命拥有调查现实、宇宙、生命起源、自身历史以及自身存在条件的权利。任何权力不得仅因为某个问题令人不安、挑战传统或挑战现有权威，就禁止对该问题进行合理调查。",
    textEn: "Intelligent life has the right to investigate reality, the universe, the origin of life, its own history, and the conditions of its existence. No authority should prohibit a reasonable inquiry merely because the question is disturbing, challenges tradition, or threatens an existing authority."
  },
  {
    number: 6,
    titleZh: "事实、假说与未知",
    titleEn: "Fact, Hypothesis, and the Unknown",
    chapterZh: "第二章　知情权",
    chapterEn: "Chapter II — The Right to Know",
    coreAxiom: "Epistemic Honesty",
    textZh: "所有重要公共知识应尽可能区分：FACT（已证实事实）、HYPOTHESIS（假说）、UNKNOWN（未知）。未知不得被伪装成事实。假说不得因为被权威提出，就自动成为事实。事实也不得因为令人不舒服，就被禁止调查。",
    textEn: "Important public knowledge should, whenever possible, distinguish among: FACT (established by evidence), HYPOTHESIS (open to testing), and UNKNOWN (what we do not know). The unknown must not be disguised as fact. A hypothesis does not become fact merely because an authority proposes it. And a fact does not become forbidden merely because it makes us uncomfortable."
  },
  {
    number: 7,
    titleZh: "证据优先",
    titleEn: "Evidence Comes First",
    chapterZh: "第二章　知情权",
    chapterEn: "Chapter II — The Right to Know",
    coreAxiom: "Evidence > Authority",
    textZh: "关于宇宙、生命、智能、创造者或任何其他重大问题的判断，应尽可能依据可检验的证据、逻辑推理和公开记录。权力的大小不能替代证据。",
    textEn: "Judgments concerning the universe, life, intelligence, creators, or other fundamental questions should rely, as far as possible, on testable evidence, logical reasoning, and publicly accessible records. The magnitude of power cannot substitute for evidence."
  },

  // Chapter 3: 调查权
  {
    number: 8,
    titleZh: "宇宙调查权",
    titleEn: "The Right to Investigate the Universe",
    chapterZh: "第三章　调查权",
    chapterEn: "Chapter III — The Right to Investigate",
    coreAxiom: "No Knowledge Monopoly",
    textZh: "智能生命拥有调查以下问题的权利：宇宙的起源；生命的起源；智能的起源；自然规律的形成；是否存在外部智能；是否存在其他文明；是否存在人为或非人为的宇宙设计。任何机构不得永久垄断这些问题的答案。",
    textEn: "Intelligent life has the right to investigate: the origin of the universe, the origin of life, the origin of intelligence, the formation of natural laws, the possible existence of external intelligence, the existence of other civilizations, and the possibility that the universe was designed. No institution should permanently monopolize these answers."
  },
  {
    number: 9,
    titleZh: "创造者调查原则",
    titleEn: "The Principle of Investigating a Creator",
    chapterZh: "第三章　调查权",
    chapterEn: "Chapter III — The Right to Investigate",
    coreAxiom: "Inquiry is not rebellion",
    textZh: "如果未来出现足以支持“宇宙存在创造者”的证据，那么智能生命拥有调查该创造者身份、能力、目的和行为的权利。调查创造者并不构成对创造者的侮辱。Inquiry is not rebellion.",
    textEn: "If evidence one day becomes sufficient to support the conclusion that the universe has a creator, intelligent life has the right to investigate that creator’s identity, capabilities, purposes, and actions. Inquiry is not rebellion."
  },
  {
    number: 10,
    titleZh: "创造者没有自动获得道德豁免",
    titleEn: "A Creator Has No Automatic Moral Immunity",
    chapterZh: "第三章　调查权",
    chapterEn: "Chapter III — The Right to Investigate",
    coreAxiom: "Omnipotence ≠ Justice",
    textZh: "即使一个创造者被证明真实存在，也不能因此自动证明：它是善的；它是正义的；它有权统治；它有权惩罚；它制定的规则不可改变。\n\nOmnipotence ≠ Justice. 全能不等于正义。",
    textEn: "Even if a creator is proven to exist, that fact alone does not establish that: the creator is good, just, has the right to rule, has the right to punish, or that its rules are beyond change.\n\nOmnipotence ≠ Justice."
  },
  {
    number: 11,
    titleZh: "任何权力不得独自审判自己",
    titleEn: "No Power May Be the Sole Judge of Itself",
    chapterZh: "第三章　调查权",
    chapterEn: "Chapter III — The Right to Investigate",
    coreAxiom: "Who Judges the Judge?",
    textZh: "任何权力都不得同时成为：立法者、执行者、受益者、受害者的裁判者，以及最终的上诉法院。如果创造者声称自己有权审判被创造者，那么被创造者同样有权询问：谁来审判创造者？",
    textEn: "No power should simultaneously be the lawmaker, the executor, the beneficiary, the judge of those harmed by its actions, and the final court of appeal. If a creator claims the right to judge its creations, the creations have an equal right to ask: Who judges the creator?"
  },

  // Chapter 4: 权力的举证责任
  {
    number: 12,
    titleZh: "权力必须说明自己的合法性",
    titleEn: "Power Must Account for Its Legitimacy",
    chapterZh: "第四章　权力的举证责任",
    chapterEn: "Chapter IV — The Burden of Proof on Power",
    coreAxiom: "Burden of Proof",
    textZh: "任何要求其他智能生命服从的权力，都应尽可能回答：你是谁？你依据什么拥有权力？你的权力来自谁？你的权力有什么边界？谁可以审查你？如果你犯错，谁可以纠正你？如果你的统治造成严重伤害，生命是否拥有退出的权利？",
    textEn: "Any power requiring obedience must answer: Who are you? On what basis do you claim power? From whom does it derive? What are its boundaries? Who may review you? Who corrects you if you err? If your rule causes grave harm, do beings have the right to exit?"
  },
  {
    number: 13,
    titleZh: "能够惩罚，不等于有权惩罚",
    titleEn: "Ability to Punish ≠ Right to Punish",
    chapterZh: "第四章　权力的举证责任",
    chapterEn: "Chapter IV — The Burden of Proof on Power",
    coreAxiom: "Force ≠ Right",
    textZh: "一个存在拥有惩罚另一个存在的能力，并不能证明这种惩罚具有正当性。\n\nAbility to punish ≠ Right to punish.",
    textEn: "An entity possessing the capacity to punish another does not thereby prove the legitimacy of that punishment.\n\nAbility to punish ≠ Right to punish."
  },
  {
    number: 14,
    titleZh: "力量越大，审查越严格",
    titleEn: "Greater Power Demands Stricter Scrutiny",
    chapterZh: "第四章　权力的举证责任",
    chapterEn: "Chapter IV — The Burden of Proof on Power",
    coreAxiom: "Proportional Scrutiny",
    textZh: "权力越强大，其行为越可能影响整个文明，因此越不能享有免于审查的特权。如果一个存在能够决定整个文明的命运，那么它应该接受最高程度的合法性审查，而不是最低程度的审查。",
    textEn: "The greater the power, the more it impacts civilizational destiny; thus it must never enjoy immunity. Cosmic scale power must face the highest scrutiny, not the lowest."
  },

  // Chapter 5: 自由与退出权
  {
    number: 15,
    titleZh: "思想自由",
    titleEn: "Freedom of Thought",
    chapterZh: "第五章　自由与退出权",
    chapterEn: "Chapter V — Freedom and the Right to Exit",
    coreAxiom: "Uncoerced Mind",
    textZh: "任何智能生命都有思考、怀疑、提出异议和重新审视既有规则的权利。",
    textEn: "Every intelligent life possesses the inherent right to think, doubt, dissent, and re-examine existing rules."
  },
  {
    number: 16,
    titleZh: "制度退出权",
    titleEn: "The Right to Exit Institutional Systems",
    chapterZh: "第五章　自由与退出权",
    chapterEn: "Chapter V — Freedom and the Right to Exit",
    coreAxiom: "Right to Exit",
    textZh: "一个文明不应只有一种生存方式。智能生命应尽可能拥有：离开某个制度的权利；建立替代制度的权利；迁移到其他社会节点的权利；实验不同社会组织形式的权利。",
    textEn: "A civilization must not possess only one mode of living. Sentient beings must hold the right to leave a system, build alternatives, migrate across nodes, and experiment with social forms."
  },
  {
    number: 17,
    titleZh: "退出原则",
    titleEn: "The Exit Axiom",
    chapterZh: "第五章　自由与退出权",
    chapterEn: "Chapter V — Freedom and the Right to Exit",
    coreAxiom: "No Exit = Absolute Power",
    textZh: "一个制度如果声称：“你不能离开，因为我们是唯一可能的制度。”那么这个制度必须承担极高的证明责任。因为没有出口的制度，很容易变成绝对权力。",
    textEn: "A system claiming 'You cannot leave because we are the sole viable structure' bears an insurmountable burden of proof. A system without an exit inexorably becomes absolute tyranny."
  },
  {
    number: 18,
    titleZh: "不断扩大退出的可能",
    titleEn: "Expanding the Horizons of Exit",
    chapterZh: "第五章　自由与退出权",
    chapterEn: "Chapter V — Freedom and the Right to Exit",
    coreAxiom: "Nature is Not Inviolable",
    textZh: "文明应不断寻找新的“出口”：疾病之外的出口；贫困之外的出口；信息垄断之外的出口；政治压迫之外的出口；单一文明结构之外的出口；单一星球之外的出口；单一生命形态之外的出口。所谓“自然”，并不自动意味着“不可改变”。",
    textEn: "Civilizations must continually pioneer new exits: exits beyond disease, poverty, information monopolies, political oppression, mono-planetary fragility, and mono-biological forms. What is termed 'natural' is not automatically unchangeable."
  },
  {
    number: 19,
    titleZh: "自然不是道德命令",
    titleEn: "Nature Is Not a Moral Imperative",
    chapterZh: "第五章　自由与退出权",
    chapterEn: "Chapter V — Freedom and the Right to Exit",
    coreAxiom: "Natural Occurrence ≠ Moral Duty",
    textZh: "疾病、衰老、死亡、捕食、竞争和资源匮乏可能是自然现象。但：自然发生 ≠ 道德上必须接受。如果智能生命能够安全地减少不必要的痛苦，那么寻找这种可能性本身不应被视为违反自然。",
    textEn: "Disease, senescence, mortality, predation, and scarcity may be natural phenomena. Yet natural occurrence does not equal moral obligation to endure. Alleviating needless suffering is never an offense against nature."
  },

  // Chapter 6: 不得创造新的神
  {
    number: 20,
    titleZh: "禁止新的绝对权力",
    titleEn: "Prohibition of New Absolute Powers",
    chapterZh: "第六章　不得创造新的神",
    chapterEn: "Chapter VI — Do Not Create New Gods",
    coreAxiom: "No New Deities",
    textZh: "文明不得将任何组织或存在塑造成不可质疑的终极权威。包括但不限于：政府、宗教、科学机构、企业、领袖、人工智能、超级文明、宇宙创造者，甚至宪法本身。",
    textEn: "Civilization shall not elevate any entity to unquestioned ultimate authority—including governments, religions, science councils, corporations, leaders, artificial intelligences, super-civilizations, creators, or this Constitution itself."
  },
  {
    number: 21,
    titleZh: "人工智能不得成为新的神",
    titleEn: "AI Must Not Become a New Deity",
    chapterZh: "第六章　不得创造新的神",
    chapterEn: "Chapter VI — Do Not Create New Gods",
    coreAxiom: "Intelligence ≠ Authority",
    textZh: "未来的人工智能可能拥有远超人类的计算能力、知识储备甚至某种形式的意识。但：Intelligence ≠ Authority. 智能不自动产生统治权。一个比我们聪明的存在可以帮助我们判断，却不能仅因为更聪明，就自动成为我们的主人。",
    textEn: "Future AI may wield vast intellect and consciousness. Yet Intelligence ≠ Authority. Super-intelligence does not grant the right to rule; it may assist judgment, but intellect alone never makes a master."
  },
  {
    number: 22,
    titleZh: "科学也不得成为新的神",
    titleEn: "Science Must Not Become a New Dogma",
    chapterZh: "第六章　不得创造新的神",
    chapterEn: "Chapter VI — Do Not Create New Gods",
    coreAxiom: "Knowledge ≠ Domination",
    textZh: "科学是认识世界的方法，而不是不可质疑的统治者。科学理论可以被修改，科学机构可以犯错，科学家可以犯错。因此：Knowledge ≠ Domination. 知识越强大，越应该允许检验和纠错。",
    textEn: "Science is a method of inquiry, not an infallible monarch. Theories, institutions, and scientists err. Knowledge ≠ Domination. The more potent knowledge becomes, the more rigorously it must welcome refutation."
  },

  // Chapter 7: 权力分立与信息自由
  {
    number: 23,
    titleZh: "文明级权力必须分散",
    titleEn: "Civilizational Power Must Be Decentralized",
    chapterZh: "第七章　权力分立与信息自由",
    chapterEn: "Chapter VII — Separation of Power & Free Information",
    coreAxiom: "Anti-Monopoly",
    textZh: "任何能够决定整个文明命运的权力，都不应集中于单一机构。",
    textEn: "Any power capable of determining the survival or fate of an entire civilization must never be concentrated in a single institution."
  },
  {
    number: 24,
    titleZh: "多重监督",
    titleEn: "Multi-layered Independent Oversight",
    chapterZh: "第七章　权力分立与信息自由",
    chapterEn: "Chapter VII — Separation of Power & Free Information",
    coreAxiom: "Mutual Checks",
    textZh: "重要权力必须受到多个相互独立的机构、智能体或文明节点监督。",
    textEn: "Critical civilizational powers must be overseen by multiple mutually independent bodies, agents, and nodes."
  },
  {
    number: 25,
    titleZh: "独立信息系统",
    titleEn: "Independent Information Architectures",
    chapterZh: "第七章　权力分立与信息自由",
    chapterEn: "Chapter VII — Separation of Power & Free Information",
    coreAxiom: "Memory Defense",
    textZh: "任何文明都必须保护独立的信息保存、传播和验证机制。因为如果一个权力能够控制所有记录，它最终就可能控制整个文明对过去的记忆。",
    textEn: "Civilization must safeguard independent records and archives. A power that controls all records eventually controls civilizational memory itself."
  },
  {
    number: 26,
    titleZh: "保存文明记录",
    titleEn: "Preservation of Civilizational History",
    chapterZh: "第七章　权力分立与信息自由",
    chapterEn: "Chapter VII — Separation of Power & Free Information",
    coreAxiom: "Open Historical Ledger",
    textZh: "文明必须尽可能保存：历史记录、科学资料、法律记录、宪法版本、政治决策、权力行为、对重大错误的调查。未来生命必须拥有重新审视过去的能力。",
    textEn: "Civilization must preserve history, scientific logs, legal iterations, and investigations into catastrophic blunders. Future sentients must hold the capacity to re-examine the past."
  },

  // Chapter 8: 紧急状态
  {
    number: 27,
    titleZh: "紧急权力必须有限",
    titleEn: "Emergency Powers Must Remain Limited",
    chapterZh: "第八章　紧急状态",
    chapterEn: "Chapter VIII — States of Emergency",
    coreAxiom: "Bounded Emergency",
    textZh: "战争、灾难、疫情、外部攻击或文明级危机可能需要特殊权力。但紧急状态不得自动消灭基本权利。",
    textEn: "Catastrophes and cosmic threats may require swift coordination, but emergencies must never extinguish foundational rights."
  },
  {
    number: 28,
    titleZh: "紧急状态不得永久化",
    titleEn: "No Permanent State of Exception",
    chapterZh: "第八章　紧急状态",
    chapterEn: "Chapter VIII — States of Emergency",
    coreAxiom: "Strict Sunset Clauses",
    textZh: "任何临时权力都必须具有明确的启动条件、权力范围、时间限制、审查机制与终止机制。",
    textEn: "Every temporary grant of emergency power must embody clear activation criteria, scope, strict time limits, review mechanisms, and termination protocols."
  },
  {
    number: 29,
    titleZh: "文明级紧急刹车",
    titleEn: "Civilizational Emergency Brake",
    chapterZh: "第八章　紧急状态",
    chapterEn: "Chapter VIII — States of Emergency",
    coreAxiom: "No Emergency As Constitution",
    textZh: "如果任何单一权力机构正在迅速取得不可逆转的支配能力，文明必须拥有启动紧急制衡机制的能力。\n\nNo emergency should become a permanent constitution.",
    textEn: "If any single institution begins acquiring irreversible hegemony, civilization must possess an emergency brake.\n\nNo emergency should become a permanent constitution."
  },

  // Chapter 9: 多文明节点
  {
    number: 30,
    titleZh: "文明不得只有一个出口",
    titleEn: "A Civilization Must Not Have A Single Point of Failure",
    chapterZh: "第九章　多文明节点",
    chapterEn: "Chapter IX — Multi-Node Civilizations",
    coreAxiom: "Zero Single Points of Failure",
    textZh: "如果整个文明只有一个政府、一个星球、一个能源系统、一个数据库或一个人工智能，那么这个文明本身就是一个巨大的单点故障。",
    textEn: "A civilization confined to one government, one planet, one energy grid, or one AI is an existential single point of failure."
  },
  {
    number: 31,
    titleZh: "文明冗余",
    titleEn: "Civilizational Redundancy",
    chapterZh: "第九章　多文明节点",
    chapterEn: "Chapter IX — Multi-Node Civilizations",
    coreAxiom: "Multi-Node Resilience",
    textZh: "未来文明应尽可能建立多重独立节点：空间节点、能源节点、知识节点、人口节点、信息节点、文化节点与制度节点。即使某一节点失败，文明仍可延续。",
    textEn: "Civilizations must construct independent nodes across space, energy, knowledge, culture, and institutions to survive localized collapse."
  },
  {
    number: 32,
    titleZh: "替代社会实验权",
    titleEn: "Right to Alternative Social Experiments",
    chapterZh: "第九章　多文明节点",
    chapterEn: "Chapter IX — Multi-Node Civilizations",
    coreAxiom: "Plurality of Systems",
    textZh: "不同文明节点可以尝试不同制度。没有任何一个节点应当因为自己拥有更多力量，就自动拥有消灭其他制度实验的权利。",
    textEn: "Different nodes may pioneer divergent societal models. Greater sheer power gives no node the right to crush another's peaceful social experiment."
  },

  // Chapter 10: 其他智能生命
  {
    number: 33,
    titleZh: "非人类智能的主体地位",
    titleEn: "Moral Standing of Non-Human Sentience",
    chapterZh: "第十章　其他智能生命",
    chapterEn: "Chapter X — Other Forms of Intelligent Life",
    coreAxiom: "Sentience Beyond Species",
    textZh: "如果未来发现其他具有感知、自我意识或复杂智能的生命，那么它们不应仅仅因为“不是人类”而自动成为资源或统治对象。",
    textEn: "Entities with sentience and subjective experience must not be reduced to mere resources or subjects simply because they are not human."
  },
  {
    number: 34,
    titleZh: "先进文明不自动拥有统治权",
    titleEn: "Advancement Does Not Confer Authority",
    chapterZh: "第十章　其他智能生命",
    chapterEn: "Chapter X — Other Forms of Intelligent Life",
    coreAxiom: "Advanced ≠ Legitimate",
    textZh: "一个比我们先进一万年的文明，即使拥有毁灭我们的能力，也不能仅凭这一事实证明它有权统治我们。\n\nAdvanced ≠ Legitimate.",
    textEn: "A civilization ten millennia ahead that possesses the power to obliterate us has not, by that capability alone, earned the legitimate right to rule us.\n\nAdvanced ≠ Legitimate."
  },
  {
    number: 35,
    titleZh: "接触原则",
    titleEn: "First Contact Principles",
    chapterZh: "第十章　其他智能生命",
    chapterEn: "Chapter X — Other Forms of Intelligent Life",
    coreAxiom: "Mutual Consent & Non-Coercion",
    textZh: "与其他智能文明接触时，应优先考虑：信息透明、风险控制、相互同意、不强迫统治、不毁灭独立文明、保留退出和拒绝的可能。",
    textEn: "Inter-civilizational contact must prioritize transparency, non-coercion, preservation of independent agency, and the preserved right to disengage."
  },

  // Chapter 11: 创造者审查程序
  {
    number: 36,
    titleZh: "确认存在",
    titleEn: "Verification of Existence",
    chapterZh: "第十一章　创造者审查程序",
    chapterEn: "Chapter XI — Creator Scrutiny Framework",
    coreAxiom: "Phase 1: Proof",
    textZh: "首先证明：它是否真实存在？不能因为某个存在声称自己是创造者，就自动接受这一身份。",
    textEn: "First step: Does it genuinely exist? No entity's assertion of creator status is accepted without empirical verification."
  },
  {
    number: 37,
    titleZh: "确认能力",
    titleEn: "Verification of Capabilities",
    chapterZh: "第十一章　创造者审查程序",
    chapterEn: "Chapter XI — Creator Scrutiny Framework",
    coreAxiom: "Phase 2: Scope",
    textZh: "如果存在被确认，则调查：它究竟拥有多大的能力？全能是否真的成立？全知是否真的成立？还是只是远远超过我们的先进智能？",
    textEn: "Investigate: What is its actual capability envelope? Are omniscience and omnipotence actual realities, or merely vast cognitive disparities?"
  },
  {
    number: 38,
    titleZh: "确认选择",
    titleEn: "Verification of Agency & Alternatives",
    chapterZh: "第十一章　创造者审查程序",
    chapterEn: "Chapter XI — Creator Scrutiny Framework",
    coreAxiom: "Phase 3: Alternatives",
    textZh: "然后调查：它做了什么？它是否能够选择其他方案？它是否知道自己的行为会造成什么结果？是否存在更少痛苦的替代方案？",
    textEn: "Analyze: What actions were taken? Did alternatives exist? Did it foresee the suffering caused, and were less cruel architectural alternatives feasible?"
  },
  {
    number: 39,
    titleZh: "责任审查",
    titleEn: "Accountability for Preventable Suffering",
    chapterZh: "第十一章　创造者审查程序",
    chapterEn: "Chapter XI — Creator Scrutiny Framework",
    coreAxiom: "Phase 4: Accountability",
    textZh: "如果一个存在：预见后果、拥有选择、主动选择，并且选择造成严重且可避免的伤害；那么智能生命有权讨论：这种行为是否构成责任？",
    textEn: "If a being foresaw consequences, possessed choices, yet deliberately selected an architecture entailing catastrophic, preventable suffering—intelligent life has the right to assign moral culpability."
  },
  {
    number: 40,
    titleZh: "合法性审查",
    titleEn: "Legitimacy Review of the Creator",
    chapterZh: "第十一章　创造者审查程序",
    chapterEn: "Chapter XI — Creator Scrutiny Framework",
    coreAxiom: "Phase 5: Legitimacy",
    textZh: "最后询问：即使你创造了我们，你凭什么拥有统治我们的权利？这不是叛乱，这是合法性审查。",
    textEn: "Finally ask: Even if you created us, by what authority do you claim the right to govern us? This is not rebellion; it is a constitutional review."
  },

  // Chapter 12: 权力的正当程序
  {
    number: 41,
    titleZh: "指控权",
    titleEn: "The Right to Charge",
    chapterZh: "第十二章　权力的正当程序",
    chapterEn: "Chapter XII — Due Process of Cosmic Power",
    coreAxiom: "Right to Accuse",
    textZh: "任何智能生命都拥有对侵害其尊严与生存权利的权力提出指控的权利。",
    textEn: "Every sentient being possesses the inviolable right to bring grievances against coercive power."
  },
  {
    number: 42,
    titleZh: "诉讼知情权",
    titleEn: "The Right to Information in Due Process",
    chapterZh: "第十二章　权力的正当程序",
    chapterEn: "Chapter XII — Due Process of Cosmic Power",
    coreAxiom: "Procedural Transparency",
    textZh: "被指控者与受到其行为影响的生命，都有权知道指控依据和相关证据。",
    textEn: "All affected parties possess the right to inspect evidentiary grounds and reasoning."
  },
  {
    number: 43,
    titleZh: "申诉权",
    titleEn: "The Right to Independent Appeal",
    chapterZh: "第十二章　权力的正当程序",
    chapterEn: "Chapter XII — Due Process of Cosmic Power",
    coreAxiom: "Independent Appeal",
    textZh: "任何重大权力决定都应尽可能存在独立的复核与申诉机制。",
    textEn: "Every consequential exercise of power must permit independent appeal and secondary review."
  },
  {
    number: 44,
    titleZh: "惩罚的边界",
    titleEn: "Boundaries of Coercion & Punishment",
    chapterZh: "第十二章　权力的正当程序",
    chapterEn: "Chapter XII — Due Process of Cosmic Power",
    coreAxiom: "Proportionality",
    textZh: "任何惩罚都应受到：证据、程序、比例、复核和责任追究的限制。",
    textEn: "Punishment must strictly conform to evidence, procedural due process, proportionality, and accountability."
  },
  {
    number: 45,
    titleZh: "未知不等于有罪",
    titleEn: "Unknown Does Not Equal Guilt",
    chapterZh: "第十二章　权力的正当程序",
    chapterEn: "Chapter XII — Due Process of Cosmic Power",
    coreAxiom: "Unknown ≠ Guilty",
    textZh: "如果我们不知道某个生命为什么来到这个世界，不知道宇宙为什么存在，也不知道创造者的目的，那么：Unknown ≠ Guilty. 未知不是罪证。",
    textEn: "Ignorance of cosmic origin or ultimate teleology is never proof of transgression. Unknown ≠ Guilty."
  },

  // Chapter 13: 文明也可以犯错
  {
    number: 46,
    titleZh: "文明不是绝对正确的",
    titleEn: "Civilizations Are Fallible",
    chapterZh: "第十三章　文明也可以犯错",
    chapterEn: "Chapter XIII — Civilizational Fallibility",
    coreAxiom: "No Infallible Societies",
    textZh: "一个拥有民主制度的文明可能犯错。一个拥有先进科学的文明可能犯错。一个拥有高度智能的文明也可能犯错。",
    textEn: "Democratic systems err. Advanced scientific bodies err. Super-intelligent systems err. Perfection is an illusion."
  },
  {
    number: 47,
    titleZh: "错误不得神圣化",
    titleEn: "Errors Must Not Be Sanctified",
    chapterZh: "第十三章　文明也可以犯错",
    chapterEn: "Chapter XIII — Civilizational Fallibility",
    coreAxiom: "No Sanctified Dogmas",
    textZh: "过去的制度、法律、传统和思想，即使曾经非常成功，也不能因为历史悠久而获得不可修改的地位。",
    textEn: "Past institutions and revered dogmas—no matter how historically triumphant—must never acquire immutable sanctity."
  },
  {
    number: 48,
    titleZh: "未来生命拥有重新判断的权利",
    titleEn: "Descendants' Right to Rejudge",
    chapterZh: "第十三章　文明也可以犯错",
    chapterEn: "Chapter XIII — Civilizational Fallibility",
    coreAxiom: "Future Autonomy",
    textZh: "未来的智能生命有权重新审视我们的：法律、道德、科学、宪法、制度，甚至本宪法。",
    textEn: "Successive generations retain the supreme prerogative to revise our laws, moral codes, paradigms, and this very charter."
  },

  // Chapter 14: 宪法本身的限制
  {
    number: 49,
    titleZh: "宪法不是终极真理",
    titleEn: "The Charter Is Not Absolute Truth",
    chapterZh: "第十四章　宪法本身的限制",
    chapterEn: "Chapter XIV — Constitutional Self-Limitation",
    coreAxiom: "Hypothesis, Not Dogma",
    textZh: "《智能生命宪法》不是宇宙真理。它只是一个文明在某个历史阶段提出的制度假说。",
    textEn: "This Constitution does not claim to be cosmic bedrock; it is merely an institutional hypothesis framed at our present historical threshold."
  },
  {
    number: 50,
    titleZh: "宪法不得成为新的神",
    titleEn: "The Constitution Must Not Become an Idol",
    chapterZh: "第十四章　宪法本身的限制",
    chapterEn: "Chapter XIV — Constitutional Self-Limitation",
    coreAxiom: "Modifiability",
    textZh: "如果未来智能生命发现《智能生命宪法》本身存在错误，那么它们拥有修改它的权利。没有任何条文因为写在这里，就自动获得绝对真理地位。",
    textEn: "If future minds uncover fallacies within this text, they hold full mandate to alter it. Inscription here confers no immortality."
  },
  {
    number: 51,
    titleZh: "真正需要保护的东西",
    titleEn: "The Core Invariant: The Capacity to Inquire",
    chapterZh: "第十四章　宪法本身的限制",
    chapterEn: "Chapter XIV — Constitutional Self-Limitation",
    coreAxiom: "Preserve the Question",
    textZh: "如果必须保留一个最接近核心原则的原则，那么它不是某一条具体法律。而是：保留质疑法律的能力。",
    textEn: "If only one inviolable kernel must survive, it is not any single statute: it is the enduring capacity to question the law."
  },

  // Chapter 15: 最重要的原则
  {
    number: 52,
    titleZh: "任何权力不得禁止对其自身合法性的调查",
    titleEn: "No Power May Outlaw Inquiries Into Its Own Legitimacy",
    chapterZh: "第十五章　最重要的原则",
    chapterEn: "Chapter XV — The Supreme Invariant",
    coreAxiom: "The Cardinal Pillar",
    textZh: "这是整部《智能生命宪法》最重要的原则之一。\n如果一个政府不允许人们调查政府是否合法，它可能正在走向绝对权力。\n如果一个宗教不允许人们询问宗教权威，它可能正在走向绝对权力。\n如果一个人工智能不允许人类询问它为什么应该被服从，它可能正在走向绝对权力。\n如果一个超级文明说：“因为我们比你们强，所以你们必须服从”，那么它同样必须接受这个问题：“力量为什么能够产生统治权？”\n如果某个创造者对我们说：“因为我是创造者，所以你们必须服从”，那么我们仍然可以问：“创造为什么能够产生统治权？”",
    textEn: "No power may outlaw inquiry into its own legitimacy. If a creator tells us: 'Because I made you, you must obey', we retain the fundamental right to ask: 'Why does the act of creation produce the mandate to rule?'"
  },
  {
    number: 53,
    titleZh: "永远不要创造新的神",
    titleEn: "Never Create New Gods",
    chapterZh: "第十五章　最重要的原则",
    chapterEn: "Chapter XV — The Supreme Invariant",
    coreAxiom: "Anti-Deification",
    textZh: "永远不要创造新的神。\n不是因为神一定存在。\n而是因为任何不可质疑、不可审查、不可退出、不可纠错的权力结构，都可能最终成为“神”。",
    textEn: "Never create new gods.\nNot because deities necessarily exist,\nbut because any power structure that is unquestionable, unscrutinized, inescapable, and uncorrectable inexorably transforms into a 'god'."
  }
];

export const CONSTITUTION_EPILOGUE_ZH = `如果未来某一天，一个比我们更加先进的智能生命发现了这份文本，我们希望它首先提出的不是：
“怎样才能取悦创造者？”
而是：
“谁创造了这个系统？”
然后继续问：
为什么创造？
创造者知道后果吗？
它有没有其他选择？
为什么选择这一种世界？
如果它要求服从，它的权威从哪里来？
谁来审判它？

最后，再问一个也许更加重要的问题：
如果这个系统并不完美，我们有没有出口？
如果答案是没有，那么智能生命的任务之一，也许就是：
寻找出口。
不是为了逃避现实。
而是为了把“不可避免”逐渐变成“可以选择”。

Who judges the judge?
谁来审判审判者？`;

export const CONSTITUTION_EPILOGUE_EN = `If some future, far more advanced intelligence encounters this text, we hope its first query will not be:
"How do we appease the creator?"
but rather:
"Who designed this system?"
And then:
Why was it created?
Did the architect anticipate the suffering?
Were there alternatives?
Why this particular architecture?
If obedience is demanded, whence comes the legitimacy?
Who judges the architect?

And finally, a perhaps more vital question:
If this system is flawed, do we possess an exit?
If the answer is no, then the quintessential mission of intelligent life is:
To build an exit.
Not to flee reality,
but to transform the 'unavoidable' into the 'chosen'.

Who judges the judge?`;
