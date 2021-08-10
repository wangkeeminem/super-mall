<template>
  <div class="details">
   <detail-nav-bar class="detailnavbar" @skipTo="skipTo" :scrollindex="scrollindex"> </detail-nav-bar>
    <div class="fixscroll"><scroll
      class="wrapper"
      ref="scroll"
      :probe-type="3"
      @backtop="backtop1"
      
    >
    <!-- :pull-upload="true" -->
   <detail-swiper :imagelist='imagelist' @swiperisLoad="swiperisLoad"/>
   <detail-base-info :goods="goods" class="detaiibaseinfo" ref="baseinfo"/>
   <detail-shop-info :shopInfo="shopInfo"/>
   <detail-goods-info :goodsInfo="goodsInfo" @imgLoad="imgLoad"/>
   <detail-param-info :itemParam="itemParam" ref="params"/>
   <detail-user-comments :usercomments="usercomments" ref="comments"/>
   <!-- <div>{{recommendlist}}</div> -->
   <goods-list :recommendlist="recommendlist"  ref="recommend" class="goodslist"/>
   </scroll></div>
    <back-top
      class="backtop"
      v-show="totop"
      @click.native="backclick"
    />     
      <detail-bottom-bar class="detail-bottom-bar" @addclick="addclick"/>
      <!-- <toast :message="addCartmsg" :msgshow="msgshow"/> -->
  </div>
</template>

<script>
import DetailSwiper from "views/detail/childComps/DetailSwiper"
import DetailNavBar from "views/detail/childComps/DetailNavBar"
import DetailBaseInfo from "views/detail/childComps/DetailBaseInfo" 
import DetailShopInfo from "views/detail/childComps/DetailShopInfo"
import DetailGoodsInfo from "views/detail/childComps/DetailGoodsInfo"
import DetailParamInfo from "views/detail/childComps/DetailParamInfo"
import DetailUserComments from "views/detail/childComps/DetailUserComments"
import DetailBottomBar from "views/detail/childComps/DetailBottomBar"
// import Toast from 'components/common/toast/Toast'

import GoodsList from "components/content/goods/GoodsList.vue";
import BackTop from "components/content/backtop/BackTop.vue";



import Scroll from "components/common/scroll/Scroll.vue";

// import { dbounce } from "common/utils";


