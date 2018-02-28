import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Search from '@/components/searchbycategory'
import Adminpage from '@/components/Adminpage'
import Update from "@/components/update";
import CheckHistory from "@/components/CheckoutHistory";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Adminpage',
      component: Adminpage
    },
    {
      path: '/category/:id',
      name: 'Search',
      component: Search
    },
    {
      path: '/update/:id',
      name: 'Update',
      component: Update
    },
    {
      path:'/myshoppinghistory',
      name:'History',
      component: CheckHistory
    }
  ]
})

