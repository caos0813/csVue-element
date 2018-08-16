// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/vars.scss'
import '@/assets/scss/main.scss'
import { back } from '@/components'
import store from '@/store'
import fly from '@/utils/fly.config'
import VueLodash from 'vue-lodash'
import Cookies from 'js-cookie'
Vue.config.productionTip = false
Vue.prototype.$fly = fly
const options = { name: 'lodash' }
Vue.use(VueLodash, options)
Vue.use(ElementUI)
Vue.component('back', back)
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  let { token } = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : ''
  if (to.meta.requireAuth && !token) {
    next({
      name: 'login'
    })
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
