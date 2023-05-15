import { defineStore } from "pinia";
import EventBus from "../../common/EventBus";
const ipcRenderer = electronApi.ipcRenderer

export const useMainViewStore = defineStore('mainView', {
    state: () => ({
        coverMaskShow: false,
        categoryViewShow: false,

    }),
    actions: {

        toggleCoverMask() {
            this.coverMaskShow = !this.coverMaskShow
        },
        quit() {
            ipcRenderer.send('app-quit')
        },
        minimize() {
            ipcRenderer.send('app-min')
        },
        maximize() {
            ipcRenderer.send('app-max')
        }
    }
})