/**
 * tocDragBox 状态在 localStorage 存储的key
 */
export const TOC_INVISIBLE_KEY = "cosy-theme:toc-invisible";

/**
 * 记录文章页面当前滚动高度
 */
export const POST_MEMORY_KEY = "cosy-theme:scrolledHeight";

/**
 * 偏好设置
 */
export const APPEARANCE = {
  FONT_SIZE: "cosy-theme:font-size",
  FONT_FAMILY: "cosy-theme:font-family",
  THEME: "cosy-theme:theme",
};

export type ThemeType = "黑暗模式" | "日间模式";

export const THEME_COLOR_MAPPING = {
  黑暗模式: "#191a23",
  日间模式: "#ffffff",
};

export const APPEARANCE_DEFAULT = {
  FONT_SIZE: "13px",
  THEME: "黑暗模式",
};
