import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD

=======
import login from '@/components/login.vue'
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
>>>>>>> dev-login
    }
  ]
})
