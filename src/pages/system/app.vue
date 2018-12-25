<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <back></back>
      </div>
      <div class="button-wrap">
        <el-button type="primary" size="small" @click="save">保存</el-button>
      </div>
    </div>
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="80px">
      <!-- <upload v-model='params.picture'></upload> -->
      <el-form-item label="产品" prop="product">
        <picker v-model="form.product" size="small" :span="-1" :column="1"></picker>
      </el-form-item>
      <el-form-item label="平台" prop="platform">
        <el-select v-model="form.platform" placeholder="请选择平台">
          <el-option v-for="(item,index) in platformData" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="apk" prop="ossUrl" v-if="form.platform==='android'">
        <upload v-model="form.ossUrl" type="apk" accept="application/*" :path="path" CDN="http://fdapprelease.oss-cn-huhehaote.aliyuncs.com/"></upload>
      </el-form-item>
      <el-form-item label="版本号" prop="version">
        <el-col :span='6'>
          <el-input v-model="form.version"></el-input>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { api } from '@/utils'
import { upload, picker } from '@/components'
export default {
  data () {
    let validatePickerVal = (rule, value, callback) => {
      console.log(value.length)
      if (value.length < 1) {
        callback(new Error('请选择产品'))
      } else {
        callback()
      }
    }
    return {
      form: {
        version: '',
        ossUrl: '',
        product: [1],
        platform: 'android'
      },
      productData: [{
        id: 1,
        name: '选科'
      }, {
        id: 2,
        name: '志愿'
      }],
      platformData: [{
        value: 'android',
        label: 'android'
      }, {
        value: 'ios',
        label: 'ios'
      }],
      rules: {
        ossUrl: [{ required: true, message: '请上传apk文件', trigger: 'blur' }],
        product: [{ required: true, validator: validatePickerVal, trigger: 'change' }],
        platform: [{ required: true, message: '请选择平台', trigger: 'change' }],
        version: [{ required: true, message: '请输入版本号', trigger: 'blur' }]
      },
      isExit: false
    }
  },
  components: {
    upload,
    picker
  },
  computed: {
    path () {
      let path
      if (process.env.NODE_ENV === 'production') {
        path = 'official/android/'
      } else {
        path = 'test/android/'
      }
      return path
    }
  },
  methods: {
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.version !== '') {
            this.VersionIsExit().then(data => {
              if (data.data) {
                this.$message({
                  message: '当前产品的平台下已存在此版本号',
                  type: 'error'
                })
              } else {
                let { product, platform, version, ossUrl } = this.form
                this.$fly.post(api.appSave, {
                  product: { id: product[0] },
                  version,
                  platform,
                  ossUrl: platform === 'android' ? ossUrl : null
                }).then(data => {
                  if (data.status === 100000) {
                    this.$message({
                      message: '保存成功',
                      type: 'success'
                    })
                    this.$refs['form'].resetFields()
                    this.goBack()
                  } else {
                    this.$message({
                      message: '保存失败',
                      type: 'error'
                    })
                  }
                }).catch(() => {
                  this.$message({
                    message: '请求失败',
                    duration: 2000,
                    type: 'error'
                  })
                })
              }
            })
          }
        }
      })
    },
    VersionIsExit () {
      let { product, platform, version } = this.form
      return this.$fly.post(api.VersionIsExit, {
        productId: product[0],
        version,
        platform
      })
    }
  }
}
</script>
