<template>
  <div class="page">
    <div class="tools-bar btn-wrap">
      <!-- :checkData="checkData" @refresh="refresh" -->
      <!-- <listHandle :showSoldout="false"></listHandle> -->
      <el-button type="primary" size="small" @click.stop="append">新增</el-button>
      <el-button type="warning" size="small" @click.stop="saveAll">保存</el-button>
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
          <!-- item.isActive?'liActive':'noActive' -->
          <li v-for="(item,index) in roleData" :key="index" :class="{'liActive':item.isActive}">
            <div v-show="!item.isEdit" @click.stop.prevent="roleClick(item)">
              <label>{{ item.name }}</label>
              <label>
                <el-button type="text" size="mini" icon="el-icon-edit" @click.stop.prevent="edit(item,index)">
                  编辑
                </el-button>
                <el-button type="text" size="mini" icon="el-icon-delete" @click.stop.prevent="remove(item)">
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
                <el-input v-model="roleForm.roleName" placeholder="请输入角色名" class="role-name" @blur.stop.prevent="save(item,index)"></el-input>
                <label class="btn-wrap">
                  <el-button type="text" size="mini" @click.stop.prevent="save(item,index)">保存</el-button>
                  <el-button type="text" size="mini" @click.stop.prevent="cancel(item,index)">取消</el-button>
                </label>
              </el-form-item>
            </el-form>
          </li>
        </ul>
        <el-form :model="roleForm" ref="addRoleForm" :rules="roleRules" v-if="isAdd" class="add-role">
          <el-form-item prop="roleName">
            <el-input v-model="roleForm.roleName" placeholder="请输入角色名" class="role-name" @blur.stop.prevent="save('')"></el-input>
            <label class="btn-wrap">
              <el-button type="text" size="mini" @click.stop="save('')">保存</el-button>
              <el-button type="text" size="mini" @click.stop="cancel('')">取消</el-button>
            </label>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-wrap">
        <el-tree :data="data" ref="tree" show-checkbox default-expand-all :default-checked-keys="checkedKeys" node-key="id" :props="defaultProps" v-loading="loading" @check="checked"></el-tree>
      </div>
    </div>
  </div>
</template>
<script>
import { listHandle } from '@/components'
import { api, getNavJson, confirm } from '@/utils'
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
      },
      loading: false,
      liActive: {}
    }
  },
  components: {
    listHandle
  },
  methods: {
    // 新增
    append () {
      this.$refs.tree.setCheckedKeys([])
      if (this.isEdit) {
        this.$message.error('有角色信息未保存')
      } else {
        this.isAdd = true
        this.roleForm.roleName = ''
      }
    },
    checked (e, data) {
      // console.log(e)
      // console.log(data)
      this.checkedKeys = []
      data.checkedNodes.map(item => {
        if (!item.subNav) {
          if (typeof item.auth === 'string') {
            this.checkedKeys.push({ name: item.auth })
          } else {
            this.checkedKeys.push({ name: item.auth() })
          }
        }
      })
    },
    // 保存角色
    save (item, index) {
      if (item !== '') {
        this.$refs['roleForm'][index].validate((valid) => {
          if (valid) {
            this.save_post(item, this.roleForm.roleName).then(data => {
              if (data.status === 100000) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.getRoles()
                item.isEdit = false
                this.isEdit = false
                this.$refs['roleForm'][index].resetFields()
              } else {
                this.$message({
                  message: '请求失败',
                  type: 'error'
                })
              }
            })
          }
        })
      } else {
        this.$refs['addRoleForm'].validate((valid) => {
          if (valid) {
            this.save_post(item, this.roleForm.roleName).then(data => {
              if (data.status === 100000) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.getRoles()
                this.isAdd = false
                this.$refs['addRoleForm'].resetFields()
              } else {
                this.$message({
                  message: '接口调用失败',
                  type: 'error'
                })
              }
            })
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
        this.roleForm.roleName = item.name
      }
    },
    // 删除
    remove (item) {
      confirm(`您确定删除角色' ${item.name} '吗？`, '提示').then(() => {
        this.$fly.delete(api.roleDelete + `${item.id}`).then(data => {
          console.log(data)
          if (data.status === 100000) {
            this.$message({
              showClose: true,
              type: 'success',
              message: '删除成功'
            })
            this.getRoles()
          }
        })
      })
    },
    // save_post
    save_post (item, name) {
      if (item === '') {
        item = null
      }
      return this.$fly.post(api.roleSave, {
        id: item === null ? null : item.id,
        name: name,
        authorities: this.checkedKeys
      })
    },
    // saveAll
    saveAll () {
      console.log(this.liActive)
      if (this.isAdd) {
        this.$message.error('有角色信息未保存')
      } else {
        if (this.liActive) {
          this.save_post(this.liActive, this.liActive.name)
          this.getAuth(this.liActive)
        }
      }
    },
    roleClick (item) {
      if (!item.isActive) {
        let data = this.roleData
        for (let i = 0; i < data.length; i++) {
          if (data[i].id !== item.id) {
            data[i].isActive = false
          } else {
            item.isActive = true
            this.liActive = item
          }
        }
        this.liActiveId = item.id
        this.$refs.tree.setCheckedKeys([])
        this.getAuth(item)
      }
    },
    getAuth (item) {
      // let data = ['zhiyuan-special-college', 'zhiyuan-article-major', 'xuanke-article-listty', 'feedback-list', 'order', 'system-authority']
      this.loading = true
      let authority = []
      this.$fly.get(api.roleGetOne, { id: item.id }).then(data => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        let checkedData = []
        let roleData = data.data.authorities
        roleData.map(item => {
          authority.push(item.name)
        })
        authority.map(item => {
          if (this.hasAuth(item)) {
            this.data[0].subNav.map(dItem => {
              dItem.subNav.map(sItem => {
                if (!sItem.subNav) {
                  if (item === sItem.auth()) {
                    checkedData.push(sItem.id)
                  }
                } else {
                  sItem.subNav.map(tItem => {
                    if (item === tItem.auth) {
                      checkedData.push(tItem.id)
                    }
                  })
                }
              })
            })
          }
        })
        console.log(checkedData)
        this.$set(this, 'checkedKeys', checkedData)
      })
    },
    getRoles () {
      this.$fly.get(api.getRoles).then(data => {
        data.data.RoleList.map(item => {
          item.isEdit = false
          item.isActive = false
        })
        this.roleData = data.data.RoleList
      })
    }
  },
  created () {
    this.getRoles()
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
            > label:hover {
              cursor: pointer;
            }
          }
          &:hover {
            background-color: $stable-f5;
            cursor: pointer;
          }
          &.liActive {
            background-color: $stable-f5;
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
