<template>
  <div class="page">
    <div class="box-wrap">
      <router-link :to="{name:'subject-list'}" tag="a" class="ceil">
        专题
      </router-link>
      <router-link :to="{name:'article-list'}" tag="a" class="ceil">
        文章
      </router-link>
      <router-link :to="{name:'topic-list'}" tag="a" class="ceil">
        话题
      </router-link>
      <router-link :to="{name:'volunteer-list'}" tag="a" class="ceil">
        开卡管理
      </router-link>
      <router-link :to="{name:'volunteer-use'}" tag="a" class="ceil">
        志愿卡使用管理
      </router-link>
      <router-link :to="{name:'feedback'}" tag="a" class="ceil">
        反馈
      </router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page {
  padding: 20px;
}
.box-wrap {
  display: flex;
  .ceil {
    padding: 20px;
    border-radius: 5px;
    background: $color-primary;
    line-height: 40px;
    color: #fff;
    width: 120px;
    margin: 5px;
    text-align: center;
    font-size: 16px;
  }
}
</style>
