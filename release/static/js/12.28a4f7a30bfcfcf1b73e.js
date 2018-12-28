webpackJsonp([12],{QAaw:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t("0xDb"),s=t("bGai"),r={data:function(){return{params:{page:1},checkData:[],pageInfo:{totalElements:0,currentPage:1},tableData:[],loading:!1,form:{phoneNumber:""},rules:{phoneNumber:[{required:!0,trigger:"blur",validator:function(n,e,t){if(!e)return t(new Error("手机号不能为空"));/^1[34578]\d{9}$/.test(e)?t():t(new Error("请输入正确的手机号码"))}}]},isAdd:!1}},components:{listHandle:s.c,pagination:s.d},methods:{append:function(){var n=this;if(this.isAdd)this.$message.error("有超级用户未保存");else{var e={id:"",phoneNumber:this.phoneNumber,createTime:null,isEdit:!0,createUser:{name:null}};this.tableData.push(e),this.isAdd=!0,this.$nextTick(function(){n.$refs.phoneNumberRef.focus()})}},remove:function(){var n=this;if(this.isAdd)this.$message.error("有超级用户未保存");else if(this.checkData.length>0){for(var e=[],t=0;t<this.checkData.length;t++)e.push(this.checkData[t].id);Object(a.b)("您确定删除选中的超级用户吗？","提示").then(function(){e.length>0&&n.$fly.post(a.a.superUserDelete,e).then(function(e){1e5===e.status?(n.$message({message:"删除成功",duration:2e3,type:"success"}),n.params.page=1,n.getData(n.params)):n.$message({message:"删除失败",type:"error"})}).catch(function(){n.$message({message:"删除失败",duration:2e3,type:"error"})})})}else this.$message.error("请先选择需要删除的超级用户")},save:function(n,e){var t=this;this.$refs.form.validate(function(e){e&&t.$fly.post(a.a.superUserSave,{phoneNumber:t.form.phoneNumber}).then(function(e){1e5===e.status?(t.$message({message:"保存成功",type:"success"}),t.$refs.form.resetFields(),n.isEdit=!1,t.isAdd=!1,t.params.page=1,t.getData(t.params)):100004===e.status?t.$message({message:""+e.message,type:"error"}):t.$message({message:"保存失败",type:"error"})}).catch(function(){t.$message({message:"请求失败",type:"error"})})})},cancel:function(n,e){this.$refs.form.resetFields(),n.isEdit=!1,this.isAdd=!1,this.tableData.splice(e,1)},pagination:function(n){this.params.page=n.page,this.params.size=n.limit,this.getData(this.params)},handleSelectionChange:function(n){var e=this;this.checkData=[],this.lodash.map(n,function(n){e.checkData.push({id:n.id,status:n.status})})},getData:function(n){var e=this;n.page--,this.loading=!0,this.$fly.get(a.a.getSuperUsers,n).then(function(t){if(setTimeout(function(){e.loading=!1},1e3),1e5===t.status){var a=t.data,s=a.content,r=a.totalElements;e.tableData=s,e.tableData.map(function(n){n.isEdit=!1}),e.pageInfo={totalElements:parseInt(r),currentPage:n.page+1}}else e.loading=!1,e.$message({message:"请求失败",type:"error"})})}},created:function(){this.getData(this.params)},mounted:function(){this.params.size=this.$refs.pageInfo.pageSizes[0]}},i=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"page"},[t("div",{staticClass:"tools-bar"},[t("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return e.stopPropagation(),n.append(e)}}},[n._v("新增")]),n._v(" "),t("el-button",{attrs:{type:"danger",size:"small",disabled:n.checkData.length<1},on:{click:function(e){return e.stopPropagation(),n.remove(e)}}},[n._v("删除")])],1),n._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.loading,expression:"loading"}],ref:"multipleTable",attrs:{"header-cell-class-name":"tableHeader",data:n.tableData,"element-loading-text":"拼命加载中",border:"",stripe:""},on:{"selection-change":n.handleSelectionChange}},[t("el-table-column",{attrs:{type:"selection",width:"55",align:"center","label-class-name":"checkLabel"}}),n._v(" "),t("el-table-column",{attrs:{type:"index",width:"50",align:"center"}}),n._v(" "),t("el-table-column",{attrs:{prop:"phoneNumber",label:"手机号",align:"center","min-width":"180","show-overflow-tooltip":""},scopedSlots:n._u([{key:"default",fn:function(e){return[e.row.isEdit?t("el-form",{ref:"form",attrs:{model:n.form,rules:n.rules}},[t("el-form-item",{attrs:{prop:"phoneNumber"}},[t("el-input",{ref:"phoneNumberRef",attrs:{type:"text",maxlength:"11"},model:{value:n.form.phoneNumber,callback:function(e){n.$set(n.form,"phoneNumber",e)},expression:"form.phoneNumber"}})],1)],1):t("span",[n._v(n._s(e.row.phoneNumber))])]}}])}),n._v(" "),t("el-table-column",{attrs:{label:"创建时间",align:"center",width:"180"},scopedSlots:n._u([{key:"default",fn:function(e){return[n._v(n._s(n._f("dateTime")(e.row.createTime,"yyyy-MM-dd hh:mm:ss")))]}}])}),n._v(" "),t("el-table-column",{attrs:{label:"操作人",width:"200",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return[n._v(n._s(e.row.createUser.username))]}}])}),n._v(" "),t("el-table-column",{attrs:{label:"操作",width:"120",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return e.row.isEdit?[t("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(t){t.stopPropagation(),n.save(e.row,e.$index)}}},[n._v("保存")]),n._v(" "),t("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(t){t.stopPropagation(),n.cancel(e.row,e.$index)}}},[n._v("取消")])]:void 0}}])})],1),n._v(" "),t("pagination",{ref:"pageInfo",attrs:{total:n.pageInfo.totalElements,page:n.pageInfo.currentPage},on:{"update:page":function(e){n.$set(n.pageInfo,"currentPage",e)},pagination:n.pagination}})],1)};i._withStripped=!0;var o={render:i,staticRenderFns:[]},l=o;var c=!1;var u=t("VU/8")(r,l,!1,function(n){c||t("uYxW")},"data-v-00937269",null);u.options.__file="src/pages/system/super-user.vue";e.default=u.exports},espX:function(n,e,t){(n.exports=t("FZ+f")(!0)).push([n.i,"\n.tools-bar[data-v-00937269] {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n","",{version:3,sources:["D:/work/junyang_admin/src/pages/system/D:/work/junyang_admin/src/pages/system/super-user.vue"],names:[],mappings:";AAmQA;EACE,sBAAyB;MAAzB,mBAAyB;UAAzB,0BAAyB;CAC1B",file:"super-user.vue",sourcesContent:["$light:#fff;\r\n$black:#000;\r\n$gray:#eee;\r\n$gray-ee:#eef1f6;\r\n$stable-dc:#dcdfe6;\r\n$stable-f5:#f5f7fa;\r\n$dark03:#303133 !default;\r\n$color-primary: #409EFF !default;\r\n\r\n$font-size-12:12px;\r\n$font-size-14:14px;\r\n$font-size-16:16px;\r\n$font-size-18:18px;\r\n$font-size-20:20px;\r\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n.tools-bar {\r\n  justify-content: flex-end;\r\n}\r\n"],sourceRoot:""}])},uYxW:function(n,e,t){var a=t("espX");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);t("rjj0")("c7d3f38a",a,!1,{})}});
//# sourceMappingURL=12.28a4f7a30bfcfcf1b73e.js.map