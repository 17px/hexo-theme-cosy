hexo.extend.helper.register("post_icon", function (post, meta) {
  const textMapping = {
    done: "tip-status-done",
    doing: 'tip-status-doing',
    todo: 'tip-status-todo',
    other: 'tip-status-other',
  }
  const svgMapping = {
    done: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 12l2 2l4-4"></path></g></svg>',
    doing: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L18.5 9.5a1.5 1.5 0 0 0-4-4L4 16v4"></path><path d="M13.5 6.5l4 4"></path></g></svg>',
    todo: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.56 3.69a9 9 0 0 0-2.92 1.95"></path><path d="M3.69 8.56A9 9 0 0 0 3 12"></path><path d="M3.69 15.44a9 9 0 0 0 1.95 2.92"></path><path d="M8.56 20.31A9 9 0 0 0 12 21"></path><path d="M15.44 20.31a9 9 0 0 0 2.92-1.95"></path><path d="M20.31 15.44A9 9 0 0 0 21 12"></path><path d="M20.31 8.56a9 9 0 0 0-1.95-2.92"></path><path d="M15.44 3.69A9 9 0 0 0 12 3"></path></g></svg>',
    other: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.042 16.045A9 9 0 0 0 7.955 3.958M5.637 5.635a9 9 0 1 0 12.725 12.73"></path><path d="M3 3l18 18"></path></g></svg>',
  }
  const generateTemplate = (text, svg) => `<cosy-tooltip>
    <span slot="content">${this.__(text)}</span>
    <cosy-icon size="sm">${svg}</cosy-icon>
  </cosy-tooltip>`

  const mapping = {
    status: {
      done: generateTemplate(textMapping.done, svgMapping.done),
      doing: generateTemplate(textMapping.doing, svgMapping.doing),
      todo: generateTemplate(textMapping.todo, svgMapping.todo),
      other: generateTemplate(textMapping.other, svgMapping.other),
    }
  };
  const iconInPost = post[meta];
  const iconGroup = mapping[meta];
  return iconGroup[iconInPost] ?? iconGroup["other"];
});
