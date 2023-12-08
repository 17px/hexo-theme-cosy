import { CosyDropdownOption } from "@cosy/ui";

export const fontSizeOptions: CosyDropdownOption[] = [
  {
    value: "13px",
    label: "13px",
  },
  {
    value: "14px",
    label: "14px",
  },
  {
    value: "15px",
    label: "15px",
  },
  {
    value: "16px",
    label: "16px",
  },
];

export const themeOptions: CosyDropdownOption[] = [
  {
    value: "dark",
    label: "黑暗模式",
  },
  {
    value: "light",
    label: "日间模式",
  },
];

export const langOptions: CosyDropdownOption[] = [
  {
    value: "zh-CN",
    label: "简体中文",
  },
  {
    value: "zh-TW",
    label: "繁体中文",
  },
];

export const getLabel = (
  options: CosyDropdownOption[],
  value: CosyDropdownOption["value"]
) => {
  const item = options.find((i) => i.value === value);
  return String(item?.label ?? "oops");
};
