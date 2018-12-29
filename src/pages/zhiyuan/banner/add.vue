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
          <el-input v-model="params.title" placeholder="请输入标题" maxlength="20"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="封面" prop="image">
        <upload v-model="params.image" path="image/article/" width="735" height="450"></upload>
      </el-form-item>
      <el-form-item label="选择文章">
        <el-switch v-model="params.isArticle" @change="selectChange"></el-switch>
      </el-form-item>
      <el-form-item v-if='params.isArticle' label="选择文章" :prop="params.isArticle?'pickerVal':''">
        <el-select v-model="params.pickerVal[0]" class="mRight_15" placeholder="请选择模块" @change="firstChange">
          <el-option v-for="(item,index) in firstData" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="params.pickerVal[1]" class="mRight_15" placeholder="请选择专题" @change="secondChange">
          <el-option v-for="(item,index) in secondData" :key="index" :label="item.title" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="params.pickerVal[2]" placeholder="请选择文章">
          <el-option v-for="(item,index) in threeData" :key="index" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-else :prop="!params.isArticle?'content':''">
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
    let validatePickerVal = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('请选择模块、专题和文章'))
      } else {
        callback()
      }
    }
    return {
      params: {
        title: '',
        image: '',
        isArticle: true,
        pickerVal: [],
        content: '',
        status: ''
      },
      firstData: [],
      secondData: [],
      threeData: [],
      rules: {
        title: [{ required: true, message: '标题不能为空，且最多输入20个字符', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        image: [{ type: 'string', required: true, message: '封面不能为空，且大小限制于735*450', trigger: 'change' }],
        pickerVal: [{ required: true, validator: validatePickerVal, trigger: 'change' }]
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
  watch: {
    pickerVal () {

    }
  },
  methods: {
    // 直接发布
    release () {
      this.params.status = 1
      this.postData('form', api.zhiyuan_bannerPublishNow)
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
      this.postData('form', api.zhiyuan_bannerSave)
    },
    postData (refs, links) {
      this.$refs[refs].validate((valid) => {
        if (valid) {
          let { title, image, isArticle, id, content, pickerVal, status } = this.params
          let publishTime = this.timeDialog ? new Date(this.addForm.publishTime).getTime() : null
          let moduleId
          if (this.$route.params.type === 'edit') {
            moduleId = this.params.moduleId
          } else {
            moduleId = this.$route.query.moduleId
          }
          console.log(pickerVal)
          this.$fly.post(links, {
            moduleId: moduleId,
            id,
            title,
            identification: isArticle ? 2 : 1,
            releaseTime: publishTime,
            picture: image,
            content: !isArticle ? content : null,
            articleInfoId: isArticle ? pickerVal[2] : null,
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
      this.postData('addForm', api.zhiyuan_bannerPublishDelay)
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
    },
    firstChange (e, init) {
      if (!init) {
        this.params.pickerVal[1] = null
        this.params.pickerVal[2] = null
      }
      let index = this.lodash.findIndex(this.firstData, (item) => (item.id === e))
      this.secondData = this.firstData[index].specialTopicInfoConditionBeans
    },
    secondChange (e) {
      let index = this.lodash.findIndex(this.secondData, (item) => (item.id === e))
      this.threeData = this.secondData[index].atricleSelectBeanList
    },
    getQueryCondition () {
      this.$fly.get(api.bannerQueryCondition, { productId: 3 }).then(data => {
        if (data.status === 100000) {
          this.firstData = data.data
          if (this.params.pickerVal.length) {
            if (!this.lodash.isUndefined(this.params.pickerVal[0])) {
              this.firstChange(this.params.pickerVal[0], true)
              if (!this.lodash.isUndefined(this.params.pickerVal[1])) {
                this.secondChange(this.params.pickerVal[1])
              }
            }
          }
        } else {
          this.$message({
            message: '请求失败',
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
    }
  },
  created () {
    let { type } = this.$route.params
    let { id } = this.$route.query
    if (type === 'edit') {
      this.$fly.get(api.zhiyuan_bannerDetail, {
        id
      }).then(data => {
        if (data.status === 100000) {
          let { id, articleInfoId, content, title, identification, picture, moduleId, specialTopicInfoId, moduleConditionId } = data.data
          this.params.id = id
          this.params.title = title
          this.params.content = content
          this.params.moduleId = moduleId
          if (identification === 1) {
            this.params.isArticle = false
          } else {
            this.params.isArticle = true
          }
          this.params.image = picture
          if (identification === 2) {
            this.params.pickerVal[0] = moduleConditionId
            this.params.pickerVal[1] = specialTopicInfoId
            this.params.pickerVal[2] = articleInfoId
          } else {
            this.params.pickerVal = []
          }
          this.getQueryCondition()
        } else {
          this.$message({
            message: '请求失败',
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
      this.getQueryCondition()
    }
  }
}
</script>
