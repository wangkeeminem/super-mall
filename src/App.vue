<template>
  <div id="app">
    <keep-alive> 
    <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <main-tab-bar :style="{visibility:tabhidden?'hidden':'visible'}"/>
  </div>
</template>

<script>

import MainTabBar from 'components/content/maintabbar/MainTabBar.vue'
export default {
  name: 'App',
  components: {
   MainTabBar,  
  },
  data() {
    return {
      tabhidden:false
    }
  },
  updated() {
    this.$bus.$on("tabhidden",(params)=>{this.tabhidden=params})
    // console.log(this.tabhidden);
  },
  
}
</script>

<style>
  @import "assets/css/base.css";

</style>
