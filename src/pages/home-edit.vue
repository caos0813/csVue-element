<template>
  <div class="page">
    <div class="tools-wrap">
      编辑“{{infoData.name}}”
    </div>
    <div class="form-wrap">
      <el-form label-position="top" label-width="200px">
        <el-form-item :label="item.propertyName.name" v-for="(item,pIndex) in propertyValues" :class="item.propertyName.istable===true?'child-item':''" :key="pIndex">
          <template slot="label" v-if="item.propertyName.istable===true">
            {{item.propertyName.name}}
            <el-button type="primary" size="small" @click="addRow(pIndex)">添加分类</el-button>
          </template>
          <el-input v-if="item.propertyName.istable===false" v-model.trim="item.value" type="textarea" autosize></el-input>
          <div v-else>
            <el-form-item class="is-child" label="" v-for="(ceil,index) in item.value" :key="index">
              <template slot="label">
                <el-input v-model.trim="ceil.key" placeholder="类名"></el-input>
              </template>
              <el-input v-model.trim="ceil.text" placeholder="用中文顿号隔开如:专业1、专业2、专业3" type="textarea" autosize></el-input>
              <div>
                <el-button type="info " size="mini " @click="delRow(pIndex,index) ">删除</el-button>
              </div>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item class="footer-bar">
          <el-button type="primary" @click="onSubmit()">确定</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { api } from '@/utils'
export default {
  data () {
    return {
      labelPosition: 'right',
      propertyValues: [],
      infoData: {}
    }
  },
  methods: {
    delRow (pIndex, index) {
      this.propertyValues[pIndex].value.splice(index, 1)
      this.propertyValues = this.initData(this.propertyValues)
    },
    addRow (pIndex) {
      this.propertyValues[pIndex].value.push({
        key: '',
        value: []
      })
      this.propertyValues = this.initData(this.propertyValues)
    },
    onSubmit (onsave) {
      let params = {
        id: this.$route.params.id.toString(),
        propertyValues: []
      }
      let propertyValues = JSON.parse(JSON.stringify(this.propertyValues))
      propertyValues.forEach((item, index) => {
        if (item.id !== null) {
          params.propertyValues.push(
            {
              'id': item.id,
              'value': this.setData(item)
            }
          )
        } else {
          params.propertyValues.push(
            {
              'value': this.setData(item),
              'propertyName': {
                id: item.propertyName.id
              }
            }
          )
        }
      })
      this.$fly.post(api.property, params).then(data => {
        if (data !== 'success') {
          this.$message({
            message: '保存失败',
            duration: 2000,
            type: 'error'
          })
          return
        }
        if (!onsave) {
          this.$message({
            message: '修改成功',
            duration: 2000,
            type: 'success'
          })
          this.$router.go(-1)
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '保存失败',
          duration: 2000,
          type: 'error'
        })
      })
    },
    setBreadData: function () {
      let { name, params, query } = this.$route
      /* let data = [...this.$store.state.breadData, {
        name, params, query
      }] */
      let data = this.lodash.clone(this.$store.state.breadData)
      data.splice(1, 1, { name, params, query })
      console.log(data)
      this.$store.commit('SET_BREAD_DATA', data)
    },
    setData (data) {
      if (data.propertyName.istable === true) {
        try {
          data.value.forEach((ceil, index) => {
            let arr2 = []
            if (!this.lodash.isEmpty(ceil.text)) {
              let arr = ceil.text.split('、')
              arr.forEach(child => {
                arr2.push({
                  key: child
                })
              })
            }
            ceil.value = arr2
          })
          return JSON.stringify(data.value)
        } catch (err) {
          console.log(err)
        }
      }
      return data.value
    },
    initData (data) {
      let propertyValues = JSON.parse(JSON.stringify(data))
      for (let item of propertyValues) {
        if (item.propertyName.istable === true) {
          try {
            if (this.lodash.isNull(item.value)) {
              item.value = []
            }
            item.value = JSON.parse(item.value)
            item.value.forEach(ceil => {
              let text = ''
              let len = ceil.value.length
              ceil.value.forEach((child, i) => {
                if (i !== len - 1) {
                  text += child.key + '、'
                } else {
                  text += child.key
                }
              })
              ceil.text = text
            })
          } catch (err) {
          }
        }
      }
      return propertyValues
    }
  },
  activated () {
    this.setBreadData()
    this.$fly.get(`${api.propertySearch}${this.$route.params.id}`).then(data => {
      this.infoData = {
        name: data.name
      }
      this.propertyValues = this.initData(data.propertyValues)
    })
  }
}
</script>
<style lang="scss" scoped>
.tools-wrap {
  margin-bottom: 0;
}
.page {
  box-shadow: 0 1px 5px #ddd;
  position: relative;
  padding-bottom: 30px;
}
.table-wrap {
  .el-button {
    margin-bottom: 5px;
  }
}
.form-wrap {
  padding: 30px;
  /deep/ .el-form {
    > .el-form-item__label {
      color: #999;
    }
    .el-textarea__inner {
      color: $dark;
      padding: 8px 15px;
      min-height: 40px !important;
    }
  }
}
.child-item {
  /deep/ {
    > .el-form-item__label {
      font-size: 16px;
      color: #222;
      margin-bottom: 10px;
      width: auto !important;
    }
    > .el-form-item__content {
      border: 1px dashed #ddd;
      margin-left: 0 !important;
      padding: 30px;
      background: #fafafafa;
      clear: both;
      overflow: hidden;
      .el-form-item {
        margin-bottom: 10px;
        display: flex;
        .el-form-item__label {
          padding-right: 10px;
          input {
            text-align: right;
            font-weight: bold;
          }
        }
        .el-form-item__content {
          flex: 1;
          display: flex;
          align-items: top;
          .el-button {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
.footer-bar {
  position: fixed;
  bottom: 0;
  left: 200px;
  right: 0;
  margin: 0 auto;
  text-align: center;
  padding: 30px;
}
</style>
