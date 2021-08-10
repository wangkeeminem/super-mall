<template>
  <div class="DetailGoodsInfo">
     
       <div class="desctext">{{goodsInfo.desc}}</div>
     
     <div class="desckey">{{goodsInfo.key}}</div>
     <div class="imagelist" v-for="(item,index) in goodsInfo.imgList" :key='index'><img :src="item" alt="" @load="imgLoad"></div>
  </div>
</template>

<script>
export default {
  name:'DetailGoodsInfo',
  props:{
    goodsInfo:{
      default(){
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      count:0
    }
  },
  methods: {
    imgLoad(){      
      if (this.count++==this.goodsInfo.imgList.length-1)
      {this.$emit('imgLoad')}
    }
  },
  
}
</script>

<style scoped>
  img{
    width: 100vw;
    margin-bottom: 3px;

  }
  .desctext{
    margin: 25px 15px 0px 15px;
  }
  .desctext::before{
    border-left: 5px solid black;
    border-bottom: 1px solid black;
    width: 90px;
    height: 5px;
    content: "";
    display: block;
    margin-bottom: 15px;
  }
    .desctext::after{
    border-right: 5px solid black;
    border-bottom: 1px solid black;
    width: 90px;
    height: 5px;
    content: "";
    display: block;
    margin-top: 15px;
    position: absolute;
    right: 15px;
    

  }
  .desckey{
    margin: 20px 0 20px 15px;
  }

</style>