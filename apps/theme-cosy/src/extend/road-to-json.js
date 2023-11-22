hexo.extend.helper.register('road_to_json', (roadObj) => {
  return !roadObj ? 'null' : JSON.stringify(roadObj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
});
