import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import users from '@/components/users.vue'

import rights from '@/components/rights.vue'
import roles from '@/components/roles.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
    children: [{
      name: 'users',
      path: '/users',
      component: users
    }, {
      name: 'rights',
      path: '/rights',
      component: rights
    },{
      name: 'roles',
      path: '/roles',
      component: roles
    }]

  }, {
    name: 'login',
    path: '/login',
    component: Login
  }]
})
