<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <back></back>
      </div>
      <div class="button-wrap">
        <el-button type="warning" size="small" @click="submit">保存草稿</el-button>
      </div>
    </div>
    <el-form ref="form" :model="params" :rules="rules" label-width="80px">
      <el-form-item label="产品" prop="pickerVal">
        <picker v-model="params.pickerVal"></picker>
      </el-form-item>
      <el-form-item label="类型">
        <el-col :span="6">
          <el-select v-model="mode" placeholder="" class="full" @change="modeChange">
            <el-option value="general" label="普通话题"></el-option>
            <el-option value="vote" label="投票"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-col :span='12'>
          <el-input v-model="params.title"></el-input>
        </el-col>
        <el-col :span='4'>
          <el-form-item label-width="20px" prop="isHot">
            <template>
              <el-checkbox v-model="params.isHot" :true-label='1' :false-label='0'>是否热门</el-checkbox>
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

      <el-form-item v-if="mode==='vote'">
        <el-form-item>
          <el-button type="info" size="small" @click="addRow">添加选项</el-button>
          <div class="radio-wrap">
            <el-radio-group v-model="params.type">
              <el-radio :label="1">单选</el-radio>
              <el-radio :label="2">多选</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <div class="space"></div>
        <el-col :span="18">
          <el-table :data="optionData" border :show-header="false">
            <el-table-column label="索引" align="center" type="index" width="150px"></el-table-column>
            <el-table-column label="内容" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200px">
              <template slot-scope="scope">
                <!-- <el-button icon="el-icon-arrow-up" circle size="small" title="上移" @click="moveRow(scope,'up')" v-if="scope.$index!==0"></el-button>
                <el-button icon="el-icon-arrow-down" circle size="small" title="下移" @click="moveRow(scope,'down')" v-if="scope.$index!==optionData.length-1"></el-button> -->
                <el-button type="danger" size="small" @click="delRow(scope)" icon="el-icon-delete" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-form-item>
          <el-col :span="18">
            <Tinymce :height="600" ref="editor" v-model="params.content" />
          </el-col>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { api } from '@/utils'
import { picker } from '@/components'
export default {
  data () {
    let validatePickerVal = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请选择产品'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        title: [{ required: true, message: '请输入专题名称', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        pickerVal: [{ required: true, validator: validatePickerVal, trigger: 'blur' }]
      },
      params: {
        title: '',
        isHot: 0,
        type: 0,
        pickerVal: []
      },
      optionData: [],
      mode: 'general'
    }
  },
  components: {
    Tinymce,
    picker
  },
  methods: {
    modeChange (e) {
      if (e === 'general') {
        this.params.type = 0
      } else {
        if (!this.params.type) {
          this.params.type = 1
        }
      }
    },
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let { title, isHot, pickerVal, type, id, content, publishTime } = this.params
          let votes = this.mode === 'vote' ? this.optionData : null
          if (this.lodash.isArray(votes) && votes.length < 1) {
            this.$message({
              message: '请添加选项',
              duration: 2000,
              type: 'error'
            })
            return
          }
          this.$fly.post(api.topicHandle, {
            id,
            title,
            isHot,
            publishTime: publishTime ? new Date(publishTime).getTime() : null,
            content,
            type,
            votes,
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
    },
    addRow () {
      this.optionData.push({ name: '' })
    },
    delRow (e) {
      console.log(e)
      let { $index } = e
      let { type } = this.$route.params
      if (type === 'edit') {
        this.$fly.post(api.topicDeleteVote, {
          id: e.row.id
        }).then(data => {
          this.optionData.splice($index, 1)
        }).catch(() => {
          this.$message({
            message: '删除失败',
            duration: 2000,
            type: 'error'
          })
        })
      } else {
        this.optionData.splice($index, 1)
      }
    },
    moveRow (e, type) {
      let { $index } = e
      let cacheObj = this.optionData[$index]
      if (type === 'up') {
        this.optionData.splice($index, 1)
        this.optionData.splice($index - 1, 0, cacheObj)
      } else {
        this.optionData.splice($index, 1)
        this.optionData.splice($index + 1, 0, cacheObj)
      }
    }
  },
  created () {
    let { type } = this.$route.params
    let { id } = this.$route.query
    if (type === 'edit') {
      this.$fly.get(api.topicDetail, {
        id
      }).then(data => {
        this.params = data
        this.optionData = data.votes
        this.params.pickerVal = [data.product.id]
        if (data.type === 1 || data.type === 2) {
          this.mode = 'vote'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.radio-wrap {
  display: inline-block;
  padding-left: 15px;
}
</style>
