// TODO:import store from '@/store'
import Cookies from 'js-cookie'
function getNavJson () {
  let data = [{
    id: '1',
    name: '知涯志愿',
    depth: 3,
    subNav: [{
      id: '1-1',
      name: '专题管理',
      subNav: [{
        id: '1-1-1',
        name: '大学',
        url: 'zhiyuan/special-list',
        type: 'college',
        auth: 'zhiyuan-special-college'
      }, {
        id: '1-1-2',
        name: '专业',
        url: 'zhiyuan/special-list',
        type: 'major',
        auth: 'zhiyuan-special-major'
      }, {
        id: '1-1-3',
        name: '职业',
        url: 'zhiyuan/special-list',
        type: 'profession',
        auth: 'zhiyuan-special-profession'
      }, {
        id: '1-1-4',
        name: '首页',
        url: 'zhiyuan/special-list',
        type: 'index',
        auth: 'zhiyuan-special-index'
      }, {
        id: '1-1-5',
        name: '生涯规划',
        url: 'zhiyuan/special-list',
        type: 'career-plan',
        auth: 'zhiyuan-special-career-plan'
      }, {
        id: '1-1-6',
        name: '志愿问答',
        url: 'zhiyuan/special-list',
        type: 'volunteer-questions',
        auth: 'zhiyuan-special-volunteer-questions'
      }],
      auth: function () {
        return secondAuth(this.subNav)
      }
    }, {
      id: '1-2',
      name: '文章管理',
      subNav: [{
        id: '1-2-1',
        name: '大学',
        url: 'zhiyuan/article-list',
        type: 'college',
        auth: 'zhiyuan-article-college'
      }, {
        id: '1-2-2',
        name: '专业',
        url: 'zhiyuan/article-list',
        type: 'major',
        auth: 'zhiyuan-article-major'
      }, {
        id: '1-2-3',
        name: '职业',
        url: 'zhiyuan/article-list',
        type: 'profession',
        auth: 'zhiyuan-article-profession'
      }, {
        id: '1-2-4',
        name: '首页',
        url: 'zhiyuan/article-list',
        type: 'index',
        auth: 'zhiyuan-article-index'
      }, {
        id: '1-2-5',
        name: '生涯规划',
        url: 'zhiyuan/article-list',
        type: 'career-plan',
        auth: 'zhiyuan-article-career-plan'
      }, {
        id: '1-2-6',
        name: '志愿问答',
        url: 'zhiyuan/article-list',
        type: 'volunteer-questions',
        auth: 'zhiyuan-article-volunteer-questions'
      }],
      auth: function () {
        return secondAuth(this.subNav)
      }
    }, {
      id: '1-3',
      name: 'banner管理',
      subNav: [{
        id: '1-3-1',
        name: '首页',
        url: 'zhiyuan/banner-list',
        type: 'index',
        auth: 'zhiyuan-banner-index'
      }, {
        id: '1-3-2',
        name: '生涯规划',
        url: 'zhiyuan/banner-list',
        type: 'career-plan',
        auth: 'zhiyuan-banner-career-plan'
      }],
      auth: function () {
        return secondAuth(this.subNav)
      }
    }],
    auth: function () {
      return firstAuth(this.subNav)
    }
  }, {
    id: '2',
    name: '知涯选科',
    depth: 3,
    subNav: [{
      id: '2-1',
      name: '内容管理',
      subNav: [{
        id: '2-1-1',
        name: '专题',
        url: 'xuanke/special-list',
        auth: 'xuanke-special-list'
      }, {
        id: '2-1-2',
        name: '文章',
        url: 'xuanke/article-list',
        auth: 'xuanke-article-list'
      }, {
        id: '2-1-3',
        name: '话题',
        url: 'xuanke/topic-list',
        auth: 'xuanke-topic-list'
      }],
      auth: function () {
        return secondAuth(this.subNav)
      }
    }],
    auth: function () {
      return firstAuth(this.subNav)
    }
  }, {
    id: '3',
    name: '知涯卡管理',
    depth: 2,
    subNav: [{
      id: '3-1',
      name: '开卡管理',
      url: 'volunteer/card',
      auth: function () {
        return 'volunteer-card'
      }
    }, {
      id: '3-2',
      name: '使用管理',
      url: 'volunteer/use',
      auth: function () {
        return 'volunteer-use'
      }
    }],
    auth: function () {
      return firstAuth2(this.subNav)
    }
  }, {
    id: '4',
    name: '个人中心',
    depth: 2,
    subNav: [{
      id: '4-1',
      name: '反馈',
      url: 'feedback/list',
      auth: function () {
        return 'feedback-list'
      }
    }],
    auth: function () {
      return firstAuth2(this.subNav)
    }
  }, {
    id: '5',
    name: '交易管理',
    depth: 2,
    subNav: [{
      id: '5-1',
      name: '订单',
      url: 'order/list',
      auth: function () {
        return 'order'
      }
    }],
    auth: function () {
      return firstAuth2(this.subNav)
    }
  }, {
    id: '6',
    name: '系统管理',
    depth: 2,
    subNav: [{
      id: '6-1',
      name: '权限管理',
      url: 'system/authority',
      auth: function () {
        return 'system-authority'
      }
    }, {
      id: '6-2',
      name: '用户管理',
      url: 'system/user-list',
      auth: function () {
        return 'system-user'
      }
    }, {
      id: '6-3',
      name: '超级用户',
      url: 'system/super-user',
      auth: function () {
        return 'system-super-user'
      }
    }, {
      id: '6-4',
      name: 'APP自动升级',
      url: 'system/app-list',
      auth: function () {
        return 'system-appUpdate'
      }
    }],
    auth: function () {
      return firstAuth2(this.subNav)
    }
  }]
  return data
}
/**
 * 如果没有第三级的权限，则第二级不显示
 * @param subNav '第二级菜单'
 */
function secondAuth (subNav) {
  let authority = Cookies.getJSON('user').authority
  // TODO:let authority = store.state.authority
  let result = false
  for (let i = 0; i < subNav.length; i++) {
    if (subNav[i].auth !== undefined) {
      // store.state.authority.map(authItem => {
      authority.map(authItem => {
        if (subNav[i].auth === authItem) {
          result = true
        }
      })
    }
  }
  return result
}
/**
 * 如果没有第二级的权限，则第一级不显示
 * @param list '第二级菜单'
 */
function firstAuth (list) {
  let result = false
  for (let i = 0; i < list.length; i++) {
    if (list[i].auth()) {
      result = true
    }
  }
  return result
}
/**
 * 只有两级的情况下，第一级权限显示问题
 * @param  subNav 第二级菜单
 */
function firstAuth2 (subNav) {
  let result = false
  let authority = Cookies.getJSON('user').authority
  // TODO:let authority = store.state.authority
  // store.commit('SET_AUTHORITY', authority)
  for (let i = 0; i < subNav.length; i++) {
    // store.state.authority.map(authItem => {
    authority.map(authItem => {
      if (subNav[i].auth() === authItem) {
        result = true
      }
    })
  }
  return result
}
export default getNavJson
