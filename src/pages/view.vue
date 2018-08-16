<template>
  <el-container class="container">
    <el-header class="el-header">
      <div class="logo">JunYang Admin</div>
      <div class="bar">
        <div class="breadcrumb-wrap">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
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
        <el-menu default-active="0" class="el-menu-vertical-demo" :collapse="isCollapse" :default-openeds='defaultOpeneds' router>
          <el-menu-item index="0" :route="{name:'index'}">
            <i class="el-icon-tickets"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>内容管理</span>
            </template>
            <el-menu-item index="1-1" :route="{name:'subject-list'}">专题</el-menu-item>
            <el-menu-item index="1-2" :route="{name:'article-list'}">文章</el-menu-item>
            <el-menu-item index="1-3" :route="{name:'topic-list'}">话题</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <transition name="el-fade-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      defaultOpeneds: ['1'],
      isCollapse: false,
      title: '',
      listData: []
    }
  },
  computed: {
    userName () {
      return Cookies.get('user') ? JSON.parse(Cookies.get('user')).userName : ''
    },
    activeIndex () {
      let index = this.$route.params.id
      if (typeof index === 'number') {
        index = index.toString()
      }
      return index
    },
    breadData () {
      return this.$store.state.breadData
    }
  },
  methods: {
    signOut () {
      Cookies.remove('user')
      this.$router.replace({
        name: 'login'
      })
    }
  },
  created () {
  }
}

</script>

<style scoped lang="scss">
$width: 200px;
.el-header {
  padding: 0;
  display: flex;
}
.logo {
  height: 100%;
  background: $color-primary;
  width: $width;
  font-size: 20px;
  text-align: center;
  color: $light;
  line-height: 60px;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
}
.tool-bar {
  height: 56px;
  border-bottom: 1px solid $gray;
}
.breadcrumb-wrap {
  /deep/ .el-breadcrumb__inner {
    color: $light;
  }
}
.bar {
  background: $color-primary;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  color: $light;
  padding: 0 20px;
  justify-content: space-between;
  .el-dropdown-link {
    color: $light;
    cursor: pointer;
  }
  .menu {
    font-size: 24px;
  }
}
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.main-container {
  //  align-items: stretch;
  height: 100%;
}

.aside {
  width: $width !important;
  background: #eef1f6;
  overflow-x: hidden;
  .el-menu-item {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.main {
  height: 100%;
  position: relative;
}
</style>
