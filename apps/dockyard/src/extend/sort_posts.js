hexo.extend.helper.register('sort_posts_by_top', function (posts) {

  return posts.slice().sort(function (a, b) {
    var topA = a.top !== undefined ? a.top : Number.MAX_SAFE_INTEGER;
    var topB = b.top !== undefined ? b.top : Number.MAX_SAFE_INTEGER;

    // 根据 top 字段从小到大降序排列
    if (topA < topB) return -1;
    if (topA > topB) return 1;

    // 如果 top 字段相同或不存在，则根据日期从新到旧排序
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateB - dateA;
  });
});
