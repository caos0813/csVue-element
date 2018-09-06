webpackJsonp([1],{Y6RP:function(e,t){},oF2k:function(e,t){},oQVo:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("0xDb"),l=a("bGai"),i={data:function(){return{params:{title:null,page:1,sortType:1},checkData:[],pickerVal:[],pageInfo:{},tableData:[],loading:!1}},components:{picker:l.d,listHandle:l.b,page:l.c},methods:{handleSelectionChange:function(e){var t=this;this.checkData=[],this.lodash.map(e,function(e){t.checkData.push({id:e.id,status:e.status})})},currentChange:function(e){this.params.page=e,this.getData(this.params)},sizeChange:function(e){this.params.size=e,this.getData(this.params)},reset:function(){this.params={title:null,page:1,size:15,sortType:1},this.pickerVal=[],this.getData(this.params)},search:function(){this.params.productId=this.pickerVal[0],this.getData(this.params)},refresh:function(){this.getData(this.params)},getData:function(e){var t=this;e.page--,this.loading=!0,this.$fly.get(s.a.topicList,e).then(function(a){t.loading=!1,t.tableData=a.content,t.pageInfo={totalElements:a.totalElements,currentPage:e.page+1}})}},created:function(){this.getData(this.params)},mounted:function(){this.params.size=this.$refs.pageInfo.pageSizes[0]}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"tools-bar"},[a("div",{staticClass:"left-wrap"},[a("el-input",{attrs:{"prefix-icon":"el-icon-search",placeholder:"请输入搜索关键字",size:"small"},model:{value:e.params.title,callback:function(t){e.$set(e.params,"title",t)},expression:"params.title"}}),e._v(" "),a("picker",{attrs:{size:"small",span:-1},model:{value:e.pickerVal,callback:function(t){e.pickerVal=t},expression:"pickerVal"}}),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.search}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"warning"},on:{click:e.reset}},[e._v("重置")])],1),e._v(" "),a("listHandle",{attrs:{checkData:e.checkData,"show-hot":""},on:{refresh:e.refresh}})],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",attrs:{"header-cell-class-name":"tableHeader",data:e.tableData,border:"",stripe:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center","label-class-name":"checkLabel"}}),e._v(" "),a("el-table-column",{attrs:{label:"标题",align:"center","min-width":"180","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.title))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"是否热门",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{size:"small",type:1===t.row.isHot?"danger":"info"}},[e._v(e._s(t.row.isHot?"是":"否"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"所属产品",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.product.name))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"操作人","min-width":"260",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"状态",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{size:"small",type:e._f("publicStatus")(t.row.status,"style")}},[e._v(e._s(e._f("publicStatus")(t.row.status)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"totalReadNum",label:"阅读量",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.totalReadNum)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("dateTime")(t.row.createTime,"yyyy-MM-dd hh:mm:ss")))]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"发布时间",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("dateTime")(t.row.publishTime,"yyyy-MM-dd hh:mm:ss")))]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[2===t.row.status||3===t.row.status?a("el-button",{attrs:{type:"text ",size:"mini"}},[a("router-link",{attrs:{to:{name:"topic",params:{type:"edit"},query:{id:t.row.id}},tag:"span"}},[e._v("编辑")])],1):e._e()]}}])})],1),e._v(" "),a("page",{ref:"pageInfo",attrs:{pageInfo:e.pageInfo},on:{sizeChange:e.sizeChange,currentChange:e.currentChange}})],1)},staticRenderFns:[]};var r=a("VU/8")(i,o,!1,function(e){a("oF2k")},null,null);t.default=r.exports},szU1:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("5aCZ"),l=a("0xDb"),i=a("bGai"),o={data:function(){return{rules:{title:[{required:!0,message:"请输入专题名称",trigger:"blur"}],content:[{required:!0,message:"请输入内容",trigger:"blur"}],pickerVal:[{required:!0,validator:function(e,t,a){t.length<1?a(new Error("请选择产品分类和专题")):a()},trigger:"change"}]},params:{title:"",isHot:0,type:0,pickerVal:[]},optionData:[],mode:"general",timeDialog:!1,addForm:{publishTime:""},pickerOptions2:{disabledDate:function(e){return e.getTime()<Date.now()-864e5}},formRules:{publishTime:[{type:"date",required:!0,message:"时间不能为空",trigger:"change"}]}}},components:{Tinymce:s.a,picker:i.d},methods:{modeChange:function(e){"general"===e?this.params.type=0:this.params.type||(this.params.type=1)},release:function(){this.postData("form",l.a.gambitPublishNow,1)},timeRelease:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.timeDialog=!0,e.$refs.addForm&&e.$refs.addForm.resetFields()})},save:function(){this.postData("addForm",l.a.gambitPublishDelay,4)},cancel:function(){this.$refs.addForm.resetFields(),this.timeDialog=!1},submit:function(){this.postData("form",l.a.topicHandle,2)},postData:function(e,t,a){var s=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var l=s.params,i=l.title,o=l.isHot,r=l.pickerVal,n=l.type,c=l.id,p=l.content,u="vote"===s.mode?s.optionData:null,d=s.timeDialog?new Date(s.addForm.publishTime).getTime():null;s.lodash.isArray(u)&&u.length<1?s.$message({message:"请添加选项",duration:2e3,type:"error"}):(console.log(i,o,r,n,c,p,d),s.$fly.post(t,{id:c,title:i,isHot:o,publishTime:d,content:p,type:n,votes:u,productId:r[0],status:a}).then(function(e){s.$message({message:"保存成功",duration:2e3,type:"success"}),s.$refs.form.resetFields(),s.timeDialog=!1,s.goBack()}).catch(function(){s.$message({message:"保存失败",duration:2e3,type:"error"})}))})},addRow:function(){this.optionData.push({voteContent:""})},delRow:function(e){var t=this;console.log(e);var a=e.$index;"edit"===this.$route.params.type?this.$fly.post(l.a.topicDeleteVote,{id:e.row.id}).then(function(e){t.optionData.splice(a,1)}).catch(function(){t.$message({message:"删除失败",duration:2e3,type:"error"})}):this.optionData.splice(a,1)},moveRow:function(e,t){var a=e.$index,s=this.optionData[a];"up"===t?(this.optionData.splice(a,1),this.optionData.splice(a-1,0,s)):(this.optionData.splice(a,1),this.optionData.splice(a+1,0,s))}},created:function(){var e=this,t=this.$route.params.type,a=this.$route.query.id;"edit"===t&&this.$fly.get(l.a.topicDetail,{id:a}).then(function(t){e.params=t,e.optionData=t.votes,e.params.pickerVal=[t.product.id],1!==t.type&&2!==t.type||(e.mode="vote")})}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"tools-bar"},[a("div",{staticClass:"left-wrap"},[a("back")],1),e._v(" "),a("div",{staticClass:"button-wrap"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.release}},[e._v("直接发布")]),e._v(" "),a("el-button",{attrs:{type:"info",size:"small"},on:{click:e.timeRelease}},[e._v("定时发布")]),e._v(" "),a("el-button",{attrs:{type:"warning",size:"small"},on:{click:e.submit}},[e._v("草稿")])],1)]),e._v(" "),a("el-form",{ref:"form",attrs:{model:e.params,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"产品",prop:"pickerVal"}},[a("picker",{model:{value:e.params.pickerVal,callback:function(t){e.$set(e.params,"pickerVal",t)},expression:"params.pickerVal"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"类型"}},[a("el-col",{attrs:{span:6}},[a("el-select",{staticClass:"full",attrs:{placeholder:""},on:{change:e.modeChange},model:{value:e.mode,callback:function(t){e.mode=t},expression:"mode"}},[a("el-option",{attrs:{value:"general",label:"普通话题"}}),e._v(" "),a("el-option",{attrs:{value:"vote",label:"投票"}})],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"标题",prop:"title"}},[a("el-col",{attrs:{span:12}},[a("el-input",{model:{value:e.params.title,callback:function(t){e.$set(e.params,"title",t)},expression:"params.title"}})],1),e._v(" "),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{"label-width":"20px",prop:"isHot"}},[[a("el-checkbox",{attrs:{"true-label":1,"false-label":0},model:{value:e.params.isHot,callback:function(t){e.$set(e.params,"isHot",t)},expression:"params.isHot"}},[e._v("是否热门")])]],2)],1)],1),e._v(" "),"vote"===e.mode?a("el-form-item",[a("el-form-item",[a("el-button",{attrs:{type:"info",size:"small"},on:{click:e.addRow}},[e._v("添加选项")]),e._v(" "),a("div",{staticClass:"radio-wrap"},[a("el-radio-group",{model:{value:e.params.type,callback:function(t){e.$set(e.params,"type",t)},expression:"params.type"}},[a("el-radio",{attrs:{label:1}},[e._v("单选")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("多选")])],1)],1)],1),e._v(" "),a("div",{staticClass:"space"}),e._v(" "),a("el-col",{attrs:{span:18}},[a("el-table",{attrs:{data:e.optionData,border:"","show-header":!1}},[a("el-table-column",{attrs:{label:"索引",align:"center",type:"index",width:"150px"}}),e._v(" "),a("el-table-column",{attrs:{label:"内容",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:""},model:{value:t.row.voteContent,callback:function(a){e.$set(t.row,"voteContent",a)},expression:"scope.row.voteContent"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"danger",size:"small",icon:"el-icon-delete",circle:""},on:{click:function(a){e.delRow(t)}}})]}}])})],1)],1)],1):e._e(),e._v(" "),a("el-form-item",{attrs:{prop:"content"}},[a("el-col",{attrs:{span:18}},[a("Tinymce",{ref:"editor",attrs:{height:600},model:{value:e.params.content,callback:function(t){e.$set(e.params,"content",t)},expression:"params.content"}})],1)],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"定时发布",visible:e.timeDialog,width:"500px","close-on-click-modal":!1},on:{"update:visible":function(t){e.timeDialog=t}}},[a("el-form",{ref:"addForm",attrs:{model:e.addForm,"inline-message":"",rules:e.formRules,"label-suffix":":","label-width":"100"}},[a("el-form-item",{attrs:{label:"发布时间",prop:"publishTime"}},[a("el-col",{attrs:{span:12}},[a("el-date-picker",{staticClass:"full",attrs:{"picker-options":e.pickerOptions2,type:"datetime",placeholder:"请选择发布时间"},model:{value:e.addForm.publishTime,callback:function(t){e.$set(e.addForm,"publishTime",t)},expression:"addForm.publishTime"}})],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.cancel}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("确定")])],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")(o,r,!1,function(e){a("Y6RP")},"data-v-3d9e9c3e",null);t.default=n.exports}});