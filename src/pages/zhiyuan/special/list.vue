<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <el-input prefix-icon="el-icon-search" v-model="params.title" placeholder="请输入搜索关键字" size="small"></el-input>
        <el-button size="small" type="primary" @click="search">查询</el-button>
        <el-button size="small" type="warning" @click="reset">重置</el-button>
        <!-- {{moduleId(type)}} -->
      </div>
      <listHandle :checkData="checkData" :module="params.moduleId" @refresh="refresh" :showDelete="false">
        <el-button type="danger" size="small" @click="handleDelete" :disabled="checkData.length<1">删除</el-button>
      </listHandle>
    </div>
    <el-table ref="multipleTable" header-cell-class-name="tableHeader" :data="tableData" v-loading="loading" element-loading-text="拼命加载中" border stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" label-class-name="checkLabel">
      </el-table-column>
      <el-table-column prop="title" label="专题" align="center" min-width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="180">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.status | publicStatus('style')">{{ scope.row.status | publicStatus }}</el-tag>
        </template>
      </el-table-column>
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
import { api, confirm } from '@/utils'
import { listHandle, pagination } from '@/components'
export default {
  data () {
    return {
      showSoldout: false,
      checkData: [],
      pickerVal: [],
      params: {
        title: null,
        moduleId: '',
        page: 1
      },
      pageInfo: {
        totalElements: 0,
        currentPage: 1
      },
      tableData: [],
      loading: false,
      checkIds: []
    }
  },
  components: {
    listHandle,
    pagination
  },
  watch: {
    '$route' (to, from) {
      // console.log(to.params.type)
      this.params.page = 1
      this.params.title = null
      this.type = to.params.type
      this.getData(this.params)
    }
  },
  methods: {
    refresh () {
      this.getData(this.params)
    },
    handleSelectionChange (e) {
      this.checkData = []
      this.lodash.map(e, (item) => {
        this.checkData.push({ id: item.id, status: item.status })
      })
      // this.checkData = this.lodash.map(e, 'id')
    },
    // 分页
    pagination (e) {
      this.params.page = e.page
      this.params.size = e.limit
      this.getData(this.params)
    },
    // 重置
    reset () {
      this.params = {
        title: null,
        page: 1,
        size: this.$refs.pageInfo.pageSizes[0],
        sortType: 1
      }
      this.pickerVal = []
      this.getData(this.params)
    },
    // 查询
    search () {
      this.getData(this.params)
    },
    // 获取数据
    getData (params) {
      // console.log(this.moduleId())
      params.moduleId = this.moduleId(this.type)
      params.page--
      this.loading = true
      this.$fly.get(api.querySpecialTopicInfo, params).then(data => {
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
            duration: 2000,
            type: 'error'
          })
        }
      })
    },
    handleDelete () {
      let txt = '删除'
      this.checkIds = []
      confirm(`您确定将选择的专题${txt}吗？`, '提示').then(() => {
        for (let item = 0; item < this.checkData.length; item++) {
          if (this.checkData[item].status === 1) {
            this.$message.error(`已发布的内容不能${txt}`)
            this.checkIds = []
            return
          } else {
            this.checkIds.push(this.checkData[item].id)
          }
        }
        if (this.checkIds.length > 0) {
          this.$fly.post(api['zhiyuan/specialDelete'], this.checkIds).then(data => {
            if (!data.data) {
              return this.$message({
                message: `${data.message}`,
                duration: 2000,
                type: 'error'
              })
            } else {
              this.$message({
                message: `${txt}成功`,
                duration: 2000,
                type: 'success'
              })
              this.refresh()
            }
          }).catch(() => {
            this.$message({
              message: `${txt}失败`,
              duration: 2000,
              type: 'error'
            })
          })
        }
      })
    }
  },
  created () {
    this.type = this.$route.params.type
    this.getData(this.params)
  },
  mounted () {
    this.params.size = this.$refs.pageInfo.pageSizes[0]
  }
}
</script>
