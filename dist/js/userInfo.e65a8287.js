(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["userInfo"],{"6c41":function(e,t,a){},a104:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACZUlEQVRYR+2WP2gUURDGv9mQFKmUIIqWghi44va9vQuIkUuhAcUyARGrIIKgkEaw8mysRcFCRUTEwisV8R8kqIXsZWaviFgliCBaKFqJEG9HXnIBJZf9k4ucwr1mi51532++ZWaW0OVDXdZHboAgCPw4jvcBFACoAGgS4ZmqhkT0gJk/5ykqF4Ax5gJA5wAMtkTetp7Drec7QC+JyI2sEJkBjLGPAYwD+KpKJ/v7vdkwDL84oXK5PLS0FFeI1AlvVcWjKOIjWSAyARhjjgN0F0BEhP3M/L3d5dbaQVW8AuADelREHqZBpAJYa0dU8RrAogjvTrvQvTfGLgAYIsIwM39MyskCcFMVU4AeEJGX2QDMKEAvALosMjfdKcC8u4CZC1nEV2OstfOq+CHCrlvWPYkOFAoj2wcGfn4CUBPhyTwAxtj7ACaIsC2pNRMBisWg4nk6A2hVRC7mA1hu2Woc01ijMTe7Xu6/CVAqlXY0m/E11+IAduWpvE3sBwBhX593ul6vu8/5x2nrgDEmBKhEhDeqWusMgKor+VoXEVdQMoC19pAqngC4HcfN6Uaj8a0zgOW54Eb2XiKMM/PT3+9b44Dv2zNEuJJ1kmWBa+2QqirORhFfTQRYDRbh1CGVRdzFJHXTGpH/CsD37YyrMIp4LMmNv+ZAD6DnQNcd6M2BDThwSkSup+yC4ASR3iHCJDN3uAlXpHw/OEak91S9g1FUf54IUCyWip4Xuwm3BcB7VSxmrbRdHBH2ANgJ6C0RmUpdxy4gCILDcawTAEYBZPoVT4BcUEUtivh8W8BOqtuM3E1buRuF+QXY0GowSczHhAAAAABJRU5ErkJggg=="},b0cb:function(e,t,a){"use strict";var s=a("6c41"),r=a.n(s);r.a},ee96:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bg-light-blue app"},[a("van-nav-bar",{staticClass:"bg-light-blue",attrs:{border:!1}},[a("div",{staticClass:"router-back",attrs:{slot:"left"},on:{click:function(t){return e.$router.back()}},slot:"left"},[a("van-icon",{attrs:{color:"white",name:"arrow-left"}})],1),a("p",{staticClass:"text-white",attrs:{slot:"title"},slot:"title"},[e._v("个人中心")])]),a("div",{staticClass:"bg-light-blue flex-row p_y20"},[a("div",{staticClass:"p_l10",staticStyle:{flex:"1"}},[a("van-image",{attrs:{round:"",width:"50px",height:"50px",src:e.userHeads[e.userInfo.photo]},on:{click:function(t){return e.$router.push({name:"userHeads"})}}})],1),a("div",{staticClass:"flex-column align-end p_r15",staticStyle:{flex:"1"}},[a("div",{staticClass:"text-white line30 font14"},[e._v(e._s(e.userInfo.cnname))]),a("div",{staticClass:"text-white line30 font14"},[e._v("ID："+e._s(e.userInfo.id))])])]),a("div",{staticClass:"bg-white content p_t20 px-w100"},[a("van-cell",{attrs:{icon:"contact",title:"昵称设置","is-link":"",value:e.userInfo.cnname},on:{click:function(t){return e.toggleNicknameModal(!0)}}}),a("van-cell",{attrs:{icon:e.lock,title:"修改密码","is-link":""},on:{click:function(t){return e.togglePasswordModal(!0)}}}),a("van-cell",{attrs:{icon:"user-circle-o",title:"修改头像","is-link":""},on:{click:function(t){return e.$router.push({name:"userHeads"})}}}),a("van-cell",{attrs:{icon:"info-o",title:"当前版本",value:e.version}}),a("div",{staticClass:"p_y25 m_t25 flex-row justify-center"},[a("van-button",{staticStyle:{width:"80%"},attrs:{round:"",type:"danger"},on:{click:e.onLogout}},[e._v("退出登录")])],1)],1),a("van-dialog",{attrs:{"close-on-click-overlay":!0,"before-close":e.beforeCloseNicknameModal,title:"修改昵称","show-cancel-button":""},model:{value:e.nickname.show,callback:function(t){e.$set(e.nickname,"show",t)},expression:"nickname.show"}},[a("div",{staticClass:"p_y20 p_x20"},[a("van-field",{staticClass:"field-border radius5",attrs:{clearable:"","left-icon":"contact",placeholder:"请输入昵称"},model:{value:e.nickname.value,callback:function(t){e.$set(e.nickname,"value",t)},expression:"nickname.value"}})],1)]),a("van-dialog",{attrs:{"close-on-click-overlay":!0,"before-close":e.beforeClosePasswordModal,title:"修改密码","show-cancel-button":""},model:{value:e.password.show,callback:function(t){e.$set(e.password,"show",t)},expression:"password.show"}},[a("div",{staticClass:"p_y20 p_x20"},[a("van-field",{staticClass:"field-border radius5 m_y5",attrs:{clearable:"",type:"password","left-icon":e.lock,placeholder:"请输入旧密码"},model:{value:e.password.oldValue,callback:function(t){e.$set(e.password,"oldValue",t)},expression:"password.oldValue"}}),a("van-field",{staticClass:"field-border radius5 m_y5",attrs:{clearable:"",type:"password","left-icon":e.lock,placeholder:"请输入新密码"},model:{value:e.password.newValue,callback:function(t){e.$set(e.password,"newValue",t)},expression:"password.newValue"}}),a("van-field",{staticClass:"field-border radius5 m_y5",attrs:{clearable:"",type:"password","left-icon":e.lock,placeholder:"请输入确认密码"},model:{value:e.password.reValue,callback:function(t){e.$set(e.password,"reValue",t)},expression:"password.reValue"}})],1)])],1)},r=[],n=(a("a4d3"),a("4de4"),a("4160"),a("e439"),a("dbb4"),a("b64b"),a("d3b7"),a("159b"),a("96cf"),a("ade3")),o=a("3a48"),c=a("2f62"),l=a("a104"),i=a.n(l),u=a("2fa3"),d=a("d399"),p=a("f121");function f(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}function w(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?f(Object(a),!0).forEach((function(t){Object(n["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):f(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var b={data:function(){return{userHeads:o["c"],lock:i.a,version:p["a"].version,nickname:{show:!1,value:""},password:{show:!1,oldValue:"",newValue:"",reValue:""}}},computed:w({},Object(c["b"])(["userInfo"])),created:function(){this.$store.dispatch("getUserInfo")},methods:{togglePasswordModal:function(e){var t=Object(u["i"])(e)?e:!this.password.show,a={oldValue:"",newValue:"",reValue:"",show:t};this.password=a},toggleNicknameModal:function(e){var t=Object(u["i"])(e)?e:!this.nickname.show,a={};a.value=t?this.userInfo.cnname:"",a.show=t,this.nickname=a},beforeCloseNicknameModal:function(e,t){var a,s;return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:if("confirm"!==e){r.next=13;break}if(a=this.nickname.value,!Object(u["j"])(a)){r.next=5;break}return Object(d["a"])("昵称不能为空"),r.abrupt("return",t(!1));case 5:if(a!==this.userInfo.cnname){r.next=7;break}return r.abrupt("return",t());case 7:return r.next=9,regeneratorRuntime.awrap(this.$store.dispatch("setUserInfoEdit",{type:2,value:a}));case 9:s=r.sent,t(s),r.next=14;break;case 13:t();case 14:case"end":return r.stop()}}),null,this)},beforeClosePasswordModal:function(e,t){var a,s;return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:if("confirm"!==e){r.next=14;break}if(a=this.password,!(Object(u["j"])(a.oldValue)||Object(u["j"])(a.newValue)||Object(u["j"])(a.reValue))){r.next=5;break}return Object(d["a"])("密码不能为空"),r.abrupt("return",t(!1));case 5:if(a.newValue===a.reValue){r.next=8;break}return Object(d["a"])("两次输入密码不相同"),r.abrupt("return",t(!1));case 8:return r.next=10,regeneratorRuntime.awrap(this.$store.dispatch("setUserChangePass",{old_pass:a.oldValue,new_pass:a.newValue,new_passconfirm:a.reValue}));case 10:s=r.sent,t(s),r.next=15;break;case 14:t();case 15:case"end":return r.stop()}}),null,this)},onLogout:function(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(this.$store.dispatch("userLogout"));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e["catch"](0),console.log(e.t0);case 8:case"end":return e.stop()}}),null,this,[[0,5]])}}},v=b,h=(a("b0cb"),a("2877")),g=Object(h["a"])(v,s,r,!1,null,"8ce8c210",null);t["default"]=g.exports}}]);
//# sourceMappingURL=userInfo.e65a8287.js.map