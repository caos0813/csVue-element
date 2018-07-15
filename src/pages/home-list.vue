<template>
  <div class="page">
    <div class="tools-wrap">
      <el-button type="primary" size="small">
        <i class="el-icon-upload el-icon--right"></i>导入</el-button>
      <form action="">
        <el-input :placeholder="query.name" v-model="params.name" size="small"></el-input>
        <el-button type="primary" size="small" @click="search">
          搜索</el-button>
      </form>
    </div>
    <div class="wrap">
      <el-table border stripe v-loading="loading" element-loading-text="拼命加载中" :data="tableData">
        <el-table-column prop="name" label="名称" align="center">
        </el-table-column>
        <el-table-column prop="lastModifiedDate" label="更新时间/日期" width="200" align="center" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间/日期" width="200" align="center" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="createDate" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="toState(scope.row,'edit')">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-wrap text-center padding">
        <el-pagination background layout="prev, pager, next" :total="pageInfo.totalPages" :page-size="pageInfo.size" @current-change="changePage">
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
      query: {},
      loading: false,
      params: {
        page: 0,
        size: 10,
        name: ''
      },
      pageInfo: {},
      tableData: []
    }
  },
  methods: {
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
    del (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$fly.delete(`${api.propertyId}${row.pkId}`).then(() => {
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
      this.params.page = 0
      this.getData(this.params)
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
        this.loading = false
      })
    },
    setBreadData: function () {
      let { name, params, query } = this.$route
      let data = [{ name, params, query }]
      this.$store.commit('SET_BREAD_DATA', data)
    }
  },
  watch: {
    '$route': function ({ query, params }) {
      this.query = query
      this.getData(this.params)
      this.setBreadData()
    }
  },
  created () {
    let { query } = this.$route
    this.query = query
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
