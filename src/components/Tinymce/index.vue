<template>
  <div class="tinymce-container editor-container" :class="{fullscreen:fullscreen}">
    <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
    <!-- <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></editorImage>
    </div> -->
  </div>
</template>

<script>
/* eslint-disable */
import editorImage from './components/editorImage'
import plugins from './plugins'
import toolbar from './toolbar'
import { formatDate } from '@/utils'
import Cookies from 'js-cookie'
import ImageCompressor from 'image-compressor.js'
const compress = new ImageCompressor()
export default {
  name: 'tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    imgOptions: {
      type: Object,
      default () {
        return {
          size: 1, // the max size in MB, defaults to 2MB
          quality: 0.9, // the quality of the image, max is 1,
          maxWidth: 1920, // the max width of the output image, defaults to 1920px
          resize: true // defaults to true, set false if you do not want to resize the image width and height
        }
      }
    },
    menubar: {
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    },
    CDN: {
      type: String,
      default: 'http://fdomsimage.oss-cn-huhehaote.aliyuncs.com/'
    },
    path: {
      type: String,
      default: 'image/editor/'
    }
  },
  data () {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || 'vue-tinymce-' + +new Date(),
      fullscreen: false
    }
  },
  watch: {
    value (val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted () {
    this.initTinymce()
  },
  activated () {
    this.initTinymce()
  },
  deactivated () {
    this.destroyTinymce()
  },
  methods: {
    initTinymce () {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        // 是否显示POWERED BY TINYMCE
        branding: false,
        style_formats: [
          {
            title: '标题',
            items: [
              { title: 'h1标签(22px)', block: 'h1' },
              { title: 'h2标签(20px)', block: 'h2' },
              { title: 'h3标签(18px)', block: 'h3' },
              { title: 'h4标签(16px)', block: 'h4' },
              { title: 'h5标签(15px)', block: 'h5' },
              { title: 'h6标签(14px)', block: 'h6' }
            ]
          },
          {
            title: '字间距',
            items: [
              {
                title: '1px',
                inline: 'span',
                styles: {
                  'letter-spacing': '1px'
                }
              },
              {
                title: '2px',
                inline: 'span',
                styles: {
                  'letter-spacing': '2px'
                }
              }, {
                title: '3px',
                inline: 'span',
                styles: {
                  'letter-spacing': '3px'
                }
              }
            ]
          },
          {
            title: '取消加粗',
            inline: 'span',
            styles: {
              'font-weight': 'normal'
            }
          },
          {
            title: '正文',
            block: 'p'
          }
        ],
        fontsize_formats: '12px 14px 15px 16px 18px 20px 22px 24px 28px',
        // images_upload_url: '',
        // images_upload_url: 'http://fdomsimage.oss-cn-huhehaote.aliyuncs.com/',
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        language: 'zh_CN',
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup (editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        // 阿里云上传
        images_dataimg_filter (img) {
          setTimeout(() => {
            /*  const $image = $(img)
             $image.removeAttr('width')
             $image.removeAttr('height')
             if ($image[0].height && $image[0].width) {
               $image.attr('data-wscntype', 'image')
               $image.attr('data-wscnh', $image[0].height)
               $image.attr('data-wscnw', $image[0].width)
               $image.addClass('wscnph')
             } */
          }, 0)
          return img
        },
        async images_upload_handler (blobInfo, success, failure) {
          let ret
          let uploadConfig = Cookies.getJSON('user').uploadConfig
          let relativePath = _this.path
          let client = new OSS({
            accessKeyId: uploadConfig.accessKeyId,
            accessKeySecret: uploadConfig.accessKeySecret,
            bucket: uploadConfig.bucketName,
            endpoint: uploadConfig.endpoint
          })
          try {
            const size = blobInfo.blob().size / (1024 * 1024)
            if (size <= 0.8) {
              _this.imgOptions.quality = 1
              _this.imgOptions.maxWidth = Infinity
            }
            let result = await compress.compress(blobInfo.blob(), _this.imgOptions)
            ret = await client.multipartUpload(relativePath + formatDate(new Date(), 'yyyyMMddhhmmss'), result)
          } catch (err) {
            console.log(err)
          }
          if (ret.res.statusCode === 200) {
            success(_this.CDN + ret.name)
          } else {
            failure('上传失败')
          }
        }
      })
    },
    destroyTinymce () {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent (value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent () {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK (arr) {
      const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
      })
    }
  },
  destroyed () {
    this.destroyTinymce()
  },
  created () {
    /* this.$fly.get(api.uploadToken).then(data => {
      this.uploadConfig = data
    }) */
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: 1;
  /deep/ .mce-branding.mce-flow-layout-item.mce-last {
    display: flex;
    align-items: center;
  }
}

.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
