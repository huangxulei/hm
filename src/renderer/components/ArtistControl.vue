<script setup>
import { useRouter } from "vue-router";
import { useArtistDetailStore } from "../store/artistDetailStore";
import { useMainViewStore } from "../store/mainViewStore";
import { usePlatformStore } from "../store/platformStore";

const props = defineProps({
    visitable: Boolean,
    platform: String,
    data: Array,

});

const router = useRouter();
const { hidePlayingView } = useMainViewStore();
</script>

<template>
    <div class="artist-ctl" v-show="data.length > 0" @click.stop="">
        <template v-for="(item, index) in data">
            <span class="artist-item">{{ item.name }} </span>
            <template v-if="index < data.length - 1">、 </template>
        </template>
    </div>
</template>

<style>
.artist-ctl {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-align: left;
}

.artist-ctl .artist-item {
    cursor: pointer;
}

.artist-ctl .artist-item:hover {
    background: linear-gradient(to top right, #1ca388, #28c83f);
    -webkit-background-clip: text;
    color: transparent;
}
</style>
