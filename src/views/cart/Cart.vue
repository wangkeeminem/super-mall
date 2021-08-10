<template>
  <div class="Cart">
  <nav-bar><div slot="center" class="center">购物车({{length}})</div></nav-bar>
  <cart-list/>
  <cart-bottom-bar class="cart-bottom-bar"/>
  </div>
  
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import {mapGetters} from 'vuex'
export default {
  name:'Cart',
  computed:{
    ...mapGetters({length:'getCartLength'})
  },

  
  components:{NavBar,CartList,CartBottomBar}
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  font-size: 16px;
  color: white;
  display: flex;
}
.center{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.cart-bottom-bar{
  position:absolute;
  bottom: 49px;
}
.Cart{
  overflow: hidden;
  height: 100vh;
}
</style>