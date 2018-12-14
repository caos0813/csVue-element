<template>
  <div class="page">
    <div class="tools-bar">
      <!-- :checkData="checkData" @refresh="refresh" -->
      <listHandle :showSoldout="false"></listHandle>
    </div>

    <el-table ref="multipleTable" header-cell-class-name="tableHeader" :data="tableData" v-loading="loading" element-loading-text="拼命加载中" border stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" label-class-name="checkLabel">
      </el-table-column>
      <el-table-column prop="id" label="编号" align="center" min-width="60" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="title" label="专题" align="center" min-width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="180">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.status | publicStatus('style')">{{ scope.row.status | publicStatus }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="introduction" label="简介" min-width="200" show-overflow-tooltip align="center">
      </el-table-column> -->
      <el-table-column prop="countReadNum" label="浏览量" width="200" align="center">
        <template slot-scope="scope">
          {{scope.row.countReadNum===null?0:scope.row.countReadNum}}
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.releaseTime | dateTime('yyyy-MM-dd hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column prop="useName" label="操作人" width="180" align="center">
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope ">
          <el-button type="text " size="mini" v-if="scope.row.status===2||scope.row.status===3">
            <router-link :to="{name:'zhiyuan/special',params:{type:'edit'},query:{id:scope.row.id}}" tag="span">编辑</router-link>
          </el-button>
        </template>
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
    handleSelectionChange (e) {
      this.checkData = []
      this.lodash.map(e, (item) => {
        this.checkData.push({ id: item.id, status: item.status })
      })
      // this.checkData = this.lodash.map(e, 'id')
    },
    // 获取数据
    getData (params) {
      params.page--
      this.loading = true
      this.$fly.get(api.bannerList, params).then(data => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        let { content, totalElements } = data.data
        this.tableData = content
        this.pageInfo = {
          totalElements: parseInt(totalElements),
          currentPage: params.page + 1
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
