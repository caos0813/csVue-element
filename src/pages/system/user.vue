<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <back></back>
      </div>
      <div class="button-wrap">
        <el-button type="primary" size="small" @click="save('continue')">保存并继续添加</el-button>
        <el-button type="warning" size="small" @click="save">保存</el-button>
      </div>
    </div>
    <el-form ref="form" :model="params" status-icon :rules="rules" label-width="80px">
      <el-form-item label="账号" prop="username">
        <el-col :span='12'>
          <el-input v-model="params.username"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-col :span='12'>
          <el-input v-model="params.nickname"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-col :span='12'>
          <el-input v-model.number="params.phoneNumber" maxlength="11"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="type==='add'">
        <el-col :span='12'>
          <el-input type="password" v-model="params.password"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select v-model="params.department" placeholder="请选择部门">
          <el-option v-for="(item,index) in department" :key="index" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="params.role" placeholder="请选择角色">
          <el-option v-for="(item,index) in role" :key="index" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" :rows="10" placeholder="请输入简介" v-model="params.remark"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { api } from '@/utils'
export default {
  data () {
    let validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    let validatorName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('登录账号不能为空'))
      }
      if (!(/^[0-9a-zA_Z]+$/).test(value)) {
        callback(new Error('登录账号只能是英文字母或数字'))
      } else {
        this.$fly.get(api.nameIsExits, { username: this.params.username.toString() }).then(data => {
          if (!data.data) {
            callback()
          } else {
            callback(new Error('登录账号已存在'))
          }
        })
        // callback()
      }
    }
    let validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        if (!(/^[0-9a-zA_Z]+$/).test(value)) {
          callback(new Error('密码只能是英文字母或数字'))
        } else {
          callback()
        }
      }
    }
    return {
      department: [],
      role: [],
      params: {
        nickname: '',
        username: '',
        phoneNumber: '',
        password: null,
        department: '',
        role: '',
        remark: null
      },
      rules: {
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        username: [{ required: true, trigger: 'blur', validator: validatorName }],
        phoneNumber: [{ required: true, trigger: 'blur', validator: validatePhone }],
        password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        department: [{ required: true, message: '请选择部门', trigger: 'change' }],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }]
      },
      type: '',
      oldUsername: ''
    }
  },
  methods: {
    save (type) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.save_post().then(data => {
            if (data.status !== 100000) {
              return this.$message({
                message: '接口调用失败',
                type: 'error'
              })
            }
            this.$refs['form'].resetFields()
            if (type !== 'continue') {
              this.goBack()
            }
            console.log(data)
          })
        }
      })
    },
    save_post () {
      let { nickname, username, phoneNumber, password, department, role, remark } = this.params
      let { id } = this.$route.query
      return this.$fly.post(api.userSave, {
        id,
        nickname,
        username,
        phoneNumber: phoneNumber,
        password,
        departmentId: department,
        roleId: role,
        remark
      })
    }
  },
  created () {
    let { type } = this.$route.params
    this.type = type
    let { id } = this.$route.query
    this.$fly.get(api.getRoles).then(data => {
      if (data.status !== 100000) {
        return this.$message({
          message: '接口调用失败',
          type: 'error'
        })
      }
      let { RoleList, departmentList } = data.data
      this.department = departmentList
      this.role = RoleList
    })
    if (type === 'edit') {
      this.$fly.get(api.userGetOne, {
        id
      }).then(datas => {
        if (datas.status !== 100000) {
          return this.$message({
            message: '接口调用失败',
            type: 'error'
          })
        }
        let { data } = datas
        this.params = data
        this.params.department = data.department.id
        this.params.role = data.roles[0].id
      })
    }
  }
}
</script>
