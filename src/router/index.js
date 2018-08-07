import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Home from '@/pages/home'
import HomeList from '@/pages/home-list'
import HomeEdit from '@/pages/home-edit'
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
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: true
      },
      children: [{
        path: 'list/:id',
        name: 'home-list',
        component: HomeList,
        meta: {
          requireAuth: true
        }
      }, {
        path: 'edit/:type/:id',
        name: 'home-edit',
        component: HomeEdit,
        meta: {
          requireAuth: true
        }
      }]
    }
  ]
})
