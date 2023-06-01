import { defineStore } from "pinia";
import EventBus from "../../common/EventBus";
const ipcRenderer = electronApi.ipcRenderer;

export const useMainViewStore = defineStore("mainView", {
  state: () => ({
    coverMaskShow: false,
    categoryViewShow: false, //分类显示
    playingViewShow: false,
  }),
  actions: {
    toggleCoverMask() {
      this.coverMaskShow = !this.coverMaskShow;
    },
    toggleCategoryView() {
      this.categoryViewShow = !this.categoryViewShow;
      if (!this.categoryViewShow) {
        EventBus.emit("category-resetScroll");
      }
    },
    hideCategoryView() {
      this.categoryViewShow = false;
      EventBus.emit("category-resetScroll");
    },

    showPlayingView() {
      this.playingViewShow = true;
      ipcRenderer.send("hide-winBtn");
    },
    quit() {
      ipcRenderer.send("app-quit");
    },
    minimize() {
      ipcRenderer.send("app-min");
    },
    maximize() {
      ipcRenderer.send("app-max");
    },
  },
});
