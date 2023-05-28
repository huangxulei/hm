<script setup>
import { useRouter } from 'vue-router';
import PaginationTiles from './PaginationTiles.vue';   
import ImageTextTile from './ImageTextTile.vue';
const props = defineProps({
    data: Array
})    

const router = useRouter()
</script>
        
<template>
    <div class="playlists-ctl">
        <PaginationTiles>
          <template #data>
           <ImageTextTile v-for="item in data"
           :cover="item.cover"
           :title="item.title">
           </ImageTextTile>
        </template>  
        </PaginationTiles>
    </div>
</template>
        
<style>
    .playlists-ctl {
    margin-top: 15px;
}
</style>