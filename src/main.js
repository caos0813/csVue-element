// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fly from '@/utils/fly.config'
import ElementUI from 'element-ui'
import VueLodash from 'vue-lodash'
import Cookies from 'js-cookie'
import store from '@/store'
import 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/sass/main.scss'
import { filters, toState, authority } from '@/mixins'
import { back } from '@/components'

Vue.config.productionTip = false
Vue.prototype.$fly = fly
const options = { name: 'lodash' }
Vue.use(ElementUI)
Vue.use(VueLodash, options)
Vue.component('back', back)
Vue.mixin(filters)
Vue.mixin(toState)
Vue.mixin(authority)
router.beforeEach((to, from, next) => {
  let { token } = Cookies.getJSON('user') ? Cookies.getJSON('user') : ''
  if (to.meta.requireAuth && !token) {
    next({
      name: 'login'
    })
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
