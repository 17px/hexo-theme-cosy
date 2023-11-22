import { loadFromCDN, renderMathInElement } from "@/util";

interface katexConfig {
  enable: boolean;
  jsCdn: string;
  cssCdn: string;
}

export const useKatex = (config: katexConfig) => {
  const { enable, jsCdn, cssCdn } = config;
  if (enable) {
    loadFromCDN([
      {
        type: "css",
        url: cssCdn,
      },
      {
        type: "js",
        url: jsCdn,
      },
    ]).then((ok) => {
      if (ok) renderMathInElement(".article-container");
    });
  }
};
