export default {
  login: '/security/login',
  /* 查询所有类型 */
  productAll: '/product/queryAll',
  /* 获取所有省份 */
  // getProvinces: '/provinces/search/all',
  getProvinces: '/province/getAll',
  /* 获取已有省份 */
  getProvinceIds: '/send/getProvinceIds',
  /* 获取上传图片凭证 */
  uploadToken: 'secret/token',
  /* 专题 begin */
  // 列表
  querySpecialTopicInfo: 'specialTopicInfo/querySpecialTopicInfo',
  specialList: 'specialTopic/querySpecialTopic',
  // 详情
  specialDetail: 'specialTopic/queryById',
  queryOneSpecialTopicInfo: 'specialTopicInfo/queryOneSpecialTopicInfo',
  // 下架
  'xuanke/specialSoldOut': '/specialTopic/soldOut',
  'zhiyuan/specialSoldOut': 'specialTopicInfo/soldOutSpecialTopicInfo',
  // 删除
  'xuanke/specialDelete': '/specialTopic/delete',
  'zhiyuan/specialDelete': 'specialTopicInfo/deleteSpecialTopicInfo',
  // 新增修改
  specialHandle: '/specialTopic/saveAndUpdate',
  saveSpecialTopicInfo: 'specialTopicInfo/saveSpecialTopicInfo',
  /* 专题 end */
  /* 文章 begin */
  // 模块下的专题
  queryArticleInfoCondition: 'articleInfo/queryArticleInfoCondition',
  // 列表
  articleList: '/article/queryArticleByCondition',
  queryArticleInfoByCondition: 'articleInfo/queryArticleInfoByCondition',
  // 详情
  articleDetail: '/article/queryById',
  zhiyuan_articleDetail: 'articleInfo/queryById',
  // 删除
  'xuanke/articleDelete': '/article/delete',
  'zhiyuan/articleDelete': 'articleInfo/deleteArticleInfo',
  // 下架
  'xuanke/articleSoldOut': '/article/soldOut',
  'zhiyuan/articleSoldOut': 'articleInfo/soldOutArticleInfo',
  // 新增修改
  articleHandle: 'article/addAndUpdate',
  zhiyuan_articleHandle: 'articleInfo/addAndUpdate',
  // 定时发布
  articlePublishDelay: 'article/publishDelay',
  zhiyuan_articlePublishDelay: 'articleInfo/publishDelay',
  // 直接发布
  articlePublishNow: 'article/publishNow',
  zhiyuan_articlePublishNow: 'articleInfo/publishNow',
  /* 文章 end */
  /* 话题 begin */
  // 列表
  topicList: '/gambit/queryByCondition',
  // 详情
  topicDetail: '/gambit/queryById',
  // 删除
  'xuanke/topicDelete': '/gambit/delete',
  // 下架
  'xuanke/topicSoldOut': '/gambit/soldOut',
  // 新增修改
  topicHandle: '/gambit/addAndUpdate',
  // 定时发布
  gambitPublishDelay: 'gambit/publishDelay',
  // 直接发布
  gambitPublishNow: 'gambit/publishNow',
  // 评论列表
  queryCommentByThemeInfoId: 'comment/queryCommentByThemeInfoId',
  // 删除评论
  deleteCommentByCommentId: 'comment/deleteCommentByCommentId',
  /* 话题 end */
  /* 志愿卡开卡管理 begin */
  // 列表
  byCondition: '/membershipCardGenerateRecord/byCondition',
  // 生成志愿卡
  generate: '/membershipCard/generate',
  /* 根据会员卡id导出会员卡数据 的excel */
  exportByRecordId: '/membershipCard/exportByRecordId',
  /* 志愿卡开卡管理 end */
  /* 志愿卡使用管理 begin */
  getMembershipCards: '/membershipCard/byCondition',
  /* 志愿卡使用管理 end */
  /* 个人中心 begin */
  // 反馈列表
  getFeedback: 'feedback/getFeedback',
  /* 个人中心 end */
  /* 交易管理 begin */
  // 订单
  getOrderList: '/order/getListByCondition',
  /* 交易管理 end */
  /* banner begin */
  // 列表
  bannerList: '/banner/queryByCondition',
  zhiyuan_bannerList: 'bannerInfo/queryBannerInfo',
  // 详情
  bannerDetail: '/banner/getOne',
  zhiyuan_bannerDetail: 'bannerInfo/queryOneBannerInfo',
  // 模块-专题-文章
  bannerQueryCondition: 'bannerInfo/queryCondition',
  // 删除
  'xuanke/bannerDelete': 'banner/deleteByIds',
  'zhiyuan/bannerDelete': 'bannerInfo/deleteBannerInfo',
  // 下架
  'xuanke/bannerSoldOut': '/banner/soldOut',
  'zhiyuan/bannerSoldOut': 'bannerInfo/soldOutBannerInfo',
  // 直接发布
  bannerPublishNow: '/banner/publishNow',
  zhiyuan_bannerPublishNow: 'bannerInfo/directBannerInfo',
  // 定时发布
  bannerPublishDelay: '/banner/publishDelay',
  zhiyuan_bannerPublishDelay: 'bannerInfo/timingBannerInfo',
  // 草稿
  bannerSave: '/banner/save',
  zhiyuan_bannerSave: 'bannerInfo/draftBannerInfo',
  /* banner end */
  /* 系统管理 begin */
  // 用户列表
  getUsers: '/user/getUsers',
  // 用户账号是否存在
  nameIsExits: '/user/isExist/',
  existPassword: '/user/existPassword',
  // 重置密码
  resetPassword: '/user/resetPassword',
  // 详情
  userGetOne: '/user/getOne',
  // 删除
  'system/userDelete': '/user/delete',
  // 新增
  userSave: '/user/saveOrUpdate',
  // 角色列表
  getRoles: '/role/getRoles',
  // 新增
  roleSave: '/role/saveOrUpdate',
  // 删除
  roleDelete: '/role/delete/',
  // 详情
  roleGetOne: '/role/getOne',
  // 角色名是否已存在
  roleIsExist: 'role/existName',
  // 超级用户列表
  getSuperUsers: '/superUser/getSuperUsers',
  // 新增
  superUserSave: '/superUser/save',
  // 删除
  superUserDelete: '/superUser/delete',
  // app自动化升级
  appList: '/appVersion/getAppVersions',
  // 新增
  appSave: '/appVersion/save',
  // 版本号是否存在
  VersionIsExit: '/appVersion/isExist',
  /* 系统管理 end */
  /* 直接推送 */
  bannerSend: '/send/sendTo',
  /* 定时推送 */
  bannerSchedule: '/send/schedule'
}
