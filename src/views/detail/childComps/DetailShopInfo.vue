<template>
  <div class="DetailShopInfo">
    <div class="shopTitle">
      <img :src="shopInfo.shopLogo" id="shopLogo" alt="" />
      <div id="shopName">{{ shopInfo.name }}</div>
    </div>
    <div class="content">
      <div class="details">
        <div>
          <div id="sells">{{ shopInfo.cSells | showcSells}}</div>
          <span id="sells">总销量</span>
        </div>
        <div>
          <div id="items">{{ shopInfo.cGoods }}</div>
          <span id="items">全部宝贝</span>
        </div>
      </div>
      <div class="breakup"></div>
      <div>
        <div class="score" v-for="(item, index) in shopInfo.score" :key="index">
          <div>
            <span>{{ item.name }}</span
            ><span :style="{ color: item.isBetter ? 'green' : 'red' }">{{
              item.score
            }}</span>
          </div>
          <span
            :style="{ backgroundColor: item.isBetter ? 'green' : 'red' }"
            v-text="item.isBetter?'高':'低'"
            ></span
          >
        </div>
      </div>
    </div>
    <div class="welcome">进店逛逛</div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters:{showcSells(a){return a>=10000?(a/10000).toFixed(1)+'万':a}}
  
};
</script>

<style scoped>
.DetailShopInfo {
  /* margin-left: 10px; */
  padding: 30px 0px 30px 10px;
  /* padding-bottom: 30px;
  padding-top: 30px; */
  border-bottom:rgba(100, 100, 100, 0.1) solid 5px; ;
  border-top:rgba(100, 100, 100, 0.1) solid 5px; ;
}
.shopTitle {
  display: flex;
  height: 45px;
  line-height: 45px;
}
#shopLogo {
  border: #999999 solid 1px;
  border-radius: 50%;
  height: 45px;
  margin-right: 10px;
}
.content,
.score,
.details {
  display: flex;
  justify-content: space-around;
  /* text-align: center; */
}
.content {
  margin: 30px 40px 10px -5px;
  font-size: 13px;
}
.details {
  margin-top: 10px;
  padding: 0 20px 0 0;
  height: 45px;
  /* border-right: solid 1px #b9b9b9; */
}
#sells {
  margin-right: 20px;
  text-align: center;
}
#items {
  margin-left: 20px;
  text-align: center;
}
.details > div {
  text-align: center;
}
.breakup{
  height: 45px;
  width: 1px;
  margin-top: 10px;
  background-color: #b9b9b9;
}
div#sells,
div#items {
  font-size: 18px;
  margin-bottom: 8px;
}
span#sells,
span#items {
  font-size: 12px;
}
.score {
  position: relative;
  margin-bottom: 12px;
  text-align: center;
  justify-content: space-between;
}
.score > div > span {
  margin-right: 10px;
}
.score >  span {
  color: white;
  line-height: 15px;
}
.welcome{
  height: 30px;
  width: 150px;
  font-size: 14px;
  color: #666666;
  line-height: 30px;
  background-color: #f2f5f8;
  border-radius: 7px;
  margin-left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
</style>