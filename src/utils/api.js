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
  topicHandle: '/gambit/addAndUpdate'
  /* 话题 end */
}
