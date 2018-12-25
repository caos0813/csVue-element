<template>
  <div class="page">
    <div v-for="(item,index) in navData" :key="index" v-if="`${item.auth()}`==='true'?true:false">
      <div v-if="`${item.depth}`==='3'?true:false">
        <div v-for="(sItem,sIndex) in item.subNav" :key="sIndex" v-if="`${sItem.subNav}` !== 'undefined'&&`${sItem.auth()}`==='true'?true:false">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{item.name}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{sItem.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="box-wrap">
            <router-link :to="{name:`${lItem.url}`,params:{type:`${lItem.type}`}}" tag="a" class="ceil" v-for="(lItem,sIndex) in sItem.subNav" :key="sIndex" v-if="hasAuth(`${lItem.auth}`)">
              {{lItem.name}}
            </router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="box-wrap">
          <router-link v-for="(sItem,sIndex) in item.subNav" :key="sIndex" :to="{name:`${sItem.url}`}" tag="a" class="ceil">{{sItem.name}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getNavJson } from '@/utils'
export default {
  data () {
    return {
      navData: getNavJson()
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 20px;
}
.box-wrap {
  display: flex;
  margin: 10px 0;
  .ceil {
    padding: 20px;
    border-radius: 5px;
    background: $color-primary;
    line-height: 30px;
    color: #fff;
    width: 120px;
    margin: 5px;
    text-align: center;
    font-size: 16px;
  }
}
</style>
