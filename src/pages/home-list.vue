<template>
  <div class="page">
    <div class="tools-wrap">
      <el-upload disabled  class="upload-demo" name="files" accept=".csv" :action="uploadUrl" :data="uploadData" :on-success="uploadSuccess" :on-error="uploadError" :show-file-list="false">
        <el-button type="primary" size="small" >
          <i class="el-icon-upload el-icon--right" ></i>导入</el-button>
      </el-upload>
      <form @submit="search">
        <el-input placeholder="请输入搜索关键字" type="search" v-model="params.name " size="small "></el-input>
        <el-button type="primary " native-type="submit" size="small ">
          搜索</el-button>
      </form>
    </div>
    <div class="wrap ">
      <el-table border stripe v-loading="loading " element-loading-text="拼命加载中 " :data="tableData ">
        <el-table-column prop="name" label="名称 " align="center ">
        </el-table-column>
        <el-table-column prop="lastModifiedDate" label="更新时间/日期 " width="200 " align="center " :formatter="dateFormat ">
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间/日期 " width="200 " align="center " :formatter="dateFormat ">
        </el-table-column>
        <el-table-column label="操作" width="200 " align="center ">
          <template slot-scope="scope ">
            <el-button type="primary " size="mini " @click="toState(scope.row, 'edit') ">编辑</el-button>
            <el-button type="danger " size="mini " @click="del(scope.row,scope.$index) ">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-wrap text-center padding ">
        <el-pagination background layout="prev, pager, next " :current-page="pageInfo.currentPage " :page-count="pageInfo.totalPages " :page-size="pageInfo.size " @current-change="changePage ">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { api, formatDate } from '@/utils'
export default {
  data () {
    return {
      loading: false,
      params: {
        page: 0,
        size: 10,
        name: ''
      },
      uploadUrl: api.import,
      uploadData: {
        propertyGroupId: this.$route.params.id
      },
      pageInfo: {},
      tableData: []
    }
  },
  methods: {
    uploadSuccess (e) {
      console.log(e)
      this.refresh()
      this.$message({
        type: 'success',
        duration: 2000,
        message: '上传成功!'
      })
    },
    uploadError (e) {
      console.log(e)
      this.$message({
        type: 'error',
        duration: 2000,
        message: '上传失败!'
      })
    },
    toState (row, type) {
      if (type === 'edit') {
        this.$router.push({
          name: 'home-edit',
          params: {
            id: row.pkId
          },
          query: {
            name: row.name
          }
        })
      }
    },
    del (row, index) {
      console.log(index)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$fly.delete(`${api.propertyId}/${row.pkId}`).then(() => {
          this.tableData.splice(index, 1)
          this.$message({
            type: 'success',
            duration: 2000,
            message: '删除成功!'
          })
        })
      }).catch(() => {
      })
    },
    search () {
      this.refresh()
    },
    changePage (e) {
      this.params.page = e - 1
      this.getData(this.params)
    },
    dateFormat (row, column) {
      let date = row[column.property]
      if (typeof date === 'number') date = new Date(date)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    getData: function (params) {
      this.loading = true
      params.propertyGroupId = this.$route.params.id
      this.$fly.get(api.findByPropertyGroupIdAndName, params).then(data => {
        let { page, _embedded } = data
        this.tableData = _embedded.propertyId
        this.pageInfo = page
        this.pageInfo.currentPage = page.number + 1
        this.loading = false
      })
    },
    setBreadData: function () {
      let { name, params, query } = this.$route
      let data = [{ name, params, query }]
      this.$store.commit('SET_BREAD_DATA', data)
    },
    refresh () {
      this.params.page = 0
      this.getData(this.params)
    }
  },
  watch: {
    '$route': function (to, from) {
      if (to.name === from.name) {
        this.refresh()
        this.setBreadData()
      }
    }
  },
  created () {
    console.log(this.$fly.config.baseURL)
    this.getData(this.params)
    this.setBreadData()
  }
}
</script>
<style lang="scss" scoped>
.tools-wrap {
  form {
    display: flex;
    .el-input {
      margin-right: 6px;
    }
  }
}
</style>
