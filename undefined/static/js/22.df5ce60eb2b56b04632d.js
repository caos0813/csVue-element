webpackJsonp([22],{m5Lm:function(e,r,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=a("0xDb"),t=a("lbHh"),n=a.n(t),l={data:function(){var e=this;return{department:[],role:[],params:{nickname:"",username:"",phoneNumber:"",password:null,surePassword:null,department:"",roles:"",remark:null},rules:{nickname:[{required:!0,message:"请输入昵称",trigger:"blur"}],username:[{required:!0,trigger:"blur",validator:function(r,a,t){if(!a)return t(new Error("登录账号不能为空"));/^[0-9a-zA_Z]+$/.test(a)?e.oldUsername!==a?e.$fly.get(s.a.nameIsExits,{username:e.params.username.toString()}).then(function(e){e.data?t(new Error("登录账号已存在")):t()}):t():t(new Error("登录账号只能是英文字母或数字"))}}],phoneNumber:[{required:!0,trigger:"blur",validator:function(e,r,a){if(!r)return a(new Error("手机号不能为空"));/^1[34578]\d{9}$/.test(r)?a():a(new Error("请输入正确的手机号码"))}}],password:[{required:!0,validator:function(e,r,a){r?/^[0-9a-zA_Z]+$/.test(r)?a():a(new Error("密码只能是英文字母或数字")):a(new Error("请输入密码"))},trigger:"blur"}],surePassword:[{required:!0,validator:function(r,a,s){a?a!==e.params.password?s(new Error("密码不一致")):s():s(new Error("请输入确认密码"))},trigger:"blur"}],department:[{required:!0,message:"请选择部门",trigger:"change"}],roles:[{required:!0,message:"请选择角色",trigger:"change"}]},type:"",oldUsername:""}},methods:{save:function(e){var r=this;this.$refs.form.validate(function(a){a&&r.save_post().then(function(a){if(1e5!==a.status)return r.$message({message:"保存失败",type:"error"});r.$refs.form.resetFields(),r.$message({message:"保存成功",type:"success"}),"continue"!==e&&r.goBack(),r.lodash.isUndefined(r.params.role)||r.oldUsername!==n.a.getJSON("user").userName||r.params.role===n.a.getJSON("user").rolesId||(r.$message({message:"您修改了当前用户的角色，请重新登录",type:"warning"}),setTimeout(function(){n.a.remove("user"),r.$router.replace({name:"login"})},500))}).catch(function(){r.$message({message:"请求失败",type:"error"})})})},save_post:function(){var e=this.params,r=e.nickname,a=e.username,t=e.phoneNumber,n=e.password,l=e.department,o=e.roles,m=e.remark,i=this.$route.query.id;return this.$fly.post(s.a.userSave,{id:i,nickname:r,username:a,phoneNumber:t,password:n,departmentId:l,roleId:o,remark:m})},departmentChange:function(e){this.params.department=e},roleChange:function(e){this.params.role=e}},created:function(){var e=this,r=this.$route.params.type;this.type=r;var a=this.$route.query.id;this.$fly.get(s.a.getRoles).then(function(r){if(1e5!==r.status)return e.$message({message:"请求失败",type:"error"});var a=r.data,s=a.RoleList,t=a.departmentList;e.role=s,e.department=t}),"edit"===r&&this.$fly.get(s.a.userGetOne,{id:a}).then(function(r){if(1e5!==r.status)return e.$message({message:"请求失败",type:"error"});var a=r.data;e.oldUsername=a.username,e.params=a,e.params.department=a.department.id,e.params.roles=e.lodash.isUndefined(a.roles[0])?"":a.roles[0].id})}},o=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",{staticClass:"page"},[a("div",{staticClass:"tools-bar"},[a("div",{staticClass:"left-wrap"},[a("back")],1),e._v(" "),a("div",{staticClass:"button-wrap"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(r){e.save("continue")}}},[e._v("保存并继续添加")]),e._v(" "),a("el-button",{attrs:{type:"warning",size:"small"},on:{click:e.save}},[e._v("保存")])],1)]),e._v(" "),a("el-form",{ref:"form",attrs:{model:e.params,"status-icon":"",rules:e.rules,"label-width":"100px","label-suffix":":"}},[a("el-form-item",{attrs:{label:"账号",prop:"username"}},[a("el-col",{attrs:{span:12}},[a("el-input",{attrs:{disabled:"edit"===e.type},model:{value:e.params.username,callback:function(r){e.$set(e.params,"username",r)},expression:"params.username"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"昵称",prop:"nickname"}},[a("el-col",{attrs:{span:12}},[a("el-input",{model:{value:e.params.nickname,callback:function(r){e.$set(e.params,"nickname",r)},expression:"params.nickname"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号",prop:"phoneNumber"}},[a("el-col",{attrs:{span:12}},[a("el-input",{attrs:{maxlength:"11"},model:{value:e.params.phoneNumber,callback:function(r){e.$set(e.params,"phoneNumber",e._n(r))},expression:"params.phoneNumber"}})],1)],1),e._v(" "),"add"===e.type?a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-col",{attrs:{span:12}},[a("el-input",{attrs:{type:"password"},model:{value:e.params.password,callback:function(r){e.$set(e.params,"password",r)},expression:"params.password"}})],1)],1):e._e(),e._v(" "),"add"===e.type?a("el-form-item",{attrs:{label:"确认密码",prop:"surePassword"}},[a("el-col",{attrs:{span:12}},[a("el-input",{attrs:{type:"password"},model:{value:e.params.surePassword,callback:function(r){e.$set(e.params,"surePassword",r)},expression:"params.surePassword"}})],1)],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"部门",prop:"department"}},[a("el-select",{attrs:{placeholder:"请选择部门"},on:{change:e.departmentChange},model:{value:e.params.department,callback:function(r){e.$set(e.params,"department",r)},expression:"params.department"}},e._l(e.department,function(e,r){return a("el-option",{key:r,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"角色",prop:"roles"}},[a("el-select",{attrs:{placeholder:"请选择角色"},on:{change:e.roleChange},model:{value:e.params.roles,callback:function(r){e.$set(e.params,"roles",r)},expression:"params.roles"}},e._l(e.role,function(e,r){return a("el-option",{key:r,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{attrs:{type:"textarea",rows:10,placeholder:"请输入简介"},model:{value:e.params.remark,callback:function(r){e.$set(e.params,"remark",r)},expression:"params.remark"}})],1)],1)],1)};o._withStripped=!0;var m={render:o,staticRenderFns:[]},i=m;var p=a("VU/8")(l,i,!1,null,null,null);p.options.__file="src/pages/system/user.vue";r.default=p.exports}});
//# sourceMappingURL=22.df5ce60eb2b56b04632d.js.map