<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <back></back>
      </div>
      <div class="button-wrap">
        <el-button type="warning" size="small" @click="submit">保存</el-button>
      </div>
    </div>
    <el-form ref="form" :model="params" :rules="rules" label-width="80px">
      <el-form-item label="专题" prop="pickerVal">
        <picker v-model="params.pickerVal" :column="2"></picker>
        <el-col :span='4'>
          <el-form-item label-width="20px" prop="delivery">
            <template>
              <el-checkbox v-model="params.audioFlag" :true-label='1' :false-label='0'>音频</el-checkbox>
            </template>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-col :span='12'>
          <el-input v-model="params.title"></el-input>
        </el-col>
        <el-col :span='4'>
          <el-form-item label-width="20px" prop="delivery">
            <template>
              <el-checkbox v-model="params.isHomePageShow" :true-label='1' :false-label='0'>首页显示</el-checkbox>
            </template>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-col :span='6'>
          <el-date-picker v-model="params.publishTime" type="datetime" placeholder="请选择发布时间" class="full">
          </el-date-picker>
        </el-col>
      </el-form-item>
      <div v-if="params.audioFlag===1">
        <el-form-item label="音频" prop="audioPath">
          <upload v-model="params.audioPath" type="audio" accept="audio/*" path="audio/article/"></upload>
        </el-form-item>
        <el-form-item label="音频描述"  prop="textarea">
          <el-col :span='12'>
            <el-input v-model="params.textarea" placeholder="请输入音频描述" type="textarea" :rows="6"></el-input>
          </el-col>
        </el-form-item>
      </div>
      <div v-show="params.audioFlag!==1">
        <el-form-item label="封面" :prop="!params.audioFlag?'image':''">
          <upload v-model="params.image" path="image/article/"></upload>
        </el-form-item>
        <el-form-item :prop="!params.audioFlag?'content':''">
          <el-col :span="18">
            <Tinymce :height="600" ref="editor" v-model="params.content" />
          </el-col>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { api } from '@/utils'
import { upload, picker } from '@/components'
export default {
  data () {
    let validatePickerVal = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error('请选择产品分类和专题'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        title: [{ required: true, message: '请输入专题名称', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        textarea: [{ required: true, message: '请输入音频描述', trigger: 'blur' }],
        image: [{ required: true, message: '请上传封面', trigger: 'blur' }],
        audioPath: [{ required: true, message: '请上传音频', trigger: 'blur' }],
        pickerVal: [{ required: true, validator: validatePickerVal, trigger: 'blur' }]
      },
      params: {
        title: '',
        isHomePageShow: 0,
        audioFlag: 0,
        pickerVal: [],
        image: ''
      }
    }
  },
  components: {
    upload,
    Tinymce,
    picker
  },
  methods: {
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let { title, isHomePageShow, image, pickerVal, id, content, publishTime, audioPath, audioFlag, textarea } = this.params
          this.$fly.post(api.articleHandle, {
            id,
            title,
            audioPath: audioFlag ? audioPath : null,
            isHomePageShow,
            publishTime: publishTime ? new Date(publishTime).getTime() : null,
            image: audioFlag ? null : image,
            content: audioFlag ? textarea : content,
            specialTopicId: pickerVal[1],
            productId: pickerVal[0]
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
      this.$fly.get(api.articleDetail, {
        id
      }).then(data => {
        this.params = data
        if (this.lodash.isNull(data.audioPath)) {
          this.params.audioFlag = 0
        } else {
          this.params.audioFlag = 1
          this.params.textarea = data.content
        }
        this.params.pickerVal = [data.product.id, data.specialTopic.id]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
