<template>
  <div>
    <transition :name="'move-'+placement">
      <div>
        <a class="drawer-close" v-if="closable" @click="close">
          <slot name="close">
            <i class="el-icon-close"></i>
          </slot>
        </a>
        <div class="drawer-header">
          <slot name="header">
            <div class="drawer-header-inner">{{title}}</div>
          </slot>
        </div>
        <div class="drawer-body">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { oneOf } from '@/utils/assist'
export default {
  props: {
    title: {
      type: String
    },
    closable: {
      type: Boolean,
      default: true
    },
    placement: {
      validator (value) {
        return oneOf(value, ['left', 'right'])
      },
      default: 'right'
    }
  },
  methods: {
    close () {
      this.$emit('on-close')
    }
  }
}
</script>
