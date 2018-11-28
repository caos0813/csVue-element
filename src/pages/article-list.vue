<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <el-input prefix-icon="el-icon-search" v-model="params.title" placeholder="请输入搜索关键字" size="small"></el-input>
        <picker v-model="pickerVal" size="small" :span="-1" :column="2"></picker>
        <el-button size="small" type="primary" @click="search">查询</el-button>
        <el-button size="small" type="warning" @click="reset">重置</el-button>
      </div>
      <listHandle :checkData="checkData" @refresh="refresh"></listHandle>
    </div>
    <el-table ref="multipleTable" header-cell-class-name="tableHeader" :data="tableData" v-loading="loading" element-loading-text="拼命加载中" border stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" label-class-name="checkLabel">
      </el-table-column>
      <el-table-column label="标题" align="center" min-width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="推荐" align="center" width="80">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.isHomePageShow===1?'danger':'info'">{{scope.row.isHomePageShow?'推荐':'不推荐'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="所属专题" min-width="160" show-overflow-tooltip align="center">
        <template slot-scope="scope">{{ scope.row.product.name }}、{{ scope.row.specialTopic.title }}</template>
      </el-table-column>
      <el-table-column prop="userName" label="操作人" min-width="260" align="center">
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.status | publicStatus('style')">{{ scope.row.status | publicStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="totalReadNum" label="阅读量" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.totalReadNum}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.createTime | dateTime('yyyy-MM-dd hh:mm:ss') }}</template>
      </el-table-column>
      <el-table-column label="发布时间" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.publishTime | dateTime('yyyy-MM-dd hh:mm:ss') }}</template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope ">
          <el-button type="text " size="mini" v-if="scope.row.status===2||scope.row.status===3">
            <router-link :to="{name:'article',params:{type:'edit'},query:{id:scope.row.id}}" tag="span">编辑</router-link>
          </el-button>
          <!-- {{scope.row.product.name==='志愿'}} -->
          <el-button type="text" size="mini" v-if="scope.row.product.name==='志愿'&&( scope.row.status===1)" @click.stop="openSendDialog(scope.row.id)">推送</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page ref="pageInfo" :pageInfo="pageInfo" @sizeChange="sizeChange" @currentChange="currentChange"></page>
    <div class="dialog-wrap" id="dialog-wrap" :class="{'start':startAnimate,'close':closeAnimate,'hide':!popoverIsClose}">
      <div class="dialog-header">
        <span class="title">推送</span>
        <el-button type="text" class="btn-close" icon="el-icon-close" @click="close"></el-button>
      </div>
      <div class="dialog-container">
        <el-form :model="form" inline-message ref="form" :rules="sendRules" label-suffix=":" label-width="100px">
          <el-form-item label='被推送的标题'>
            <label v-for="(item,index) in checkData" :key="index">{{item.title}}</label>
          </el-form-item>
          <el-form-item label="推送时间" prop="sendTime">
            <el-radio v-model="form.radio" label="1">直接推送</el-radio>
            <br />
            <el-radio v-model="form.radio" label="2">定时推送</el-radio>
            <el-date-picker v-model="form.sendTime" type="datetime" size="small" :picker-options="pickerOptions2" value-format="timestamp" placeholder="请选择发布时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="推送范围" prop="sendRange">
            <el-checkbox :indeterminate="form.isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全国</el-checkbox>
            <el-checkbox-group v-model="form.provincesIds" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="(item,index) in provincesData" :key="index" :label="item.name" :disabled="item.disabled" :min="1">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button @click="cancel" size="small">取消</el-button>
        <el-button type="primary" size="small" @click="sendFn('send')">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { api, confirm } from '@/utils'
