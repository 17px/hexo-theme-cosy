hexo.extend.helper.register('generate_excerpt', function (post, length) {
  length = length || 100;
  const strippedContent = post.content.replace(/<\/?[^>]+(>|$)/g, ""); // 删除 HTML 标签
  return strippedContent.substring(0, length);
});
