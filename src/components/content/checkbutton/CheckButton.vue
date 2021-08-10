<template>
  <div class="checkbutton" ><img :class="{isActive:isActive}" src="~assets/img/cart/tick.svg" alt=""></div>
</template>

<script>
export default {
  name:'CheckButton',
  props:{
    isActive:{
      default:false,
      type: Boolean
    }
  }
}
</script>

<style scoped>
  img{
    border: rgb(161, 161, 161) solid 1px;
    /* background-color: red; */
    border-radius: 50%;
  }
    img.isActive{
    border: rgb(161, 161, 161) solid 1px;
    background-color: red;
    border-radius: 50%;
    border-color: red;
  }

</style>