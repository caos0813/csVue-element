<template>
  <div class="upload">
    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
      <img :src="imageUrl" class="avatar" v-if="imageUrl">
      <div class="btn-wrap" v-if="imageUrl">
        <el-button icon="el-icon-zoom-in" size="mini" circle @click.stop="handlePictureCardPreview"></el-button>
      </div>
      <i v-else class="el-icon-upload avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="图片预览">
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
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
.upload /deep/ {
  .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      position: relative;
      .el-icon-upload {
        font-size: 40px;
      }
      .btn-wrap {
        position: absolute;
        z-index: 100;
        top: 5px;
        right: 5px;
        line-height: 1;
      }
      &:hover {
        border-color: #409eff;
      }
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .el-dialog__body{
    padding: 0 20px 20px;
    img{
      display: block;
    }
  }
}
</style>
