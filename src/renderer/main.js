import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "./route/router";
import VueLazyLoad from "vue3-lazyload";
//TODO Player 不能删除!!!
import { Player } from "../common/Player";
import ProgressBar from "./components/ProgressBar.vue";

import ImageTextTile from "./components/ImageTextTile.vue";
import SongItem from "./components/SongItem.vue";

import PlaybackQueueView from "./views/PlaybackQueueView.vue";
const app = createApp(App);

app.use(createPinia())
    .use(router)
    .use(VueLazyLoad, {
        loading: "default_cover.png",
        error: "default_cover.png",
    })
    .component("ProgressBar", ProgressBar)
    .component("ImageTextTile", ImageTextTile)
    .component("SongItem", SongItem)
    .component("PlaybackQueueView", PlaybackQueueView)
    .mount("#app");
