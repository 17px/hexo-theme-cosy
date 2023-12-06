import { setRootVar } from "@cosy/util";
import { APPEARANCE } from "../constant";

export type Theme = "黑暗模式" | "日间模式";
type ThemeColor = Record<Theme, string>;

const themeBaseColorMapping: ThemeColor = {
  黑暗模式: "#191a23",
  日间模式: "#ffffff",
};

export const useDefaultSetting = () => {
  const fontSize = localStorage.getItem(APPEARANCE.FONT_SIZE) ?? "13px";
  setRootVar("--font-size", fontSize);

  const theme = localStorage.getItem(APPEARANCE.THEME) ?? "黑暗模式";
  console.log(theme)
  setRootVar("--color-base", themeBaseColorMapping[theme as Theme]);
};
