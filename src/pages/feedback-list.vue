<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <el-date-picker v-model="date" class='date-picker-wrap' size="small" type="daterange" unlink-panels range-separator="至 " start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" @change="dateChange" value-format="timestamp">
        </el-date-picker>
        <el-input prefix-icon="el-icon-search" placeholder="请输入昵称" v-model="name" size="small"></el-input>
        <el-input prefix-icon="el-icon-search" placeholder="请输入手机号" v-model="phoneNum" size="small"></el-input>
        <el-button size="small" type="primary" @click="search">查询</el-button>
        <el-button size="small" type="warning" @click="reset">重置</el-button>
      </div>
    </div>
    <el-table :data="tableData" :header-cell-style="{background:'#F5F7FA'}" v-loading="loading" element-loading-text="拼命加载中" border stripe>
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column prop="name" label="昵称" width="180" align="center">
      </el-table-column>
      <el-table-column prop="phoneNum" label="手机号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="time" label="时间" align="center" width="200">
        <template slot-scope="props">
          <span>{{props.row.time | dateTime('yyyy-MM-dd hh:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="反馈内容" align="center">
      </el-table-column>
    </el-table>
    <div class="page-wrap text-left padding ">
      <!-- <el-pagination background layout="total, prev, pager, next,sizes, jumper" :page-sizes="pageSizes" :current-page="pageInfo.pageNumber+1" :total="pageInfo.totalElements" :page-size="pageInfo.pageSize" @current-change="currentChange">
      </el-pagination> -->
      <el-pagination background layout="total, prev, pager, next, jumper" :total="pageInfo.totalElements" @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { api } from '@/utils'
export default {
  data () {
    return {
      date: null,
      pickerOptions2: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', [new Date(), new Date()])
          }
        }, {
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      name: '',
      phoneNum: '',
      tableData: [],
      pageInfo: {},
      loading: false,
      // pageSize: 16,
      pageSizes: [100, 200, 300, 400]
    }
  },
  computed: {
    params () {
      return {
        page: 0,
        size: 10,
        beginTime: this.date ? this.date[0] : null,
        endTime: this.date ? this.date[1] : null,
        phoneNum: this.phoneNum,
        name: this.name
      }
    }
  },
  methods: {
    dateChange (e) {
      if (e[0] === e[1]) {
        let beginTime = new Date(e[0])
        let endTime = new Date(e[1])
        e[0] = new Date(beginTime.getFullYear() + '-' + (beginTime.getMonth() + 1) + '-' + beginTime.getDate() + ' 00:00:00').getTime()
        e[1] = new Date(endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + endTime.getDate() + ' 23:59:59').getTime()
        this.params.beginTime = e[0]
        this.params.endTime = e[1]
      }
      this.getData(this.params)
    },
    currentChange (e) {
      this.params.page = e - 1
      this.getData(this.params)
    },
    search () {
      this.params.phoneNum = this.phoneNum
      this.params.name = this.name
      this.getData(this.params)
    },
    reset () {
      this.date = null
      this.phoneNum = ''
      this.name = ''
      this.params = {
        page: 0,
        size: 15,
        beginTime: this.date ? this.date[0] : null,
        endTime: this.date ? this.date[1] : null,
        phoneNum: '',
        name: ''
      }
      this.getData(this.params)
    },
    getData (params) {
      this.$fly.get(api.getFeedback, params).then(data => {
        let { content, totalElements } = data
        this.pageInfo = {
          totalElements: totalElements
        }
        this.tableData = content
      })
    }
  },
  // watch: {
  //   '$route' (to, from) {
  //     if (to.name === 'feedback-list' && from.name !== 'feedback-list') {
  //       this.getData(this.params)
  //     }
  //   }
  // },
  beforeMount () {
    this.getData(this.params)
  }
}
</script>
<style lang="scss">
</style>
