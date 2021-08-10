<template> 
    <div class="swiperitem">     
      <slot name="swiperitem"></slot>    
  </div>
</template>

<script>
export default {
  name:'SwiperItem',

}
</script>

<style scoped>
  .swiperitem{
    display: flex;
   }
</style>