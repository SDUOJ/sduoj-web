(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c6d9b646"],{"0b55":function(t,e,s){"use strict";var i=s("69bc"),n=s.n(i);n.a},1276:function(t,e,s){"use strict";var i=s("d784"),n=s("44e7"),o=s("825a"),r=s("1d80"),l=s("4840"),u=s("8aa5"),a=s("50c4"),c=s("14c3"),d=s("9263"),m=s("d039"),b=[].push,p=Math.min,h=4294967295,g=!m((function(){return!RegExp(h,"y")}));i("split",2,(function(t,e,s){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,s){var i=String(r(this)),o=void 0===s?h:s>>>0;if(0===o)return[];if(void 0===t)return[i];if(!n(t))return e.call(i,t,o);var l,u,a,c=[],m=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),p=0,g=new RegExp(t.source,m+"g");while(l=d.call(g,i)){if(u=g.lastIndex,u>p&&(c.push(i.slice(p,l.index)),l.length>1&&l.index<i.length&&b.apply(c,l.slice(1)),a=l[0].length,p=u,c.length>=o))break;g.lastIndex===l.index&&g.lastIndex++}return p===i.length?!a&&g.test("")||c.push(""):c.push(i.slice(p)),c.length>o?c.slice(0,o):c}:"0".split(void 0,0).length?function(t,s){return void 0===t&&0===s?[]:e.call(this,t,s)}:e,[function(e,s){var n=r(this),o=void 0==e?void 0:e[t];return void 0!==o?o.call(e,n,s):i.call(String(n),e,s)},function(t,n){var r=s(i,t,this,n,i!==e);if(r.done)return r.value;var d=o(t),m=String(this),b=l(d,RegExp),f=d.unicode,v=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(g?"y":"g"),C=new b(g?d:"^(?:"+d.source+")",v),_=void 0===n?h:n>>>0;if(0===_)return[];if(0===m.length)return null===c(C,m)?[m]:[];var R=0,j=0,x=[];while(j<m.length){C.lastIndex=g?j:0;var I,y=c(C,g?m:m.slice(j));if(null===y||(I=p(a(C.lastIndex+(g?0:j)),m.length))===R)j=u(m,j,f);else{if(x.push(m.slice(R,j)),x.length===_)return x;for(var S=1;S<=y.length-1;S++)if(x.push(y[S]),x.length===_)return x;j=R=I}}return x.push(m.slice(R)),x}]}),!g)},2815:function(t,e,s){},"294d":function(t,e,s){"use strict";var i=s("2815"),n=s.n(i);n.a},3452:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[t.spinShow?s("Spin",{attrs:{size:"large",fix:""}}):t._e(),s("Row",[s("Col",{attrs:{span:"17"}},[s("div",{staticStyle:{"margin-right":"20px"}},[s("Card",{staticClass:"box",attrs:{"dis-hover":"",padding:0}},[s("JudgeResult",{staticClass:"title",attrs:{slot:"title",result:t.submission.judgeResult,total:t.submission.checkpointNum,current:t.judgedCheckpointNum},slot:"title"}),t.showCheckpointResults?s("Table",{staticClass:"data-table",attrs:{"disabled-hover":"","no-data-text":"",size:"small",columns:t.columns,data:t.submission.checkpointResults},scopedSlots:t._u([{key:"judge-result",fn:function(t){var e=t.row;return[s("JudgeResult",{attrs:{result:e.judgeResult}})]}},{key:"time",fn:function(e){var i=e.row;return[s("span",{staticClass:"time"},[t._v(t._s(i.usedTime))])]}},{key:"mem",fn:function(e){var i=e.row;return[s("span",{staticClass:"mem"},[t._v(t._s(i.usedMemory))])]}}],null,!1,1916629984)}):t._e()],1),t.showJudgeLog?s("Card",{staticClass:"box",attrs:{title:"Judge Log","dis-hover":""}},[s("div",{staticClass:"judge-log"},[t._v(t._s(t.submission.judgeLog))])]):t._e(),t.showCode?s("Card",{staticClass:"box",attrs:{title:"Your Code",icon:"md-code","dis-hover":"",padding:0}},[s("p",{attrs:{slot:"title"},slot:"title"},[s("span",[t._v("Your Code")]),t.submission.code?s("Tooltip",{attrs:{content:"copy",placement:"right"}},[s("Icon",{staticClass:"hover",attrs:{type:"md-copy"},on:{click:function(e){return t.copyToClipboard(t.submission.code)}}})],1):t._e()],1),t.submission.code?s("p",{staticStyle:{color:"#bbb"},attrs:{slot:"extra"},slot:"extra"},[t._v(t._s(t.submission.codeLength)+" B")]):t.submission.zipFileId?s("Button",{attrs:{slot:"extra",type:"info",size:"small",target:"_blank",to:t.downloadUrl},slot:"extra"},[t._v("Download")]):t._e(),t.submission.code?s("div",{directives:[{name:"highlight-linenumber",rawName:"v-highlight-linenumber",value:t.submission.code,expression:"submission.code"}]},[s("pre",[s("code")])]):t._e()],1):t._e()],1)]),s("Col",{attrs:{span:"7"}},[s("Card",{attrs:{title:"Submission",icon:"ios-options","dis-hover":"",padding:0}},[s("CellGroup",{on:{"on-click":t.onCellClick}},[s("div",{staticStyle:{"margin-top":"24px"}},[t.submission.username===t.username?s("Cell",{attrs:{title:"Public"}},[s("i-switch",{attrs:{slot:"extra","true-color":"#19be6b"},slot:"extra",model:{value:t.submission.isPublic,callback:function(e){t.$set(t.submission,"isPublic",e)},expression:"submission.isPublic"}})],1):t._e(),t.canDoRejudge?s("Cell",{attrs:{name:"rejudge",disabled:t.submission.judgeResult<0}},[s("strong",[t._v("Rejudge")]),s("Icon",{attrs:{slot:"icon",type:"md-refresh",color:"#2d8cf0"},slot:"icon"})],1):t._e(),t.canDoInvalidate?s("Cell",{attrs:{name:"invalidate",disabled:t.submission.judgeResult<0}},[s("strong",[t._v("Invalidate")]),s("Icon",{attrs:{slot:"icon",type:"md-close-circle",color:"#d9534f"},slot:"icon"})],1):t._e(),s("Divider",{attrs:{size:"small"}}),t.contestId?[s("Cell",{ref:"contest_cell",attrs:{title:"Contest",to:{name:"contest-overview",params:{contestId:t.contestId}}}},[s("span",{staticClass:"ellipsis",style:"width: "+t.getEllipsisWidth("contest_cell")+"px",attrs:{slot:"extra"},slot:"extra"},[t._v(" "+t._s(t.$store.state.contest.contest.contestTitle)+" ")])]),s("Cell",{attrs:{title:"Problem Code",extra:t._f("contestProblemId")(t.submission.problemCode),to:{name:"contest-problem",params:{problemCode:t.submission.problemCode}}}})]:[s("Cell",{attrs:{title:"Problem Code",to:{name:"problem-detail",params:{problemCode:t.submission.problemCode}}}},[s("ProblemCode",{attrs:{slot:"extra",problemCode:t.submission.problemCode},slot:"extra"})],1)],s("Cell",{ref:"problem_title_cell",attrs:{title:"Problem Title"}},[s("span",{staticClass:"ellipsis",style:"width: "+t.getEllipsisWidth("problem_title_cell")+"px",attrs:{slot:"extra"},slot:"extra"},[t._v(" "+t._s(t.submission.problemTitle)+" ")])])],2),s("Divider",{attrs:{size:"small"}}),s("div",{staticStyle:{"margin-bottom":"24px"}},[s("Cell",{attrs:{title:"Submission ID",extra:t.submission.submissionId}}),s("Cell",{attrs:{title:"Create Time"}},[s("Time",{attrs:{slot:"extra",time:t._f("parseInt")(t.submission.gmtCreate),type:"datetime"},slot:"extra"})],1),s("Cell",{attrs:{title:"Judge Time"}},[s("Time",{attrs:{slot:"extra",time:t._f("parseInt")(t.submission.gmtModified),type:"datetime"},slot:"extra"})],1),s("Cell",{attrs:{title:"Username",extra:t.submission.username}}),s("Cell",{attrs:{title:"Judge Result"}},[s("JudgeResult",{attrs:{slot:"extra",result:t.submission.judgeResult},slot:"extra"})],1),t.submission.judgeScore?s("Cell",{attrs:{title:"Score"}},[s("span",{attrs:{slot:"extra"},slot:"extra"},[t._v(t._s(t.submission.judgeScore||0))])]):t._e(),s("Cell",{attrs:{title:"Judge Template",extra:t.submission.judgeTemplateTitle}}),s("Cell",{attrs:{title:"Total Time"}},[s("span",{staticClass:"time",attrs:{slot:"extra"},slot:"extra"},[t._v(t._s(t.submission.usedTime||0))])]),s("Cell",{attrs:{title:"Total Memory"}},[s("span",{staticClass:"mem",attrs:{slot:"extra"},slot:"extra"},[t._v(t._s(t.submission.usedMemory||0))])])],1)],1)],1)],1)],1)],1)},n=[],o=(s("99af"),s("4de4"),s("4160"),s("a434"),s("d3b7"),s("25f0"),s("159b"),s("2909")),r=s("5530"),l=s("5645"),u=s("8035"),a=s("e325"),c=s("2f62"),d=s("7c15"),m=s("bedf"),b=s("c9d9"),p={components:{JudgeResult:u["a"],ProblemCode:l["a"]},mixins:[a["b"]],inject:["reload"],data:function(){return{submission:{checkpointResults:[]},columns:[{title:"#",key:"id"},{title:"Result",minWidth:50,slot:"judge-result"},{title:"Score",key:"judgeScore"},{title:"Time",slot:"time"},{title:"Memory",slot:"mem"}],spinShow:!1}},filters:{parseInt:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(t){return parseInt(t)})),contestProblemId:function(t){return Object(m["b"])(t)}},methods:{getEllipsisWidth:function(t){var e=this.$refs[t];return e?e.$el.clientWidth-107:200},copyToClipboard:function(t){var e=this;this.$copyText(t).then((function(t){return e.$Message.success("已复制到剪切板")}))},gotoProblem:function(t){this.$router.push({name:"problem-detail",params:{problemCode:t}})},wsSuccess:function(t){"string"===typeof t&&(t=JSON.parse(t));for(var e=0;e<t.length;++e){if(!Array.isArray(t[e])){this.fillCheckpointResults(t);break}this.fillCheckpointResults(t[e])}},fillCheckpointResults:function(t){var e=this,s=t[3],i=t[5],n=t[6],o=t[7],l=t[8];if(s<0)switch(s){case b["g"].CP:this.$set(this.submission,"judgeResult",b["g"].CP);break;case b["g"].JG:this.submission.checkpointResults.forEach((function(t){e.$set(t,"judgeResult",b["g"].JG)})),this.$set(this.submission,"judgeResult",b["g"].JG);break;case b["g"].END:this.websock.close(),this.submission=Object(r["a"])(Object(r["a"])({},this.submission),{},{judgeResult:i,judgeScore:n,usedTime:o.toString(),usedMemory:l.toString()}),this.getSubmissionDetail(this.submission.submissionId);break}else this.submission.checkpointResults.splice(s,1,{id:s+1,judgeResult:i,judgeScore:n,usedTime:o.toString(),usedMemory:l.toString()})},getSubmissionDetail:function(t){var e=this;d["a"].getSubmissionDetail({submissionId:t}).then((function(t){if(e.submission=Object(r["a"])({},t),e.submission.checkpointResults&&e.submission.checkpointResults.forEach((function(s,i){e.fillCheckpointResults([t.submissionId,0,0,i].concat(Object(o["a"])(s)))})),e.showCode){if(e.contestId){var s=e.contest.features[e.contestStatus===b["c"].RUNNING?"contestRunning":"contestEnd"],i=s.displayCheckpointResult;if(!i)return}if(t.judgeResult<=0){for(var n=0;n<t.checkpointNum;++n)e.submission.checkpointResults.push({id:n+1,judgeResult:t.judgeResult,judgeScore:0,usedTime:0,usedMemory:0});e.initWebSocket("/submission",[e.submission.submissionId],e.wsSuccess)}}})).finally((function(){e.spinShow=!1}))},onCellClick:function(t){var e=this;this.submission.judgeResult<0||("rejudge"===t?d["a"].rejudge([this.submission.submissionId]).then((function(t){e.reload()})).catch((function(t){e.$Message.error(t.message)})):"invalidate"===t&&d["a"].invalidate({submissionId:this.submission.submissionId,contestId:this.contestId}).then((function(t){e.getSubmissionDetail(e.submission.submissionId)})).catch((function(t){e.$Message.error(t.message)})))},query:function(t){t&&(this.spinShow=!0,this.getSubmissionDetail(t))}},computed:Object(r["a"])(Object(r["a"])(Object(r["a"])(Object(r["a"])({},Object(c["c"])("user",["username","isAdmin","isLogin"])),Object(c["c"])("contest",["contestId"])),Object(c["d"])("contest",["contest"])),{},{showCode:function(){return!!this.submission.code||!!this.submission.zipFileId},showJudgeLog:function(){return!!this.submission.judgeLog},showCheckpointResults:function(){return void 0!==this.submission.checkpointResults&&null!==this.submission.checkpointResults&&0!==this.submission.checkpointResults.length&&(this.submission.judgeResult!==b["g"].CAN&&(this.submission.judgeResult>0?!(this.submission.judgeResult===b["g"].CE||this.submission.judgeResult===b["g"].SE):this.submission.judgeResult===b["g"].JG))},canDoRejudge:function(){return this.isAdmin||this.contestId&&this.isLogin&&this.username===this.contest.username},canDoInvalidate:function(){return this.isAdmin||this.contestId&&this.isLogin&&this.username===this.contest.username},judgedCheckpointNum:function(){return this.submission.checkpointResults?this.submission.checkpointResults.filter((function(t){return t.judgeResult>b["g"].PD})).length:0},downloadUrl:function(){return"".concat("","/api/filesys/download/").concat(this.submission.zipFileId,"/source")}}),mounted:function(){this.query(this.$route.params.submissionId)},watch:{$route:function(){this.query(this.$route.params.submissionId)}}},h=p,g=(s("490d"),s("0b55"),s("2877")),f=Object(g["a"])(h,i,n,!1,null,"52cfc300",null);e["default"]=f.exports},"490d":function(t,e,s){"use strict";var i=s("db5d"),n=s.n(i);n.a},5645:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",[s("strong",[t._v(t._s(t.oj))]),t._v("-"+t._s(t.code)+" ")])},n=[],o=(s("ac1f"),s("1276"),{name:"ProblemCode",props:{problemCode:{type:String,default:"-"}},computed:{oj:function(){return this.problemCode.split("-")[0]},code:function(){return this.problemCode.split("-")[1]}}}),r=o,l=s("2877"),u=Object(l["a"])(r,i,n,!1,null,"7fc2f4a8",null);e["a"]=u.exports},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,s){var i=s("1d80"),n=s("5899"),o="["+n+"]",r=RegExp("^"+o+o+"*"),l=RegExp(o+o+"*$"),u=function(t){return function(e){var s=String(i(e));return 1&t&&(s=s.replace(r,"")),2&t&&(s=s.replace(l,"")),s}};t.exports={start:u(1),end:u(2),trim:u(3)}},"69bc":function(t,e,s){},7156:function(t,e,s){var i=s("861d"),n=s("d2bb");t.exports=function(t,e,s){var o,r;return n&&"function"==typeof(o=e.constructor)&&o!==s&&i(r=o.prototype)&&r!==s.prototype&&n(t,r),t}},8035:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return null!==t.result?s("div",{staticClass:"judge-result"},[s("Icon",{attrs:{type:t.judgeResult.icon,color:t.judgeResult.color}}),s("span",{class:t.judgeResult.css+" hover"},[t._v(t._s(t.abbr?t.judgeResult.abbr:t.judgeResult.name))]),t.result===t.JUDGE_RESULT_TYPE.JG&&t.total>0?[s("span",{class:t.judgeResult.css+" hover"},[t._v(t._s(" ("+t.current+"/"+t.total+")"))])]:t._e()],2):t._e()},n=[],o=(s("a9e3"),s("c9d9")),r={props:{result:{type:Number,default:null},abbr:{type:Boolean,default:!1},total:{type:Number,default:0},current:{type:Number,default:0}},computed:{judgeResult:function(){return o["f"][this.result]},JUDGE_RESULT_TYPE:function(){return o["g"]}}},l=r,u=(s("294d"),s("2877")),a=Object(u["a"])(l,i,n,!1,null,"763b1cba",null);e["a"]=a.exports},a9e3:function(t,e,s){"use strict";var i=s("83ab"),n=s("da84"),o=s("94ca"),r=s("6eeb"),l=s("5135"),u=s("c6b6"),a=s("7156"),c=s("c04e"),d=s("d039"),m=s("7c73"),b=s("241c").f,p=s("06cf").f,h=s("9bf2").f,g=s("58a8").trim,f="Number",v=n[f],C=v.prototype,_=u(m(C))==f,R=function(t){var e,s,i,n,o,r,l,u,a=c(t,!1);if("string"==typeof a&&a.length>2)if(a=g(a),e=a.charCodeAt(0),43===e||45===e){if(s=a.charCodeAt(2),88===s||120===s)return NaN}else if(48===e){switch(a.charCodeAt(1)){case 66:case 98:i=2,n=49;break;case 79:case 111:i=8,n=55;break;default:return+a}for(o=a.slice(2),r=o.length,l=0;l<r;l++)if(u=o.charCodeAt(l),u<48||u>n)return NaN;return parseInt(o,i)}return+a};if(o(f,!v(" 0o1")||!v("0b1")||v("+0x1"))){for(var j,x=function(t){var e=arguments.length<1?0:t,s=this;return s instanceof x&&(_?d((function(){C.valueOf.call(s)})):u(s)!=f)?a(new v(R(e)),s,x):R(e)},I=i?b(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),y=0;I.length>y;y++)l(v,j=I[y])&&!l(x,j)&&h(x,j,p(v,j));x.prototype=C,C.constructor=x,r(n,f,x)}},db5d:function(t,e,s){}}]);
//# sourceMappingURL=chunk-c6d9b646.59e0e34b.js.map