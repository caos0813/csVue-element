<template>
  <div class="picker-wrap">
    <el-col :span="span">
      <el-select v-model="pickerVal[0]" placeholder="请选择产品" class="full" @change="firstChange" :size="size">
        <el-option :label="item.name" :value="item.id" v-for="(item,$index) in firstData" :key="$index"></el-option>
      </el-select>
    </el-col>
    <el-col :span="span" v-if="column===2">
      <el-select v-model="pickerVal[1]" placeholder="请选择专题" class="full" @change="secondChange" :size="size">
        <el-option :label="ceil.title" :value="ceil.id" v-for="(ceil,$index) in secondData" :key="$index"></el-option>
      </el-select>
    </el-col>
  </div>
</template>
<script>
import { api } from '@/utils'
export default {
  data () {
    return {
      firstData: [],
      secondData: [],
      pickerVal: []
    }
  },
  props: {
    value: {
      type: Array,
      default: function () {
        return []
      }
    },
    span: {
      type: Number,
      default: 6
    },
    size: {
      type: String,
      default: ''
    },
    column: {
      type: Number,
      default: 1
    }
  },
  /* computed: {
    pickerIds: {
      get () {
        return this.value
      },
      set (val) {
        this.pickerVal = val
      }
    }
  }, */
  watch: {
    value: {
      handler (val, oldVal) {
        this.pickerVal = val
        if (val.length) {
          this.$fly.get(api.productAll).then(data => {
            this.firstData = data
            if (!this.lodash.isUndefined(this.pickerVal[0])) {
              this.firstChange(this.pickerVal[0], true)
            }
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    firstChange (e, init) {
      let index = this.lodash.findIndex(this.firstData, (item) => (item.id === e))
      this.secondData = this.firstData[index].specialTopics
      if (!init) {
        this.pickerVal.splice(1, 2)
      }
      this.$emit('input', this.pickerVal)
    },
    secondChange (e, init) {
      this.$emit('input', this.pickerVal)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-col {
  &:not(:last-child) {
    padding-right: 15px;
  }
}
</style>
