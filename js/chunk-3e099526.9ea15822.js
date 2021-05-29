(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e099526"],{"0a9c":function(t,e,r){"use strict";var n=r("bc9e"),a=r.n(n);a.a},"0b67":function(t,e,r){"use strict";var n=r("23c2"),a=r.n(n);a.a},1722:function(t,e,r){},"23c2":function(t,e,r){},"278d":function(t,e,r){},"29f5":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"center"},[r("Form",{ref:"registerForm",attrs:{model:t.registerForm,rules:t.registerRules,"label-position":"top"}},[r("FormItem",{attrs:{prop:"username",label:"Username"}},[r("Input",{staticStyle:{width:"280px"},attrs:{placeholder:"Your login handler"},model:{value:t.registerForm.username,callback:function(e){t.$set(t.registerForm,"username",e)},expression:"registerForm.username"}})],1),r("FormItem",{attrs:{prop:"password",label:"Password"}},[r("Input",{staticStyle:{width:"280px"},attrs:{placeholder:"At least 6 characters",type:"password"},model:{value:t.registerForm.password,callback:function(e){t.$set(t.registerForm,"password",e)},expression:"registerForm.password"}})],1),r("FormItem",{attrs:{prop:"confirmPassword",label:"Confirm Password"}},[r("Input",{staticStyle:{width:"280px"},attrs:{placeholder:"Same as your password",type:"password"},model:{value:t.registerForm.confirmPassword,callback:function(e){t.$set(t.registerForm,"confirmPassword",e)},expression:"registerForm.confirmPassword"}})],1),r("EmailVerify",{attrs:{email:t.registerForm.email,"email-code":t.registerForm.emailCode},on:{"update:email":function(e){return t.$set(t.registerForm,"email",e)},"update:emailCode":function(e){return t.$set(t.registerForm,"emailCode",e)},"update:email-code":function(e){return t.$set(t.registerForm,"emailCode",e)}}})],1)],1),r("div",{staticClass:"btnGroup",staticStyle:{"margin-top":"-1px"}},[r("Button",{staticClass:"btn",attrs:{type:"error",long:"",size:"large",loading:t.btnRegisterLoading},on:{click:t.handleRegister}},[t._v(t._s(t.registerText))]),""===t.token?r("Button",{staticClass:"btn",attrs:{long:"",to:{name:"login"}}},[t._v("Already registered")]):t._e()],1)])},a=[],i=(r("d3b7"),r("7c15")),s=r("5eb8"),o={name:"AccountRegisterForm",components:{EmailVerify:s["a"]},props:{token:{type:String,default:""},registerText:{type:String,default:"Register"}},data:function(){var t=this,e=function(e,r,n){i["a"].isExist({username:r}).then((function(t){t?n(new Error("already exists")):n()})).catch((function(e){t.$Message.error(e.message)}))},r=function(e,r,n){i["a"].isExist({email:r}).then((function(t){t?n(new Error("already exists")):n()})).catch((function(e){t.$Message.error(e.message)}))},n=function(e,r,n){""!==r&&t.$refs.registerForm.validateField("confirmPassword"),n()},a=function(e,r,n){r!==t.registerForm.password&&n(new Error("Password does not match")),n()};return{registerForm:{username:"",email:"",emailCode:"",password:"",confirmPassword:""},registerRules:{username:[{required:!0,trigger:"blur"},{validator:e,trigger:"blur"}],email:[{required:!0,type:"email",trigger:"blur"},{validator:r,trigger:"blur"}],password:[{required:!0,trigger:"blur",min:6,max:32},{validator:n,trigger:"blur"}],confirmPassword:[{required:!0,validator:a,trigger:"change"}]},btnRegisterLoading:!1}},methods:{handleRegister:function(){var t=this;this.$refs.registerForm.validate((function(e){if(e){var r=Object.assign({},t.registerForm),n="register";delete r.confirmPassword,""!==t.token&&(r.token=t.token,n="thirdPartyRegister"),t.btnRegisterLoading=!0,i["a"][n](r).then((function(e){t.$emit("on-success",e),t.$refs.registerForm.resetFields()})).catch((function(e){t.$Message.error(e.message)})).finally((function(){t.btnRegisterLoading=!1}))}}))}}},c=o,d=(r("71d1"),r("2877")),u=Object(d["a"])(c,n,a,!1,null,"5f7230e8",null);e["a"]=u.exports},"3abf":function(t,e,r){"use strict";r.d(e,"b",(function(){return s})),r.d(e,"a",(function(){return o}));r("99af"),r("d3b7");var n=r("ade3"),a=r("7c15"),i="/thirdPartyLogin?thirdParty=",s={SDUCAS:"SDUCAS"},o=Object(n["a"])({},s.SDUCAS,{name:"SDUCAS",description:"Shandong University Central Authentication Service",targetUrl:function(t){var e="https://pass.sdu.edu.cn/cas/login?service=".concat(location.origin).concat(i).concat(s.SDUCAS);for(var r in t)e+="&".concat(r,"=").concat(t[r]);return e},certificate:function(t){return new Promise((function(e,r){a["a"].thirdPartyLogin(t).then((function(t){e(t)})).catch(r)}))},render:function(t,e){var r="".concat(e.sduRealName,"(").concat(e.sduId,") has passed SDU CAS certification"),n="Please complete the following information",a=t("div",{class:{center:!0},style:{color:"#000000A6"}},r),i=t("div",{class:{center:!0},style:{color:"#000000A6"}},n);return t("div",[a,i])},getId:function(t){return t.sduId}})},"3b37":function(t,e,r){"use strict";var n=r("278d"),a=r.n(n);a.a},"71d1":function(t,e,r){"use strict";var n=r("c51c"),a=r.n(n);a.a},"7f8a":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.valid?r("div",{staticClass:"container clearfix"},[t.ready?r("div",[r("Bind",{ref:"bind"})],1):r("div",[r("div",{staticClass:"waitTip"},[r("div",[t._v("Waiting for response")]),r("span",[t._v(t._s(t.thirdParty.description))])]),t._m(0)])]):t._e()},a=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"loader"},[r("div",{staticClass:"square"}),r("div",{staticClass:"square"}),r("div",{staticClass:"square last"}),r("div",{staticClass:"square clear"}),r("div",{staticClass:"square"}),r("div",{staticClass:"square last"}),r("div",{staticClass:"square clear"}),r("div",{staticClass:"square"}),r("div",{staticClass:"square last"})])}],i=(r("ac1f"),r("5319"),r("5530")),s=(r("1722"),r("3abf")),o=r("2f62"),c=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"box clearfix"},[""!==t.params.thirdParty?r("div",{staticClass:"bindWrapper"},[r("div",{staticClass:"bindHeader"},[t._m(0),r("div",{staticClass:"bindTip"},[r("AuthTip",{attrs:{"third-party-params":t.params}})],1)]),r("Divider"),""!==t.params.token?r("div",[t.bindType?r("AccountLoginForm",{attrs:{token:t.params.token,"login-text":"Login and Bind"},on:{"on-success":t.handleBindAccount}}):r("AccountRegisterForm",{attrs:{token:t.params.token,"register-text":"Register and Bind"},on:{"on-success":t.handleBindAccount}})],1):t._e(),r("div",{staticClass:"bindBottom center"},[t.bindType?r("a",{attrs:{href:"javascript:void(0)"},on:{click:function(e){return t.onChangeBindType(!1)}}},[t._v("No account")]):r("a",{attrs:{href:"javascript:void(0)"},on:{click:function(e){return t.onChangeBindType(!0)}}},[t._v("Bind existing account")])])],1):t._e()])},d=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("header",{staticClass:"bindTitle center"},[r("h3",[t._v("Continue to bind third party account")])])}],u=r("d12f"),l=r("29f5"),m={name:"ThirdPartyHint",props:{thirdPartyParams:Object},render:function(t){var e=s["a"][this.thirdPartyParams.thirdParty];return e?e.render(t,this.thirdPartyParams):t("div")}},g={name:"Bind",components:{AccountLoginForm:u["a"],AccountRegisterForm:l["a"],AuthTip:m},data:function(){return{params:{},bindType:!0}},methods:Object(i["a"])(Object(i["a"])({},Object(o["b"])("user",["setProfile"])),{},{set:function(t){this.params=t},onChangeBindType:function(t){this.bindType=t},handleBindAccount:function(t){this.setProfile(t),this.$router.replace({name:"home"})}})},f=g,p=(r("3b37"),r("2877")),h=Object(p["a"])(f,c,d,!1,null,"f4b94162",null),v=h.exports,b={name:"ThirdPartyLogin",components:{Bind:v},data:function(){return{thirdParty:{},valid:!1,ready:!1}},methods:Object(i["a"])({},Object(o["b"])("user",["setProfile"])),mounted:function(){var t=this;for(var e in this.valid=!1,this.ready=!1,s["b"])s["b"][e]===this.$route.query.thirdParty&&(this.valid=!0,this.thirdParty=s["a"][s["b"][e]]);this.valid?this.thirdParty.certificate(this.$route.query).then((function(e){e.user?(t.setProfile(e.user),t.$router.replace({name:"home"})):(t.ready=!0,t.$nextTick((function(){t.$refs.bind.set(e)})))})).catch((function(e){t.$Message.error(e.message),t.$router.replace({name:"login"})})):this.$Message.error("Invalid Parameters")}},y=b,F=(r("0a9c"),Object(p["a"])(y,n,a,!1,null,"a3e7a030",null));e["default"]=F.exports},bc9e:function(t,e,r){},c51c:function(t,e,r){},d12f:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"center"},[r("Form",{ref:"accountLoginForm",attrs:{model:t.accountLoginForm,rules:t.accountLoginRules,"label-position":"right"}},[r("FormItem",{attrs:{prop:"username",label:"Username (or Email)"}},[r("Input",{staticStyle:{width:"280px"},model:{value:t.accountLoginForm.username,callback:function(e){t.$set(t.accountLoginForm,"username",e)},expression:"accountLoginForm.username"}})],1),r("FormItem",{attrs:{prop:"password",label:"Password"}},[r("Input",{staticStyle:{width:"280px"},attrs:{type:"password"},on:{"on-enter":t.handleAccountLogin},model:{value:t.accountLoginForm.password,callback:function(e){t.$set(t.accountLoginForm,"password",e)},expression:"accountLoginForm.password"}})],1)],1)],1),r("div",{staticClass:"btnGroup",staticStyle:{"margin-top":"-1px"}},[r("Button",{staticClass:"btn",attrs:{type:"error",long:"",size:"large",loading:t.btnAccountLoginLoading},on:{click:t.handleAccountLogin}},[t._v(t._s(t.loginText))]),""===t.token?r("Button",{staticClass:"btn",attrs:{long:"",to:{name:"reset-password"}}},[t._v("Forget password")]):t._e()],1)])},a=[],i=(r("d3b7"),r("7c15")),s={name:"AccountLoginForm",props:{token:{type:String,default:""},loginText:{type:String,default:"Login"}},data:function(){return{accountLoginForm:{username:"",password:""},accountLoginRules:{username:[{required:!0,trigger:"blur"}],password:[{required:!0,trigger:"blur"}]},btnAccountLoginLoading:!1}},methods:{handleAccountLogin:function(){var t=this;this.$refs.accountLoginForm.validate((function(e){if(e){var r="login",n=t.accountLoginForm;""!==t.token&&(r="thirdPartyBinding",n.token=t.token),t.btnAccountLoginLoading=!0,i["a"][r](n).then((function(e){t.$emit("on-success",e)})).catch((function(e){t.$Message.error(e.message)})).finally((function(){t.btnAccountLoginLoading=!1}))}}))}}},o=s,c=(r("0b67"),r("2877")),d=Object(c["a"])(o,n,a,!1,null,"1ed6eed5",null);e["a"]=d.exports}}]);
//# sourceMappingURL=chunk-3e099526.9ea15822.js.map