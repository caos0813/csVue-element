<template>
  <div class="page-wrap padding">
    <el-pagination background :layout="layout" :total="total" :current-page.sync="currentPage" :page-sizes="pageSizes" :page-size.sync="pageSize" @current-change="currentChange" @size-change="sizeChange">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 50, 100, 200, 500]
      }
    },
    limit: {
      type: Number,
      default: 10
    },
    layout: {
      type: String,
      default: 'total,sizes, prev, pager, next, jumper'
    }
  },
  computed: {
    currentPage: {
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get () {
        return this.limit
      },
      set (val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    sizeChange (e) {
      // this.$emit('sizeChange', e)
      this.$emit('pagination', { page: this.currentPage, limit: e })
    },
    currentChange (e) {
      this.$emit('pagination', { page: e, limit: this.pageSize })
    }
  }
}
</script>
