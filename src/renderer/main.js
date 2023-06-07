import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "./route/router";
import VueLazyLoad from "vue3-lazyload";
//TODO Player 不能删除!!!
import { Player } from "../common/Player";
import ProgressBar from "./components/ProgressBar.vue";
import VolumeBar from "./components/VolumeBar.vue";
import AudioTime from "./components/AudioTime.vue";
import ImageTextTile from "./components/ImageTextTile.vue";
import PlayControl from "./components/PlayControl.vue";
import SongItem from "./components/SongItem.vue";

import PlayingView from "./views/PlayingView.vue";
import PlaybackQueueView from "./views/PlaybackQueueView.vue";
const app = createApp(App);

app.use(createPinia())
    .use(router)
    .use(VueLazyLoad, {
        loading: "default_cover.png",
        error: "default_cover.png",
    })
    .component("ProgressBar", ProgressBar)
    .component("VolumeBar", VolumeBar)
    .component("AudioTime", AudioTime)
    .component("PlayControl", PlayControl)
    .component("ImageTextTile", ImageTextTile)
    .component("SongItem", SongItem)
    //Views
    .component("PlayingView", PlayingView)
    .component("PlaybackQueueView", PlaybackQueueView)
    .mount("#app");
