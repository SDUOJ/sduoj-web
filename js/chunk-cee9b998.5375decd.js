(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cee9b998"],{"4e3f":function(t,e,s){"use strict";var n=s("ecbd"),o=s.n(n);o.a},"961d":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.contestLoaded?s("div",{staticClass:"container"},[s("div",{staticClass:"contest__header clearfix"},[s("div",{staticClass:"contest__title"},[s("div",{staticStyle:{"margin-bottom":"15px"}},[s("span",{staticClass:"title"},[t._v(t._s(t.contest.contestTitle))]),s("span",{staticClass:"contest__subtitle"},[t._v(t._s(t.contest.source))]),t.contestOpenness===t.CONTEST_OPENNESS.PRIVATE?[t.hasParticipatedIn?s("Icon",{attrs:{type:"ios-unlock",color:"#d9534f",size:"19"}}):s("Icon",{attrs:{type:"md-lock",color:"#d9534f",size:"19"}})]:t.contestOpenness===t.CONTEST_OPENNESS.PROTECTED?[t.hasParticipatedIn?s("Icon",{attrs:{type:"ios-unlock",color:"orange",size:"19"}}):s("Icon",{attrs:{type:"md-lock",color:"orange",size:"19"}})]:t._e(),s("ul",{staticClass:"ivu-list-item-action contest__float"},[t.hasParticipatedIn?s("li",{staticStyle:{color:"#5cb85c"}},[s("Icon",{attrs:{type:"md-checkmark"}}),s("span",[t._v(" Participated")])],1):t._e(),s("li",[s("div",{class:"contest-type--"+t.contestMode},[s("Icon",{attrs:{type:"md-bulb",color:"#fff"}}),t._v(" "),s("span",[t._v(t._s(t.contestMode.toUpperCase()))])],1)]),s("li",[s("Icon",{attrs:{type:"ios-time-outline"}}),t._v(" "+t._s(t._f("time2hour")(t.contestDuration))+" ")],1),s("li",[s("Icon",{attrs:{type:"ios-people-outline"}}),t._v(" "+t._s(t.contest.participantNum)+" ")],1),t.contestOpenness!==t.CONTEST_OPENNESS.PRIVATE||t.hasParticipatedIn?s("li",[s("div",{staticClass:"hover-background",on:{click:function(e){t.contestSettingsModal=!0}}},[s("Icon",{attrs:{type:"md-settings",size:20}})],1)]):t._e()])],2),s("div",[s("Markdown",{staticStyle:{"min-height":"0"},attrs:{value:t.contest.markdownDescription}}),s("ContestProcess")],1)]),t.contestLoaded?s("Menu",{staticClass:"contest__menu",attrs:{mode:"horizontal",theme:"light","active-name":t.$route.path.split("/")[3]}},[s("MenuItem",{attrs:{name:"overview",to:{name:"contest-overview"}}},[s("span",{staticClass:"span__menu"},[t._v("Overview")])]),t.contestStarted&&(t.$store.getters["contest/hasParticipatedIn"]||t.contestOpenness===t.CONTEST_OPENNESS.PROTECTED)?[s("MenuItem",{attrs:{name:"problem",to:{name:"contest-problem",params:{problemCode:"1"}}}},[s("span",{staticClass:"span__menu"},[t._v("Problem")])]),s("MenuItem",{attrs:{name:"submission",to:{name:"contest-submission"}}},[s("span",{staticClass:"span__menu"},[t._v("Status")])]),s("MenuItem",{attrs:{name:"rank",to:{name:"contest-rank"}}},[s("span",{staticClass:"span__menu"},[t._v("Rank")])])]:t._e(),s("div",{staticClass:"contest__countdown"},[t.contestStatus===t.CONTEST_STATUS.FINISHED?[t.sliderTime?s("strong",[t._v(" "+t._s(t._f("time2hour")(t.sliderTime-t.contestStartTime)))]):s("strong",[t._v("Finished")])]:[s("strong",[t._v(t._s(t.countdown))])]],2)],2):t._e(),s("Modal",{attrs:{title:"Settings","footer-hide":"",scrollable:""},model:{value:t.contestSettingsModal,callback:function(e){t.contestSettingsModal=e},expression:"contestSettingsModal"}},[s("Form",[s("FormItem",{attrs:{label:"Show Practice"}},[s("i-switch",{model:{value:t.showPractice,callback:function(e){t.showPractice=e},expression:"showPractice"}})],1),s("FormItem",{attrs:{label:"Export"}},[s("Button",{attrs:{loading:t.exportLoading},on:{click:t.exportRank}},[t._v("Rank")])],1)],1)],1)],1),s("transition",{attrs:{name:"fade",mode:"out-in"}},[s("router-view")],1)],1):t._e()},o=[],c=(s("d3b7"),s("5530")),a=s("2f62"),i=s("c9d9"),r=s("bedf"),l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"tools clearfix"},[s("div",{staticClass:"clearfix",staticStyle:{margin:"10px 3px"}},[s("div",[t.contestStatus===t.CONTEST_STATUS.FINISHED?s("Slider",{attrs:{"show-tip":"never",step:.001},model:{value:t.currentPercent,callback:function(e){t.currentPercent=e},expression:"currentPercent"}}):t.contestStatus===t.CONTEST_STATUS.RUNNING?s("Progress",{attrs:{percent:t.currentPercent,"hide-info":"",status:"active","stroke-width":4}}):t._e()],1),s("div",{staticStyle:{float:"left"}},[s("span",[t._v("Begin: ")]),s("span",{staticClass:"time"},[t._v(t._s(t.contestStartTime.format("yyyy-MM-DD HH:mm:ss")))])]),s("div",{staticStyle:{float:"right"}},[s("span",[t._v("End: ")]),s("span",{staticClass:"time"},[t._v(t._s(t.contestEndTime.format("yyyy-MM-DD HH:mm:ss")))])])])])},d=[],u=s("c1df"),m=s.n(u),p={name:"ContestProcess",filters:{time2hour:function(t){return Object(r["c"])(t)}},computed:Object(c["a"])(Object(c["a"])(Object(c["a"])({},Object(a["d"])("contest",["sliderTime"])),Object(a["c"])("contest",["contestStatus","contestStartTime","contestEndTime","contestDuration"])),{},{currentPercent:{get:function(){var t=this.$store.state.now,e=m()(t-this.contestStartTime);return Math.min(100,parseInt(e/this.contestDuration*100))},set:function(t){100===t?this.$store.commit("contest/setSliderTime",{sliderTime:null}):this.$store.commit("contest/setSliderTime",{sliderTime:this.contestStartTime+parseInt(this.contestDuration*t/100)})}},CONTEST_MODE:function(){return i["a"]},CONTEST_STATUS:function(){return i["c"]}})},_=p,S=(s("4e3f"),s("2877")),h=Object(S["a"])(_,l,d,!1,null,"62698d9c",null),f=h.exports,v=s("14b6"),b=s("84e2"),T={name:"ContestDetailView",components:{Markdown:v["a"],ContestProcess:f},inject:["reload"],data:function(){return{contestSettingsModal:!1,contestSettingsForm:{showPractice:!1},exportLoading:!1}},filters:{time2hour:function(t){return Object(r["c"])(t)}},computed:Object(c["a"])(Object(c["a"])(Object(c["a"])(Object(c["a"])({},Object(a["d"])("contest",["contest","sliderTime"])),Object(a["c"])("user",["username"])),Object(a["c"])("contest",["contestLoaded","hasParticipatedIn","contestStatus","contestStartTime","contestDuration","contestLoaded","contestMode","contestStarted","contestOpenness","countdown","scores"])),{},{showPractice:{get:function(){return this.$store.state.contest.settings.showPractice},set:function(t){this.$store.dispatch("contest/settings",{showPractice:t})}},CONTEST_OPENNESS:function(){return i["b"]},CONTEST_STATUS:function(){return i["c"]}}),methods:{exportRank:function(){var t=this;s.e("chunk-b8be1d70").then(s.bind(null,"cd77")).then((function(e){t.exportLoading=!0;var s=b["b"][t.contestMode].exportScore(t.scores,t.contest.problems);e.export_json_to_excel(Object(c["a"])(Object(c["a"])({},s),{},{filename:t.contest.contestTitle})),t.exportLoading=!1}))}},beforeCreate:function(){var t=this;this.$store.dispatch("contest/getContest",this.$route.params.contestId).catch((function(e){t.$Message.error(e.message)}))},beforeDestroy:function(){this.$store.commit("contest/clearContest")}},O=T,C=(s("b7d8"),Object(S["a"])(O,n,o,!1,null,"3c70514d",null));e["default"]=C.exports},b7d8:function(t,e,s){"use strict";var n=s("db34"),o=s.n(n);o.a},db34:function(t,e,s){},ecbd:function(t,e,s){}}]);
//# sourceMappingURL=chunk-cee9b998.5375decd.js.map