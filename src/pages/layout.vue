<template>
  <el-container :class="{'hideSidebar':isCollapse}">
    <!-- <el-header>
      <div class="logo" width="200px">JunYang Admin</div>
      <div class="bar">
        <i class="el-icon-d-arrow-left"></i>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown>
          <span>
            {{userName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu split-button slot="dropdown">
            <el-dropdown-item @click.native="signOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container> -->
    <!-- :collapse-transition="false" -->
    <div class="sidebar-container">
      <el-menu :default-active="$route.path" :default-openeds="defaultOpeneds" :show-timeout="200" :collapse="isCollapse" router @open="handleOpen" @close="handleClose">
        <el-menu-item index="" class="logo" popper-class="logo-popper">
          <i :class="{'hide':!isCollapse}">Jun</i>
          <span slot="title">JunYang Admin</span>
        </el-menu-item>
        <el-menu-item index="0" :route="{name:'index'}">
          <i class="el-icon-tickets"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu :index="(index+1).toString()" v-for="(item,index) in navData" :key="index">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>{{item.name}}</span>
          </template>
          <el-submenu :index="`${index+1}-${lIndex+1}`" v-for="(lItem,lIndex) in item.list" :key="lIndex">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{lItem.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="`${index+1}-${lIndex+1}-${sIndex+1}`" v-for="(sItem,sIndex) in lItem.subNav" :key="sIndex" :route="{name:`${sItem.url}`}">{{sItem.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
    <div class="main-container">
      <div class="bar">
        <div class="breadcrumb-wrap">
          <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" @click="collapse"></i>
          <el-menu :default-active="horizontalActiveIndex" class="el-menu-demo" mode="horizontal" text-color="#000" active-text-color="#fff" background-color="#409EFF">
            <el-menu-item index="0" :route="{name:'index'}">首页</el-menu-item>
            <!-- <el-menu-item index="1">知涯志愿</el-menu-item>
            <el-menu-item index="2" :route="{name:'xuanke/article-list'}">知涯选科</el-menu-item> -->
          </el-menu>
        </div>
        <el-dropdown>
          <span>
            {{userName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu split-button slot="dropdown">
            <el-dropdown-item @click.native="signOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </div>
    <!-- </el-container> -->
  </el-container>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      defaultOpeneds: ['2'],
      isCollapse: false,
      horizontalActiveIndex: '0',
      navData: [{
        name: '知涯志愿',
        list: [{
          name: '专题管理',
          subNav: [{
            name: '大学'
          }, {
            name: '专业'
          }, {
            name: '职业'
          }, {
            name: '生涯规划'
          }]
        }, {
          name: '文章管理',
          subNav: [{
            name: '大学'
          }, {
            name: '专业'
          }, {
            name: '职业'
          }, {
            name: '生涯规划'
          }, {
            name: '志愿问答'
          }]
        }, {
          name: 'banner管理',
          subNav: [{
            name: '首页',
            url: 'zhiyuan/banner-list'
          }, {
            name: '生涯规划'
          }]
        }, {
          name: '志愿卡管理',
          subNav: [{
            name: '开卡管理'
          }]
        }, {
          name: '系统管理',
          subNav: [{
            name: '权限管理',
            url: 'system/authority'
          }, {
            name: '用户管理'
          }]
        }]
      }, {
        name: '知涯选科',
        list: [{
          name: '内容管理',
          subNav: [{
            name: '专题',
            url: 'xuanke/special-list'
          }, {
            name: '文章',
            url: 'xuanke/article-list'
          }, {
            name: '话题',
            url: 'xuanke/topic-list'
          }]
        }, {
          name: '志愿卡管理',
          subNav: [{
            name: '开卡管理',
            url: 'xuanke/volunteer-list'
          }, {
            name: '使用管理',
            url: 'xuanke/volunteer-use'
          }]
        }, {
          name: '个人中心',
          subNav: [{
            name: '反馈',
            url: 'xuanke/feedback-list'
          }]
        }, {
          name: '交易管理',
          subNav: [{
            name: '订单',
            url: 'xuanke/order-list'
          }]
        }]
      }]
    }
  },
  computed: {
    userName () {
      return Cookies.get('user') ? JSON.stringify(Cookies.get('user')).userName : 'Admin'
    }
  },
  methods: {
    // 退出登录
    signOut () {
      Cookies.remove('user')
      this.$router.replace({
        name: 'login'
      })
    },
    // 展开/收缩
    collapse () {
      this.isCollapse = !this.isCollapse
    },
    handleOpen () { },
    handleClose () { }
  }
}
</script>
<style lang="scss" scoped>
$height: 60px;
$width: 200px;
.sidebar-container {
  transition: width 0.28s;
  width: $width !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  background: #eef1f6;
  overflow: hidden;
  .logo {
    height: $height;
    color: $light;
    text-align: center;
    font-size: $font-size-20;
    background-color: $color-primary;
    i {
      font-style: normal;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: $width;
    border: 1px solid red;
  }
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
}
// 主体区域
.main-container {
  width: 100%;
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $width;
  position: relative;
  .bar {
    display: flex;
    justify-content: space-between;
    background-color: $color-primary;
    padding-right: 20px;
    height: $height;
    align-items: center;
    color: $light;
    cursor: pointer;
    /deep/ .el-breadcrumb__inner,
    .el-dropdown {
      color: $light;
      cursor: pointer;
    }
    .breadcrumb-wrap {
      display: flex;
      align-items: center;
      > i {
        padding: 0 20px;
        line-height: $height;
        font-size: $font-size-18;
      }
      .el-menu--horizontal > .el-menu-item.is-active,
      .el-menu--horizontal > .el-menu-item {
        border-bottom-width: 0;
      }
    }
  }
}
.hideSidebar {
  .sidebar-container {
    width: 65px !important;
  }
  .main-container {
    margin-left: 65px;
  }
}
</style>
