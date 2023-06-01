import { defineStore } from "pinia";

const TAB_LIST = [
  {
    code: "all-songs",
    name: "歌曲",
    text: "共0首歌曲",
  },
  {
    code: "about",
    name: "专辑详情",
    text: "",
  },
];

export const useAlbumDetailStore = defineStore("albumDetail", {
  state: () => ({
    albumId: 0,
    platform: "",
    albumName: "山川湖海，日月星辰",
    albumCover: "default_cover.png",
    artistName: "趁青春",
    company: "",
    publishTime: "",
    allSongs: [],
    about: "",
    activeTab: -1,
    tabTipText: "",
    tabs: TAB_LIST,
  }),
  getters: {
    activeTabCode(state) {
      if (state.activeTab < 0) return "";
      return state.tabs[state.activeTab].code;
    },
  },
  actions: {
    setActiveTab(index) {
      //TODO 边界检查
      this.activeTab = index;
    },
    resetAllSongs() {
      this.allSongs.length = 0;
    },
    resetAbout() {
      this.about = "";
    },
  },
});
