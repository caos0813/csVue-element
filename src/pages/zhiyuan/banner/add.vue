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
      <el-form-item label="标题" prop="title">
        <el-col :span='12'>
          <el-input v-model="params.title" placeholder="请输入标题"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="封面" prop="image">
        <upload v-model="params.image" path="image/article/"></upload>
      </el-form-item>
      <el-form-item label="链接地址">
        <el-switch v-model="isLink" @change="selectChange"></el-switch>
      </el-form-item>
      <el-form-item v-if='isLink' label="链接地址" :prop="isLink?'link':''">
        <el-col :span='12'>
          <el-input v-model="params.link" placeholder="请输入链接地址"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item v-if='!isLink' :prop="!isLink?'content':''">
        <el-col :span="18">
          <Tinymce :height="600" ref="editor" v-model="params.content" />
        </el-col>
      </el-form-item>
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
import { api } from '@/utils'
import Tinymce from '@/components/Tinymce'
import { upload } from '@/components'
export default {
  data () {
    return {
      params: {
        title: '',
        image: '',
        link: '',
        content: '',
        status: ''
      },
      isLink: false,
      rules: {
        title: [{ required: true, message: '请输入专题名称', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        image: [{ type: 'string', required: true, message: '请上传封面', trigger: 'blur' }],
        link: [{ required: true, message: '请输入链接地址', trigger: 'blur' }]
      },
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
    Tinymce
  },
  methods: {
    // 直接发布
    release () {
      this.params.status = 1
      this.postData('form', api.bannerPublishNow)
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
    // 保存为草稿
    submit () {
      this.params.status = 2
      this.postData('form', api.bannerSave)
    },
    postData (refs, links) {
      this.$refs[refs].validate((valid) => {
        if (valid) {
          let { title, image, link, id, content, status } = this.params
          let publishTime = this.timeDialog ? new Date(this.addForm.publishTime).getTime() : null
          this.$fly.post(links, {
            id,
            title,
            link: this.isLink ? link : null,
            publishTime: publishTime,
            image: image,
            content: !this.isLink ? content : null,
            status: status
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
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 定时发布
    save () {
      this.params.status = 4
      this.postData('addForm', api.bannerPublishDelay)
    },
    cancel () {
      this.$refs['addForm'].resetFields()
      this.timeDialog = false
    },
    selectChange (e) {
      this.isLink = e
      if (e) {
        this.params.content = ''
      } else {
        this.params.url = ''
      }
    }
  },
  created () {
    let { type } = this.$route.params
    let { id } = this.$route.query
    if (type === 'edit') {
      this.$fly.get(api.bannerDetail, {
        id
      }).then(data => {
        this.params = data
        if (this.lodash.isNull(data.link)) {
          this.isLink = false
          this.params.content = data.content
        } else {
          this.isLink = true
          this.params.url = data.link
        }
      })
    }
  }
}
</script>
