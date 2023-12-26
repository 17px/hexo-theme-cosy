hexo.extend.helper.register("blog_language", function () {
  const mapping = {
    'zh-CN': '简体中文',
    'en': 'English'
  }
  return mapping[this.config['language'] ?? 'zh-CN']
})