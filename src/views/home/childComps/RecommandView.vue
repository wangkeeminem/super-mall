<template>
  <div class="recommandview">
    <div class="image" v-for="(item,key) in recommand" :key="key">
      <img :src="item.image" alt="" :key="key">
      <div class="itemtitle">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'RecommandView',
  props:{
    recommand:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  img{
    width: 65px;
    height:65px ;
    margin-bottom: 10px;
  }
  .image{
    flex: 1;
    text-align: center;}
  .recommandview{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding:15px 0 20px 0;
    border-bottom: 7px solid #d3d3d3;
  }
</style>