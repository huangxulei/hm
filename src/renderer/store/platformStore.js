import { defineStore } from "pinia"
import { NetEase } from "../../vendor/netease"
import { KuWo } from "../../vendor/kuwo"
import { LocalMusic } from "../../vendor/localmusic"

const platforms = [
  {
    code: "all",
    name: "全部平台",
    online: null,
  },
  {
    code: NetEase.CODE,
    name: "网易云音乐",
    online: true,
  },
  {
    code: KuWo.CODE,
    name: "酷我音乐",
    online: true,
  },
  {
    code: LocalMusic.CODE,
    name: "本地歌曲",
    online: false,
  },
]

const navPlatforms = platforms.slice(1)
const onlinePlatformFilter = platforms.slice(0, platforms.length - 2)

//Api
const venders = {
  netease: NetEase,
  kuwo: KuWo,
  local: LocalMusic,
}

export const usePlatformStore = defineStore("platform", {
  state: () => ({
    currentPlatformIndex: 0,
    venders,
  }),

  getters: {
    platforms() {
      return navPlatforms
    },
    currentPlatform(state) {
      return state.platforms[state.currentPlatformIndex]
    },
    currentPlatformCode(state) {
      return state.currentPlatform ? state.currentPlatform.code : ""
    },
    onlinePlatformsFilter() {
      return onlinePlatformFilter
    },
    isLocal(state) {
      return state.currentPlatformIndex == platforms.length - 2
    },
  },
  actions: {
    updateCurrentPlatform(index) {
      this.currentPlatformIndex = index
    },
    updateCurrentPlatformByCode(code) {
      if (!code || code.trim().length < 1) {
        this.updateCurrentPlatform(-1)
      }
      for (var i = 0; i < this.platforms.length; i++) {
        if (code === this.platforms[i].code) {
          this.updateCurrentPlatform(i)
          break
        }
      }
    },
    getVender(name) {
      name = name.toLowerCase().trim()
      return this.venders[name]
    },
    currentVender() {
      return this.getVender(this.currentPlatformCode)
    },
    isNetEase(platform) {
      return this.isPlatformValid(platform) && platform.trim() == NetEase.CODE
    },
    isKuWo(platform) {
      return this.isPlatformValid(platform) && platform.trim() == KuWo.CODE
    },
    isPlatformValid(platform) {
      return platform && platform.trim().length > 0
    },
  },
})
