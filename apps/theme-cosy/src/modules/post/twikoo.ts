import { loadFromCDN } from "@/util";

interface TwikooConfig {
    enable: boolean;
    envId: string;
    cdn: string;
    lang: string
}

export const useTwikoo = (config: TwikooConfig) => {
    const { enable, cdn, envId, lang } = config;
    if (enable) {
        loadFromCDN([
            {
                type: "js",
                url: cdn,
            },
        ]).then((ok) => {
            if (ok) {
                window.twikoo.init({
                    envId,
                    el: '#tcomment',
                    lang
                })
            }
        });
    }
}