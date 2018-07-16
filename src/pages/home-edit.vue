<template>
  <div class="page">
    <div class="tools-wrap">
      编辑“{{infoData.name}}”
    </div>
    <div class="form-wrap">
      <el-form label-position="right" label-width="200px">
        <el-form-item :label="item.name" v-for="(item,index) in infoData.propertyValues" :key="index">
          <el-input v-model="item.value" type="textarea" autosize></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { api } from '@/utils'
export default {
  data () {
    return {
      labelPosition: 'right',
      infoData: {}
    }
  },
  methods: {
    onSubmit () {
      let params = {
        id: this.$route.params.id
      }
      params.propertyValues = JSON.parse(JSON.stringify(this.infoData.propertyValues))
      this.$fly.post(api.property, params).then(data => {
        this.$message({
          message: '修改成功',
          duration: 2000,
          type: 'success'
        })
        this.$router.go(-1)
      })
    },
    setBreadData: function () {
      let { name, params, query } = this.$route
      let data = [...this.$store.state.breadData, {
        name, params, query
      }]
      this.$store.commit('SET_BREAD_DATA', data)
    }
  },
  activated () {
    console.log('created')
    this.setBreadData()
    this.$fly.get(`${api.propertySearch}${this.$route.params.id}`).then(data => {
      this.infoData = data
    })
  }
}
</script>
<style lang="scss" scoped>
.tools-wrap {
  margin-bottom: 0;
}
.page {
  box-shadow: 0 1px 5px #ddd;
}
.form-wrap {
  padding: 30px;
  /deep/ .el-form {
    width: 70%;
    .el-form-item__label {
      color: #999;
    }
    .el-textarea__inner {
      color: $dark;
      padding: 8px 15px;
      min-height: 40px !important;
    }
  }
}
</style>
