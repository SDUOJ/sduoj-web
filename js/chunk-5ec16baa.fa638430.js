(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5ec16baa"],{"036d":function(e,t,s){"use strict";var n=s("de58"),i=s.n(n);i.a},"0b8c":function(e,t,s){"use strict";var n=s("4e7b"),i=s.n(n);i.a},3748:function(e,t,s){"use strict";var n=s("5a41"),i=s.n(n);i.a},"4e7b":function(e,t,s){},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,s){var n=s("1d80"),i=s("5899"),o="["+i+"]",r=RegExp("^"+o+o+"*"),a=RegExp(o+o+"*$"),u=function(e){return function(t){var s=String(n(t));return 1&e&&(s=s.replace(r,"")),2&e&&(s=s.replace(a,"")),s}};e.exports={start:u(1),end:u(2),trim:u(3)}},"5a41":function(e,t,s){},7156:function(e,t,s){var n=s("861d"),i=s("d2bb");e.exports=function(e,t,s){var o,r;return i&&"function"==typeof(o=t.constructor)&&o!==s&&n(r=o.prototype)&&r!==s.prototype&&i(e,r),e}},8035:function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return null!==e.result?s("div",{staticClass:"judge-result"},[s("Icon",{attrs:{type:e.judgeResult.icon,color:e.judgeResult.color}}),s("span",{class:e.judgeResult.css+" hover"},[e._v(e._s(e.abbr?e.judgeResult.abbr:e.judgeResult.name))]),e.result===e.JUDGE_RESULT_TYPE.JG&&e.total>0?[s("span",{class:e.judgeResult.css+" hover"},[e._v(e._s(" ("+e.current+"/"+e.total+")"))])]:e._e()],2):e._e()},i=[],o=(s("a9e3"),s("c9d9")),r={props:{result:{type:Number,default:null},abbr:{type:Boolean,default:!1},total:{type:Number,default:0},current:{type:Number,default:0}},computed:{judgeResult:function(){return o["f"][this.result]},JUDGE_RESULT_TYPE:function(){return o["g"]}}},a=r,u=(s("0b8c"),s("2877")),l=Object(u["a"])(a,n,i,!1,null,"d74a8bc4",null);t["a"]=l.exports},8336:function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("Card",{staticClass:"clearfix",attrs:{"dis-hover":"",padding:0}},[s("Table",{staticClass:"data-table",attrs:{size:e.size,"show-header":e.showHeader,"no-data-text":e.noDataText,columns:e.filteredColumns,data:e.submissions,loading:e.loading},on:{"on-selection-change":e.onSelectionChange,"on-sort-change":e.onSort,"on-cell-click":e.onCellClick},scopedSlots:e._u([{key:"id",fn:function(t){var n=t.row;return[s("router-link",{attrs:{to:{name:e.contestId?"contest-submission-detail":"submission-detail",params:{submissionId:n.submissionId}}}},[e._v(e._s(n.submissionId))])]}},{key:"title",fn:function(t){var n=t.row;return[s("Tooltip",{attrs:{content:n.problemTitle,theme:"light",transfer:""}},[s("router-link",{attrs:{to:{name:e.contestId?"contest-problem":"problem-detail",params:{problemCode:n.problemCode}}}},[e._v(e._s(e._f("problemCodeEncode")(n.problemCode)))])],1)]}},{key:"judge-result",fn:function(e){var t=e.row;return[s("JudgeResult",{attrs:{result:t.judgeResult,total:t.checkpointNum,current:t.$judgedNum}})]}},{key:"score",fn:function(t){var n=t.row;return[s("span",[e._v(e._s(null===n.judgeScore?"":n.judgeScore))])]}},{key:"time",fn:function(t){var n=t.row;return[s("span",{staticClass:"time"},[e._v(e._s(n.usedTime||0))])]}},{key:"mem",fn:function(t){var n=t.row;return[s("span",{staticClass:"mem"},[e._v(e._s(n.usedMemory||0))])]}},{key:"submit-time",fn:function(t){var n=t.row;return[s("Tooltip",{attrs:{content:e._f("timeformat")(n.gmtCreate,"yyyy-MM-DD HH:mm:ss"),transfer:""}},[s("span",[e._v(e._s(e._f("fromnow")(n.gmtCreate)))])])]}}])}),s("div",[e._t("default")],2)],1)},i=[],o=(s("99af"),s("4de4"),s("4160"),s("caad"),s("b64b"),s("d3b7"),s("25f0"),s("2532"),s("159b"),s("5530")),r=s("8035"),a=s("e325"),u=s("c9d9"),l=s("bedf"),c=s("7c15"),d=s("4360"),m=s("2f62"),f=s("c1df"),g=s.n(f),p={name:"SubmissionList",components:{JudgeResult:r["a"]},mixins:[a["b"]],props:{selection:{type:Boolean,default:!1},size:{type:String,default:"default"},showHeader:{type:Boolean,default:!0},doRejudge:{type:Boolean,default:!1},noDataText:{type:String,default:""},bannedKey:{type:Array,default:function(){return[]}},columns:{type:Array,default:function(){return[{title:"#",key:"submissionId",width:165,slot:"id",props:{vOnce:!0}},{title:"Username",key:"username",width:200,props:{vOnce:!0}},{title:"Problem",key:"problemCode",slot:"title",align:"center"},{title:"Judge Result",key:"judgeResult",slot:"judge-result",width:210,align:"center"},{title:"Score",key:"judgeScore",maxWidth:100,slot:"score",align:"center"},{title:"Time",key:"usedTime",slot:"time",sortable:!0,align:"right"},{title:"Memory",key:"usedMemory",slot:"mem",sortable:!0,align:"right"},{title:"Template",key:"judgeTemplateTitle",props:{vOnce:!0},align:"center"},{title:"Submit Time",key:"gmtCreate",sortable:!0,slot:"submit-time",align:"center"}]}}},filters:{timeformat:function(e,t){return"string"===typeof e&&(e=parseInt(e)),g()(new Date(e)).format(t)},fromnow:function(e){return"string"===typeof e&&(e=parseInt(e)),g()(new Date(e)).fromNow()},problemCodeEncode:function(e){return d["a"].state.contest.contest.contestId?Object(l["b"])(e):e}},data:function(){return{filteredColumns:[],submissions:[],loading:!1,listenedSubmissions:{}}},computed:Object(o["a"])(Object(o["a"])({},Object(m["d"])("contest",["contest"])),Object(m["c"])("contest",["contestId"])),methods:{onSort:function(e){this.$emit("on-sort",e)},onCellClick:function(e,t,s,n){this.$emit("on-cell-click",e,t,s,n)},onSelectionChange:function(e){this.$emit("on-selection-change",e)},wsSuccess:function(e){"string"===typeof e&&(e=JSON.parse(e));for(var t=0;t<e.length;++t){if(!Array.isArray(e[t])){this.fillCheckpointResults(e);break}this.fillCheckpointResults(e[t])}},fillCheckpointResults:function(e){var t=e[0],s=e[3],n=e[5],i=e[6],o=e[7],r=e[8],a=this.listenedSubmissions[t];void 0!==a&&(s<0?s===u["g"].END?(this.submissions[a].judgeResult=n,this.submissions[a].judgeScore=i,this.submissions[a].usedTime=o.toString(),this.submissions[a].usedMemory=r.toString(),0===--this.listenedSubmissions.$length&&this.websock.close()):this.submissions[a].judgeResult=s:this.submissions[a].$judgedNum++)},querySubmissionList:function(e){var t=this;return new Promise((function(s,n){t.loading=!0,c["a"].getSubmissionList(Object(o["a"])(Object(o["a"])({},e),{},{contestId:t.contestId})).then((function(e){if(s(e),t.submissions=e.rows,t.contestId){var n=t.contest.features[t.contestStatus===u["c"].RUNNING?"contestRunning":"contestEnd"],i=n.displayCheckpointResult;if(!i)return}var o=0;t.listenedSubmissions={},e.rows.forEach((function(e,s){e.judgeResult<=u["g"].PD&&(t.$set(e,"$judgedNum",0),t.listenedSubmissions[e.submissionId]=s,o++)})),0!==o&&(t.initWebSocket("/submission",Object.keys(t.listenedSubmissions),t.wsSuccess),t.$set(t.listenedSubmissions,"$length",o))})).catch(n).finally((function(){t.loading=!1}))}))}},created:function(){var e=this;this.filteredColumns=this.columns.filter((function(t){return!e.bannedKey.includes(t.key)})),this.selection&&(this.filteredColumns=[{type:"selection",width:55}].concat(this.filteredColumns))}},b=p,h=(s("036d"),s("2877")),y=Object(h["a"])(b,n,i,!1,null,"39f76eda",null);t["a"]=y.exports},a9e3:function(e,t,s){"use strict";var n=s("83ab"),i=s("da84"),o=s("94ca"),r=s("6eeb"),a=s("5135"),u=s("c6b6"),l=s("7156"),c=s("c04e"),d=s("d039"),m=s("7c73"),f=s("241c").f,g=s("06cf").f,p=s("9bf2").f,b=s("58a8").trim,h="Number",y=i[h],v=y.prototype,C=u(m(v))==h,S=function(e){var t,s,n,i,o,r,a,u,l=c(e,!1);if("string"==typeof l&&l.length>2)if(l=b(l),t=l.charCodeAt(0),43===t||45===t){if(s=l.charCodeAt(2),88===s||120===s)return NaN}else if(48===t){switch(l.charCodeAt(1)){case 66:case 98:n=2,i=49;break;case 79:case 111:n=8,i=55;break;default:return+l}for(o=l.slice(2),r=o.length,a=0;a<r;a++)if(u=o.charCodeAt(a),u<48||u>i)return NaN;return parseInt(o,n)}return+l};if(o(h,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var j,R=function(e){var t=arguments.length<1?0:e,s=this;return s instanceof R&&(C?d((function(){v.valueOf.call(s)})):u(s)!=h)?l(new y(S(t)),s,R):S(t)},_=n?f(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;_.length>k;k++)a(y,j=_[k])&&!a(R,j)&&p(R,j,g(y,j));R.prototype=v,v.constructor=R,r(i,h,R)}},de58:function(e,t,s){},f620:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container"},[s("Card",{staticClass:"filter",attrs:{"dis-hover":"",padding:0}},[s("h3",{staticStyle:{display:"inline"},attrs:{slot:"title"},slot:"title"},[e._v("Filter")]),s("div",{staticClass:"btns card-extra",attrs:{slot:"extra"},slot:"extra"},[s("Button",{attrs:{type:"text"},on:{click:e.onFiltering}},[e._v("Filter")]),s("Button",{attrs:{type:"text"},on:{click:e.onReset}},[e._v("Reset")])],1),s("Row",{staticClass:"clearfix filter-sets"},[s("Col",{attrs:{span:"6"}},[s("div",{staticClass:"filter-title"},[e._v("By Username")]),s("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"Username"},on:{"on-enter":e.onFiltering},model:{value:e.tUsername,callback:function(t){e.tUsername=t},expression:"tUsername"}})],1),s("Col",{attrs:{span:"6"}},[s("div",{staticClass:"filter-title"},[e._v("By Problem")]),s("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"Problem"},on:{"on-enter":e.onFiltering},model:{value:e.tProblemCode,callback:function(t){e.tProblemCode=t},expression:"tProblemCode"}})],1),s("Col",{attrs:{span:"6"}},[s("div",{staticClass:"filter-title"},[e._v("By Judge Result")]),s("Select",{staticStyle:{width:"200px"},attrs:{clearable:""},model:{value:e.tJudgeResult,callback:function(t){e.tJudgeResult=t},expression:"tJudgeResult"}},e._l(e.JUDGE_RESULT_TYPE,(function(e){return s("Option",{key:e.value,attrs:{value:e.value,label:e.label}},[s("JudgeResult",{attrs:{result:e.value}})],1)})),1)],1),s("Col",{attrs:{span:"6"}},[s("div",{staticClass:"filter-title"},[e._v("By Judge Template")]),s("Input",{staticStyle:{width:"200px"},attrs:{disabled:"",placeholder:"Judge Template"},on:{"on-enter":e.onFiltering},model:{value:e.tJudgeTemplate,callback:function(t){e.tJudgeTemplate=t},expression:"tJudgeTemplate"}})],1)],1)],1),s("SubmissionList",{ref:"SubmissionList",attrs:{selection:e.canDoRejudge},on:{"on-selection-change":e.onSelectionChange,"on-sort":e.onSort,"on-cell-click":e.onSubmissionListCellClick}},[[e.canDoRejudge?s("div",{staticClass:"float-left footer-tools"},[s("Button",{on:{click:function(t){return e.handleRejudge(e.selectedSubmissions)}}},[s("Icon",{attrs:{type:"md-refresh"}}),e._v(" Rejudge")],1)],1):e._e(),s("div",{staticClass:"float-right footer-pages"},[s("Page",{attrs:{size:"small","show-elevator":"","show-sizer":"",total:e.total,current:e.pageNow,"page-size":e.pageSize,"page-size-opts":e.pageSizeOpts},on:{"update:current":function(t){e.pageNow=t},"on-change":e.onPageChange,"on-page-size-change":e.onPageSizeChange}})],1)]],2)],1)},i=[],o=(s("4de4"),s("4160"),s("d81d"),s("b0c0"),s("b64b"),s("ac1f"),s("5319"),s("159b"),s("5530")),r=s("8336"),a=s("8035"),u=s("2f62"),l=s("7c15"),c=s("c9d9"),d=s("bedf"),m=s("e325"),f={name:"SubmissionListView",components:{SubmissionList:r["a"],JudgeResult:a["a"]},mixins:[m["a"]],data:function(){return{tUsername:"",tProblemCode:"",tJudgeResult:"",tJudgeTemplate:"",selectedSubmissions:[]}},methods:{onFiltering:function(){this.$router.replace({query:Object(o["a"])(Object(o["a"])({},this.$route.query),{},{username:this.tUsername,problemCode:this.tProblemCode,judgeResult:this.tJudgeResult})})},onReset:function(){var e=Object(o["a"])({},this.$route.query);delete e.username,delete e.problemCode,delete e.judgeResult,delete e.judgeTemplate,this.tUsername="",this.tProblemCode="",this.tJudgeResult="",this.tJudgeTemplate="",this.$router.replace({query:e})},onSubmissionListCellClick:function(e,t){var s=this.contestId?"contest-submission-detail":"submission-detail";switch(t.key){case"judgeResult":this.$router.push({name:s,params:{submissionId:e.submissionId}});break}},onSelectionChange:function(e){this.selectedSubmissions=e},handleRejudge:function(e){var t=this;0!==e.length?l["a"].rejudge(e.map((function(e){return e.submissionId}))).then((function(e){t.$Message.success("Rejudging"),t.getSubmissionList()})):this.$Message.error("Select submissions")},getSubmissionList:function(){var e=this;this.$refs.SubmissionList.querySubmissionList({username:this.username,problemCode:this.contestId?Object(d["a"])(this.problemCode):this.problemCode,judgeResult:this.judgeResult,judgeTemplate:this.judgeTemplate,pageNow:this.pageNow,pageSize:this.pageSize,sortBy:this.sortBy,ascending:this.ascending}).then((function(t){e.total=parseInt(t.totalPage)*e.pageSize})).catch((function(t){e.$Message.error(t.message)}))}},computed:Object(o["a"])(Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(u["d"])("contest",["contest"])),Object(u["c"])("contest",["contestId"])),Object(u["c"])("user",["isAdmin","isLogin","username"])),{},{username:{get:function(){return this.$route.params.username||this.$route.query.username}},problemCode:{get:function(){return this.$route.params.problemCode||this.$route.query.problemCode}},judgeResult:{get:function(){return this.$route.params.judgeResult||this.$route.query.judgeResult}},judgeTemplate:{get:function(){return this.$route.params.judgeTemplate||this.$route.query.judgeTemplate}},canDoRejudge:function(){return!!(this.isAdmin||this.contestId&&this.isLogin&&this.username===this.contest.username)},JUDGE_RESULT_TYPE:function(){var e=[];return Object.keys(c["g"]).filter((function(e){return c["g"][e]>=0})).forEach((function(t){e.push({value:c["g"][t],label:c["f"][c["g"][t]].name})})),e}}),mounted:function(){this.tUsername=this.username,this.tProblemCode=this.problemCode,this.tJudgeResult=parseInt(this.judgeResult)||"",this.getSubmissionList()},watch:{$route:function(){this.getSubmissionList()},tJudgeResult:function(){this.onFiltering()}}},g=f,p=(s("3748"),s("2877")),b=Object(p["a"])(g,n,i,!1,null,"4972fd44",null);t["default"]=b.exports}}]);
//# sourceMappingURL=chunk-5ec16baa.fa638430.js.map