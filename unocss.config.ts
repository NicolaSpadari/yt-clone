import {
    defineConfig,
    presetTagify,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup
} from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";

export default defineConfig({
    shortcuts: {
        "max-h-custom-screen": "max-h-[calc(100vh-100px)] overflow-y-scroll"
    },
    safelist: [
        "i-heroicons-solid-home",
        "i-heroicons-solid-fire",
        "i-heroicons-solid-chart-bar"
    ],
    presets: [
        presetUno(),
        presetTagify(),
        presetAttributify(),
        presetIcons({
            extraProperties: {
                "display": "inline-block",
                "vertical-align": "middle"
            }
        }),
        presetScrollbar(),
        presetTypography(),
        presetWebFonts({
            fonts: {
                sans: {
                    name: "DM Sans",
                    weights: ["400", "700"]
                }
            }
        })
    ],
    theme: {
        breakpoints: {
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
            xxl: "1400px",
            uw: "2000px"
        }
    },
    transformers: [
        transformerDirectives(),
        transformerVariantGroup()
    ]
});
