(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72d8a4b5"],{"3abf":function(t,n,o){"use strict";o.d(n,"b",(function(){return c})),o.d(n,"a",(function(){return r}));o("99af"),o("d3b7");var i=o("ade3"),e=o("7c15"),a="/thirdPartyLogin?thirdParty=",c={SDUCAS:"SDUCAS"},r=Object(i["a"])({},c.SDUCAS,{name:"SDUCAS",description:"Shandong University Central Authentication Service",targetUrl:function(t){var n="https://pass.sdu.edu.cn/cas/login?service=".concat(location.origin).concat(a).concat(c.SDUCAS);for(var o in t)n+="&".concat(o,"=").concat(t[o]);return n},certificate:function(t){return new Promise((function(n,o){e["a"].thirdPartyLogin(t).then((function(t){n(t)})).catch(o)}))},render:function(t,n){var o="".concat(n.sduRealName,"(").concat(n.sduId,") has passed SDU CAS certification"),i="Please complete the following information",e=t("div",{class:{center:!0},style:{color:"#000000A6"}},o),a=t("div",{class:{center:!0},style:{color:"#000000A6"}},i);return t("div",[e,a])},getId:function(t){return t.sduId}})},"471e":function(t,n,o){},"62e4":function(t,n,o){},a9e8:function(t,n,o){"use strict";var i=o("471e"),e=o.n(i);e.a},ac2a:function(t,n,o){"use strict";o.r(n);var i=function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"box clearfix"},[o("div",{staticClass:"loginDiv"},[o("div",{staticClass:"loginSwitchDiv"},[t._e(),o("div",{staticClass:"intervalDiv"}),o("div",{staticClass:"accountLogin",on:{click:function(n){return t.switchLoginType(!1)}}},[o("div",{class:{selectedType:!t.isThirdPartyLogin}},[t._v("Account")])])]),o("div",{staticClass:"loginForm"},[t.isThirdPartyLogin?o("div",[o("div",{staticClass:"btnGroup"},[o("Button",{staticClass:"btn",attrs:{long:"",type:"error",size:"large"},on:{click:function(n){return t.handleThirdPartyLogin(t.THIRD_PARTY_ENUM.SDUCAS)}}},[t._v(" SDU 统一身份认证 ")])],1)]):o("div",[o("AccountLoginForm",{on:{"on-success":t.handleAccountLogin}})],1)])])])},e=[],a=(o("ac1f"),o("5319"),o("5530")),c=o("2f62"),r=o("3abf"),s=o("d12f"),u={components:{AccountLoginForm:s["a"]},data:function(){return{isThirdPartyLogin:!1}},computed:{THIRD_PARTY_ENUM:function(){return r["b"]}},methods:Object(a["a"])(Object(a["a"])({},Object(c["b"])("user",["setProfile"])),{},{switchLoginType:function(t){this.isThirdPartyLogin=t},handleAccountLogin:function(t){this.setProfile(t),this.$router.replace(this.$route.query.to||"/")},handleThirdPartyLogin:function(t){window.location=r["a"][t].targetUrl()}})},l=u,d=(o("a9e8"),o("2877")),g=Object(d["a"])(l,i,e,!1,null,"11462ac1",null);n["default"]=g.exports},d12f:function(t,n,o){"use strict";var i=function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",[o("div",{staticClass:"center"},[o("Form",{ref:"accountLoginForm",attrs:{model:t.accountLoginForm,rules:t.accountLoginRules,"label-position":"right"}},[o("FormItem",{attrs:{prop:"username",label:"Email"}},[o("Input",{staticStyle:{width:"280px"},model:{value:t.accountLoginForm.username,callback:function(n){t.$set(t.accountLoginForm,"username",n)},expression:"accountLoginForm.username"}})],1),o("FormItem",{attrs:{prop:"password",label:"Password"}},[o("Input",{staticStyle:{width:"280px"},attrs:{type:"password"},on:{"on-enter":t.handleAccountLogin},model:{value:t.accountLoginForm.password,callback:function(n){t.$set(t.accountLoginForm,"password",n)},expression:"accountLoginForm.password"}})],1)],1)],1),o("div",{staticClass:"btnGroup",staticStyle:{"margin-top":"-1px"}},[o("Button",{staticClass:"btn",attrs:{type:"error",long:"",size:"large",loading:t.btnAccountLoginLoading},on:{click:t.handleAccountLogin}},[t._v(t._s(t.loginText))]),""===t.token?o("Button",{staticClass:"btn",attrs:{long:"",to:{name:"reset-password"}}},[t._v("Forget password")]):t._e()],1)])},e=[],a=(o("d3b7"),o("7c15")),c={name:"AccountLoginForm",props:{token:{type:String,default:""},loginText:{type:String,default:"Login"}},data:function(){return{accountLoginForm:{username:"",password:""},accountLoginRules:{username:[{required:!0,trigger:"blur"}],password:[{required:!0,trigger:"blur"}]},btnAccountLoginLoading:!1}},methods:{handleAccountLogin:function(){var t=this;this.$refs.accountLoginForm.validate((function(n){if(n){var o="login",i=t.accountLoginForm;""!==t.token&&(o="thirdPartyBinding",i.token=t.token),t.btnAccountLoginLoading=!0,a["a"][o](i).then((function(n){t.$emit("on-success",n)})).catch((function(n){t.$Message.error(n.message)})).finally((function(){t.btnAccountLoginLoading=!1}))}}))}}},r=c,s=(o("d509"),o("2877")),u=Object(s["a"])(r,i,e,!1,null,"67379ddc",null);n["a"]=u.exports},d509:function(t,n,o){"use strict";var i=o("62e4"),e=o.n(i);e.a}}]);
//# sourceMappingURL=chunk-72d8a4b5.13e59e41.js.map