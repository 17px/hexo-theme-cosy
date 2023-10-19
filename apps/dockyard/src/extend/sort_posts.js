hexo.extend.helper.register('sort_posts_by_top', function (posts) {
  // 使用 slice() 创建数组的副本，以避免修改原始数组
  return posts.slice().sort(function (a, b) {
    var topA = a.top || Number.MAX_SAFE_INTEGER;  // 如果没有 top 字段，则设置为一个非常大的数
    var topB = b.top || Number.MAX_SAFE_INTEGER;  // 同上

    // 根据 top 字段从小到大排序
    if (topA < topB) return -1;
    if (topA > topB) return 1;

    // 如果 top 字段相同或者不存在，根据日期从新到旧排序
    return b.date - a.date;
  });
});
