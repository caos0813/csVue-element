webpackJsonp([18],{"9Oh4":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("0xDb"),s=a("bGai"),l={data:function(){return{showSoldout:!1,checkData:[],pickerVal:[],params:{title:null,page:1,sortType:1},pageInfo:{totalElements:0,currentPage:1},tableData:[],loading:!1}},components:{picker:s.e,listHandle:s.c,pagination:s.d},methods:{refresh:function(){this.getData(this.params)},handleFn:function(e){var t=this,a=this.$route.name.split("-")[0];if("add"===e)this.toState({name:a,params:{type:"add"}});else{var s=void 0,l=void 0;"delete"===e&&(s=n.a[a+"Delete"],l="删除"),Object(n.b)("您确定将选择的内容"+l+"吗？","提示").then(function(){t.checkIds=[];for(var e=0;e<t.checkData.length;e++)t.checkIds.push(t.checkData[e].id);t.checkIds.length>0&&t.$fly.post(s,t.checkIds).then(function(e){var a=e.allowIds,n=e.notallowIds;a.length>0&&n.length>0?t.$message({message:"已删除的编号："+a+"\n未删除的编号："+n,duration:2e3,type:"success"}):a.length>0?t.$message({message:"已删除的编号："+a,duration:2e3,type:"success"}):n.length>0&&(console.log("notallowIds"),t.$message({message:"未删除的编号："+n,duration:2e3,type:"info"})),t.getData(t.params)}).catch(function(e){console.log(e),t.$message({message:l+"失败",duration:2e3,type:"error"})})})}},handleSelectionChange:function(e){var t=this;this.checkData=[],this.lodash.map(e,function(e){t.checkData.push({id:e.id})})},pagination:function(e){this.params.page=e.page,this.params.size=e.limit,this.getData(this.params)},reset:function(){this.params={title:null,page:1,size:this.$refs.pageInfo.pageSizes[0],sortType:1},this.pickerVal=[],this.getData(this.params)},search:function(){this.getData(this.params)},getData:function(e){var t=this;e.productId=this.pickerVal[0],e.page--,this.loading=!0,this.$fly.get(n.a.specialList,e).then(function(a){setTimeout(function(){t.loading=!1},1e3);var n=a.content,s=a.totalElements;t.tableData=n,t.pageInfo={totalElements:parseInt(s),currentPage:e.page+1}})}},created:function(){this.getData(this.params)},mounted:function(){this.params.size=this.$refs.pageInfo.pageSizes[0]}},i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"tools-bar"},[a("div",{staticClass:"left-wrap"},[a("el-input",{attrs:{"prefix-icon":"el-icon-search",placeholder:"请输入搜索关键字",size:"small"},model:{value:e.params.title,callback:function(t){e.$set(e.params,"title",t)},expression:"params.title"}}),e._v(" "),a("picker",{attrs:{size:"small",span:-1,column:1},model:{value:e.pickerVal,callback:function(t){e.pickerVal=t},expression:"pickerVal"}}),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.search}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"warning"},on:{click:e.reset}},[e._v("重置")])],1),e._v(" "),a("div",{staticClass:"button-wrap"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.handleFn("add")}}},[e._v("新增")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"small",disabled:e.checkData.length<1},on:{click:function(t){e.handleFn("delete")}}},[e._v("删除")])],1)]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",attrs:{"header-cell-class-name":"tableHeader",data:e.tableData,"element-loading-text":"拼命加载中",border:"",stripe:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center","label-class-name":"checkLabel"}}),e._v(" "),a("el-table-column",{attrs:{prop:"title",label:"标题",align:"center","min-width":"180","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"操作人","min-width":"260",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"introduction",label:"简介","min-width":"200","show-overflow-tooltip":"",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",width:"200",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("dateTime")(t.row.createTime,"yyyy-MM-dd hh:mm:ss")))]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text ",size:"mini"}},[a("router-link",{attrs:{to:{name:"xuanke/special",params:{type:"edit"},query:{id:t.row.id}},tag:"span"}},[e._v("编辑")])],1)]}}])})],1),e._v(" "),a("pagination",{ref:"pageInfo",attrs:{total:e.pageInfo.totalElements,page:e.pageInfo.currentPage},on:{"update:page":function(t){e.$set(e.pageInfo,"currentPage",t)},pagination:e.pagination}})],1)};i._withStripped=!0;var o={render:i,staticRenderFns:[]},r=o;var c=a("VU/8")(l,r,!1,null,null,null);c.options.__file="src/pages/xuanke/special/list.vue";t.default=c.exports}});
//# sourceMappingURL=18.ea84f6a645f8e7b3429d.js.map