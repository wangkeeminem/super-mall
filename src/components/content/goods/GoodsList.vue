<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :goods-item="item" :key="index" ></goods-list-item>
    <goods-list-item v-for="(item,index) in recommendlist" :recommenditem="item" :key="index" ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"

export default {
  name:'GoodsList',
  props:{
    goods:{
      default(){return []},
      type: Array
    },
    recommendlist:{
      default(){
        return []
      },
      type:Array
    }
  },
  components:{
    GoodsListItem,
  },

}
</script>

<style scoped>
  .goods{
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
  }
</style>