<script setup>
import { Track } from "../../common/Track";
import ArtistControl from "./ArtistControl.vue";
import AlbumControl from "./AlbumControl.vue";

const prop = defineProps({
  index: Number,
  artistVisitable: Boolean,
  albumVisitable: Boolean,
  data: Track,
  deleteFn: Function,
});
</script>

<template>
  <div class="playlist-item">
    <div class="sqno">{{ index + 1 }}</div>
    <div class="title spacing">
      <span>{{ data.title }}</span>
      <div class="action">
        <svg width="18" height="18" class="play-btn" viewBox="0 0 139 139" xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path
            d="M117.037,61.441L36.333,14.846c-2.467-1.424-5.502-1.424-7.972,0c-2.463,1.423-3.982,4.056-3.982,6.903v93.188  c0,2.848,1.522,5.479,3.982,6.9c1.236,0.713,2.61,1.067,3.986,1.067c1.374,0,2.751-0.354,3.983-1.067l80.704-46.594  c2.466-1.422,3.984-4.054,3.984-6.9C121.023,65.497,119.502,62.866,117.037,61.441z" />
        </svg>
        <svg width="15" height="15" class="add-btn spacing" viewBox="0 0 682.65 682.74"
          xmlns="http://www.w3.org/2000/svg">
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <path
                d="M298.59,384.15h-7.06q-123.24,0-246.49,0c-21.63,0-38.69-12.57-43.64-31.94-7-27.56,13.21-53.29,42.33-53.51,25.33-.18,50.66,0,76,0H298.59v-6.44q0-123.49,0-247c0-20.39,10.77-36.44,28.49-42.71C355-7.34,383.55,13,384,43.16c.26,16.33,0,32.67,0,49V298.65h6.82q123.49,0,247,0c21.52,0,38.61,12.77,43.43,32.19,6.75,27.26-13.06,52.7-41.62,53.25-11.16.22-22.33,0-33.49,0H384.09v6.69q0,123.5,0,247c0,21.59-12.66,38.65-32.06,43.53-27.59,6.95-53.24-13.31-53.39-42.46-.17-32.66,0-65.33,0-98V384.15Z" />
            </g>
          </g>
        </svg>
      </div>
    </div>
    <div class="artist spacing1">
      <ArtistControl :visitable="artistVisitable" :platform="data.platform" :data="data.artist">
      </ArtistControl>
    </div>
    <div class="album spacing1">
      <AlbumControl :visitable="albumVisitable" :platform="data.platform" :data="data.album">
      </AlbumControl>
    </div>
  </div>
</template>

<style>
.playlist-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-right: 3px;
}

.playlist-item:hover {
  background-color: #464646;
}

.playlist-item>div {
  line-height: 50px;
  vertical-align: middle;
  font-size: 16px;
}

.playlist-item .spacing {
  margin-left: 12px;
}

.playlist-item .spacing1 {
  margin-left: 8px;
}

.playlist-item .title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: left;
}

.playlist-item .sqno {
  width: 35px;
  padding-left: 8px;
  text-align: left;
}

.playlist-item .title {
  flex: 1;
  position: relative;
  text-align: left;
}

.playlist-item .artist {
  width: 25%;
}

.playlist-item .album {
  width: 25%;
}

.playlist-item .action {
  z-index: 2;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 158px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #464646;
  /** 默认隐藏**/
  visibility: hidden;
}

.playlist-item .action svg {
  fill: #eee;
  cursor: pointer;
}

.playlist-item .action svg:hover {
  fill: #28c83f;
}

.playlist-item .title:hover .action {
  visibility: visible;
}

.playlist-item .title:hover span {
  width: 158px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
