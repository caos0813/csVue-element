<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <back></back>
      </div>
      <div class="button-wrap">
        <el-button type="warning" size="small" @click="submit">草稿</el-button>
        <!-- <el-button type="warning" size="small">下架</el-button> -->
      </div>
    </div>
    <el-form ref="form" :model="params" :rules="rules" label-width="80px">
      <el-form-item prop="pickerVal" label="产品">
        <picker v-model='params.pickerVal'></picker>
      </el-form-item>
      <el-form-item label="专题名称" prop="title">
        <el-col :span='12'>
          <el-input v-model="params.title"></el-input>
        </el-col>
        <!-- <el-col :span='4'>
          <el-form-item label-width="20px">
            <template>
              <el-checkbox v-model="params.isHomePageShow" :true-label='1' :false-label='0'>首页显示</el-checkbox>
            </template>
          </el-form-item>
        </el-col> -->
      </el-form-item>
      <el-form-item label="简介" prop="introduction">
        <el-input type="textarea" :rows="3" placeholder="请输入简介" v-model="params.introduction"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="filePath">
        <upload v-model='params.filePath'></upload>
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
      if (value.length < 1) {
        callback(new Error('请选择产品和分类'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        title: [{ required: true, message: '请输入专题名称', trigger: 'blur' }],
        filePath: [{ required: true, message: '请上传封面', trigger: 'blur' }],
        pickerVal: [{ required: true, validator: validatePickerVal, trigger: 'change' }],
        introduction: [{ required: true, message: '请输入简介', trigger: 'blur' }]
      },
      params: {
        title: '',
        isHomePageShow: 0,
        pickerVal: [],
        filePath: '',
        introduction: ''
      }
    }
  },
  components: {
    upload,
    picker
  },
  methods: {
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let { title, filePath, pickerVal, id, introduction } = this.params
          this.$fly.post(api.specialHandle, {
            id,
            title,
            filePath,
            productId: pickerVal[0],
            introduction
          }).then(data => {
            this.$message({
              message: '保存成功',
              duration: 2000,
              type: 'success'
            })
            this.$refs['form'].resetFields()
            this.goBack()
          }).catch(() => {
            this.$message({
              message: '保存失败',
              duration: 2000,
              type: 'error'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    let { type } = this.$route.params
    let { id } = this.$route.query
    if (type === 'edit') {
      this.$fly.get(api.specialDetail, {
        id
      }).then(data => {
        this.params = data
        this.params.pickerVal = [data.productId]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
