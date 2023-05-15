import { getDoc, getJson } from '../common/HttpClient'
import { Category } from '../common/Category'
import { Track } from '../common/Track'
import { Lyric } from '../common/Lyric'

const REQ_ID = 'e2db8a61-afdb-11ec-9d7b-c9324a8678ec'

const CONFIG = {
    withCredentials: true
}

const escapseHtml = (text) => {
    return text.trim().replace(/&nbsp;/g, ' ')
}

export class KuWo {
    static CODE = 'kuwo'
    //全部分类
    static categories() {
        return new Promise((resolve, reject) => {
            const url = "https://www.kuwo.cn/api/www/playlist/getTagList"
                + "?httpsStatus=1&reqId=" + REQ_ID

            getJson(url, CONFIG).then(json => {
                //console.log(json)
                const defaultCategory = new Category("默认")
                defaultCategory.add("精选歌单", '')

                const result = [defaultCategory]
                const cateArray = json.data
                cateArray.forEach(cate => {
                    const category = new Category(cate.name)
                    const cateItems = cate.data
                    cateItems.forEach(item => {
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
                url = "https://www.kuwo.cn/api/www/classify/playlist/getTagPlayList"
                    + "?pn=" + page + "&rn=" + limit
                    + "&id=" + cate + "&httpsStatus=1&reqId=" + REQ_ID
            } else {
                cate = "hot"
                url = "https://www.kuwo.cn/api/www/classify/playlist/getRcmPlayList"
                    + "?pn=" + page + "&rn=" + limit
                    + "&order=" + cate + "&httpsStatus=1&reqId=" + REQ_ID
            }
            getJson(url, CONFIG).then(json => {
                console.log(json)
                const pagination = json.data
                //const page = pagination.pn
                const total = pagination.total
                const data = pagination.data

                const result = { offset, limit, page, total, data: [] }
                data.forEach(item => {
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
}