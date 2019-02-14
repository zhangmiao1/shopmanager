import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login.vue'

import Home from '@/components/home.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {

      path: '/',
      name: 'HelloWorld',
      

      path: '/login',
      name: 'login',
      component: login

    },
    {
      path: '/home',
      name: 'home',
      component: Home

    }
  ]
})
