<template>
  <el-container class="container">
    <el-header class="el-header">
      <div class="logo">JunYang OMS</div>
      <div class="bar">
        <i class="el-icon-menu menu"></i>
        <el-dropdown>
          <span class="el-dropdown-link">
            admin
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="main-container">
      <el-aside class="aside">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :collapse="isCollapse" router>
          <el-menu-item :index='item.pkId.toString()' v-for="(item,index) in listData" :key="index" :route="{name:'home-list',params:{id:item.pkId},query:{name:item.name}}">
            <i class="el-icon-star-on"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <div class="tool-bar">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="item" v-for="(item,index) in breadData" :key="index">{{item.query.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
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
import { api } from '@/utils'
export default {
  data () {
    return {
      isCollapse: false,
      title: '',
      listData: []
    }
  },
  computed: {
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
  created () {
    this.$fly.get(api.propertyGroup, {
      page: 0,
      size: 100
    }).then(data => {
      console.log(data)
      this.listData = data._embedded.propertyGroup
      /* this.$router.replace({
        name: 'home-list',
        params: {
          id: this.listData[0].pkId
        },
        query: {
          name: this.listData[0].name
        }
      }) */
    })
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
  align-items: stretch;
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
  padding: 20px;
}
</style>
