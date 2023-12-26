import { CosyDropdown, CosyDropdownOption } from "@cosy/ui";
import { onMounted } from "@cosy/util";
import "./index.less";

onMounted(() => {
  const options: CosyDropdownOption[] = [
    {
      value: "all",
      label: window.i18n?.["tip-status-default"] ?? "all",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle></svg>`,
    },
    {
      value: "todo",
      label: window.i18n?.["tip-status-todo"] ?? "todo",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.56 3.69a9 9 0 0 0-2.92 1.95"></path><path d="M3.69 8.56A9 9 0 0 0 3 12"></path><path d="M3.69 15.44a9 9 0 0 0 1.95 2.92"></path><path d="M8.56 20.31A9 9 0 0 0 12 21"></path><path d="M15.44 20.31a9 9 0 0 0 2.92-1.95"></path><path d="M20.31 15.44A9 9 0 0 0 21 12"></path><path d="M20.31 8.56a9 9 0 0 0-1.95-2.92"></path><path d="M15.44 3.69A9 9 0 0 0 12 3"></path></g></svg>',
    },
    {
      value: "doing",
      label: window.i18n?.["tip-status-doing"] ?? "doing",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L18.5 9.5a1.5 1.5 0 0 0-4-4L4 16v4"></path><path d="M13.5 6.5l4 4"></path></g></svg>',
    },
    {
      value: "done",
      label: window.i18n?.["tip-status-done"] ?? "done",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 12l2 2l4-4"></path></g></svg>',
    },
    {
      value: "other",
      label: window.i18n?.["tip-status-other"] ?? "other",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.042 16.045A9 9 0 0 0 7.955 3.958M5.637 5.635a9 9 0 1 0 12.725 12.73"></path><path d="M3 3l18 18"></path></g></svg>',
    },
  ];

  new CosyDropdown("#filter-button", options, {
    onClickItem: (selected: CosyDropdownOption) => {
      const { value } = selected;
      document.querySelectorAll(".category .post-list li").forEach((li) => {
        const liElement = li as HTMLLIElement;
        if (value === "all") return liElement.classList.remove("selected");
        li.getAttribute("data-status")?.includes(value)
          ? liElement.classList.add("selected")
          : liElement.classList.remove("selected");
      });
    },
  });
});
