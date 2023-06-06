import { defineStore } from "pinia";
import EventBus from "../../common/EventBus";
const ipcRenderer = electronApi.ipcRenderer;

export const useMainViewStore = defineStore("mainView", {
    state: () => ({
        coverMaskShow: false,
        categoryViewShow: false, //分类显示
        playbackQueueViewShow: false, //播放列表显示
        playingViewShow: false,
    }),
    actions: {
        hidePlaybackQueueView() {
            //隐藏列表
            this.playbackQueueViewShow = false;
        },
        togglePlaybackQueueView() {
            this.playbackQueueViewShow = !this.playbackQueueViewShow;
        },
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
        hidePlayingView() {
            this.playingViewShow = false;
            ipcRenderer.send("hide-winBtn");
        },
        showPlayingView() {
            this.playingViewShow = true;
            ipcRenderer.send("hide-winBtn");
        },
        toggleCoverMask() {
            this.coverMaskShow = !this.coverMaskShow;
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
