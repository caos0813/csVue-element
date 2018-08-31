<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <back></back>
      </div>
      <div class="button-wrap">
        <el-button type="primary" size="small" @click="release">直接发布</el-button>
        <el-button type="info" size="small" @click="timeRelease">定时发布</el-button>
        <el-button type="warning" size="small" @click="submit">草稿</el-button>
      </div>
    </div>
    <el-form ref="form" :model="params" :rules="rules" label-width="80px">
      <el-form-item label="专题" prop="pickerVal">
        <picker v-model="params.pickerVal" :column="2"></picker>
        <el-col :span='4'>
          <el-form-item label-width="20px" >
            <template>
              <el-checkbox v-model="params.audioFlag" :true-label='1' :false-label='0' :disabled="isAudioFlag">音频</el-checkbox>
            </template>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-col :span='12'>
          <el-input v-model="params.title"></el-input>
        </el-col>
        <el-col :span='4'>
          <el-form-item label-width="20px">
            <template>
              <el-checkbox v-model="params.isHomePageShow" :true-label='1' :false-label='0'>首页显示</el-checkbox>
            </template>
          </el-form-item>
        </el-col>
      </el-form-item>
      <div v-if="params.audioFlag===1">
        <el-form-item label="音频" prop="audioPath">
          <upload v-model="params.audioPath" type="audio" accept="audio/*" path="audio/article/"></upload>
        </el-form-item>
        <el-form-item label="音频描述" prop="textarea">
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
    <el-dialog title="定时发布" :visible.sync="timeDialog" width="500px" :close-on-click-modal="false">
      <el-form :model="addForm" inline-message ref="addForm" :rules="formRules" label-suffix=":" label-width="100">
        <el-form-item label="发布时间" prop="publishTime">
          <el-col :span='12'>
            <el-date-picker v-model="addForm.publishTime" type="datetime" :picker-options="pickerOptions2" placeholder="请选择发布时间" class="full">
            </el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </el-dialog>
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
        image: [{ type: 'string', required: true, message: '请上传封面', trigger: 'blur' }],
        audioPath: [{ required: true, message: '请上传音频', trigger: 'blur' }],
        pickerVal: [{ required: true, validator: validatePickerVal, trigger: 'change' }]
      },
      params: {
        title: '',
        isHomePageShow: 0,
        audioFlag: 0,
        pickerVal: [],
        image: ''
      },
      isAudioFlag: false,
      timeDialog: false,
      addForm: {
        publishTime: ''
      },
      pickerOptions2: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      formRules: {
        publishTime: [{ type: 'date', required: true, message: '时间不能为空', trigger: 'change' }]
      }
    }
  },
  components: {
    upload,
    Tinymce,
    picker
  },
  methods: {
    // 直接发布
    release () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log('release')
          this.postData(api.articlePublishNow)
        }
      })
    },
    timeRelease () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.timeDialog = true
          if (this.$refs['addForm']) {
            this.$refs['addForm'].resetFields()
          }
        }
      })
    },
    // 定时发布
    save () {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.postData(api.articlePublishDelay)
        }
      })
    },
    cancel () {
      this.$refs['addForm'].resetFields()
      this.timeDialog = false
    },
    // 保存为草稿
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.postData(api.articleHandle)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    postData (link) {
      let { title, isHomePageShow, image, pickerVal, id, content, audioPath, audioFlag, textarea } = this.params
      console.log(this.params)
      let publishTime = this.timeDialog ? new Date(this.addForm.publishTime).getTime() : null
      this.$fly.post(link, {
        id,
        title,
        audioPath: audioFlag ? audioPath : null,
        isHomePageShow,
        publishTime: publishTime,
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
        this.timeDialog = false
        this.goBack()
      }).catch(() => {
        this.$message({
          message: '保存失败',
          duration: 2000,
          type: 'error'
        })
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
        console.log(this.lodash.isNull(data.audioPath))
        if (this.lodash.isNull(data.audioPath)) {
          this.params.audioFlag = 0
          this.isAudioFlag = true
        } else {
          this.params.audioFlag = 1
          this.isAudioFlag = true
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
