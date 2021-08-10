<template>
  <div class="cartlistitem">
    <check-button @click.native="itemchoiceclick" :isActive="product.isActive"/>
    <img class="itemimg" :src="product.image" alt="" />
    <div class="iteminfo">
      <div class="title">{{ product.title }}</div>
      <div class="desc">{{ product.desc }}</div>
      <div class="pricenum">
        <div class="price">{{ product.price }}</div>
        <div class="num">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import CheckButton from 'components/content/checkbutton/CheckButton.vue'
import {useCheckButton} from "common/mixin"
// import { observable } from 'vue/types/umd';
export default {
  name: "CartListItem",
  mixins:[useCheckButton],
  props:{
    product:{
      default(){return {}},
      type: Object
    }
  }
};
</script>

<style scoped>
.cartlistitem{
  width: 100vw;
  height: 15vh;
  margin-top: 7px;
  padding-bottom: 7px;
  margin-left: 50%;
  transform: translateX(-50%);
  display: flex;

  font-size: 12px;
  line-height: 5vh;
  border-bottom: 1px solid rgb(212, 212, 212);
  /* flex-wrap: nowrap; */
}
.itemimg {
  width: 16vw;
  margin-right: 20px;
  border-radius: 8px;
}
.title{
  font-weight: bold;
  font-size: 13px;
}
.title,.desc,.pricenum{
  width: 70vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #808080;
}
.pricenum{
  display: flex;
  justify-content: space-between;
  color: #666;
}
.price{
  color: #ff4500;
}
</style>