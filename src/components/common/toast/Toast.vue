<template>
  <div v-show="msgshow" class="toast">
    <div >{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  // props:{
  //   message:{
  //     default:'',
  //     type: String
  //   },
  //   msgshow:{
  //     default:false,
  //     type:Boolean
  //   }
  // },
  data() {
    return {
      message:'',
      msgshow:false
    }
  },
  methods: {
    show(msg,delay=300){
      this.message=msg
      this.msgshow=true
      setTimeout(()=>{this.msgshow=false},delay)
    }
  },
}
</script>

<style scoped>
  .toast{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    color: rgb(153, 30, 190);
    font-size: 18px;
    background-color:yellow;
    opacity: 0.2;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
  }
</style>