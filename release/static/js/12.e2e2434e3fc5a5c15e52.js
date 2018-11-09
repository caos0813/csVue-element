webpackJsonp([12],{IGic:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("0xDb"),s=a("5aCZ"),l={data:function(){return{params:{title:"",image:"",link:"",content:"",status:""},isLink:!1,rules:{title:[{required:!0,message:"请输入专题名称",trigger:"blur"}],content:[{required:!0,message:"请输入内容",trigger:"blur"}],image:[{type:"string",required:!0,message:"请上传封面",trigger:"blur"}],link:[{required:!0,message:"请输入链接地址",trigger:"blur"}]},timeDialog:!1,addForm:{publishTime:""},pickerOptions2:{disabledDate:function(e){return e.getTime()<Date.now()-864e5}},formRules:{publishTime:[{type:"date",required:!0,message:"时间不能为空",trigger:"change"}]}}},components:{upload:a("bGai").e,Tinymce:s.a},methods:{release:function(){this.params.status=1,this.postData("form",i.a.bannerPublishNow)},timeRelease:function(){var e=this;this.$refs.form.validate(function(t){t&&(e.timeDialog=!0,e.$refs.addForm&&e.$refs.addForm.resetFields())})},submit:function(){this.params.status=2,this.postData("form",i.a.bannerSave)},postData:function(e,t){var a=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var i=a.params,s=i.title,l=i.image,r=i.link,n=i.id,o=i.content,m=i.status,c=a.timeDialog?new Date(a.addForm.publishTime).getTime():null;a.$fly.post(t,{id:n,title:s,link:a.isLink?r:null,publishTime:c,image:l,content:a.isLink?null:o,status:m}).then(function(e){a.$message({message:"保存成功",duration:2e3,type:"success"}),a.$refs.form.resetFields(),a.timeDialog=!1,a.goBack()}).catch(function(){a.$message({message:"保存失败",duration:2e3,type:"error"})})})},save:function(){this.params.status=4,this.postData("addForm",i.a.bannerPublishDelay)},cancel:function(){this.$refs.addForm.resetFields(),this.timeDialog=!1},selectChange:function(e){this.isLink=e,e?this.params.content="":this.params.url=""}},created:function(){var e=this,t=this.$route.params.type,a=this.$route.query.id;"edit"===t&&this.$fly.get(i.a.bannerDetail,{id:a}).then(function(t){e.params=t,console.log(e.lodash.isNull(t.link)),e.lodash.isNull(t.link)?(e.isLink=!1,e.params.content=t.content):(e.isLink=!0,e.params.url=t.link)})}},r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"tools-bar"},[a("div",{staticClass:"left-wrap"},[a("back")],1),e._v(" "),a("div",{staticClass:"button-wrap"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.release}},[e._v("直接发布")]),e._v(" "),a("el-button",{attrs:{type:"info",size:"small"},on:{click:e.timeRelease}},[e._v("定时发布")]),e._v(" "),a("el-button",{attrs:{type:"warning",size:"small"},on:{click:e.submit}},[e._v("草稿")])],1)]),e._v(" "),a("el-form",{ref:"form",attrs:{model:e.params,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"标题",prop:"title"}},[a("el-col",{attrs:{span:12}},[a("el-input",{attrs:{placeholder:"请输入标题"},model:{value:e.params.title,callback:function(t){e.$set(e.params,"title",t)},expression:"params.title"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"封面",prop:"image"}},[a("upload",{attrs:{path:"image/article/"},model:{value:e.params.image,callback:function(t){e.$set(e.params,"image",t)},expression:"params.image"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"链接地址"}},[a("el-switch",{on:{change:e.selectChange},model:{value:e.isLink,callback:function(t){e.isLink=t},expression:"isLink"}})],1),e._v(" "),e.isLink?a("el-form-item",{attrs:{label:"链接地址",prop:e.isLink?"link":""}},[a("el-col",{attrs:{span:12}},[a("el-input",{attrs:{placeholder:"请输入链接地址"},model:{value:e.params.link,callback:function(t){e.$set(e.params,"link",t)},expression:"params.link"}})],1)],1):e._e(),e._v(" "),e.isLink?e._e():a("el-form-item",{attrs:{prop:e.isLink?"":"content"}},[a("el-col",{attrs:{span:18}},[a("Tinymce",{ref:"editor",attrs:{height:600},model:{value:e.params.content,callback:function(t){e.$set(e.params,"content",t)},expression:"params.content"}})],1)],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"定时发布",visible:e.timeDialog,width:"500px","close-on-click-modal":!1},on:{"update:visible":function(t){e.timeDialog=t}}},[a("el-form",{ref:"addForm",attrs:{model:e.addForm,"inline-message":"",rules:e.formRules,"label-suffix":":","label-width":"100"}},[a("el-form-item",{attrs:{label:"发布时间",prop:"publishTime"}},[a("el-col",{attrs:{span:12}},[a("el-date-picker",{staticClass:"full",attrs:{type:"datetime","picker-options":e.pickerOptions2,placeholder:"请选择发布时间"},model:{value:e.addForm.publishTime,callback:function(t){e.$set(e.addForm,"publishTime",t)},expression:"addForm.publishTime"}})],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.cancel}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("确定")])],1)],1)],1)};r._withStripped=!0;var n={render:r,staticRenderFns:[]},o=n;var m=a("VU/8")(l,o,!1,null,null,null);m.options.__file="src\\pages\\banner.vue";t.default=m.exports}});