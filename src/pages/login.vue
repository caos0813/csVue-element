<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <el-form ref="form" :model="params" :rules="rules">
        <el-form-item prop="userName">
          <el-input v-model="params.username" placeholder="请输入账号" name="userName"></el-input>
          <!-- <el-input v-model="params.name" placeholder="请输入账号" name="userName"></el-input> -->
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input v-model="params.password" type="passWord" placeholder="请输入密码" name="passWord"></el-input>
          <!-- <el-input v-model="params.passwords" type="passWord" placeholder="请输入密码" name="passWord"></el-input> -->
        </el-form-item>
        <el-form-item class="text-center">
          <el-button class="btn" type="primary" native-type="submit" @click.prevent="submit" round>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { api } from '@/utils'
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      params: {},
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'change' }
        ],
        passwords: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, message: '密码长度不正确', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    async getConfig (data) {
      try {
        let { token } = data.token
        // TODO:let { token } = data
        let uploadConfig = await this.$fly.get(api.uploadToken, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        // console.log(uploadConfig)
        // this.$store.commit('SET_AUTHORITY', [])
        // console.log(data.user.roles[0])
        let authorityData = !this.lodash.isUndefined(data.user.roles[0]) ? data.user.roles[0].authorities : []
        let authority = []
        authorityData.map(item => {
          authority.push(item.name)
        })
        // this.$store.commit('SET_AUTHORITY', authority)
        // console.log(this.$store.state.authority)
        // console.log(authority)
        // console.log(data.user.roles[0].id)
        Cookies.set('user', {
          userName: data.user.username,
          token: token,
          uploadConfig: uploadConfig,
          authority: authority,
          rolesId: !this.lodash.isUndefined(data.user.roles[0]) ? data.user.roles[0].id : '',
          rolesName: !this.lodash.isUndefined(data.user.roles[0]) ? data.user.roles[0].name : ''
        }, { expires: 7 })
        this.$message({
          message: '登录成功!',
          type: 'success'
        })
        this.$router.replace({
          name: 'index'
        })
      } catch (err) {
        console.log(err)
        this.$message({
          message: '登录失败',
          type: 'error'
        })
      }
    },
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          Cookies.remove('user')
          this.$fly.post(api.login, this.params).then(data => {
            /* 获取阿里上传配置参数 */
            // TODO:this.getConfig(data)
            if (data.status === 100000) {
              this.getConfig(data.data.body)
            } else if (data.status === 100003) {
              this.$message({
                message: `${data.message}`,
                type: 'error'
              })
            } else {
              this.$message({
                message: '登录失败，账号或密码错误',
                type: 'error'
              })
            }
          }).catch(() => {
            this.$message({
              message: '登录失败',
              type: 'error'
            })
          })
        } else {
          console.log('error submit!!')
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  align-items: stretch;
  background: url("~/static/images/login_bg.jpg") no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    width: 400px;
    background: $light;
    padding: 30px 20px 0;
    border-radius: 10px;
    overflow: hidden;
    margin-top: -120px;
    .btn {
      padding-left: 50px;
      padding-right: 50px;
    }
  }
}
</style>
