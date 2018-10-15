webpackJsonp([2],{L0Lu:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("5aCZ"),s=t("0xDb"),l=t("bGai"),r={data:function(){return{rules:{title:[{required:!0,message:"请输入专题名称",trigger:"blur"}],content:[{required:!0,message:"请输入内容",trigger:"blur"}],image:[{type:"string",required:!0,message:"请上传封面",trigger:"blur"}],audioPath:[{required:!0,message:"请上传音频",trigger:"blur"}],pickerVal:[{required:!0,validator:function(a,e,t){e.length<2?t(new Error("请选择产品分类和专题")):t()},trigger:"change"}]},params:{title:"",isHomePageShow:0,audioFlag:0,pickerVal:[],image:""},isAudioFlag:!1,timeDialog:!1,addForm:{publishTime:""},pickerOptions2:{disabledDate:function(a){return a.getTime()<Date.now()-864e5}},formRules:{publishTime:[{type:"date",required:!0,message:"时间不能为空",trigger:"change"}]}}},components:{upload:l.e,Tinymce:i.a,picker:l.d},methods:{release:function(){this.postData("form",s.a.articlePublishNow,1)},timeRelease:function(){var a=this;this.$refs.form.validate(function(e){e&&(a.timeDialog=!0,a.$refs.addForm&&a.$refs.addForm.resetFields())})},save:function(){this.postData("addForm",s.a.articlePublishDelay,4)},cancel:function(){this.$refs.addForm.resetFields(),this.timeDialog=!1},submit:function(){this.postData("form",s.a.articleHandle,2)},postData:function(a,e,t){var i=this;this.$refs[a].validate(function(a){if(!a)return console.log("error submit!!"),!1;var s=i.params,l=s.title,r=s.isHomePageShow,o=s.image,m=s.pickerVal,n=s.id,p=s.content,c=s.audioPath,u=s.audioFlag,d=s.textarea,g=i.timeDialog?new Date(i.addForm.publishTime).getTime():null;i.$fly.post(e,{id:n,title:l,audioPath:u?c:null,isHomePageShow:r,publishTime:g,image:u?null:o,content:u?d:p,specialTopicId:m[1],productId:m[0],status:t}).then(function(a){i.$message({message:"保存成功",duration:2e3,type:"success"}),i.$refs.form.resetFields(),i.timeDialog=!1,i.goBack()}).catch(function(){i.$message({message:"保存失败",duration:2e3,type:"error"})})})}},created:function(){var a=this,e=this.$route.params.type,t=this.$route.query.id;"edit"===e&&this.$fly.get(s.a.articleDetail,{id:t}).then(function(e){a.params=e,a.params.pickerVal=[e.product.id,e.specialTopic.id],a.lodash.isNull(e.audioPath)?(a.params.audioFlag=0,a.isAudioFlag=!0):(a.params.audioFlag=1,a.isAudioFlag=!0,a.params.textarea=e.content),console.log(a.params.pickerVal)})}},o={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"page"},[t("div",{staticClass:"tools-bar"},[t("div",{staticClass:"left-wrap"},[t("back")],1),a._v(" "),t("div",{staticClass:"button-wrap"},[t("el-button",{attrs:{type:"primary",size:"small"},on:{click:a.release}},[a._v("直接发布")]),a._v(" "),t("el-button",{attrs:{type:"info",size:"small"},on:{click:a.timeRelease}},[a._v("定时发布")]),a._v(" "),t("el-button",{attrs:{type:"warning",size:"small"},on:{click:a.submit}},[a._v("草稿")])],1)]),a._v(" "),t("el-form",{ref:"form",attrs:{model:a.params,rules:a.rules,"label-width":"80px"}},[t("el-form-item",{attrs:{label:"专题",prop:"pickerVal"}},[t("picker",{attrs:{column:2},model:{value:a.params.pickerVal,callback:function(e){a.$set(a.params,"pickerVal",e)},expression:"params.pickerVal"}}),a._v(" "),t("el-col",{attrs:{span:4}},[t("el-form-item",{attrs:{"label-width":"20px"}},[[t("el-checkbox",{attrs:{"true-label":1,"false-label":0,disabled:a.isAudioFlag},model:{value:a.params.audioFlag,callback:function(e){a.$set(a.params,"audioFlag",e)},expression:"params.audioFlag"}},[a._v("音频")])]],2)],1)],1),a._v(" "),t("el-form-item",{attrs:{label:"标题",prop:"title"}},[t("el-col",{attrs:{span:12}},[t("el-input",{model:{value:a.params.title,callback:function(e){a.$set(a.params,"title",e)},expression:"params.title"}})],1),a._v(" "),t("el-col",{attrs:{span:4}},[t("el-form-item",{attrs:{"label-width":"20px"}},[[t("el-checkbox",{attrs:{"true-label":1,"false-label":0},model:{value:a.params.isHomePageShow,callback:function(e){a.$set(a.params,"isHomePageShow",e)},expression:"params.isHomePageShow"}},[a._v("首页显示")])]],2)],1)],1),a._v(" "),1===a.params.audioFlag?t("div",[t("el-form-item",{attrs:{label:"音频",prop:"audioPath"}},[t("upload",{attrs:{type:"audio",accept:"audio/*",path:"audio/article/"},model:{value:a.params.audioPath,callback:function(e){a.$set(a.params,"audioPath",e)},expression:"params.audioPath"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"音频描述",prop:"textarea"}},[t("el-col",{attrs:{span:12}},[t("el-input",{attrs:{placeholder:"请输入音频描述",type:"textarea",rows:6},model:{value:a.params.textarea,callback:function(e){a.$set(a.params,"textarea",e)},expression:"params.textarea"}})],1)],1)],1):a._e(),a._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:1!==a.params.audioFlag,expression:"params.audioFlag!==1"}]},[t("el-form-item",{attrs:{label:"封面",prop:a.params.audioFlag?"":"image"}},[t("upload",{attrs:{path:"image/article/"},model:{value:a.params.image,callback:function(e){a.$set(a.params,"image",e)},expression:"params.image"}})],1),a._v(" "),t("el-form-item",{attrs:{prop:a.params.audioFlag?"":"content"}},[t("el-col",{attrs:{span:18}},[t("Tinymce",{ref:"editor",attrs:{height:600},model:{value:a.params.content,callback:function(e){a.$set(a.params,"content",e)},expression:"params.content"}})],1)],1)],1)],1),a._v(" "),t("el-dialog",{attrs:{title:"定时发布",visible:a.timeDialog,width:"500px","close-on-click-modal":!1},on:{"update:visible":function(e){a.timeDialog=e}}},[t("el-form",{ref:"addForm",attrs:{model:a.addForm,"inline-message":"",rules:a.formRules,"label-suffix":":","label-width":"100"}},[t("el-form-item",{attrs:{label:"发布时间",prop:"publishTime"}},[t("el-col",{attrs:{span:12}},[t("el-date-picker",{staticClass:"full",attrs:{type:"datetime","picker-options":a.pickerOptions2,placeholder:"请选择发布时间"},model:{value:a.addForm.publishTime,callback:function(e){a.$set(a.addForm,"publishTime",e)},expression:"addForm.publishTime"}})],1)],1)],1),a._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:a.cancel}},[a._v("取消")]),a._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:a.save}},[a._v("确定")])],1)],1)],1)},staticRenderFns:[]};var m=t("VU/8")(r,o,!1,function(a){t("i0QM")},"data-v-9b0774fa",null);e.default=m.exports},i0QM:function(a,e){}});