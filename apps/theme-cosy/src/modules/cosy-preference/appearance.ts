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
    label: "Dark",
  },
  {
    value: "light",
    label: "Light",
  },
];

export const getLabel = (
  options: CosyDropdownOption[],
  value: CosyDropdownOption["value"]
) => {
  const item = options.find((i) => i.value === value);
  return String(item?.label ?? "oops");
};
