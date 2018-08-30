export default {
  login: '/security/login',
  getProvinces: '/provinces/search/all', // 获取所有省份
  generate: '/membershipCard/generate', // 生成志愿卡
  byCondition: '/membershipCardGenerateRecord/byCondition', // 获取志愿卡
  getMembershipCards: '/membershipCard/byCondition', // 获取会员卡
  exportByRecordId: '/membershipCard/exportByRecordId', // 导出
  getFeedback: 'feedback/getFeedback', // 获取反馈列表
  uploadToken: 'secret/token', //  获取上传图片凭证
  productAll: '/product/queryAll', //  查询所有类型
  specialDelete: '/specialTopic/delete', // 删除专题
  specialSoldOut: '/specialTopic/soldOut', // 下架专题
  specialDetail: 'specialTopic/queryById', // 专题详情
  specialHandle: '/specialTopic/saveAndUpdate', // 新增修改专题
  specialList: 'specialTopic/querySpecialTopic', // 查询专题列表
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
  topicDeleteVote: 'gambit/deleteVote'
}
