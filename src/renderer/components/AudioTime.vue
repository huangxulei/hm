<!--
 * @author: hxl
 * @create: 2023-03-31 23:56:42  
 * AudioTime.vue
-->
<script setup>
const props = defineProps({
    current: String,
    duration: String
})
</script>

<template>
    <div class="audio-time">
        <span class="t-current">
            {{ current }}
        </span>
        <span> / </span>
        <span class="t-duration">
            {{ duration }}
        </span>
    </div>
</template>

<style scoped>
.audio-time span {
    vertical-align: middle;
    text-align: left;
}
</style>
