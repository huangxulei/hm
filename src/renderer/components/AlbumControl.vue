<script setup>
import { useRoute } from 'vue-router';
import { useAlbumDetailStore } from '../store/albumDetailStore'
import { useMainViewStore } from '../store/mainViewStore';
import { usePlatformStore } from '../store/platformStore';

const router = useRoute()
const { } = useMainViewStore()

const props = defineProps({
    visitable: Boolean,
    platform: String,
    data: Object
})

</script>
        
<template>
    <span class="album-ctl">
        {{ data.name }}
    </span>
</template>
        
<style>
.album-ctl {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-align: left;
}

.album-ctl:hover {
    background: linear-gradient(to top right, #1ca388, #28c83f);
    -webkit-background-clip: text;
    color: transparent;
}
</style>