import { addListener, onMounted, setRootVar } from "@cosy/util";
import "./index.less";
import { CosyDropdown, CosyDropdownOption, CosyElement } from "@cosy/ui";
import {
  fontSizeOptions,
  getLabel,
  themeOptions,
} from "./appearance";
import { APPEARANCE, APPEARANCE_DEFAULT } from "../constant";
import { getThemeColor } from "../layout/default.setting";

onMounted(() => {
  const [fontSizeSelector, themeSelector] = [
    "#dd-button-font-size",
    "#dd-button-theme"
  ];
  const themeColorSpan = document.querySelector(
    "#theme-color"
  ) as HTMLSpanElement;
  const themeColorSpanTooltip = document.querySelector(
    "#theme-color-tip [slot=content]"
  ) as CosyElement;

  const slotFontSize = document.querySelector(
    `${fontSizeSelector} [slot=content]`
  );
  const slotTheme = document.querySelector(`${themeSelector} [slot=content]`);

  if (slotTheme) {
    const value =
      localStorage.getItem(APPEARANCE.THEME) ?? APPEARANCE_DEFAULT.THEME;
    slotTheme.textContent = getLabel(themeOptions, value);
  }

  if (themeColorSpan) {
    const { hsl, hex } = getThemeColor();
    themeColorSpan.style.background = hsl;
    themeColorSpanTooltip.textContent = hex;
  }

  if (slotFontSize) {
    slotFontSize.textContent =
      localStorage.getItem(APPEARANCE.FONT_SIZE) ??
      APPEARANCE_DEFAULT.FONT_SIZE;
  }

  new CosyDropdown(fontSizeSelector, fontSizeOptions, {
    onClickItem: (item: CosyDropdownOption) => {
      if (slotFontSize) slotFontSize.textContent = String(item.label);
      localStorage.setItem(APPEARANCE.FONT_SIZE, String(item.label));
      setRootVar("--font-size", String(item.label));
    },
  });

  new CosyDropdown(themeSelector, themeOptions, {
    onClickItem: (item: CosyDropdownOption) => {
      if (slotTheme) slotTheme.textContent = String(item.label);
      localStorage.setItem(APPEARANCE.THEME, item.value);
      document.documentElement.className = "";
      document.documentElement.classList.add(`cosy-theme-${item.value}`);
    },
  });
});