import {getDetails} from "network/detail"
import {getRecommend} from "network/detail";
import {Goods} from "network/detail"
import {Shop} from "network/detail"
import {GoodInfo} from "network/detail"
import {GoodParam} from "network/detail"
import {UserComments} from "network/detail"
export default {
  name:'Detail',
  data() {
    return {
      iide:null,
      detail:null,
      imagelist:[],
      goods:{shopInfo:{services:[{name:''}]}},
      shopInfo:{},
      goodsInfo:{},
      itemParam:{hahaha:"666"},
      imageisload: false,//图片加载成功标注
      skipToHeight:[],
      usercomments:{hahaha:'6666'},
      recommendlist:[],
      totop:false,
      scrollindex:0,//自动跳转的navbar对应序列号
      // addCartmsg:'',
      // msgshow:false,
      // showtimer:1
    }
  },
  methods: {
    getDetails(iid){
      // console.log(iid+'是');
      getDetails(iid).then(res=>{
        this.detail=res.result
        // this.imagelist=this.detail.result.itemInfo.topImage;
        this.imagelist=this.detail.itemInfo.topImages;//获取轮播数据
        this.goods=new Goods(this.detail.itemInfo,this.detail.columns,this.detail.shopInfo)
        this.shopInfo=new Shop(this.detail.shopInfo)
        this.goodsInfo=new GoodInfo(this.detail.detailInfo,this.detail.detailInfo.detailImage)
        this.itemParam=new GoodParam(this.detail.itemParams.rule.tables,this.detail.itemParams.info.set)
        if(this.detail.rate.list)
        {this.usercomments=new UserComments(this.detail.rate.list[0],this.detail.rate.list[0].user,this.detail.rate.list[0].images)}

        // console.log(this.goods);
       //拿到数据后进行组件渲染后回调，给跳转高度进行赋值，并在接受bus传来的图片加载事件后触发
    //     this.$nextTick(()=>{
    //     console.log("hahahaha");
    //   //   const func =this.getskipToHeight
    //   //  this.$bus.$on('isLoaded',dbounce(func))
    // })
        
      })
    },
    getRecommend(){
      getRecommend().then(res=>{
        this.recommendlist=res.data.list
      })
    },
    swiperisLoad(isload) {//使用轮播图节流加载判断是否达到预计可滑动区域高度
      if (!this.imageisload) {
        this.imageisload = isload; //加载轮播图片节流操作
         this.$refs.scroll.refresh()
      }
      // else{this.imageisload = false}
    },

    skipTo(index){

      this.$refs.scroll.scrollTo(0,this.skipToHeight[index],300)
      
      // console.log(this.$refs.params.$el.offsetTop);
    },//跳转到页面响应位置
    backclick() {
      this.$refs.scroll.scrollTo(0, 0, 800);
    },
    //监听回到顶部事件  &&&监听是否吸顶 //tabcontro的监听并固定： 
    backtop1(positionY) {
      if (positionY < -this.$el.clientHeight) {
        //滑动超出可视高度时
        this.totop = true;
      } 
      else {
        this.totop = false;
      }
      // console.log(positionY);
      // console.log(this.skipToHeight);
      if (positionY > this.skipToHeight[1]) {
        //滑动超出可视高度时
        // console.log('在商品栏');
        this.scrollindex=0
      } 
      else if(positionY > this.skipToHeight[2]) {
        this.scrollindex=1
        // console.log('在参数栏');
        
      }
      else if(positionY > this.skipToHeight[3]) {
        this.scrollindex=2
        // console.log('在评论栏');
      }
      else{this.scrollindex=3}
    },  
    getskipToHeight(){
  
    this.$refs.scroll.refresh()
    this.skipToHeight=[]
    this.skipToHeight.push(-this.$refs.baseinfo.$el.offsetTop)
    this.skipToHeight.push(-this.$refs.params.$el.offsetTop)
    this.skipToHeight.push(-this.$refs.comments.$el.offsetTop)
    this.skipToHeight.push(-this.$refs.recommend.$el.offsetTop)
    // console.log(this.$refs.baseinfo);
    // console.log(this.skipToHeight);
  },
  imgLoad(){
    this.getskipToHeight()
  },
  addclick(){
     const product={}
     product.iid=this.iide
     product.image=this.imagelist[0]
     product.title=this.goods.title
     product.desc=this.goodsInfo.desc 
     product.price=this.goods.price.split('~')[0]
     product.isActive=true
    //  this.$store.commit('addCart',product)}//直接使用mutations的做法
     this.$store.dispatch('addCart',product).then(res=>{
      //  this.addCartmsg=res;this.msgshow=true;
      // clearTimeout(this.showtimer)
      // this.showtimer=setTimeout(()=>{
      // this.msgshow=false;
      //     },300)
      // this.$toast.show(res,300)
      this.$toast.show(res); 
     })

     }
 
  },
  
  components:{
    DetailNavBar,DetailSwiper,DetailBaseInfo,DetailShopInfo,DetailGoodsInfo,DetailParamInfo,DetailBottomBar,DetailUserComments,GoodsList,
    Scroll, BackTop
  },
  created() {
    this.iide=this.$route.params.iid
    this.getDetails(this.iide)
    this.getRecommend()
    // this.$emit('tabhidden',true)
    this.$bus.$emit('tabhidden',true)
  },
  updated(){
    this.$bus.$emit('tabhidden',true)
  },

  beforeDestroy() {
    
    this.$bus.$emit('tabhidden',false)
    
  },
  

  }
</script>

<style scoped>
.detail{
  /* overflow: hidden; */
  /* padding-top: 44px; */
  height: 100vh;
}

.detailnavbar{
 
  position: absolute;
  background-color:white;
  width: 100%;
  height: 44px;
  z-index: 100;
 
  transform: translateZ(100px);
}
.fixscroll{
  height: calc(100vh - 0px) ;
  overflow: hidden;
}
.wrapper {
  height: calc(100% - 94px) ;
  /* height: 90vh ; */
  /* margin-top: 44px; */
  
  position: relative;
  top: 44px;
  z-index: 0;
  background-color: white;
  
  
}
.goodslist{
  margin-top: 10px;
  border-top: solid rgba(100, 100,100, 0.1) 5px;
  padding-top: 5px;
}

.detail-bottom-bar{
   z-index: 100;
   position: absolute;
  /* height: 100px; */
  transform: translateZ(100px);
}
.backtop{
     z-index: 100;
  /* height: 100px; */
  transform: translateZ(100px);
}
</style>