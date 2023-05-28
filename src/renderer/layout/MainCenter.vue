<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useMainViewStore } from "../store/mainViewStore";
import MainTop from "./MainTop.vue";
import MainContent from "./MainContent.vue";

import CategoryView from "../views/CategoryView.vue";
const { categoryViewShow } = storeToRefs(useMainViewStore());
</script>

<template>
  <div id="main-center">
    <MainTop id="main-top"></MainTop>
    <MainContent></MainContent>
    <transition name="fade-ex">
      <CategoryView id="category-view" v-show="categoryViewShow"></CategoryView>
    </transition>
  </div>
</template>

<style>
#main-center {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

#category-view {
    position: fixed;
    top:75px;
    right:0px;
    width:404px;
    padding-bottom: 30px;
    z-index:55;
    background-color: #373737;
    box-shadow: 0px 0px 10px #161616;
}
</style>
