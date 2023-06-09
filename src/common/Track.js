import { Lyric } from './Lyric'
import { toMmss } from './Times'

const DEFAULT_COVER = 'default_cover.png'

export class Track {
    /**
     * 
     * @param {*} id 
     * @param {*} platform  平台 QQ等
     * @param {*} title 歌名
     * @param {*} artist 歌手名
     * @param {*} album  专辑
     * @param {*} duration 时长
     * @param {*} cover 封面
     */
    constructor(id, platform, title, artist, album, duration, cover) {
        this.id = id
        this.platform = platform
        this.title = title
        //[ {id, name} ]
        this.artist = artist
        //{id, name}
        this.album = album
        //millis
        this.duration = duration
        this.cover = cover ? cover : DEFAULT_COVER
        this.url = ''
        this.lyric = new Lyric()
    }

    mmssDuration () {
        return toMmss(this.duration)
    }

    //所有歌手名字 多名歌手 中间加、
    artistName () {
        let artistName = ''
        if (this.artist) {
            const names = []
            //副本names 
            this.artist.forEach(e => names.push(e.name))
            artistName = names.join("、")
            artistName = artistName.slice(0, artistName.length)
        }
        return artistName
    }

    hasUrl () {
        return this.url && this.url.trim().length > 0
    }

    hasCover () {
        if (!this.cover) return false
        this.cover = this.cover.trim()
        if (this.cover.length < 1) return false
        return this.cover != DEFAULT_COVER
    }

    hasLyric () {
        return this.lyric && this.lyric.hasData()
    }

    lyricData () {
        return this.lyric.data
    }

}