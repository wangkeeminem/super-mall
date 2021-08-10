<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import ObserveDom from "@better-scroll/observe-dom";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 1,
    },
    pullUpload: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // this.scroll=new BScroll('.wrapper',{probeType:3,pullUpLoad:true})
    //初始化bs
    BScroll.use(ObserveDom);
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpload,
      observeDOM: true,
      click: true,
    });
    this.scroll.on("scroll", (position) => {
      // console.log( this.scroll);
      // console.log(position);
      this.$emit("backtop", position.y);
    }); //监听滑动事件

    this.pullUpload &&
      this.scroll.on("pullingUp", () => {
        //发送网络请求请求页面数据
        // console.log('到底了');
        this.scroll.refresh();
        this.$emit("pullingUp", true);
        //等数据请求完，展示出来后
      });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      setTimeout(() => {
        this.scroll.finishPullUp();
      }, 500);
    },
    refresh(){this.scroll.refresh();
    // console.log("调用refresh");
    },
    getScrollY(){
    // console.log("调用scroll"+this.scroll.y);
    return this.scroll?this.scroll.y:0
  }

  },

};
</script>

<style scoped>
</style>