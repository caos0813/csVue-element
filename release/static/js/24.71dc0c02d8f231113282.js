webpackJsonp([24],{PckH:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("0xDb"),l={data:function(){return{date:"",pickerOptions2:{disabledDate:function(e){return e.getTime()>Date.now()},shortcuts:[{text:"今天",onClick:function(e){e.$emit("pick",[new Date,new Date])}},{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},buyWay:"",payWay:"",status:"",statusList:[{value:"",name:"全部"},{value:"NOTPAY",name:"未支付"},{value:"USERPAYING",name:"支付中"},{value:"SUCCESS",name:"支付成功"},{value:"PAYERROR",name:"支付失败"},{value:"REVOKED",name:"已撤销"},{value:"REFUND",name:"转入退款"},{value:"CLOSED",name:"已关闭"}],tableData:[],loading:!1,pageInfo:{totalElements:0,currentPage:1}}},computed:{params:function(){return{page:1,size:void 0,beginDate:this.date?this.date[0]:null,endDate:this.date?this.date[1]:null,buyWay:this.buyWay,payWay:this.payWay,payCode:this.status}}},components:{pagination:a("bGai").d},methods:{dateChange:function(e){var t=new Date(e[0]),a=new Date(e[1]);e[0]=new Date(t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" 00:00:00").getTime(),e[1]=new Date(a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()+" 23:59:59").getTime(),this.params.beginDate=e[0],this.params.endDate=e[1],this.getData(this.params)},selectChange:function(e){this.getData(this.params)},pagination:function(e){this.params.page=e.page,this.params.size=e.limit,this.getData(this.params)},getData:function(e){var t=this;e.page>0&&e.page--,this.loading=!0,this.$fly.get(n.a.getOrderList,e).then(function(a){setTimeout(function(){t.loading=!1},1e3);var n=a.content,l=a.totalElements;t.pageInfo={totalElements:parseInt(l),currentPage:e.page+1},t.tableData=n})}},created:function(){this.getData(this.params)},mounted:function(){this.params.size=this.$refs.pageInfo.pageSizes[0]}},i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"tools-bar"},[a("div",{staticClass:"left-wrap"},[a("el-date-picker",{staticClass:"date-picker-wrap",attrs:{size:"small",type:"daterange","unlink-panels":"","range-separator":"至 ","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions2,"value-format":"timestamp"},on:{change:e.dateChange},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}}),e._v(" "),a("el-select",{staticClass:"mRight_15",attrs:{placeholder:"购买方式",size:"small"},on:{change:e.selectChange},model:{value:e.buyWay,callback:function(t){e.buyWay=t},expression:"buyWay"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),a("el-option",{attrs:{label:"App购买",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"卡激活",value:"2"}})],1),e._v(" "),a("el-select",{staticClass:"mRight_15",attrs:{placeholder:"订单状态",size:"small"},on:{change:e.selectChange},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},e._l(e.statusList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.value}})})),e._v(" "),a("el-select",{staticClass:"mRight_15",attrs:{placeholder:"支付方式",size:"small"},on:{change:e.selectChange},model:{value:e.payWay,callback:function(t){e.payWay=t},expression:"payWay"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),a("el-option",{attrs:{label:"微信支付",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"支付宝支付",value:"2"}})],1)],1)]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.tableData,"header-cell-style":{background:"#F5F7FA"},"element-loading-text":"拼命加载中",border:"",stripe:""}},[a("el-table-column",{attrs:{type:"index",width:"50",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userId",label:"用户ID",width:"100",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"orderNumber","min-width":"120","show-overflow-tooltip":"",label:"订单编号",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"payDescription",label:"订单状态",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"phoneNumber",width:"120",label:"手机号",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"goodsName","min-width":"120","show-overflow-tooltip":"",label:"商品名称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createDate",width:"170",label:"日期",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("dateTime")(t.row.createDate,"yyyy-MM-dd hh:mm:ss")))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"buyWay",width:"120",label:"订单类型",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(1===t.row.payWay?"App购买":2===t.row.payWay?"卡激活":"其他"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"price",width:"120",label:"商品价格",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"payWay",width:"120",label:"支付方式",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(1===t.row.payWay?"微信支付":2===t.row.payWay?"支付宝支付":"其他"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"remark","min-width":"120","show-overflow-tooltip":"",label:"备注",align:"center"}})],1),e._v(" "),a("pagination",{ref:"pageInfo",attrs:{total:e.pageInfo.totalElements,page:e.pageInfo.currentPage},on:{"update:page":function(t){e.$set(e.pageInfo,"currentPage",t)},pagination:e.pagination}})],1)};i._withStripped=!0;var s={render:i,staticRenderFns:[]},o=s;var r=a("VU/8")(l,o,!1,null,null,null);r.options.__file="src/pages/order/list.vue";t.default=r.exports}});
//# sourceMappingURL=24.71dc0c02d8f231113282.js.map