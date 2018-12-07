export default {
  login: '/security/login',
  /* 查询所有类型 */
  productAll: '/product/queryAll',
  /* 获取所有省份 */
  getProvinces: '/provinces/search/all',
  /* 获取已有省份 */
  getProvinceIds: '/send/getProvinceIds',
  /* 获取上传图片凭证 */
  uploadToken: 'secret/token',
  /* 专题 begin */
  // 列表
  specialList: 'specialTopic/querySpecialTopic',
  // 详情
  specialDetail: 'specialTopic/queryById',
  // 下架
  specialSoldOut: '/specialTopic/soldOut',
  // 删除
  specialDelete: '/specialTopic/delete',
  // 新增修改
  specialHandle: '/specialTopic/saveAndUpdate',
  /* 专题 end */
  /* 文章 begin */
  // 列表
  articleList: '/article/queryArticleByCondition',
  // 详情
  articleDetail: '/article/queryById',
  // 删除
  articleDelete: '/article/delete',
  // 下架
  articleSoldOut: '/article/soldOut',
  // 新增修改
  articleHandle: 'article/addAndUpdate',
  // 定时发布
  articlePublishDelay: 'article/publishDelay',
  // 直接发布
  articlePublishNow: 'article/publishNow',
  /* 文章 end */
  /* 话题 begin */
  // 列表
  topicList: '/gambit/queryByCondition',
  // 详情
  topicDetail: '/gambit/queryById',
  // 删除
  topicDelete: '/gambit/delete',
  // 下架
  topicSoldOut: '/gambit/soldOut',
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
  // 详情
  bannerDetail: '/banner/getOne',
  // 删除
  bannerDelete: 'banner/deleteByIds',
  // 下架
  bannerSoldOut: '/banner/soldOut',
  // 直接发布
  bannerPublishNow: '/banner/publishNow',
  // 定时发布
  bannerPublishDelay: '/banner/publishDelay',
  // 草稿
  bannerSave: '/banner/save'
  /* banner end */
}
