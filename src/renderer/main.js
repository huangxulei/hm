import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './route/router';
import VueLazyLoad from 'vue3-lazyload'

import ImageTextTile from './components/ImageTextTile.vue';
import SongItem from './components/SongItem.vue';

const app = createApp(App)

app.use(createPinia())
    .use(router)
    .use(VueLazyLoad, {
        loading: 'default_cover.png',
        error: 'default_cover.png'
    })
    .component('ImageTextTile', ImageTextTile)
    .component('SongItem', SongItem)
    .mount('#app')
