
// import Vue from 'vue'

// class Toast{
//   constructor(msg){
//     this.show=msg
//   }
// }

// Vue.use(Toast)
import Toast from 'components/common/toast/Toast'
const obj = {}
obj.install=function(Vue){
  // this.show='hahaha'
  console.log('安装toast',Vue);
  // document.body.appendChild(Toast.$el)
  // Vue.extend(Toast)
  const toastContructor = Vue.extend(Toast)//根据vue组件 创建一个组件对象构造器
  const toast = new toastContructor()//创建一个新的toast组件对象
  toast.$mount(document.createElement('div'))//将组件对象挂载到'div'上
  document.body.appendChild(toast.$el)//再将新的toast.$el添加到document的body上去
  Vue.prototype.$toast = toast
}
export default obj