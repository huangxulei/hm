<script setup>
import { useSquareViewStore } from "../store/squareViewStore"
import { useMainViewStore } from "../store/mainViewStore"
import EventBus from "../../common/EventBus"
import { reactive } from "vue"
import { storeToRefs } from "pinia"

const { currentCategoryItem } = storeToRefs(useSquareViewStore())
const { currentCategory, updateCurrentCategoryItem } = useSquareViewStore()
const { hideCategoryView } = useMainViewStore()
const category = reactive([])

const resetScroll = () => {
  const view = document.querySelector(".category-view")
  view.scrollTop = 0
}

EventBus.on("category-resetScroll", () => {
  resetScroll()
})

const updateCategory = () => {
  category.length = 0
  const cached = currentCategory()
  category.push(...cached)
}

EventBus.on("category-update", () => {
  updateCategory()
})

EventBus.on("category-resetScroll", () => {
  resetScroll()
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
      <div v-for="(cate, row) in category" class="fl-row" :key="row">
        <div class="cate-title">{{ cate.name }}</div>
        <div>
          <div v-for="(item, col) in cate.data" :key="col" class="fl-item">
            {{ item.key }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.category-view {
  overflow: auto;
}

.category-view .header,
.category-view .center {
  display: flex;
  flex-direction: row;
  text-align: left;
}

.category-view .header {
  margin-top: 5px;
  margin-bottom: 5px;
  padding-bottom: 10px;
  padding-left: 25px;
  padding-right: 25px;
  border-bottom: 0.5px solid #565656;
}
.category-view .header .cate-title {
  margin-right: 5px;
}

.category-view .header .fl-item {
  cursor: default;
  font-size: 18px;
  background: linear-gradient(to top right, #28c83f, #1ca388);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.category-view .center {
  flex-direction: column;
  margin-left: 25px;
  margin-right: 25px;
}

.category-view .fl-row {
  display: flex;
  font-display: row;
  margin-bottom: 10px;
  text-align: left;
}

.category-view .cate-title {
  font-size: 18px;
  font-weight: bold;
  color: #ddd;
  min-width: 36px;
  margin-top: 15px;
  margin-right: 15px;
}

.category-view .fl-item {
  font-size: 15px;
  padding: 6px 16px;
  margin-top: 10px;
  margin-right: 10px;
  float: left;
  cursor: pointer;
  color: #bcbcbc;
}
</style>
