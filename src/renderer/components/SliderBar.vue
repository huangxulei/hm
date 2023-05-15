<script setup>
import { ref } from "vue"
const props = defineProps({
  initValue: Number,
  onseek: Function,
})
const sliderRef = ref(null)
const progressRef = ref(null)
const thumbRef = ref(null)
let value = props.initValue //初始0.5

//声音进度条
const updateProgress = (percent) => {
  percent = percent * 100
  percent = percent > 0 ? percent : 0
  percent = percent < 100 ? percent : 100
  progressRef.value.style.width = percent + "%"
  thumbRef.value.style.left = percent + "%"
  value = (percent / 100).toFixed(2)
}

/**
 * @description: 喇叭单击，改变改变声音 静音
 * @return {*}   参数 value 就为0 1 传递
 * 0.5=> 0 这里改变value值
 */
const toggleProgress = () => {
  updateProgress(value > 0 ? 0 : 1)
  return value
}
/**
 * @description:改变声音
 * @param {*} e 点击偏移位
 * @return {*}
 */
const seekProgress = (e) => {
  updateProgressByWidth(e.offsetX)
  if (props.onseek) {
    //进度条点击改变喇叭样式
    props.onseek(value)
  }
}

/**
 * @description:
 * @param {*} width 获取声音宽度
 * @return {*}
 */
const updateProgressByWidth = (width) => {
  const totalWidth = sliderRef.value.offsetWidth
  let percent = width / totalWidth
  updateProgress(percent)
}

//暴露给父组件调用
defineExpose({
  updateProgress,
  toggleProgress,
})
</script>

<template>
  <div class="slider-bar" ref="sliderRef" @click="seekProgress">
    <div class="progress" ref="progressRef"></div>
    <div class="thumb" ref="thumbRef"></div>
  </div>
</template>

<style>
/*只是作为背景*/
.slider-bar {
  /*height: 50px;*/
  border-radius: 10rem;
  /*背景色渐变*/
  background: linear-gradient(to right, #464646, #666) !important;
  /*鼠标手势*/
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  /*父相子绝*/
  position: relative;
}

.slider-bar,
.slider-bar .progress,
.slider-bar .thumb {
  -webkit-app-region: none;
}
/*声音长度*/
.slider-bar .progress {
  width: 50%;
  height: 3px;
  border-radius: 10rem;
  background: linear-gradient(to top right, #28c83f, #1ca388);
  z-index: 1;
  position: absolute;
}

/*小圆球*/
.slider-bar .thumb {
  width: 10px;
  height: 10px;
  border-radius: 10rem;
  background-color: var(--text-color);
  z-index: 2;
  position: absolute;
  left: 50%;
}
</style>
