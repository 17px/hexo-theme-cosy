// 全局引入
import "@cosy/ui";
import "@cosy/ui/dist/index.css";
import { addListener, onMounted } from "@cosy/util";
import "./index.less";
import { useDefaultTheme } from "@/util/theme";
import { CosyElement } from "@cosy/ui";

onMounted(() => {
  useDefaultTheme();

  addListener({
    selector: "#button-preference",
    eventType: "click",
    handler: () => {
      location.href = "/cosy-preference";
    },
  });

  addListener({
    selector: "#button-about-cosy-theme",
    eventType: "click",
    handler: () => {
      const popup = document.createElement("cosy-popup") as CosyElement;
      const slotContent = `<div style="max-width: 520px">
        <h3 style="margin:0;font-size:15px;font-weight:400;color:var(--color-font)">🌟 欢迎来到 [ Cosy /ˈkəʊzi/ ] 的世界！</h3>
        <cosy-divider></cosy-divider>
        <div style="padding:0;margin:0;font-size:13px;color:var(--color-font-2);text-align: justify">
          <p style="margin:0;line-height:1.5">非常高兴被你发现 Hexo 主题 —— [Cosy]，一款专为创意和效率打造的主题，旨在为您的博客带来全新的视觉体验和无与伦比的用户友好性，每一个细节都被精心设计，旨在提升您的阅读和写作体验。无论您是摄影爱好者、技术博主还是日常写作者，[Cosy] 都能满足您的需求，同时为您的读者提供清晰、舒适的阅读环境</p>
          <p style="line-height:1.5">诚邀您加入 [Cosy] 的社区！如果您对主题有任何建议、反馈或想要分享您的使用体验，请不要犹豫，来 GitHub 仓库提 Issue 吧！也欢迎加入 Contributor，让我们一起把 [Cosy] 打造得更加完美。</p>
          <p style="margin-bottom:0">
            <cosy-tooltip placement="right">
              <span slot="content">Github 仓库</span>
              <cosy-icon blank href="https://github.com/17px/hexo-theme-cosy">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2z" fill-rule="evenodd" fill="currentColor"></path></svg>
              </cosy-icon>
            </cosy-tooltip>
            <cosy-tooltip placement="right">
              <span slot="content">Github Issue</span>
              <cosy-icon blank href="https://github.com/17px/hexo-theme-cosy/issues">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="12" r="9"></circle></g></svg>
              </cosy-icon>
            </cosy-tooltip>
          </p>
        </article> 
      </div>`;
      popup.innerHTML = slotContent;
      document.body.append(popup);
    },
  });
});
