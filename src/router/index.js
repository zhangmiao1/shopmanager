import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD

=======
import login from '@/components/login.vue'
<<<<<<< HEAD
>>>>>>> dev-login
=======
import Home from '@/components/home.vue'
>>>>>>> dev-login

Vue.use(Router)

export default new Router({
  routes: [
    {
<<<<<<< HEAD
      path: '/',
      name: 'HelloWorld',
      
=======
      path: '/login',
      name: 'login',
      component: login
<<<<<<< HEAD
>>>>>>> dev-login
=======
    },
    {
      path: '/home',
      name: 'home',
      component: Home
>>>>>>> dev-login
    }
  ]
})
