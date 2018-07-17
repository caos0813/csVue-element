<template>
  <div class="page">
    <div class="tools-wrap">
      编辑“{{infoData.name}}”
    </div>
    <div class="form-wrap">
      <el-form label-position="right" label-width="200px">
        <el-form-item :label="item.propertyName.name" v-for="(item,pIndex) in propertyValues" :class="item.propertyName.istable===true?'child-item':''" :key="pIndex">
          <el-input v-if="item.propertyName.istable===false" v-model="item.value" type="textarea" autosize @blur="blur"></el-input>
          <div v-else>
            <el-form-item  v-for="(ceil,index) in item.value" :key="index">
              <slot name="label">
                <el-input v-model="ceil.key" @blur="blur"></el-input>
              </slot>
              <el-input v-model="ceil.text" type="textarea" autosize @blur="blur"></el-input>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
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
    blur () {

    },
    onSubmit () {
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
        this.$message({
          message: '修改成功',
          duration: 2000,
          type: 'success'
        })
        this.$router.go(-1)
      })
    },
    setBreadData: function () {
      let { name, params, query } = this.$route
      let data = [...this.$store.state.breadData, {
        name, params, query
      }]
      this.$store.commit('SET_BREAD_DATA', data)
    },
    setData (data) {
      if (data.propertyName.istable === true) {
        try {
          data.value.forEach((ceil, index) => {
            let arr = ceil.text.split('、')
            let arr2 = []
            arr.forEach(child => {
              arr2.push({
                key: child
              })
            })
            ceil.value = JSON.stringify(arr2)
          })
        } catch (err) {

        }
      }
      return data.value
    },
    initData (data) {
      let propertyValues = JSON.parse(JSON.stringify(data))
      for (let item of propertyValues) {
        if (item.propertyName.istable === true) {
          try {
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
      data.propertyValues[4].propertyName.istable = true
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
    }
    > .el-form-item__content {
      border: 1px dashed #ddd;
      clear: both;
      margin-left: 0 !important;
      padding: 30px;
      background: #fafafafa;
      .el-form-item {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
