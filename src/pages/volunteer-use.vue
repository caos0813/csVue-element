<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <el-date-picker v-model="date" class='date-picker-wrap' size="small" type="daterange" unlink-panels range-separator="至 " start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" @change="dateChange" value-format="timestamp">
        </el-date-picker>
        <el-select v-model="status" placeholder="请选择激活状态" size="small" @change="activeChange">
          <el-option label="全部" value=""></el-option>
          <el-option label="已激活" value=true></el-option>
          <el-option label="未激活" value=false></el-option>
        </el-select>
      </div>
    </div>
    <el-table :data="tableData" :header-cell-style="{background:'#F5F7FA'}" v-loading="loading" element-loading-text="拼命加载中" border stripe>
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column prop="number" label="激活卡号" align="center">
      </el-table-column>
      <el-table-column prop="provinceName" label="开卡省份" align="center">
      </el-table-column>
      <el-table-column prop="phoneNumber" label="绑定账号" align="center">
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="props">
          <span>{{props.row.type==='FULL_FEATURED'?'全功能':props.row.type==='ZHI_YUAN'?'志愿卡':'选科卡'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdDate" label="创建时间" align="center">
        <template slot-scope="props">
          <span>{{props.row.createdDate | dateTime('yyyy-MM-dd hh:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="activatedDate" label="是否激活" align="center">
        <template slot-scope="props">
          <span>{{props.row.activatedDate===null?'否':'是'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expirationDate" label="到期时间" align="center">
        <template slot-scope="props">
          <span>{{props.row.expirationDate | dateTime('yyyy-MM-dd hh:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="activatedDate" label="到期时间" align="center">
        <template slot-scope="props">
          <span>{{props.row.expirationDate | dateTime('yyyy-MM-dd hh:mm:ss')}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="page-wrap text-left padding ">
      <el-pagination background layout="total,sizes, prev, pager, next, jumper" :total="pageInfo.totalElements" :current-page="pageInfo.currentPage" :page-sizes="pageSizes" @current-change="currentChange" @size-change="sizeChange">
      </el-pagination>
    </div> -->
    <page ref="pageInfo" :pageInfo="pageInfo" @sizeChange="sizeChange" @currentChange="currentChange"></page>
  </div>
</template>
<script>
import { api } from '@/utils'
import { page } from '@/components'
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
      loading: false,
      pageInfo: {}
    }
  },
  computed: {
    params () {
      let status
      let size
      if (this.status === 'true') {
        status = true
      } else if (this.status === 'false') {
        status = false
      } else {
        status = ''
      }
      if (this.$refs.pageInfo) {
        size = this.$refs.pageInfo.pageSizes[0]
      }
      return {
        page: 1,
        size: size,
        // sort: 'createdDate,desc',
        beginDate: this.date ? this.date[0] : null,
        endDate: this.date ? this.date[1] : null,
        activated: status
      }
    }
  },
  components: {
    page
  },
  methods: {
    dateChange (e) {
      let beginTime = new Date(e[0])
      let endTime = new Date(e[1])
      e[0] = new Date(beginTime.getFullYear() + '-' + (beginTime.getMonth() + 1) + '-' + beginTime.getDate() + ' 00:00:00').getTime()
      e[1] = new Date(endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + endTime.getDate() + ' 23:59:59').getTime()
      this.params.beginDate = e[0]
      this.params.endDate = e[1]
      this.getData(this.params)
    },
    activeChange (e) {
      this.getData(this.params)
    },
    currentChange (e) {
      this.params.page = e
      this.getData(this.params)
    },
    sizeChange (e) {
      console.log(e)
      this.params.page = 1
      this.params.size = e
      this.getData(this.params)
    },
    getData (params) {
      // this.pageInfo = {}
      // this.tableData = []
      params.page--
      this.loading = true
      this.$fly.get(api.getMembershipCards, params).then(data => {
        this.loading = false
        let { content, totalElements } = data
        this.pageInfo = {
          totalElements: totalElements,
          currentPage: params.page + 1
        }
        this.tableData = content
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
