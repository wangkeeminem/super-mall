import Vue from 'vue'
import App from './App.vue'
import store from './store'
import obj from './components/common/toast'
import FastClick from 'fastclick'
import lazyload from 'vue-lazyload'
Vue.use(obj)
Vue.use(lazyload,{loading:require('./assets/img/common/placeholder.png')})
// 
// Vue.use(FastClick)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
import router from "./router"
new Vue({
  render: h => h(App),
  router,
  store,
  // toast
}).$mount('#app')
FastClick.attach(document.body)
