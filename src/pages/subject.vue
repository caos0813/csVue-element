<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <back></back>
      </div>
      <div class="button-wrap">
        <el-button type="primary" size="small" @click="submit">保存</el-button>
        <!-- <el-button type="warning" size="small">下架</el-button> -->
        <el-button type="danger" size="small">删除</el-button>
      </div>
    </div>
    <el-form ref="form" :model="params" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-col :span='12'>
          <el-input v-model="params.title"></el-input>
        </el-col>
        <el-col :span='4'>
          <el-form-item label-width="20px">
            <template>
              <el-checkbox v-model="params.isHomePageShow">首页显示</el-checkbox>
            </template>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item prop="pickerVal" label="分类">
        <picker v-model='params.pickerVal'></picker>
      </el-form-item>
      <el-form-item label="封面">
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
      if (value.length < 2) {
        callback(new Error('请选择产品和分类'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        title: [{ required: true, message: '请输入专题名称', trigger: 'blur' }],
        pickerVal: [{ required: true, validator: validatePickerVal, trigger: 'blur' }]
      },
      params: {
        title: '',
        isHomePageShow: false,
        pickerVal: [],
        filePath: ''
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
          let { title, isHomePageShow, filePath, pickerVal } = this.params
          isHomePageShow = isHomePageShow ? 1 : 0
          this.$fly.post(api.saveAndUpdate, {
            title,
            isHomePageShow,
            filePath,
            moduleId: pickerVal[1],
            productId: pickerVal[0]
          }).then(data => {
            this.$message({
              message: '保存成功',
              duration: 2000,
              type: 'success'
            })
            this.$refs['form'].resetFields();
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
  }
}
</script>
<style lang="scss" scoped>
</style>
