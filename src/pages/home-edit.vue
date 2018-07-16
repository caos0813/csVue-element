<template>
  <div class="page">
    <div class="tools-wrap">
      编辑“{{infoData.name}}”
    </div>
    <div class="form-wrap">
      <el-form label-position="right" label-width="200px">
        <el-form-item :label="item.propertyName.name" v-for="(item,index) in infoData.propertyValues" :key="index">
          <el-input v-if="item.propertyName.istable===false" v-model="item.value" type="textarea" autosize></el-input>
          <!-- <Table size="large" :columns="item.table.columns" :data="data1"></Table> -->
          <el-table :header-row-class-name="setHeaderRow" size="small" border stripe v-else :data="item.tableData.tbody" style="width: 100%">
            <el-table-column align="center" :prop="`key${index}`" :label="item.title" v-for="(item,index) in item.tableData.thead" :key="index">
              <template slot-scope="scope ">
                <el-input size="mini" clearable v-if="scope.row[index]" v-model="scope.row[index]" ></el-input>
              </template>
            </el-table-column>
          </el-table>
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
    setHeaderRow () {
      return 'thead'
    },
    onSubmit () {
      let params = {
        id: this.$route.params.id.toString(),
        propertyValues: []
      }
      this.infoData.propertyValues.forEach((item, index) => {
        if (item.id !== null) {
          if (item.value instanceof Array) {
            item.value = JSON.stringify(item.value)
          }
          params.propertyValues.push(
            {
              'id': item.id,
              'value': item.value
            }
          )
        } else {
          params.propertyValues.push(
            {
              'value': item.value,
              'propertyName': {
                id: item.propertyName.id
              }
            }
          )
        }
      })
      this.$fly.post(api.property, params).then(data => {
        this.$message({
          message: '修改成功',
          duration: 2000,
          type: 'success'
        })
        this.$router.go(-1)
      })
    },
    getTableData (obj) {
      let tableData = {
        thead: [],
        tbody: []
      }
      for (let index = 0; index < obj.length; index++) {
        let item = obj[index]
        tableData.thead.push({
          title: item.key
        })
        item.value.forEach((ceil, i) => {
          let a = tableData.tbody[i] = tableData.tbody[i] || {}
          a[index] = ceil.key
        })
      }
      return tableData
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
      data.propertyValues[4].propertyName.istable = true
      data.propertyValues.forEach((item, index) => {
        if (item.propertyName.istable) {
          if (item.value !== null) {
            item.value = JSON.parse(item.value)
          } else {
            item.value = []
          }
          item.tableData = this.getTableData(item.value)
        }
      })
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
  /deep/ .el-table__header {
    .thead,
    .thead th {
      background: #f1f1f1;
      font-weight: bold;
      color: #111;
      font-size: 15px;
      padding: 3px 0;
    }
  }
}
</style>
