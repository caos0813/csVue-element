export default {
  login: '/security/login',
  /* 获取所有省份 */
  getProvinces: '/provinces/search/all',
  /* 生成志愿卡 */
  generate: '/membershipCard/generate',
  /* 获取志愿卡 */
  byCondition: '/membershipCardGenerateRecord/byCondition',
  /* 获取会员卡 */
  getMembershipCards: '/membershipCard/byCondition',
  /* 根据会员卡id导出会员卡数据 的excel */
  exportByRecordId: '/membershipCard/exportByRecordId',
  /* 获取导出会员卡excel的token （需要登录） */
  exportToken: 'membershipCard/exportToken/generate',
  /* 获取反馈列表 */
  getFeedback: 'feedback/getFeedback',
  /* 获取上传图片凭证 */
  uploadToken: 'secret/token',
  /* 查询所有类型 */
  productAll: '/product/queryAll',
  /* 删除专题 */
  specialDelete: '/specialTopic/delete',
  /* 下架专题 */
  specialSoldOut: '/specialTopic/soldOut',
  /* 专题详情 */
  specialDetail: 'specialTopic/queryById',
  /* 新增修改专题 */
  specialHandle: '/specialTopic/saveAndUpdate',
  /* 查询专题列表 */
  specialList: 'specialTopic/querySpecialTopic',
  /* 文章列表 */
  articleList: '/article/queryArticleByCondition',
  articleDetail: '/article/queryById',
  articleDelete: '/article/delete',
  articleSoldOut: '/article/soldOut',
  articleHandle: 'article/addAndUpdate',
  topicList: '/gambit/queryByCondition',
  topicHandle: '/gambit/addAndUpdate',
  topicDelete: '/gambit/delete',
  topicSoldOut: '/gambit/soldOut',
  topicDetail: '/gambit/queryById',
  topicHot: '/gambit/setHot',
  topicDeleteVote: 'gambit/deleteVote',
  /* 话题定时发布 */
  gambitPublishDelay: 'gambit/publishDelay',
  /* 话题立即发布 */
  gambitPublishNow: 'gambit/publishNow',
  /* 文章定时发布 */
  articlePublishDelay: 'article/publishDelay',
  /* 文章立即发布 */
  articlePublishNow: 'article/publishNow',
  /* 订单列表 */
  getOrderList: '/order/getListByCondition',
  /* banner图管理列表 */
  bannerList: '/banner/queryByCondition',
  /* banner图-保存为草稿 */
  bannerSave: '/banner/save',
  /* banner图-直接发布 */
  bannerPublishNow: '/banner/publishNow',
  /* banner图-定时发布 */
  bannerPublishDelay: '/banner/publishDelay',
  /* banner图-下架 */
  bannerSoldOut: '/banner/soldOut',
  /* banner图-删除 */
  bannerDelete: 'banner/deleteByIds',
  /* banner图-新增/编辑banner图 /banner/getOne */
  bannerDetail: '/banner/getOne',
  /* 直接推送 */
  bannerSend: '/send/sendTo',
  /* 定时推送 */
  bannerSchedule: '/send/schedule',
  /* 获取已有省份 */
  getProvinceIds: '/send/getProvinceIds',
  /* 话题评论列表 */
  queryCommentByThemeInfoId: 'comment/queryCommentByThemeInfoId',
  /* 话题删除评论 */
  deleteCommentByCommentId: 'comment/deleteCommentByCommentId'
}
