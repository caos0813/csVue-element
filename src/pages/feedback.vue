<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <div class="ceil-box">
          <el-date-picker v-model="date" type="date" placeholder="选择日期" @change="dateChange" value-format="timestamp">
          </el-date-picker>
        </div>
        <div class="ceil-box">
          <el-input placeholder="请输入昵称" v-model="name"></el-input>
        </div>
        <div class="ceil-box">
          <el-input placeholder="请输入手机号" v-model="phoneNum"></el-input>
        </div>
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
      <el-pagination background layout="total, prev, pager, next,sizes, jumper" :page-sizes="pageSizes" :current-page="pageInfo.pageNumber+1" :total="pageInfo.totalElements" :page-size="pageInfo.pageSize" @current-change="currentChange">
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
      searchName: '',
      tableData: [],
      pageInfo: {},
      loading: false,
      pageSizes: [100, 200, 300, 400]
    }
  },
  computed: {
    params () {
      return {
        page: 0,
        size: 10
        // beginDate: this.date ? this.date[0] : null,
        // endDate: this.date ? this.date[1] : null,
        // time: this.date ? this.date : null,
        // phoneNum: '',
        // name: ''
      }
    }
  },
  methods: {
    dateChange (e) {
      this.getData(this.params)
    },
    currentChange (e) {
      this.params.page = e - 1
      this.getData(this.params)
    },
    getData (params) {
      this.$fly.get(api.getFeedback, params).then(data => {
        let { pageable, content, totalElements } = data
        this.pageInfo = pageable
        this.pageInfo.totalElements = totalElements
        this.tableData = content
      })
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'volunteer-list' && from.name !== 'volunteer-list') {
        this.getData(this.params)
      }
    }
  },
  beforeMount () {
    console.log(this.params)
    this.getData(this.params)
  }
}
</script>
<style lang="scss">
</style>
