<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import EventBus from "../../common/EventBus";
import { useSquareViewStore } from "../store/squareViewStore";
import CategoryBar from "../components/CategoryBar.vue";
import PlaylistControl from "../components/PlaylistControl.vue";
const { currentPlatformCode, currentCategoryCode } = storeToRefs(
  useSquareViewStore()
);
const {
  currentVender,
  currentCategory,
  putCurrentCategory,
  resetCurrentCategoryItem,
} = useSquareViewStore();

const SquareContentRef = ref(null);

const categories = reactive([]);
const playlists = reactive([]);

const pagination = { offset: 0, limit: 35, page: 1 };

const resetPagination = () => {
  pagination.offset = 0;
  pagination.page = 1;
};

const nextPage = () => {
  pagination.offset = pagination.page * pagination.limit;
  pagination.page = pagination.page + 1;
};

const loadCategoyies = () => {
  categories.length = 0;
  let cached = currentCategory();
  if (!cached) {
    const vender = currentVender();
    if (!vender) return;
    vender.categories().then((result) => {
      putCurrentCategory(result);
      categories.push(...result);
      //EventBus.emit('category-update')
    });
  } else {
    categories.push(...cached);
    //EventBus.emit('category-update')
  }
};

const loadContent = () => {
  const vender = currentVender();
  if (!vender) return;
  const cate = currentCategoryCode.value;
  const offset = pagination.offset;
  const limit = pagination.limit;
  const page = pagination.page;
  vender.square(cate, offset, limit, page).then((result) => {
    console.log(result);
    playlists.push(...result.data);
  });
};

const loadData = () => {
  loadCategoyies();
  loadContent();
};
onMounted(() => {
  resetPagination();
  loadData();
});

watch(currentCategoryCode, (nv, ov) => {
  playlists.length = 0;
  resetPagination();
  loadContent();
});
</script>

<template>
  <div id="square-content" ref="SquareContentRef">
    <CategoryBar
      :data="categories"
      v-show="categories.length > 0"
    ></CategoryBar>
    <PlaylistControl :data="playlists"></PlaylistControl>
  </div>
</template>

<style scoped>
#square-content {
  padding: 25px 33px 15px 33px;
  overflow: auto;
}
</style>
