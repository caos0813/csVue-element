<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <back></back>
      </div>
    </div>
    <el-table header-cell-class-name="tableHeader" :data="tableData" v-loading="loading" element-loading-text="拼命加载中" border stripe>
      <el-table-column type="selection" width="55" align="center" label-class-name="checkLabel">
      </el-table-column>
      <el-table-column prop="useId" label="评论人" align="center">
      </el-table-column>
      <el-table-column label="内容" align="center" min-width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.commentContent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">{{ scope.row.commentTime | dateTime('yyyy-MM-dd hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope ">
          <el-button type="text " size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page ref="pageInfo" :pageInfo="pageInfo" @sizeChange="sizeChange" @currentChange="currentChange"></page>
  </div>
</template>
<script>
import { api, confirm } from '@/utils'
import { page } from '@/components'
export default {
  data () {
    return {
      params: {
        themeInfoId: '',
        page: 1
      },
      tableData: [],
      loading: false,
      pageInfo: {}
    }
  },
  components: {
    page
  },
  methods: {
    handleDelete (row) {
      confirm(`您确定将删除改评论吗？`, '提示').then(() => {
        this.$fly.get(api.deleteCommentByCommentId, {
          themeInfoId: this.params.themeInfoId,
          commentId: row.commentId
        }).then(data => {
          console.log(data)
          this.getData(this.params)
          this.$message({
            message: '删除成功',
            duration: 2000,
            type: 'success'
          })
        })
      })
    },
    currentChange (e) {
      this.params.page = e
      this.getData(this.params)
    },
    sizeChange (e) {
      this.params.size = e
      this.getData(this.params)
    },
    getData (params) {
      params.page--
      this.loading = true
      this.$fly.get(api.queryCommentByThemeInfoId, params).then(data => {
        this.loading = false
        this.tableData = data.content
        this.pageInfo = {
          totalElements: data.totalElements,
          currentPage: params.page + 1
        }
      })
    }
  },
  created () {
    let { id } = this.$route.query
    this.params.themeInfoId = id
    this.getData(this.params)
  },
  mounted () {
    this.params.size = this.$refs.pageInfo.pageSizes[0]
  }
}
</script>
