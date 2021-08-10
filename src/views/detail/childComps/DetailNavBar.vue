<template>
  <nav-bar class="navbar">
    <div slot="left" class="backicon" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="" />
    </div>
    <div slot="center" class="titleitems">
      <div
        v-for="(item, index) in titles"
        :key="index"
        @click="btnClick(item,index)"
        :class="{ isActive: scrollindex==index}"
      >
      <!-- currentIndex == item ||  -->
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  props:{
    scrollindex:{
      default:0,
      type:Number
    }
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: "商品",
    };
  },
  methods: {
    btnClick(item,index) {
      this.currentIndex = item;
      this.$emit("skipTo",index)
    },
    backClick(){
      // this.$router.push('/home')
      this.$router.back()
  },
  },

  components: {
    NavBar,
  },
};
</script>

<style scoped>
.titleitems {
  /* background-color: #fff; */
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  z-index: 190;
}

.isActive{
  color: red;
}
.backicon{
  height: 100%;
}
img{
  margin: 10px;
}

</style>