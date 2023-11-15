import { loadFromCDN } from "@/util";
import { getThemeMode } from "@/util/theme";

interface mermaidConfig {
  enable: boolean;
  cdn: string;
  theme: "default" | "dark" | "forest" | "neutral";
}

export const useMermaid = (config: mermaidConfig) => {
  const { enable, cdn, theme } = config;
  if (enable) {
    const mermaidScript = document.getElementById("src-mermaid");
    mermaidScript && mermaidScript.parentNode?.removeChild(mermaidScript);
    loadFromCDN([
      {
        type: "js",
        url: cdn,
        id: "src-mermaid",
      },
    ]).then((ok) => {
      if (ok) {
        window.mermaid.initialize({
          startOnLoad: true,
          theme: !theme ? "neutral" : theme,
        });
      }
    });
  }
};
