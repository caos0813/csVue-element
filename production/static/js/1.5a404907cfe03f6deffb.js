webpackJsonp([1],{aYew:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("0xDb"),i={data:function(){return{date:null,pickerOptions2:{disabledDate:function(e){return e.getTime()>Date.now()},shortcuts:[{text:"今天",onClick:function(e){e.$emit("pick",[new Date,new Date])}},{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},name:"",phoneNum:"",tableData:[],pageInfo:{},loading:!1,pageSizes:[100,200,300,400]}},computed:{params:function(){return{page:1,beginTime:this.date?this.date[0]:null,endTime:this.date?this.date[1]:null,phoneNum:this.phoneNum,name:this.name}}},components:{page:a("bGai").c},methods:{dateChange:function(e){var t=new Date(e[0]),a=new Date(e[1]);e[0]=new Date(t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" 00:00:00").getTime(),e[1]=new Date(a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()+" 23:59:59").getTime(),this.params.beginTime=e[0],this.params.endTime=e[1],this.getData(this.params)},currentChange:function(e){this.params.page=e,this.getData(this.params)},sizeChange:function(e){this.params.size=e,this.getData(this.params)},search:function(){this.params.phoneNum=this.phoneNum,this.params.name=this.name,this.getData(this.params)},reset:function(){this.date=null,this.phoneNum="",this.name="",this.params={page:1,size:15,beginTime:this.date?this.date[0]:null,endTime:this.date?this.date[1]:null,phoneNum:"",name:""},this.getData(this.params)},getData:function(e){var t=this;e.page--,this.loading=!0,this.$fly.get(n.a.getFeedback,e).then(function(a){t.loading=!1;var n=a.content,i=a.totalElements;t.pageInfo={totalElements:i,currentPage:e.page+1},t.tableData=n})}},created:function(){this.getData(this.params)},mounted:function(){this.params.size=this.$refs.pageInfo.pageSizes[0]}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"tools-bar"},[a("div",{staticClass:"left-wrap"},[a("el-date-picker",{staticClass:"date-picker-wrap",attrs:{size:"small",type:"daterange","unlink-panels":"","range-separator":"至 ","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions2,"value-format":"timestamp"},on:{change:e.dateChange},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}}),e._v(" "),a("el-input",{attrs:{"prefix-icon":"el-icon-search",placeholder:"请输入昵称",size:"small"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),a("el-input",{attrs:{"prefix-icon":"el-icon-search",placeholder:"请输入手机号",size:"small"},model:{value:e.phoneNum,callback:function(t){e.phoneNum=t},expression:"phoneNum"}}),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.search}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"warning"},on:{click:e.reset}},[e._v("重置")])],1)]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.tableData,"header-cell-style":{background:"#F5F7FA"},"element-loading-text":"拼命加载中",border:"",stripe:""}},[a("el-table-column",{attrs:{type:"index",width:"50",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"昵称",width:"180",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"phoneNum",label:"手机号",width:"120",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"time",label:"时间",align:"center",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("dateTime")(t.row.time,"yyyy-MM-dd hh:mm:ss")))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"content",label:"反馈内容",align:"center","show-overflow-tooltip":""}})],1),e._v(" "),a("page",{ref:"pageInfo",attrs:{pageInfo:e.pageInfo},on:{sizeChange:e.sizeChange,currentChange:e.currentChange}})],1)},staticRenderFns:[]};var l=a("VU/8")(i,s,!1,function(e){a("ow4O")},null,null);t.default=l.exports},ow4O:function(e,t){}});