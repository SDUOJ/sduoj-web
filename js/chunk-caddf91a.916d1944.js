(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-caddf91a"],{"3e3d":function(t,e,a){},"4d5f":function(t,e,a){"use strict";var n=a("fe5d"),s=a.n(n);s.a},5645:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",[a("strong",[t._v(t._s(t.oj))]),t._v("-"+t._s(t.code)+" ")])},s=[],o=(a("baa5"),{name:"ProblemCode",props:{problemCode:{type:String,default:"-"}},computed:{oj:function(){return this.problemCode.substring(0,this.problemCode.lastIndexOf("-"))},code:function(){return this.problemCode.substring(this.problemCode.lastIndexOf("-")+1)}}}),r=o,l=a("2877"),i=Object(l["a"])(r,n,s,!1,null,"62d51bc1",null);e["a"]=i.exports},"59a1":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"container"},[a("Row",[a("Col",{staticClass:"main-lf",attrs:{span:"19"}},[a("Card",{staticClass:"problem-set",attrs:{padding:0,"dis-hover":""}},[a("div",{staticClass:"problem-set-header clearfix",attrs:{slot:"title"},slot:"title"},[a("span",{staticClass:"problem-set-header-name"},[a("a",{staticStyle:{color:"black"},attrs:{href:"https://tai-e.pascal-lab.net/"}},[t._v("Online Judge for Tai-e Programming Assignments")])])]),a("div",{attrs:{slot:"extra"},slot:"extra"}),a("div",{staticClass:"problem-set-content"},[a("Table",{staticClass:"problem-set-content-table",attrs:{columns:t.problemTableColumns,data:t.problems,loading:t.loading},on:{"on-sort-change":t.onSort},scopedSlots:t._u([{key:"acceptance",fn:function(e){var n=e.row;return[a("span",[t._v(t._s(Math.round(100*(0===n.submitNum?0:n.acceptNum/n.submitNum)))+"%")])]}},{key:"title",fn:function(e){var n=e.row;return[a("router-link",{staticStyle:{"text-decoration":"none",color:"black"},attrs:{to:{name:"problem-detail",params:{problemCode:n.problemCode}}}},[t._v(t._s(n.problemTitle))]),t.acproblems.includes(n.problemCode)?a("Icon",{staticStyle:{color:"#229954","font-size":"16px","vertical-align":"middle"},attrs:{type:"md-checkmark"}}):t._e(),0===n.isPublic?a("Tag",{staticStyle:{"margin-left":"5px"},attrs:{color:"volcano"}},[t._v("Private")]):t._e()]}}])}),a("Page",{staticClass:"problem-set-content-page",attrs:{size:"small","show-elevator":"","show-sizer":"",total:t.total,current:t.pageNow,"page-size":t.pageSize,"page-size-opts":t.pageSizeOpts},on:{"update:current":function(e){t.pageNow=e},"on-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}})],1)])],1),a("Col",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"main-rf",attrs:{span:"5"}},[a("div",{staticClass:"problem-search"},[a("Input",{attrs:{suffix:"ios-search",placeholder:"Search"}})],1),a("div",{staticClass:"problem-tags"},[a("div",{staticClass:"problem-tags-header"},[t._v("Tags")]),a("div",{staticClass:"problem-tags-content"},[a("Row",[a("Col",{staticClass:"problem-tags-content-col",attrs:{span:"12"}},[t._l(t.tags,(function(e,n){return[n%2===0?a("div",{key:e.name,staticClass:"problem-tags-content-line"},[a("Poptip",{attrs:{trigger:"hover",placement:"left",disabled:0===(e.children||[]).length,"word-wrap":"",width:"300"}},[a("span",[t._v(t._s(e.name))]),a("div",{staticClass:"problem-tags-content-poptip",attrs:{slot:"content"},slot:"content"},t._l(e.children||[],(function(e){return a("span",{key:e},[t._v(" "+t._s(e))])})),0)])],1):t._e()]}))],2),a("Col",{staticClass:"problem-tags-content-col",attrs:{span:"12"}},[t._l(t.tags,(function(e,n){return[n%2===1?a("div",{key:e.name,staticClass:"problem-tags-content-line"},[a("Poptip",{attrs:{trigger:"hover",placement:"right",disabled:0===(e.children||[]).length,"word-wrap":"",width:"300"}},[a("span",[t._v(t._s(e.name))]),a("div",{staticClass:"problem-tags-content-poptip",attrs:{slot:"content"},slot:"content"},t._l(e.children||[],(function(e){return a("span",{key:e},[t._v(" "+t._s(e))])})),0)])],1):t._e()]}))],2)],1)],1)])])],1)],1)])},s=[],o=(a("99af"),a("4de4"),a("d81d"),a("fb6a"),a("d3b7"),a("2909")),r=a("5645"),l=a("7c15"),i=a("e325"),c={mixins:[i["a"]],data:function(){return{problemTableColumns:[{title:"ID",key:"problemCode",width:150,render:function(t,e){if(void 0!==e.row.problemCode){if(e.row.problemCode.length>20){var a=e.row.problemCode.substring(0,20)+"...";return t("Tooltip",{props:{placement:"top",maxWidth:"180"}},[t(r["a"],{props:{problemCode:a}}),t("span",{slot:"content",style:{whiteSpace:"normal",wordBreak:"break-all"}},e.row.problemCode)])}return t(r["a"],{props:{problemCode:e.row.problemCode}})}}},{title:"Title",slot:"title"},{title:"Acceptance",slot:"acceptance",width:120}],acproblems:[],problems:[],tags:[{name:"动态规划",children:["区间DP","线性DP","树形DP","背包","线段树","状压DP","概率DP","数位DP","斜率优化"]},{name:"搜索",children:["状压DP","数位DP","背包"]},{name:"数据结构",children:[]},{name:"数论"},{name:"树结构"},{name:"图结构"},{name:"组合数学"},{name:"贪心"},{name:"字符串"},{name:"模拟"},{name:"高精度"},{name:"概率论"},{name:"线性代数"},{name:"交互题"},{name:"计算几何"},{name:"其他"}],loading:!1}},methods:{switchTag:function(t){this.problemTableColumns=t?[].concat(Object(o["a"])(this.problemTableColumns.slice(0,2)),[{title:"Tags",key:"problemTagDTOList",align:"right",minWidth:270,ellipsis:!0,render:function(t,e){return t("div",{class:"problem-set-tags"},e.row.problemTagDTOList.map((function(e){return t("div",{class:"problem-set-tagbox"},[t("div",{class:"problem-set-tag"},e.title)])})))}}],Object(o["a"])(this.problemTableColumns.slice(2))):this.problemTableColumns.filter((function(t){return"problemTagDTOList"!==t.key}))},getProblemList:function(){var t=this;this.loading=!0,l["a"].getProblemList({pageNow:this.pageNow,pageSize:this.pageSize,sortBy:this.sortBy,ascending:this.ascending}).then((function(e){t.problems=e.rows,t.total=parseInt(e.totalPage)*t.pageSize})).finally((function(){t.loading=!1})),l["a"].getUserACProblems().then((function(e){return t.acproblems=e})).catch((function(t){return t}))}},mounted:function(){this.getProblemList()},watch:{$route:function(){this.getProblemList()}}},p=c,m=(a("9c79"),a("4d5f"),a("2877")),d=Object(m["a"])(p,n,s,!1,null,"4a2de523",null);e["default"]=d.exports},"9c79":function(t,e,a){"use strict";var n=a("3e3d"),s=a.n(n);s.a},baa5:function(t,e,a){var n=a("23e7"),s=a("e58c");n({target:"Array",proto:!0,forced:s!==[].lastIndexOf},{lastIndexOf:s})},e58c:function(t,e,a){"use strict";var n=a("fc6a"),s=a("a691"),o=a("50c4"),r=a("a640"),l=a("ae40"),i=Math.min,c=[].lastIndexOf,p=!!c&&1/[1].lastIndexOf(1,-0)<0,m=r("lastIndexOf"),d=l("indexOf",{ACCESSORS:!0,1:0}),u=p||!m||!d;t.exports=u?function(t){if(p)return c.apply(this,arguments)||0;var e=n(this),a=o(e.length),r=a-1;for(arguments.length>1&&(r=i(r,s(arguments[1]))),r<0&&(r=a+r);r>=0;r--)if(r in e&&e[r]===t)return r||0;return-1}:c},fe5d:function(t,e,a){}}]);
//# sourceMappingURL=chunk-caddf91a.916d1944.js.map