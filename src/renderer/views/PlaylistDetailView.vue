<script>
export default {
  name: "PlaylistDetailView",
}
</script>
<script setup>
import { onBeforeMount, reactive, ref } from "vue"

import { usePlatformStore } from "../store/platformStore"

const { getVender } = usePlatformStore()
const props = defineProps({
  platform: String,
  id: String,
})

const detail = reactive({})
const listSize = ref(0)
let offset = 0
let page = 1
let limit = 1000

const loadContent = () => {
  const vender = getVender(props.platform)
  if (vender) {
    vender.playlistDetail(props.id, offset, limit, page).then((result) => {
      console.log("播放列表", result)
      Object.assign(detail, result)
      listSize.value = detail.data.length
    })
  }
}
onBeforeMount(() => {
  loadContent()
})
</script>

<template>
  <div id="playlist-detail">
    <div class="header">
      <div>
        <img class="cover" v-lazy="detail.cover" />
      </div>
      <div class="right">
        <div class="title">{{ detail.title }}</div>
        <div class="about">{{ detail.about }}</div>
        <div class="action"></div>
      </div>
    </div>
  </div>
</template>

<style>
#playlist-detail {
  display: flex;
  flex: 1;
  font-display: column;
  padding: 28px 33px 10px 33px;
  overflow: auto;
}
#playlist-detail .header {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
#playlist-detail .header .right {
  flex: 1;
  margin-left: 20px;
}
#playlist-detail .header .title,
#playlist-detail .header .about {
  text-align: left;
  margin-bottom: 13px;
}
#playlist-detail .header .title {
  font-size: 21px;
  font-weight: bold;
}
#playlist-detail .header .about {
  height: 119px;
  line-height: 20px;
  color: #bababa;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
}

#playlist-detail .header .cover {
  width: 202px;
  height: 202px;
  border-radius: 6px;
  box-shadow: 0px 0px 10px #161616;
}
</style>
