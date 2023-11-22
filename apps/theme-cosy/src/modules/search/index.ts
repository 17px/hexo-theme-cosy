import "./index.less";
import { SearchMask } from "./SearchMask";

// 初始化搜索
document.addEventListener("DOMContentLoaded", () => {
  if (window.search.enable === "true") {
    const searchMask = new SearchMask({
      appId: window.algolia.appId,
      SearchOnlyAPIKey: window.algolia.SearchOnlyAPIKey,
    });
    document.addEventListener("keydown", (e) => {
      const ctrlOrCmdPressed = e.ctrlKey || e.metaKey;
      if (ctrlOrCmdPressed && e.key === "k") {
        e.preventDefault();
        searchMask.show();
      }
    });
    document
      .querySelector(".search-group")
      ?.addEventListener("click", function () {
        searchMask.show();
      });
  }
});
