import { eventBus, loadFromCDN } from "@/util";
import { getThemeMode } from "@/util/theme";

interface mermaidConfig {
  enable: boolean;
  cdn: string;
}

export const useMermaid = (config: mermaidConfig) => {
  const { enable, cdn } = config;
  if (enable) {
    loadFromCDN([
      {
        type: "js",
        url: cdn,
      },
    ]).then((ok) => {
      if (ok) {
        window.mermaid.initialize({
          theme: getThemeMode() === "dark" ? "dark" : "default",
        });
        eventBus.on("theme:change", () => location.reload());
      }
    });
  }
};
