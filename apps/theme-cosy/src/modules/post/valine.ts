import { loadFromCDN } from "@/util";

const appendCommentDiv = (
  divId: string = "vcomments",
  containerSelector: string = ".article-container"
): void => {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container ${containerSelector} not found!`);
    return;
  }

  const commentDiv = document.createElement("div");
  commentDiv.id = divId;
  container.appendChild(commentDiv);
};

interface ValineConfig {
  enable: boolean;
  appId: string;
  appKey: string;
  avatar: string;
  cdn: string;
  serverURLs: string;
}

export const useValine = (config: ValineConfig) => {
  const { enable, cdn, ...rest } = config;
  if (enable) {
    loadFromCDN([
      {
        type: "js",
        url: cdn,
      },
    ]).then((ok) => {
      if (ok) {
        appendCommentDiv();
        new window.Valine({
          el: "#vcomments",
          ...rest,
        });
      }
    });
  }
};
