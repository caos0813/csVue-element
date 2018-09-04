<template>
  <div class="button-wrap">
    <el-button type="danger" size="small" @click="handleFn('hot')" v-if="showHot" :disabled="checkIds.length<1">设为热门</el-button>
    <el-button type="primary" size="small" @click="handleFn('add')">新增</el-button>
    <el-button type="warning" v-if="showSoldout" size="small" @click="handleFn('soldOut')" :disabled="checkIds.length<1">下架</el-button>
    <el-button type="danger" size="small" @click="handleFn('delete')" :disabled="checkIds.length<1">删除</el-button>
  </div>
</template>

<script>
import { api, confirm } from '@/utils'
export default {
  props: {
    showHot: {
      type: Boolean,
      default: false
    },
    checkIds: {
      type: Array,
      default () {
        return []
      }
    },
    showSoldout: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleFn (type) {
      let { name } = this.$route
      console.log(this.$route)
      let path = name.split('-')[0]
      console.log(path)
      if (type === 'add') {
        this.toState({ name: path, params: { type: 'add' } })
      } else {
        let url
        let txt
        if (type === 'delete') {
          url = api[`${path}Delete`]
          txt = '删除'
        } else if (type === 'soldOut') {
          url = api[`${path}SoldOut`]
          txt = '下架'
        } else if (type === 'hot') {
          url = api[`${path}Hot`]
          txt = '设为热门'
        }
        confirm(`您确定将选择的内容${txt}吗？`, '提示').then(() => {
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
        })
      }
    }
  },
  beforeMount () {
    console.log(this.$route)
  }
}
</script>

<style>
</style>
