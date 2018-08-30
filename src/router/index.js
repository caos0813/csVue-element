import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import View from '@/pages/view'
import Index from '@/pages/index'
import SubjectList from '@/pages/subject-list'
import ArticleList from '@/pages/article-list'
import TopicList from '@/pages/topic-list'
import Topic from '@/pages/topic'
import Article from '@/pages/article'
import Subject from '@/pages/subject'
import VolunteerList from '@/pages/volunteer-list'
import VolunteerUse from '@/pages/volunteer-use'
import Feedback from '@/pages/feedback'
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
        path: '/subject-list',
        name: 'subject-list',
        component: SubjectList,
        meta: {
          requireAuth: true
        }
      }, {
        path: '/subject/:type',
        name: 'subject',
        component: Subject,
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
        component: VolunteerList
      }, {
        path: '/volunteer-use',
        name: 'volunteer-use',
        component: VolunteerUse
      }, {
        path: '/feedback',
        name: 'feedback',
        component: Feedback
      }]
    }
  ]
})
