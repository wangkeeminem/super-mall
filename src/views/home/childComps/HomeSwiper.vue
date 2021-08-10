<template>
  <swiper class="swiper" ref="swiper">
    <swiper-item v-if="imagelist">
      <img 
        v-for="(item, index) in imagelist"
        :src="item.image && item.image"
        alt=""
        slot="swiperitem"
        :key="index"
        @load="swiperisLoad"
      />
      <img :src="imagelist && imagelist[0].image" alt="" slot="swiperitem" />
      <img :src="imagelist && imagelist[1].image" alt="" slot="swiperitem" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";

export default {
  name: "HomeSwiper",
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
};
</script>

<style scoped>
img {
  width: 100vw;
  /* position: relative;    */
}
</style>