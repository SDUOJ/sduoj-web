(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-21eb5522"],{"058b":function(t,e,r){"use strict";var a=r("44d1"),o=r.n(a);o.a},1010:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[r("Row",[r("Col",{attrs:{span:"16"}},[r("div",{staticStyle:{"margin-right":"30px"}},[r("UserProfile"),r("UserPassword",{staticStyle:{margin:"20px 0"}})],1)]),r("Col",{attrs:{span:"8"}},[r("Card",{staticClass:"profile clearfix",attrs:{padding:20,"dis-hover":""}},[r("div",{staticClass:"avatar-box"},[r("img",{attrs:{src:t.avatar}})]),r("div",{staticStyle:{"text-align":"center"}},[r("span",{staticStyle:{color:"#aaa"}},[t._v("We use "),r("a",{attrs:{href:"https://cravatar.cn/",target:"_blank"}},[t._v("Gravatar")]),t._v(" to present your avatar icon")])])])],1)],1),r("Reconfirm",{ref:"reconfirm",attrs:{message:"Are you sure to unbind this third party certification?","confirm-text":t.confirmText,"button-text":"I confirm to unbind"},on:{"update:confirmText":function(e){t.confirmText=e},"update:confirm-text":function(e){t.confirmText=e}}})],1)},o=[],n=(r("d3b7"),r("5530")),s=r("2f62"),i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Card",{attrs:{title:"Your Profile",padding:0,"dis-hover":""}},[r("div",{staticClass:"form"},[r("Form",{ref:"profileForm",attrs:{model:t.profileForm,rules:t.profileRules,"label-position":"right"}},[r("Row",[r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"Username"}},[r("span",[t._v(t._s(t.profile.username))])]),r("FormItem",{attrs:{label:"Nickname"}},[r("Input",{staticStyle:{width:"280px"},attrs:{type:"text"},model:{value:t.profileForm.nickname,callback:function(e){t.$set(t.profileForm,"nickname",e)},expression:"profileForm.nickname"}})],1),r("FormItem",{attrs:{label:"Student ID"}},[r("Input",{staticStyle:{width:"280px"},attrs:{type:"text"},model:{value:t.profileForm.studentId,callback:function(e){t.$set(t.profileForm,"studentId",e)},expression:"profileForm.studentId"}})],1),r("FormItem",[r("Button",{attrs:{loading:t.btnLoading},on:{click:t.handleProfileUpdate}},[t._v("Update")])],1)],1),r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"Gender"}},[r("RadioGroup",{attrs:{border:""},model:{value:t.profileForm.gender,callback:function(e){t.$set(t.profileForm,"gender",e)},expression:"profileForm.gender"}},[r("Radio",{attrs:{label:"2"}},[r("Icon",{attrs:{type:"md-help"}})],1),r("Radio",{attrs:{label:"1"}},[r("Icon",{attrs:{type:"md-male"}})],1),r("Radio",{attrs:{label:"0"}},[r("Icon",{attrs:{type:"md-female"}})],1)],1)],1),r("FormItem",{attrs:{label:"Phone"}},[r("Input",{staticStyle:{width:"280px"},attrs:{type:"text"},model:{value:t.profileForm.phone,callback:function(e){t.$set(t.profileForm,"phone",e)},expression:"profileForm.phone"}})],1),r("FormItem",{attrs:{label:"Email"}},[r("span",{domProps:{textContent:t._s(t.profile.email)}})]),r("FormItem",{attrs:{label:"Roles"}},t._l(t.profile.roles,(function(e){return r("span",{key:e,staticClass:"roles"},[r("Tag",{attrs:{color:t.USER_ROLE[e].color}},[t._v(t._s(e))])],1)})),0)],1)],1)],1)],1)])},c=[],l=(r("25f0"),r("7c15")),d=r("c9d9"),u={data:function(){return{profileForm:{nickname:"",studentId:"",gender:"",phone:"",password:""},profileRules:{password:[{required:!0,trigger:"blur",min:6,max:32}]},btnLoading:!1}},methods:{handleProfileUpdate:function(){var t=this;this.$refs.profileForm.validate((function(e){e&&(t.btnLoading=!0,l["a"].updateProfile(t.profileForm).then((function(e){l["a"].getProfile(),t.$Message.success("Profile Updated")})).catch((function(e){t.$Message.error(e.message)})).finally((function(){t.btnLoading=!1})))}))}},computed:Object(n["a"])(Object(n["a"])(Object(n["a"])({},Object(s["d"])("user",["profile"])),Object(s["c"])("user",["username"])),{},{USER_ROLE:function(){return d["j"]}}),mounted:function(){var t=this;l["a"].getProfile((function(e){t.profileForm=Object.assign({},e),t.profileForm.gender=t.profileForm.gender.toString()}))}},f=u,p=(r("d978"),r("2877")),m=Object(p["a"])(f,i,c,!1,null,"9c8371a8",null),w=m.exports,h=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Card",{attrs:{title:"Change Your Password",padding:0,"dis-hover":""}},[r("div",{staticClass:"form"},[r("Form",{ref:"passwordForm",attrs:{model:t.passwordForm,rules:t.passwordRules,"label-position":"top"}},[r("Row",[r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"Old Password",prop:"oldPassword"}},[r("Input",{staticStyle:{width:"280px"},attrs:{type:"password"},model:{value:t.passwordForm.oldPassword,callback:function(e){t.$set(t.passwordForm,"oldPassword",e)},expression:"passwordForm.oldPassword"}})],1),r("FormItem",[r("Button",{attrs:{loading:t.btnLoading},on:{click:function(e){return t.handlePasswordUpdate("passwordForm")}}},[t._v("Update")])],1)],1),r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"New Password",prop:"newPassword"}},[r("Input",{staticStyle:{width:"280px"},attrs:{type:"password"},model:{value:t.passwordForm.newPassword,callback:function(e){t.$set(t.passwordForm,"newPassword",e)},expression:"passwordForm.newPassword"}})],1),r("FormItem",{attrs:{label:"Confirm New Password",prop:"confirmNewPassword"}},[r("Input",{staticStyle:{width:"280px"},attrs:{type:"password"},model:{value:t.passwordForm.confirmNewPassword,callback:function(e){t.$set(t.passwordForm,"confirmNewPassword",e)},expression:"passwordForm.confirmNewPassword"}})],1)],1)],1)],1)],1)])},b=[],g={data:function(){var t=this,e=function(e,r,a){""!==r&&t.$refs.passwordForm.validateField("confirmNewPassword"),a()},r=function(e,r,a){r!==t.passwordForm.newPassword&&a(new Error("Password does not match")),a()};return{passwordForm:{oldPassword:"",newPassword:"",confirmNewPassword:""},passwordRules:{oldPassword:[{required:!0,trigger:"blur",min:6,max:32}],newPassword:[{required:!0,trigger:"blur",min:6,max:32},{validator:e,trigger:"blur"}],confirmNewPassword:[{required:!0,validator:r,trigger:"change"}]},btnLoading:!1}},methods:{handlePasswordUpdate:function(t){var e=this;this.$refs[t].validate((function(r){if(r){var a={password:e.passwordForm.oldPassword,newPassword:e.passwordForm.newPassword};e.btnLoading=!0,l["a"].updateProfile(a).then((function(t){e.$Message.success("Updated")})).catch((function(t){e.$Message.error(t.message)})).finally((function(){e.btnLoading=!1,e.$refs[t].resetFields()}))}}))}}},v=g,P=(r("7dde"),Object(p["a"])(v,h,b,!1,null,"5efa0aee",null)),F=P.exports,y=r("7b4f"),x=r("3abf"),S={components:{UserProfile:w,UserPassword:F,Reconfirm:y["a"]},inject:["reload"],data:function(){return{thirdPartyStatus:{},confirmText:""}},computed:Object(n["a"])(Object(n["a"])(Object(n["a"])({},Object(s["d"])("user",["profile"])),Object(s["c"])("user",["avatar","isVerified"])),{},{THIRD_PARTY_CAS:function(){return x["a"]},THIRD_PARTY_ENUM:function(){return x["b"]}}),methods:{handleUnbind:function(t){var e=this;this.confirmText=x["a"][t].getId(this.profile),this.$refs.reconfirm.reconfirm((function(){e.thirdPartyStatus[t]=!0,l["a"].thirdPartyUnbinding({thirdParty:t}).then((function(t){e.$Message.success("Success"),e.reload()})).catch((function(t){e.$Message.error(t.message)})).finally((function(){e.thirdPartyStatus[t]=!1}))}))}},mounted:function(){for(var t in x["b"])this.$set(this.thirdPartyStatus,t,!1)}},I=S,_=(r("058b"),Object(p["a"])(I,a,o,!1,null,"3b635ae5",null));e["default"]=_.exports},1099:function(t,e,r){},"10c7":function(t,e,r){"use strict";var a=r("1099"),o=r.n(a);o.a},13678:function(t,e,r){},"3abf":function(t,e,r){"use strict";r.d(e,"b",(function(){return s})),r.d(e,"a",(function(){return i}));r("99af"),r("d3b7");var a=r("ade3"),o=r("7c15"),n="/thirdPartyLogin?thirdParty=",s={SDUCAS:"SDUCAS"},i=Object(a["a"])({},s.SDUCAS,{name:"SDUCAS",description:"Shandong University Central Authentication Service",targetUrl:function(t){var e="https://pass.sdu.edu.cn/cas/login?service=".concat(location.origin).concat(n).concat(s.SDUCAS);for(var r in t)e+="&".concat(r,"=").concat(t[r]);return e},certificate:function(t){return new Promise((function(e,r){o["a"].thirdPartyLogin(t).then((function(t){e(t)})).catch(r)}))},render:function(t,e){var r="".concat(e.sduRealName,"(").concat(e.sduId,") has passed SDU CAS certification"),a="Please complete the following information",o=t("div",{class:{center:!0},style:{color:"#000000A6"}},r),n=t("div",{class:{center:!0},style:{color:"#000000A6"}},a);return t("div",[o,n])},getId:function(t){return t.sduId}})},"44d1":function(t,e,r){},"7b4f":function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Modal",{attrs:{title:t.title,witdh:"446px",transfer:""},model:{value:t.modalFlag,callback:function(e){t.modalFlag=e},expression:"modalFlag"}},[r("div",{staticClass:"warnDiv"},[r("div",{domProps:{innerHTML:t._s(t.message)}})]),r("div",{staticClass:"confirmText",staticStyle:{"margin-top":"36px"}},[r("div",[r("span",[t._v("Please type ")]),r("strong",[t._v(t._s(t.confirmText))]),r("span",[t._v(" to confirm.")])]),r("Input",{staticStyle:{width:"100%"},on:{"on-change":t.checkTypein},model:{value:t.typein,callback:function(e){t.typein=e},expression:"typein"}})],1),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("Button",{staticClass:"confirmButton",attrs:{long:"",type:"error",disabled:!t.checked},on:{click:t.callback}},[t._v(t._s(t.buttonText))])],1)])},o=[],n=function(){},s={name:"Reconfirm",props:{title:{type:String,default:"Reconfirm"},message:{type:String,default:""},confirmText:{type:String,default:""},buttonText:{type:String,default:"Confirm"}},data:function(){return{modalFlag:!1,typein:"",checked:!1,callback:n}},methods:{reconfirm:function(t){this.callback=t,this.typein="",this.modalFlag=!0},checkTypein:function(){this.checked=this.typein===this.confirmText}}},i=s,c=(r("10c7"),r("2877")),l=Object(c["a"])(i,a,o,!1,null,"c3322122",null);e["a"]=l.exports},"7dde":function(t,e,r){"use strict";var a=r("13678"),o=r.n(a);o.a},a831:function(t,e,r){},d978:function(t,e,r){"use strict";var a=r("a831"),o=r.n(a);o.a}}]);
//# sourceMappingURL=chunk-21eb5522.f20018cf.js.map