<template>
  <div class="upload">
    <el-upload class="avatar-uploader" :accept="accept" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :http-request="upload" v-loading="loading" element-loading-text="正在上传" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <div class="uploaded-wrap" v-if="imageUrl">
        <img :src="imageUrl" class="avatar" v-if="type=='image'">
        <span class="el-icon-service" v-if="type=='audio'"></span>
        <div class="btn-wrap">
          <el-button icon="el-icon-zoom-in" size="mini" circle @click.stop="preview"></el-button>
        </div>
      </div>
      <i v-else class="el-icon-upload avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="预览">
      <img width="100%" :src="imageUrl" alt="" v-if="type=='image'">
      <audio :src="imageUrl" v-if="type=='audio'" controls></audio>
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
      uploadConfig: {},
      loading: false,
      dialogVisible: false
    }
  },
  props: {
    value: {
      type: String,
      defaul: ''
    },
    type: {
      type: String,
      default: 'image'
    },
    CDN: {
      type: String,
      default: 'http://fdomsimage.oss-cn-huhehaote.aliyuncs.com/'
    },
    path: {
      type: String,
      default: 'image/specialtopic/'
    },
    accept: {
      type: String,
      default: 'image/*'
    }
  },
  computed: {
    imageUrl () {
      return this.value
    }
  },
  methods: {
    preview () {
      this.dialogVisible = true
    },
    async upload (option) {
      let file = option.file
      this.loading = true
      //  const point = file.name.lastIndexOf('.')
      //  let fileName = file.name.substr(0, point)
      let relativePath = this.path
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
      console.log(ret)
      if (ret.res.statusCode === 200) {
        option.onSuccess(ret)
        return ret
      } else {
        option.onError('上传失败')
      }
    },
    handleAvatarSuccess (res, file) {
      console.log(res.name)
      this.loading = false
      let url = this.CDN + res.name
      console.log(url)
      this.$emit('input', url)
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
  overflow: hidden;
  .avatar-uploader {
    width: 180px;
    height: 180px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    .el-upload {
      cursor: pointer;
      position: relative;
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .el-icon-upload,
      .el-icon-service {
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
    .el-icon-service{
      color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .uploaded-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        display: block;
      }
      audio {
        width: 100%;
        display: block;
      }
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .el-dialog__body {
    padding: 0 20px 20px;
    text-align: center;
    img {
      display: block;
    }
  }
}
</style>
