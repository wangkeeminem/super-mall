<template>
  <div v-if="goodsItem&&goodsItem.show" class="goodsitem" @click="itemClick(goodsItem.iid)">
    <img  v-lazy="goodsItem.show.img" alt="" @load="isLoaded" >

    <div class="goodsinfo">
    <span class='desciption'>{{goodsItem.title}}</span>
    <div class="pricecfav"><span class='price'>{{goodsItem.price}}</span>
    <i>☆</i><span class='cfav'>{{goodsItem.cfav}}</span></div></div>
    </div>
  <div v-else-if="recommenditem" class="goodsitem" >
    <img  :src="recommenditem.image" alt="" @load="isLoaded" >
   <div class="goodsinfo">
    <span class='desciption'>{{recommenditem.title}}</span>
    <div class="pricecfav"><span class='price'>{{recommenditem.price}}</span>
    <i>☆</i><span class='cfav'>{{recommenditem.cfav}}</span></div></div>
    </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  props:{
    goodsItem:{
      default(){
        return {}
        },
      type:Object,
    },
    recommenditem:{
    default(){return {}},
    type:Object}
  },
  data() {
    return {
      path:"/detail/"
    }
  },
    methods: {
    isLoaded(){this.$bus.$emit('isLoaded')},
    itemClick(iid){
      this.$router.push(this.path+iid)
      // console.log(iid);
      }
  },
}
</script>

<style scoped>
  .goodsitem{
    display: flex;
    flex-direction: column;
    float: left;
    width: 45%;
    
    margin-bottom: 5%;
    margin-left: 2.5%;
    margin-right: 2.5%;
   
    
  }
  img{
    border-radius: 4%;
    height: 40vh;
  }
  .goodsinfo{
    font-size: 14px;
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    /* 不自动换行 */
    text-align: center;
    
  }
  span{
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .cfav{
    margin: 0px 16px 0px 4px;
  }
  .price{
    color: red;
    margin: 0px 4px 0px 0px;
  }
  
</style>