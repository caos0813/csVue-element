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
    <el-form ref="form" :model="params" :rules="rules" label-width="90px" label-suffix=":">
      <el-form-item label="标题" prop="title">
        <el-col :span='12'>
          <el-input v-model="params.title" maxlength="20"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="文章标签" v-if="moduleId !== 6" prop="isTag">
        <el-col :span="6">
          <el-switch v-model="params.isTag" @change="selectChange"></el-switch>
        </el-col>
      </el-form-item>
      <el-form-item label="文章标签" prop="tagVal" v-if="params.isTag">
        <el-col :span="6">
          <el-select v-model="params.tagVal" placeholder="请选择标签" class="full">
            <el-option v-for="(item,index) in tagData" :key="index" :label="item.name" :value="item.id
          "></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="专题" prop="specialVal" v-else>
        <el-col :span="6">
          <el-select v-model="params.specialVal" placeholder="请选择专题" class="full">
            <el-option v-for="(item,index) in specialData" :key="index" :label="item.title" :value="item.id
          "></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-col :span="6">
          <el-select v-model="params.type" placeholder="请选择类型" class="full" @change="typeChange" size="small">
            <el-option :label="ceil.label" :value="ceil.id" v-for="(ceil,$index) in typeData" :key="$index"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="文件" prop="path" v-if="params.type!==0">
        <upload v-model="params.path" type="audio" accept="audio/*" path="audio/article/" v-if="params.type===1"></upload>
        <upload v-model="params.path" type="video" accept="video/*" path="video/article/" v-if="params.type===2"></upload>
      </el-form-item>
      <el-form-item label="封面" prop="image">
        <upload v-model="params.image" path="image/article/" width="1125" height="750"></upload>
      </el-form-item>
      <el-form-item label="简介" prop="introduction">
        <el-input type="textarea" :rows="5" placeholder="请输入简介" v-model="params.introduction"></el-input>
      </el-form-item>
      <el-form-item prop="content">
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
import Tinymce from '@/components/Tinymce'
import { api } from '@/utils'
import { upload, picker } from '@/components'
export default {
  data () {
    return {
      rules: {
        title: [{ required: true, message: '文章标题不能为空，且最多输入20个字符', trigger: 'blur' }],
        tagVal: [{ required: true, message: '请选择文章标签', trigger: 'change' }],
        specialVal: [{ required: true, message: '请选择专题', trigger: 'change' }],
        // type: [{ required: true, message: '请选择文件类型', trigger: 'change' }],
        path: [{ type: 'string', required: true, message: '请上传类型文件', trigger: 'blur' }],
        // image: [{ type: 'string', required: true, message: '请上传封面', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      params: {
        title: '',
        isTag: false,
        tagVal: '',
        specialVal: '',
        type: 0,
        path: '',
        image: '',
        introduction: '',
        content: ''
      },
      tagData: [],
      specialData: [],
      typeData: [{
        id: 0,
        label: '纯文本'
      }, {
        id: 1,
        label: '音频'
      }, {
        id: 2,
        label: '视频'
      }],
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
      },
      moduleIds: ''
    }
  },
  components: {
    upload,
    Tinymce,
    picker
  },
  methods: {
    selectChange (e) {
      this.params.isTag = e
    },
    typeChange (e) {
      this.params.path = ''
    },
    // 直接发布
    release () {
      this.postData('form', api.zhiyuan_articlePublishNow, 1)
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
      this.postData('addForm', api.zhiyuan_articlePublishDelay, 4)
    },
    cancel () {
      this.$refs['addForm'].resetFields()
      this.timeDialog = false
    },
    // 保存为草稿
    submit () {
      this.postData('form', api.zhiyuan_articleHandle, 2)
    },
    postData (refs, link, status) {
      this.$refs[refs].validate((valid) => {
        if (valid) {
          let { id, title, isTag, tagVal, specialVal, type, path, image, introduction, content } = this.params
          console.log(id)
          let moduleId
          if (this.$route.params.type === 'edit') {
            moduleId = this.params.moduleId
          } else {
            moduleId = this.moduleIds
          }
          let releaseTime = this.timeDialog ? new Date(this.addForm.publishTime).getTime() : null
          this.$fly.post(link, {
            moduleId: moduleId,
            id,
            title,
            specialTopicInfoId: isTag === true ? null : specialVal,
            label: isTag === true ? tagVal : null,
            fileType: type,
            videoFile: path,
            picture: image,
            content,
            introduction,
            releaseTime: releaseTime,
            status: status
          }).then(data => {
            if (data.status === 100000) {
              this.$message({
                message: '保存成功',
                duration: 2000,
                type: 'success'
              })
              this.$refs['form'].resetFields()
              this.timeDialog = false
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
    },
    getArticleMajor () {
      let module
      if (this.$route.params.type === 'edit') {
        module = this.params.moduleId
      } else {
        module = this.$route.query.moduleId
      }
      this.$fly.get(api.queryArticleInfoCondition, { moduleId: module }).then(data => {
        let { label, specialTopicInfoBean } = data
        this.tagData = label
        this.specialData = specialTopicInfoBean
      }).catch(() => {
        this.$message({
          message: '请求失败',
          duration: 2000,
          type: 'error'
        })
      })
    }
  },
  created () {
    let { type } = this.$route.params
    let { id, moduleId } = this.$route.query
    this.moduleIds = moduleId
    if (type === 'edit') {
      this.$fly.get(api.zhiyuan_articleDetail, {
        id
      }).then(data => {
        if (data.status === 100000) {
          let { fileType, videoFile, picture, specialTopicInfoTitle, articleInfoLabelId, specialTopicInfoId, content, title, introduction, moduleId, id } = data.data
          this.params.title = title
          this.params.content = content
          this.params.introduction = introduction
          this.params.type = fileType
          this.params.path = videoFile
          this.params.image = picture
          this.params.moduleId = moduleId
          this.params.id = id
          if (specialTopicInfoTitle === null) {
            this.params.isTag = true
            this.params.tagVal = articleInfoLabelId
          } else {
            this.params.isTag = false
            this.params.specialVal = specialTopicInfoId
          }
          this.getArticleMajor()
        } else {
          this.$message({
            message: '查询失败',
            duration: 2000,
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
      this.getArticleMajor()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
