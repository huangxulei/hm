import { getDoc, getJson } from "../common/HttpClient"
import { Category } from "../common/Category"
import { Track } from "../common/Track"
import { Lyric } from "../common/Lyric"
import { Playlist } from '../common/Playlist'

//URL
const BASE_URL = "https://music.163.com"

const DEFAULT_CATE = new Category("默认")
DEFAULT_CATE.add("全部分类", "")

export class NetEase {
  static CODE = "netease"
  static categories() {
    return new Promise((resolve) => {
      const url = "https://music.163.com/discover/playlist"
      getDoc(url).then((doc) => {
        console.log("网易云doc", doc)
        const result = [DEFAULT_CATE]
        const listEl = doc.querySelectorAll("#cateListBox .f-cb")
        listEl.forEach((el) => {
          const cate = el.querySelector("dt").textContent
          const category = new Category(cate)
          const fcEls = el.querySelectorAll(".s-fc1")
          fcEls.forEach((item) => {
            const text = item.textContent
            category.add(text, text)
          })
          result.push(category)
        })
        resolve(result)
      })
    })
  }

  //歌单(列表)广场
  static square(cate, offset, limit, page) {
    return new Promise((resolve) => {
      const url =
        "https://music.163.com/discover/playlist" + "?cat=" + cate + "&order=hot" + "&limit=" + limit + "&offset=" + offset
      getDoc(url).then((doc) => {
        const result = { offset, limit, page, data: [] }
        const listEl = doc.querySelectorAll("#m-pl-container li")
        listEl.forEach((el) => {
          let id = null,
            cover = null,
            title = null,
            itemUrl = null
          const coverEl = el.querySelector(".u-cover img")
          const titleEl = el.querySelector(".dec a")
          if (coverEl) {
            cover = coverEl.getAttribute("src").replace("140y140", "500y500")
          }
          if (titleEl) {
            title = titleEl.textContent
            itemUrl = BASE_URL + titleEl.getAttribute("href")
            id = itemUrl.split("=")[1]
          }
          if (id && itemUrl) {
            const detail = new Playlist(id, NetEase.CODE, cover, title, itemUrl)
            result.data.push(detail)
          }
        })
        //console.log(result)
        resolve(result)
      })
    })
  }
}
