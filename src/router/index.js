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
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [{
        path: 'list/:id',
        name: 'home-list',
        component: HomeList
      }, {
        path: 'edit/:id',
        name: 'home-edit',
        component: HomeEdit
      }]
    }
  ]
})
