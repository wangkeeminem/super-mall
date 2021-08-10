<template>
  
  <div class="cartlist"><scroll>
    <cart-list-item v-for="(item,key) in cartlist" :product="item" :key="key"/>
  </scroll></div>
  
</template>

<script>
import {mapGetters} from 'vuex'
import CartListItem from './CartListItem'
import Scroll from 'components/common/scroll/Scroll'
export default {
  name:'CartList',

  computed: {
    ...mapGetters({cartlist:'getCartlist'})
  },
      activated() {
    console.log('进来了');
    console.log(this.$store.state); 
  },
  components:{
    CartListItem,Scroll
  }
}
</script>

<style scoped>
  .cartlist{
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }
  .wrapper{
    height: calc(100% - 141px);
  }
</style>