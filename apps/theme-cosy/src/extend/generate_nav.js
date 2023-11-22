hexo.extend.helper.register('generate_nav', function (categories) {
  // 获取主题配置
  const nav_meta = hexo.theme.config['nav_meta'] ?? {}

  const specialMap = {
    'timeline': "archives",
  }

  let result = '<ul>';
  for (let key in nav_meta) {
    const value = nav_meta[key]
    // 设定为 false 不显示，否则为svg icon 的 path
    if (value !== false) {
      result += `<li data-path="${key}">
        <a href="/${specialMap[key] ?? key}">
          ${value}
          <div class="ellipsis">${this.__('text-' + key)}</div>
        </a>
      </li>`
    }
  }
  result += '</ul>';
  return result;
});
