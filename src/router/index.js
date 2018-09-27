import Vue from 'vue'
import Router from 'vue-router'
import View from '@/pages/view'
import Index from '@/pages/index'
// import SpecialList from '@/pages/special-list'
// import ArticleList from '@/pages/article-list'
// import TopicList from '@/pages/topic-list'
// import Topic from '@/pages/topic'
// import Article from '@/pages/article'
// import Special from '@/pages/special'
// import VolunteerList from '@/pages/volunteer-list'
// import VolunteerUse from '@/pages/volunteer-use'
// import Login from '@/pages/login'
// import FeedbackList from '@/pages/feedback-list'

/* const Topic = r => require.ensure([], () => r(require('@/pages/topic')), 'topic')
const ArticleList = r => require.ensure([], () => r(require('@/pages/article-list')), 'article')
const Article = r => require.ensure([], () => r(require('@/pages/article')), 'article')
const SpecialList = r => require.ensure([], () => r(require('@/pages/special-list')), 'special')
const Special = r => require.ensure([], () => r(require('@/pages/special')), 'special')
const VolunteerList = r => require.ensure([], () => r(require('@/pages/volunteer-list')), 'volunteer')
const VolunteerUse = r => require.ensure([], () => r(require('@/pages/volunteer-use')), 'volunteer')
const FeedbackList = r => require.ensure([], () => r(require('@/pages/feedback-list')), 'feedbackList')
const Login = resolve => { require(['@/pages/login.vue'], resolve) }
const TopicList = resolve => { require(['@/pages/topic-list.vue'], resolve) } */

const Topic = () => import('@/pages/topic')
const ArticleList = () => import('@/pages/article-list')
const Article = () => import('@/pages/article')
const SpecialList = () => import('@/pages/special-list')
const Special = () => import('@/pages/special')
const VolunteerList = () => import('@/pages/volunteer-list')
const VolunteerUse = () => import('@/pages/volunteer-use')
const FeedbackList = () => import('@/pages/feedback-list')
const Login = () => import('@/pages/login')
const TopicList = () => import('@/pages/topic-list')

// const TopicList = r => require.ensure([], () => r(require('../../common/home.vue')))
// const TopicList = () => Promise.resolve({ '@/pages/topic-list.vue' })

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
      path: '/view',
      component: View,
      redirect: { name: 'index' },
      meta: {
        requireAuth: true
      },
      children: [{
        path: '/index',
        name: 'index',
        component: Index,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/special-list',
        name: 'special-list',
        component: SpecialList,
        meta: {
          requireAuth: true
        }
      }, {
        path: '/special/:type',
        name: 'special',
        component: Special,
        meta: {
          requireAuth: true
        }
      }, {
        path: '/article-list',
        name: 'article-list',
        component: ArticleList,
        meta: {
          requireAuth: true
        }
      }, {
        path: '/article/:type',
        name: 'article',
        component: Article,
        meta: {
          requireAuth: true
        }
      }, {
        path: '/topic-list',
        name: 'topic-list',
        component: TopicList,
        meta: {
          requireAuth: true
        }
      }, {
        path: '/topic/:type',
        name: 'topic',
        component: Topic,
        meta: {
          requireAuth: true
        }
      }, {
        path: '/volunteer-list',
        name: 'volunteer-list',
        component: VolunteerList,
        meta: {
          requireAuth: true
        }
      }, {
        path: '/volunteer-use',
        name: 'volunteer-use',
        component: VolunteerUse,
        meta: {
          requireAuth: true
        }
      }, {
        path: '/feedback-list',
        name: 'feedback-list',
        component: FeedbackList,
        meta: {
          requireAuth: true
        }
      }]
    }
  ]
})
