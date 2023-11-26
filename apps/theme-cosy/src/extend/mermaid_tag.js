hexo.extend.tag.register(
  "mermaid",
  function (args, content) {
    return `<div class="mermaid">
            ${content}
          </div>`;
  },
  { ends: true }
);
