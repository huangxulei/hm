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

watch(progress, (nv, ov) => {
    progressBarRef.value.updateProgress(nv)
})

</script>

<template>
    <div id="main-top">
        <div id="play-nav">
            <PlayMeta id="play-meta"></PlayMeta>
            <PlayControl id="play-ctl"></PlayControl>
            <div class="top-right">

            </div>
        </div>
        <ProgressBar ref="progressBarRef"></ProgressBar>
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
    /*拖动 */
    -webkit-app-region: drag;
}

#play-nav #play-ctl {
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
    margin-right: 15px;
}

#main-top {
    flex-direction: column;
    height: 71px;
    -webkit-app-region: drag;
}

#play-nav .top-right {
    width: 39.83%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
</style>
