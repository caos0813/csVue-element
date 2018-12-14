<template>
  <div class="picker-wrap">
    <el-col :span="span" v-if="isXuanke">
      <el-select v-model="pickerVal[0]" placeholder="请选择产品" class="full" @change="firstChange" :size="size">
        <el-option :label="item.name" :value="item.id" v-for="(item,$index) in firstData" :key="$index"></el-option>
      </el-select>
    </el-col>
    <el-col :span="span" v-else>
      <!-- @change="specialChange" -->
      <el-select v-model="pickerVal[0]" placeholder="请选择专题" class="full" :size="size">
        <el-option :label="ceil.name" :value="ceil.id" v-for="(ceil,$index) in specialData" :key="$index"></el-option>
      </el-select>
    </el-col>
    <el-col :span="span" v-if="column===2&&isXuanke">
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
      pickerVal: [],
      specialData: [],
      type: ''
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
    },
    isXuanke: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: {
      handler (val, oldVal) {
        this.pickerVal = val
        if (val.length && this.column > 1) {
          this.$fly.get(api.productAll).then(data => {
            this.firstData = data
            if (!this.lodash.isUndefined(this.pickerVal[0])) {
              this.firstChange(this.pickerVal[0], true)
            }
          })
        }
      },
      immediate: true
    },
    '$route' (to, from) {
      if (!this.isXuanke) {
        console.log(to.params.type)
        this.pickerVal = []
        console.log(this.pickerVal)
        this.type = to.params.type
        this.getArticleMajor()
      }
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
      console.log(e)
      this.$emit('input', this.pickerVal)
      console.log(this.pickerVal)
    },
    getArticleMajor () {
      this.$fly.get(api.queryArticleInfoCondition, { moduleId: this.moduleId(this.type) }).then(data => {
        this.specialData = data.label
      })
    }
  },
  created () {
    if (!this.isXuanke) {
      this.type = this.$route.params.type
      this.getArticleMajor()
    } else {
      this.$fly.get(api.productAll).then(data => {
        this.firstData = data
        if (!this.lodash.isUndefined(this.pickerVal[0])) {
          this.firstChange(this.pickerVal[0], true)
        }
      })
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
