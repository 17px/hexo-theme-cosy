import { addListener, onMounted } from "@cosy/util";
import "./index.less";
import { CosyDropdown } from "@cosy/ui";
import { fontSizeOptions, themeOptions } from "./appearance";
import { DropdownOption } from "@/util/dropdown";
import { APPEARANCE } from "../constant";

onMounted(() => {
  const fontSizeSelector = "#dd-button-font-size";
  const themeSelector = "#dd-button-theme";
  const slotFontSize = document.querySelector(
    `${fontSizeSelector} [slot=content]`
  );
  const slotTheme = document.querySelector(`${themeSelector} [slot=content]`);

  if (slotTheme && localStorage.getItem(APPEARANCE.THEME))
    slotTheme.textContent = localStorage.getItem(APPEARANCE.THEME);

  if (slotFontSize && localStorage.getItem(APPEARANCE.FONT_SIZE))
    slotFontSize.textContent = localStorage.getItem(APPEARANCE.FONT_SIZE);

  new CosyDropdown(fontSizeSelector, fontSizeOptions, {
    onClickItem: (item: DropdownOption) => {
      if (slotFontSize) slotFontSize.textContent = String(item.label);
      localStorage.setItem(APPEARANCE.FONT_SIZE, String(item.label));
    },
  });

  new CosyDropdown(themeSelector, themeOptions, {
    onClickItem: (item: DropdownOption) => {
      if (slotTheme) slotTheme.textContent = String(item.label);
      localStorage.setItem(APPEARANCE.THEME, String(item.label));
    },
  });
});
