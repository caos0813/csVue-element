import store from '@/store'
function getNavJson () {
  let data = [{
    name: '知涯志愿',
    subNav: [{
      name: '专题管理',
      subNav: [{
        name: '大学',
        url: 'zhiyuan/special-list',
        type: 'college',
        auth: 'zhiyuan-special-college'
      }, {
        name: '专业',
        url: 'zhiyuan/special-list',
        type: 'major',
        auth: 'zhiyuan-special-major'
      }, {
        name: '职业',
        url: 'zhiyuan/special-list',
        type: 'profession',
        auth: 'zhiyuan-special-profession'
      }, {
        name: '首页',
        url: 'zhiyuan/special-list',
        type: 'index',
        auth: 'zhiyuan-special-index'
      }, {
        name: '生涯规划',
        url: 'zhiyuan/special-list',
        type: 'career-plan',
        auth: 'zhiyuan-special-career-plan'
      }, {
        name: '志愿问答',
        url: 'zhiyuan/special-list',
        type: 'volunteer-questions',
        auth: 'zhiyuan-special-volunteer-questions'
      }],
      auth: function () {
        return secondAuth(this.subNav)
      }
    }, {
      name: '文章管理',
      subNav: [{
        name: '大学',
        url: 'zhiyuan/article-list',
        type: 'college',
        auth: 'zhiyuan-article-college'
      }, {
        name: '专业',
        url: 'zhiyuan/article-list',
        type: 'major',
        auth: 'zhiyuan-article-major'
      }, {
        name: '职业',
        url: 'zhiyuan/article-list',
        type: 'profession',
        auth: 'zhiyuan-article-profession'
      }, {
        name: '首页',
        url: 'zhiyuan/article-list',
        type: 'index',
        auth: 'zhiyuan-article-index'
      }, {
        name: '生涯规划',
        url: 'zhiyuan/article-list',
        type: 'career-plan',
        auth: 'zhiyuan-article-career-plan'
      }, {
        name: '志愿问答',
        url: 'zhiyuan/article-list',
        type: 'volunteer-questions',
        auth: 'zhiyuan-article-volunteer-questions'
      }],
      auth: function () {
        return secondAuth(this.subNav)
      }
    }, {
      name: 'banner管理',
      subNav: [{
        name: '首页',
        url: 'zhiyuan/banner-list',
        type: 'index',
        auth: 'zhiyuan-banner-index'
      }, {
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
    name: '知涯选科',
    subNav: [{
      name: '内容管理',
      subNav: [{
        name: '专题',
        url: 'xuanke/special-list',
        auth: 'xuanke-special-list'
      }, {
        name: '文章',
        url: 'xuanke/article-list',
        auth: 'xuanke-article-list'
      }, {
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
    name: '志愿卡管理',
    subNav: [{
      name: '开卡管理',
      url: 'volunteer/card',
      auth: function () {
        return 'volunteer-card'
      }
    }, {
      name: '使用管理',
      url: 'volunteer/use',
      auth: function () {
        return 'volunteer-use'
      }
    }],
    auth: function () {
      return firstAuth(this.subNav)
    }
  }, {
    name: '个人中心',
    subNav: [{
      name: '反馈',
      url: 'feedback/list',
      auth: function () {
        return 'feedback-list'
      }
    }],
    auth: function () {
      return firstAuth(this.subNav)
    }
  }, {
    name: '交易管理',
    subNav: [{
      name: '订单',
      url: 'order/list',
      auth: function () {
        return 'order'
      }
    }],
    auth: function () {
      return firstAuth(this.subNav)
    }
  }, {
    name: '系统管理',
    subNav: [{
      name: '权限管理',
      url: 'system/authority',
      auth: function () {
        return 'system-authority'
      }
    }, {
      name: '用户管理',
      url: 'system/user',
      auth: function () {
        return 'system-user'
      }
    }, {
      name: '超级用户',
      url: 'system/super-user',
      auth: function () {
        return 'system-super-user'
      }
    }, {
      name: 'APP自动升级',
      url: 'system/super-user',
      auth: function () {
        return 'system-super-user'
      }
    }],
    auth: function () {
      return firstAuth(this.subNav)
    }
  }]
  return data
}
/**
 * 如果没有第三级的权限，则第二级不显示
 * @param subNav '第二级菜单'
 */
function secondAuth (subNav) {
  let result = false
  for (let i = 0; i < subNav.length; i++) {
    if (subNav[i].auth !== undefined) {
      store.state.authority.map(authItem => {
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
export default getNavJson
