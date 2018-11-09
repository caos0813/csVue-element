<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <el-input prefix-icon="el-icon-search" v-model="params.title" placeholder="请输入搜索关键字" size="small"></el-input>
        <picker v-model="pickerVal" size="small" :span="-1"></picker>
        <el-button size="small" type="primary" @click="search">查询</el-button>
        <el-button size="small" type="warning" @click="reset">重置</el-button>
      </div>
      <listHandle :checkData="checkData" @refresh="refresh" show-hot></listHandle>
    </div>
    <el-table ref="multipleTable" header-cell-class-name="tableHeader" :data="tableData" v-loading="loading" element-loading-text="拼命加载中" border stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" label-class-name="checkLabel">
      </el-table-column>
      <el-table-column label="标题" align="center" min-width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否热门" align="center" width="80">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.isHot===1?'danger':'info'">{{scope.row.isHot?'是':'否'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="所属产品" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.product.name }}</template>
      </el-table-column>
      <el-table-column prop="userName" label="操作人" min-width="260" align="center">
      </el-table-column>
      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.status | publicStatus('style')">{{ scope.row.status | publicStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="totalReadNum" label="阅读量" width="120" align="center">
        <template slot-scope="scope">
          {{scope.row.totalReadNum}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.createTime | dateTime('yyyy-MM-dd hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="发布时间" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.publishTime | dateTime('yyyy-MM-dd hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope ">
          <el-button type="text " size="mini" v-if="scope.row.status===2||scope.row.status===3">
            <router-link :to="{name:'topic',params:{type:'edit'},query:{id:scope.row.id}}" tag="span">编辑</router-link>
          </el-button>
          <el-button type="text" size="small" @click.stop="lookComment(scope.row)">查看评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page ref="pageInfo" :pageInfo="pageInfo" @sizeChange="sizeChange" @currentChange="currentChange"></page>
    <div class="dialog-wrap" id="dialog-wrap" :class="{'start':startAnimate,'close':closeAnimate,'hide':!popoverIsClose}">
      <div class="dialog-header">
        <span class="title">评论</span>
        <el-button type="text" class="btn-close" icon="el-icon-close" @click="close"></el-button>
      </div>
      <div class="dialog-container">
        <el-table class="table" header-cell-class-name="tableHeader" :data="commentTableData" v-loading="loading2" element-loading-text="拼命加载中" border stripe>
          <el-table-column type="selection" width="55" align="center" label-class-name="checkLabel">
          </el-table-column>
          <el-table-column prop="useId" label="评论人" align="center">
          </el-table-column>
          <el-table-column label="内容" align="center" min-width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.commentContent }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="200" align="center">
            <template slot-scope="scope">{{ scope.row.commentTime | dateTime('yyyy-MM-dd hh:mm:ss')}}</template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button type="text " size="mini" @click.stop="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <page ref="commentPageInfo" :pageInfo="commentPageInfo" @sizeChange="commentSizeChange" @currentChange="commentCurrentChange"></page>
      </div>
    </div>
  </div>
</template>
<script>
import { api, confirm } from '@/utils'
import { picker, listHandle, page } from '@/components'
export default {
  data () {
    return {
      pickerVal: [],
      params: {
        title: null,
        page: 1,
        // size: 10,
        sortType: 1
      },
      checkData: [],
      pageInfo: {},
      tableData: [],
      loading: false,
      popoverIsClose: false,
      startAnimate: false,
      closeAnimate: false,
      loading2: false,
      commentParams: {
        themeInfoId: '',
        page: 1
      },
      commentTableData: [],
      commentPageInfo: {}
    }
  },
  components: {
    picker,
    listHandle,
    page
  },
  methods: {
    lookComment (row) {
      this.popoverIsClose = true
      this.startAnimate = true
      this.closeAnimate = false
      this.commentParams = {
        page: 1,
        themeInfoId: row.id,
        size: this.$refs.commentPageInfo.pageSizes[0]
      }
      this.getCommentData(this.commentParams)
    },
    close () {
      this.closeAnimate = true
      this.popoverIsClose = true
      this.startAnimate = false
    },
    handleSelectionChange (e) {
      this.checkData = []
      this.lodash.map(e, (item) => {
        this.checkData.push({ id: item.id, status: item.status })
      })
    },
    currentChange (e) {
      this.params.page = e
      this.getData(this.params)
    },
    sizeChange (e) {
      this.params.size = e
      this.getData(this.params)
    },
    reset () {
      this.params = {
        title: null,
        page: 1,
        size: this.$refs.pageInfo.size,
        sortType: 1
      }
      this.pickerVal = []
      this.getData(this.params)
    },
    search () {
      this.getData(this.params)
    },
    refresh () {
      this.getData(this.params)
    },
    getData (params) {
      // let params = this.lodash.clone(obj)
      params.productId = this.pickerVal[0]
      params.page--
      this.loading = true
      this.$fly.get(api.topicList, params).then(data => {
        this.loading = false
        this.tableData = data.content
        this.tableData.map((item) => {
          item['visible'] = false
          return item
        })
        this.pageInfo = {
          totalElements: data.totalElements,
          currentPage: params.page + 1
        }
      })
    },
    // 删除话题
    handleDelete (row) {
      confirm(`您确定将删除该评论吗？`, '提示').then(() => {
        this.popoverIsClose = true
        this.closeAnimate = false
        this.startAnimate = false
        this.$fly.get(api.deleteCommentByCommentId, {
          themeInfoId: this.commentParams.themeInfoId,
          commentId: row.commentId
        }).then(data => {
          console.log(data)
          this.getCommentData(this.commentParams)
          this.$message({
            message: '删除成功',
            duration: 2000,
            type: 'success'
          })
        })
      }).catch(action => {
        this.popoverIsClose = true
        this.closeAnimate = false
        this.startAnimate = false
      })
    },
    commentCurrentChange (e) {
      this.popoverIsClose = true
      this.closeAnimate = false
      this.startAnimate = false
      this.commentParams.page = e
      this.getCommentData(this.commentParams)
    },
    commentSizeChange (e) {
      this.commentParams.page = 1
      this.commentParams.size = e
      this.getCommentData(this.commentParams)
    },
    getCommentData (params) {
      params.page--
      this.loading2 = true
      this.$fly.get(api.queryCommentByThemeInfoId, params).then(data => {
        this.loading2 = false
        this.commentTableData = data.content
        this.commentPageInfo = {
          totalElements: data.totalElements,
          currentPage: params.page + 1
        }
      })
    },
    handleBodyClick (e) {
      let _this = this
      let event = e || window.e
      let comSelect = document.getElementById('dialog-wrap')
      if (comSelect) {
        let flag = comSelect.contains(event.target)
        if (flag) return
        // _this.popoverIsClose = true
        _this.closeAnimate = true
      }
    }
  },
  created () {
    this.getData(this.params)
  },
  mounted () {
    this.params.size = this.$refs.pageInfo.pageSizes[0]
    let _this = this
    /* document.addEventListener('click', function (e) {
      let event = e || window.e
      let comSelect = document.getElementsByClassName('dialog-wrap')
      let arrNode = []
      for (let i = 0; i < comSelect.length; i++) {
        arrNode.push(comSelect[i])
      }
      console.log(arrNode.indexOf(event.target) < 0)
      let flag = arrNode.indexOf(event.target) < 0
      if (!flag) return
      _this.popoverIsClose = true
      _this.closeAnimate = true
    }) */
    if (!_this.popoverIsClose) {
      document.addEventListener('click', this.handleBodyClick)
    }
  },
  destroyed () {
    document.removeEventListener('click', this.handleBodyClick)
  }
}
</script>
<style lang="scss">
.checkLabel > .el-checkbox {
  display: none;
}
.dialog-wrap {
  bottom: 0;
}
</style>
