import "./index.less";

document.addEventListener("DOMContentLoaded", () => {
  // nav-items下的li 默认active
  const liElement = document.querySelectorAll(".nav-items li");
  liElement.forEach((li) => {
    const path = li.getAttribute("data-path") ?? "";
    const isActive = location.pathname.indexOf(path) > -1;
    isActive ? li.classList.add("active") : li.classList.remove("active");
  });
});
