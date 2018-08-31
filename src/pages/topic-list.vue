<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <el-input prefix-icon="el-icon-search" v-model="params.title" placeholder="请输入搜索关键字" size="small"></el-input>
        <picker v-model="pickerVal" size="small" :span="-1"></picker>
        <el-button size="small" type="primary" @click="search">查询</el-button>
        <el-button size="small" type="warning" @click="reset">重置</el-button>
      </div>
      <listHandle :checkIds="checkIds" @refresh="refresh" show-hot></listHandle>
    </div>
    <el-table ref="multipleTable" header-cell-class-name="tableHeader" :data="tableData" border stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否热门" align="center" width="80">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.isHot===1?'danger':'info'">{{scope.row.isHot?'是':'否'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="所属产品" align="center">
        <template slot-scope="scope">{{ scope.row.product.name }}</template>
      </el-table-column>
      <el-table-column prop="userName" label="操作人" width="120" align="center">
      </el-table-column>
      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.status | publicStatus('style')">{{ scope.row.status | publicStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="totalReadNum" label="阅读量" width="120" align="center">
      </el-table-column>
      <el-table-column label="创建时间" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.createTime | dateTime('yyyy-MM-dd hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="发布时间" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.publishTime | dateTime('yyyy-MM-dd hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope ">
          <el-button type="text " size="mini">
            <router-link :to="{name:'topic',params:{type:'edit'},query:{id:scope.row.id}}" tag="span">编辑</router-link>
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
      params: {
        title: null,
        page: 1,
        size: 15,
        sortType: 1
      },
      checkIds: [],
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
    handleSelectionChange (e) {
      this.checkIds = this.lodash.map(e, 'id')
      console.log(this.checkIds)
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
    refresh () {
      this.getData(this.params)
    },
    getData (obj) {
      let params = this.lodash.clone(obj)
      params.page--
      console.log(obj)
      this.$fly.get(api.topicList, params).then(data => {
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
    console.log(111)
    this.getData(this.params)
  }
}
</script>
