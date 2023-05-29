<script setup>
import { onMounted, onActivated, reactive, ref, watch } from "vue"
import { storeToRefs } from "pinia"
import EventBus from "../../common/EventBus"
import { useSquareViewStore } from "../store/squareViewStore"
import CategoryBar from "../components/CategoryBar.vue"
import PlaylistControl from "../components/PlaylistControl.vue"
const { currentPlatformCode, currentCategoryCode } = storeToRefs(
  useSquareViewStore()
)
const {
  currentVender,
  currentCategory,
  putCurrentCategory,
  resetCurrentCategoryItem,
} = useSquareViewStore()

const squareContentRef = ref(null)

const categories = reactive([])
const playlists = reactive([])

const pagination = { offset: 0, limit: 35, page: 1 }
let markScrollTop = 0

const resetScrollState = () => {
  markScrollTop = 0
}

const resetPagination = () => {
  pagination.offset = 0
  pagination.page = 1
}

const nextPage = () => {
  pagination.offset = pagination.page * pagination.limit
  pagination.page = pagination.page + 1
}

const loadCategoyies = () => {
  categories.length = 0
  let cached = currentCategory()
  if (!cached) {
    const vender = currentVender()
    if (!vender) return
    vender.categories().then((result) => {
      putCurrentCategory(result)
      categories.push(...result)
      EventBus.emit("category-update")
    })
  } else {
    categories.push(...cached)
    EventBus.emit("category-update")
  }
}

const loadContent = () => {
  const vender = currentVender()
  if (!vender) return
  const cate = currentCategoryCode.value
  const offset = pagination.offset
  const limit = pagination.limit
  const page = pagination.page
  vender.square(cate, offset, limit, page).then((result) => {
    console.log("loadContent", result)
    playlists.push(...result.data)
  })
}

const loadData = () => {
  loadCategoyies()
  loadContent()
}
onMounted(() => {
  resetPagination()
  loadData()
})

onActivated(() => {
  restoreScrollState()
})

const restoreScrollState = () => {
  if (markScrollTop < 1) return
  squareContentRef.value.scrollTop = markScrollTop
}

watch(currentPlatformCode, (nv, ov) => {
  if (nv != "local") {
    playlists.length = 0
    resetCurrentCategoryItem()
    resetPagination()
    loadData()
  }
})

watch(currentCategoryCode, (nv, ov) => {
  playlists.length = 0
  resetPagination()
  loadContent()
})
</script>

<template>
  <div id="square-content" ref="squareContentRef">
    <CategoryBar
      :data="categories"
      v-show="categories.length > 0"></CategoryBar>
    <PlaylistControl :data="playlists"></PlaylistControl>
  </div>
</template>

<style scoped>
#square-content {
  padding: 25px 33px 15px 33px;
  overflow: auto;
}
</style>
