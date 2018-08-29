<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <div class="ceil-box">
          <el-date-picker v-model="date" size="small" type="daterange" unlink-panels range-separator="至 " start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" @change="dateChange" value-format="timestamp">
          </el-date-picker>
        </div>
        <div class="ceil-box">
          <el-select v-model="status" placeholder="请选择激活状态" size="small" @change="activeChange">
            <el-option label="全部" value=""></el-option>
            <el-option label="已激活" value=true></el-option>
            <el-option label="未激活" value=false></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <el-table :data="tableData" :header-cell-style="{background:'#F5F7FA'}" v-loading="loading" element-loading-text="拼命加载中" border stripe>
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column prop="number" label="激活卡号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="phoneNumber" label="绑定账号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="props">
          <span>{{props.row.type==='ALL'?'全功能':'志愿卡'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="activatedDate" label="是否激活" width="180" align="center">
        <template slot-scope="props">
          <span>{{props.row.activatedDate===null?'否':'是'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdDate" label="绑定时间" align="center">
        <template slot-scope="props">
          <span>{{props.row.createdDate | dateTime('yyyy-MM-dd hh:mm:ss')}}</span>
        </template>
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
      date: '',
      status: '',
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
      tableData: [],
      pageInfo: {},
      loading: false,
      pageSizes: [10, 100, 200, 500]
    }
  },
  computed: {
    params () {
      let status
      if (this.status === 'true') {
        status = true
      } else if (this.status === 'false') {
        status = false
      } else {
        status = ''
      }
      return {
        page: 0,
        size: 10,
        // sort: 'createdDate,desc',
        beginDate: this.date ? this.date[0] : null,
        endDate: this.date ? this.date[1] : null,
        activated: status
      }
    }
  },
  methods: {
    dateChange () {
      this.getData(this.params)
    },
    activeChange (e) {
      console.log(this.params)
      this.getData(this.params)
    },
    currentChange (e) {
      this.params.page = e - 1
      this.getData(this.params)
    },
    getData (params) {
      this.pageInfo = {}
      this.tableData = []
      this.$fly.get(api.getMembershipCards, params).then(data => {
        let { pageable, content, totalElements } = data
        this.pageInfo = pageable
        this.pageInfo.totalElements = totalElements
        this.tableData = content
      })
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'volunteer-use' && from.name !== 'volunteer-use') {
        this.getData(this.params)
      }
    }
  },
  beforeMount () {
    this.getData(this.params)
  }
}
</script>
