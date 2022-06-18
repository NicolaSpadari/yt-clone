<h1 align="center">YT Clone</h1>

> ### WIP

### Features

- ⚡️ [Vue 3](https://github.com/vuejs/vue-next), [Vite 2](https://github.com/vitejs/vite) - latest, cutting-edge techologies

- 📂 File-based routing

- 📦 Components and composables auto importing

- 📥 APIs and types auto importing

- 🎨 [UnoCSS](https://github.com/unocss/unocss) - The instant on-demand Atomic CSS engine

- 🔥 [\<script setup\> syntax](https://github.com/vuejs/rfcs/pull/227)

- 🦾 Typescript

### UI Frameworks

- [UnoCSS](https://github.com/unocss/unocss) (The instant on-demand atomic CSS engine)
- [SCSS](https://sass-lang.com/)

### Plugins

- [Vue Router](https://github.com/vuejs/vue-router)
- [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) - file system based routing
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) - components auto import
- [unplugin-auto-import](https://github.com/antfu/unplugin-vue-components) - APIs auto import
- [vite-auto-import-resolvers](https://github.com/dishait/vite-auto-import-resolvers) - composables auto import
- [@vueuse/core](https://github.com/antfu/vueuse) - useful composition APIs
- [@vueuse/head](https://github.com/vueuse/head) - manipulate document head reactively
- [vite-plugin-envloader](https://github.com/NicolaSpadari/vite-plugin-envloader) - allow `.env` variables to work in `process.env` object too

### Coding Style

- Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
- [TS ESLint](https://eslint.org/) with [@spada/eslint-config](https://github.com/NicolaSpadari/eslint-config)

### Clone to local

```sh
npx degit NicolaSpadari/yt-clone my-app
cd my-app
```

### Development

Run and visit http://localhost:3000

```sh
npm run dev
```

### Build

To build, run

```sh
npm run build
```

Will create the `dist` folder ready to be uploaded