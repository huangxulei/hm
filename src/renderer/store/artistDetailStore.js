import { defineStore } from "pinia";
import { usePlatformStore } from "./platformStore";

const TAB_LIST = [
  {
    code: "hot-songs",
    name: "热门歌曲",
    text: "共0首歌曲",
  },
  {
    code: "all-songs",
    name: "歌曲",
    text: "共0首歌曲",
  },
  {
    code: "albums",
    name: "专辑",
    text: "共0张专辑",
  },
  {
    code: "about",
    name: "歌手详情",
    text: "",
  },
];

export const useArtistDetailStore = defineStore("artistDetail", {
  state: () => ({
    artistId: 0,
    platform: "",
    artistName: "趁青春",
    artistAlias: "",
    artistCover: "default_cover.png",
    hotSongs: [], //热门歌曲
    allSongs: [], //所有歌曲
    albums: [], //专辑
    about: "",
    activeTab: -1,
    tabTipText: "",
    tabs: TAB_LIST,
  }),
  getters: {
    activeTabCode() {
      if (this.activeTab < 0) return "";
      return this.tabs[this.activeTab].code;
    },
  },
  actions: {
    setActiveTab(index) {
      this.activeTab = index;
    },
    resetHotSongs() {
      this.hotSongs.length = 0;
    },
    resetAllSongs() {
      this.allSongs.length = 0;
    },
    resetAlbums() {
      this.albums.length = 0;
    },
    resetAbout() {
      this.about = "";
    },
    resetAll() {
      this.updateArtist("趁青春", "default_cover.png", "");
      this.resetHotSongs();
      this.resetAllSongs();
      this.resetAlbums();
      this.resetAbout();
      this.setActiveTab(-1);
      this.updateTabTipText(0);
    },
    updateArtist(name, cover, alias) {
      this.artistName = name;
      this.artistCover = cover;
      this.artistAlias = alias ? alias : "";
    },
    updateTabTipText(length) {
      if (this.activeTab < 0) {
        this.tabTipText = "";
      } else {
        this.tabTipText = this.tabs[this.activeTab].text.replace("0", length);
      }
    },
    isHotSongsTab() {
      return this.activeTabCode == "hot-songs";
    },
    isAllSongsTab() {
      return this.activeTabCode == "all-songs";
    },
    isAlbumsTab() {
      return this.activeTabCode == "albums";
    },
    isAboutTab() {
      return this.activeTabCode == "about";
    },
  },
});
