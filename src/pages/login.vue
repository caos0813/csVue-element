<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <el-form ref="form" :model="params" :rules="rules">
        <el-form-item prop="name">
          <el-input v-model="params.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="params.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="text-center">
          <el-button class="btn" type="primary" round @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default ({
  data () {
    return {
      a: null,
      params: {

      },
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'change' }
        ],
        password: [
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
          alert('submit!')
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
