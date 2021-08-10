<template>
  <div class="cartbottombar">
    <div class="select">
      <check-button  @click.native="totalchoiceclick" :isActive="itemnum?itemnum==this.$store.state.cartlist.length:false"/>
      <div class="allselect">全选</div>
      <div class="conclude">合计:{{totalprice}}</div></div>
      <div class="total">去结算({{itemnum}})</div>
  </div>
</template>

<script>

import {useCheckButton} from "common/mixin"
export default {
  name:'CartBottomBar',
  mixins:[useCheckButton],
  mounted() {   
  },
  computed:{
    totalprice(){
      return '￥' +this.$store.state.cartlist.filter(item=>{
        return item.isActive}).reduce((preValue,item)=>{
          return preValue+item.price.substring(1) * item.count
        },0).toFixed(2)},
    itemnum(){
      return this.$store.state.cartlist.filter(item=>{
        return item.isActive}).length
    },
  }
}
</script>

<style scoped>
  .cartbottombar{
    line-height: 48px;
    display: flex;
    width: 100vw;
    background-color: #EEE;
  }
  .allselect{
    margin-left: 10px;
    color: #666;
  }
  .select{
    display: flex;
    width: 75%;
    padding: 0 0 0 10px;
    position: relative;
  }
  .conclude{
     position: absolute;
     right: 15vw;
  }
  .total{
    color: #fff;
    background-color: #F00;
    width: 25vw;
    text-align: center;
  }
  </style>