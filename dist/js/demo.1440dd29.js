(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["demo"],{"680c":function(i,t,n){"use strict";n.r(t);var a=function(){var i=this,t=i.$createElement,n=i._self._c||t;return n("div",{staticClass:"font14"},[n("van-popup",{attrs:{"overlay-style":{backgroundColor:"rgba(0,0,0,0)"},position:"top"},model:{value:i.show,callback:function(t){i.show=t},expression:"show"}},[n("div",{staticClass:"animate"},[n("iframe",{staticStyle:{height:"100%",width:"100%",border:"none"},attrs:{id:"iframe1",src:"./animate/ship/index.html"}})]),n("div",{staticClass:"flex-row flex-wrap"},[n("van-button",{staticClass:"m_y5",attrs:{type:"primary",size:"mini"},on:{click:i.startcountdown}},[i._v("倒计时")]),n("van-button",{staticClass:"m_y5",attrs:{type:"primary",size:"mini"},on:{click:i.midgame}},[i._v("动画中期")]),n("van-button",{staticClass:"m_y5",attrs:{type:"primary",size:"mini"},on:{click:i.finishgame}},[i._v("开奖")]),n("van-button",{staticClass:"m_y5",attrs:{type:"primary",size:"mini"},on:{click:i.resultpage}},[i._v("出结果")]),n("van-button",{staticClass:"m_y5",attrs:{type:"primary",size:"mini"},on:{click:i.showcurrentresult}},[i._v("顶部的号码 ")]),n("van-button",{staticClass:"m_y5",attrs:{type:"primary",size:"mini"},on:{click:i.startGame}},[i._v("开始5")]),n("van-button",{staticClass:"m_y5",attrs:{type:"primary",size:"mini"},on:{click:i.stopGame}},[i._v("结束5")])],1)])],1)},e=[],o=(n("7db0"),n("1157")),s=n.n(o),m=n("2fa3"),c={data:function(){return{iFrame:null,iWindow:null,iDoc:null,iContainer:null,show:!0,iFrameHeight:"20%"}},mounted:function(){this.iframeZoom()},methods:{startGame:function(){this.iWindow&&Object(m["o"])(this.iWindow.__animate)&&Object(m["k"])(this.iWindow.__animate.startGame)&&this.iWindow.__animate.startGame(!0)},stopGame:function(){if(this.iWindow&&Object(m["o"])(this.iWindow.__animate)&&Object(m["k"])(this.iWindow.__animate.stopGame)){this.iWindow.__animate.stopGame("170517061",[0,4,6,4,5])}},initCurrentData:function(i,t,n){this.iWindow&&Object(m["o"])(this.iWindow.__animate)&&Object(m["k"])(this.iWindow.__animate.initCurrentData)&&this.iWindow.__animate.initCurrentData(i,t,n)},startcountdown:function(){this.iWindow&&Object(m["o"])(this.iWindow.__animate)&&Object(m["k"])(this.iWindow.__animate.startcountdown)&&this.iWindow.__animate.startcountdown()},midgame:function(){this.iWindow&&Object(m["o"])(this.iWindow.__animate)&&Object(m["k"])(this.iWindow.__animate.midgame)&&this.iWindow.__animate.midgame()},finishgame:function(){this.iWindow&&Object(m["o"])(this.iWindow.__animate)&&Object(m["k"])(this.iWindow.__animate.finishgame)&&this.iWindow.__animate.finishgame("5,2,6,9,8,7,4,10,1,3",(function(i){console.log(i)}))},resultpage:function(){this.iWindow&&Object(m["o"])(this.iWindow.__animate)&&Object(m["k"])(this.iWindow.__animate.resultpage)&&this.iWindow.__animate.resultpage("10,1,3,9,8,7,4,5,2,6",(function(i){console.log(i)}))},showcurrentresult:function(){this.iWindow&&Object(m["o"])(this.iWindow.__animate)&&Object(m["k"])(this.iWindow.__animate.showcurrentresult)&&this.iWindow.__animate.showcurrentresult("5,6,3,4,8,7,9,10,2,1")},iframeZoom:function(i){var t=this;setTimeout((function(){var n=document.getElementById("iframe1"),a=n.window||n.contentWindow,e=a.document,o=s()(".animate iframe"),c=o.contents().find(".container"),r=c.width();i=i||document.body.clientWidth||document.documentElement.clientWidth;var d=i*c.height()/r,u=Object(m["e"])(i/r,6);console.log(r,i,i/r,d,u),t.iFrame=n,t.iWindow=a,t.iDoc=e,t.iContainer=c,e.documentElement.style.zoom=u;var l=d+20;t.iFrameHeight=l,s()(".animate").animate({height:l},600),o.animate({height:l},600),o.contents().find(".container").fadeIn("slow"),o.contents().find("#preloader").fadeOut("slow"),t.initCurrentData("10001","10002","5,2,6,9,8,7,4,10,1,3")}),200)}}},r=c,d=n("2877"),u=Object(d["a"])(r,a,e,!1,null,"8c93d1d2",null);t["default"]=u.exports}}]);
//# sourceMappingURL=demo.1440dd29.js.map