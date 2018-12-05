import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login')
    },
    {
      path: '/layout',
      component: () => import('@/pages/layout'),
      redirect: { name: 'index' },
      children: [{
        path: '/index',
        name: 'index',
        component: () => import('@/pages/index')
      }, {
        path: '/xuanke/article-list',
        name: 'xuanke/article-list',
        component: () => import('@/pages/xuanke/article/list')
      }]
    }
  ]
})
