import { getDoc, postJson, getJson } from "../common/HttpClient"
import { Category } from "../common/Category"
import { Playlist } from "../common/Playlist"
import { Track } from "../common/Track"
import { Lyric } from "../common/Lyric"
import { toMMssSSS } from "../common/Times"
import { Album } from "../common/Album"

const REQ_ID = "e2db8a61-afdb-11ec-9d7b-c9324a8678ec"

const CONFIG = {
  withCredentials: true,
}

const escapseHtml = (text) => {
  return text.trim().replace(/&nbsp;/g, " ")
}

export class KuWo {
  static CODE = "kuwo"
  //全部分类
  static categories() {
    return new Promise((resolve, reject) => {
      const url =
        "https://www.kuwo.cn/api/www/playlist/getTagList" +
        "?httpsStatus=1&reqId=" +
        REQ_ID

      getJson(url, CONFIG).then((json) => {
        console.log(json)
        const defaultCategory = new Category("默认")
        defaultCategory.add("精选歌单", "")

        const result = [defaultCategory]
        const cateArray = json.data
        cateArray.forEach((cate) => {
          const category = new Category(cate.name)
          const cateItems = cate.data
          cateItems.forEach((item) => {
            category.add(item.name, item.id)
          })
          if (category.data.length > 0) {
            result.push(category)
          }
        })
        resolve(result)
      })
    })
  }

  //歌单(列表)广场
  static square(cate, offset, limit, page) {
    return new Promise((resolve, reject) => {
      let url = null
      //TODO
      if (cate.length > 0) {
        url =
          "https://www.kuwo.cn/api/www/classify/playlist/getTagPlayList" +
          "?pn=" +
          page +
          "&rn=" +
          limit +
          "&id=" +
          cate +
          "&httpsStatus=1&reqId=" +
          REQ_ID
      } else {
        cate = "hot"
        url =
          "https://www.kuwo.cn/api/www/classify/playlist/getRcmPlayList" +
          "?pn=" +
          page +
          "&rn=" +
          limit +
          "&order=" +
          cate +
          "&httpsStatus=1&reqId=" +
          REQ_ID
      }
      getJson(url, CONFIG).then((json) => {
        console.log(json)
        const pagination = json.data
        //const page = pagination.pn
        const total = pagination.total
        const data = pagination.data

        const result = { offset, limit, page, total, data: [] }
        data.forEach((item) => {
          const id = item.id
          const cover = item.img
          const title = item.name

          if (id) {
            const detail = new Playlist(id, KuWo.CODE, cover, title)
            detail.total = item.total
            result.data.push(detail)
          }
        })
        resolve(result)
      })
    })
  }

  //歌单详情
  static playlistDetail(id, offset, limit, page) {
    return new Promise((resolve, reject) => {
      const url =
        "https://www.kuwo.cn/api/www/playlist/playListInfo" +
        "?pid=" +
        id +
        "&pn=" +
        page +
        "&rn=" +
        limit +
        "&httpsStatus=1&reqId=" +
        REQ_ID
      getJson(url, CONFIG).then((json) => {
        console.log(json)
        const result = new Playlist(
          id,
          KuWo.CODE,
          json.data.img500,
          json.data.name
        )
        result.about = json.data.info
        result.total = json.data.total
        const playlist = json.data.musicList
        playlist.forEach((item) => {
          const artist = [{ id: item.artistid, name: item.artist }]
          const album = { id: item.albumid, name: item.album }
          const duration = item.duration * 1000
          const cover = item.pic
          const track = new Track(
            item.rid,
            KuWo.CODE,
            item.name,
            artist,
            album,
            duration,
            cover
          )
          result.addTrack(track)
        })
        resolve(result)
      })
    })
  }

  //歌曲播放详情：url、cover、lyric等
  static playDetail(id) {
    return new Promise((resolve, reject) => {
      const url =
        "https://www.kuwo.cn/api/v1/www/music/playUrl" +
        "?mid=" +
        id +
        "&type=music" +
        "&httpsStatus=1&reqId=" +
        REQ_ID
      getJson(url, CONFIG).then((json) => {
        console.log(json)
        const result = new Track(id, KuWo.CODE)
        if (json.data) {
          result.url = json.data.url
        }
        resolve(result)
      })
    })
  }

