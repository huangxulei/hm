<script setup>
import { useSquareViewStore } from "../store/squareViewStore";
import { useMainViewStore } from "../store/mainViewStore";
import EventBus from "../../common/EventBus";
import { reactive } from "vue";
import { storeToRefs } from "pinia";

const { currentCategoryItem } = storeToRefs(useSquareViewStore());
const { currentCategory, updateCurrentCategoryItem } = useSquareViewStore();
const { hideCategoryView } = useMainViewStore();
const category = reactive([]);

const resetScroll = () => {
  const view = document.querySelector(".category-view");
  view.scrollTop = 0;
};

EventBus.on('category-resetScroll', ()=> {
    resetScroll()
})

const updateCategory = () => {
    category.length = 0
    const cached = currentCategory()
    category.push(...cached)
}

EventBus.on('category-update', ()=> {
    updateCategory()
})

const visitCateItem = (item, row, col) => {
    updateCurrentCategoryItem(item, row, col)
    hideCategoryView()
}

</script>

<template>
  <div class="category-view">
    <div class="header">
        <div class="cate-title">当前分类</div>
        <div class="fl-item">{{ currentCategoryItem.data.key }}</div>
    </div>
    <div class="center">
        <div v-for="(cate, row) in category" class="fl-row">
            <div class="cate-title">{{ cate.name }}</div>
        </div>
    </div>
  </div>
</template>

<style></style>
