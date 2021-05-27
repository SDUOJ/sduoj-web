(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-379d1f46"],{"28e0":function(e,s,t){},5910:function(e,s,t){"use strict";var i=t("28e0"),n=t.n(i);n.a},8336:function(e,s,t){"use strict";var i=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("Card",{staticClass:"clearfix",attrs:{"dis-hover":"",padding:0}},[t("Table",{staticClass:"data-table",attrs:{size:e.size,"show-header":e.showHeader,"no-data-text":e.noDataText,columns:e.filteredColumns,data:e.submissions,loading:e.loading},on:{"on-selection-change":e.onSelectionChange,"on-sort-change":e.onSort,"on-cell-click":e.onCellClick},scopedSlots:e._u([{key:"id",fn:function(s){var i=s.row;return[t("router-link",{attrs:{to:{name:e.contestId?"contest-submission-detail":"submission-detail",params:{submissionId:i.submissionId}}}},[e._v(e._s(i.submissionId))])]}},{key:"title",fn:function(s){var i=s.row;return[t("Tooltip",{attrs:{content:i.problemTitle,theme:"light",transfer:""}},[t("router-link",{attrs:{to:{name:e.contestId?"contest-problem":"problem-detail",params:{problemCode:i.problemCode}}}},[e._v(e._s(e._f("problemCodeEncode")(i.problemCode)))])],1)]}},{key:"judge-result",fn:function(e){var s=e.row;return[t("JudgeResult",{attrs:{result:s.judgeResult,total:s.checkpointNum,current:s.$judgedNum}})]}},{key:"score",fn:function(s){var i=s.row;return[t("span",[e._v(e._s(null===i.judgeScore?"":i.judgeScore))])]}},{key:"time",fn:function(s){var i=s.row;return[t("span",{staticClass:"time"},[e._v(e._s(i.usedTime||0))])]}},{key:"mem",fn:function(s){var i=s.row;return[t("span",{staticClass:"mem"},[e._v(e._s(i.usedMemory||0))])]}},{key:"submit-time",fn:function(s){var i=s.row;return[t("Tooltip",{attrs:{content:e._f("timeformat")(i.gmtCreate,"yyyy-MM-DD HH:mm:ss"),transfer:""}},[t("span",[e._v(e._s(e._f("fromnow")(i.gmtCreate)))])])]}}])}),t("div",[e._t("default")],2)],1)},n=[],o=(t("99af"),t("4de4"),t("4160"),t("caad"),t("b64b"),t("d3b7"),t("25f0"),t("2532"),t("159b"),t("5530")),r=t("8035"),a=t("e325"),c=t("c9d9"),l=t("bedf"),u=t("7c15"),m=t("4360"),d=t("2f62"),b=t("c1df"),f=t.n(b),p={name:"SubmissionList",components:{JudgeResult:r["a"]},mixins:[a["b"]],props:{selection:{type:Boolean,default:!1},size:{type:String,default:"default"},showHeader:{type:Boolean,default:!0},doRejudge:{type:Boolean,default:!1},noDataText:{type:String,default:""},bannedKey:{type:Array,default:function(){return[]}},columns:{type:Array,default:function(){return[{title:"#",key:"submissionId",width:165,slot:"id",props:{vOnce:!0}},{title:"Username",key:"username",width:200,props:{vOnce:!0}},{title:"Problem",key:"problemCode",slot:"title",align:"center"},{title:"Judge Result",key:"judgeResult",slot:"judge-result",width:210,align:"center"},{title:"Score",key:"judgeScore",maxWidth:100,slot:"score",align:"center"},{title:"Time",key:"usedTime",slot:"time",sortable:!0,align:"right"},{title:"Memory",key:"usedMemory",slot:"mem",sortable:!0,align:"right"},{title:"Template",key:"judgeTemplateTitle",props:{vOnce:!0},align:"center"},{title:"Submit Time",key:"gmtCreate",sortable:!0,slot:"submit-time",align:"center"}]}}},filters:{timeformat:function(e,s){return"string"===typeof e&&(e=parseInt(e)),f()(new Date(e)).format(s)},fromnow:function(e){return"string"===typeof e&&(e=parseInt(e)),f()(new Date(e)).fromNow()},problemCodeEncode:function(e){return m["a"].state.contest.contest.contestId?Object(l["b"])(e):e}},data:function(){return{filteredColumns:[],submissions:[],loading:!1,listenedSubmissions:{}}},computed:Object(o["a"])(Object(o["a"])({},Object(d["d"])("contest",["contest"])),Object(d["c"])("contest",["contestId"])),methods:{onSort:function(e){this.$emit("on-sort",e)},onCellClick:function(e,s,t,i){this.$emit("on-cell-click",e,s,t,i)},onSelectionChange:function(e){this.$emit("on-selection-change",e)},wsSuccess:function(e){"string"===typeof e&&(e=JSON.parse(e));for(var s=0;s<e.length;++s){if(!Array.isArray(e[s])){this.fillCheckpointResults(e);break}this.fillCheckpointResults(e[s])}},fillCheckpointResults:function(e){var s=this.listenedSubmissions[e[0]];void 0!==s&&(e[1]<c["g"].PD?e[1]===c["g"].END?(this.submissions[s].judgeResult=e[2],this.submissions[s].judgeScore=e[3],this.submissions[s].usedTime=e[4].toString(),this.submissions[s].usedMemory=e[5].toString(),0===--this.listenedSubmissions.$length&&this.websock.close()):this.submissions[s].judgeResult=e[1]:this.submissions[s].$judgedNum++)},querySubmissionList:function(e){var s=this;return new Promise((function(t,i){s.loading=!0,u["a"].getSubmissionList(Object(o["a"])(Object(o["a"])({},e),{},{contestId:s.contestId})).then((function(e){if(t(e),s.submissions=e.rows,s.contestId){var i=s.contest.features[s.contestStatus===c["c"].RUNNING?"contestRunning":"contestEnd"],n=i.displayCheckpointResult;if(!n)return}var o=0;s.listenedSubmissions={},e.rows.forEach((function(e,t){e.judgeResult<=c["g"].PD&&(s.$set(e,"$judgedNum",0),s.listenedSubmissions[e.submissionId]=t,o++)})),0!==o&&(s.initWebSocket("/submission",Object.keys(s.listenedSubmissions),s.wsSuccess),s.$set(s.listenedSubmissions,"$length",o))})).catch(i).finally((function(){s.loading=!1}))}))}},created:function(){var e=this;this.filteredColumns=this.columns.filter((function(s){return!e.bannedKey.includes(s.key)})),this.selection&&(this.filteredColumns=[{type:"selection",width:55}].concat(this.filteredColumns))}},h=p,g=(t("5910"),t("2877")),S=Object(g["a"])(h,i,n,!1,null,"171d3a25",null);s["a"]=S.exports},a38b:function(e,s,t){"use strict";t.r(s);var i=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"container"},[t("table",{staticClass:"scoreboard"},[t("colgroup",[t("col",{attrs:{id:"scorerank"}}),e.showFlags?t("col",{attrs:{id:"scoreflags"}}):t("col"),t("col",{attrs:{id:"scoreusername"}})]),e._m(0),t("colgroup",[e.showSubmissions?e._l(e.problems,(function(e){return t("col",{key:e.problemCode,staticClass:"scoreprob"})})):e._e()],2),t("thead",[t("tr",{staticClass:"scoreheader"},[t("th",{staticStyle:{padding:"0 10px"},attrs:{title:"rank",scope:"col"}},[e._v("RANK")]),t("th",{staticStyle:{padding:"0 10px"},attrs:{title:"username",colspan:"2",scope:"col"}},[e._v("PARTICIPANT")]),t("th",{staticStyle:{padding:"0 10px"},attrs:{title:"# solved / penalty or score",colspan:"2",scope:"col"}},[e._v("SCORE")]),e._l(e.problems,(function(s){return t("th",{key:s.problemCode,attrs:{title:"problem "+s.problemTitle,scope:"col"}},[t("router-link",{staticClass:"alike",attrs:{to:{name:"contest-problem",params:{problemCode:s.problemCode}}}},[t("strong",[e._v(e._s(e._f("contestProblemId")(s.problemCode)))]),s.problemColor?t("div",{staticClass:"circle",style:"background: "+s.problemColor+"; margin-left: 5px"}):e._e()]),t("div",{staticClass:"problempoints"},[e._v(e._s(s.acceptNum||"-")+" / "+e._s(s.submitNum||"-"))])],1)}))],2)]),t("tbody",[e._l(e.likedScores,(function(s,i){return t("tr",{key:-s.user.userId,class:{sortorderswitch:0===i,scoreliked:e.likedScoresMap[s.user.userId],scorethisisme:s.user.userId===e.profile.userId},style:i===e.likedScores.length-1?"border-bottom: thick solid black;":"",attrs:{id:"user:"+s.user.userId}},[t("td",{staticClass:"scorepl"},[e.displayRank?t("span",[e._v(e._s(-1===s.rank?"*":s.rank))]):t("span",[e._v("?")])]),t("td",{staticClass:"scoreaf",staticStyle:{background:"#ffffff"}},[e.likedScoresMap[s.user.userId]?t("Icon",{staticClass:"heart fas",attrs:{type:"md-heart"},on:{click:function(t){return e.setUserLiked(s.user.userId,!1)}}}):t("Icon",{staticClass:"heart",attrs:{type:"md-heart-outline"},on:{click:function(t){return e.setUserLiked(s.user.userId,!0)}}})],1),t("td",{staticClass:"scoretn",staticStyle:{background:"#ffffff"},attrs:{title:s.user.username}},[t("span",{class:["forceWidth",{"unofficial-username":!s.official}]},[e._v(e._s(s.user.username))]),s.user.nickname?t("span",{staticClass:"forceWidth univ"},[e._v(e._s(s.user.nickname))]):e._e()]),t("td",{staticClass:"scorenc"},[e._v(e._s(s.solved))]),e.contestMode===e.CONTEST_MODE.ACM?t("td",{staticClass:"scorett"},[e._v(e._s(e._f("time2minutes")(s.score)))]):t("td",{staticClass:"scorett"},[e._v(e._s(s.score))]),e._l(s.problemResults,(function(i){return t("td",{key:i.problemCode,staticClass:"score_cell"},[e.contestMode===e.CONTEST_MODE.ACM?t("a",[i.numSubmissions+i.numSubmissionsPending>0?t("div",{class:i.css,on:{click:function(t){return e.showAllSubmissions(s.user.username,i.problemCode)}}},[e._v(" "+e._s(e._f("time2minutes")(i.time))+" "),t("span",[e._v(e._s(i.numSubmissions+i.numSubmissionsPending===1?"1 try":i.numSubmissions+i.numSubmissionsPending+" tries"))])]):e._e()]):e.contestMode===e.CONTEST_MODE.OI?t("a",[i.numSubmissions>0?t("div",{class:i.css,on:{click:function(t){return e.showAllSubmissions(s.user.username,i.problemCode)}}},[e._v(" "+e._s(i.score)+" ")]):e._e()]):e.contestMode===e.CONTEST_MODE.IOI?t("a",[i.numSubmissions>0?t("div",{class:i.css,on:{click:function(t){return e.showAllSubmissions(s.user.username,i.problemCode)}}},[e._v(" "+e._s(i.score)+" "),t("span",[e._v(e._s(e._f("time2minutes")(i.time)))])]):e._e()]):e._e()])}))],2)})),e._l(e.scores,(function(s,i){return t("tr",{key:s.user.userId,class:{sortorderswitch:0===i,scorethisisme:s.user.userId===e.profile.userId,scoreliked:e.likedScoresMap[s.user.userId]},attrs:{id:"user:"+s.user.userId}},[t("td",{staticClass:"scorepl"},[e.displayRank?t("span",[e._v(e._s(-1===s.rank?"*":s.rank))]):t("span",[e._v("?")])]),t("td",{staticClass:"scoreaf",staticStyle:{background:"#ffffff"}},[e.likedScoresMap[s.user.userId]?t("Icon",{staticClass:"heart fas",attrs:{type:"md-heart"},on:{click:function(t){return e.setUserLiked(s.user.userId,!1)}}}):t("Icon",{staticClass:"heart",attrs:{type:"md-heart-outline"},on:{click:function(t){return e.setUserLiked(s.user.userId,!0)}}})],1),t("td",{staticClass:"scoretn",staticStyle:{background:"#ffffff"},attrs:{title:s.user.username}},[t("span",{class:["forceWidth",{"unofficial-username":!s.official}]},[e._v(e._s(s.user.username))]),s.user.nickname?t("span",{staticClass:"forceWidth univ"},[e._v(e._s(s.user.nickname))]):e._e()]),t("td",{staticClass:"scorenc"},[e._v(e._s(s.solved))]),e.contestMode===e.CONTEST_MODE.ACM?t("td",{staticClass:"scorett"},[e._v(e._s(e._f("time2minutes")(s.score)))]):t("td",{staticClass:"scorett"},[e._v(e._s(s.score))]),e._l(s.problemResults,(function(i){return t("td",{key:i.problemCode,staticClass:"score_cell"},[e.contestMode===e.CONTEST_MODE.ACM?t("a",[i.numSubmissions+i.numSubmissionsPending>0?t("div",{class:i.css,on:{click:function(t){return e.showAllSubmissions(s.user.username,i.problemCode)}}},[e._v(" "+e._s(e._f("time2minutes")(i.time))+" "),t("span",[e._v(e._s(i.numSubmissions+i.numSubmissionsPending===1?"1 try":i.numSubmissions+i.numSubmissionsPending+" tries"))])]):e._e()]):e.contestMode===e.CONTEST_MODE.OI?t("a",[i.numSubmissions>0?t("div",{class:i.css,on:{click:function(t){return e.showAllSubmissions(s.user.username,i.problemCode)}}},[e._v(" "+e._s(i.score)+" ")]):e._e()]):e.contestMode===e.CONTEST_MODE.IOI?t("a",[i.numSubmissions>0?t("div",{class:i.css,on:{click:function(t){return e.showAllSubmissions(s.user.username,i.problemCode)}}},[e._v(" "+e._s(i.score)+" "),i.time<12e4?t("span",[e._v(e._s(e._f("time2minutes")(i.time))+" min")]):t("span",[e._v(e._s(e._f("time2minutes")(i.time))+" mins")])]):e._e()]):e._e()])}))],2)}))],2)]),t("Modal",{attrs:{width:"60%","footer-hide":"",closable:!1,scrollable:""},model:{value:e.modelSubmissions,callback:function(s){e.modelSubmissions=s},expression:"modelSubmissions"}},[t("SubmissionList",{ref:"SubmissionList",attrs:{size:"small",bannedKey:["problemCode","username","problemTitle"]},on:{"on-sort":e.onSort,"on-cell-click":e.onSubmissionListCellClick}},[[t("div",{staticClass:"float-right footer-pages"},[t("Page",{attrs:{size:"small","show-elevator":"","show-sizer":"",total:e.total,current:e.pageNow,"page-size":e.pageSize,"page-size-opts":e.pageSizeOpts},on:{"update:current":function(s){e.pageNow=s},"on-change":e.onPageChange,"on-page-size-change":e.onPageSizeChange}})],1)]],2)],1),t("Modal",{attrs:{width:"80%","footer-hide":"",closable:!1},model:{value:e.modelSubmissionDetail,callback:function(s){e.modelSubmissionDetail=s},expression:"modelSubmissionDetail"}},[t("SubmissionDetailView",{ref:"SubmissionDetailView"})],1)],1)},n=[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("colgroup",[t("col",{attrs:{id:"scoresolv"}}),t("col",{attrs:{id:"scoretotal"}})])}],o=(t("d3b7"),t("25f0"),t("5530")),r=t("8336"),a=t("3452"),c=t("bedf"),l=t("c9d9"),u=t("2f62"),m={name:"ContestRankView",components:{SubmissionList:r["a"],SubmissionDetailView:a["default"]},data:function(){return{modelSubmissions:!1,modelSubmissionDetail:!1,showSubmissions:!0,showFlags:!1,displayRank:!0,showOnesAllSubmission:{username:"",problemCode:""},total:0,pageNow:1,pageSize:15,pageSizeOpts:[15,30,50],ascending:"",sortBy:"",targetUsername:"",targetProblemCode:""}},filters:{contestProblemId:function(e){return Object(c["b"])(e)},time2minutes:function(e){return 0===e?"\b":parseInt(e/6e4).toString()}},computed:Object(o["a"])(Object(o["a"])(Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(u["c"])("user",["isAdmin"])),Object(u["d"])("contest",["contest","problems","likedScoresMap"])),Object(u["c"])("contest",["contestId","contestMode","contestStatus","scores","likedScores","problems"])),Object(u["c"])("user",["profile"])),{},{CONTEST_MODE:function(){return l["a"]}}),methods:{onPageChange:function(e){this.pageNow=e,this.showAllSubmissions(this.targetUsername,this.targetProblemCode)},onPageSizeChange:function(e){this.pageSize=e,this.showAllSubmissions(this.targetUsername,this.targetProblemCode)},onSort:function(e){var s=e.key,t=e.order;"normal"===t?(this.sortBy="",this.ascending=!1):(this.sortBy=s,this.ascending="asc"===t)},setUserLiked:function(e,s){this.$store.commit("contest/setScoreLiked",{userId:e,status:s})},showAllSubmissions:function(e,s){var t=this;this.targetUsername=e,this.targetProblemCode=s;var i=this.contest.features[this.contestStatus===l["c"].RUNNING?"contestRunning":"contestEnd"],n=i.displayPeerSubmission;(n||this.isAdmin||e===this.profile.username)&&this.$refs.SubmissionList.querySubmissionList({username:e,problemCode:s,pageSize:this.pageSize,pageNow:this.pageNow,sortBy:this.sortBy,ascending:this.ascending}).then((function(e){t.total=parseInt(e.totalPage)*t.pageSize,t.modelSubmissions=!0})).catch((function(e){t.$Message.error(e.message)}))},onSubmissionListCellClick:function(e,s){switch(s.key){case"submissionId":case"judgeResult":(e.username===this.username||this.isAdmin||e.isPublic)&&(this.$refs.SubmissionDetailView.query(e.submissionId),this.modelSubmissionDetail=!0);break}}}},d=m,b=t("2877"),f=Object(b["a"])(d,i,n,!1,null,"665fa04e",null);s["default"]=f.exports}}]);
//# sourceMappingURL=chunk-379d1f46.450a701d.js.map