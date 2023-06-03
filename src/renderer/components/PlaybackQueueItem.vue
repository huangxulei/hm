<script setup>
import { Track } from '../../common/Track';
import ArtistControl from './ArtistControl.vue'
import { usePlayStore } from '../store/playStore';

const { playTrack, isCurrentTrack } = usePlayStore()
const props = defineProps({
    data: Track,
    active: Boolean
})

const playItem = () => {
    const track = props.data
    if (isCurrentTrack(track)) return
    playTrack(track)
}
</script>

<template>
    <div class="playback-queue-item" :class="{ current: active }" @dblclick="playItem">
        <div class="item-wrap">
            <div class="left">
                <img class="cover" v-lazy="data.cover">
            </div>
            <div class="right">
                <div class="data">
                    <div class="title">{{ data.title }}</div>
                    <div class="bottom">
                        <div class="artist">
                            <ArtistControl :visitable="true" :platform="data.platform" :data="data.artist">
                            </ArtistControl>
                        </div>
                        <span class="duration">{{ data.mmssDuration() }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.playback-queue-item {
    border-left: 2px solid transparent;
    border-bottom: 1px solid #464646;
}

.playback-queue-item .item-wrap {
    margin: 0px;
    padding-left: 10px;
    height: 60px;
    display: flex;
    flex: 1;
    align-items: center;
    border-left: 2px solid transparent;
}

.playback-queue-item:hover {
    background-color: #464646;
}

.current .title,
.current .artist,
.current .duration {
    background: linear-gradient(to top right, #28c83f, #1ca388);
    -webkit-background-clip: text;
    color: transparent !important;
}

.playback-queue-item .cover {
    width: 41px;
    height: 41px;
    margin-right: 8px;
    -webkit-user-drag: none;
}

.playback-queue-item .left {
    height: 100%;
    display: flex;
    align-items: center;
}

.playback-queue-item .right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.playback-queue-item .right .data {
    height: 41px;
    z-index: 1;
}

.playback-queue-item .title,
.playback-queue-item .artist {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}

.playback-queue-item .title {
    margin-top: 2px;
    margin-bottom: 6px;
    width: 258px;
}

.playback-queue-item .bottom {
    position: relative;
}

.playback-queue-item .artist,
.playback-queue-item .duration {
    color: #989898;
    font-size: 14px;
}

.playback-queue-item .artist {
    position: absolute;
    left: 0px;
    width: 210px;
    cursor: pointer;
}

.playback-queue-item .artist span {
    cursor: pointer;
}

.playback-queue-item .artist span:hover {
    background: linear-gradient(to top right, #28c83f, #1ca388);
    -webkit-background-clip: text;
    color: transparent;
}

.playback-queue-item .duration {
    position: absolute;
    right: 20px;
}
</style>
