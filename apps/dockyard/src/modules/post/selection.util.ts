export type EffectiveElements = HTMLHeadingElement | HTMLParagraphElement;
export const effectiveHtmlTags = ["H1", "H2", "H3", "P"];
export const items = [
  {
    icon: `💡`,
    value: "锚点",
  },
  {
    icon: `❓`,
    value: "疑问",
  },
  {
    icon: `💡`,
    value: "惊叹",
  },
];

export const calculateHorizontalOffset = (
  parentElement: EffectiveElements,
  childNode: Node,
  offset: number
) => {
  let totalOffset = 0;

  // 遍历父元素的所有子节点
  for (let node of parentElement.childNodes) {
    if (node === childNode) {
      // 当到达目标节点时
      if (node.nodeType === Node.TEXT_NODE) {
        // 如果是文本节点，创建范围并计算偏移
        let range = document.createRange();
        range.setStart(node, 0);
        range.setEnd(node, offset);
        totalOffset += range.getBoundingClientRect().width;
      }
      break;
    } else {
      // 如果是其他节点，累加其偏移
      if (node.nodeType === Node.TEXT_NODE) {
        let range = document.createRange();
        range.selectNode(node);
        totalOffset += range.getBoundingClientRect().width;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        totalOffset += node.offsetWidth;
      }
    }
  }

  return totalOffset;
};
