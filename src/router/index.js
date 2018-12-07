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
        path: '/xuanke/special-list',
        name: 'xuanke/special-list',
        component: () => import('@/pages/xuanke/special/list')
      }, {
        path: '/xuanke/special/:type',
        name: 'xuanke/special',
        component: () => import('@/pages/xuanke/special/add')
      }, {
        path: '/xuanke/article-list',
        name: 'xuanke/article-list',
        component: () => import('@/pages/xuanke/article/list')
      }, {
        path: '/xuanke/article/:type',
        name: 'xuanke/article',
        component: () => import('@/pages/xuanke/article/add')
      }, {
        path: '/xuanke/topic-list',
        name: 'xuanke/topic-list',
        component: () => import('@/pages/xuanke/topic/list')
      }, {
        path: '/xuanke/topic/:type',
        name: 'xuanke/topic',
        component: () => import('@/pages/xuanke/topic/add')
      }, {
        path: '/xuanke/volunteer-list',
        name: 'xuanke/volunteer-list',
        component: () => import('@/pages/xuanke/volunteer/list')
      }, {
        path: '/xuanke/volunteer-use',
        name: 'xuanke/volunteer-use',
        component: () => import('@/pages/xuanke/volunteer/use')
      }, {
        path: '/xuanke/order-list',
        name: 'xuanke/order-list',
        component: () => import('@/pages/xuanke/order/list')
      }, {
        path: '/zhiyuan/banner-list',
        name: 'zhiyuan/banner-list',
        component: () => import('@/pages/zhiyuan/banner/list')
      }, {
        path: '/zhiyuan/banner:type',
        name: 'zhiyuan/banner',
        component: () => import('@/pages/zhiyuan/banner/add')
      }, {
        path: '/system/authority',
        name: 'system/authority',
        component: () => import('@/pages/system/authority')
      }]
    }
  ]
})
