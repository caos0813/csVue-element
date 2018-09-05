<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <el-input prefix-icon="el-icon-search" v-model="params.title" placeholder="请输入搜索关键字" size="small"></el-input>
        <picker v-model="pickerVal" size="small" :span="-1" :column="1"></picker>
        <el-button size="small" type="primary" @click="search">查询</el-button>
        <el-button size="small" type="warning" @click="reset">重置</el-button>
      </div>
      <listHandle :checkData="checkData" @refresh="refresh" :show-soldout='showSoldout'></listHandle>
    </div>
    <el-table ref="multipleTable" header-cell-class-name="tableHeader" :data="tableData" border stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center">
      </el-table-column>
      <el-table-column prop="userName" label="操作人" align="center">
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
    <div class="page-wrap">
      <el-pagination background layout="prev, pager, next " :current-page="pageInfo.currentPage" :page-count="pageInfo.totalPages " :page-size="pageInfo.size " @current-change="changePage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { api } from '@/utils'
import { picker, listHandle } from '@/components'
export default {
  data () {
    return {
      showSoldout: false,
      params: {
        title: null,
        page: 1,
        size: 15,
        sortType: 1
      },
      checkData: [],
      pickerVal: [],
      pageInfo: {},
      tableData: []
    }
  },
  components: {
    picker,
    listHandle
  },
  methods: {
    refresh () {
      this.getData(this.params)
    },
    handleSelectionChange (e) {
      this.checkData = this.lodash.map(e, 'id')
    },
    changePage (e) {
      this.params.page = e
      this.getData(this.params)
    },
    reset () {
      this.params = {
        title: null,
        page: 1,
        size: 15,
        sortType: 1
      }
      this.pickerVal = []
      this.getData(this.params)
    },
    search () {
      console.log(this.pickerVal)
      this.params.productId = this.pickerVal[0]
      this.getData(this.params)
    },
    getData (obj) {
      let params = this.lodash.clone(obj)
      params.page--
      console.log(obj)
      this.$fly.get(api.specialList, params).then(data => {
        this.tableData = data.content
        this.pageInfo = {
          totalPages: data.totalPages,
          size: obj.size,
          currentPage: obj.page
        }
      })
    }
  },
  created () {
    this.getData(this.params)
  }
}
</script>
<style lang="scss" scoped>
</style>
