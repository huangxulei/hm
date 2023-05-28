<script setup>
import { useRouter } from 'vue-router';
import PaginationTiles from './PaginationTiles.vue';   
const props = defineProps({
    data: Array
})    
</script>
        
<template>
    <div class="playlists-ctl">
        <PaginationTiles>
          <template #data>
           111
        </template>  
        </PaginationTiles>
    </div>
</template>
        
<style>
    .playlists-ctl {
    margin-top: 15px;
}
</style>