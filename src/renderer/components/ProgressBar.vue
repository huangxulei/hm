<script setup>
import { ref } from 'vue'

const barRef = ref(null)
const barValueRef = ref(null)

const props = defineProps({
    onseek: Function
})

const updateProgress = (percent) => {
    percent = percent * 100
    barValueRef.value.style.width = percent + "%"
}
defineExpose({
    updateProgress
})

const seek = (e) => {
    const offsetX = e.offsetX//获取点击的位置
    const offsetWidth = barRef.value.offsetWidth
    const percent = (offsetX / offsetWidth).toFixed(3)
    if (props.onseek) {
        props.onseek(percent)
    }
}

</script>

<template>
    <div class="progress-bar" ref="barRef" @click="seek">
        <div class="progress" ref="barValueRef"></div>
    </div>
</template>

<style scoped>
.progress-bar {
    height: 3px;
    border-radius: 10rem;
    background: linear-gradient(to right, #464646, #666) !important;
    cursor: pointer;
    -webkit-app-region: none
}

.progress-bar .progress {
    width: 0%;
    height: 100%;
    border-radius: 10rem;
    background: linear-gradient(to top right, #28c83f, #1ca388);
}
</style>
