<template>
  <div class="page">
    <div class="tools-bar">
      <div class="left-wrap">
        <div class="ceil-box">
          <el-select v-model="params.product" placeholder="请选择产品" size="small">
            <el-option label="产品1" value="shanghai"></el-option>
            <el-option label="产品2" value="beijing"></el-option>
          </el-select>
        </div>
      </div>
      <div class="button-wrap">
        <el-button type="success" size="small">设为热门</el-button>
        <el-button type="primary" size="small">发布</el-button>
        <el-button type="warning" size="small">下架</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </div>
    </div>
    <el-table ref="multipleTable" :data="tableData" border  stripe>
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center">
      </el-table-column>
      <el-table-column prop="name" label="操作人" width="120" align="center">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120" align="center">
      </el-table-column>
      <el-table-column label="发布时间" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope ">
          <el-button type="text " size="mini">
            <router-link :to="{name:'topic',params:{type:'edit'}}" tag="span">编辑</router-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-wrap">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      params: {},
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        status: '上架',
        title: '我就是标题'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        status: '上架',
        title: '我就是标题'
      }],
      multipleSelection: []
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
