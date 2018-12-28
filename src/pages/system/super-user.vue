<template>
  <div class="page">
    <div class="tools-bar">
      <!-- :checkData="checkData" @refresh="refresh" -->
      <!-- <listHandle :showSoldout="false"></listHandle> -->
      <el-button type="primary" size="small" @click.stop="append">新增</el-button>
      <el-button type="danger" size="small" @click.stop="remove">删除</el-button>
    </div>
    <el-table ref="multipleTable" header-cell-class-name="tableHeader" :data="tableData" v-loading="loading" element-loading-text="拼命加载中" border stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" label-class-name="checkLabel">
      </el-table-column>
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column prop="phoneNumber" label="手机号" align="center" min-width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-form :model="form" :rules="rules" ref="form" autofocus v-if="scope.row.isEdit">
            <el-form-item prop="phoneNumber">
              <el-input type="text" v-model="form.phoneNumber" maxlength="11"></el-input>
            </el-form-item>
          </el-form>
          <span v-else>{{scope.row.phoneNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="180">
        <template slot-scope="scope">{{ scope.row.createTime | dateTime('yyyy-MM-dd hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="操作人" width="200" align="center">
        <template slot-scope="scope">{{ scope.row.createUser.username}}</template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope" v-if="scope.row.isEdit">
          <el-button type="text" size="mini" @click.stop="save(scope.row,scope.$index)">保存</el-button>
          <el-button type="text" size="mini" @click.stop="cancel(scope.row,scope.$index)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="pageInfo" :total="pageInfo.totalElements" :page.sync="pageInfo.currentPage" @pagination="pagination"></pagination>
    <!-- <el-dialog title="新增" :visible.sync="dialogAddSpuerUser">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-suffix=":">
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input type="password" v-model="form.phoneNumber"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.stop="cancel">取 消</el-button>
        <el-button type="primary" @click.stop="save">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import { api, confirm } from '@/utils'
import { listHandle, pagination } from '@/components'
export default {
  data () {
    return {
      params: {
        page: 1
      },
      checkData: [],
      pageInfo: {
        totalElements: 0,
        currentPage: 1
      },
      tableData: [],
      loading: false,
      // dialogAddSpuerUser: false,
      form: {
        phoneNumber: ''
      },
      rules: {
        phoneNumber: [{
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('手机号不能为空'))
            }
            if (!(/^1[34578]\d{9}$/.test(value))) {
              callback(new Error('请输入正确的手机号码'))
            } else {
              callback()
            }
          }
        }]
      },
      isAdd: false
    }
  },
  components: {
    listHandle,
    pagination
  },
  methods: {
    append () {
      var list = {
        id: '',
        phoneNumber: this.phoneNumber,
        createTime: null,
        isEdit: true,
        createUser: {
          name: null
        }
      }
      this.tableData.push(list)
      this.isAdd = true
    },
    remove () {
      if (this.isAdd) {
        this.$message.error('有超级用户未保存')
      } else {
        let checkIds = []
        for (let item = 0; item < this.checkData.length; item++) {
          checkIds.push(this.checkData[item].id)
        }
        confirm(`您确定删除选中的超级用户吗？`, '提示').then(() => {
          if (checkIds.length > 0) {
            this.$fly.post(api.superUserDelete, checkIds).then(data => {
              this.$message({
                message: '删除成功',
                duration: 2000,
                type: 'success'
              })
              this.params.page = 1
              this.getData(this.params)
            }).catch(() => {
              this.$message({
                message: '删除失败',
                duration: 2000,
                type: 'error'
              })
            })
          }
        })
      }
    },
    save (row, index) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$fly.post(api.superUserSave, { phoneNumber: this.form.phoneNumber }).then(data => {
            if (data.status === 100000) {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$refs['form'].resetFields()
              row.isEdit = false
              this.isAdd = false
              this.params.page = 1
              this.getData(this.params)
            } else if (data.status === 100004) {
              this.$message({
                message: `${data.message}`,
                type: 'error'
              })
            } else {
              this.$message({
                message: '保存失败',
                type: 'error'
              })
            }
          }).catch(() => {
            this.$message({
              message: '请求失败',
              type: 'error'
            })
          })
        }
      })
    },
    cancel (row, index) {
      this.$refs['form'].resetFields()
      row.isEdit = false
      this.tableData.splice(index, 1)
    },
    // 分页
    pagination (e) {
      this.params.page = e.page
      this.params.size = e.limit
      this.getData(this.params)
    },
    handleSelectionChange (e) {
      this.checkData = []
      this.lodash.map(e, (item) => {
        this.checkData.push({ id: item.id, status: item.status })
      })
      // this.checkData = this.lodash.map(e, 'id')
    },
    // 获取数据
    getData (params) {
      params.page--
      this.loading = true
      this.$fly.get(api.getSuperUsers, params).then(data => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        let { content, totalElements } = data.data
        this.tableData = content
        this.tableData.map(item => {
          item.isEdit = false
        })
        this.pageInfo = {
          totalElements: parseInt(totalElements),
          currentPage: params.page + 1
        }
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
<style lang="scss" scoped>
.tools-bar {
  justify-content: flex-end;
}
</style>
