<template>
  <div class="drawer-wrap" id="drawer-wrap">
    <transition :name="'move-' + placement">
      <div :class="classes" :style="mainStyles" v-show='visible' ref="content">
        <div :class="`${prefixCls}-header`" v-if="showHead">
          <slot name="header">
            <div :class="`${prefixCls}-header-inner`">{{title}}</div>
          </slot>
        </div>
        <a :class="`${prefixCls}-close`" v-if="closable" @click="close">
          <slot name="close">
            <i class="icon-close el-icon-close"></i>
          </slot>
        </a>
        <div :class="`${prefixCls}-body`">
          <slot></slot>
        </div>
        <div :class="`${prefixCls}-footer`" v-if="showFooter">
          <slot name="footer"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { oneOf } from '@/utils/assist'
const prefixCls = 'drawer'
export default {
  data () {
    return {
      prefixCls: prefixCls,
      visible: this.value
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    width: {
      type: [Number, String],
      default: 256
    },
    right: {
      type: [Number, String],
      default: 0
    },
    closable: {
      type: Boolean,
      default: true
    },
    showHead: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    placement: {
      validator (value) {
        return oneOf(value, ['left', 'right'])
      },
      default: 'right'
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.placement}`
      ]
    },
    mainStyles () {
      let style = {}
      const width = parseInt(this.width)
      const right = parseInt(this.right)
      const styleWidth = {
        width: width <= 100 ? `${width}%` : `${width}px`,
        right: `${right}px`
      }
      Object.assign(style, styleWidth)
      return style
    }
  },
  watch: {
    value (val) {
      this.visible = val
    }
  },
  methods: {
    close () {
      this.visible = false
      this.$emit('input', false)
      this.$emit('on-close')
    },
    handleBodyClick (e) {
      let _this = this
      let event = e || window.e
      let comSelect = document.getElementById('drawer-wrap')
      if (comSelect) {
        let flag = comSelect.contains(event.target)
        if (flag) return
        _this.visible = false
        this.$emit('bodyClick', false)
      }
    }
  },
  mounted () {
    let _this = this
    if (!_this.visible) {
      document.addEventListener('click', this.handleBodyClick)
    }
  },
  destroyed () {
    document.removeEventListener('click', this.handleBodyClick)
  }
}
</script>
<style lang="scss" scoped>
.drawer-wrap {
  position: fixed;
  overflow: auto;
  top: 0;
  // right: 0;
  bottom: 0;
  left: 0;
  z-index: 1002;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  pointer-events: none;
  .drawer {
    position: fixed;
    top: 60px;
    pointer-events: auto;
    background-color: #fff;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    &-header {
      line-height: 1;
      padding: 14px 16px;
      border-bottom: 1px solid $gray;
      &-inner {
        display: inline-block;
        width: 100%;
        height: 20px;
        font-size: $font-size-16;
        color: #17233d;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    &-close {
      position: absolute;
      top: 14px;
      right: 10px;
      cursor: pointer;
      overflow: hidden;
      z-index: 1;
      .icon-close {
        position: relative;
        color: $dark03;
        font-size: $font-size-20;
        transition: color 0.2s ease;
      }
    }
    &-body {
      // width: 100%;
      padding: 16px;
      font-size: $font-size-12;
      line-height: 1.5;
      word-wrap: break-word;
      overflow: auto;
    }
    &-footer {
      border-top: 1px solid $gray;
      text-align: right;
      padding: 10px 16px;
    }
  }
  .drawer-right {
    right: 0;
  }
  .drawer-left {
    left: 0;
  }
}
.move-left-enter-active,
.move-right-enter-active {
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.move-left-leave-active,
.move-right-leave-active {
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.move-left-enter-active {
  -webkit-animation-name: ivuMoveLeftIn;
  animation-name: ivuMoveLeftIn;
}

.move-left-leave-active {
  -webkit-animation-name: ivuMoveLeftOut;
  animation-name: ivuMoveLeftOut;
}

.move-left-enter-active,
.move-right-enter-active {
  opacity: 0;
}

.move-left-enter-active,
.move-left-leave-active,
.move-right-enter-active,
.move-right-leave-active {
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

.move-right-enter-active {
  -webkit-animation-name: ivuMoveRightIn;
  animation-name: ivuMoveRightIn;
}

.move-right-leave-active {
  -webkit-animation-name: ivuMoveRightOut;
  animation-name: ivuMoveRightOut;
}

@-webkit-keyframes ivuMoveLeftIn {
  0% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes ivuMoveLeftIn {
  0% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

@-webkit-keyframes ivuMoveLeftOut {
  0% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes ivuMoveLeftOut {
  0% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    opacity: 0;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}
@-webkit-keyframes ivuMoveRightIn {
  0% {
    opacity: 0;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@keyframes ivuMoveRightIn {
  0% {
    opacity: 0;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@-webkit-keyframes ivuMoveRightOut {
  0% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes ivuMoveRightOut {
  0% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
