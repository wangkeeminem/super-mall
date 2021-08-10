<template>
  <div class="tab-bar-item"  @click='itemclick'>    
     <!-- <img src="../../assets/img/tabbar/home.svg" alt=""><div>首页</div> -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else ><slot name="item-icon-active"></slot></div>
    <div :class="{active:isActive}" :style="activeColor1"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
name:"TabBarItem",
props:{
  path:String,
  activeColor:{
   type:String,
   default:'red'
  }
},
// data() {
//   return {
//     isActive:true
//   }
// },
computed:{
 isActive(){
   return this.$route.path==this.path;
 },
 activeColor1(){
   return this.isActive?{color:this.activeColor,fontWeight:'bold'}:{}
 }
},
methods:{
  itemclick(){
    
    this.$router.push(this.path)
  }
}
}
</script>

<style>

/* .active{
  color: red;
} */
</style>