  //歌词
  static lyric(id) {
    return new Promise((resolve, reject) => {
      const url =
        "http://m.kuwo.cn/newh5/singles/songinfoandlrc" +
        "?musicId=" +
        id +
        "&httpsStatus=1&reqId=" +
        REQ_ID
      getJson(url, CONFIG).then((json) => {
        console.log(json)
        const result = new Lyric()
        const lrclist = json.data.lrclist
        if (lrclist) {
          lrclist.forEach((lineObj) => {
            const mmssSSS = toMMssSSS(lineObj.time * 1000)
            const text = lineObj.lineLyric
            result.addLine(mmssSSS, text)
          })
        }
        resolve(result)
      })
    })
  }

  //歌手详情：Name、Cover、简介(如果有)等
  static artistDetail(id) {
    return new Promise((resolve, reject) => {
      let url = "http://www.kuwo.cn/singer_detail/" + id
      getDoc(url).then((doc) => {
        let name = "",
          cover = "",
          about = ""

        let scriptText = doc.querySelector("script").textContent
        let key = "window.__NUXT__="
        if (scriptText.indexOf(key) != -1) {
          scriptText = scriptText.split(key)[1]
          const json = eval(scriptText)
          //console.log(json)

          const singerInfo = json.data[0].singerInfo
          name = escapseHtml(singerInfo.name)
          cover = singerInfo.pic300
          about = singerInfo.info
        }
        const result = { id, name, cover, about }
        resolve(result)
      })
    })
  }

  //歌手详情: 全部歌曲
  static artistDetailAllSongs(id, offset, limit, page) {
    return new Promise((resolve, reject) => {
      const url =
        "http://www.kuwo.cn/api/www/artist/artistMusic" +
        "?artistid=" +
        id +
        "&pn=" +
        page +
        "&rn=" +
        limit +
        "&httpsStatus=1&reqId=" +
        REQ_ID
      getJson(url, CONFIG).then((json) => {
        const total = json.data.total
        const data = []
        const list = json.data.list
        list.forEach((item) => {
          const artist = [{ id: item.artistid, name: item.artist }]
          const album = { id: item.albumid, name: item.album }
          const duration = item.duration * 1000
          const cover = item.pic
          const track = new Track(
            item.rid,
            KuWo.CODE,
            item.name,
            artist,
            album,
            duration,
            cover
          )
          data.push(track)
        })
        const result = { offset, limit, page, total, data }
        resolve(result)
      })
    })
  }

  //歌手详情: 专辑
  static artistDetailAlbums(id, offset, limit, page) {
    return new Promise((resolve, reject) => {
      const url =
        "http://www.kuwo.cn/api/www/artist/artistAlbum" +
        "?artistid=" +
        id +
        "&pn=" +
        page +
        "&rn=" +
        limit +
        "&httpsStatus=1&reqId=" +
        REQ_ID
      getJson(url, CONFIG).then((json) => {
        const total = json.data.total
        const data = []
        const list = json.data.albumList
        list.forEach((item) => {
          const artist = [{ id: item.artistid, name: item.artist }]
          const album = new Album(
            item.albumid,
            KuWo.CODE,
            item.album,
            item.pic,
            artist,
            null,
            item.releaseDate,
            item.albuminfo
          )
          data.push(album)
        })
        const result = { offset, limit, page, total, data }
        resolve(result)
      })
    })
  }