import { picker, listHandle, page } from '@/components'
export default {
  data () {
    let validateTime = (rule, value, callback) => {
      if (this.form.radio === '2' && !this.form.sendTime) {
        callback(new Error('请选择定时推送时间'))
      } else {
        callback()
      }
    }
    let validateRange = (rule, value, callback) => {
      if (this.form.provincesIds.length === 0) {
        callback(new Error('请至少选择一个推送范围'))
      } else {
        callback()
      }
    }
    return {
      params: {
        title: null,
        page: 1,
        // size: 10,
        sortType: 1
      },
      checkData: [],
      pickerVal: [],
      pageInfo: {},
      tableData: [],
      loading: false,
      sendDialog: false,
      sendTitle: [],
      checkAll: false,
      form: {
        radio: '1',
        sendTime: '',
        isIndeterminate: true,
        provincesIds: []
      },
      sendRules: {
        sendTime: [{ required: true, message: '请选择推送方式', trigger: 'change', validator: validateTime }],
        sendRange: [{ type: 'array', required: true, message: '请至少选择一个推送范围', trigger: 'change', validator: validateRange }]
      },
      pickerOptions2: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      provincesData: [],
      povincesDataById: [],
      bannerId: '',
      popoverIsClose: false,
      startAnimate: false,
      closeAnimate: false
    }
  },
  components: {
    picker,
    listHandle,
    page
  },
  methods: {
    handleSelectionChange (e) {
      this.checkData = []
      this.lodash.map(e, (item) => {
        this.checkData.push({ id: item.id, status: item.status })
      })
      // this.checkIds = this.lodash.map(e, 'id')
      // console.log(this.checkIds)
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
      console.log(this.pickerVal)
      this.getData(this.params)
    },
    refresh () {
      this.getData(this.params)
    },
    getData (params) {
      // let params = this.lodash.clone(obj)
      params.page--
      params.productId = this.pickerVal[0]
      params.specialTopicId = this.pickerVal[1]
      this.loading = true
      this.$fly.get(api.articleList, params).then(data => {
        this.loading = false
        this.tableData = data.content
        this.pageInfo = {
          totalElements: data.totalElements,
          currentPage: params.page + 1
        }
      })
    },
    openSendDialog (id) {
      this.sendDialog = true
      this.bannerId = id
      this.popoverIsClose = true
      this.startAnimate = true
      this.closeAnimate = false
      this.form = {
        radio: '1',
        sendTime: '',
        isIndeterminate: true,
        provincesIds: []
      }
      this.$refs['form'].resetFields()
    },
    // 全选
    handleCheckAllChange (val) {
      let list = []
      if (val) {
        this.provincesData.map((item) => {
          if (!item.disabled) {
            return list.push(item.name)
          }
        })
      } else {
        list = []
      }
      this.form.provincesIds = list
      if (this.form.provincesIds.length === this.provincesData.length) {
        this.form.isIndeterminate = false
      }
    },
    // 反选
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.provincesData.length
      this.form.isIndeterminate = checkedCount > 0 && checkedCount < this.provincesData.length
    },
    cancel () {
      this.$refs['form'].resetFields()
      this.popoverIsClose = true
      this.closeAnimate = true
      this.startAnimate = false
    },
    sendFn (type) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let params, url, area
          let list = []
          let provincesIds = this.form.provincesIds
          let provincesData = this.provincesData
          /* if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'release' || process.env.NODE_ENV === 'beta') {
            for (let x in provincesData) {
              provincesIds.map((item) => {
                if (provincesData[x].name === item) {
                  list.push('dev_' + provincesData[x].code)
                  // list.push('pro_' + provincesData[x].code)
                }
                return list
              })
            }
          } */
          if (process.env.NODE_ENV === 'production') {
            for (let x in provincesData) {
              provincesIds.map((item) => {
                if (provincesData[x].name === item) {
                  list.push('pro_' + provincesData[x].code)
                }
                return list
              })
            }
          } else {
            for (let x in provincesData) {
              provincesIds.map((item) => {
                if (provincesData[x].name === item) {
                  list.push('dev_' + provincesData[x].code)
                  // list.push('pro_' + provincesData[x].code)
                }
                return list
              })
            }
          }
          if (!this.checkAll) {
            area = 1
          } else {
            area = 0
          }
          params = {
            id: this.bannerId,
            type: 2,
            provinceIds: `${list}`,
            area: area
          }
          console.log(params)
          if (this.form.radio === '1') {
            url = api[`bannerSend`]
          } else if (this.form.radio === '2') {
            url = api[`bannerSchedule`]
            params.date = this.form.sendTime
          }
          confirm(`您确定将推送选择的文章吗？`, '提示').then(() => {
            this.$fly.post(url, params).then(data => {
              this.$message({
                message: `推送成功`,
                duration: 2000,
                type: 'success'
              })
              this.params.page = 1
              this.getData(this.params)
            }).catch(() => {
              this.$message({
                message: `推送失败`,
                duration: 2000,
                type: 'error'
              })
              this.popoverIsClose = true
              this.closeAnimate = false
              this.startAnimate = false
            })
          }).catch(() => {
            this.popoverIsClose = true
            this.closeAnimate = false
            this.startAnimate = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close () {
      this.closeAnimate = true
      this.popoverIsClose = true
      this.startAnimate = false
    },
    handleBodyClick (e) {
      let _this = this
      let event = e || window.e
      let comSelect = document.getElementById('dialog-wrap')
      if (comSelect) {
        let flag = comSelect.contains(event.target)
        if (flag) return
        // _this.popoverIsClose = false
        _this.closeAnimate = true
      }
    }
  },
  created () {
    this.getData(this.params)
    this.$fly.get(api.getProvinces).then(data => {
      const { provinces } = data._embedded
      this.provincesData = provinces
      this.$fly.get(api.getProvinceIds).then(data1 => {
        this.povincesDataById = data1
        console.log(process.env.NODE_ENV)
        /* if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'release' || process.env.NODE_ENV === 'beta') {
          provinces.map(item => {
            item['disabled'] = true
            for (let i = 0; i < data1.length; i++) {
              if (data1[i] === 'dev_' + item.code) {
                item['disabled'] = false
                break
              }
            }
          })
        } */
        if (process.env.NODE_ENV === 'production') {
          provinces.map(item => {
            item['disabled'] = true
            for (let i = 0; i < data1.length; i++) {
              if (data1[i] === 'pro_' + item.code) {
                item['disabled'] = false
                break
              }
            }
          })
        } else {
          provinces.map(item => {
            item['disabled'] = true
            for (let i = 0; i < data1.length; i++) {
              if (data1[i] === 'dev_' + item.code) {
                item['disabled'] = false
                break
              }
            }
          })
        }
        this.$set(this, 'provincesData', provinces)
      })
    })
  },
  mounted () {
    let _this = this
    _this.params.size = _this.$refs.pageInfo.pageSizes[0]
    if (!_this.popoverIsClose) {
      document.addEventListener('click', this.handleBodyClick)
    }
  },
  destroyed () {
    document.removeEventListener('click', this.handleBodyClick)
  }
}
</script>
<style lang="scss">
.checkLabel > .el-checkbox {
  display: none;
}
</style>
