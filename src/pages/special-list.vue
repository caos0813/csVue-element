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
    <el-table ref="multipleTable" header-cell-class-name="tableHeader" :data="tableData" v-loading="loading" element-loading-text="拼命加载中" border stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" label-class-name="checkLabel">
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
    <!-- <div class="page-wrap">
      <el-pagination background layout="total,sizes, prev, pager, next, jumper" :total="pageInfo.totalElements" :current-page="pageInfo.currentPage" :page-sizes="pageSizes" @current-change="currentChange" @size-change="sizeChange">
      </el-pagination>
    </div> -->
    <page ref="pageInfo" :pageInfo="pageInfo" @sizeChange="sizeChange" @currentChange="currentChange"></page>
  </div>
</template>
<script>
import { api } from '@/utils'
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
    getData (params) {
      // let params = this.lodash.clone(obj)
      params.page--
      this.loading = true
      this.$fly.get(api.specialList, params).then(data => {
        this.loading = false
        let { content, totalElements } = data
        this.tableData = content
        // this.pageInfo = {
        //   totalPages: data.totalPages,
        //   size: obj.size,
        //   currentPage: obj.page
        // }
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
    console.log(this.$refs.pageInfo.pageSizes[0])
    this.params.size = this.$refs.pageInfo.pageSizes[0]
  }
}
</script>
<style lang="scss">
.checkLabel > .el-checkbox {
  display: none;
}
</style>
