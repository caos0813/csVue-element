<template>
  <el-row>
    <el-col :span="6">
      <el-select v-model="pickerVal[0]" placeholder="请选择产品" class="full" @change="firstChange">
        <el-option :label="item.name" :value="item.id" v-for="(item,$index) in firstData" :key="$index"></el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-select v-model="pickerVal[1]" placeholder="请选择模块" class="full" @change="secondChange">
        <el-option :label="ceil.name" :value="ceil.id" v-for="(ceil,$index) in secondData" :key="$index"></el-option>
      </el-select>
    </el-col>
  </el-row>
</template>
<script>
import { api } from '@/utils'
export default {
  data () {
    return {
      firstData: [],
      secondData: [],
      thirdData: [],
      pickerVal: this.value
    }
  },
  props: ['value'],
  watch: {
    pickerVal (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    firstChange (e, init) {
      let index = this.lodash.findIndex(this.firstData, (item) => (item.id === e))
      this.secondData = this.firstData[index].modules
      if (!init) {
        this.pickerVal.splice(1, 2)
      }
    },
    secondChange (e) {
      let index = this.lodash.findIndex(this.secondData, (item) => (item.id === e))
      this.thirdData = this.secondData[index].modules
      this.pickerVal.splice(2, 1)
    }
  },
  created () {
    this.$fly.get(api.productAll).then(data => {
      this.firstData = data
      if (!this.lodash.isUndefined(this.pickerVal[0])) {
        this.firstChange(this.pickerVal[0], true)
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.el-col-6 {
  &:not(:last-child) {
    padding-right: 15px;
  }
}
</style>
