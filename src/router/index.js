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
        component: () => import('@/pages/index'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/xuanke/special-list/',
        name: 'xuanke/special-list',
        component: () => import('@/pages/xuanke/special/list'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/xuanke/special/:type',
        name: 'xuanke/special',
        component: () => import('@/pages/xuanke/special/add'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/xuanke/article-list/',
        name: 'xuanke/article-list',
        component: () => import('@/pages/xuanke/article/list'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/xuanke/article/:type',
        name: 'xuanke/article',
        component: () => import('@/pages/xuanke/article/add'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/xuanke/topic-list/',
        name: 'xuanke/topic-list',
        component: () => import('@/pages/xuanke/topic/list'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/xuanke/topic/:type',
        name: 'xuanke/topic',
        component: () => import('@/pages/xuanke/topic/add'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/zhiyuan/special-list/:type',
        name: 'zhiyuan/special-list',
        component: () => import('@/pages/zhiyuan/special/list'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/zhiyuan/special/:type',
        name: 'zhiyuan/special',
        component: () => import('@/pages/zhiyuan/special/add'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/zhiyuan/article-list/:type',
        name: 'zhiyuan/article-list',
        component: () => import('@/pages/zhiyuan/article/list'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/zhiyuan/article/:type',
        name: 'zhiyuan/article',
        component: () => import('@/pages/zhiyuan/article/add'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/zhiyuan/banner-list/:type',
        name: 'zhiyuan/banner-list',
        component: () => import('@/pages/zhiyuan/banner/list'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/zhiyuan/banner/:type',
        name: 'zhiyuan/banner',
        component: () => import('@/pages/zhiyuan/banner/add'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/volunteer/card',
        name: 'volunteer/card',
        component: () => import('@/pages/volunteer/card'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/volunteer/use',
        name: 'volunteer/use',
        component: () => import('@/pages/volunteer/use'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/order/list',
        name: 'order/list',
        component: () => import('@/pages/order/list'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/feedback/list',
        name: 'feedback/list',
        component: () => import('@/pages/feedback/list'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/system/authority',
        name: 'system/authority',
        component: () => import('@/pages/system/authority'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/system/user-list',
        name: 'system/user-list',
        component: () => import('@/pages/system/user-list'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/system/user/:type',
        name: 'system/user',
        component: () => import('@/pages/system/user'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/system/super-user',
        name: 'system/super-user',
        component: () => import('@/pages/system/super-user'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/system/app-list',
        name: 'system/app-list',
        component: () => import('@/pages/system/appAutoUpgrade'),
        meta: {
          requireAuth: true
        }
      }, {
        path: '/system/app',
        name: 'system/app',
        component: () => import('@/pages/system/app'),
        meta: {
          requireAuth: true
        }
      }]
    }
  ]
})
