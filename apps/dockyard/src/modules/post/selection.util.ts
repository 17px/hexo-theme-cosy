export type EffectiveElements = HTMLHeadingElement | HTMLParagraphElement;
export const effectiveHtmlTags = ["H1", "H2", "H3", "P"];
export const items = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M17 15l1.55 1.55c-.96 1.69-3.33 3.04-5.55 3.37V11h3V9h-3V7.82C14.16 7.4 15 6.3 15 5c0-1.65-1.35-3-3-3S9 3.35 9 5c0 1.3.84 2.4 2 2.82V9H8v2h3v8.92c-2.22-.33-4.59-1.68-5.55-3.37L7 15l-4-3v3c0 3.88 4.92 7 9 7s9-3.12 9-7v-3l-4 3zM12 4c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1z" fill="currentColor"></path></svg>`,
    value: "锚点",
  },
  // {
  //   icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M11.07 12.85c.77-1.39 2.25-2.21 3.11-3.44c.91-1.29.4-3.7-2.18-3.7c-1.69 0-2.52 1.28-2.87 2.34L6.54 6.96C7.25 4.83 9.18 3 11.99 3c2.35 0 3.96 1.07 4.78 2.41c.7 1.15 1.11 3.3.03 4.9c-1.2 1.77-2.35 2.31-2.97 3.45c-.25.46-.35.76-.35 2.24h-2.89c-.01-.78-.13-2.05.48-3.15zM14 20c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2z" fill="currentColor"></path></svg>`,
  //   value: "疑问",
  // },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12zM7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" fill="currentColor"></path></svg>`,
    value: "写点想法",
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
