import { addKeyPress, addListener, onMounted } from "@cosy/util";
import { SearchMask } from "./SearchMask";

onMounted(() => {
  if (document.querySelector("#post-search")) {
    const searchMask = new SearchMask({
      appId: window.algolia.appId,
      SearchOnlyAPIKey: window.algolia.SearchOnlyAPIKey,
    });
    addListener({
      selector: "#post-search",
      eventType: "click",
      handler: () => searchMask.show(),
    });
    addKeyPress({
      key: "control+k",
      preventDefault: true,
      handler: () => {
        searchMask.show();
      },
    });
  }
});
