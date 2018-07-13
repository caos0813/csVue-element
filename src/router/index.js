import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Main from '@/pages/main'
import Link from '@/pages/link'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/main',
      component: Main,
      redirect: 'link',
      children: [{
        path: 'link',
        component: Link
      }]
    }
  ]
})
