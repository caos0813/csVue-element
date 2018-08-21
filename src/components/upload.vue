<template>
  <div class="upload">
    <el-upload class="avatar-uploader" accept="image/*" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :http-request="upload">
      <img :src="imageUrl" class="avatar" v-if="imageUrl">
      <div class="btn-wrap" v-if="imageUrl">
        <el-button icon="el-icon-zoom-in" size="mini" circle @click.stop="preview"></el-button>
      </div>
      <i v-else class="el-icon-upload avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="图片预览">
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { api, formatDate } from '@/utils'
const OSS = require('ali-oss')
export default {
  data () {
    return {
      uploadUrl: '',
      imageUrl: this.value,
      uploadConfig: {},
      dialogVisible: false
    }
  },
  props: ['value'],
  methods: {
    preview () {
      this.dialogVisible = true
    },
    async upload (option) {
      let file = option.file
      //  const point = file.name.lastIndexOf('.')
      //  let fileName = file.name.substr(0, point)
      let relativePath = 'image/article/'
      // 分片上传文件
      let client = new OSS({
        accessKeyId: this.uploadConfig.accessKeyId,
        accessKeySecret: this.uploadConfig.accessKeySecret,
        bucket: this.uploadConfig.bucketName,
        endpoint: this.uploadConfig.endpoint
      })
      let ret = await client.multipartUpload(relativePath + formatDate(new Date(), 'yyyyMMddhhmmss'), file, {
        progress: async function (p) {
          let e = {}
          e.percent = p * 100
          option.onProgress(e)
        }
      })
      if (ret.res.statusCode === 200) {
        option.onSuccess(ret)
        return ret
      } else {
        option.onError('上传失败')
      }
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = res.res.requestUrls[0]
      this.$emit('input', this.imageUrl)
    }
  },
  created () {
    this.$fly.get(api.uploadToken).then(data => {
      this.uploadConfig = data
    })
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
  .el-dialog__body {
    padding: 0 20px 20px;
    img {
      display: block;
    }
  }
}
</style>
