import { createRouter, createWebHashHistory } from "vue-router"
import SquareView from "../views/SquareView.vue"
import LocalMusicView from "../views/LocalMusicView.vue"
import PlaylistDetailView from "../views/PlaylistDetailView.vue"

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
  {
    path: "/playlist/:platform/:id",
    props: true,
    component: PlaylistDetailView,
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
