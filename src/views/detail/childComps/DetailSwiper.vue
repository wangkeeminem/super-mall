<template>
    <swiper class="swiper" ref="swiper">
    <swiper-item class="swiper-item">
      <img
        :src="imagelist && item"
        v-for="(item, index) in imagelist"
        alt=""
        slot="swiperitem"
        :key="index"
        @load="swiperisLoad"
      />
      <img :src="imagelist && imagelist[0]" alt="" slot="swiperitem" />
      <img :src="imagelist && imagelist[1]" alt="" slot="swiperitem" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  name:'DetailSwiper',
  props: {
    imagelist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
      swiperisLoad(){
      this.$emit('swiperisLoad',true)
  
      this.$refs.swiper.imageSizing()//图形加载函数 加载完运行轮播图的imageSizing
      }
  },
  components: {
    Swiper,
    SwiperItem,
  },
}
</script>

<style scoped>
.swiper{
  height: 30vh;
  overflow: hidden;
   /* position: absolute; */
}
.swiper-item{
  width: 100vw;
}
img {
  display: block;
  width: 100vw;
     
}  
</style>