<template>
  <div class="upload">
    <el-upload class="avatar-uploader" :accept="accept" :action="uploadUrl" :show-file-list="true" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :http-request="upload" v-loading="loading" element-loading-text="正在上传" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <div class="uploaded-wrap" v-if="imageUrl">
        <img :src="imageUrl" class="avatar" v-if="type=='image'">
        <span class="el-icon-service" v-if="type=='audio'"></span>
        <span class="el-icon-caret-right" v-if="type=='video'"></span>
        <span class="el-icon-goods" v-if="type=='apk'"></span>
        <div class="btn-wrap" v-if="type!=='apk'">
          <el-button icon="el-icon-zoom-in" size="mini" circle @click.stop="preview"></el-button>
        </div>
      </div>
      <i v-else class="el-icon-upload avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="预览">
      <img width="100%" :src="imageUrl" alt="" v-if="type=='image'">
      <audio width="100%" :src="imageUrl" v-if="type=='audio'" controls></audio>
      <video width="100%" v-if="type==='video'" :src="imageUrl" controls></video>
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from '@/utils'
import ImageCompressor from 'image-compressor.js'
import Cookies from 'js-cookie'
const compress = new ImageCompressor()
/* eslint-disable */
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
          size: 20, // the max size in MB, defaults to 2MB
          quality: 0.9, // the quality of the image, max is 1,
          maxWidth: 1920, // the max width of the output image, defaults to 1920px
          maxHeight: 1080, // the max height of the output image, defaults to 1920px
          resize: true // defaults to true, set false if you do not want to resize the image width and height
        }
      }
    },
    width: {
      type: [Number, String],
      default () {
        return null
      }
    },
    height: {
      type: [Number, String],
      default () {
        return null
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
      console.log(Cookies.getJSON('user'))
      let uploadConfig = Cookies.getJSON('user').uploadConfig
      // 分片上传文件
      let client = new OSS({
        accessKeyId: uploadConfig.accessKeyId,
        accessKeySecret: uploadConfig.accessKeySecret,
        bucket: uploadConfig.bucketName,
        endpoint: uploadConfig.endpoint
      })
      this.loading = true
      console.log(option)
      console.log(option.file)
      if (this.type === 'image') {
        try {
          const size = option.file.size / (1024 * 1024)
          if (size <= 0.8) {
            this.imgOptions.quality = 1
            this.imgOptions.maxWidth = Infinity
            this.imgOptions.maxHeight = Infinity
          }
          this.imgOptions.width = this.width
          this.imgOptions.height = this.height
          let result = await compress.compress(option.file, this.imgOptions)
          console.log(result)
          ret = await client.multipartUpload(relativePath + formatDate(new Date(), 'yyyyMMddhhmmss'), result, {
            progress: async function (p) {
              let e = {}
              e.percent = p * 100
              option.onProgress(e)
            }
          })
        } catch (err) {
          console.log(err)
        }
      } else if (this.type === 'apk') {
        let { name } = option.file
        name = name.split('.')[1]
        if (name !== 'apk') {
          this.$message({
            message: '只能上传apk类型的文件',
            duration: 2000,
            type: 'error'
          })
          this.loading = false
        } else {
          try {
            client.options.bucket = 'fdapprelease'
            ret = await client.multipartUpload(relativePath + formatDate(new Date(), 'yyyyMMddhhmmss'), option.file, {
              progress: async function (p) {
                let e = {}
                e.percent = p * 100
                option.onProgress(e)
              },
              partSize: 1000 * 1024, // 设置分片大小
              timeout: 120000 // 设置超时时间
            })
          } catch (e) {
            console.log(e)
          }
        }
      } else {
        try {
          ret = await client.multipartUpload(relativePath + formatDate(new Date(), 'yyyyMMddhhmmss'), option.file, {
            progress: async function (p) {
              let e = {}
              e.percent = p * 100
              option.onProgress(e)
            }
          })
        } catch (e) {
          console.log(e)
        }
      }
      if (ret.res.statusCode === 200) {
        option.onSuccess(ret)
        return ret
      } else {
        option.onError('上传失败')
      }
    },
    beforeAvatarUpload (file) {
      let _this = this
      if (_this.width !== null && _this.height !== null) {
        const isSize = new Promise((resolve, reject) => {
          let _URL = window.URL && window.webkitURL
          let img = new Image()
          img.onload = function () {
            let valid = img.width === _this.width && img.height === _this.height
            valid ? resolve() : reject()
          }
          img.src = _URL.createObjectURL(file)
        }).then(() => {
          return file
        }, () => {
          _this.$message({
            message: `图片宽高只能为${_this.width}*${_this.height}`,
            duration: 2000,
            type: 'error'
          })
          return Promise.reject()
        })
        return isSize
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
      .el-icon-service,
      .el-icon-goods,
      .el-icon-caret-right {
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
        border-color: $color-primary;
      }
    }
    .el-icon-service,
    .el-icon-goods,
    .el-icon-caret-right {
      color: $color-primary;
    }
    .el-icon-caret-right {
      border: 1px solid $color-primary;
      perspective: 3d;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      overflow: hidden;
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
