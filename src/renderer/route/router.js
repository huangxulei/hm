import { createRouter, createWebHashHistory } from "vue-router"
import SquareView from "../views/SquareView.vue"
import LocalMusicView from "../views/LocalMusicView.vue"

const routes = [
  {
    //默认，歌单广场
    path: "/",
    redirect: "/square/netease",
  },
  {
    //歌单广场
    path: "/square/:platform",
    component: SquareView,
  },
  {
    path: "/local",
    component: LocalMusicView,
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
