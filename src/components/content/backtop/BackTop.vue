<template>
  <div class="back-top" >
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name:'BackTop',
  methods: {
    
  },
}
</script>

<style scoped>
  .backtop{
  position: absolute;
  top: 85vh;
  left: 88vw;
  z-index: 100;
  /* visibility: hidden; */
}
  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>