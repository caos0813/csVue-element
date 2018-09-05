webpackJsonp([0],{"E+95":function(e,t){},eZtN:function(e,t){},f6g5:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("0xDb"),r=a("bGai"),l={data:function(){return{showSoldout:!1,checkData:[],pickerVal:[],pageInfo:{},tableData:[],loading:!1}},computed:{params:function(){return{title:null,page:1,size:10,sortType:1}}},components:{picker:r.d,listHandle:r.b,page:r.c},methods:{refresh:function(){this.getData(this.params)},handleSelectionChange:function(e){var t=this;this.checkData=[],this.lodash.map(e,function(e){t.checkData.push({id:e.id})})},currentChange:function(e){this.params.page=e,this.getData(this.params)},sizeChange:function(e){this.params.size=e,this.getData(this.params)},reset:function(){this.params={title:null,page:1,size:15,sortType:1},this.pickerVal=[],this.getData(this.params)},search:function(){console.log(this.pickerVal),this.params.productId=this.pickerVal[0],this.getData(this.params)},getData:function(e){var t=this,a=this.lodash.clone(e);a.page--,this.loading=!0,this.$fly.get(i.a.specialList,a).then(function(e){t.loading=!1;var i=e.content,r=e.totalElements;t.tableData=i,t.pageInfo={totalElements:r,currentPage:a.page+1}})}},created:function(){this.getData(this.params)}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"tools-bar"},[a("div",{staticClass:"left-wrap"},[a("el-input",{attrs:{"prefix-icon":"el-icon-search",placeholder:"请输入搜索关键字",size:"small"},model:{value:e.params.title,callback:function(t){e.$set(e.params,"title",t)},expression:"params.title"}}),e._v(" "),a("picker",{attrs:{size:"small",span:-1,column:1},model:{value:e.pickerVal,callback:function(t){e.pickerVal=t},expression:"pickerVal"}}),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.search}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"warning"},on:{click:e.reset}},[e._v("重置")])],1),e._v(" "),a("listHandle",{attrs:{checkData:e.checkData,"show-soldout":e.showSoldout},on:{refresh:e.refresh}})],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",attrs:{"header-cell-class-name":"tableHeader",data:e.tableData,border:"",stripe:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center","label-class-name":"checkLabel"}}),e._v(" "),a("el-table-column",{attrs:{prop:"title",label:"标题",align:"center","min-width":"180","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"操作人","min-width":"260",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"introduction",label:"简介","min-width":"200","show-overflow-tooltip":"",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",width:"200",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("dateTime")(t.row.createTime,"yyyy-MM-dd hh:mm:ss")))]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text ",size:"mini"}},[a("router-link",{attrs:{to:{name:"special",params:{type:"edit"},query:{id:t.row.id}},tag:"span"}},[e._v("编辑")])],1)]}}])})],1),e._v(" "),a("page",{attrs:{pageInfo:e.pageInfo},on:{sizeChange:e.sizeChange,currentChange:e.currentChange}})],1)},staticRenderFns:[]};var n=a("VU/8")(l,s,!1,function(e){a("E+95")},null,null);t.default=n.exports},q5hk:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("0xDb"),r=a("bGai"),l={data:function(){return{rules:{title:[{required:!0,message:"请输入专题名称",trigger:"blur"}],filePath:[{required:!0,message:"请上传封面",trigger:"blur"}],pickerVal:[{required:!0,validator:function(e,t,a){t.length<1?a(new Error("请选择产品和分类")):a()},trigger:"change"}],introduction:[{required:!0,message:"请输入简介",trigger:"blur"}]},params:{title:"",isHomePageShow:0,pickerVal:[],filePath:"",introduction:""}}},components:{upload:r.e,picker:r.d},methods:{submit:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return console.log("error submit!!"),!1;var a=e.params,r=a.title,l=a.filePath,s=a.pickerVal,n=a.id,o=a.introduction;e.$fly.post(i.a.specialHandle,{id:n,title:r,filePath:l,productId:s[0],introduction:o}).then(function(t){e.$message({message:"保存成功",duration:2e3,type:"success"}),e.$refs.form.resetFields(),e.goBack()}).catch(function(){e.$message({message:"保存失败",duration:2e3,type:"error"})})})}},created:function(){var e=this,t=this.$route.params.type,a=this.$route.query.id;"edit"===t&&this.$fly.get(i.a.specialDetail,{id:a}).then(function(t){e.params=t,e.params.pickerVal=[t.productId]})}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"tools-bar"},[a("div",{staticClass:"left-wrap"},[a("back")],1),e._v(" "),a("div",{staticClass:"button-wrap"},[a("el-button",{attrs:{type:"warning",size:"small"},on:{click:e.submit}},[e._v("保存")])],1)]),e._v(" "),a("el-form",{ref:"form",attrs:{model:e.params,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{prop:"pickerVal",label:"产品"}},[a("picker",{model:{value:e.params.pickerVal,callback:function(t){e.$set(e.params,"pickerVal",t)},expression:"params.pickerVal"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"专题名称",prop:"title"}},[a("el-col",{attrs:{span:12}},[a("el-input",{model:{value:e.params.title,callback:function(t){e.$set(e.params,"title",t)},expression:"params.title"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"简介",prop:"introduction"}},[a("el-input",{attrs:{type:"textarea",rows:3,placeholder:"请输入简介"},model:{value:e.params.introduction,callback:function(t){e.$set(e.params,"introduction",t)},expression:"params.introduction"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"封面",prop:"filePath"}},[a("upload",{model:{value:e.params.filePath,callback:function(t){e.$set(e.params,"filePath",t)},expression:"params.filePath"}})],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")(l,s,!1,function(e){a("eZtN")},"data-v-583a52a7",null);t.default=n.exports}});