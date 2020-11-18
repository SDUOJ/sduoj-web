(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-560630b2"],{"07b2":function(e,t,r){"use strict";var s=r("fe27"),a=r.n(s);a.a},1010:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("Row",[r("Col",{attrs:{span:"16"}},[r("div",{staticStyle:{"margin-right":"30px"}},[r("UserProfile"),r("UserPassword",{staticStyle:{margin:"20px 0"}}),r("UserEmail")],1)]),r("Col",{attrs:{span:"8"}},[r("Card",{staticClass:"profile clearfix",attrs:{padding:20,"dis-hover":""}},[r("div",{staticClass:"avatar-box"},[r("img",{attrs:{src:e.avatar}})]),r("div",{staticStyle:{"text-align":"center"}},[r("span",{staticStyle:{color:"#aaa"}},[e._v("We use "),r("a",{attrs:{href:"https://en.gravatar.com/",target:"_blank"}},[e._v("Gravatar")]),e._v(" to present your avatar icon")])])])],1)],1)],1)},a=[],o=r("5530"),i=r("2f62"),n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Card",{attrs:{title:"Your Profile",padding:0,"dis-hover":""}},[r("div",{staticClass:"form"},[r("Form",{ref:"profileForm",attrs:{model:e.profileForm,rules:e.profileRules,"label-position":"right","label-width":100}},[r("Row",[r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"Username"}},[r("span",[e._v(e._s(e.profile.username))])]),r("FormItem",{attrs:{label:"Nickname"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"text"},model:{value:e.profileForm.nickname,callback:function(t){e.$set(e.profileForm,"nickname",t)},expression:"profileForm.nickname"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-person-outline"},slot:"prepend"})],1)],1),r("FormItem",{attrs:{label:"Student ID"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"text"},model:{value:e.profileForm.studentId,callback:function(t){e.$set(e.profileForm,"studentId",t)},expression:"profileForm.studentId"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-person-outline"},slot:"prepend"})],1)],1),r("FormItem",{attrs:{label:"Confirm Password",prop:"password"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"password"},model:{value:e.profileForm.password,callback:function(t){e.$set(e.profileForm,"password",t)},expression:"profileForm.password"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-lock-outline"},slot:"prepend"})],1)],1),r("FormItem",[r("Button",{attrs:{disabled:!e.isVerified},on:{click:function(t){return e.handleProfileUpdate("profileForm")}}},[e._v("Update")])],1)],1),r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"Gender"}},[r("RadioGroup",{attrs:{border:""},model:{value:e.profileForm.gender,callback:function(t){e.$set(e.profileForm,"gender",t)},expression:"profileForm.gender"}},[r("Radio",{attrs:{label:"2"}},[r("Icon",{attrs:{type:"md-help"}})],1),r("Radio",{attrs:{label:"1"}},[r("Icon",{attrs:{type:"md-male"}})],1),r("Radio",{attrs:{label:"0"}},[r("Icon",{attrs:{type:"md-female"}})],1)],1)],1),r("FormItem",{attrs:{label:"Phone"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"text"},model:{value:e.profileForm.phone,callback:function(t){e.$set(e.profileForm,"phone",t)},expression:"profileForm.phone"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-call-outline"},slot:"prepend"})],1)],1),r("FormItem",{attrs:{label:"Email"}},[e.isVerified?r("Tooltip",{attrs:{content:"You are verified",placement:"right"}},[r("span",{staticClass:"email-verified",domProps:{textContent:e._s(e.profile.email)}})]):r("Tooltip",{attrs:{content:"Click to send an email",placement:"right"}},[r("span",{staticClass:"email-unverified",domProps:{textContent:e._s(e.profile.email)},on:{click:e.sendEmail}})])],1),r("FormItem",{attrs:{label:"Roles"}},e._l(e.profile.roles,(function(t){return r("span",{key:t,staticClass:"roles"},[r("Tag",{attrs:{color:e.USER_ROLE[t].color}},[e._v(e._s(t))])],1)})),0)],1)],1)],1)],1)])},l=[],d=(r("d3b7"),r("25f0"),r("7c15")),p=r("c9d9"),c={data:function(){return{profileForm:{nickname:"",studentId:"",gender:"",phone:"",password:""},profileRules:{password:[{required:!0,trigger:"blur",min:6,max:32}]}}},methods:{handleProfileUpdate:function(e){var t=this;this.$refs[e].validate((function(e){e&&d["a"].updateProfile(t.profileForm).then((function(e){d["a"].getProfile(),t.$Message.success("Updated")})).catch((function(e){t.$Message.error(e.message)}))}))},sendEmail:function(){var e=this;this.isVerified||d["a"].sendVerificationEmail(this.username).then((function(t){e.$Message.success("An verification email has sent to ".concat(t.data))})).catch((function(t){e.$Message.error(t.message)}))}},computed:Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(i["d"])("user",["profile"])),Object(i["c"])("user",["isVerified","username"])),{},{USER_ROLE:function(){return p["g"]}}),mounted:function(){var e=this;d["a"].getProfile((function(t){e.profileForm=Object.assign({},t),e.profileForm.gender=e.profileForm.gender.toString()}))}},m=c,u=(r("4f23"),r("2877")),f=Object(u["a"])(m,n,l,!1,null,"398ed51e",null),w=f.exports,F=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Card",{attrs:{title:"Change Your Password",padding:0,"dis-hover":""}},[r("div",{staticClass:"form"},[r("Form",{ref:"passwordForm",attrs:{model:e.passwordForm,rules:e.passwordRules,"label-position":"right","label-width":105}},[r("Row",[r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"Old Password",prop:"oldPassword"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"password"},model:{value:e.passwordForm.oldPassword,callback:function(t){e.$set(e.passwordForm,"oldPassword",t)},expression:"passwordForm.oldPassword"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-lock-outline"},slot:"prepend"})],1)],1),r("FormItem",[r("Button",{on:{click:function(t){return e.handlePasswordUpdate("passwordForm")}}},[e._v("Update")])],1)],1),r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"New Password",prop:"newPassword"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"password"},model:{value:e.passwordForm.newPassword,callback:function(t){e.$set(e.passwordForm,"newPassword",t)},expression:"passwordForm.newPassword"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-lock-outline"},slot:"prepend"})],1)],1),r("FormItem",{attrs:{label:"Confirm New Password",prop:"confirmNewPassword"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"password"},model:{value:e.passwordForm.confirmNewPassword,callback:function(t){e.$set(e.passwordForm,"confirmNewPassword",t)},expression:"passwordForm.confirmNewPassword"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-lock-outline"},slot:"prepend"})],1)],1)],1)],1)],1)],1)])},h=[],v={data:function(){var e=this,t=function(t,r,s){""!==r&&e.$refs.passwordForm.validateField("confirmNewPassword"),s()},r=function(t,r,s){r!==e.passwordForm.newPassword&&s(new Error("Password does not match")),s()};return{passwordForm:{oldPassword:"",newPassword:"",confirmNewPassword:""},passwordRules:{oldPassword:[{required:!0,trigger:"blur",min:6,max:32}],newPassword:[{required:!0,trigger:"blur",min:6,max:32},{validator:t,trigger:"blur"}],confirmNewPassword:[{required:!0,validator:r,trigger:"change"}]}}},methods:{handlePasswordUpdate:function(e){var t=this;this.$refs[e].validate((function(r){if(r){var s={password:t.passwordForm.oldPassword,newPassword:t.passwordForm.newPassword};d["a"].updateProfile(s).then((function(e){t.$Message.success("Updated")})).catch((function(e){t.$Message.error(e.message)})).finally((function(){t.$refs[e].resetFields()}))}}))}}},b=v,g=(r("07b2"),Object(u["a"])(b,F,h,!1,null,"438970fe",null)),P=g.exports,I=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Card",{attrs:{title:"Change Your Email",padding:0,"dis-hover":""}},[r("div",{staticClass:"form"},[r("Form",{ref:"emailForm",attrs:{model:e.emailForm,rules:e.emailRules,"label-position":"right","label-width":105}},[r("Row",[r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"Password",prop:"password"}},[r("Input",{staticStyle:{width:"200px"},attrs:{type:"password"},model:{value:e.emailForm.password,callback:function(t){e.$set(e.emailForm,"password",t)},expression:"emailForm.password"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-lock-outline"},slot:"prepend"})],1)],1),r("FormItem",[r("Button",{on:{click:function(t){return e.handleEmailUpdate("emailForm")}}},[e._v("Update")])],1)],1),r("Col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:"New Email",prop:"newEmail"}},[r("div",[r("Input",{staticStyle:{width:"200px"},attrs:{type:"email"},model:{value:e.emailForm.newEmail,callback:function(t){e.$set(e.emailForm,"newEmail",t)},expression:"emailForm.newEmail"}},[r("Icon",{attrs:{slot:"prepend",type:"ios-mail-outline"},slot:"prepend"})],1),r("span",{staticStyle:{color:"#aaa"}},[e._v("Your email will be used at "),r("a",{attrs:{href:"",target:"_blank"}},[e._v("Gravatar.com")])])],1)])],1)],1)],1)],1)])},y=[],x={data:function(){var e=function(e,t,r){d["a"].isExist({email:t}).then((function(e){r()}),(function(e){r(new Error("already exists"))}))};return{emailForm:{password:"",newEmail:""},emailRules:{password:[{required:!0,trigger:"blur",min:6,max:32}],newEmail:[{required:!0,type:"email",trigger:"blur"},{validator:e,trigger:"blur"}]}}},methods:{handleEmailUpdate:function(e){var t=this;this.$refs[e].validate((function(r){r&&d["a"].updateProfile(t.emailForm).then((function(e){d["a"].getProfile(),t.$Message.success("Updated")})).catch((function(e){t.$Message.error(e.message)})).finally((function(){t.$refs[e].resetFields()}))}))}}},k=x,C=(r("991f"),Object(u["a"])(k,I,y,!1,null,"1d494c02",null)),$=C.exports,E={components:{UserProfile:w,UserPassword:P,UserEmail:$},computed:Object(o["a"])(Object(o["a"])({},Object(i["d"])("user",["profile"])),Object(i["c"])("user",["avatar","isVerified"]))},_=E,U=(r("9d85"),Object(u["a"])(_,s,a,!1,null,"2511999a",null));t["default"]=U.exports},"4f23":function(e,t,r){"use strict";var s=r("7892"),a=r.n(s);a.a},7892:function(e,t,r){},"991f":function(e,t,r){"use strict";var s=r("a17d"),a=r.n(s);a.a},"9d85":function(e,t,r){"use strict";var s=r("a484"),a=r.n(s);a.a},a17d:function(e,t,r){},a484:function(e,t,r){},fe27:function(e,t,r){}}]);
//# sourceMappingURL=chunk-560630b2.122d55eb.js.map