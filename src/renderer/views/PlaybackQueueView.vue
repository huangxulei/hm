<script setup>
import { storeToRefs } from "pinia";
import PlaybackQueueItem from "../components/PlaybackQueueItem.vue";
import { usePlayStore } from "../store/playStore";
import { usePlatformStore } from "../store/platformStore";
import EventBus from "../../common/EventBus";

const { queueTracks, playingIndex, queueTracksSize } = storeToRefs(usePlayStore());
const { playTrack, playNextTrack } = usePlayStore();
const { getVender } = usePlatformStore();

const initAndPlayTrack = (track) => {
    if (!track) return;
    const platform = track.platform;
    const vender = getVender(platform);
    if (!vender) return;
    vender.playDetail(track.id, track).then((result) => {
        console.log(result);
        if (!track.hasUrl()) track.url = result.url;
        if (!track.hasUrl()) {
            if (queueTracksSize > 1) playNextTrack();
            return;
        }
        playTrack(track);
    });
};

EventBus.on("track-changed", (track) => initAndPlayTrack(track));
</script>

<template>
    <div class="playback-queue">
        <div class="header">
            <div class="title">当前播放</div>
            <div class="detail">
                <div class="size-text">共{{ queueTracks.length }}首歌曲</div>
                <div class="action">
                    <div class="target-btn text-btn">
                        <svg width="16" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g id="aim">
                                <path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                <path
                                    d="M23,11H22A10,10,0,0,0,13,2.05V1a1,1,0,0,0-2,0v1a10,10,0,0,0-8.95,9H1a1,1,0,0,0,0,2h1a10,10,0,0,0,9,9V23a1,1,0,0,0,2,0V22A10,10,0,0,0,22,13H23A1,1,0,0,0,23,11ZM13,19.93V19a1,1,0,0,0-2,0v.93A8,8,0,0,1,4.07,13H5a1,1,0,0,0,0-2H4.07A8,8,0,0,1,11,4.07V5a1,1,0,0,0,2,0V4.07A8,8,0,0,1,19.93,11H19a1,1,0,0,0,0,2h.93A8,8,0,0,1,13,19.93Z" />
                            </g>
                        </svg>
                        <span>定位</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="center">
            <div v-for="(item, index) in queueTracks">
                <PlaybackQueueItem :data="item" :active="playingIndex == index"></PlaybackQueueItem>
            </div>
        </div>
    </div>
</template>

<style>
.playback-queue {
    display: flex;
    flex-direction: column;
    -webkit-app-region: none;
}

.playback-queue .header {
    padding: 20px 15px 10px 10px;
    border-bottom: 0.1px solid #464646;
}

.playback-queue .header .title {
    text-align: left;
    font-size: 21px;
    font-weight: bold;
    background: linear-gradient(to top right, #28c83f, #1ca388);
    -webkit-background-clip: text;
    color: transparent;
}

.playback-queue .detail {
    margin-top: 8px;
    margin-left: 3px;
    text-align: left;
    font-size: 14px;
    display: flex;
}

.playback-queue .action {
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 18px;
}

.playback-queue .text-btn {
    text-align: left;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-items: center;
    cursor: pointer;
    margin-left: 20px;
}

.playback-queue .text-btn svg {
    margin-right: 3px;
    fill: #eee;
}


</style>
