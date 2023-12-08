import { CosyElement } from "@cosy/ui";

const onWindowResize = () => {
  const invisible = window.innerWidth < 1200;
  const tocBox = document.querySelector("#toc-drag-box") as CosyElement;
  const tocBoxButton = document.querySelector(
    "#toc-show-button"
  ) as CosyElement;
  tocBox.invisible = invisible;
  tocBoxButton.invisible = !invisible;

};

export const useResponsive = () => {
  window.addEventListener("resize", onWindowResize);
};
