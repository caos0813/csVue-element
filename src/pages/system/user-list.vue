<template>
  <div class="page">
    <div class="tools-bar">
      <listHandle :showSoldout="false" :checkData="checkData" @refresh="refresh" :showDelete="false">
        <el-button type="danger" size="small" @click="handleDelete" :disabled="checkData.length<1">禁用</el-button>
      </listHandle>
    </div>
    <el-table ref="multipleTable" header-cell-class-name="tableHeader" :data="tableData" v-loading="loading" element-loading-text="拼命加载中" border stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" label-class-name="checkLabel">
      </el-table-column>
      <el-table-column type="index" width="50" align="center">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center" min-width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="username" label="账号" align="center" min-width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="phoneNumber" label="手机号" align="center" width="150">
      </el-table-column>
      <el-table-column prop="department" label="部门" align="center">
        <template slot-scope="scope" v-if="scope.row.department">{{ scope.row.department.name }}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center" :filters="[{ text: '禁用', value: 'DISABLED' }, { text: '可用', value: 'ENABLED' }]" :filter-method="filterTag" filter-placement="right">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 'DISABLED' ? 'danger' : 'success'" disable-transitions>
            {{scope.row.status === 'DISABLED'?'禁用':'可用'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope" v-if="scope.row.roles.length===1">{{ scope.row.roles[0].name }}</template>
      </el-table-column>
      <el-table-column label="创建时间" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.createTime | dateTime('yyyy-MM-dd hh:mm:ss') }}</template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="200" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope ">
          <el-button type="text " size="mini">
            <router-link :to="{name:'system/user',params:{type:'edit'},query:{id:scope.row.id}}" tag="span">编辑</router-link>
          </el-button>
          <el-button type="text" size="mini" @click.stop="resetPassword(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="pageInfo" :total="pageInfo.totalElements" :page.sync="pageInfo.currentPage" @pagination="pagination"></pagination>
    <el-dialog title="重置密码" :visible.sync="dialogResetPassword" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-suffix=":">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="surePassword">
          <el-input type="password" v-model="form.surePassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.stop="cancel">取 消</el-button>
        <el-button type="primary" @click.stop="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { api, confirm } from '@/utils'
import { listHandle, pagination } from '@/components'
import Cookies from 'js-cookie'
export default {
  data () {
    let validateOldPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入旧密码'))
      } else {
        this.$fly.post(api.existPassword, { id: this.userId, oldPassword: value }).then(data => {
          if (data.status === 100000) {
            if (!data.data) {
              callback(new Error('旧密码错误'))
            } else {
              callback()
            }
          } else {
            this.$message({
              message: '请求错误',
              type: 'error'
            })
          }
        })
      }
    }
    let validateNewPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
      } else {
        if (!(/^[0-9a-zA_Z]+$/).test(value)) {
          callback(new Error('密码只能是英文字母或数字'))
        } else {
          if (this.form.oldPassword === value) {
            callback(new Error('两次密码不能一致'))
          } else {
            callback()
          }
        }
      }
    }
    let validateSurePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入确认密码'))
      } else {
        if (value !== this.form.newPassword) {
          callback(new Error('密码不一致'))
        } else {
          callback()
        }
      }
    }
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
      dialogResetPassword: false,
      form: {
        oldPassword: null,
        newPassword: null,
        surePassword: ''
      },
      rules: {
        oldPassword: [{ required: true, validator: validateOldPassword, trigger: 'blur' }],
        newPassword: [{ required: true, validator: validateNewPassword, trigger: 'blur' }],
        surePassword: [{ required: true, validator: validateSurePassword, trigger: 'blur' }]
      },
      userId: '',
      username: '',
      isDeleteShelf: false
    }
  },
  components: {
    listHandle,
    pagination
  },
  methods: {
    handleDelete () {
      let txt = '禁用'
      this.checkIds = []
      confirm(`您确定将选择的用户${txt}吗？`, '提示').then(() => {
        for (let item = 0; item < this.checkData.length; item++) {
          if (this.checkData[item].status === 'DISABLED') {
            this.$message.error(`已禁用的用户不能${txt}`)
            this.checkIds = []
            return
          } else {
            this.checkIds.push(this.checkData[item].id)
          }
        }
        if (this.checkIds.length > 0) {
          this.$fly.post(api['system/userDelete'], { ids: this.checkIds, status: 'disabled' }).then(data => {
            if (data.status !== 100000) {
              return this.$message({
                message: `${txt}失败`,
                duration: 2000,
                type: 'error'
              })
            } else {
              this.$message({
                message: `${txt}成功`,
                duration: 2000,
                type: 'success'
              })
              this.refresh()
            }
          }).catch(() => {
            this.$message({
              message: `${txt}失败`,
              duration: 2000,
              type: 'error'
            })
          })
        }
      })
    },
    filterTag (value, row) {
      return row.status === value
    },
    resetPassword (row) {
      console.log(row)
      this.userId = row.id
      this.username = row.username
      this.dialogResetPassword = true
      this.$nextTick(() => {
        this.$refs['form'].resetFields()
      })
    },
    cancel () {
      this.$refs['form'].resetFields()
      this.dialogResetPassword = false
    },
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let { oldPassword, newPassword } = this.form
          this.$fly.post(api.resetPassword, { id: this.userId, oldPassword, newPassword }).then(data => {
            if (data.status === 100000) {
              this.$refs['form'].resetFields()
              this.dialogResetPassword = false
              this.$message({
                message: '重置密码成功',
                type: 'success'
              })
              if (this.username === Cookies.getJSON('user').userName) {
                this.signOut('您重置了当前用户的密码，请重新登录')
              }
            } else {
              this.$message({
                message: '重置密码失败',
                type: 'error'
              })
            }
          })
        }
      })
    },
    refresh () {
      this.params.page = 1
      if (this.isDeleteShelf) {
        this.signOut('您删除了当前用户，请重新登录')
      } else {
        this.getData(this.params)
      }
    },
    handleSelectionChange (e) {
      this.checkData = []
      this.lodash.map(e, (item) => {
        this.checkData.push({ id: item.id, status: item.status })
        if (item.username === Cookies.getJSON('user').userName) {
          this.isDeleteShelf = true
        }
      })
    },
    signOut (txt) {
      this.$message({
        message: `${txt}`,
        type: 'warning'
      })
      setTimeout(() => {
        Cookies.remove('user')
        this.$router.replace({
          name: 'login'
        })
      }, 500)
    },
    // 分页
    pagination (e) {
      this.params.page = e.page
      this.params.size = e.limit
      this.getData(this.params)
    },
    // 获取数据
    getData (params) {
      params.page--
      this.loading = true
      this.$fly.get(api.getUsers, params).then(data => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        if (data.status === 100000) {
          let { content, totalElements } = data.data
          this.tableData = content
          this.pageInfo = {
            totalElements: parseInt(totalElements),
            currentPage: params.page + 1
          }
        } else {
          this.$message({
            message: '请求失败',
            type: 'error'
          })
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
