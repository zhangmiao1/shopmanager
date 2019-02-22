import Vue from 'vue'
import VueRouter from 'vue-router'
// const Foo = () => import('./Foo.vue')
const Home = () => import ('@/components/home.vue') 
const Login = () => import ('@/components/login.vue') 

const users = () => import ('@/components/users.vue') 
const roles = () => import ('@/components/roles.vue') 
const rights = () => import ('@/components/rights.vue') 
const goodslist = () => import ('@/components/goodslist.vue') 
const goodsadd = () => import ('@/components/goodsadd.vue') 
const goodscate = () => import ('@/components/goodscate.vue') 
const cateparams = () => import ('@/components/cateparams.vue') 
const order = () => import ('@/components/order.vue') 
const reports = () => import ('@/components/reports.vue') 
Vue.use(VueRouter)

const router = new VueRouter({
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
    },
    {
      name: 'reports',
      path: '/reports',
      component: reports
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
