(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71d41bab"],{5093:function(s,e,t){"use strict";var i=t("e2c7"),o=t.n(i);o.a},"6ef6":function(s,e,t){"use strict";t.r(e);var i=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"container"},[t("table",{staticClass:"scoreboard"},[t("colgroup",[t("col",{attrs:{id:"scorerank"}}),s.showFlags?t("col",{attrs:{id:"scoreflags"}}):t("col"),t("col",{attrs:{id:"scoreusername"}})]),s._m(0),t("colgroup",[s.showSubmissions?s._l(s.problems,(function(s){return t("col",{key:s.problemCode,staticClass:"scoreprob"})})):s._e()],2),t("thead",[t("tr",{staticClass:"scoreheader"},[t("th",{staticStyle:{padding:"0 10px"},attrs:{title:"rank",scope:"col"}},[s._v("RANK")]),t("th",{staticStyle:{padding:"0 10px"},attrs:{title:"username",colspan:"2",scope:"col"}},[s._v("PARTICIPANT")]),t("th",{staticStyle:{padding:"0 10px"},attrs:{title:"# solved / penalty or score",colspan:"2",scope:"col"}},[s._v("SCORE")]),s._l(s.problems,(function(e){return t("th",{key:e.problemCode,attrs:{title:"problem "+e.problemTitle,scope:"col"}},[t("router-link",{staticClass:"alike",attrs:{to:{name:"contest-problem",params:{problemCode:e.problemCode}}}},[t("strong",[s._v(s._s(s._f("contestProblemId")(e.problemCode)))]),e.problemColor?t("div",{staticClass:"circle",style:"background: "+e.problemColor+"; margin-left: 5px"}):s._e()]),t("div",{staticClass:"problempoints"},[s._v(s._s(e.acceptNum||0)+" / "+s._s(e.submitNum||0))])],1)}))],2)]),t("tbody",[s._l(s.likedScores,(function(e,i){return t("tr",{key:-e.user.userId,class:{sortorderswitch:0===i,scoreliked:s.likedScoresMap[e.user.userId],scorethisisme:e.user.userId===s.profile.userId},style:i===s.likedScores.length-1?"border-bottom: thick solid black;":"",attrs:{id:"user:"+e.user.userId}},[t("td",{staticClass:"scorepl"},[s._v(s._s(s.displayRank?e.rank:"?"))]),t("td",{staticClass:"scoreaf",staticStyle:{background:"#ffffff"}},[s.likedScoresMap[e.user.userId]?t("Icon",{staticClass:"heart fas",attrs:{type:"md-heart"},on:{click:function(t){return s.setUserLiked(e.user.userId,!1)}}}):t("Icon",{staticClass:"heart",attrs:{type:"md-heart-outline"},on:{click:function(t){return s.setUserLiked(e.user.userId,!0)}}})],1),t("td",{staticClass:"scoretn",staticStyle:{background:"#ffffff"},attrs:{title:e.user.username}},[t("span",{staticClass:"forceWidth"},[s._v(s._s(e.user.username))]),e.user.nickname?t("span",{staticClass:"forceWidth univ"},[s._v(s._s(e.user.nickname))]):s._e()]),t("td",{staticClass:"scorenc"},[s._v(s._s(e.solved))]),s.contestMode===s.CONTEST_MODE.ACM?t("td",{staticClass:"scorett"},[s._v(s._s(s._f("time2minutes")(e.score)))]):t("td",{staticClass:"scorett"},[s._v(s._s(e.score))]),s._l(e.problemResults,(function(i){return t("td",{key:i.problemCode,staticClass:"score_cell"},[s.contestMode===s.CONTEST_MODE.ACM?t("a",[i.numSubmissions+i.numSubmissionsPending>0?t("div",{class:i.css,on:{click:function(t){return s.showAllSubmissions(e.user.username,i.problemCode)}}},[s._v(" "+s._s(s._f("time2minutes")(i.time))+" "),t("span",[s._v(s._s(i.numSubmissions+i.numSubmissionsPending===1?"1 try":i.numSubmissions+i.numSubmissionsPending+" tries"))])]):s._e()]):s.contestMode===s.CONTEST_MODE.OI?t("a",[i.numSubmissions>0?t("div",{class:i.css,on:{click:function(t){return s.showAllSubmissions(e.user.username,i.problemCode)}}},[s._v(" "+s._s(i.score)+" ")]):s._e()]):s.contestMode===s.CONTEST_MODE.IOI?t("a",[i.numSubmissions>0?t("div",{class:i.css,on:{click:function(t){return s.showAllSubmissions(e.user.username,i.problemCode)}}},[s._v(" "+s._s(i.score)+" "),t("span",[s._v(s._s(s._f("time2minutes")(i.time)))])]):s._e()]):s._e()])}))],2)})),s._l(s.scores,(function(e,i){return t("tr",{key:e.user.userId,class:{sortorderswitch:0===i,scorethisisme:e.user.userId===s.profile.userId,scoreliked:s.likedScoresMap[e.user.userId]},attrs:{id:"user:"+e.user.userId}},[t("td",{staticClass:"scorepl"},[s._v(s._s(s.displayRank?e.rank:"?"))]),t("td",{staticClass:"scoreaf",staticStyle:{background:"#ffffff"}},[s.likedScoresMap[e.user.userId]?t("Icon",{staticClass:"heart fas",attrs:{type:"md-heart"},on:{click:function(t){return s.setUserLiked(e.user.userId,!1)}}}):t("Icon",{staticClass:"heart",attrs:{type:"md-heart-outline"},on:{click:function(t){return s.setUserLiked(e.user.userId,!0)}}})],1),t("td",{staticClass:"scoretn",staticStyle:{background:"#ffffff"},attrs:{title:e.user.username}},[t("span",{staticClass:"forceWidth"},[s._v(s._s(e.user.username))]),e.user.affiliation?t("span",{staticClass:"forceWidth univ"},[s._v(s._s(e.user.affiliation))]):s._e()]),t("td",{staticClass:"scorenc"},[s._v(s._s(e.solved))]),s.contestMode===s.CONTEST_MODE.ACM?t("td",{staticClass:"scorett"},[s._v(s._s(s._f("time2minutes")(e.score)))]):t("td",{staticClass:"scorett"},[s._v(s._s(e.score))]),s._l(e.problemResults,(function(i){return t("td",{key:i.problemCode,staticClass:"score_cell"},[s.contestMode===s.CONTEST_MODE.ACM?t("a",[i.numSubmissions+i.numSubmissionsPending>0?t("div",{class:i.css,on:{click:function(t){return s.showAllSubmissions(e.user.username,i.problemCode)}}},[s._v(" "+s._s(s._f("time2minutes")(i.time))+" "),t("span",[s._v(s._s(i.numSubmissions+i.numSubmissionsPending===1?"1 try":i.numSubmissions+i.numSubmissionsPending+" tries"))])]):s._e()]):s.contestMode===s.CONTEST_MODE.OI?t("a",[i.numSubmissions>0?t("div",{class:i.css,on:{click:function(t){return s.showAllSubmissions(e.user.username,i.problemCode)}}},[s._v(" "+s._s(i.score)+" ")]):s._e()]):s.contestMode===s.CONTEST_MODE.IOI?t("a",[i.numSubmissions>0?t("div",{class:i.css,on:{click:function(t){return s.showAllSubmissions(e.user.username,i.problemCode)}}},[s._v(" "+s._s(i.score)+" "),i.time<12e4?t("span",[s._v(s._s(s._f("time2minutes")(i.time))+" min")]):t("span",[s._v(s._s(s._f("time2minutes")(i.time))+" mins")])]):s._e()]):s._e()])}))],2)}))],2)]),t("Modal",{attrs:{width:"900px","footer-hide":"",closable:!1},model:{value:s.modelSubmissions,callback:function(e){s.modelSubmissions=e},expression:"modelSubmissions"}},[t("SubmissionList",{ref:"SubmissionList",attrs:{size:"small",bannedKey:["problemCode","username","problemTitle"]},on:{"update-total-page":s.onUpdateTotal,"on-sort":s.onSort,"on-cell-click":s.onSubmissionListCellClick}},[[t("div",{staticClass:"right footer-pages"},[t("Page",{attrs:{size:"small","show-elevator":"","show-sizer":"",total:s.total,current:s.pageNow,"page-size":s.pageSize,"page-size-opts":s.pageSizeOpts},on:{"update:current":function(e){s.pageNow=e},"on-change":s.onPageChange,"on-page-size-change":s.onPageSizeChange}})],1)]],2)],1),t("Modal",{attrs:{width:"1000px","footer-hide":"",closable:!1},model:{value:s.modelSubmissionDetail,callback:function(e){s.modelSubmissionDetail=e},expression:"modelSubmissionDetail"}},[t("SubmissionDetailView",{ref:"SubmissionDetailView"})],1)],1)},o=[function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("colgroup",[t("col",{attrs:{id:"scoresolv"}}),t("col",{attrs:{id:"scoretotal"}})])}],n=(t("d3b7"),t("25f0"),t("5530")),r=t("bf9c"),a=t("3452"),l=t("bedf"),c=t("c9d9"),u=t("2f62"),d={name:"ContestRank",components:{SubmissionList:r["a"],SubmissionDetailView:a["default"]},data:function(){return{modelSubmissions:!1,modelSubmissionDetail:!1,showSubmissions:!0,showFlags:!1,displayRank:!0,showOnesAllSubmission:{username:"",problemCode:""},total:0,pageNow:1,pageSize:15,pageSizeOpts:[15,30,50],ascending:"",sortBy:""}},filters:{contestProblemId:function(s){return Object(l["a"])(s)},time2minutes:function(s){return 0===s?"\b":parseInt(s/6e4).toString()}},computed:Object(n["a"])(Object(n["a"])(Object(n["a"])(Object(n["a"])(Object(n["a"])({},Object(u["c"])("user",["isAdmin"])),Object(u["d"])("contest",["contest","problems","likedScoresMap"])),Object(u["c"])("contest",["contestId","contestMode","contestStatus","scores","likedScores","problems"])),Object(u["c"])("user",["profile"])),{},{CONTEST_MODE:function(){return c["a"]}}),methods:{onPageChange:function(s){this.pageNow=s},onPageSizeChange:function(s){this.pageSize=s},onSort:function(s){var e=s.key,t=s.order;"normal"===t?(this.sortBy="",this.ascending=!1):(this.sortBy=e,this.ascending="asc"===t)},onUpdateTotal:function(s){this.total=s*this.pageSize},setUserLiked:function(s,e){this.$store.commit("contest/setScoreLiked",{userId:s,status:e})},showAllSubmissions:function(s,e){var t=this.contest.features[this.contestStatus===c["c"].RUNNING?"contestRunning":"contestEnd"],i=t.displayPeerSubmission;(i||this.isAdmin||s===this.profile.username)&&(this.$refs.SubmissionList.querySubmissionList({username:s,problemCode:e,pageSize:this.pageSize,pageNow:this.pageNow,sortBy:this.sortBy,ascending:this.ascending}),this.modelSubmissions=!0)},onSubmissionListCellClick:function(s,e){switch(e.key){case"submissionId":case"judgeResult":(s.username===this.username||this.isAdmin||s.isPublic)&&(this.$refs.SubmissionDetailView.query(s.submissionId),this.modelSubmissionDetail=!0);break}}}},m=d,b=(t("98e3"),t("2877")),p=Object(b["a"])(m,i,o,!1,null,"20e87958",null);e["default"]=p.exports},"98e3":function(s,e,t){"use strict";var i=t("a795"),o=t.n(i);o.a},a795:function(s,e,t){},bf9c:function(s,e,t){"use strict";var i=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("Card",{staticClass:"clearfix",attrs:{"dis-hover":"",padding:0}},[t("Table",{staticClass:"data-table",attrs:{size:s.size,"show-header":s.showHeader,"no-data-text":s.noDataText,columns:s.filteredColumns,data:s.submissions,loading:s.loading},on:{"on-selection-change":s.onSelectionChange,"on-sort-change":s.onSort,"on-cell-click":s.onCellClick},scopedSlots:s._u([{key:"id",fn:function(e){var i=e.row;return[t("router-link",{attrs:{to:{name:s.contestId?"contest-submission-detail":"submission-detail",params:{submissionId:i.submissionId}}}},[s._v(s._s(i.submissionId))])]}},{key:"title",fn:function(e){var i=e.row;return[t("router-link",{attrs:{to:{name:s.contestId?"contest-problem":"problem-detail",params:{problemCode:i.problemCode}}}},[s._v(s._s(i.problemTitle))])]}},{key:"judge-result",fn:function(s){var e=s.row;return[t("JudgeResult",{attrs:{result:e.judgeResult,total:e.checkpointNum,current:e._judgedNum}})]}},{key:"time",fn:function(e){var i=e.row;return[t("span",{staticClass:"time"},[s._v(s._s(i.usedTime||0))])]}},{key:"mem",fn:function(e){var i=e.row;return[t("span",{staticClass:"mem"},[s._v(s._s(i.usedMemory||0))])]}},{key:"submit-time",fn:function(e){var i=e.row;return[t("Tooltip",{attrs:{content:s._f("timeformat")(i.gmtCreate,"yyyy-MM-DD HH:mm:ss"),transfer:""}},[t("span",[s._v(s._s(s._f("fromnow")(i.gmtCreate)))])])]}}])}),t("div",[s._t("default")],2)],1)},o=[],n=(t("99af"),t("4de4"),t("4160"),t("caad"),t("b64b"),t("d3b7"),t("25f0"),t("2532"),t("159b"),t("5530")),r=t("0c79"),a=t("8035"),l=t("e325"),c=t("c9d9"),u=t("bedf"),d=t("7c15"),m=t("4360"),b=t("2f62"),p=t("c1df"),f=t.n(p),h={name:"SubmissionList",components:{JudgeResult:a["a"]},mixins:[l["b"]],props:{selection:{type:Boolean,default:!1},size:{type:String,default:"default"},showHeader:{type:Boolean,default:!0},doRejudge:{type:Boolean,default:!1},noDataText:{type:String,default:""},bannedKey:{type:Array,default:function(){return[]}},columns:{type:Array,default:function(){return[{title:"#",key:"submissionId",minWidth:60,slot:"id",props:{vOnce:!0}},{title:"Username",key:"username",props:{vOnce:!0}},{title:"Problem",key:"problemCode",minWidth:15,props:{vOnce:!0},render:function(s,e){if(m["a"].state.contest.contest.contestId)return s("strong",Object(u["a"])(e.row.problemCode));if(void 0!==e.row.problemCode){if(e.row.problemCode.length>20){var t=e.row.problemCode.substring(0,20)+"...";return s("Tooltip",{props:{placement:"top",maxWidth:"180"}},[s(r["a"],{props:{problemCode:t}}),s("span",{slot:"content",style:{whiteSpace:"normal",wordBreak:"break-all"}},e.row.problemCode)])}return s(r["a"],{props:{problemCode:e.row.problemCode}})}}},{title:"Title",key:"problemTitle",slot:"title"},{title:"Judge Result",key:"judgeResult",slot:"judge-result",minWidth:95},{title:"Time",key:"usedTime",slot:"time",sortable:!0,maxWidth:100},{title:"Memory",key:"usedMemory",slot:"mem",sortable:!0,maxWidth:120},{title:"Template",key:"judgeTemplateTitle",props:{vOnce:!0}},{title:"Submit Time",key:"gmtCreate",sortable:!0,slot:"submit-time"}]}}},filters:{timeformat:function(s,e){return"string"===typeof s&&(s=parseInt(s)),f()(new Date(s)).format(e)},fromnow:function(s){return"string"===typeof s&&(s=parseInt(s)),f()(new Date(s)).fromNow()}},data:function(){return{filteredColumns:[],submissions:[],loading:!1,listenedSubmissions:{}}},computed:Object(n["a"])(Object(n["a"])({},Object(b["d"])("contest",["contest"])),Object(b["c"])("contest",["contestId"])),methods:{onSort:function(s){this.$emit("on-sort",s)},onCellClick:function(s,e,t,i){this.$emit("on-cell-click",s,e,t,i)},onSelectionChange:function(s){this.$emit("on-selection-change",s)},wsSuccess:function(s){"string"===typeof s&&(s=JSON.parse(s));for(var e=0;e<s.length;++e){if(!Array.isArray(s[e])){this.fillCheckpointResults(s);break}this.fillCheckpointResults(s[e])}},fillCheckpointResults:function(s){var e=this.listenedSubmissions[s[0]];void 0!==e&&(s[1]<c["e"].PD?s[1]===c["e"].END?(this.submissions[e].judgeResult=s[2],this.submissions[e].judgeScore=s[3],this.submissions[e].usedTime=s[4].toString(),this.submissions[e].usedMemory=s[5].toString(),0===--this.listenedSubmissions.length&&this.websock.close()):this.submissions[e].judgeResult=s[1]:this.submissions[e]._judgedNum++)},querySubmissionList:function(s){var e=this;this.loading=!0,d["a"].getSubmissionList(Object(n["a"])(Object(n["a"])({},s),{},{contestId:this.contestId})).then((function(s){if(e.submissions=s.rows,e.$emit("update-total-page",parseInt(s.totalPage)),e.contestId){var t=e.contest.features[e.contestStatus===c["c"].RUNNING?"contestRunning":"contestEnd"],i=t.displayCheckpointResult;if(!i)return}var o=0;if(e.listenedSubmissions={},s.rows.forEach((function(s,t){s.judgeResult<=c["e"].PD&&(s._judgedNum=0,e.listenedSubmissions[s.submissionId]=t,o++)})),0!==o){var n=Object.keys(e.listenedSubmissions);e.listenedSubmissions.length=o,e.initWebSocket("/submission",n,e.wsSuccess)}})).finally((function(){return e.loading=!1}))}},created:function(){var s=this;this.filteredColumns=this.columns.filter((function(e){return!s.bannedKey.includes(e.key)})),this.selection&&(this.filteredColumns=[{type:"selection",width:60}].concat(this.filteredColumns))}},S=h,_=(t("5093"),t("2877")),g=Object(_["a"])(S,i,o,!1,null,"3ec34d18",null);e["a"]=g.exports},e2c7:function(s,e,t){}}]);
//# sourceMappingURL=chunk-71d41bab.cb88c4e1.js.map