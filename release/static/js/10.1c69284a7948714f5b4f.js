webpackJsonp([10],{rnrB:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t("0xDb"),l={data:function(){return{date:"",pickerOptions2:{disabledDate:function(e){return e.getTime()>Date.now()},shortcuts:[{text:"今天",onClick:function(e){e.$emit("pick",[new Date,new Date])}},{text:"最近一周",onClick:function(e){var a=new Date,t=new Date;t.setTime(t.getTime()-6048e5),e.$emit("pick",[t,a])}},{text:"最近一个月",onClick:function(e){var a=new Date,t=new Date;t.setTime(t.getTime()-2592e6),e.$emit("pick",[t,a])}},{text:"最近三个月",onClick:function(e){var a=new Date,t=new Date;t.setTime(t.getTime()-7776e6),e.$emit("pick",[t,a])}}]},buyWay:"",payWay:"",status:"",statusList:[{value:"",name:"全部"},{value:"NOTPAY",name:"未支付"},{value:"USERPAYING",name:"支付中"},{value:"SUCCESS",name:"支付成功"},{value:"PAYERROR",name:"支付失败"},{value:"REVOKED",name:"已撤销"},{value:"REFUND",name:"转入退款"},{value:"CLOSED",name:"已关闭"}],tableData:[],loading:!1,pageInfo:{}}},computed:{params:function(){return{page:1,size:void 0,beginDate:this.date?this.date[0]:null,endDate:this.date?this.date[1]:null,buyWay:this.buyWay,payWay:this.payWay,payCode:this.status}}},components:{page:t("bGai").c},methods:{dateChange:function(e){var a=new Date(e[0]),t=new Date(e[1]);e[0]=new Date(a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()+" 00:00:00").getTime(),e[1]=new Date(t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" 23:59:59").getTime(),this.params.beginDate=e[0],this.params.endDate=e[1],this.getData(this.params)},selectChange:function(e){this.getData(this.params)},currentChange:function(e){this.params.page=e,this.getData(this.params)},sizeChange:function(e){console.log(e),this.params.page=1,this.params.size=e,this.getData(this.params)},getData:function(e){var a=this;e.page>0&&e.page--,this.loading=!0,this.$fly.get(n.a.getOrderList,e).then(function(t){a.loading=!1;var n=t.content,l=t.totalElements;a.pageInfo={totalElements:l,currentPage:e.page+1},a.tableData=n})}},created:function(){this.getData(this.params)},mounted:function(){this.params.size=this.$refs.pageInfo.pageSizes[0]}},s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"page"},[t("div",{staticClass:"tools-bar"},[t("div",{staticClass:"left-wrap"},[t("el-date-picker",{staticClass:"date-picker-wrap",attrs:{size:"small",type:"daterange","unlink-panels":"","range-separator":"至 ","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions2,"value-format":"timestamp"},on:{change:e.dateChange},model:{value:e.date,callback:function(a){e.date=a},expression:"date"}}),e._v(" "),t("el-select",{staticClass:"mRight_15",attrs:{placeholder:"购买方式",size:"small"},on:{change:e.selectChange},model:{value:e.buyWay,callback:function(a){e.buyWay=a},expression:"buyWay"}},[t("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),t("el-option",{attrs:{label:"App购买",value:"1"}}),e._v(" "),t("el-option",{attrs:{label:"卡激活",value:"2"}})],1),e._v(" "),t("el-select",{staticClass:"mRight_15",attrs:{placeholder:"订单状态",size:"small"},on:{change:e.selectChange},model:{value:e.status,callback:function(a){e.status=a},expression:"status"}},e._l(e.statusList,function(e,a){return t("el-option",{key:a,attrs:{label:e.name,value:e.value}})})),e._v(" "),t("el-select",{staticClass:"mRight_15",attrs:{placeholder:"支付方式",size:"small"},on:{change:e.selectChange},model:{value:e.payWay,callback:function(a){e.payWay=a},expression:"payWay"}},[t("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),t("el-option",{attrs:{label:"微信支付",value:"1"}}),e._v(" "),t("el-option",{attrs:{label:"支付宝支付",value:"2"}})],1)],1)]),e._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.tableData,"header-cell-style":{background:"#F5F7FA"},"element-loading-text":"拼命加载中",border:"",stripe:""}},[t("el-table-column",{attrs:{type:"index",width:"50",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"userId",label:"用户ID",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"orderNumber",label:"订单编号",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"payDescription",label:"订单状态",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"goodsName",label:"商品名称",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"createDate",label:"日期",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",[e._v(e._s(e._f("dateTime")(a.row.createDate,"yyyy-MM-dd hh:mm:ss")))])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"buyWay",label:"订单类型",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",[e._v(e._s(1===a.row.payWay?"App购买":2===a.row.payWay?"卡激活":"其他"))])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"price",label:"商品价格",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"payWay",label:"支付方式",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",[e._v(e._s(1===a.row.payWay?"微信支付":2===a.row.payWay?"支付宝支付":"其他"))])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"remark",label:"备注",align:"center"}})],1),e._v(" "),t("page",{ref:"pageInfo",attrs:{pageInfo:e.pageInfo},on:{sizeChange:e.sizeChange,currentChange:e.currentChange}})],1)};s._withStripped=!0;var i={render:s,staticRenderFns:[]},r=i;var o=t("VU/8")(l,r,!1,null,null,null);o.options.__file="src\\pages\\order-list.vue";a.default=o.exports}});