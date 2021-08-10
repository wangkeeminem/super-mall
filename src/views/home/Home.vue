<template>
  <div id="home" ref="homescroll">
    <!-- @wheel="scroll1" -->
    <nav-bar class="home-nav-bar" ref="homeNavBar"><div slot="center">购物街</div></nav-bar>
    <tab-control
      class="tabcontrol"
      :titles="['流行', '新款', '精选']"
      @tabclick="tabclick"
      :class="{ tabcontrolfix: tabcontrolfix }"
      v-show="tabcontrolfix"
      ref="tabcontrol2"
    />
    <scroll
      class="wrapper"
      @backtop="backtop1"
      ref="scroll"
      :probe-type="2"
      :pull-upload="true"
      @pullingUp="pullingUp"
    >
      <home-swiper
        :imagelist="banner"
        @swiperisLoad="swiperisLoad"
      ></home-swiper>
      <recommand-view :recommand="recommend" />
      <feature-view />
      <tab-control
        class="tabcontrol"
        :titles="['流行', '新款', '精选']"
        @tabclick="tabclick"
        ref="tabcontrol"
        v-show="!tabcontrolfix"
      />
      <goods-list :goods="goods[currentchoice].list" />
    </scroll>
    <!-- <tab-control class="tabcontrol2" :titles="['流行','新款','精选']" @tabclick='tabclick'/> -->
    <back-top
      class="backtop"
      v-show="totop"
      @click.native="backclick"
      :class="{ rotatebacktop: rotatebacktop }"
    />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backtop/BackTop.vue";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommandView from "./childComps/RecommandView";
import FeatureView from "./childComps/FeatueView";

import { dbounce } from "common/utils";

import { getHomeMultidate } from "network/home";
import { getHomeGoods } from "network/home";
import axios from 'axios'
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    RecommandView,
    FeatureView,
  },
  data() {
    return {
      banner: [{image:[]},{image:[]}],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentchoice: "pop",
      totop: false,
      rotatebacktop: false,
      tabOffsetTop: 0,
      imageisload: false,
      tabcontrolfix: false,
      saveY:0
    };
  },

  created() {
    this.getHomeMultidate();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    // getHomeMultidate().then(res=>{console.log(res);})
  },
  mounted() {
    axios.get('/students').then(res=>console.log('这是请求到的数据',res.data))
    const func = this.$refs.scroll.refresh;
    this.$bus.$on("isLoaded", dbounce(func, 500)); //加载图片防抖动
    console.log(this.$refs);
  
    // console.log(this.$refs.tabcontrol.$el.offsetTop);
  },
  destroyed() {
    // console.log('home页已销毁');
  },
  deactivated() {
    this.saveY=this.$refs.scroll.getScrollY()
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    
  },
  methods: {
    tabclick(item) {
      switch (item) {
        case "流行":
          this.currentchoice = "pop";
          break;
        case "新款":
          this.currentchoice = "new";
          break;
        case "精选":
          this.currentchoice = "sell";
          break;

        default:
          break;
      }   
       this.$refs.tabcontrol?this.$refs.tabcontrol.clickitem=item:{}
       this.$refs.tabcontrol2?this.$refs.tabcontrol2.clickitem=item:{}
    },
    //判断轮播图是否加载好
    swiperisLoad(isload) {
      if (!this.imageisload) {
        this.imageisload = isload; //加载轮播图片节流操作
        this.$refs.scroll.refresh()
        this.tabOffsetTop = this.$refs.tabcontrol.$el.offsetTop-this.$refs.homeNavBar.$el.clientHeight;//得到tabcontrol的可滑动高度
        // console.log(this.$refs.tabcontrol);
        // console.log(this.tabOffsetTop);
      }
      // else{this.imageisload = false}
    },
    backclick() {
      this.$refs.scroll.scrollTo(0, 0, 800);
    },
    //监听回到顶部事件  &&&监听是否吸顶 //tabcontro的监听并固定：
    backtop1(positionY) {
      //  console.log('到底了2');
      if (positionY < -this.$el.clientHeight) {
        //滑动超出可视高度时
        this.totop = true;
      } 
      else {
        this.totop = false;
      }
      // console.log(this.totop);
      if (positionY < -this.tabOffsetTop) {
        this.tabcontrolfix = true;
      } else {
        this.tabcontrolfix = false;
      }
    },
    pullingUp(ispullingUp) {
      this.rotatebacktop = true;
      ispullingUp && this.getHomeGoods(this.currentchoice); //加载下一页
      this.$refs.scroll.finishPullUp(); //关闭上次上拉
      setTimeout(() => {
        this.rotatebacktop = false;
      }, 500);
    },
    // 上面为事件监听相关
    // 下面为网络请求相关
    getHomeMultidate() {
      getHomeMultidate().then((res) => {
        //  this.HomeMultidate=res;
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
      // getHomeMultidate().then(res=>{console.log(res);})
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1; //自动加载下一页

      getHomeGoods(type, page).then((res) => {
        //  console.log(res);
        this.goods[type].list.push(...res.data.list); //将。。。后数组的元素解析依次塞入
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
.home-nav-bar {
  text-align: center;
  color: aliceblue;
  background-color: var(--color-tint);
  box-shadow: 0px 10px 10px rgba(100, 100, 100, 0.1);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 100;
}
#home {
  overflow: hidden;
  padding-top: 44px;
  
}
/* .tabcontrol{
  position: sticky;
  top:0px;
  background-color: white;
} */
.tabcontrolfix {
  position: absolute;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  z-index: 100;  
}

.wrapper {
  height: 90vh;
}
.rotatebacktop {
  transform: rotateZ(180deg) translateY(10px);
  transition: ease 500;
}
</style>