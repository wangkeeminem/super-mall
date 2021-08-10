<template>
  <div class="swiper-window" ref="swiperwindow">
  <div ref="barparent1"
    class="swiper"
    @touchstart="stopRoll"
    @touchmove="touchMove"
    @touchend="touchEnd"
    :style="{ left: -totalmoving + 'px',transition: 'left 3000', transform:'scaleX('+scaleX+')'}"
  >
  <!-- transition: 'left 3000', -->
    <slot></slot>
  </div>
    <div class="buttons">
      <!-- 设置icon高度（滑动影响） -->
      <div
        class="buttonItem"
        :style="{backgroundColor:(totalmoving/imgWidth%imgnum)+1==count?itemHighColor:itemColor}"
        @touchstart="iconCheck(count, $event)"
        @touchmove="iconMove"
        @touchend="iconEnd"
        v-for="count in imgnum"
        :key="count"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    // imgSize:{default:0},//初始图像宽度，从父元素传过来
    movingRate: { default: 50 }, //每一小步的时间
    movingPace: { default: 32 }, //每一小步的距离(动画的精细程度)
    movingWaiting: { default: 5000 }, //进入页面后滞留时间
    innermovingWaiting: { default: 2000 }, //滚动时滞留时间
    itemColor:{default:'rgba(100, 100, 100, 0.5'}, //指示点高亮颜色
    itemHighColor:{default:'rgba(255, 255, 255, 0.7)'} //指示点普通颜色
  },
  // watch:{
  //   imgWidth(newValue,oldValue){
  //     this.imgWidth=newValue
  //   }
  // },
  data() {
    return {
      imgnum:4,  //图片数量 **根据插入图片数自动更新** 
      imgWidth:320,//图片宽度 **根据插入屏幕尺寸自动更新**
      totalmoving: null,
      imageIndex: 1, //移动单位 几张图片
      timer1: 1, //页面均速滚动计时器
      timer2: 2, //图片切换间隔计时器
      timer3: 3, //点击后重新恢复滚动间隔计时器
      touchBegin: 0, //开始拖动时手指X坐标
      stopmoving: 0, //开始拖动时的图片坐标
      touchDis: 0, //拖动距离（每个拖动move都更新）
      movingMargin: 0.125, //拖动激活图片阈值（最小距离）1/8个图片宽度
      // quickMoving: 5, //快速切换的时间
      scaleX:1  //图片缩放系数（拉伸时使用）
    };
  },
  methods: {
    waitforRoll() {
      if(this.$refs.barparent1){
      this.letsRoll(this.toBegin, this.pauseRoll, this.movingRate); }//进入页面时的启动
    },
    letsRoll(callback1, callback2, movingRate) {
      //开始滚动
      if(this.$refs.barparent1){
      this.imgWidth=this.$refs.barparent1.clientWidth//*************************************************改过 */
      this.scaleX=this.imgWidth/this.$refs.barparent1.children[0].childNodes[0].naturalWidth;//获得图片原始宽度 进行缩放 防止滚动时进行刷新
      if(this.scaleX<1){this.scaleX=1}
      // console.log(this.scaleX);
      this.totalmoving===null? this.totalmoving= 0:{};
      //缩放比例定下之后 置零？不行XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      this.imgnum=this.$refs.barparent1.children[0].childElementCount-2;
      clearInterval(this.timer1); //点击触发停止
      clearTimeout(this.timer2);
      clearTimeout(this.timer3);
      // console.log(this.totalmoving+'letsroll');
      clearInterval(this.timer1);
      this.timer1 = setInterval(() => {
        this.totalmoving += this.movingPace; //开始滑动
        if (this.totalmoving >= this.imageIndex * this.imgWidth) {
          callback2(); ////如果移动大于每张图片边界 调用自动滚动时的暂停函数 pauseRoll
        }
        callback1; //调用回到第一张函数 toBegin
      }, movingRate);}
    },
    toBegin() {
      //回到第一张
      clearInterval(this.timer1);
      clearTimeout(this.timer2);
      clearTimeout(this.timer3);
      if (this.totalmoving >= this.imgnum * this.imgWidth) {
        this.totalmoving = 0;
        // console.log('超出边界了');
      } else {
      }
    }, //回到第一张函数
    pauseRoll() {
      //正常时的图片切换暂停函数
      // console.log('pauseRoll执行了');
      clearTimeout(this.timer2);
      clearTimeout(this.timer3);
      //每张图片自动滚动时的暂停
      this.totalmoving = this.imageIndex * this.imgWidth; //保持等于边界
      clearInterval(this.timer1); //关闭上一个计时器
      this.timer2 = setTimeout(() => {
        //隔一段时间重新开始一段计时
        this.letsRoll(this.toBegin(), this.pauseRoll, this.movingRate);
        this.imageIndex = 1 + (this.imageIndex % this.imgnum);
      }, this.innermovingWaiting);
    }, //切换图片之停留后开启新计时器

    stopRoll(event) {
      clearInterval(this.timer1); //点击触发停止
      clearTimeout(this.timer2);
      clearTimeout(this.timer3);
      this.touchBegin = event.touches[0].clientX;
      this.stopmoving = this.totalmoving;
    },
    touchMove(event) {
      
      clearInterval(this.timer1); //点击触发停止
      clearTimeout(this.timer2);
      clearTimeout(this.timer3);
      //滑动函数
  
      this.touchDis = event.touches[0].clientX - this.touchBegin;
      this.totalmoving =
        this.stopmoving <= 0
          ? (this.totalmoving = this.imgWidth*this.imgnum - this.touchDis)
          : this.stopmoving - this.touchDis;
      
    },
    touchEnd() {
      //滑动结束
      clearInterval(this.timer1); //点击触发停止
      clearTimeout(this.timer2);
      clearTimeout(this.timer3);
      if (this.touchDis <= -1 * this.movingMargin * this.imgWidth) {
        //左划
        //  console.log(this.touchDis+'左划超出阈值了');
        if (
          this.stopmoving >= 0 &&
          this.stopmoving < this.imgWidth * this.imgnum
        ) {
          //超出阈值拖动切换页面
          this.totalmoving =
            this.stopmoving -
            (this.touchDis / Math.abs(this.touchDis)) * this.imgWidth;
        }
        //当滑动距离超过阈值，启用快速切换
        else if (this.stopmoving >= this.imgWidth * this.imgnum) {
          // console.log("左划超限了在外边");
          this.totalmoving = this.imgWidth;
        }
      } else if (this.touchDis >= this.movingMargin * this.imgWidth) {
        //右划
        //  console.log(this.touchDis+'右划超出阈值了');
        if (
          this.stopmoving > 0 &&
          this.stopmoving <= this.imgWidth * this.imgnum
        ) {
          //超出阈值拖动切换页面
          this.totalmoving =
            this.stopmoving -
            (this.touchDis / Math.abs(this.touchDis)) * this.imgWidth;
        }
        //当滑动距离超过阈值，启用快速切换
        else if (this.stopmoving <= 0) {
          // console.log("左划超限了在外边");
          this.totalmoving = this.imgWidth * (this.imgnum-1);
        }
      } else {
        //正常切换 未超出阈值返回原位置
        this.totalmoving = this.stopmoving;
        // console.log("被摸了但没超出阈值");
      }
      this.timer3 = setTimeout(() => {
        //切换完定时滑动
        this.letsRoll(this.toBegin, this.pauseRoll, this.movingRate);
      }, this.movingWaiting - this.innermovingWaiting);
      this.touchBegin=0
      this.touchDis=0

    },
    iconCheck(count, $event) {
      $event.cancelBubble = true;
      clearInterval(this.timer1); //点击触发停止
      clearTimeout(this.timer2);
      clearTimeout(this.timer3);
      count == 1
        ? (this.totalmoving = this.imgnum * this.imgWidth)
        : (this.totalmoving = (count - 1) * this.imgWidth);
      this.timer3 = setTimeout(() => {
        //切换完开启定时滑动
        this.letsRoll(this.toBegin, this.pauseRoll, this.movingRate);
      }, this.movingWaiting - this.innermovingWaiting);
    },
    iconMove(event) {
      //  console.log(event);
      event.cancelBubble = true;
    },
    iconEnd(event) {
      event.cancelBubble = true;
    },    
    //加载轮播图后尺寸初始化（主要针对拉伸状况）
    imageSizing(){
    this.imgnum=this.$refs.barparent1.children[0].childElementCount-2;
    this.imgWidth=this.$refs.barparent1.clientWidth//***************************************改过 */
    // console.log("mounted时的图片宽度"+this.imgWidth);
    this.scaleX=this.imgWidth/this.$refs.barparent1.children[0].childNodes[0].naturalWidth;//获得图片原始宽度 进行缩放
    // console.log(this.$refs.barparent1.children[0].children[0].naturalWidth)
    // console.log("mounted时的缩放系数"+this.scaleX);
    if(this.scaleX<1){this.scaleX=1}
    setTimeout(() => {
      // console.log("开始滚动了");
      this.waitforRoll();
    }, 5000);
    }
  },

  mounted() {

  },
};
</script>

<style scoped>
.swiper {
  position: relative;
  transform-origin: left;
}

.buttons {
  position: absolute;
  transform: translateX(-50%);
  width: 60%;
  left: 50%;
  top:90%;
  display: flex;
  justify-content: space-around;
 
}
.buttonItem {
  width: 10px;
  height: 10px;
  background-color: rgba(100, 100, 100, 0.5);
  border-radius: 50%;
  /* flex: 1; */
}
.buttonItem:active {
  background-color: rgba(255, 255, 255, 0.5);
}
swiper-window{
  position: absolute;
  width: 100vw;
}
</style>