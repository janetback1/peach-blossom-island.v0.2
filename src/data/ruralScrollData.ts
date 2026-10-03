/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface InteractiveSpot {
  id: string;
  name: string;
  subtitle: string;
  category: 'human' | 'animal' | 'robot' | 'landscape';
  position: { xPercent: number; yPercent: number }; // Relative to scroll canvas
  briefTag: string;
  story: string;
  quote?: string;
  quietNote?: string; // For things like the sleeping dog: "嘘……它睡得正香。不要闹它。"
  hasDetailedModal?: boolean;
  image?: string;
}

export type ScrollAtmosphere = 'spring' | 'summer' | 'autumn' | 'sunset';

export const SCROLL_ATMOSPHERES: {
  id: ScrollAtmosphere;
  name: string;
  badge: string;
  desc: string;
  bgFilter: string;
  ambientTint: string;
}[] = [
  {
    id: 'spring',
    name: '春暖桃花',
    badge: '春景 · 桃花清波',
    desc: '山翠草绿，桃花映水，细流澄澈，生命初绽的温润时节。',
    bgFilter: 'brightness(1.02) saturate(1.05)',
    ambientTint: 'from-emerald-950/20 via-rose-950/15 to-transparent'
  },
  {
    id: 'summer',
    name: '夏木浓绿',
    badge: '夏景 · 浓阴山涧',
    desc: '群峰黛色，林泉交织，稻禾郁茂，万物各得其所的丰沛时日。',
    bgFilter: 'hue-rotate(-8deg) brightness(0.98) saturate(1.15)',
    ambientTint: 'from-emerald-950/30 via-teal-950/20 to-transparent'
  },
  {
    id: 'autumn',
    name: '秋田金黄',
    badge: '秋景 · 稻穗金黄',
    desc: '梯田如缎，稻香扑鼻，暮色澄明，辛劳与闲暇交汇的收获之季。',
    bgFilter: 'sepia(0.2) hue-rotate(15deg) saturate(1.1)',
    ambientTint: 'from-amber-950/30 via-orange-950/15 to-transparent'
  },
  {
    id: 'sunset',
    name: '海上暮霞',
    badge: '暮景 · 霞光向晚',
    desc: '晚霞如锦，炊烟袅袅，远山如黛，海面与溪流同染赤金之色。',
    bgFilter: 'sepia(0.25) hue-rotate(-20deg) saturate(1.25) brightness(0.95)',
    ambientTint: 'from-rose-950/40 via-purple-950/20 to-transparent'
  }
];

