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
      <el-menu default-active="0" :show-timeout="200" :collapse="isCollapse" router @open="handleOpen" @close="handleClose">
        <el-menu-item index="0" class="logo" popper-class="logo-popper">
          <!-- <div></div> -->
          <i :class="{'hide':!isCollapse}">Jun</i>
          <span slot="title">JunYang Admin</span>
        </el-menu-item>
        <el-menu-item index="0">
          <i class="el-icon-tickets"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>知涯志愿</span>
          </template>
          <el-submenu index="1-1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>专题</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1-1">大学</el-menu-item>
              <el-menu-item index="1-1-2">专业</el-menu-item>
              <el-menu-item index="1-1-3">职业</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span slot="title">知涯选科</span>
          </template>
          <el-submenu index="2-1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>文章</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1-1" :route="{name:'xuanke/article-list'}">大学</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
    <div class="main-container">
      <div class="bar">
        <div class="breadcrumb-wrap">
          <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" @click="collapse"></i>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
          </el-breadcrumb>
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
      isCollapse: false
    }
  },
  computed: {
    userName () {
      return Cookies.get('user') ? JSON.stringify(Cookies.get('user')).userName : 'Admin'
    }
  },
  methods: {
    signOut () {
      Cookies.remove('user')
      this.$router.replace({
        name: 'login'
      })
    },
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
