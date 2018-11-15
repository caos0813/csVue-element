<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <el-date-picker v-model="date" class='date-picker-wrap' size="small" type="daterange" unlink-panels range-separator="至 " start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" @change="dateChange" value-format="timestamp">
        </el-date-picker>
        <el-select class="mRight_15" v-model="buyWay" placeholder="购买方式" size="small" @change="selectChange">
          <el-option label="全部" value=""></el-option>
          <el-option label="App购买" value=1></el-option>
          <el-option label="卡激活" value=2></el-option>
        </el-select>
        <el-select class="mRight_15" v-model="status" placeholder="订单状态" size="small" @change="selectChange">
          <el-option :label="item.name" :value="item.value" v-for="(item,index) in statusList" :key="index"></el-option>
        </el-select>
        <el-select class="mRight_15" v-model="payWay" placeholder="支付方式" size="small" @change="selectChange">
          <el-option label="全部" value=""></el-option>
          <el-option label="微信支付" value=1></el-option>
          <el-option label="支付宝支付" value=2></el-option>
        </el-select>
      </div>
    </div>
    <el-table :data="tableData" :header-cell-style="{background:'#F5F7FA'}" v-loading="loading" element-loading-text="拼命加载中" border stripe>
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column prop="userId" label="用户ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="orderNumber" min-width="120" show-overflow-tooltip label="订单编号" align="center">
      </el-table-column>
      <el-table-column prop="payDescription" label="订单状态" align="center">
      </el-table-column>
      <el-table-column prop="phoneNumber" width="120" label="手机号" align="center">
      </el-table-column>
      <el-table-column prop="goodsName" min-width="120" show-overflow-tooltip label="商品名称" align="center">
      </el-table-column>
      <el-table-column prop="createDate" width="170" label="日期" align="center">
        <template slot-scope="props">
          <span>{{props.row.createDate | dateTime('yyyy-MM-dd hh:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="buyWay" width="120" label="订单类型" align="center">
        <template slot-scope="props">
          <span>{{props.row.payWay===1?'App购买':props.row.payWay===2?'卡激活':'其他'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" width="120" label="商品价格" align="center">
      </el-table-column>
      <el-table-column prop="payWay" width="120" label="支付方式" align="center">
        <template slot-scope="props">
          <span>{{props.row.payWay===1?'微信支付':props.row.payWay===2?'支付宝支付':'其他'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" min-width="120" show-overflow-tooltip label="备注" align="center">
      </el-table-column>
    </el-table>
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
      buyWay: '',
      payWay: '',
      status: '',
      statusList: [{
        value: '',
        name: '全部'
      }, {
        value: 'NOTPAY',
        name: '未支付'
      }, {
        value: 'USERPAYING',
        name: '支付中'
      }, {
        value: 'SUCCESS',
        name: '支付成功'
      }, {
        value: 'PAYERROR',
        name: '支付失败'
      }, {
        value: 'REVOKED',
        name: '已撤销'
      }, {
        value: 'REFUND',
        name: '转入退款'
      }, {
        value: 'CLOSED',
        name: '已关闭'
      }],
      tableData: [],
      loading: false,
      pageInfo: {}
    }
  },
  computed: {
    params () {
      let size
      // if (this.$refs.pageInfo) {
      //   size = this.$refs.pageInfo.pageSizes[0]
      // }
      return {
        page: 1,
        size: size,
        beginDate: this.date ? this.date[0] : null,
        endDate: this.date ? this.date[1] : null,
        buyWay: this.buyWay,
        payWay: this.payWay,
        payCode: this.status
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
    selectChange (e) {
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
      if (params.page > 0) {
        params.page--
      }
      this.loading = true
      this.$fly.get(api.getOrderList, params).then(data => {
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
