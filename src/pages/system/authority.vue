<template>
  <div class="page">
    <div class="tools-bar btn-wrap">
      <el-button type="primary" size="small" @click.stop="append">新增</el-button>
      <el-button type="warning" size="small" @click.stop="saveAll">保存</el-button>
    </div>
    <div class="body">
      <div class="left-wrap">
        <ul class="role">
          <li v-for="(item,index) in roleData" :key="index" :class="{'liActive':item.isActive}">
            <div v-show="!item.isEdit" @click.stop.prevent="roleClick(item)">
              <label>{{ item.name }}</label>
              <label v-if="item.name!=='超级管理员'">
                <el-button type="text" size="mini" icon="el-icon-edit" @click.stop.prevent="edit(item,index)">
                  编辑
                </el-button>
                <el-button type="text" size="mini" icon="el-icon-delete" @click.stop.prevent="remove(item)">
                  删除
                </el-button>
              </label>
            </div>
            <el-form :model="roleForm" ref="roleForm" :rules="roleRules" v-show="item.isEdit" class="add-role">
              <el-form-item prop="roleName">
                <el-input v-model="roleForm.roleName" placeholder="请输入角色名" autofocus class="role-name" ref="editRoleName"></el-input>
                <!-- @blur.stop.prevent="blur(item,index)" @focus.stop.prevent="focus" -->
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
            <!-- @blur.stop.prevent="blur('')" -->
            <el-input v-model="roleForm.roleName" ref="roleName" placeholder="请输入角色名" autofocus class="role-name"></el-input>
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
import Cookies from 'js-cookie'
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
      checkedNames: [],
      roleData: [],
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
      liActive: {},
      oldRoleName: ''
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
        this.$nextTick(() => {
          this.liActive = {}
          this.roleData.map(item => {
            item.isActive = false
          })
          this.$refs.roleName.focus()
        })
      }
    },
    checked (e, data) {
      this.checkedNames = []
      // this.checkedKeys = []
      data.checkedNodes.map(item => {
        if (!item.subNav) {
          if (typeof item.auth === 'string') {
            this.checkedNames.push({ name: item.auth })
          } else {
            this.checkedNames.push({ name: item.auth() })
          }
        }
      })
    },
    // 保存角色
    save (item, index) {
      if (item !== '') {
        this.$refs['roleForm'][index].validate((valid) => {
          if (valid) {
            this.save_post(item, this.roleForm.roleName, index, 'roleForm', '')
          }
        })
      } else {
        this.$refs['addRoleForm'].validate((valid) => {
          if (valid) {
            this.save_post(item, this.roleForm.roleName, index, 'addRoleForm', '')
          }
        })
      }
    },
    save_post (item, name, index, ref, type) {
      item = item === '' ? null : item
      if (name !== '') {
        if (this.isAdd || (this.isEdit && this.oldRoleName !== '' && this.oldRoleName !== name)) {
          this.$fly.post(api.roleIsExist, { name: name }).then(data => {
            if (data.status === 100000) {
              if (data.data) {
                this.$message({
                  message: '保存失败，角色名已存在',
                  type: 'error'
                })
                return false
              } else {
                this.roleSavePost(item, name, index, ref, type)
              }
            } else {
              this.$message({
                message: '查询失败',
                type: 'error'
              })
            }
          })
        } else {
          this.roleSavePost(item, name, index, ref, type)
        }
      } else {
        this.$message({
          message: '角色名不能为空',
          duration: 2000,
          type: 'error'
        })
      }
    },
    roleSavePost (item, name, index, ref, type) {
      let rolesName = Cookies.getJSON('user').rolesName
      this.$fly.post(api.roleSave, {
        id: item === null ? null : item.id,
        name: name,
        authorities: this.checkedNames
      }).then(data => {
        if (data.status === 100000) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$refs.tree.setCheckedKeys([])
          this.getRoles()
          if (type === 'saveAll') {
            if (this.liActive.name === rolesName) {
              this.signOut('您修改了当前用户所属角色的权限，请重新登录')
            }
            // this.getAuth(this.liActive)
            item.isEdit = false
            this.isEdit = false
          } else {
            if (ref === 'roleForm') {
              item.isEdit = false
              this.isEdit = false
              this.$refs[`${ref}`][index].resetFields()
              if (item.name === rolesName) {
                this.signOut('您修改了当前用户所属的角色，请重新登录')
              }
            } else {
              this.isAdd = false
              this.$refs[`${ref}`].resetFields()
            }
          }
        } else {
          this.$message({
            message: '保存失败',
            type: 'error'
          })
        }
      }).catch(() => {
        this.$message({
          message: '请求失败',
          duration: 2000,
          type: 'error'
        })
      })
    },
    // 保存所有
    saveAll () {
      if (this.liActive.name !== '超级管理员') {
        if (this.isAdd) {
          this.$message.error('有角色信息未保存')
        } else {
          if (!this.lodash.isUndefined(this.liActive.name)) {
            let name
            if (this.roleForm.roleName === '') {
              name = this.liActive.name
            } else {
              name = this.roleForm.roleName
            }
            this.save_post(this.liActive, name, '', '', 'saveAll')
          } else {
            this.$message({
              message: '请先选择角色',
              duration: 2000,
              type: 'error'
            })
          }
        }
      } else {
        this.$message({
          message: '无法修改超级管理员的权限',
          duration: 2000,
          type: 'info'
        })
        // this.getAuth(this.liActive)
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
        this.isEdit = true
        let data = this.roleData
        for (let i = 0; i < data.length; i++) {
          if (data[i].id !== item.id) {
            data[i].isEdit = false
          }
        }
        this.roleForm.roleName = item.name
        this.liActive = item
        this.oldRoleName = item.name
        this.roleClick(item)
      }
    },
    // 删除
    remove (item) {
      confirm(`您确定删除角色' ${item.name} '吗？`, '提示').then(() => {
        let checkIds = []
        checkIds.push(item.id)
        this.$fly.post(api.roleDelete, checkIds).then(data => {
          if (data.status === 100000) {
            this.$message({
              showClose: true,
              type: 'success',
              message: '删除成功'
            })
            this.$refs.tree.setCheckedKeys([])
            if (item.name === Cookies.getJSON('user').rolesName) {
              this.signOut('您删除了当前用户所属的角色，请重新登录')
            } else {
              this.getRoles()
            }
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '删除失败'
            })
          }
        }).catch(() => {
          this.$message({
            message: '请求失败',
            duration: 2000,
            type: 'error'
          })
        })
      })
    },
    // 退出登录
    signOut (txt) {
      this.$message({
        message: `${txt}`,
        type: 'warning'
      })
      setTimeout(() => {
        Cookies.remove('user')
        this.$router.replace({
          name: 'login'
        })
      }, 500)
    },
    // 角色点击事件
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
    // 获取角色的权限
    getAuth (item) {
      this.loading = true
      let authority = []
      this.$fly.get(api.roleGetOne, { id: item.id }).then(data => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        let checkedData = []
        let checkedNameData = []
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
                    checkedNameData.push({ name: sItem.auth() })
                  }
                } else {
                  sItem.subNav.map(tItem => {
                    if (item === tItem.auth) {
                      checkedData.push(tItem.id)
                      checkedNameData.push({ name: tItem.auth })
                    }
                  })
                }
              })
            })
          }
        })
        this.$set(this, 'checkedKeys', checkedData)
        this.checkedNames = checkedNameData
        // console.log(checkedNameData)
        // console.log(this.checkedKeys)
      }).catch(() => {
        this.$message({
          message: '删除失败',
          duration: 2000,
          type: 'error'
        })
      })
    },
    // 获取角色
    getRoles () {
      this.$fly.get(api.getRoles).then(data => {
        data.data.RoleList.map(item => {
          item.isEdit = false
          item.isActive = false
        })
        this.roleData = data.data.RoleList
      }).catch(() => {
        this.$message({
          message: '请求失败',
          duration: 2000,
          type: 'error'
        })
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
