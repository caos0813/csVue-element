<template>
  <div class="page">
    <div class="tools-bar">
      <listHandle :showSoldout="false" :showDelete="false" :checkData="checkData" @refresh="refresh"></listHandle>
    </div>
    <el-table ref="multipleTable" header-cell-class-name="tableHeader" :data="tableData" v-loading="loading" element-loading-text="拼命加载中" border stripe @selection-change="handleSelectionChange">
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column label="产品" align="center" width="120">
        <template slot-scope="scope" v-if="scope.row.product">{{ scope.row.product.name }}</template>
      </el-table-column>
      <el-table-column prop="platform" label="平台" align="center" width="100">
      </el-table-column>
      <el-table-column prop="version" label="版本号" align="center" width="120">
      </el-table-column>
      <el-table-column prop="ossUrl" label="下载地址" align="center" min-width="100">
      </el-table-column>
      <el-table-column label="创建人" align="center" width="120">
        <template slot-scope="scope">{{ scope.row.createUser.username }}</template>
      </el-table-column>
      <el-table-column label="创建时间" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.createTime | dateTime('yyyy-MM-dd hh:mm:ss') }}</template>
      </el-table-column>
    </el-table>
    <pagination ref="pageInfo" :total="pageInfo.totalElements" :page.sync="pageInfo.currentPage" @pagination="pagination"></pagination>
  </div>
</template>
<script>
import { api } from '@/utils'
import { listHandle, pagination } from '@/components'
export default {
  data () {
    return {
      params: {
        page: 1
      },
      checkData: [],
      pageInfo: {
        totalElements: 0,
        currentPage: 1
      },
      tableData: [],
      loading: false
    }
  },
  components: {
    listHandle,
    pagination
  },
  methods: {
    refresh () {
      this.params.page = 1
      this.getData(this.params)
    },
    handleSelectionChange (e) {
      this.checkData = []
      this.lodash.map(e, (item) => {
        this.checkData.push({ id: item.id, status: item.status })
      })
    },
    // 分页
    pagination (e) {
      this.params.page = e.page
      this.params.size = e.limit
      this.getData(this.params)
    },
    // 获取数据
    getData (params) {
      params.page--
      this.loading = true
      this.$fly.get(api.appList, params).then(data => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        if (data.status === 100000) {
          let { content, totalElements } = data.data
          this.tableData = content
          this.pageInfo = {
            totalElements: parseInt(totalElements),
            currentPage: params.page + 1
          }
        } else {
          this.$message({
            message: '请求失败',
            type: 'error'
          })
        }
      })
    }
  },
  created () {
    this.getData(this.params)
  },
  mounted () {
    this.params.size = this.$refs.pageInfo.pageSizes[0]
  }
}
</script>

<style lang="scss" scoped>
.tools-bar {
  justify-content: flex-end;
}
</style>
