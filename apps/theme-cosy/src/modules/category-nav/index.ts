import { onMounted } from "@cosy/util";
import "./index.less";

onMounted(() => {
  // nav-items下的li 默认active
  const customPage = document.querySelectorAll(".category-nav li[data-path]");
  customPage.forEach((li) => {
    const path = li.getAttribute("data-path") ?? "";
    const isActive = location.pathname.indexOf(path) > -1;
    isActive ? li.classList.add("active") : li.classList.remove("active");
  });
});