  //专辑详情
  static albumDetail(id) {
    return new Promise((resolve, reject) => {
      const url = "http://www.kuwo.cn/album_detail/" + id
      getDoc(url).then((doc) => {
        let name = "",
          cover = "",
          artist = [],
          company = "",
          publishTime = "",
          about = "",
          data = []

        let scriptText = doc.querySelector("script").textContent
        let key = "window.__NUXT__="
        if (scriptText.indexOf(key) != -1) {
          scriptText = scriptText.split(key)[1]
          const json = eval(scriptText)
          console.log(json)

          const pageData = json.data[0].pageData
          const albumInfo = json.data[0].albumInfo

          name = albumInfo.album
          cover = albumInfo.pic
          artist.push({ id: albumInfo.artistid, name: albumInfo.artist })
          publishTime = albumInfo.releaseDate
          about = albumInfo.albuminfo

          albumInfo.musicList.forEach((item) => {
            const trackArtist = [{ id: item.artistid, name: item.artist }]
            const trackAlbum = { id: item.albumid, name: item.album }
            const duration = item.duration * 1000
            const track = new Track(
              item.rid,
              KuWo.CODE,
              item.name,
              trackArtist,
              trackAlbum,
              duration,
              item.pic
            )
            data.push(track)
          })
        }
        const result = new Album(
          id,
          KuWo.CODE,
          name,
          cover,
          artist,
          company,
          publishTime,
          about,
          data
        )
        resolve(result)
      })
    })
  }

  //搜索: 歌曲
  static searchSongs(keyword, offset, limit, page) {
    return new Promise((resolve, reject) => {
      const url =
        "https://www.kuwo.cn/api/www/search/searchMusicBykeyWord" +
        "?key=" +
        keyword +
        "&pn=" +
        page +
        "&rn=" +
        limit +
        "&httpsStatus=1&reqId=" +
        REQ_ID
      getJson(url, CONFIG).then((json) => {
        console.log(json)
        const data = json.data.list.map((item) => {
          const artist = [{ id: item.artistid, name: item.artist }]
          const album = { id: item.albumid, name: item.album }
          const duration = item.duration * 1000
          const track = new Track(
            item.rid,
            KuWo.CODE,
            item.name,
            artist,
            album,
            duration,
            item.pic
          )
          return track
        })
        const result = { offset, limit, page, data }
        resolve(result)
      })
    })
  }

  //搜索: 歌单
  static searchPlaylists(keyword, offset, limit, page) {
    return new Promise((resolve, reject) => {
      const url =
        "https://www.kuwo.cn/api/www/search/searchPlayListBykeyWord" +
        "?key=" +
        keyword +
        "&pn=" +
        page +
        "&rn=" +
        limit +
        "&httpsStatus=1&reqId=" +
        REQ_ID
      getJson(url, CONFIG).then((json) => {
        console.log(json)
        const data = json.data.list.map((item) => {
          const playlist = new Playlist(
            item.id,
            KuWo.CODE,
            item.img,
            escapseHtml(item.name)
          )
          return playlist
        })
        const result = { offset, limit, page, data }
        resolve(result)
      })
    })
  }

  //搜索: 专辑
  static searchAlbums(keyword, offset, limit, page) {
    return new Promise((resolve, reject) => {
      const url =
        "https://www.kuwo.cn/api/www/search/searchAlbumBykeyWord" +
        "?key=" +
        keyword +
        "&pn=" +
        page +
        "&rn=" +
        limit +
        "&httpsStatus=1&reqId=" +
        REQ_ID
      getJson(url, CONFIG).then((json) => {
        console.log(json)
        const data = json.data.albumList.map((item) => {
          const artist = [{ id: item.artistid, name: item.artist }]
          const albumName = escapseHtml(item.album)
          const album = new Album(
            item.albumid,
            KuWo.CODE,
            albumName,
            item.pic,
            artist
          )
          album.publishTime = item.releaseDate
          return album
        })
        const result = { offset, limit, page, data }
        resolve(result)
      })
    })
  }

  //搜索: 歌手
  static searchArtists(keyword, offset, limit, page) {
    return new Promise((resolve, reject) => {
      const url =
        "https://www.kuwo.cn/api/www/search/searchArtistBykeyWord" +
        "?key=" +
        keyword +
        "&pn=" +
        page +
        "&rn=" +
        limit +
        "&httpsStatus=1&reqId=" +
        REQ_ID
      getJson(url, CONFIG).then((json) => {
        console.log(json)
        const data = json.data.artistList.map((item) => {
          return {
            id: item.id,
            platform: KuWo.CODE,
            title: escapseHtml(item.name),
            cover: item.pic300,
          }
        })
        const result = { offset, limit, page, data }
        resolve(result)
      })
    })
  }
}
