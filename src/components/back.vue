<template>
  <el-button type="primary" icon="el-icon-arrow-left" size="small" circle @click="back"></el-button>
</template>
<script>
export default {
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
