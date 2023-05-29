<script setup>
import { useRouter } from "vue-router"
import { usePlatformStore } from "../store/platformStore"

const { updateCurrentPlatformByCode } = usePlatformStore()
//引入路由
const router = useRouter()
//路由拦截处理
router.beforeResolve((to, from) => {
  console.log("当前路由:" + to.path)
  highlightPlateform(to)
})
//路由获取path 然后截取plateform 去判断
const highlightPlateform = (to) => {
  const path = to.path
  let code = ""
  if (
    path.startsWith("/square") ||
    path.startsWith("/playlist") ||
    path.startsWith("/artist") ||
    path.startsWith("/album")
  ) {
    code = path.split("/")[2]
  } else if (path.startsWith("/local")) {
    code = "local"
  }
  updateCurrentPlatformByCode(code)
}

//const excludes = ['PlaylistDetailView', 'ArtistDetailView', 'AlbumDetailView']
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<style>
#main-content {
  display: flex;
  flex: 1;
  overflow: auto;
  margin-right: 2px;
}
</style>
