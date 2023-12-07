import { setRootVar } from "@cosy/util";
import {
  APPEARANCE,
  APPEARANCE_DEFAULT,
  THEME_ROOT_CLASS,
  ThemeType,
} from "../constant";

export const useDefaultSetting = () => {
  // 文章字号
  const fontSize =
    localStorage.getItem(APPEARANCE.FONT_SIZE) ?? APPEARANCE_DEFAULT.FONT_SIZE;
  setRootVar("--font-size", fontSize);

  // 主题色
  const theme =
    localStorage.getItem(APPEARANCE.THEME) ?? APPEARANCE_DEFAULT.THEME;
  document.documentElement.className = "";
  document.documentElement.classList.add(THEME_ROOT_CLASS[theme as ThemeType]);
};
