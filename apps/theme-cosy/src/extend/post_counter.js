hexo.extend.helper.register('post_counter', function (page) {
  let output = '';
  this.site.categories.forEach((category) => {
    if (category.name === page.category) {
      output = `<span class="post-num">${this.__('text-post-count-prev')} ${category.length} ${this.__('text-post-count-next')}</span>`;
    }
  });
  return output;
});
