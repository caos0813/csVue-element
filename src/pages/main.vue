<template>
  <div class="container">
    <div class="slide">
      <div class="bar light">
        JunYang OMS
      </div>
      <el-menu default-active="1" class="menu">
        <el-menu-item index="1">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <div class="bar"></div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
</script>
<style scoped lang="scss">
.container {
  height: 100%;
  display: flex;
  .slide {
    background: #495060;
    width: 200px;
    height: 100%;
    .menu {
      background: #495060;
      li {
        color: #fff;
        &.is-active {
          background: #363e4f;
        }
        &:hover {
          background: #363e4f;
        }
      }
    }
  }
  .main {
    flex: 1;
  }
  .bar {
    height: 50px;
    &.light {
      display: flex;
      align-items: center;
      justify-content: center;
      color: $light;
    }
  }
}
</style>
