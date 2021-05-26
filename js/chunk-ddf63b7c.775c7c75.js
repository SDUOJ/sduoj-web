(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ddf63b7c"],{"081f":function(t,e,r){"use strict";var a=r("ae2c"),o=r.n(a);o.a},1010:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[r("Row",[r("Col",{attrs:{span:"16"}},[r("div",{staticStyle:{"margin-right":"30px"}},[r("UserProfile"),r("UserPassword",{staticStyle:{margin:"20px 0"}}),r("UserEmail")],1)]),r("Col",{attrs:{span:"8"}},[r("Card",{staticClass:"profile clearfix",attrs:{padding:20,"dis-hover":""}},[r("div",{staticClass:"avatar-box"},[r("img",{attrs:{src:t.avatar}})]),r("div",{staticStyle:{"text-align":"center"}},[r("span",{staticStyle:{color:"#aaa"}},[t._v("We use "),r("a",{attrs:{href:"https://cn.gravatar.com/",target:"_blank"}},[t._v("Gravatar")]),t._v(" to present your avatar icon")])])]),r("Card",{staticClass:"profile clearfix",staticStyle:{margin:"20px 0"},attrs:{padding:20,"dis-hover":""}},[r("List",t._l(t.THIRD_PARTY_ENUM,(function(e){return r("ListItem",{key:e},[r("ListItemMeta",{attrs:{title:e,description:t.THIRD_PARTY_CAS[e].description}}),t.THIRD_PARTY_CAS[e].getId(t.profile)?r("template",{slot:"action"},[r("li",[r("span",[t._v(t._s(t.THIRD_PARTY_CAS[e].getId(t.profile)))])]),r("li",[t.thirdPartyStatus[e]?t._e():r("a",{attrs:{href:"javascript:void(0)"},on:{click:function(r){return t.handleUnbind(e)}}},[t._v("Unbind")])])]):r("template",{slot:"action"},[r("li",[t._v("NONE")])])],2)})),1)],1)],1)],1),r("Reconfirm",{ref:"reconfirm",attrs:{message:"Are you sure to unbind this third party certification?","confirm-text":t.confirmText,"button-text":"I confirm to unbind"},on:{"update:confirmText":function(e){t.confirmText=e},"update:confirm-text":function(e){t.confirmText=e}}})],1)},o=[],s=(r("d3b7"),r("5530")),n=r("2f62"),i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Card",{attrs:{title:"Your Profile",padding:0,"dis-hover":""}},[r("div",{staticClass:"form"},[r("Form",{ref:"profileForm",attrs:{model:t.profileForm,rules:t.profileRules,"label-position":"right","label-width":100}},[r("Row",[r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"Username"}},[r("span",[t._v(t._s(t.profile.username))])]),r("FormItem",{attrs:{label:"Nickname"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"text"},model:{value:t.profileForm.nickname,callback:function(e){t.$set(t.profileForm,"nickname",e)},expression:"profileForm.nickname"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-person-outline"},slot:"prepend"})],1)],1),r("FormItem",{attrs:{label:"Student ID"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"text"},model:{value:t.profileForm.studentId,callback:function(e){t.$set(t.profileForm,"studentId",e)},expression:"profileForm.studentId"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-person-outline"},slot:"prepend"})],1)],1),r("FormItem",{attrs:{label:"Confirm Password",prop:"password"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"password"},model:{value:t.profileForm.password,callback:function(e){t.$set(t.profileForm,"password",e)},expression:"profileForm.password"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-lock-outline"},slot:"prepend"})],1)],1),r("FormItem",[r("Button",{attrs:{disabled:!t.isVerified,loading:t.btnLoading},on:{click:function(e){return t.handleProfileUpdate("profileForm")}}},[t._v("Update")])],1)],1),r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"Gender"}},[r("RadioGroup",{attrs:{border:""},model:{value:t.profileForm.gender,callback:function(e){t.$set(t.profileForm,"gender",e)},expression:"profileForm.gender"}},[r("Radio",{attrs:{label:"2"}},[r("Icon",{attrs:{type:"md-help"}})],1),r("Radio",{attrs:{label:"1"}},[r("Icon",{attrs:{type:"md-male"}})],1),r("Radio",{attrs:{label:"0"}},[r("Icon",{attrs:{type:"md-female"}})],1)],1)],1),r("FormItem",{attrs:{label:"Phone"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"text"},model:{value:t.profileForm.phone,callback:function(e){t.$set(t.profileForm,"phone",e)},expression:"profileForm.phone"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-call-outline"},slot:"prepend"})],1)],1),r("FormItem",{attrs:{label:"Email"}},[t.isVerified?r("Tooltip",{attrs:{content:"You are verified",placement:"right"}},[r("span",{staticClass:"email-verified",domProps:{textContent:t._s(t.profile.email)}})]):r("Tooltip",{attrs:{content:"Click to send an email",placement:"right"}},[r("span",{staticClass:"email-unverified",domProps:{textContent:t._s(t.profile.email)},on:{click:t.sendEmail}})])],1),r("FormItem",{attrs:{label:"Roles"}},t._l(t.profile.roles,(function(e){return r("span",{key:e,staticClass:"roles"},[r("Tag",{attrs:{color:t.USER_ROLE[e].color}},[t._v(t._s(e))])],1)})),0)],1)],1)],1)],1)])},l=[],c=(r("25f0"),r("7c15")),d=r("c9d9"),p={data:function(){return{profileForm:{nickname:"",studentId:"",gender:"",phone:"",password:""},profileRules:{password:[{required:!0,trigger:"blur",min:6,max:32}]},btnLoading:!1}},methods:{handleProfileUpdate:function(t){var e=this;this.$refs[t].validate((function(t){t&&(e.btnLoading=!0,c["a"].updateProfile(e.profileForm).then((function(t){c["a"].getProfile(),e.$Message.success("Updated")})).catch((function(t){e.$Message.error(t.message)})).finally((function(){e.btnLoading=!1})))}))},sendEmail:function(){var t=this;if(!this.isVerified){var e=this.$Message.loading({content:"Waiting...",duration:0});c["a"].sendVerificationEmail(this.username).then((function(r){e(),t.$Message.success("An verification email has sent to ".concat(r))})).catch((function(r){e(),t.$Message.error(r.message)}))}}},computed:Object(s["a"])(Object(s["a"])(Object(s["a"])({},Object(n["d"])("user",["profile"])),Object(n["c"])("user",["isVerified","username"])),{},{USER_ROLE:function(){return d["j"]}}),mounted:function(){var t=this;c["a"].getProfile((function(e){t.profileForm=Object.assign({},e),t.profileForm.gender=t.profileForm.gender.toString()}))}},u=p,m=(r("e824"),r("2877")),f=Object(m["a"])(u,i,l,!1,null,"148256eb",null),w=f.exports,h=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Card",{attrs:{title:"Change Your Password",padding:0,"dis-hover":""}},[r("div",{staticClass:"form"},[r("Form",{ref:"passwordForm",attrs:{model:t.passwordForm,rules:t.passwordRules,"label-position":"right","label-width":105}},[r("Row",[r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"Old Password",prop:"oldPassword"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"password"},model:{value:t.passwordForm.oldPassword,callback:function(e){t.$set(t.passwordForm,"oldPassword",e)},expression:"passwordForm.oldPassword"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-lock-outline"},slot:"prepend"})],1)],1),r("FormItem",[r("Button",{attrs:{loading:t.btnLoading},on:{click:function(e){return t.handlePasswordUpdate("passwordForm")}}},[t._v("Update")])],1)],1),r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"New Password",prop:"newPassword"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"password"},model:{value:t.passwordForm.newPassword,callback:function(e){t.$set(t.passwordForm,"newPassword",e)},expression:"passwordForm.newPassword"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-lock-outline"},slot:"prepend"})],1)],1),r("FormItem",{attrs:{label:"Confirm New Password",prop:"confirmNewPassword"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"password"},model:{value:t.passwordForm.confirmNewPassword,callback:function(e){t.$set(t.passwordForm,"confirmNewPassword",e)},expression:"passwordForm.confirmNewPassword"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-lock-outline"},slot:"prepend"})],1)],1)],1)],1)],1)],1)])},g=[],b={data:function(){var t=this,e=function(e,r,a){""!==r&&t.$refs.passwordForm.validateField("confirmNewPassword"),a()},r=function(e,r,a){r!==t.passwordForm.newPassword&&a(new Error("Password does not match")),a()};return{passwordForm:{oldPassword:"",newPassword:"",confirmNewPassword:""},passwordRules:{oldPassword:[{required:!0,trigger:"blur",min:6,max:32}],newPassword:[{required:!0,trigger:"blur",min:6,max:32},{validator:e,trigger:"blur"}],confirmNewPassword:[{required:!0,validator:r,trigger:"change"}]},btnLoading:!1}},methods:{handlePasswordUpdate:function(t){var e=this;this.$refs[t].validate((function(r){if(r){var a={password:e.passwordForm.oldPassword,newPassword:e.passwordForm.newPassword};e.btnLoading=!0,c["a"].updateProfile(a).then((function(t){e.$Message.success("Updated")})).catch((function(t){e.$Message.error(t.message)})).finally((function(){e.btnLoading=!1,e.$refs[t].resetFields()}))}}))}}},v=b,F=(r("5e03"),Object(m["a"])(v,h,g,!1,null,"a09ba754",null)),y=F.exports,P=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Card",{attrs:{title:"Change Your Email",padding:0,"dis-hover":""}},[r("div",{staticClass:"form"},[r("Form",{ref:"emailForm",attrs:{model:t.emailForm,rules:t.emailRules,"label-position":"right","label-width":105}},[r("Row",[r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"Password",prop:"password"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"password"},model:{value:t.emailForm.password,callback:function(e){t.$set(t.emailForm,"password",e)},expression:"emailForm.password"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-lock-outline"},slot:"prepend"})],1)],1),r("FormItem",[r("Button",{attrs:{loading:t.btnLoading},on:{click:function(e){return t.handleEmailUpdate("emailForm")}}},[t._v("Update")])],1)],1),r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"New Email",prop:"newEmail"}},[r("div",[r("Input",{staticStyle:{width:"200px"},attrs:{type:"email"},model:{value:t.emailForm.newEmail,callback:function(e){t.$set(t.emailForm,"newEmail",e)},expression:"emailForm.newEmail"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-mail-outline"},slot:"prepend"})],1),r("span",{staticStyle:{color:"#aaa"}},[t._v("Your email will be used at "),r("a",{attrs:{href:"",target:"_blank"}},[t._v("Gravatar.com")])])],1)])],1)],1)],1)],1)])},x=[],I={data:function(){var t=function(t,e,r){c["a"].isExist({email:e}).then((function(t){r()}),(function(t){r(new Error("already exists"))}))};return{emailForm:{password:"",newEmail:""},emailRules:{password:[{required:!0,trigger:"blur",min:6,max:32}],newEmail:[{required:!0,type:"email",trigger:"blur"},{validator:t,trigger:"blur"}]},btnLoading:!1}},methods:{handleEmailUpdate:function(t){var e=this;this.$refs[t].validate((function(r){r&&(e.btnLoading=!0,c["a"].updateProfile(e.emailForm).then((function(t){c["a"].getProfile(),e.$Message.success("Updated")})).catch((function(t){e.$Message.error(t.message)})).finally((function(){e.btnLoading=!1,e.$refs[t].resetFields()})))}))}}},_=I,S=(r("3633"),Object(m["a"])(_,P,x,!1,null,"5a80d4a7",null)),C=S.exports,k=r("7b4f"),R=r("3abf"),U={components:{UserProfile:w,UserPassword:y,UserEmail:C,Reconfirm:k["a"]},inject:["reload"],data:function(){return{thirdPartyStatus:{},confirmText:""}},computed:Object(s["a"])(Object(s["a"])(Object(s["a"])({},Object(n["d"])("user",["profile"])),Object(n["c"])("user",["avatar","isVerified"])),{},{THIRD_PARTY_CAS:function(){return R["a"]},THIRD_PARTY_ENUM:function(){return R["b"]}}),methods:{handleUnbind:function(t){var e=this;this.confirmText=R["a"][t].getId(this.profile),this.$refs.reconfirm.reconfirm((function(){e.thirdPartyStatus[t]=!0,c["a"].thirdPartyUnbinding({thirdParty:t}).then((function(t){e.$Message.success("Success"),e.reload()})).catch((function(t){e.$Message.error(t.message)})).finally((function(){e.thirdPartyStatus[t]=!1}))}))}},mounted:function(){for(var t in R["b"])this.$set(this.thirdPartyStatus,t,!1)}},$=U,E=(r("80d9"),Object(m["a"])($,a,o,!1,null,"240d95c3",null));e["default"]=E.exports},"26a3":function(t,e,r){},3633:function(t,e,r){"use strict";var a=r("d98f"),o=r.n(a);o.a},"3abf":function(t,e,r){"use strict";r.d(e,"b",(function(){return n})),r.d(e,"a",(function(){return i}));r("99af"),r("d3b7");var a=r("ade3"),o=r("7c15"),s="/thirdPartyLogin?thirdParty=",n={SDUCAS:"SDUCAS"},i=Object(a["a"])({},n.SDUCAS,{name:"SDUCAS",description:"Shandong University Central Authentication Service",targetUrl:function(t){var e="https://pass.sdu.edu.cn/cas/login?service=".concat(location.origin).concat(s).concat(n.SDUCAS);for(var r in t)e+="&".concat(r,"=").concat(t[r]);return e},certificate:function(t){return new Promise((function(e,r){o["a"].thirdPartyLogin(t).then((function(t){e(t)})).catch(r)}))},render:function(t,e){var r="".concat(e.sduRealName,"(").concat(e.sduId,") has passed SDU CAS certification"),a="Please complete the following information",o=t("div",{class:{center:!0},style:{color:"#000000A6"}},r),s=t("div",{class:{center:!0},style:{color:"#000000A6"}},a);return t("div",[o,s])},getId:function(t){return t.sduId}})},"5e03":function(t,e,r){"use strict";var a=r("d7ce"),o=r.n(a);o.a},"7b4f":function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Modal",{attrs:{title:t.title,witdh:"446px",transfer:""},model:{value:t.modalFlag,callback:function(e){t.modalFlag=e},expression:"modalFlag"}},[r("div",{staticClass:"warnDiv"},[r("div",{domProps:{innerHTML:t._s(t.message)}})]),r("div",{staticClass:"confirmText",staticStyle:{"margin-top":"36px"}},[r("div",[r("span",[t._v("Please type ")]),r("strong",[t._v(t._s(t.confirmText))]),r("span",[t._v(" to confirm.")])]),r("Input",{staticStyle:{width:"100%"},on:{"on-change":t.checkTypein},model:{value:t.typein,callback:function(e){t.typein=e},expression:"typein"}})],1),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("Button",{staticClass:"confirmButton",attrs:{long:"",type:"error",disabled:!t.checked},on:{click:t.callback}},[t._v(t._s(t.buttonText))])],1)])},o=[],s=function(){},n={name:"Reconfirm",props:{title:{type:String,default:"Reconfirm"},message:{type:String,default:""},confirmText:{type:String,default:""},buttonText:{type:String,default:"Confirm"}},data:function(){return{modalFlag:!1,typein:"",checked:!1,callback:s}},methods:{reconfirm:function(t){this.callback=t,this.typein="",this.modalFlag=!0},checkTypein:function(){this.checked=this.typein===this.confirmText}}},i=n,l=(r("081f"),r("2877")),c=Object(l["a"])(i,a,o,!1,null,"2309ca9c",null);e["a"]=c.exports},"80d9":function(t,e,r){"use strict";var a=r("26a3"),o=r.n(a);o.a},"95a7":function(t,e,r){},ae2c:function(t,e,r){},d7ce:function(t,e,r){},d98f:function(t,e,r){},e824:function(t,e,r){"use strict";var a=r("95a7"),o=r.n(a);o.a}}]);
//# sourceMappingURL=chunk-ddf63b7c.775c7c75.js.map