<template>
  <div class="DetailUserComments">
    <div class="title">
      <div>用户评价</div>
      <div>更多</div>
    </div>
    <div class="uesrinfo">
      <img class="avatar" :src="usercomments.avatar" alt="">
      <div class="uname">{{usercomments.uname}}</div>
    </div>
    <div class="content">{{usercomments.content}}</div>
    <div class="timestyle"><div class="time">{{usercomments.time|transtime}}</div>
    <div  class="style">{{usercomments.style}}</div></div>
    <div class="images"><img class="showImg" :src="item" v-for="(item,index) in usercomments.images" :key='index' alt=""></div>
  </div>
</template>

<script>
export default {
  name:'DetailUserComments',
  props:{
    usercomments:{
      type: Object,
      default(){
        return {}
      }

    }
  },
  filters:{
    
    transtime(a){
      const time=new Date(a*1000)
      const year=time.getFullYear()
      const month=time.getMonth()+1
      const data=time.getDate()
      const hour=time.getHours()
      const minute=time.getMinutes()
      const second=time.getSeconds()
      return year+'-'+(month<10?'0'+month:month)+'-'+(data<10?'0'+data:data)+' '+(hour<10?'0'+hour:hour)+':'+(minute<10?'0'+minute:minute)+':'+(second<10?'0'+second:second)}}
}
</script>

<style scoped>

 .DetailUserComments{
   margin: 20px 10px 10px 10px;
  
   /* padding-top: 10px; */
 }
  .title{
   font-size: 4vw;
   display: flex;
   justify-content: space-between;
   
 }
 .uesrinfo{
    border-top:rgba(100, 100, 100, 0.1) solid 1px;
   display: flex;
   margin: 10px 0px 10px 0px;
   padding-top: 10px;
   color: #333;
 }
 .uname{
    font-size: 3.73333vw;
    line-height:11.2vw;

    }
  .avatar{
    width: 11.2vw;
    height: 11.2vw;
    border-radius: 50%;
    margin-right: 10px;
  }
  .showImg{
    width: 18.66667vw;
    height: 18.66667vw;
  }
  .content{
    color: #777;
    font-size: 3.5vw;
    line-height: 150%;
  }
  .timestyle{
    display: flex;
    font-size: 3.33vw;
    color: #999;
    margin-bottom: 20px;
  }
  .style{
    margin-left: 10px;
  }
  .images{
    display: flex;
  }
  .showImg{
    margin-right: 8px;
  }
</style>