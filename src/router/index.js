import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import users from '@/components/users.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      name: 'users',
      path: '/users',
      component: users
    }]

  }, {
    name: 'login',
    path: '/login',
    component: Login
  }]
})
