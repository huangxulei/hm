import { createRouter, createWebHashHistory } from "vue-router";
import SquareView from "../views/SquareView.vue";

const routes = [
  {
    //默认，歌单广场
    path: "/",
    component: SquareView,
  },
  {
    //歌单广场
    path: "/square/:platform",
    component: SquareView,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
