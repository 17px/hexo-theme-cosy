hexo.extend.helper.register("generate_nav", function (categories) {
  // 获取主题配置
  const nav_meta = hexo.theme.config["nav_meta"] ?? {};

  let result = "<ul>";
  for (let key in nav_meta) {
    const value = nav_meta[key];
    if (value !== false) {
      result += `<li data-path="${key}">
        <a href="/${key}">
          ${value}
          <div class="ellipsis">${this.__("text-" + key)}</div>
        </a>
      </li>`;
    }
  }
  result += "</ul>";
  return result;
});
