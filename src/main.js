// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ELEMENT from 'element-ui'
Vue.use(ELEMENT)
import '@/assets/css/base.css'
//引入面包屑组件
import CubBread from '@/components/cubBread.vue'
Vue.component(CubBread.name,CubBread)

import MyPlugin from '@/http.js'
Vue.use(MyPlugin)

// 格式化日期
import moment from 'moment'
Vue.filter('formdata', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
