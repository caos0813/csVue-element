<template>
  <div class="button-wrap">
    <!-- <el-button type="danger" size="small" @click="handleFn('hot')" v-if="showHot" :disabled="checkIds.length<1">设为热门</el-button>
    <el-button type="primary" size="small" @click="handleFn('add')">新增</el-button>
    <el-button type="warning" v-if="showSoldout" size="small" @click="handleFn('soldOut')" :disabled="checkIds.length<1">下架</el-button>
    <el-button type="danger" size="small" @click="handleFn('delete')" :disabled="checkIds.length<1">删除</el-button> -->
    <el-button type="danger" size="small" @click.stop="handleFn('hot')" v-if="showHot" :disabled="checkData.length<1">设为热门</el-button>
    <el-button type="primary" size="small" @click.stop="handleFn('add')">新增</el-button>
    <el-button type="warning" v-if="showSoldout" size="small" @click.stop="handleFn('soldOut')" :disabled="checkData.length<1">下架</el-button>
    <el-button type="danger" size="small" @click.stop="handleFn('delete')" :disabled="checkData.length<1">删除</el-button>
  </div>
</template>

<script>
/* eslint-disable */
import { api, confirm } from '@/utils'
export default {
  data () {
    return {
      checkIds: []
    }
  },
  props: {
    showHot: {
      type: Boolean,
      default: false
    },
    checkData: {
      type: Array,
      default () {
        return []
      }
    },
    module: {
      type: Number,
      default: null
    },
    showSoldout: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleFn (type) {
      let { name } = this.$route
      let path = name.split('-')[0]
      if (type === 'add') {
        this.toState({ name: path, params: { type: 'add' }, query: { moduleId: this.module } })
      } else {
        let url
        let txt
        if (type === 'delete') {
          url = api[`${path}Delete`]
          console.log(url)
          txt = '删除'
        } else if (type === 'soldOut') {
          url = api[`${path}SoldOut`]
          txt = '下架'
        } else if (type === 'hot') {
          url = api[`${path}Hot`]
          txt = '设为热门'
        }
        // console.log(this.checkData)
        confirm(`您确定将选择的内容${txt}吗？`, '提示').then(() => {
          this.checkIds = []
          // this.lodash.map(this.checkData, (item) => {
          for (let item = 0; item < this.checkData.length; item++) {
            console.log(this.checkData)
            if (txt === '下架') {
              if (this.checkData[item].status === 2 || this.checkData[item].status === 3) {
                this.$message.error(`已下架或草稿状态的内容不能${txt}`)
                this.checkIds = []
                return
              } else {
                this.checkIds.push(this.checkData[item].id)
              }
            } else if (txt === '删除') {
              if (this.checkData[item].status === 1) {
                this.$message.error(`已发布的内容不能${txt}`)
                this.checkIds = []
                return
              } else {
                this.checkIds.push(this.checkData[item].id)
              }
            } else {
              this.checkIds.push(this.checkData[item].id)
            }
          }
          console.log(this.checkIds)
          if (this.checkIds.length > 0) {
            this.$fly.post(url, this.checkIds).then(data => {
              this.$message({
                message: `${txt}成功`,
                duration: 2000,
                type: 'success'
              })
              this.$emit('refresh')
              //  this.getData(this.params)
            }).catch(() => {
              this.$message({
                message: `${txt}失败`,
                duration: 2000,
                type: 'error'
              })
            })
          }
        })
      }
    }
  },
  beforeMount () {
    // console.log(this.$route)
  }
}
</script>

<style>
</style>
