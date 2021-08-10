<template>
  <div class="DetailBottomBar">
    <div class="barleft">
    <div class="service"><div id="service"></div><div>客服</div></div>
    <div class="shop"><div id="shop"></div><div>店铺</div></div>
    <div class="collect" @click="collect"><div :class="{isActive:isActive}" id="collect"></div><div>收藏</div></div>
    </div>
    <div class="barright"><div id="cart" @click="addclick">加入购物车</div><div id="buy">购买</div></div>
  </div>
</template>

<script>
export default {
  name:'DetailBottomBar',
  data() {
    return {
      isActive:false
    }
  },
  methods: {
    collect(){
      this.isActive=!this.isActive
    },
    addclick(){
      this.$emit('addclick')
    }
  },
}
</script>

<style scoped>
  .DetailBottomBar{
    height: 49px;
    background-color:rgba(255, 255,255, 0.8);
    position: absolute;
    /* position: relative; */
    z-index: 101;
    width: 100vw;
    bottom: 0px;
    display:flex;
  }
  .barleft,.barright{
    display: flex;
    width: 50vw;
    text-align: center;
    justify-content: space-around;
    opacity: 0.8;
  }
  .barleft{
    font-size: 13px;
    color: #666;
    padding-top: 5px;
    height: 49px;
  }
  .barright{
    font-size: 15px;
    line-height: 49px;
  }
  #cart{
    color: #333;
    background-color: #FFE817;
    width: 50%;
  }
  #buy{
    color: #FFF;
    background-color: #F69;
    width: 50%;
  }

  #service{
    width: 22px;
    height: 22px;
    position: relative;
    left: 2px;
    background: url("~assets/img/detail/detail_bottom.png")  0px -53px/100%;
    margin-bottom: 2px;
  }
  #shop{
    width: 22px;
    height: 22px;
    position: relative;
    left: 2px;
    background: url("~assets/img/detail/detail_bottom.png")  0px -99px/100%;
    margin-bottom: 2px;
  }
  #collect{
    width: 22px;
    height: 22px;
    background: url("~assets/img/detail/detail_bottom.png")  2px 0px/100%;
    margin-bottom: 2px;
  }
  #collect.isActive{
    width: 22px;
    height: 22px;
    background: url("~assets/img/detail/detail_bottom.png")  2px -25px/100%;
    margin-bottom: 2px;
  }
</style>