export const RURAL_SPOTS: InteractiveSpot[] = [
  {
    id: 'grandma_courtyard',
    name: '竹篱小院：白发老奶奶的梳妆窗下',
    subtitle: '重要微景 · 衰老不等于衰败的生命尊严',
    category: 'human',
    position: { xPercent: 18, yPercent: 46 },
    briefTag: '白发如银 · 精神体面',
    hasDetailedModal: true,
    image: '/src/assets/images/grandma_courtyard_1791020927069.jpg',
    story: `在靠近山脚的一处竹篱小院里，院子被打理得干干净净、整整齐齐。青砖缝里长着毛茸茸的细草，木架上晒着金银花与刚摘下的野雏菊。

圆窗下方，阳光正好洒在窗棂上。一位穿蓝布衣服的白发老奶奶正对着铜镜，高高兴兴地梳理自己的头发。她满头银丝，眼角有着深刻清晰的笑纹——她就是一个真正的老人，没有被任何技术虚假地磨平岁月。但她的背挺得很直，神色从容、安详、体面而幸福。

她脚边趴着一只晒太阳的狸花猫，猫尾巴懒散地扫着地面；身边还立着一个圆头圆脑的微型管护机器人，手里捧着一壶温热的山泉水，正安静地等奶奶梳完头。`,
    quote: `“有人问我怕不怕老。有什么好怕的？日子过得舒坦，有猫，有老邻居，小铁人还帮我扫落叶。梳好头，我还要去地里摘青椒呢。”`
  },
  {
    id: 'sleeping_dog',
    name: '柴垛下熟睡的土黄狗',
    subtitle: '自由生活的小动物',
    category: 'animal',
    position: { xPercent: 32, yPercent: 72 },
    briefTag: '呼噜呼噜 · 晒太阳中',
    quietNote: '嘘……它睡得正香。不要闹它。',
    story: `一条毛发干净微黄的田园犬，蜷缩在向阳柴堆与竹篱交接的温热沙土里。
它把黑湿的鼻子埋在前爪里，肚皮随着呼吸匀称地起伏。

在这个共同体里，动物不是人类的财产或食物，也不是招徕游客的玩物。它有自己的闲暇、自己的安全感，和属于一条狗最纯粹的午后好觉。`
  },
  {
    id: 'tea_under_eaves',
    name: '屋檐下喝茶的老人与伙伴机器人',
    subtitle: '不为做大事，只为彼此陪伴的居民',
    category: 'robot',
    position: { xPercent: 12, yPercent: 58 },
    briefTag: '一杯粗茶 · 闲看远山',
    story: `老木屋挑出的青瓦屋檐下，摆着一张磨得发亮的柏木矮几。七十二岁的老林端着粗陶茶碗，正微眯着眼睛看远山蒸腾的晨雾。

机器人“阿竹”坐在对面的小竹凳上，机械臂轻轻稳着陶壶。阿竹没有宏大的生产指标，它的日常就是每天下午陪老林在檐下坐半小时。

老林年轻时是防台风工程的机械师，如今他喜欢指着天上的云朵教阿竹看雨信。阿竹将这些经验转化成无损诗歌存进本地日志。没有谁统治谁，他们只是邻居。`
  },
  {
    id: 'farmer_researcher',
    name: '田埂上挽着裤脚的农夫',
    subtitle: '多重身份的生命：既是种植者，也是海洋学者',
    category: 'human',
    position: { xPercent: 44, yPercent: 62 },
    briefTag: '脚踩田泥 · 仰望天光',
    story: `在错落的灌溉水田边，一位青年正蹲在水田埂上仔细察看稻苗根部的微藻共生群落。

他戴着普通的竹编草帽，裤腿挽到膝盖，脚板上沾满带有泥土清香的田泥。但他也是桃花浮岛近海生物圈的常驻研究员。

“在浮岛，一个人不会被一个职业标签死死钉住一辈子。今天想去泥地里插秧就来插秧，明天想去实验室分析海水叶绿素就去分析。文明的自由，首先是选择生活节奏的自由。”`
  },
  {
    id: 'crooked_stone_bridge',
    name: '稍微歪一点的小石桥与老水牛',
    subtitle: '自然、不规则、带着生活痕迹的人间造物',
    category: 'landscape',
    position: { xPercent: 58, yPercent: 52 },
    briefTag: '流水潺潺 · 岁月痕迹',
    story: `横跨清澈溪流的小石桥并不是现代图纸上冷硬规整的直角产物。它的一端因为河床地质有些许微斜，桥面由大小不一的溪卵石与整块青石条拼成，缝隙间生出苍翠的羊齿蕨。

一头壮硕温驯的大黑水牛正稳稳走过桥面，牛蹄在湿润的青石上踏出清脆空灵的哒哒声。放牛的小男孩把手轻轻搭在牛角上，一人一牛，悠悠踱向芳草甸。

大自然从不是直线，桃花浮岛的生活亦然。不规则，才是真正的生命力。`
  },
  {
    id: 'river_peach_boat',
    name: '水边桃花树与系缆的小木船',
    subtitle: '伸到水面的花枝 · 自由来去的摆渡',
    category: 'landscape',
    position: { xPercent: 72, yPercent: 65 },
    briefTag: '花落水面 · 自由启航',
    story: `几株老桃树的虬枝向着江面探出，粉白的花瓣落入水中，随涟漪缓缓漂向开阔的外海。

岸边用竹桩缆绳系着一艘带乌篷的小木船。船舱里还留着采摘不久的半筐野枇杷。这艘船昨天刚从隔壁的近海农业浮岛划过来，明天也可能扬帆去往更远的外岛探望朋友。

在桃花浮岛，所有的连接都是自愿的，所有的离开也都是自由的。岸边的小船永远不上锁，水流自由，船亦自由。`
  },
  {
    id: 'linen_drying_kids',
    name: '青石溪畔晾晒的衣裳与戏水孩童',
    subtitle: '普通人的生活：干净、体面、有闲暇、有欢笑',
    category: 'human',
    position: { xPercent: 65, yPercent: 78 },
    briefTag: '衣袂清爽 · 溪流欢歌',
    story: `河滩几块宽阔平整的巨大青石板上，整整齐齐晒着几件刚用植物皂角洗好的棉麻衣服。微风拂过，散发出阳光与溪水的清冽气息。

两个孩子和一台矮矮的浅水清洁机器人正在浅滩鹅卵石间翻找小虾。机器人每找到一只小螃蟹，就会伸出圆手轻轻碰碰孩子的脚踝，逗得孩子们在水花里笑得前仰后合。

这里没有疲于奔命的考核与攀比，午后的阳光属于清澈的水，也属于每一个不用为生存恐惧的普通生命。`
  },
  {
    id: 'distant_floating_island',
    name: '极目远眺：海平面上的桃花浮岛群',
    subtitle: '科技融入自然：在波涛中化解灾变，不作主人的方舟',
    category: 'landscape',
    position: { xPercent: 88, yPercent: 38 },
    briefTag: '海天一色 · 漂浮故乡',
    story: `顺着河流奔腾入海的方向望去，远方海天之际漂浮着数座轻盈优雅的六角形生态浮岛。

它们在平静的海面上随着洋流极慢地起伏，柔韧的铰链吸收了外海潜流的巨力，海浪被温和地转化为淡水与绿电。那是文明面对自然灾害的一次无声回答：不再与大海死磕硬撞，而是如落花般随波而栖。

陆地是家，海洋也是家。当风暴来临，浮岛可以灵活拆分；当阳光普照，它们又在晨霞里重聚为邻。`
  }
];

export const HOMEPAGE_PHILOSOPHICAL_CORE = {
  quote: `生命会生老病死，自然会有灾害，弱小生命也无法避免脆弱。
但是生命可以共同生活，共同抵抗那些本来可以避免的痛苦。
文明不是让少数人拥有更多。
文明首先应该让普通生命可以安全、自由、有尊严地生活。`,
  subquote: `技术存在，但技术不支配生活；
自然存在，但自然不是威胁；
人会衰老，但衰老不等于失去尊严；
机器人存在，但机器人不是统治者；
人、动物和其他生命共同生活。`
};
