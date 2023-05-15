<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import EventBus from '../../common/EventBus'
import { usePlayStore } from '../store/playStore'
import PlayMeta from '../components/PlayMeta.vue'

const router = useRouter()
const progressBarRef = ref(null)
const { progress } = storeToRefs(usePlayStore())


</script>

<template>
    <div id="main-top">
        <div id="play-nav">
            <PlayMeta id="play-meta"></PlayMeta>
        </div>
    </div>
</template>

<style scoped>
#main-top,
#play-nav {
    display: flex;
}

#main-top {
    flex-direction: column;
    height: 71px;
    -webkit-app-region: drag;
}
</style>
