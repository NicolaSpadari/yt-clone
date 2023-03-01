import { resolve } from "path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import UnoCSS from "@unocss/vite";

export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src")
        }
    },
    plugins: [
        Vue({
            include: [/\.vue$/],
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith("i-")
                }
            }
        }),
        Pages({
            extensions: ["vue"]
        }),
        UnoCSS(),
        Components({
            deep: false
        }),
        AutoImport({
            imports: [
                "vue",
                "vue-router",
                "@vueuse/core",
                "@vueuse/head",
                {
                    "@/firebase": ["auth"],
                    "firebase/app": ["initializeApp"],
                    "firebase/auth": ["GoogleAuthProvider", "signInWithPopup", "getAuth"],
                    "date-fns": ["formatDistanceToNow", "intervalToDuration", "parseISO", "format"]
                }
            ],
            dirs: ["./src/composables"]
        })
    ],
    server: {
        fs: {
            allow: [".."]
        },
        host: true,
        port: 3000
    }
});
