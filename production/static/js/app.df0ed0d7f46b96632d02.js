webpackJsonp([15],{"0xDb":function(e,t,n){"use strict";var i={login:"/security/login",getProvinces:"/provinces/search/all",generate:"/membershipCard/generate",byCondition:"/membershipCardGenerateRecord/byCondition",getMembershipCards:"/membershipCard/byCondition",exportByRecordId:"/membershipCard/exportByRecordId",exportToken:"membershipCard/exportToken/generate",getFeedback:"feedback/getFeedback",uploadToken:"secret/token",productAll:"/product/queryAll",specialDelete:"/specialTopic/delete",specialSoldOut:"/specialTopic/soldOut",specialDetail:"specialTopic/queryById",specialHandle:"/specialTopic/saveAndUpdate",specialList:"specialTopic/querySpecialTopic",articleList:"/article/queryArticleByCondition",articleDetail:"/article/queryById",articleDelete:"/article/delete",articleSoldOut:"/article/soldOut",articleHandle:"article/addAndUpdate",topicList:"/gambit/queryByCondition",topicHandle:"/gambit/addAndUpdate",topicDelete:"/gambit/delete",topicSoldOut:"/gambit/soldOut",topicDetail:"/gambit/queryById",topicHot:"/gambit/setHot",topicDeleteVote:"gambit/deleteVote",gambitPublishDelay:"gambit/publishDelay",gambitPublishNow:"gambit/publishNow",articlePublishDelay:"article/publishDelay",articlePublishNow:"article/publishNow",getOrderList:"/order/getListByCondition",bannerList:"/banner/queryByCondition",bannerSave:"/banner/save",bannerPublishNow:"/banner/publishNow",bannerPublishDelay:"/banner/publishDelay",bannerSoldOut:"/banner/soldOut",bannerDelete:"banner/deleteByIds",bannerDetail:"/banner/getOne",bannerSend:"/send/sendTo",bannerSchedule:"/send/schedule",getProvinceIds:"/send/getProvinceIds",queryCommentByThemeInfoId:"comment/queryCommentByThemeInfoId",deleteCommentByCommentId:"comment/deleteCommentByCommentId"};function a(e){return("00"+e).substr(e.length)}var s=function(e,t){var n=new Date(e);/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(n.getFullYear()+"").substr(4-RegExp.$1.length)));var i={"M+":n.getMonth()+1,"d+":n.getDate(),"h+":n.getHours(),"m+":n.getMinutes(),"s+":n.getSeconds()};for(var s in i)if(new RegExp("("+s+")").test(t)){var r=i[s]+"";t=t.replace(RegExp.$1,1===RegExp.$1.length?r:a(r))}return t},r=n("+TD8"),o=n.n(r),l=function(e,t){return o.a.confirm(e,t,{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"})};n.d(t,"a",function(){return i}),n.d(t,"c",function(){return s}),n.d(t,"b",function(){return l}),console.log(l)},"5CO1":function(e,t){},"5aCZ":function(e,t,n){"use strict";var i=n("Xxa5"),a=n.n(i),s=n("exGp"),r=n.n(s),o=n("//Fk"),l=n.n(o),c=n("fZjL"),u=n.n(c),d={name:"editorSlideUpload",props:{color:{type:String,default:"#1890ff"}},data:function(){return{dialogVisible:!1,listObj:{},fileList:[]}},methods:{checkAllSuccess:function(){var e=this;return u()(this.listObj).every(function(t){return e.listObj[t].hasSuccess})},handleSubmit:function(){var e=this,t=u()(this.listObj).map(function(t){return e.listObj[t]});this.checkAllSuccess()?(console.log(t),this.$emit("successCBK",t),this.listObj={},this.fileList=[],this.dialogVisible=!1):this.$message("请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！")},handleSuccess:function(e,t){for(var n=t.uid,i=u()(this.listObj),a=0,s=i.length;a<s;a++)if(this.listObj[i[a]].uid===n)return this.listObj[i[a]].url=e.files.file,void(this.listObj[i[a]].hasSuccess=!0)},handleRemove:function(e){for(var t=e.uid,n=u()(this.listObj),i=0,a=n.length;i<a;i++)if(this.listObj[n[i]].uid===t)return void delete this.listObj[n[i]]},beforeUpload:function(e){var t=this,n=window.URL||window.webkitURL,i=e.uid;return this.listObj[i]={},new l.a(function(a,s){var r=new Image;r.src=n.createObjectURL(e),r.onload=function(){t.listObj[i]={hasSuccess:!1,uid:e.uid,width:this.width,height:this.height}},a(!0)})}}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"upload-container"},[n("el-button",{style:{background:e.color,borderColor:e.color},attrs:{icon:"el-icon-upload",size:"mini",type:"primary"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("上传图片\n  ")]),e._v(" "),n("el-dialog",{attrs:{"append-to-body":"",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[n("el-upload",{staticClass:"editor-slide-upload",attrs:{action:"https://httpbin.org/post",multiple:!0,"file-list":e.fileList,"show-file-list":!0,"list-type":"picture-card","on-remove":e.handleRemove,"on-success":e.handleSuccess,"before-upload":e.beforeUpload}},[n("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1),e._v(" "),n("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("确 定")])],1)],1)},staticRenderFns:[]};var h=n("VU/8")(d,p,!1,function(e){n("CuCD")},"data-v-550bf360",null).exports,m=["advlist anchor autolink autosave code codesample colorpicker  contextmenu directionality emoticons fullscreen hr image imagetools  insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"],f=["styleselect undo redo  fontsizeselect forecolor backcolor bold italic underline strikethrough alignleft aligncenter alignright alignjustify outdent indent  blockquote  removeformat code","subscript superscript  codesample hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons "],g=n("0xDb"),b=n("lbHh"),v=n.n(b),y=new(n("VDWi").a),_={name:"tinymce",components:{editorImage:h},props:{id:{type:String},value:{type:String,default:""},toolbar:{type:Array,required:!1,default:function(){return[]}},imgOptions:{type:Object,default:function(){return{size:1,quality:.9,maxWidth:1920,resize:!0}}},menubar:{default:"file edit insert view format table"},height:{type:Number,required:!1,default:360},CDN:{type:String,default:"http://fdomsimage.oss-cn-huhehaote.aliyuncs.com/"},path:{type:String,default:"image/editor/"}},data:function(){return{hasChange:!1,hasInit:!1,tinymceId:this.id||"vue-tinymce-"+ +new Date,fullscreen:!1}},watch:{value:function(e){var t=this;!this.hasChange&&this.hasInit&&this.$nextTick(function(){return window.tinymce.get(t.tinymceId).setContent(e||"")})}},mounted:function(){this.initTinymce()},activated:function(){this.initTinymce()},deactivated:function(){this.destroyTinymce()},methods:{initTinymce:function(){var e=this,t=this;window.tinymce.init({selector:"#"+this.tinymceId,height:this.height,body_class:"panel-body ",object_resizing:!1,toolbar:this.toolbar.length>0?this.toolbar:f,menubar:this.menubar,plugins:m,branding:!1,style_formats:[{title:"标题",items:[{title:"h1标签(22px)",block:"h1"},{title:"h2标签(20px)",block:"h2"},{title:"h3标签(18px)",block:"h3"},{title:"h4标签(16px)",block:"h4"},{title:"h5标签(15px)",block:"h5"},{title:"h6标签(14px)",block:"h6"}]},{title:"字间距",items:[{title:"1px",inline:"span",styles:{"letter-spacing":"1px"}},{title:"2px",inline:"span",styles:{"letter-spacing":"2px"}},{title:"3px",inline:"span",styles:{"letter-spacing":"3px"}}]},{title:"取消加粗",inline:"span",styles:{"font-weight":"normal"}},{title:"正文",block:"p"}],fontsize_formats:"12px 14px 15px 16px 18px 20px 22px 24px 28px",end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,advlist_bullet_styles:"square",advlist_number_styles:"default",imagetools_cors_hosts:["www.tinymce.com","codepen.io"],default_link_target:"_blank",link_title:!1,language:"zh_CN",nonbreaking_force_tab:!0,init_instance_callback:function(n){t.value&&n.setContent(t.value),t.hasInit=!0,n.on("NodeChange Change KeyUp SetContent",function(){e.hasChange=!0,e.$emit("input",n.getContent())})},setup:function(e){e.on("FullscreenStateChanged",function(e){t.fullscreen=e.state})},images_dataimg_filter:function(e){return setTimeout(function(){},0),e},images_upload_handler:function(e,n,i){var s=this;return r()(a.a.mark(function r(){var o,l,c,u,d;return a.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return o=void 0,l=v.a.getJSON("user").uploadConfig,c=t.path,u=new OSS({accessKeyId:l.accessKeyId,accessKeySecret:l.accessKeySecret,bucket:l.bucketName,endpoint:l.endpoint}),a.prev=4,e.blob().size/1048576<=.8&&(t.imgOptions.quality=1,t.imgOptions.maxWidth=1/0),a.next=9,y.compress(e.blob(),t.imgOptions);case 9:return d=a.sent,a.next=12,u.multipartUpload(c+Object(g.c)(new Date,"yyyyMMddhhmmss"),d);case 12:o=a.sent,a.next=18;break;case 15:a.prev=15,a.t0=a.catch(4),console.log(a.t0);case 18:200===o.res.statusCode?n(t.CDN+o.name):i("上传失败");case 19:case"end":return a.stop()}},r,s,[[4,15]])}))()}})},destroyTinymce:function(){window.tinymce.get(this.tinymceId)&&window.tinymce.get(this.tinymceId).destroy()},setContent:function(e){window.tinymce.get(this.tinymceId).setContent(e)},getContent:function(){window.tinymce.get(this.tinymceId).getContent()},imageSuccessCBK:function(e){var t=this;e.forEach(function(e){window.tinymce.get(t.tinymceId).insertContent('<img class="wscnph" src="'+e.url+'" >')})}},destroyed:function(){this.destroyTinymce()},created:function(){}},k={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tinymce-container editor-container",class:{fullscreen:this.fullscreen}},[t("textarea",{staticClass:"tinymce-textarea",attrs:{id:this.tinymceId}})])},staticRenderFns:[]};var C=n("VU/8")(_,k,!1,function(e){n("TDQI")},"data-v-0a1c9c13",null);t.a=C.exports},"5iEN":function(e,t){},CuCD:function(e,t){},DQqc:function(e,t){},FPJh:function(e,t){},MXkr:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={};n.d(i,"breadData",function(){return _});n("tvR6");var a=n("qBF2"),s=n.n(a),r=n("7+uW"),o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]},l=n("VU/8")({name:"App"},o,!1,null,null,null).exports,c=n("/ocq"),u=n("lbHh"),d=n.n(u),p={data:function(){return{defaultOpeneds:["1"],isCollapse:!1,title:"",listData:[]}},computed:{userName:function(){return d.a.get("user")?JSON.parse(d.a.get("user")).userName:""},activeIndex:function(){var e=this.$route.params.id;return"number"==typeof e&&(e=e.toString()),e},breadData:function(){return this.$store.state.breadData}},methods:{signOut:function(){d.a.remove("user"),this.$router.replace({name:"login"})}},created:function(){}},h={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",{staticClass:"container"},[n("el-header",{staticClass:"el-header"},[n("div",{staticClass:"logo"},[e._v("JunYang Admin")]),e._v(" "),n("div",{staticClass:"bar"},[n("div",{staticClass:"breadcrumb-wrap"},[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",[e._v("首页")])],1)],1),e._v(" "),n("el-dropdown",[n("span",{staticClass:"el-dropdown-link"},[e._v("\n          "+e._s(e.userName)+"\n          "),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown","split-button":""},slot:"dropdown"},[n("el-dropdown-item",{nativeOn:{click:function(t){return e.signOut(t)}}},[e._v("退出登录")])],1)],1)],1)]),e._v(" "),n("el-container",{staticClass:"main-container"},[n("el-aside",{staticClass:"aside"},[n("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"0",collapse:e.isCollapse,"default-openeds":e.defaultOpeneds,router:""}},[n("el-menu-item",{attrs:{index:"0",route:{name:"index"}}},[n("i",{staticClass:"el-icon-tickets"}),e._v(" "),n("span",{attrs:{slot:"title"},slot:"title"},[e._v("首页")])]),e._v(" "),n("el-submenu",{attrs:{index:"1"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-menu"}),e._v(" "),n("span",[e._v("内容管理")])]),e._v(" "),n("el-menu-item",{attrs:{index:"1-1",route:{name:"special-list"}}},[e._v("专题")]),e._v(" "),n("el-menu-item",{attrs:{index:"1-2",route:{name:"article-list"}}},[e._v("文章")]),e._v(" "),n("el-menu-item",{attrs:{index:"1-3",route:{name:"topic-list"}}},[e._v("话题")])],2),e._v(" "),n("el-submenu",{attrs:{index:"2"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-menu"}),e._v(" "),n("span",[e._v("志愿卡管理")])]),e._v(" "),n("el-menu-item",{attrs:{index:"2-1",route:{name:"volunteer-list"}}},[e._v("开卡管理")]),e._v(" "),n("el-menu-item",{attrs:{index:"2-2",route:{name:"volunteer-use"}}},[e._v("使用管理")])],2),e._v(" "),n("el-submenu",{attrs:{index:"3"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-menu"}),e._v(" "),n("span",[e._v("个人中心")])]),e._v(" "),n("el-menu-item",{attrs:{index:"3-1",route:{name:"feedback-list"}}},[e._v("反馈")])],2),e._v(" "),n("el-submenu",{attrs:{index:"4"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-menu"}),e._v(" "),n("span",[e._v("交易管理")])]),e._v(" "),n("el-menu-item",{attrs:{index:"4-1",route:{name:"order-list"}}},[e._v("订单管理")])],2),e._v(" "),n("el-submenu",{attrs:{index:"5"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-menu"}),e._v(" "),n("span",[e._v("banner图管理")])]),e._v(" "),n("el-menu-item",{attrs:{index:"5-1",route:{name:"banner-list"}}},[e._v("banner图")])],2)],1)],1),e._v(" "),n("el-main",{staticClass:"main"},[n("router-view")],1)],1)],1)},staticRenderFns:[]};var m=n("VU/8")(p,h,!1,function(e){n("FPJh")},"data-v-40188579",null).exports,f={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page"},[n("div",{staticClass:"box-wrap"},[n("router-link",{staticClass:"ceil",attrs:{to:{name:"special-list"},tag:"a"}},[e._v("\n      专题\n    ")]),e._v(" "),n("router-link",{staticClass:"ceil",attrs:{to:{name:"article-list"},tag:"a"}},[e._v("\n      文章\n    ")]),e._v(" "),n("router-link",{staticClass:"ceil",attrs:{to:{name:"topic-list"},tag:"a"}},[e._v("\n      话题\n    ")]),e._v(" "),n("router-link",{staticClass:"ceil",attrs:{to:{name:"volunteer-list"},tag:"a"}},[e._v("\n      开卡管理\n    ")]),e._v(" "),n("router-link",{staticClass:"ceil",attrs:{to:{name:"volunteer-use"},tag:"a"}},[e._v("\n      志愿卡使用管理\n    ")]),e._v(" "),n("router-link",{staticClass:"ceil",attrs:{to:{name:"feedback-list"},tag:"a"}},[e._v("\n      反馈\n    ")]),e._v(" "),n("router-link",{staticClass:"ceil",attrs:{to:{name:"order-list"},tag:"a"}},[e._v("\n      订单\n    ")]),e._v(" "),n("router-link",{staticClass:"ceil",attrs:{to:{name:"banner-list"},tag:"a"}},[e._v("\n      banner图\n    ")])],1)])},staticRenderFns:[]};var g=n("VU/8")(null,f,!1,function(e){n("5CO1")},"data-v-410f3e81",null).exports;r.default.use(c.a);var b=new c.a({routes:[{path:"/",redirect:"/login"},{path:"/login",name:"login",component:function(){return n.e(8).then(n.bind(null,"Luci"))}},{path:"/view",component:m,redirect:{name:"index"},meta:{requireAuth:!0},children:[{path:"/index",name:"index",component:g,meta:{requireAuth:!0}},{path:"/special-list",name:"special-list",component:function(){return n.e(4).then(n.bind(null,"f6g5"))},meta:{requireAuth:!0}},{path:"/special/:type",name:"special",component:function(){return n.e(5).then(n.bind(null,"q5hk"))},meta:{requireAuth:!0}},{path:"/article-list",name:"article-list",component:function(){return n.e(7).then(n.bind(null,"eutC"))},meta:{requireAuth:!0}},{path:"/article/:type",name:"article",component:function(){return n.e(3).then(n.bind(null,"L0Lu"))},meta:{requireAuth:!0}},{path:"/topic-list",name:"topic-list",component:function(){return n.e(6).then(n.bind(null,"oQVo"))},meta:{requireAuth:!0}},{path:"/topic/:type",name:"topic",component:function(){return n.e(0).then(n.bind(null,"szU1"))},meta:{requireAuth:!0}},{path:"/volunteer-list",name:"volunteer-list",component:function(){return n.e(1).then(n.bind(null,"YavN"))},meta:{requireAuth:!0}},{path:"/volunteer-use",name:"volunteer-use",component:function(){return n.e(9).then(n.bind(null,"UYop"))},meta:{requireAuth:!0}},{path:"/feedback-list",name:"feedback-list",component:function(){return n.e(2).then(n.bind(null,"aYew"))},meta:{requireAuth:!0}},{path:"/order-list",name:"order-list",component:function(){return n.e(10).then(n.bind(null,"rnrB"))},meta:{requireAuth:!0}},{path:"/banner-list",name:"banner-list",component:function(){return n.e(13).then(n.bind(null,"f5jv"))},meta:{requireAuth:!0}},{path:"/banner/:type",name:"banner",component:function(){return n.e(12).then(n.bind(null,"IGic"))},meta:{requireAuth:!0}},{path:"/comment",name:"comment",component:function(){return n.e(11).then(n.bind(null,"CWjC"))},meta:{requireAuth:!0}}]}]}),v=(n("j1ja"),n("5iEN"),n("MXkr"),n("bGai")),y=n("NYxO"),_=function(e){return e.breadData};r.default.use(y.a);var k=new y.a.Store({state:{breadData:[]},getters:i,actions:{},mutations:{SET_BREAD_DATA:function(e,t){e.breadData=t}},strict:!1}),C=n("2X9z"),x=n.n(C),w=n("4DoD");w.interceptors.request.use(function(e,t){var n=(d.a.getJSON("user")?d.a.getJSON("user"):"").token;n&&(e.headers.Authorization="Bearer "+n);var i=e.body;for(var a in i)null!==i[a]&&void 0!==i[a]||delete i[a];return e}),w.interceptors.response.use(function(e){return e.data},function(e){var t=e.response?e.response.data:{err:"网络请求错误",code:"-1000"};return e.response||(b.replace({name:"login"}),x()({message:"接口调用失败",type:"error"})),t}),console.log("production"),w.config.baseURL="http://omsapi.junyanginfo.com",w.config.timeout=15e3;var D=w,O=n("NETs"),S=n.n(O),I=n("0xDb"),$={filters:{dateTime:function(e,t){if(e)return Object(I.c)(new Date(e),t)},publicStatus:function(e,t){var n=void 0;switch(e){case 1:n="已发布",t&&(n="success");break;case 2:n="草稿",t&&(n="info");break;case 3:n="已下架",t&&(n="warning");break;case 4:n="待发布",t&&(n="warning")}return n}}};r.default.config.productionTip=!1,r.default.prototype.$fly=D;r.default.use(S.a,{name:"lodash"}),r.default.use(s.a),r.default.component("back",v.a),r.default.mixin($),r.default.mixin({methods:{toState:function(e){this.$router.push(e)},goBack:function(e){this.$router.go(e||-1)}}}),b.beforeEach(function(e,t,n){var i=(d.a.getJSON("user")?d.a.getJSON("user"):"").token;e.meta.requireAuth&&!i?n({name:"login"}):n()}),new r.default({el:"#app",router:b,store:k,components:{App:l},template:"<App/>"})},TDQI:function(e,t){},bGai:function(e,t,n){"use strict";var i=n("Xxa5"),a=n.n(i),s=n("exGp"),r=n.n(s),o=n("0xDb"),l=n("VDWi"),c=n("lbHh"),u=n.n(c),d=new l.a,p={data:function(){return{uploadUrl:"",loading:!1,dialogVisible:!1}},props:{value:{type:String,defaul:""},type:{type:String,default:"image"},imgOptions:{type:Object,default:function(){return{size:1,quality:.9,maxWidth:1920,maxHeight:1080,resize:!0}}},CDN:{type:String,default:"http://fdomsimage.oss-cn-huhehaote.aliyuncs.com/"},path:{type:String,default:"image/specialtopic/"},accept:{type:String,default:"image/*"}},computed:{imageUrl:function(){return this.value}},methods:{preview:function(){this.dialogVisible=!0},upload:function(e){var t=this;return r()(a.a.mark(function n(){var i,s,l,c,p;return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(i=void 0,s=t.path,l=u.a.getJSON("user").uploadConfig,c=new OSS({accessKeyId:l.accessKeyId,accessKeySecret:l.accessKeySecret,bucket:l.bucketName,endpoint:l.endpoint}),t.loading=!0,console.log(e.file),"image"!==t.type){n.next=24;break}return n.prev=7,e.file.size/1048576<=.8&&(t.imgOptions.quality=1,t.imgOptions.maxWidth=1/0,t.imgOptions.maxHeight=1/0),n.next=12,d.compress(e.file,t.imgOptions);case 12:return p=n.sent,console.log(p),n.next=16,c.multipartUpload(s+Object(o.c)(new Date,"yyyyMMddhhmmss"),p,{progress:function(){var t=r()(a.a.mark(function t(n){var i;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:(i={}).percent=100*n,e.onProgress(i);case 3:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()});case 16:i=n.sent,n.next=22;break;case 19:n.prev=19,n.t0=n.catch(7),console.log(n.t0);case 22:n.next=27;break;case 24:return n.next=26,c.multipartUpload(s+Object(o.c)(new Date,"yyyyMMddhhmmss"),e.file,{progress:function(){var t=r()(a.a.mark(function t(n){var i;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:(i={}).percent=100*n,e.onProgress(i);case 3:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()});case 26:i=n.sent;case 27:if(200!==i.res.statusCode){n.next=32;break}return e.onSuccess(i),n.abrupt("return",i);case 32:e.onError("上传失败");case 33:case"end":return n.stop()}},n,t,[[7,19]])}))()},handleAvatarSuccess:function(e,t){this.loading=!1;var n=this.CDN+e.name;console.log(n),this.$emit("input",n)}}},h={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"upload"},[n("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"avatar-uploader",attrs:{accept:e.accept,action:e.uploadUrl,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"http-request":e.upload,"element-loading-text":"正在上传","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"}},[e.imageUrl?n("div",{staticClass:"uploaded-wrap"},["image"==e.type?n("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):e._e(),e._v(" "),"audio"==e.type?n("span",{staticClass:"el-icon-service"}):e._e(),e._v(" "),n("div",{staticClass:"btn-wrap"},[n("el-button",{attrs:{icon:"el-icon-zoom-in",size:"mini",circle:""},on:{click:function(t){return t.stopPropagation(),e.preview(t)}}})],1)]):n("i",{staticClass:"el-icon-upload avatar-uploader-icon"})]),e._v(" "),n("el-dialog",{attrs:{visible:e.dialogVisible,title:"预览"},on:{"update:visible":function(t){e.dialogVisible=t}}},["image"==e.type?n("img",{attrs:{width:"100%",src:e.imageUrl,alt:""}}):e._e(),e._v(" "),"audio"==e.type?n("audio",{attrs:{src:e.imageUrl,controls:""}}):e._e()])],1)},staticRenderFns:[]};var m=n("VU/8")(p,h,!1,function(e){n("xDcr")},"data-v-77c1dd1e",null).exports,f={render:function(){var e=this.$createElement;return(this._self._c||e)("el-button",{attrs:{type:"primary",icon:"el-icon-arrow-left",size:"small",circle:""},on:{click:this.back}})},staticRenderFns:[]},g=n("VU/8")({methods:{back:function(){this.$router.go(-1)}}},f,!1,null,null,null).exports,b=n("5aCZ"),v={data:function(){return{firstData:[],secondData:[],pickerVal:[]}},props:{value:{type:Array,default:function(){return[]}},span:{type:Number,default:6},size:{type:String,default:""},column:{type:Number,default:1}},watch:{value:{handler:function(e,t){var n=this;this.pickerVal=e,e.length&&this.column>1&&this.$fly.get(o.a.productAll).then(function(e){n.firstData=e,n.lodash.isUndefined(n.pickerVal[0])||n.firstChange(n.pickerVal[0],!0)})},immediate:!0}},methods:{firstChange:function(e,t){var n=this.lodash.findIndex(this.firstData,function(t){return t.id===e});this.secondData=this.firstData[n].specialTopics,t||this.pickerVal.splice(1,2),this.$emit("input",this.pickerVal)},secondChange:function(e,t){this.$emit("input",this.pickerVal)}},created:function(){var e=this;this.$fly.get(o.a.productAll).then(function(t){e.firstData=t,console.log(t),e.lodash.isUndefined(e.pickerVal[0])||e.firstChange(e.pickerVal[0],!0)})}},y={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"picker-wrap"},[n("el-col",{attrs:{span:e.span}},[n("el-select",{staticClass:"full",attrs:{placeholder:"请选择产品",size:e.size},on:{change:e.firstChange},model:{value:e.pickerVal[0],callback:function(t){e.$set(e.pickerVal,0,t)},expression:"pickerVal[0]"}},e._l(e.firstData,function(e,t){return n("el-option",{key:t,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),2===e.column?n("el-col",{attrs:{span:e.span}},[n("el-select",{staticClass:"full",attrs:{placeholder:"请选择专题",size:e.size},on:{change:e.secondChange},model:{value:e.pickerVal[1],callback:function(t){e.$set(e.pickerVal,1,t)},expression:"pickerVal[1]"}},e._l(e.secondData,function(e,t){return n("el-option",{key:t,attrs:{label:e.title,value:e.id}})}))],1):e._e()],1)},staticRenderFns:[]};var _=n("VU/8")(v,y,!1,function(e){n("DQqc")},"data-v-2403cf5e",null).exports,k={data:function(){return{checkIds:[]}},props:{showHot:{type:Boolean,default:!1},checkData:{type:Array,default:function(){return[]}},showSoldout:{type:Boolean,default:!0}},methods:{handleFn:function(e){var t=this,n=this.$route.name.split("-")[0];if(console.log(n),"add"===e)this.toState({name:n,params:{type:"add"}});else{var i=void 0,a=void 0;"delete"===e?(i=o.a[n+"Delete"],a="删除"):"soldOut"===e?(i=o.a[n+"SoldOut"],a="下架"):"hot"===e&&(i=o.a[n+"Hot"],a="设为热门"),Object(o.b)("您确定将选择的内容"+a+"吗？","提示").then(function(){t.checkIds=[];for(var e=0;e<t.checkData.length;e++)if("下架"===a){if(2===t.checkData[e].status||3===t.checkData[e].status)return t.$message.error("已下架或草稿状态的内容不能"+a),void(t.checkIds=[]);t.checkIds.push(t.checkData[e].id)}else if("删除"===a){if(1===t.checkData[e].status)return t.$message.error("已发布的内容不能"+a),void(t.checkIds=[]);t.checkIds.push(t.checkData[e].id)}else t.checkIds.push(t.checkData[e].id);console.log(t.checkIds),t.checkIds.length>0&&t.$fly.post(i,t.checkIds).then(function(e){t.$message({message:a+"成功",duration:2e3,type:"success"}),t.$emit("refresh")}).catch(function(){t.$message({message:a+"失败",duration:2e3,type:"error"})})})}}},beforeMount:function(){}},C={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"button-wrap"},[e.showHot?n("el-button",{attrs:{type:"danger",size:"small",disabled:e.checkData.length<1},on:{click:function(t){t.stopPropagation(),e.handleFn("hot")}}},[e._v("设为热门")]):e._e(),e._v(" "),n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){t.stopPropagation(),e.handleFn("add")}}},[e._v("新增")]),e._v(" "),e.showSoldout?n("el-button",{attrs:{type:"warning",size:"small",disabled:e.checkData.length<1},on:{click:function(t){t.stopPropagation(),e.handleFn("soldOut")}}},[e._v("下架")]):e._e(),e._v(" "),n("el-button",{attrs:{type:"danger",size:"small",disabled:e.checkData.length<1},on:{click:function(t){t.stopPropagation(),e.handleFn("delete")}}},[e._v("删除")])],1)},staticRenderFns:[]};var x=n("VU/8")(k,C,!1,function(e){n("gQMX")},null,null).exports,w={data:function(){return{pageSizes:[10,50,100,200,500],size:10}},props:{pageInfo:{type:Object,default:function(){return{}}}},methods:{sizeChange:function(e){this.$emit("sizeChange",e)},currentChange:function(e){this.$emit("currentChange",e)},preClick:function(e){this.$emit("preClick",e)},nextClick:function(e){this.$emit("nextClick",e)}}},D={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"page-wrap padding"},[t("el-pagination",{attrs:{background:"",layout:"total,sizes, prev, pager, next, jumper",total:this.pageInfo.totalElements,"current-page":this.pageInfo.currentPage,"page-sizes":this.pageSizes,"page-size":this.size},on:{"current-change":this.currentChange,"size-change":this.sizeChange}})],1)},staticRenderFns:[]},O=n("VU/8")(w,D,!1,null,null,null).exports;n.d(t,"e",function(){return m}),n.d(t,"a",function(){return g}),n.d(t,!1,function(){return b.a}),n.d(t,"d",function(){return _}),n.d(t,"b",function(){return x}),n.d(t,"c",function(){return O})},gQMX:function(e,t){},tvR6:function(e,t){},xDcr:function(e,t){}},["NHnr"]);