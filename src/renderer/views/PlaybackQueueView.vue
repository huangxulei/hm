<script setup>
import { storeToRefs } from 'pinia';
import { usePlayStore } from '../store/playStore'
import { usePlatformStore } from '../store/platformStore';
import EventBus from '../../common/EventBus';

const { queueTracks, playingIndex, queueTracksSize } = storeToRefs(usePlayStore())
const { playTrack, playNextTrack } = usePlayStore()
const { getVender } = usePlatformStore()

const initAndPlayTrack = (track) => {
    if (!track) return
    const platform = track.platform
    const vender = getVender(platform)
    if (!vender) return
    vender.playDetail(track.id, track).then(result => {
        console.log(result)
        if (!track.hasUrl()) track.url = result.url
        if (!track.hasUrl()) {
            if (queueTracksSize > 1) playNextTrack()
            return
        }
        playTrack(track)
    })
}

EventBus.on('track-changed', track => initAndPlayTrack(track))
</script>

<template></template>

<style scoped></style>
