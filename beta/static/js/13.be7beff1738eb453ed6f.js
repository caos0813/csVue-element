webpackJsonp([13],{f5jv:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("0xDb"),s=a("bGai"),i={data:function(){var e=this;return{params:{title:null,page:1,sortType:"publishTime|desc"},checkData:[],tableData:[],loading:!1,pageInfo:{},sendDialog:!1,sendTitle:[],checkAll:!1,form:{radio:"1",sendTime:"",isIndeterminate:!0,provincesIds:[]},sendRules:{sendTime:[{required:!0,message:"请选择推送方式",trigger:"change",validator:function(t,a,n){"2"!==e.form.radio||e.form.sendTime?n():n(new Error("请选择定时推送时间"))}}],sendRange:[{type:"array",required:!0,message:"请至少选择一个推送范围",trigger:"change",validator:function(t,a,n){0===e.form.provincesIds.length?n(new Error("请至少选择一个推送范围")):n()}}]},pickerOptions2:{disabledDate:function(e){return e.getTime()<Date.now()-864e5}},provincesData:[],povincesDataById:[],bannerId:"",popoverIsClose:!1,startAnimate:!1,closeAnimate:!1}},components:{listHandle:s.b,page:s.c},methods:{reset:function(){this.params={title:null,page:1,size:10,sortType:1},this.getData(this.params)},search:function(){this.getData(this.params)},refresh:function(){this.getData(this.params)},handleSelectionChange:function(e){var t=this;this.checkData=[],this.lodash.map(e,function(e){t.checkData.push({id:e.id,status:e.status,title:e.title})})},currentChange:function(e){this.params.page=e,this.getData(this.params)},sizeChange:function(e){this.params.page=1,this.params.size=e,this.getData(this.params)},getData:function(e){var t=this;e.page--,this.loading=!0,this.$fly.get(n.a.bannerList,e).then(function(a){t.loading=!1,t.tableData=a.content,t.pageInfo={totalElements:a.totalElements,currentPage:e.page+1}})},openSendDialog:function(e){this.sendDialog=!0,this.bannerId=e,this.popoverIsClose=!0,this.startAnimate=!0,this.closeAnimate=!1,this.form={radio:"1",sendTime:"",isIndeterminate:!0,provincesIds:[]},this.$refs.form.resetFields()},handleCheckAllChange:function(e){var t=[];e?this.provincesData.map(function(e){if(!e.disabled)return t.push(e.name)}):t=[],this.form.provincesIds=t,this.form.provincesIds.length===this.provincesData.length&&(this.form.isIndeterminate=!1)},handleCheckedCitiesChange:function(e){var t=e.length;this.checkAll=t===this.provincesData.length,this.form.isIndeterminate=t>0&&t<this.provincesData.length},cancel:function(){this.$refs.form.resetFields(),this.popoverIsClose=!0,this.closeAnimate=!0,this.startAnimate=!1},sendFn:function(e){var t=this;this.$refs.form.validate(function(e){if(!e)return console.log("error submit!!"),!1;!function(){var e=void 0,a=void 0,s=void 0,i=[],o=t.form.provincesIds,r=t.provincesData,l=function(e){o.map(function(t){return r[e].name===t&&i.push("dev_"+r[e].code),i})};for(var c in r)l(c);s=t.checkAll?0:1,e={id:t.bannerId,type:1,provinceIds:""+i,area:s},console.log(e),"1"===t.form.radio?a=n.a.bannerSend:"2"===t.form.radio&&(a=n.a.bannerSchedule,e.date=t.form.sendTime),Object(n.b)("您确定将推送选择的banner吗？","提示").then(function(){t.$fly.post(a,e).then(function(e){t.$message({message:"推送成功",duration:2e3,type:"success"}),t.params.page=1,t.getData(t.params)}).catch(function(){t.$message({message:"推送失败",duration:2e3,type:"error"}),t.popoverIsClose=!0,t.closeAnimate=!1,t.startAnimate=!1})}).catch(function(){t.popoverIsClose=!0,t.closeAnimate=!1,t.startAnimate=!1})}()})},close:function(){this.closeAnimate=!0,this.popoverIsClose=!0,this.startAnimate=!1},handleBodyClick:function(e){var t=e||window.e,a=document.getElementById("dialog-wrap");if(a){var n=a.contains(t.target);if(console.log(n),n)return;this.closeAnimate=!0}}},created:function(){var e=this;this.getData(this.params),this.$fly.get(n.a.getProvinces).then(function(t){var a=t._embedded.provinces;e.provincesData=a,e.$fly.get(n.a.getProvinceIds).then(function(t){e.povincesDataById=t,console.log("beta"),a.map(function(e){e.disabled=!0;for(var a=0;a<t.length;a++)if(t[a]==="dev_"+e.code){e.disabled=!1;break}}),console.log(a),e.$set(e,"provincesData",a)})})},mounted:function(){this.params.size=this.$refs.pageInfo.pageSizes[0],this.popoverIsClose||document.addEventListener("click",this.handleBodyClick)},destroyed:function(){document.removeEventListener("click",this.handleBodyClick)}},o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"tools-bar"},[a("div",{staticClass:"left-wrap"},[a("el-input",{attrs:{"prefix-icon":"el-icon-search",placeholder:"请输入搜索关键字",size:"small"},model:{value:e.params.title,callback:function(t){e.$set(e.params,"title",t)},expression:"params.title"}}),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.search}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"warning"},on:{click:e.reset}},[e._v("重置")])],1),e._v(" "),a("listHandle",{attrs:{showSend:!0,checkData:e.checkData},on:{refresh:e.refresh}})],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",attrs:{"header-cell-class-name":"tableHeader",data:e.tableData,"element-loading-text":"拼命加载中",border:"",stripe:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center","label-class-name":"checkLabel"}}),e._v(" "),a("el-table-column",{attrs:{label:"标题",prop:"title",align:"center","min-width":"180","show-overflow-tooltip":""}}),e._v(" "),a("el-table-column",{attrs:{label:"所属产品","min-width":"160","show-overflow-tooltip":"",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.productName))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"操作人","min-width":"260",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"状态",width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{size:"small",type:e._f("publicStatus")(t.row.status,"style")}},[e._v(e._s(e._f("publicStatus")(t.row.status)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"totalReadNum",label:"阅读量",width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.totalReadNum)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"发布时间",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("dateTime")(t.row.publishTime,"yyyy-MM-dd hh:mm:ss")))]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[2===t.row.status||3===t.row.status?a("el-button",{attrs:{type:"text ",size:"mini"}},[a("router-link",{attrs:{to:{name:"banner",params:{type:"edit"},query:{id:t.row.id}},tag:"span"}},[e._v("编辑")])],1):e._e(),e._v(" "),1===t.row.status?a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){a.stopPropagation(),e.openSendDialog(t.row.id)}}},[e._v("推送")]):e._e()]}}])})],1),e._v(" "),a("page",{ref:"pageInfo",attrs:{pageInfo:e.pageInfo},on:{sizeChange:e.sizeChange,currentChange:e.currentChange}}),e._v(" "),a("div",{staticClass:"dialog-wrap",class:{start:e.startAnimate,close:e.closeAnimate,hide:!e.popoverIsClose},attrs:{id:"dialog-wrap"}},[a("div",{staticClass:"dialog-header"},[a("span",{staticClass:"title"},[e._v("推送")]),e._v(" "),a("el-button",{staticClass:"btn-close",attrs:{type:"text",icon:"el-icon-close"},on:{click:e.close}})],1),e._v(" "),a("div",{staticClass:"dialog-container"},[a("el-form",{ref:"form",attrs:{model:e.form,"inline-message":"",rules:e.sendRules,"label-suffix":":","label-width":"100px"}},[a("el-form-item",{attrs:{label:"被推送的标题"}},e._l(e.checkData,function(t,n){return a("label",{key:n},[e._v(e._s(t.title))])})),e._v(" "),a("el-form-item",{attrs:{label:"推送时间",prop:"sendTime"}},[a("el-radio",{attrs:{label:"1"},model:{value:e.form.radio,callback:function(t){e.$set(e.form,"radio",t)},expression:"form.radio"}},[e._v("直接推送")]),e._v(" "),a("br"),e._v(" "),a("el-radio",{attrs:{label:"2"},model:{value:e.form.radio,callback:function(t){e.$set(e.form,"radio",t)},expression:"form.radio"}},[e._v("定时推送")]),e._v(" "),a("el-date-picker",{attrs:{type:"datetime",size:"small","picker-options":e.pickerOptions2,"value-format":"timestamp",placeholder:"请选择发布时间"},model:{value:e.form.sendTime,callback:function(t){e.$set(e.form,"sendTime",t)},expression:"form.sendTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"推送范围",prop:"sendRange"}},[a("el-checkbox",{attrs:{indeterminate:e.form.isIndeterminate},on:{change:e.handleCheckAllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("全国")]),e._v(" "),a("el-checkbox-group",{on:{change:e.handleCheckedCitiesChange},model:{value:e.form.provincesIds,callback:function(t){e.$set(e.form,"provincesIds",t)},expression:"form.provincesIds"}},e._l(e.provincesData,function(t,n){return a("el-checkbox",{key:n,attrs:{label:t.name,disabled:t.disabled,min:1}},[e._v(e._s(t.name))])}))],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer"},[a("el-button",{attrs:{size:"small"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.sendFn("send")}}},[e._v("确定")])],1)])],1)};o._withStripped=!0;var r={render:o,staticRenderFns:[]},l=r;var c=a("VU/8")(i,l,!1,null,null,null);c.options.__file="src\\pages\\banner-list.vue";t.default=c.exports}});