import { resolve } from "path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { DirResolverHelper, dirResolver } from "vite-auto-import-resolvers";
import UnoCSS from "@unocss/vite";
import EnvLoader from "vite-plugin-envloader";

export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src")
        }
    },
    plugins: [
        Vue({
            include: [/\.vue$/]
        }),
        Pages({
            extensions: ["vue"]
        }),
        EnvLoader(),
        UnoCSS(),
        Components({
            deep: false
        }),
        DirResolverHelper(),
        AutoImport({
            imports: [
                "vue",
                "vue-router",
                "@vueuse/core",
                "@vueuse/head"
            ],
            resolvers: [dirResolver()]
        })
    ],
    server: {
        fs: {
            allow: [".."]
        },
        host: true
    }
});
