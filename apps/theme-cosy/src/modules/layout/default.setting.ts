import { setRootVar } from "@cosy/util";
import { APPEARANCE, APPEARANCE_DEFAULT } from "../constant";
import Color from "color";

export const useDefaultSetting = () => {
  // 文章字号
  const fontSize =
    localStorage.getItem(APPEARANCE.FONT_SIZE) ?? APPEARANCE_DEFAULT.FONT_SIZE;
  setRootVar("--font-size", fontSize);

  // 主题样式
  const theme =
    localStorage.getItem(APPEARANCE.THEME) ?? APPEARANCE_DEFAULT.THEME;
  document.documentElement.className = "";
  document.documentElement.classList.add(`cosy-theme-${theme}`);

  // 主题颜色
  const { hue, saturation, lightness } = getThemeColor();
  setRootVar("--base-hue", String(hue));
  setRootVar("--base-saturation", `${saturation}%`);
  setRootVar("--base-lightness", `${lightness}%`);
};

export const getCurrentTheme = () =>
  localStorage.getItem(APPEARANCE.THEME) ?? APPEARANCE_DEFAULT.THEME;

export const getThemeColor = () => {
  const color = !window.theme.color
    ? APPEARANCE_DEFAULT.THEME_COLOR
    : window.theme.color;
  const [hue, saturation, lightness] = Color(color).hsl().array();
  const hex = Color(color).hex();
  const hsl = Color(color).hsl().string();
  return { hue, saturation, lightness, hsl, hex };
};
