import { setRootVar } from "@cosy/util";
import {
  APPEARANCE,
  APPEARANCE_DEFAULT,
  THEME_COLOR_MAPPING,
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
  setRootVar("--color-base", THEME_COLOR_MAPPING[theme as ThemeType]);
};
