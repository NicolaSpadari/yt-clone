import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import VuePlyr from "vue-plyr";
import { LazyLoad } from "@/directives/lazyload";
import { router } from "@/router";
import App from "@/App.vue";
import "@unocss/reset/tailwind.css";
import "vue-plyr/dist/vue-plyr.css";
import "uno.css";

const head = createHead();
const app = createApp(App);

app.use(head);
app.use(router);
app.use(VuePlyr);
app.directive("lazyload", LazyLoad);

router.isReady().then(() => {
    app.mount("#app");
});
