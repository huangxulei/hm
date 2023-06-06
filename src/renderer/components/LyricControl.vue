<script setup>
import { reactive, ref } from 'vue';
import EventBus from '../../common/EventBus';
import { Track } from '../../common/Track';
import { toMMssSSS } from '../../common/Times';
import ArtistControl from './ArtistControl.vue';
import AlbumControl from './AlbumControl.vue'
import { usePlayStore } from '../store/playStore';
import { storeToRefs } from 'pinia';

const props = defineProps({
    track: Track
})

const currentIndex = ref(-1)
const { hasLyric } = storeToRefs(usePlayStore())
let destScrollTop = -1
let rafId = null

EventBus.on('track-pos', secs => {
    try {
        renderAndScrollLyric(secs)
    } catch (error) {
        console.log(error)
    }
})

const renderAndScrollLyric = (secs) => {
    const MMssSSSS = toMMssSSS(secs * 1000)
    const lyricWrap = document.querySelector(".lyric-ctl .center")
    const lines = lyricWrap.querySelector('.line')
}

</script>

<template>
    <div class="lyric-ctl">
        <div class="header">
            <div class="audio-title">{{ track.title }}</div>
            <div class="audio-artist spacing">
                <b>歌手</b>
                <span>
                    <ArtistControl :visitable="true" :platform="track.platform" :data="track.artist" class="ar-ctl">
                    </ArtistControl>
                </span>
            </div>
            <div class="audio-album">
                <b>专辑</b>
                <span>
                    <AlbumControl :visitable="true" :platform="track.platform" :data="track.album" class="al-ctl">
                    </AlbumControl>
                </span>
            </div>
        </div>
        <div class="center" ref="lyricWrapRef">
            <div class="no-lyric" v-show="!hasLyric">
                <label>暂无歌词,请继续欣赏音乐吧~</label>
            </div>
            <div v-show="hasLyric" v-for="(item, index) in track.lyricData()" class="line" :time-key="item[0]"
                :class="{ first: index == 0, last: index == (track.lyricData().size - 1), current: index == currentIndex }">
                {{ item[1] }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.lyric-ctl {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.lyric-ctl .spacing {
    margin-top: 10px;
}

.lyric-ctl .header {
    max-height: 202px;
}

.lyric-ctl .header b {
    margin-right: 3px;
    min-width: 43px;
}

.lyric-ctl .audio-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.lyric-ctl .audio-title {
    font-size: 23px;
    font-weight: bold;
    margin-bottom: 6px;
}

.lyric-ctl .audio-artist,
.lyric-ctl .audio-album {
    font-size: 17px;
    font-weight: bold;
    color: #ababab;
    display: flex;
}

.lyric-ctl .center {
    height: 366px;
    overflow: auto;
    margin-top: 15px;
    padding-right: 6px;
    padding-bottom: 15px;
}

.lyric-ctl .audio-artist .ar-ctl,
.lyric-ctl .audio-album .al-ctl {
    -webkit-line-clamp: 2;
}

.lyric-ctl .lyric-content {
    overflow: auto;
}

.lyric-ctl .center::-webkit-scrollbar,
.lyric-ctl .lyric-content::-webkit-scrollbar {
    display: none;
}


.lyric-ctl .center .line {
    font-size: 18px;
    line-height: 28px;
    margin-top: 26px;
    color: #ccc;
}

.lyric-ctl .center .current {
    background: linear-gradient(to top right, #28c83f, #1ca388);
    -webkit-background-clip: text;
    color: transparent;
    font-size: 19px;
    font-weight: bold;
}

.lyric-ctl .center .first {
    margin-top: 125px;
}

.lyric-ctl .center .last {
    margin-bottom: 13px;
}

.lyric-ctl .no-lyric {
    display: flex;
    margin-top: 125px;
    align-items: center;
    font-size: 19px;
    color: #989898
}
</style>
