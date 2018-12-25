<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <back></back>
      </div>
      <div class="button-wrap">
        <el-button type="primary" size="small" @click="submit">保存</el-button>
      </div>
    </div>
    <el-form ref="form" :model="params" :rules="rules" label-width="80px">
      <el-form-item label="专题名称" prop="title">
        <el-col :span='12'>
          <el-input v-model="params.title" maxlength="20"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="封面" prop="picture">
        <upload v-model='params.picture'></upload>
      </el-form-item>
      <el-form-item label="显示更多" prop="isMore">
        <el-switch v-model="params.isMore" @change="selectChange"></el-switch>
      </el-form-item>
      <el-form-item label="简介" prop="introduction">
        <el-input type="textarea" :rows="6" placeholder="请输入简介" v-model="params.introduction"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { api } from '@/utils'
import { upload, picker } from '@/components'
export default {
  data () {
    return {
      rules: {
        title: [{ required: true, message: '专题名称不能为空，且最多输入20个字符', trigger: 'blur' }]
        // introduction: [{ required: true, message: '请输入简介', trigger: 'blur' }]
      },
      params: {
        title: '',
        picture: '',
        introduction: '',
        isMore: false
      }
    }
  },
  components: {
    upload,
    picker
  },
  methods: {
    selectChange (e) {
      this.params.isMore = e
    },
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let { title, picture, isMore, id, introduction } = this.params
          let module
          if (this.$route.params.type === 'edit') {
            module = this.params.module.id
          } else {
            module = this.$route.query.moduleId
          }
          this.$fly.post(api.saveSpecialTopicInfo, {
            id,
            title,
            picture,
            isMore: isMore,
            moduleId: module,
            introduction,
            status: 1
          }).then(data => {
            if (data.status === 100000) {
              this.$message({
                message: '保存成功',
                duration: 2000,
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
      this.$fly.get(api.queryOneSpecialTopicInfo, {
        id
      }).then(data => {
        if (data.status === 100000) {
          this.params = data.data
        } else {
          this.$message({
            message: '查询失败',
            duration: 2000,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
