hexo.extend.helper.register('generate_category', function (categories) {
  // 获取主题配置
  const category_meta = hexo.theme.config['category_meta'] ?? {}

  let result = '<ul>';
  categories.sort('name').each(category => {
    const categoryMeta = category_meta[category.name] ?? ''
    // 默认选中
    const isActive = (this.page.category && this.page.category === category.name) ||
      (this.page.categories && this.page.categories.some(cat => cat.name === category.name));

    // 设定为 false 才不显示分类
    if (categoryMeta !== false) {
      result += `<li class="${isActive ? 'active' : ''}">
        <a href="${this.url_for(category.path)}">
          ${categoryMeta}
          <div class="ellipsis">
            <span>${category.name}</span>
          </div>
        </a>
      </li>`;
    }
  });

  result += '</ul>';
  return result;
});
