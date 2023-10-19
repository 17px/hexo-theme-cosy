import { dark, light } from "./theme.config";

export type ThemeModelType = "light" | "dark";

export const themeKeyInLS = "__theme__";

const themeMap = { light, dark };

export const applyThemeVariables = (themeVariables: Record<string, string>) => {
  for (const [key, value] of Object.entries(themeVariables)) {
    document.documentElement.style.setProperty(key, value);
  }
};

export const getThemeMode = () => {
  const mode = localStorage.getItem(themeKeyInLS) as ThemeModelType;
  return mode ?? "light";
};

export const setThemeMode = (mode: ThemeModelType) =>
  localStorage.setItem(themeKeyInLS, mode);

export const changeTheme = (mode: ThemeModelType) => {
  const themeVariables = themeMap[mode];
  setThemeMode(mode);
  applyThemeVariables(themeVariables);
};

export const useDefaultTheme = () => {
  const themeVariables = themeMap[getThemeMode() ?? "light"];
  applyThemeVariables(themeVariables);
};
