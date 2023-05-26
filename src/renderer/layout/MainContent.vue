<script setup>
import { useRouter } from "vue-router"
import { usePlatformStore } from "../store/platformStore"

const router = useRouter()
const { updateCurrentPlatformByCode } = usePlatformStore()

router.beforeResolve((to, from) => {
  highlightPlatform(to)
})

const highlightPlatform = (to) => {
  const path = to.path
  let code = ""
  if (
    path.startsWith("/square") ||
    path.startsWith("playlist") ||
    path.startsWith("/artist") ||
    path.startsWith("/album")
  ) {
    code = path.split("/")[2]
  } else if (path.startsWith("/local")) {
    code = "local"
  }
  updateCurrentPlatformByCode(code)
}

const excludes = ["PlaylistDetailView", "ArtistDetailView", "AlbumDetailView"]
</script>

<template>
  <div id="main-content">
    <router-view v-slot="{ Component }">
      <keep-alive :exclude="excludes" :max="8">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style></style>
