<template>
  <div class="page">
    <div class="left-wrap">
      <el-tree :data="data" default-expand-all :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="right-wrap">right</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  .left-wrap {
    flex: 6;
    background-color: red;
  }
  .right-wrap {
    flex: 6;
    background-color: blue;
  }
}
</style>
