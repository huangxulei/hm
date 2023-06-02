<script setup>
import { storeToRefs } from "pinia";
import VolumeBar from "./VolumeBar.vue";
import AudioTime from "./AudioTime.vue";
import { useMainViewStore } from "../store/mainViewStore";
import { usePlayStore } from "../store/playStore";
const { currentTrack, mmssCurrentTime } = storeToRefs(usePlayStore());
const { coverMaskShow } = storeToRefs(useMainViewStore());
</script>

<template>
    <div class="play-meta">
        <div class="cover-wrap" @mouseenter="toggleCoverMask" @mouseleave="toggleCoverMask">
            <img class="audio-cover" v-lazy="currentTrack.cover" />
        </div>
        <div class="title-wrap">
            <div class="audio-title">
                {{ currentTrack.title }} - {{ currentTrack.artistName() }}
            </div>
            <div class="time-volume-wrap">
                <AudioTime :current="mmssCurrentTime" :duration="currentTrack.mmssDuration()" />
                <VolumeBar class="volume-bar"></VolumeBar>
            </div>
        </div>
    </div>
</template>

<style>
.play-meta {
    height: 68px;
    display: flex;
}

.play-meta .cover-wrap {
    position: relative;
    width: 68px;
    height: 68px;
    box-shadow: 0px 0px 1px #161616;
}

.play-meta .audio-cover,
.play-meta .cover-mask {
    /*width: 100%;*/
    width: 68px;
    height: 100%;
    cursor: pointer;
    -webkit-user-drag: none;
    -webkit-app-region: no-drag;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
}

.play-meta .title-wrap {
    width: 208px;
    margin-left: 10px;
}

.play-meta .audio-title {
    font-size: 14px;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-top: 15px;
}

.play-meta .time-volume-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 6px;
}

.play-meta .audio-time,
.play-meta .volume-bar {
    flex: 1;
    /*line-height: 25px;*/
}
</style>
