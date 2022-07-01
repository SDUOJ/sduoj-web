(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45cabc0a"],{1722:function(t,n,e){},"3abf":function(t,n,e){"use strict";e.d(n,"b",(function(){return s})),e.d(n,"a",(function(){return o}));e("99af"),e("d3b7");var a=e("ade3"),i=e("7c15"),r="/thirdPartyLogin?thirdParty=",s={SDUCAS:"SDUCAS"},o=Object(a["a"])({},s.SDUCAS,{name:"SDUCAS",description:"Shandong University Central Authentication Service",targetUrl:function(t){var n="https://pass.sdu.edu.cn/cas/login?service=".concat(location.origin).concat(r).concat(s.SDUCAS);for(var e in t)n+="&".concat(e,"=").concat(t[e]);return n},certificate:function(t){return new Promise((function(n,e){i["a"].thirdPartyLogin(t).then((function(t){n(t)})).catch(e)}))},render:function(t,n){var e="".concat(n.sduRealName,"(").concat(n.sduId,") has passed SDU CAS certification"),a="Please complete the following information",i=t("div",{class:{center:!0},style:{color:"#000000A6"}},e),r=t("div",{class:{center:!0},style:{color:"#000000A6"}},a);return t("div",[i,r])},getId:function(t){return t.sduId}})},"58ef":function(t,n,e){"use strict";var a=e("d39c"),i=e.n(a);i.a},"7f8a":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return t.valid?e("div",{staticClass:"container clearfix"},[t.ready?e("div",[e("Bind",{ref:"bind"})],1):e("div",[e("div",{staticClass:"waitTip"},[e("div",[t._v("Waiting for response")]),e("span",[t._v(t._s(t.thirdParty.description))])]),t._m(0)])]):t._e()},i=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"loader"},[e("div",{staticClass:"square"}),e("div",{staticClass:"square"}),e("div",{staticClass:"square last"}),e("div",{staticClass:"square clear"}),e("div",{staticClass:"square"}),e("div",{staticClass:"square last"}),e("div",{staticClass:"square clear"}),e("div",{staticClass:"square"}),e("div",{staticClass:"square last"})])}],r=(e("ac1f"),e("5319"),e("5530")),s=(e("1722"),e("3abf")),o=e("2f62"),c=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"box clearfix"},[""!==t.params.thirdParty?e("div",{staticClass:"bindWrapper"},[e("div",{staticClass:"bindHeader"},[t._m(0),e("div",{staticClass:"bindTip"},[e("AuthTip",{attrs:{"third-party-params":t.params}})],1)]),e("Divider"),""!==t.params.token?e("div",[t.bindType?e("AccountLoginForm",{attrs:{token:t.params.token,"login-text":"Login and Bind"},on:{"on-success":t.handleBindAccount}}):e("AccountRegisterForm",{attrs:{token:t.params.token,"register-text":"Register and Bind"},on:{"on-success":t.handleBindAccount}})],1):t._e(),e("div",{staticClass:"bindBottom center"},[t.bindType?e("a",{attrs:{href:"javascript:void(0)"},on:{click:function(n){return t.onChangeBindType(!1)}}},[t._v("No account")]):e("a",{attrs:{href:"javascript:void(0)"},on:{click:function(n){return t.onChangeBindType(!0)}}},[t._v("Bind existing account")])])],1):t._e()])},u=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("header",{staticClass:"bindTitle center"},[e("h3",[t._v("Continue to bind third party account")])])}],d=e("d12f"),l=e("29f5"),f={name:"ThirdPartyHint",props:{thirdPartyParams:Object},render:function(t){var n=s["a"][this.thirdPartyParams.thirdParty];return n?n.render(t,this.thirdPartyParams):t("div")}},h={name:"Bind",components:{AccountLoginForm:d["a"],AccountRegisterForm:l["a"],AuthTip:f},data:function(){return{params:{},bindType:!1}},methods:Object(r["a"])(Object(r["a"])({},Object(o["b"])("user",["setProfile"])),{},{set:function(t){this.params=t},onChangeBindType:function(t){this.bindType=t},handleBindAccount:function(t){this.setProfile(t),this.$router.replace({name:"home"})}})},m=h,p=(e("c966"),e("2877")),g=Object(p["a"])(m,c,u,!1,null,"3683330f",null),v=g.exports,b={name:"ThirdPartyLogin",components:{Bind:v},data:function(){return{thirdParty:{},valid:!1,ready:!1}},methods:Object(r["a"])({},Object(o["b"])("user",["setProfile"])),mounted:function(){var t=this;for(var n in this.valid=!1,this.ready=!1,s["b"])s["b"][n]===this.$route.query.thirdParty&&(this.valid=!0,this.thirdParty=s["a"][s["b"][n]]);this.valid?this.thirdParty.certificate(this.$route.query).then((function(n){n.user?(t.setProfile(n.user),t.$router.replace({name:"home"})):(t.ready=!0,t.$nextTick((function(){t.$refs.bind.set(n)})))})).catch((function(n){t.$Message.error(n.message),t.$router.replace({name:"login"})})):this.$Message.error("Invalid Parameters")}},y=b,C=(e("a59b"),Object(p["a"])(y,a,i,!1,null,"e5fcd296",null));n["default"]=C.exports},a152:function(t,n,e){},a59b:function(t,n,e){"use strict";var a=e("a152"),i=e.n(a);i.a},c966:function(t,n,e){"use strict";var a=e("ec0b"),i=e.n(a);i.a},d12f:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("div",{staticClass:"center"},[e("Form",{ref:"accountLoginForm",attrs:{model:t.accountLoginForm,rules:t.accountLoginRules,"label-position":"right"}},[e("FormItem",{attrs:{prop:"username",label:"Username (or Email)"}},[e("Input",{staticStyle:{width:"280px"},model:{value:t.accountLoginForm.username,callback:function(n){t.$set(t.accountLoginForm,"username",n)},expression:"accountLoginForm.username"}})],1),e("FormItem",{attrs:{prop:"password",label:"Password"}},[e("Input",{staticStyle:{width:"280px"},attrs:{type:"password"},on:{"on-enter":t.handleAccountLogin},model:{value:t.accountLoginForm.password,callback:function(n){t.$set(t.accountLoginForm,"password",n)},expression:"accountLoginForm.password"}})],1)],1)],1),e("div",{staticClass:"btnGroup",staticStyle:{"margin-top":"-1px"}},[e("Button",{staticClass:"btn",attrs:{type:"error",long:"",size:"large",loading:t.btnAccountLoginLoading},on:{click:t.handleAccountLogin}},[t._v(t._s(t.loginText))]),""===t.token?e("Button",{staticClass:"btn",attrs:{long:"",to:{name:"reset-password"}}},[t._v("Forget password")]):t._e()],1)])},i=[],r=(e("d3b7"),e("7c15")),s={name:"AccountLoginForm",props:{token:{type:String,default:""},loginText:{type:String,default:"Login"}},data:function(){return{accountLoginForm:{username:"",password:""},accountLoginRules:{username:[{required:!0,trigger:"blur"}],password:[{required:!0,trigger:"blur"}]},btnAccountLoginLoading:!1}},methods:{handleAccountLogin:function(){var t=this;this.$refs.accountLoginForm.validate((function(n){if(n){var e="login",a=t.accountLoginForm;""!==t.token&&(e="thirdPartyBinding",a.token=t.token),t.btnAccountLoginLoading=!0,r["a"][e](a).then((function(n){t.$emit("on-success",n)})).catch((function(n){t.$Message.error(n.message)})).finally((function(){t.btnAccountLoginLoading=!1}))}}))}}},o=s,c=(e("58ef"),e("2877")),u=Object(c["a"])(o,a,i,!1,null,"72d9ca3c",null);n["a"]=u.exports},d39c:function(t,n,e){},ec0b:function(t,n,e){}}]);
//# sourceMappingURL=chunk-45cabc0a.8c616e19.js.map