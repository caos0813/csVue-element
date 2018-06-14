<template>
  <div id="app">
    <el-container id="app">
      <router-view/>
    </el-container>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style type="scss" scoped>
html,
style,#app {
  height: 100%;
}
</style>
