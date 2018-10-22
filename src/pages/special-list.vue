<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <el-input prefix-icon="el-icon-search" v-model="params.title" placeholder="请输入搜索关键字" size="small"></el-input>
        <picker v-model="pickerVal" size="small" :span="-1" :column="1"></picker>
        <el-button size="small" type="primary" @click="search">查询</el-button>
        <el-button size="small" type="warning" @click="reset">重置</el-button>
      </div>
      <!-- <listHandle :checkData="checkData" @refresh="refresh" :show-soldout='showSoldout'></listHandle> -->
      <div class="button-wrap">
        <el-button type="primary" size="small" @click="handleFn('add')">新增</el-button>
        <el-button type="danger" size="small" @click="handleFn('delete')" :disabled="checkData.length<1">删除</el-button>
      </div>
    </div>
    <el-table ref="multipleTable" header-cell-class-name="tableHeader" :data="tableData" v-loading="loading" element-loading-text="拼命加载中" border stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" label-class-name="checkLabel">
      </el-table-column>
      <el-table-column prop="id" label="编号" align="center" min-width="60" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center" min-width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="userName" label="操作人" min-width="260" align="center">
      </el-table-column>
      <el-table-column prop="introduction" label="简介" min-width="200" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column label="创建时间" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.createTime | dateTime('yyyy-MM-dd hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope ">
          <el-button type="text " size="mini">
            <router-link :to="{name:'special',params:{type:'edit'},query:{id:scope.row.id}}" tag="span">编辑</router-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <page ref="pageInfo" :pageInfo="pageInfo" @sizeChange="sizeChange" @currentChange="currentChange"></page>
  </div>
</template>
<script>
import { api, confirm } from '@/utils'
import { picker, listHandle, page } from '@/components'
export default {
  data () {
    return {
      showSoldout: false,
      checkData: [],
      pickerVal: [],
      params: {
        title: null,
        page: 1,
        // size: 10,
        sortType: 1
      },
      pageInfo: {},
      tableData: [],
      loading: false
    }
  },
  components: {
    picker,
    listHandle,
    page
  },
  computed: {
  },
  methods: {
    refresh () {
      this.getData(this.params)
    },
    handleFn (type) {
      let { name } = this.$route
      let path = name.split('-')[0]
      if (type === 'add') {
        this.toState({ name: path, params: { type: 'add' } })
      } else {
        let url
        let txt
        if (type === 'delete') {
          url = api[`${path}Delete`]
          txt = '删除'
        }
        confirm(`您确定将选择的内容${txt}吗？`, '提示').then(() => {
          this.checkIds = []
          for (let item = 0; item < this.checkData.length; item++) {
            this.checkIds.push(this.checkData[item].id)
          }
          if (this.checkIds.length > 0) {
            this.$fly.post(url, this.checkIds).then(data => {
              let { allowIds, notallowIds } = data
              if (allowIds.length > 0 && notallowIds.length > 0) {
                this.$message({
                  message: `已删除的编号：${allowIds}\n未删除的编号：${notallowIds}`,
                  duration: 2000,
                  type: 'success'
                })
              } else {
                if (allowIds.length > 0) {
                  this.$message({
                    message: `已删除的编号：${allowIds}`,
                    duration: 2000,
                    type: 'success'
                  })
                } else if (notallowIds.length > 0) {
                  console.log('notallowIds')
                  this.$message({
                    message: `未删除的编号：${notallowIds}`,
                    duration: 2000,
                    type: 'info'
                  })
                }
              }
              this.getData(this.params)
            }).catch((err) => {
              console.log(err)
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
    handleSelectionChange (e) {
      this.checkData = []
      this.lodash.map(e, (item) => {
        this.checkData.push({ id: item.id })
      })
      // this.checkData = this.lodash.map(e, 'id')
    },
    currentChange (e) {
      this.params.page = e
      this.getData(this.params)
    },
    sizeChange (e) {
      this.params.size = e
      this.getData(this.params)
    },
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
    search () {
      this.getData(this.params)
    },
    getData (params) {
      // let params = this.lodash.clone(obj)
      params.productId = this.pickerVal[0]
      params.page--
      this.loading = true
      this.$fly.get(api.specialList, params).then(data => {
        this.loading = false
        let { content, totalElements } = data
        this.tableData = content
        this.pageInfo = {
          totalElements: totalElements,
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
<style lang="scss">
.checkLabel > .el-checkbox {
  display: none;
}
</style>
