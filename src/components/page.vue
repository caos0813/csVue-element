<template>
  <div class="page-wrap padding">
    <el-pagination background layout="total,sizes, prev, pager, next, jumper" :total="pageInfo.totalElements" :current-page="pageInfo.currentPage" :page-sizes="pageSizes" :page-size="size"
    @current-change="currentChange" @size-change="sizeChange">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pageSizes: [10, 50, 100, 200, 500],
      size: 10
    }
  },
  props: {
    pageInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    sizeChange (e) {
      console.log(e)
      this.$emit('sizeChange', e)
    },
    currentChange (e) {
      this.$emit('currentChange', e)
    }
  }
}
</script>
