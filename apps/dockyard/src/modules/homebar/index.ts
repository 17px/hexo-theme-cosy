import "./index.less";
import { changeTheme, getThemeMode } from "@/util/theme";

document.addEventListener("DOMContentLoaded", function () {
  const toggleTheme = document.getElementById("toggle-theme");
  if (toggleTheme) {
    toggleTheme.classList.add(getThemeMode() === "light" ? "light" : "dark");
    toggleTheme.addEventListener("click", function () {
      if (getThemeMode() === "light") {
        toggleTheme.classList.remove("light");
        toggleTheme.classList.add("dark");
        changeTheme("dark");
      } else {
        toggleTheme.classList.add("light");
        toggleTheme.classList.remove("dark");
        changeTheme("light");
      }
    });
  }
});
