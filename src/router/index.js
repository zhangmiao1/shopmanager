import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import users from '@/components/users.vue'

import rights from '@/components/rights.vue'
import roles from '@/components/roles.vue'
import goodslist from '@/components/goodslist.vue'
import goodsadd from '@/components/goodsadd.vue'
import goodscate from '@/components/goodscate.vue'
import cateparams from '@/components/cateparams.vue'
import order from '@/components/order.vue'
Vue.use(Router)

const router = new Router({
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
    }, {
      name: 'roles',
      path: '/roles',
      component: roles
    }, {
      name: 'goods',
      path: '/goods',
      component: goodslist
    }, {
      name: 'goodsadd',
      path: '/goodsadd',
      component: goodsadd
    },
    {
      name: 'categories',
      path: '/categories',
      component: goodscate
    },
    {
      name: 'params',
      path: '/params',
      component: cateparams
    },
    {
      name: 'orders',
      path: '/orders',
      component: order
    }
  
  ]

  }, {
    name: 'login',
    path: '/login',
    component: Login
  }]
})
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    //判断是否携带token
    const token = localStorage.getItem("token")
    if (!token) {
      router.push({
        name: 'login'
      })
      Message.warning("请先登录!");
      return

    }
    next()
  }
})
export default router
