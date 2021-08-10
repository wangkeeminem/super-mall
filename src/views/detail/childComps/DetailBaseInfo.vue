<template>
  <div class="detailbaseinfo">  
    <div id="detailbaseinfo">
     <div id="title">{{goods.title}}</div>
     <div id="price">
       <div id="newprice">{{goods.price}}</div>
       <div id="oldprice">{{goods.oldPrice}}</div>
       <div id="discount" :style="{backgroundColor:goods.discountDesc&&goods.discountBgColor}">{{goods.discountDesc}}</div>
     </div>
     <div id="column">
       <div>{{goods.columns&&goods.columns[0]}}</div>
       <div>{{goods.columns&&goods.columns[1]}}</div>
       <div >{{goods.columns&&goods.services[goods.services.length-1].name}}</div>
     </div>
     <div id="services">
     <div v-for="index in goods.services&&goods.services.length-1" :key='index'>
       <img :class='{delayicon:goods.services[index-1].name=="延误必赔"}' :src="goods.services[index-1].icon" id="icon" alt="">{{goods.services[index-1].name}}
       </div>
     </div>
</div>
  </div>
</template>

<script>
export default {
  name:'DetailBaseInfo',
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    },
    
  }
}
</script>

<style scoped>
  #detailbaseinfo{
    margin: 12px 6px 30px 6px 
  }
  #title{
    font-size: 16px;
  }
  #price{
    width: 100%;
    /* float: left; */
    display: flex;
    margin-top: 20px;
  }
  #newprice{
    font-size: 24px;
    color: #ff5777;
  }
  #oldprice{
    font-size: 13px;
    color: #999999;
    margin: 10px 0px 0px 5px;
    text-decoration:line-through;
  }
  #discount{
    font-size: 12px;
    color: white;
    margin-left: 5px;
    height: 14px;
    line-height: 14px;
    padding: 2px 3px 13px 4px;
    border-radius: 20%;
  }
  #column{
    font-size: 13px;
    color:#999999;
    margin:20px 0 0px 0;
    padding-bottom: 10px;
    border-bottom: rgba(100,100,100, 0.1) solid 2px;
    width: 100%;
   display: flex;
   justify-content: space-between; 
  }
  #services{
    display: flex;
    justify-content: space-between;
    padding: 25px 0px 0px 0px;
    /* border-bottom: rgba(100, 100, 100, 0.1) solid 5px; */
    font-size: 13px;
  }
  #icon{
    width: 13px;
    height: 13px;
    
  }
  .delayicon{
    width: 13px;
    height: 13px;
    border: 1px solid rgb(165, 165, 165);
  }

  
</style>