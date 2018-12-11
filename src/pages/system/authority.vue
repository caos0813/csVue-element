<template>
  <div class="page">
    <div class="tools-bar btn-wrap">
      <!-- :checkData="checkData" @refresh="refresh" -->
      <!-- <listHandle :showSoldout="false"></listHandle> -->
      <el-button type="primary" size="small" @click.stop="append">新增</el-button>
      <el-button type="warning" size="small">保存</el-button>
    </div>
    <div class="body">
      <div class="left-wrap">
        <!-- <el-tree :data="roleData" default-expand-all :props="defaultProps1" @node-click="handleNodeClick">
          <div class="custom-tree-node" slot-scope="{ node, data }">
            <label>{{ node.label }}</label>
            <div>
              <el-button type="text" size="mini" icon="el-icon-edit" @click="() => append(data)">
                编辑
              </el-button>
              <el-button type="text" size="mini" icon="el-icon-delete" @click="() => remove(node, data)">
                删除
              </el-button>
            </div>
          </div>
        </el-tree> -->
        <ul class="role">
          <li v-for="(item,index) in roleData" :key="index">
            <div v-show="!item.isEdit">
              <label>{{ item.label }}</label>
              <label>
                <el-button type="text" size="mini" icon="el-icon-edit" @click="edit(item,index)">
                  编辑
                </el-button>
                <el-button type="text" size="mini" icon="el-icon-delete" @click="remove(item)">
                  删除
                </el-button>
              </label>
              <!-- <label v-show="item.isEdit">
                <el-button type="text" size="mini" @click="save(item)">保存</el-button>
                <el-button type="text" size="mini" @click="cancel(item)">取消</el-button>
              </label> -->
            </div>
            <el-form :model="roleForm" ref="roleForm" :rules="roleRules" v-show="item.isEdit" class="add-role">
              <el-form-item prop="roleName">
                <el-input v-model="roleForm.roleName" placeholder="请输入角色名" class="role-name"></el-input>
                <label class="btn-wrap">
                  <el-button type="text" size="mini" @click="save(item,index)">保存</el-button>
                  <el-button type="text" size="mini" @click="cancel(item,index)">取消</el-button>
                </label>
              </el-form-item>
            </el-form>
          </li>
        </ul>
        <el-form :model="roleForm" ref="addRoleForm" :rules="roleRules" v-if="isAdd" class="add-role">
          <el-form-item prop="roleName">
            <el-input v-model="roleForm.roleName" placeholder="请输入角色名" class="role-name"></el-input>
            <label class="btn-wrap">
              <el-button type="text" size="mini" @click="save('')">保存</el-button>
              <el-button type="text" size="mini" @click="cancel('')">取消</el-button>
            </label>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-wrap">
        <el-tree :data="data" show-checkbox default-expand-all :default-checked-keys="checkedKeys" :props="defaultProps"></el-tree>
      </div>
    </div>
  </div>
</template>
<script>
import { listHandle } from '@/components'
import { getNavJson } from '@/utils'
export default {
  data () {
    return {
      data: [{
        name: '全部',
        subNav: getNavJson()
      }],
      defaultProps: {
        children: 'subNav',
        label: 'name'
      },
      checkedKeys: [],
      roleData: [{
        id: 1,
        label: '系统管理员'
      }, {
        id: 2,
        label: '内容编辑'
      }],
      defaultProps1: {
        children: 'children',
        label: 'label'
      },
      isAdd: false,
      isEdit: false,
      roleForm: {
        roleName: ''
      },
      roleRules: {
        roleName: { required: true, message: '角色名不能为空', trigger: 'blur' }
      }
    }
  },
  components: {
    listHandle
  },
  methods: {
    // 新增
    append () {
      if (this.isEdit) {
        this.$message.error('有角色信息未保存')
      } else {
        this.isAdd = true
        this.roleForm.roleName = ''
      }
    },
    // 保存
    save (item, index) {
      if (item !== '') {
        this.$refs['roleForm'][index].validate((valid) => {
          console.log(valid)
          if (valid) {
            item.isEdit = false
            this.isEdit = false
            this.$refs['roleForm'][index].resetFields()
          }
        })
      } else {
        this.$refs['addRoleForm'].validate((valid) => {
          if (valid) {
            let data = {
              id: 0,
              label: this.roleForm.roleName
            }
            this.roleData.push(data)
            this.isAdd = false
            this.$refs['addRoleForm'].resetFields()
          }
        })
      }
    },
    // 取消
    cancel (item, index) {
      if (item !== '') {
        item.isEdit = false
        this.isEdit = false
        this.$refs['roleForm'][index].resetFields()
      } else {
        this.isAdd = false
        this.$refs['addRoleForm'].resetFields()
      }
    },
    // 编辑
    edit (item, index) {
      if (this.isAdd) {
        this.$message.error('有角色信息未保存')
      } else {
        item.isEdit = true
        let data = this.roleData
        for (let i = 0; i < data.length; i++) {
          if (data[i].id !== item.id) {
            data[i].isEdit = false
          } else {
            item.isEdit = true
            this.isEdit = true
          }
        }
        this.roleForm.roleName = item.label
      }
    },
    // 删除
    remove (item) {
      this.$message({
        showClose: true,
        message: '删除'
      })
    },
    getAuth () {
      this.data[0].subNav.map(item => {
        // console.log(item.subNav)
        item.subNav.map(sItem => {
          console.log(sItem.subNav)
          // sItem.subNav.map(tItem => {
          //   console.log(tItem)
          // })
        })
        // console.log(item)
        // if (this.hasAuth(item.auth)) {
        //   console.log(11)
        // }
      })
    }
  },
  created () {
    this.getAuth()
    this.roleData.map(item => {
      item.isEdit = false
    })
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 53px 0 0;
  margin: 0 -20px;
  height: 100%;
  .tools-bar {
    justify-content: flex-end;
  }
  .body {
    display: flex;
    height: 100%;
    .left-wrap {
      width: 300px;
      position: relative;
      height: 100%;
      padding: 10px 0;
      &::after {
        content: "";
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        width: 1px;
        background-color: $gray;
        height: 100%;
      }
      .role {
        width: 100%;
        > li {
          flex: 1;
          > div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: $font-size-14;
            padding: 0 15px;
            // border: 1px solid red;
          }
          &:hover {
            background-color: $stable-f5;
            cursor: pointer;
          }
        }
      }
      .add-role {
        padding: 0 15px;
        .el-form-item__content {
          display: flex;
          justify-content: space-between;
          .el-input {
            width: calc(100% - 81px);
          }
          .el-button {
            height: 30px;
            margin-left: 10px;
          }
          .role-name {
            /deep/ .el-input__inner {
              height: 30px;
              border: none;
              border-radius: 0;
              border-bottom: 1px solid $stable-dc;
              padding: 0;
            }
          }
        }
      }
    }
    .right-wrap {
      flex: 1;
      padding: 10px 0;
      margin-left: 5px;
    }
  }
}
</style>
