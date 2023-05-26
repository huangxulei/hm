<script setup>
import { onMounted } from "vue"
import { storeToRefs } from "pinia"
import { useMainViewStore } from "../store/mainViewStore"
import MainTop from "./MainTop.vue"
import MainContent from "./MainContent.vue"
</script>

<template>
  <div id="main-center">
    <MainTop id="main-top"></MainTop>
    <MainContent id="main-content"></MainContent>
  </div>
</template>

<style>
#main-center {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}
</style>
