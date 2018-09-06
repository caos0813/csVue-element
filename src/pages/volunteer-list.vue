<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <el-date-picker v-model="date" class='date-picker-wrap' size="small" type="daterange" unlink-panels range-separator="至 " start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" @change="dateChange" value-format="timestamp">
        </el-date-picker>
      </div>
      <div class="button-wrap">
        <el-button type="primary" size="small" @click="openCard">开卡</el-button>
      </div>
    </div>
    <el-table :data="tableData" :header-cell-style="{background:'#F5F7FA'}" v-loading="loading" element-loading-text="拼命加载中" border stripe>
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column prop="provinceName" label="开卡省份" align="center">
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="props">
          <span>{{props.row.type==='ALL'?'全功能':'志愿卡'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="数量" align="center">
      </el-table-column>
      <el-table-column prop="activatedCount" label="激活数" align="center">
      </el-table-column>
      <el-table-column prop="createdDate" label="开卡时间" align="center">
        <template slot-scope="props">
          <span>{{props.row.createdDate | dateTime('yyyy-MM-dd hh:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handlerExprot(scope.row.id)" type="text" size="small">导出</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="page-wrap text-left padding ">
      <el-pagination background layout="total, prev, pager, next, jumper" :total="pageInfo.totalElements" @current-change="currentChange">
      </el-pagination>
    </div> -->
    <page ref="pageInfo" :pageInfo="pageInfo" @sizeChange="sizeChange" @currentChange="currentChange"></page>
    <el-dialog title="开卡" v-loading="cardLoading" text="正在生成" :visible.sync="addDialog" width="500px" :close-on-click-modal="false">
      <el-form :model="addForm" inline-message ref="addForm" :rules="rules" label-suffix=":" label-width="100">
        <el-form-item label="省份" prop="province">
          <el-select v-model="addForm.province" placeholder="选择省份">
            <el-option label="请选择" value="0"></el-option>
            <el-option v-for="item in provinceArr" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input-number v-model="addForm.number" style="width:217px;" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="addForm.type" placeholder="选择开卡类型">
            <el-option label="全功能" value="ALL"></el-option>
            <el-option label="志愿卡" value="VOLUNTEER"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="save">生成志愿卡</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { api } from '@/utils'
import Cookies from 'js-cookie'
import { page } from '@/components'
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
      searchName: '',
      tableData: [],
      pageInfo: {},
      loading: false,
      addDialog: false,
      addForm: {
        province: '',
        number: 1,
        type: 'ALL'
      },
      cardLoading: false,
      provinceArr: [],
      rules: {
        province: [{
          required: true,
          message: '省份不能为空',
          trigger: 'change'
        }, {
          validator: function (rule, value, callback) {
            if (value === '0') {
              return callback(new Error('请选择省份'))
            } else {
              callback()
            }
          },
          trigger: 'change'
        }],
        number: [
          { type: 'number', required: true, message: '数量不能为空', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              if (!/^[1-9]\d*$/.test(value)) {
                return callback(new Error('数量必须是大于0的正整数'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    params () {
      return {
        page: 1,
        // size: 10,
        beginDate: this.date ? this.date[0] : null,
        endDate: this.date ? this.date[1] : null
      }
    }
  },
  components: {
    page
  },
  methods: {
    dateChange (e) {
      if (e[0] === e[1]) {
        let beginTime = new Date(e[0])
        let endTime = new Date(e[1])
        e[0] = new Date(beginTime.getFullYear() + '-' + (beginTime.getMonth() + 1) + '-' + beginTime.getDate() + ' 00:00:00').getTime()
        e[1] = new Date(endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + endTime.getDate() + ' 23:59:59').getTime()
        this.params.beginDate = e[0]
        this.params.endDate = e[1]
      }
      this.getData(this.params)
    },
    currentChange (e) {
      this.params.page = e - 1
      this.getData(this.params)
    },
    sizeChange (e) {
      this.params.size = e
      this.getData(this.params)
    },
    // 导出excel
    handlerExprot (id) {
      let { token } = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : ''
      window.location.href = this.$fly.config.baseURL + api.exportByRecordId + '/' + id + '?token=' + token
    },
    // 开卡
    openCard () {
      this.addDialog = true
      this.getProvinces()
      if (this.$refs['addForm']) {
        this.$refs['addForm'].resetFields()
      }
    },
    // 生成志愿卡
    save () {
      let params = {
        count: this.addForm.number,
        provinceId: this.addForm.province,
        type: this.addForm.type
      }
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.cardLoading = true
          this.$fly.post(api.generate, params).then(data => {
            this.cardLoading = false
            this.$message({
              message: '生成成功!',
              type: 'success'
            })
            this.getData(this.params)
            this.addDialog = false
          }).catch(() => {
            this.$message({
              message: '生成失败',
              type: 'error'
            })
          })
        }
      })
    },
    // 重置表单
    resetForm () {
      this.$refs['addForm'].resetFields()
    },
    // 获取省份
    getProvinces () {
      this.$fly.get(api.getProvinces).then(data => {
        const { provinces } = data._embedded
        this.provinceArr = provinces
      }).catch(err => {
        console.log(err)
      })
    },
    getData (params) {
      params.page--
      this.loading = true
      this.$fly.get(api.byCondition, params).then(data => {
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
<style lang="scss">
.tools-bar .left-wrap .ceil-box {
  width: auto;
}
.el-input-number .el-input__inner {
  text-align: left;
}
</style>
