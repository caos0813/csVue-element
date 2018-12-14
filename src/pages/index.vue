<template>
  <div class="page">
    <!-- <div class="first">知涯志愿</div>
    <div class="second">专题管理</div>
    <div class="three"></div> -->
    <!-- <div class="box-wrap">
      <router-link :to="{name:'xuanke/special-list'}" tag="a" class="ceil">
        专题
      </router-link>
      <router-link :to="{name:'xuanke/article-list'}" tag="a" class="ceil">
        文章
      </router-link>
      <router-link :to="{name:'xuanke/topic-list'}" tag="a" class="ceil">
        话题
      </router-link>
      <router-link :to="{name:'xuanke/volunteer-list'}" tag="a" class="ceil">
        开卡管理
      </router-link>
      <router-link :to="{name:'xuanke/volunteer-use'}" tag="a" class="ceil">
        志愿卡使用管理
      </router-link>
      <router-link :to="{name:'xuanke/feedback-list'}" tag="a" class="ceil">
        反馈
      </router-link>
      <router-link :to="{name:'xuanke/order-list'}" tag="a" class="ceil">
        订单
      </router-link>
      <router-link :to="{name:'xuanke/banner-list'}" tag="a" class="ceil">
        banner图
      </router-link>
    </div> -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>知涯志愿</el-breadcrumb-item>
      <el-breadcrumb-item>专题管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<style lang="scss" scoped>
.page {
  padding: 20px;
  .second {
    margin-left: 80px;
  }
  .three {
    margin-left: 80px;
  }
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
