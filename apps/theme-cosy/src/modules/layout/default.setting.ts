import { setRootVar } from "@cosy/util";
import { APPEARANCE } from "../constant";

export const useDefaultSetting = () => {
  const fontSize = localStorage.getItem(APPEARANCE.FONT_SIZE) ?? "13px";
  setRootVar("--font-size", fontSize);
};
