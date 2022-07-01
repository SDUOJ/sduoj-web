(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8864d5de"],{1348:function(e,r,t){"use strict";t.r(r);var s=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"box clearfix"},[t("div",{staticClass:"registerDiv"},[e._m(0),t("div",{staticClass:"registerForm"},[t("AccountRegisterForm",{on:{"on-success":e.handleAccountRegister}})],1)])])},i=[function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"registerSwitchDiv"},[t("div",{staticClass:"accountRegister"},[t("div",{staticClass:"selectedType"},[e._v("Register Account")])])])}],a=(t("ac1f"),t("5319"),t("5530")),o=t("29f5"),n=t("2f62"),c={components:{AccountRegisterForm:o["a"]},methods:Object(a["a"])(Object(a["a"])({},Object(n["b"])("user",["setProfile"])),{},{handleAccountRegister:function(e){this.$Message.success("Register successfully"),this.setProfile(e),this.$router.replace({name:"contest"})}})},l=c,u=(t("1aa9"),t("2877")),d=Object(u["a"])(l,s,i,!1,null,"ee555bfc",null);r["default"]=d.exports},"1aa9":function(e,r,t){"use strict";var s=t("51f8"),i=t.n(s);i.a},"29f5":function(e,r,t){"use strict";var s=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("div",{staticClass:"center"},[t("Form",{ref:"registerForm",attrs:{model:e.registerForm,rules:e.registerRules,"label-position":"top"}},[t("FormItem",{attrs:{prop:"username",label:"Username"}},[t("Input",{staticStyle:{width:"280px"},attrs:{placeholder:"Your login handler"},model:{value:e.registerForm.username,callback:function(r){e.$set(e.registerForm,"username",r)},expression:"registerForm.username"}})],1),t("FormItem",{attrs:{prop:"password",label:"Password"}},[t("Input",{staticStyle:{width:"280px"},attrs:{placeholder:"At least 6 characters",type:"password"},model:{value:e.registerForm.password,callback:function(r){e.$set(e.registerForm,"password",r)},expression:"registerForm.password"}})],1),t("FormItem",{attrs:{prop:"confirmPassword",label:"Confirm Password"}},[t("Input",{staticStyle:{width:"280px"},attrs:{placeholder:"Same as your password",type:"password"},model:{value:e.registerForm.confirmPassword,callback:function(r){e.$set(e.registerForm,"confirmPassword",r)},expression:"registerForm.confirmPassword"}})],1),t("EmailVerify",{attrs:{email:e.registerForm.email,"email-code":e.registerForm.emailCode},on:{"update:email":function(r){return e.$set(e.registerForm,"email",r)},"update:emailCode":function(r){return e.$set(e.registerForm,"emailCode",r)},"update:email-code":function(r){return e.$set(e.registerForm,"emailCode",r)}}})],1)],1),t("div",{staticClass:"btnGroup",staticStyle:{"margin-top":"-1px"}},[t("Button",{staticClass:"btn",attrs:{type:"error",long:"",size:"large",loading:e.btnRegisterLoading},on:{click:e.handleRegister}},[e._v(e._s(e.registerText))]),""===e.token?t("Button",{staticClass:"btn",attrs:{long:"",to:{name:"login"}}},[e._v("Already registered")]):e._e()],1)])},i=[],a=(t("d3b7"),t("7c15")),o=t("5eb8"),n={name:"AccountRegisterForm",components:{EmailVerify:o["a"]},props:{token:{type:String,default:""},registerText:{type:String,default:"Register"}},data:function(){var e=this,r=function(r,t,s){a["a"].isExist({username:t}).then((function(e){e?s(new Error("already exists")):s()})).catch((function(r){e.$Message.error(r.message)}))},t=function(r,t,s){a["a"].isExist({email:t}).then((function(e){e?s(new Error("already exists")):s()})).catch((function(r){e.$Message.error(r.message)}))},s=function(r,t,s){""!==t&&e.$refs.registerForm.validateField("confirmPassword"),s()},i=function(r,t,s){t!==e.registerForm.password&&s(new Error("Password does not match")),s()};return{registerForm:{username:"",email:"",emailCode:"",password:"",confirmPassword:""},registerRules:{username:[{required:!0,trigger:"blur"},{validator:r,trigger:"blur"}],email:[{required:!0,type:"email",trigger:"blur"},{validator:t,trigger:"blur"}],password:[{required:!0,trigger:"blur",min:6,max:32},{validator:s,trigger:"blur"}],confirmPassword:[{required:!0,validator:i,trigger:"change"}]},btnRegisterLoading:!1}},methods:{handleRegister:function(){var e=this;this.$refs.registerForm.validate((function(r){if(r){var t=Object.assign({},e.registerForm),s="register";delete t.confirmPassword,""!==e.token&&(t.token=e.token,s="thirdPartyRegister"),e.btnRegisterLoading=!0,a["a"][s](t).then((function(r){e.$emit("on-success",r),e.$refs.registerForm.resetFields()})).catch((function(r){e.$Message.error(r.message)})).finally((function(){e.btnRegisterLoading=!1}))}}))}}},c=n,l=(t("5dda"),t("2877")),u=Object(l["a"])(c,s,i,!1,null,"218c9adf",null);r["a"]=u.exports},"51f8":function(e,r,t){},"5dda":function(e,r,t){"use strict";var s=t("b3ab"),i=t.n(s);i.a},b3ab:function(e,r,t){}}]);
//# sourceMappingURL=chunk-8864d5de.b61735e2.js.map