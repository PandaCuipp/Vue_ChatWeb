(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["bettingReport"],{"38f5":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"app"},[s("van-nav-bar",{staticClass:"bg-purple",attrs:{fixed:"",border:!0}},[s("div",{staticClass:"router-back",attrs:{slot:"left"},on:{click:function(e){return t.$router.back()}},slot:"left"},[s("van-icon",{attrs:{color:"white",name:"arrow-left"}})],1),s("div",{staticClass:"flex-column justify-center align-center text-white",attrs:{slot:"title"},slot:"title"},[s("div",{class:t.titleClass},[t._v("竞猜报表")]),t.subTitle?s("div",{staticClass:"font12 subTitle"},[t._v(t._s(t.subTitle))]):t._e()])]),s("van-pull-refresh",{on:{refresh:function(e){return t.initData()}},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[s("van-list",{staticClass:"p_t46 p_b50",attrs:{value:!1,finished:!0,"finished-text":""}},t._l(t.userReportUser,(function(e,a){return s("div",{staticClass:"font14 line30 p_x10 bg-white m_b5",on:{click:function(s){return t.onPush(e.game_id)}}},[s("van-row",[s("van-col",{attrs:{span:12}},[t._v(" "+t._s(t.getGameName(e.game_id))+" ")]),s("van-col",{staticClass:"text-end",attrs:{span:12}},[s("van-icon",{attrs:{name:"arrow",color:"#999"}})],1)],1),s("van-row",{staticClass:"text-center"},[s("van-col",{attrs:{span:8}},[s("div",{staticClass:"text-light"},[t._v("注单")]),s("div",[t._v(t._s(e.counts))])]),s("van-col",{attrs:{span:8}},[s("div",{staticClass:"text-light"},[t._v("红利")]),s("div",[t._v(t._s(t._f("formatMoney")(e.lost)))])]),s("van-col",{attrs:{span:8}},[s("div",{staticClass:"text-light"},[t._v("游戏结果")]),s("div",{class:[e.all_result>0?"text-red":"text-light-green"]},[t._v(" "+t._s(t._f("formatMoney")(e.all_result))+" ")])])],1),s("van-row",{staticClass:"text-center"},[s("van-col",{attrs:{span:8}},[s("div",{staticClass:"text-light"},[t._v("注额")]),s("div",[t._v(t._s(t._f("formatMoney")(e.moneys)))])]),s("van-col",{attrs:{span:8}},[s("div",{staticClass:"text-light"},[t._v("返点")]),s("div",[t._v(t._s(t._f("formatMoney")(e.tuishui))+" ")])]),s("van-col",{attrs:{span:8}},[s("div",{staticClass:"text-light"},[t._v("彩种结果")]),s("div",{class:[e.all_result>0?"text-red":"text-light-green"]},[t._v(" "+t._s(t._f("formatMoney")(e.all_result))+" ")])])],1)],1)})),0)],1)],1)},i=[],n=(s("a4d3"),s("e01a"),s("d28b"),s("99af"),s("4de4"),s("4160"),s("b0c0"),s("e439"),s("dbb4"),s("b64b"),s("d3b7"),s("3ca3"),s("159b"),s("ddb0"),s("96cf"),s("2909")),r=s("ade3"),o=s("2f62"),l=s("2fa3");function c(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function u(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?c(Object(s),!0).forEach((function(e){Object(r["a"])(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):c(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}var v={filters:{formatMoney:l["e"]},data:function(){return{loading:!1,subTitle:void 0,startTime:void 0,endTime:void 0,titleClass:[]}},computed:u({},Object(o["b"])(["userReportUser","simpleGameLists"])),created:function(){this.initSubTitle(),this.initData(),this.$store.dispatch("getSimpleGameLists")},methods:{getGameName:function(t){var e=Object(n["a"])(this.simpleGameLists),s=!0,a=!1,i=void 0;try{for(var r,o=e[Symbol.iterator]();!(s=(r=o.next()).done);s=!0){var l=r.value;if(l.game_id==t)return l.name}}catch(c){a=!0,i=c}finally{try{s||null==o.return||o.return()}finally{if(a)throw i}}},initData:function(){var t,e,s;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return this.loading=!0,t=this.startTime,e=this.endTime,s={},t&&(s.start_time=t),e&&(s.end_time=e),a.next=7,regeneratorRuntime.awrap(this.$store.dispatch("getUserReportUser",s));case 7:this.loading=!1;case 8:case"end":return a.stop()}}),null,this)},initSubTitle:function(){var t=this.$route.query,e=t.startTime,s=t.endTime;this.startTime=e,this.endTime=s,(e||s)&&(this.subTitle="(".concat(e||"-"," ~ ").concat(s||"-",")"),this.titleClass=["font12","line25"])},onPush:function(t){var e=this.startTime,s=this.endTime;this.$router.push({name:"bettingQihao",query:{startTime:e,endTime:s,game_id:t}})}}},d=v,f=(s("5702"),s("2877")),p=Object(f["a"])(d,a,i,!1,null,"a04fafa4",null);e["default"]=p.exports},5702:function(t,e,s){"use strict";var a=s("6836"),i=s.n(a);i.a},6836:function(t,e,s){}}]);
//# sourceMappingURL=bettingReport.813f9c3f.js.map