<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <el-form ref="form" :model="params" :rules="rules" >
        <el-form-item prop="userName">
          <el-input v-model="params.userName" placeholder="请输入账号" name="userName"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input v-model="params.passWord" type="passWord" placeholder="请输入密码" name="passWord"></el-input>
        </el-form-item>
        <el-form-item class="text-center">
          <el-button class="btn" type="primary" native-type="submit" @click.prevent="submit"  round >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { api } from '@/utils'
import Cookies from 'js-cookie'
export default ({
  data () {
    return {
      a: null,
      params: {

      },
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'change' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, message: '密码长度不正确', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log(this.params)
          this.$fly.post(api.authentication, this.params).then(data => {
            Cookies.set('user', {
              userName: this.params.userName,
              token: data.token
            }, { expires: 7 })
            this.$message({
              message: '登录成功!',
              type: 'success'
            })
            this.$router.replace({
              name: 'index'
            })
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
})
</script>
<style lang='scss' scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  align-items: stretch;
  background: url("~/static/images/login_bg.jpg") no-repeat;
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
