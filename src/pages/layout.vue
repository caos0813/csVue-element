<template>
  <el-container class="container" :class="{'hideSidebar':isCollapse}">
    <el-header>
      <div class="logo">JunYang System</div>
      <div class="bar">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
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
    <el-container class="main-container">
      <el-aside class="aside">
        <el-menu default-active="0" :default-openeds="defaultOpeneds" :collapse="isCollapse" router>
          <el-menu-item index="0" :route="{name:'index'}">
            <i class="el-icon-tickets"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu :index="(index+1).toString()" v-for="(item,index) in navData" :key="index" v-if="item.auth()">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item :index="`${index+1}-${lIndex+1}`" v-for="(lItem,lIndex) in item.subNav" :key="lIndex" :route="{name:`${lItem.url}`}" v-if="`${lItem.subNav}` === 'undefined'&&hasAuth(`${lItem.auth()}`)">{{lItem.name}}</el-menu-item>
            <el-submenu :index="`${index+1}-${lIndex+1}`" v-for="(lItem,lIndex) in item.subNav" :key="lIndex" v-if="`${lItem.subNav}` !== 'undefined'&&lItem.auth()">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{lItem.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="`${index+1}-${lIndex+1}-${sIndex+1}`" v-for="(sItem,sIndex) in lItem.subNav" :key="sIndex" :route="{name:`${sItem.url}`,params:{type:`${sItem.type}`}}" v-if="hasAuth(`${sItem.auth}`)">
                  {{sItem.name}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Cookies from 'js-cookie'
import { getNavJson } from '@/utils'
export default {
  data () {
    return {
      defaultOpeneds: ['1'],
      isCollapse: false,
      horizontalActiveIndex: '0',
      navData: getNavJson()
    }
  },
  computed: {
    userName () {
      let { userName } = Cookies.getJSON('user') ? Cookies.getJSON('user') : ''
      return userName
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
    }
  }
}
</script>
<style lang="scss" scoped>
$height: 60px;
$width: 220px;
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .el-header {
    padding: 0;
    display: flex;
    .logo {
      width: $width;
      line-height: $height;
      height: 100%;
      color: $light;
      text-align: center;
      font-size: $font-size-20;
      background-color: $color-primary;
      border-right: 1px solid rgba(255, 255, 255, 0.3);
    }
    .bar {
      flex: 1;
      display: flex;
      justify-content: space-between;
      background-color: $color-primary;
      padding: 0 20px;
      height: $height;
      align-items: center;
      color: $light;
      cursor: pointer;
      /deep/ .el-breadcrumb__inner,
      .el-dropdown {
        color: $light;
        cursor: pointer;
      }
    }
  }
  .main-container {
    height: 100%;
    .aside {
      width: $width !important;
      background-color: $gray-ee;
      overflow-x: hidden;
      .el-menu-item {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
/deep/ {
  .tools-bar,
  .page-wrap {
    left: $width;
  }
}
</style>
