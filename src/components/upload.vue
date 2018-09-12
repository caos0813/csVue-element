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
import { formatDate } from '@/utils'
import Cookies from 'js-cookie'
const Compress = require('compress.js')
const compress = new Compress()
export default {
  data () {
    return {
      uploadUrl: '',
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
    imgOptions: {
      type: Object,
      default () {
        return {
          size: 1, // the max size in MB, defaults to 2MB
          quality: 0.8, // the quality of the image, max is 1,
          maxWidth: 1080, // the max width of the output image, defaults to 1920px
          maxHeight: 1080, // the max height of the output image, defaults to 1920px
          resize: true // defaults to true, set false if you do not want to resize the image width and height
        }
      }
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
      let ret
      let relativePath = this.path
      let uploadConfig = Cookies.getJSON('user').uploadConfig
      // 分片上传文件
      let client = new OSS({
        accessKeyId: uploadConfig.accessKeyId,
        accessKeySecret: uploadConfig.accessKeySecret,
        bucket: uploadConfig.bucketName,
        endpoint: uploadConfig.endpoint
      })
      this.loading = true
      console.log(option.file)
      if (this.type === 'image') {
        try {
          console.log(this.imgOptions)
          let results = await compress.compress([option.file], this.imgOptions)
          const img1 = results[0]
          const base64str = img1.data
          const imgExt = img1.ext
          let file = Compress.convertBase64ToFile(base64str, imgExt)
          ret = await client.multipartUpload(relativePath + formatDate(new Date(), 'yyyyMMddhhmmss'), file, {
            progress: async function (p) {
              let e = {}
              e.percent = p * 100
              option.onProgress(e)
            }
          })
        } catch (err) {
          console.log(err)
        }
      } else {
        ret = await client.multipartUpload(relativePath + formatDate(new Date(), 'yyyyMMddhhmmss'), option.file, {
          progress: async function (p) {
            let e = {}
            e.percent = p * 100
            option.onProgress(e)
          }
        })
      }
      if (ret.res.statusCode === 200) {
        option.onSuccess(ret)
        return ret
      } else {
        option.onError('上传失败')
      }
    },
    handleAvatarSuccess (res, file) {
      this.loading = false
      let url = this.CDN + res.name
      console.log(url)
      this.$emit('input', url)
    }
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
    .el-icon-service {
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
