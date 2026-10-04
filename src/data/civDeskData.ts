/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CivDeskTrack {
  id: 'aging' | 'predation' | 'disaster';
  titleZh: string;
  titleEn: string;
  leadQuestion: string;
  descriptionZh: string;
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
但我们想把问题重新摆到桌面上。`
};

export const CIVDESK_TRACKS: CivDeskTrack[] = [
  {
    id: "aging",
    titleZh: "生老病死",
    titleEn: "Birth, Aging, Illness & Death",
    leadQuestion: "生命为什么一定要衰老？疾病为什么必须夺走那么多生命？在死亡无法避免之前，我们能不能先减少疾病、痛苦和衰老？",
    descriptionZh: "研究生命从诞生、成长、衰老到死亡过程中，人类可以如何理解、减轻或改变其中的痛苦。"
  },
  {
    id: "predation",
    titleZh: "弱肉强食",
    titleEn: "Predation & The Ethics of Nourishment",
    leadQuestion: "生命一定要通过杀死其他生命获得食物吗？如果有一天，我们能够直接制造蛋白质、脂肪、糖和其他营养物质呢？",
    descriptionZh: "研究生命之间的竞争、捕食、支配与资源争夺，以及人类是否能够设计出不同于自然竞争的社会制度与技术。"
  },
  {
    id: "disaster",
    titleZh: "自然灾害",
    titleEn: "Natural Disasters & Planetary Resilience",
    leadQuestion: "我们不能命令海浪停止，不能让地震消失，不能让台风绕开所有人。但我们可以研究：怎样让建筑更安全？怎样让能源和水更加可靠？怎样让生命在灾害之后仍然能够生活？",
    descriptionZh: "研究洪水、风暴、地震、疾病、饥荒等自然力量，以及人类如何通过技术、制度与共同体降低它们造成的伤害。"
  }
];
