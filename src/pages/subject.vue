<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
       <back></back>
      </div>
      <div class="button-wrap">
        <el-button type="primary" size="small">发布</el-button>
        <!-- <el-button type="warning" size="small">下架</el-button> -->
        <el-button type="danger" size="small">删除</el-button>
      </div>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label-width="0">
        <el-col :span='12'>
          <el-form-item label="标题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='4'>
          <el-form-item label-width="20px" prop="delivery">
            <template>
              <el-checkbox v-model="form.delivery">首页显示</el-checkbox>
            </template>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label-width="0">
        <el-col :span="6">
          <el-form-item label="产品">
            <el-select v-model="form.region" placeholder="请选择产品" class="full">
              <el-option label="产品1" value="shanghai"></el-option>
              <el-option label="产品2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="模块">
            <el-select v-model="form.sort" placeholder="请选择模块" class="full">
              <el-option label="产品1" value="shanghai"></el-option>
              <el-option label="产品2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="封面">
        <upload></upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { upload } from '@/components'
export default {
  data () {
    return {
      imageUrl: '',
      dialogVisible: false,
      form: {
        name: '',
        delivery: false
      }
    }
  },
  components: {
    upload
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
