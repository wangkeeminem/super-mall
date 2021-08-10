import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
// const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,  
      meta: {
      keepAlive: true
    }
    },
    {
      path: '/category',
      component: Category,  
      meta: {
      keepAlive: true
    }
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/profile',
      component: Profile,  
      meta: {
      keepAlive: true
    }
    },

    {
      path: "/detail/:iid",
      component:Detail,  
      meta: {
      keepAlive: false
    }

    }
    // {
    //   path: '/detail',
    //   component: Detail
    // }
  ],
  mode: 'history'
})

export default router