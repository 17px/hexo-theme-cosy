import { addListener, onMounted } from "@cosy/util";
import "./index.less";
import { CosyDropdown } from "@cosy/ui";
import { fontSizeOptions, themeOptions } from "./appearance";
import { DropdownOption } from "@/util/dropdown";
import { APPEARANCE, APPEARANCE_DEFAULT } from "../constant";

onMounted(() => {
  const [fontSizeSelector, themeSelector] = [
    "#dd-button-font-size",
    "#dd-button-theme",
  ];

  const slotFontSize = document.querySelector(
    `${fontSizeSelector} [slot=content]`
  );
  const slotTheme = document.querySelector(`${themeSelector} [slot=content]`);

  if (slotTheme)
    slotTheme.textContent =
      localStorage.getItem(APPEARANCE.THEME) ?? APPEARANCE_DEFAULT.THEME;

  if (slotFontSize)
    slotFontSize.textContent =
      localStorage.getItem(APPEARANCE.FONT_SIZE) ??
      APPEARANCE_DEFAULT.FONT_SIZE;

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
