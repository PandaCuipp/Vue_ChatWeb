(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chat~home"],{"12f2":function(e,t,n){"use strict";var r=n("8a57"),i=n.n(r);i.a},"1ebd":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACUUlEQVRYR71XTXrTMBDVWNlTTtBwAuJP42xpT0BvQHsCwgloT4B7AtITFE6A2cby53ACwg2SdWwP37SWSVT/NKmENl5Ymvf0NDN6AnHEyPN8vN1uT6WUZ2Z5VVXL0Wj0KwzD1SEh4ZDJWZZdEtFHIcSkZ90KAOZBENyGYbgeiv8sAnmen5Rl+WMA2MZi8CtE/NZHYpDAkeANJgBcKaXmXSQGCWRZlhDRuyEp+/4T0XkURUnbnF4CWZbNiOjLS8DrtQkinh9EoJb+txDixAEBUVVVOJ1Ol3asTgXqjP/qAryOcYuIs2cT0Fpz9r53RQAAfiqlmr5h4vYp8OLks8kj4hO8VgLc6cqy5PN3OtqqoZWA1vpCCHHvFP0x2HdE5Nj/+kQbiOvz38Wwj6FLAW6jrzwo8AcRx70K1OXHzcdJ/VubWEkpw91Lak8BD7XfJuIdIl4+KcM0Tc8AgG8870NK+cb4hkYBrTUbiVPv6I8AjQoPBP6T9Ht7k1K+5lx4IOCz7LoUNT7BEPBVdp0nSkQ3URRdGwJUz9zUXx89YI9MKwEA+EREbDg/+EhGBgWAzxybsZRSsVEgJqI1S+KxHDdSynFRFDMAmEkpJ1yKXa04FkKw/XY2zI7tgJ1+QGvNTtbVUex1v967YKcvMDjng4s7YQ0AsVLqZlABz01piYhhrwJpml6bTHWWADuBBv1Abcf5EfF2gMCGiOIgCFZ16bLT6btLNpz99iupMwkXi8UEAC4AgL9NHnC5AkASBMHcfnyylyyKgg2H7X6To15GPo7AjvkXupINMBiJqUoAAAAASUVORK5CYII="},"221d":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.ballArrays&&5===e.ballArrays.length?n("cBall",{attrs:{balls:e.ballArrays,width:e.width,height:e.height,marginLeft:e.marginLeft,marginRight:e.marginRight,ballClass:e.ballClass}}):n("sBall",{attrs:{balls:e.ballArrays,width:e.width,height:e.height,marginLeft:e.marginLeft,marginRight:e.marginRight,ballClass:e.ballClass}})},i=[],o=(n("a9e3"),n("ac1f"),n("1276"),n("2fa3")),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"flex-row justify-center c-ball-app"},e._l(e.ballArrays,(function(t){return n("div",{class:["ball","ball-bg"+t,e.ballClass],style:e.ballStyle})})),0)},a=[],l={name:"cBall",props:{balls:[String,Array],width:[String,Number],height:[String,Number],marginLeft:[String,Number],marginRight:[String,Number],ballClass:String},computed:{ballArrays:function(){return Object(o["p"])(this.balls)?this.balls.split(","):this.balls},ballStyle:function(){var e=this.width,t=this.height,n=this.marginLeft,r=this.marginRight,i={};return e&&(e=Object(o["m"])(e)?"".concat(e,"px"):e,i.width=e),t&&(t=Object(o["m"])(t)?"".concat(t,"px"):t,i.height=t),n&&(n=Object(o["m"])(n)?"".concat(e,"px"):n,i.marginLeft=n),r&&(r=Object(o["m"])(r)?"".concat(r,"px"):r,i.marginRight=r),i}}},u=l,c=(n("12f2"),n("2877")),f=Object(c["a"])(u,s,a,!1,null,"bb22bae0",null),d=f.exports,h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"flex-row justify-center s-ball-app"},e._l(e.ballArrays,(function(t){return n("div",{class:["ball","ball-bg"+t,e.ballClass],style:e.ballStyle})})),0)},m=[],y={name:"sBall",props:{balls:[String,Array],width:[String,Number],height:[String,Number],marginLeft:[String,Number],marginRight:[String,Number],ballClass:String},computed:{ballArrays:function(){return Object(o["p"])(this.balls)?this.balls.split(","):this.balls},ballStyle:function(){var e=this.width,t=this.height,n=this.marginLeft,r=this.marginRight,i={};return e&&(e=Object(o["m"])(e)?"".concat(e,"px"):e,i.width=e),t&&(t=Object(o["m"])(t)?"".concat(t,"px"):t,i.height=t),(Object(o["m"])(n)||Object(o["p"])(n))&&(n=Object(o["m"])(n)?"".concat(e,"px"):n,i.marginLeft=n),(Object(o["m"])(r)||Object(o["p"])(r))&&(r=Object(o["m"])(r)?"".concat(r,"px"):r,i.marginRight=r),i}}},p=y,g=(n("6f55"),Object(c["a"])(p,h,m,!1,null,"396f95ca",null)),b=g.exports,v={name:"Balls",components:{cBall:d,sBall:b},props:{balls:[String,Array],width:[String,Number],height:[String,Number],marginLeft:[String,Number],marginRight:[String,Number],ballClass:String},computed:{ballArrays:function(){return Object(o["p"])(this.balls)?this.balls.split(","):this.balls}}},A=v,S=Object(c["a"])(A,r,i,!1,null,"bb4fc032",null);t["a"]=S.exports},"3c34":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAgCAYAAACRpmGNAAAD9klEQVRYR82XTYgcRRTH/69mdzHE8aIHNX4EFFSCyzD1ened3UNCVDAhIAYDARdijsGIYkSTS5KLRBMTD+pJSVAEPxEPigvRXSHu4lT1uEEnGYKJoiQHF3LIHDK7zPaTWmaWnklPT/fE6BY0TNf8X71fvap6r5qwghutYDYkgiuXywO1Wm0zgEERWQ/gbgB3AbgI4BcAZ4joXL1e/3V4eNj+WxOOhatUKtlqtbpbKfWMiDyUxCkRfSgix5l5Mok+TtMRrlQqbQyC4DUAQz06+UoptS+fz5/p0T56Wa21TwP4tNdBQ3ZlpdS2XgGviZy19kkAX0aATQFw+y2uRWl6BmyBm56eXjMwMHASwIMhgikROeh53pQxZj0R7Y+C7OvreyCXy53roPGZmdOuRAuc7/vHROSF8CAissGBNfsazls2u4i84XneK3EaItqptT6eBrAFzlr7M4BcWjgiOqC1PtgFzmitUx2uZbjJycmbstns1Q577V1m/qxxUHZFLWsQBM8ODQ2dcBoR2UVEbn9eAXBWRE4rpS4R0al8Pv9d0ugtw1lr3T47m9Swi+6IUsqv1+t9Sqm1AO5pPJdF5AKAv9zjed43ifJcsVgsKKV+vE64iSAIDiulHgHwKoDVXcabEJFD4T0d1ocjdx+A33qFE5FjAH4gIgc1knKcI8z8crtNeM/dnM1mqykHbcqniGiviHwPYFUvYxDR21rr3ZGRc52+738gIuMpB58LgmB7JpM5KiKDbbadEncNwHkA61pgiF7UWr/V7GtPJY8DmEgJt0dECkT0VJvdCDP/NDMzs7a/v9/lRXcwXDtRq9WeHxsbqxaLxR1KqZbcR0RPaK2/dcJrypfv+/tF5EBSQCLaKCKfALhtecZEJ7XWjzXfrbUOYId7b6Yc97sB/nubrzeZeU8knOs0xnxNRJuSAGYymbHFxcVTEdqPROQ9AJuIKLzZ/wDwMYASEY2LyJa2pT2ttV4qBB2vTMaYz4loaxfAiogcJqL3k0wkheZeZv4z9rKZYIlLIvLODYC7n5nPd4O7KCJ3xsx4jogedeUpRVS6SSvMvHTr7ghnrb0DwKUlUaOwW2sfBhB+VjPzBmvtXPhAdPPe5f9DzLw3Fq6xpLfMz8+/Pjo6+nfcgMaYLyJSSa+Mg8zsPpo6R252dnZdLpcrJ/FQLBZvz2Qyrk62J+Ek5mHNNnf7WU5Jaa076X3fH7nO8tVyJ4yNXC/Qvu9vEZHnALhKk6YdZeaX2g0SfVSn8eK0xphxInKQiW6+CwsLtxYKhcv/CVzTScTpvtK4bLoL54Xmx5KIbPc8z1WNlnZDIpcm0saYrUqpzVrrnSsOLm4i/3vk4uD+AQ38lDASAIfrAAAAAElFTkSuQmCC"},"6f55":function(e,t,n){"use strict";var r=n("bcc9"),i=n.n(r);i.a},7037:function(e,t,n){function r(e){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function i(e){return i="function"===typeof Symbol&&"symbol"===r(Symbol.iterator)?function(e){return r(e)}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":r(e)},i(e)}function o(t){return"function"===typeof Symbol&&"symbol"===i(Symbol.iterator)?e.exports=o=function(e){return i(e)}:e.exports=o=function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":i(e)},o(t)}n("a4d3"),n("e01a"),n("d28b"),n("e260"),n("d3b7"),n("3ca3"),n("ddb0"),e.exports=o},"8a57":function(e,t,n){},"8c7b":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACLElEQVRYR+2Xv2sTYRjHP8+luoi5NNDB4uakIIJ2MhdJcVVBzWVybgedrCBIoXXSQUcH6z9Qc4KDDjqIkb5FHFQcdOqsi+RHRQrF3CNJDPnB5ceZpCHiCwfHe/c8z+f5fo+X54QxLxlzff4KwPFKDwAXmAnXgOSA+8aNPq/HhQY4vV48YkVkC7gK/pdwANY94Jlx7duhAJLZH8dU/GXQQ7VASYF41VvVKMLb5qSdoByvtFKJNW50PhAg9bQQK++SUss60ZpEXIEtRT92SL4KVK62MF6YtP2uvtkTwMkWFxB5CFWvmpamagX8N8EAkRVUZxH52hZ30Lj2XP8A3vZr0Fy7nI5XWALrFhAPBpDPUL5m3OkWcMcrKfjz9f3eCnQACPehNd6efIDEk59zor+uI/KtLxV83TEZe7nJ88EsSHiFS0JkFfQ48KoLxFlgF+WlydgXhgbQV9ddXpr8byD5OH9Frak7oIdrByAfAhtWTv7ZN8a1k0Oz4Mz696Nl2Zfu2wpLdjbdaOW8r67Jt6DSxals3g5S4H0mXuqlzMAKON72TdC7QYVEdGEjHXvUDWJggEryRDbvBBXZzMTNyBXoVaDX86Eo0KvIyC34D/APKNA83mkK1UWTia3VG2sZy52RTESNYVV8/1NkP7ncxeniHgI0ZsLAA615szY0ch78G4N4X4uVGZCsWFOzG5cPdJyo2i04ByxBdQwffImsmXR0sVui0L9mg1O1Zhg7wG/uds4w4HTZCAAAAABJRU5ErkJggg=="},b311:function(e,t,n){
/*!
 * clipboard.js v2.0.4
 * https://zenorocha.github.io/clipboard.js
 * 
 * Licensed MIT © Zeno Rocha
 */
(function(t,n){e.exports=n()})(0,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(1),s=f(o),a=n(3),l=f(a),u=n(4),c=f(u);function f(e){return e&&e.__esModule?e:{default:e}}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function m(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var y=function(e){function t(e,n){d(this,t);var r=h(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return r.resolveOptions(n),r.listenClick(e),r}return m(t,e),i(t,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"===typeof e.action?e.action:this.defaultAction,this.target="function"===typeof e.target?e.target:this.defaultTarget,this.text="function"===typeof e.text?e.text:this.defaultText,this.container="object"===r(e.container)?e.container:document.body}},{key:"listenClick",value:function(e){var t=this;this.listener=(0,c.default)(e,"click",(function(e){return t.onClick(e)}))}},{key:"onClick",value:function(e){var t=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new s.default({action:this.action(t),target:this.target(t),text:this.text(t),container:this.container,trigger:t,emitter:this})}},{key:"defaultAction",value:function(e){return p("action",e)}},{key:"defaultTarget",value:function(e){var t=p("target",e);if(t)return document.querySelector(t)}},{key:"defaultText",value:function(e){return p("text",e)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],t="string"===typeof e?[e]:e,n=!!document.queryCommandSupported;return t.forEach((function(e){n=n&&!!document.queryCommandSupported(e)})),n}}]),t}(l.default);function p(e,t){var n="data-clipboard-"+e;if(t.hasAttribute(n))return t.getAttribute(n)}e.exports=y},function(e,t,n){"use strict";var r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(2),s=a(o);function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var u=function(){function e(t){l(this,e),this.resolveOptions(t),this.initSelection()}return i(e,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var e=this,t="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[t?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,s.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,s.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(e){this.emitter.emit(e?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(e){if(void 0!==e){if(!e||"object"!==("undefined"===typeof e?"undefined":r(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function(){return this._target}}]),e}();e.exports=u},function(e,t){function n(e){var t;if("SELECT"===e.nodeName)e.focus(),t=e.value;else if("INPUT"===e.nodeName||"TEXTAREA"===e.nodeName){var n=e.hasAttribute("readonly");n||e.setAttribute("readonly",""),e.select(),e.setSelectionRange(0,e.value.length),n||e.removeAttribute("readonly"),t=e.value}else{e.hasAttribute("contenteditable")&&e.focus();var r=window.getSelection(),i=document.createRange();i.selectNodeContents(e),r.removeAllRanges(),r.addRange(i),t=r.toString()}return t}e.exports=n},function(e,t){function n(){}n.prototype={on:function(e,t,n){var r=this.e||(this.e={});return(r[e]||(r[e]=[])).push({fn:t,ctx:n}),this},once:function(e,t,n){var r=this;function i(){r.off(e,i),t.apply(n,arguments)}return i._=t,this.on(e,i,n)},emit:function(e){var t=[].slice.call(arguments,1),n=((this.e||(this.e={}))[e]||[]).slice(),r=0,i=n.length;for(r;r<i;r++)n[r].fn.apply(n[r].ctx,t);return this},off:function(e,t){var n=this.e||(this.e={}),r=n[e],i=[];if(r&&t)for(var o=0,s=r.length;o<s;o++)r[o].fn!==t&&r[o].fn._!==t&&i.push(r[o]);return i.length?n[e]=i:delete n[e],this}},e.exports=n},function(e,t,n){var r=n(5),i=n(6);function o(e,t,n){if(!e&&!t&&!n)throw new Error("Missing required arguments");if(!r.string(t))throw new TypeError("Second argument must be a String");if(!r.fn(n))throw new TypeError("Third argument must be a Function");if(r.node(e))return s(e,t,n);if(r.nodeList(e))return a(e,t,n);if(r.string(e))return l(e,t,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function s(e,t,n){return e.addEventListener(t,n),{destroy:function(){e.removeEventListener(t,n)}}}function a(e,t,n){return Array.prototype.forEach.call(e,(function(e){e.addEventListener(t,n)})),{destroy:function(){Array.prototype.forEach.call(e,(function(e){e.removeEventListener(t,n)}))}}}function l(e,t,n){return i(document.body,e,t,n)}e.exports=o},function(e,t){t.node=function(e){return void 0!==e&&e instanceof HTMLElement&&1===e.nodeType},t.nodeList=function(e){var n=Object.prototype.toString.call(e);return void 0!==e&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in e&&(0===e.length||t.node(e[0]))},t.string=function(e){return"string"===typeof e||e instanceof String},t.fn=function(e){var t=Object.prototype.toString.call(e);return"[object Function]"===t}},function(e,t,n){var r=n(7);function i(e,t,n,r,i){var o=s.apply(this,arguments);return e.addEventListener(n,o,i),{destroy:function(){e.removeEventListener(n,o,i)}}}function o(e,t,n,r,o){return"function"===typeof e.addEventListener?i.apply(null,arguments):"function"===typeof n?i.bind(null,document).apply(null,arguments):("string"===typeof e&&(e=document.querySelectorAll(e)),Array.prototype.map.call(e,(function(e){return i(e,t,n,r,o)})))}function s(e,t,n,i){return function(n){n.delegateTarget=r(n.target,t),n.delegateTarget&&i.call(e,n)}}e.exports=o},function(e,t){var n=9;if("undefined"!==typeof Element&&!Element.prototype.matches){var r=Element.prototype;r.matches=r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector}function i(e,t){while(e&&e.nodeType!==n){if("function"===typeof e.matches&&e.matches(t))return e;e=e.parentNode}}e.exports=i}])}))},bcc9:function(e,t,n){},c61e:function(e,t,n){n("a15b"),n("0d03"),n("b680"),n("d3b7"),n("ac1f"),n("25f0"),n("1276");var r=n("7037");
/**
 * @license countdown.js v2.6.0 http://countdownjs.org
 * Copyright (c)2006-2014 Stephen M. McKamey.
 * Licensed under The MIT License.
 */(function(e){"use strict";var t=1,n=2,i=4,o=8,s=16,a=32,l=64,u=128,c=256,f=512,d=1024,h=u|l|s|o|i|n,m=1e3,y=60,p=60,g=24,b=g*p*y*m,v=7,A=12,S=10,w=10,k=10,E=Math.ceil,x=Math.floor;function T(e,t){var n=e.getTime();return e.setMonth(e.getMonth()+t),Math.round((e.getTime()-n)/b)}function N(e){var t=e.getTime(),n=new Date(t);return n.setMonth(e.getMonth()+1),Math.round((n.getTime()-t)/b)}function M(e){var t=e.getTime(),n=new Date(t);return n.setFullYear(e.getFullYear()+1),Math.round((n.getTime()-t)/b)}function O(e,t){if(t=t instanceof Date||null!==t&&isFinite(t)?new Date(+t):new Date,!e)return t;var n=+e.value||0;return n?(t.setTime(t.getTime()+n),t):(n=+e.milliseconds||0,n&&t.setMilliseconds(t.getMilliseconds()+n),n=+e.seconds||0,n&&t.setSeconds(t.getSeconds()+n),n=+e.minutes||0,n&&t.setMinutes(t.getMinutes()+n),n=+e.hours||0,n&&t.setHours(t.getHours()+n),n=+e.weeks||0,n&&(n*=v),n+=+e.days||0,n&&t.setDate(t.getDate()+n),n=+e.months||0,n&&t.setMonth(t.getMonth()+n),n=+e.millennia||0,n&&(n*=k),n+=+e.centuries||0,n&&(n*=w),n+=+e.decades||0,n&&(n*=S),n+=+e.years||0,n&&t.setFullYear(t.getFullYear()+n),t)}var C,L,R,j,D,F,H,B,K=0,Y=1,I=2,P=3,V=4,X=5,z=6,U=7,J=8,Z=9,W=10;function Q(e,t){return H(e)+(1===e?C[t]:L[t])}function q(){}function _(e,t){switch(t){case"seconds":if(e.seconds!==y||isNaN(e.minutes))return;e.minutes++,e.seconds=0;case"minutes":if(e.minutes!==p||isNaN(e.hours))return;e.hours++,e.minutes=0;case"hours":if(e.hours!==g||isNaN(e.days))return;e.days++,e.hours=0;case"days":if(e.days!==v||isNaN(e.weeks))return;e.weeks++,e.days=0;case"weeks":if(e.weeks!==N(e.refMonth)/v||isNaN(e.months))return;e.months++,e.weeks=0;case"months":if(e.months!==A||isNaN(e.years))return;e.years++,e.months=0;case"years":if(e.years!==S||isNaN(e.decades))return;e.decades++,e.years=0;case"decades":if(e.decades!==w||isNaN(e.centuries))return;e.centuries++,e.decades=0;case"centuries":if(e.centuries!==k||isNaN(e.millennia))return;e.millennia++,e.centuries=0}}function G(e,t,n,r,i,o){return e[n]>=0&&(t+=e[n],delete e[n]),t/=i,t+1<=1?0:e[r]>=0?(e[r]=+(e[r]+t).toFixed(o),_(e,r),0):t}function $(e,t){var n=G(e,0,"milliseconds","seconds",m,t);if(n&&(n=G(e,n,"seconds","minutes",y,t),n&&(n=G(e,n,"minutes","hours",p,t),n&&(n=G(e,n,"hours","days",g,t),n&&(n=G(e,n,"days","weeks",v,t),n&&(n=G(e,n,"weeks","months",N(e.refMonth)/v,t),n&&(n=G(e,n,"months","years",M(e.refMonth)/N(e.refMonth),t),n&&(n=G(e,n,"years","decades",S,t),n&&(n=G(e,n,"decades","centuries",w,t),n&&(n=G(e,n,"centuries","millennia",k,t),n))))))))))throw new Error("Fractional unit overflow")}function ee(e){var t;e.milliseconds<0?(t=E(-e.milliseconds/m),e.seconds-=t,e.milliseconds+=t*m):e.milliseconds>=m&&(e.seconds+=x(e.milliseconds/m),e.milliseconds%=m),e.seconds<0?(t=E(-e.seconds/y),e.minutes-=t,e.seconds+=t*y):e.seconds>=y&&(e.minutes+=x(e.seconds/y),e.seconds%=y),e.minutes<0?(t=E(-e.minutes/p),e.hours-=t,e.minutes+=t*p):e.minutes>=p&&(e.hours+=x(e.minutes/p),e.minutes%=p),e.hours<0?(t=E(-e.hours/g),e.days-=t,e.hours+=t*g):e.hours>=g&&(e.days+=x(e.hours/g),e.hours%=g);while(e.days<0)e.months--,e.days+=T(e.refMonth,1);e.days>=v&&(e.weeks+=x(e.days/v),e.days%=v),e.months<0?(t=E(-e.months/A),e.years-=t,e.months+=t*A):e.months>=A&&(e.years+=x(e.months/A),e.months%=A),e.years>=S&&(e.decades+=x(e.years/S),e.years%=S,e.decades>=w&&(e.centuries+=x(e.decades/w),e.decades%=w,e.centuries>=k&&(e.millennia+=x(e.centuries/k),e.centuries%=k)))}function te(e,r,h,b){var E=0;!(r&d)||E>=h?(e.centuries+=e.millennia*k,delete e.millennia):e.millennia&&E++,!(r&f)||E>=h?(e.decades+=e.centuries*w,delete e.centuries):e.centuries&&E++,!(r&c)||E>=h?(e.years+=e.decades*S,delete e.decades):e.decades&&E++,!(r&u)||E>=h?(e.months+=e.years*A,delete e.years):e.years&&E++,!(r&l)||E>=h?(e.months&&(e.days+=T(e.refMonth,e.months)),delete e.months,e.days>=v&&(e.weeks+=x(e.days/v),e.days%=v)):e.months&&E++,!(r&a)||E>=h?(e.days+=e.weeks*v,delete e.weeks):e.weeks&&E++,!(r&s)||E>=h?(e.hours+=e.days*g,delete e.days):e.days&&E++,!(r&o)||E>=h?(e.minutes+=e.hours*p,delete e.hours):e.hours&&E++,!(r&i)||E>=h?(e.seconds+=e.minutes*y,delete e.minutes):e.minutes&&E++,!(r&n)||E>=h?(e.milliseconds+=e.seconds*m,delete e.seconds):e.seconds&&E++,r&t&&!(E>=h)||$(e,b)}function ne(e,t,n,r,i,o){var s=new Date;if(e.start=t=t||s,e.end=n=n||s,e.units=r,e.value=n.getTime()-t.getTime(),e.value<0){var a=n;n=t,t=a}e.refMonth=new Date(t.getFullYear(),t.getMonth(),15,12,0,0);try{e.millennia=0,e.centuries=0,e.decades=0,e.years=n.getFullYear()-t.getFullYear(),e.months=n.getMonth()-t.getMonth(),e.weeks=0,e.days=n.getDate()-t.getDate(),e.hours=n.getHours()-t.getHours(),e.minutes=n.getMinutes()-t.getMinutes(),e.seconds=n.getSeconds()-t.getSeconds(),e.milliseconds=n.getMilliseconds()-t.getMilliseconds(),ee(e),te(e,r,i,o)}finally{delete e.refMonth}return e}function re(e){return e&t?m/30:e&n?m:e&i?m*y:e&o?m*y*p:e&s?m*y*p*g:m*y*p*g*v}function ie(e,t,n,i,o){var s;n=+n||h,i=i>0?i:NaN,o=o>0?o<20?Math.round(o):20:0;var a=null;"function"===typeof e?(s=e,e=null):e instanceof Date||(null!==e&&isFinite(e)?e=new Date(+e):("object"===r(a)&&(a=e),e=null));var l=null;if("function"===typeof t?(s=t,t=null):t instanceof Date||(null!==t&&isFinite(t)?t=new Date(+t):("object"===r(t)&&(l=t),t=null)),a&&(e=O(a,t)),l&&(t=O(l,e)),!e&&!t)return new q;if(!s)return ne(new q,e,t,n,i,o);var u,c=re(n),f=function(){s(ne(new q,e,t,n,i,o),u)};return f(),u=setInterval(f,c)}q.prototype.toString=function(e){var t=B(this),n=t.length;if(!n)return e?""+e:D;if(1===n)return t[0];var r=R+t.pop();return t.join(j)+r},q.prototype.toHTML=function(e,t){e=e||"span";var n=B(this),r=n.length;if(!r)return t=t||D,t?"<"+e+">"+t+"</"+e+">":t;for(var i=0;i<r;i++)n[i]="<"+e+">"+n[i]+"</"+e+">";if(1===r)return n[0];var o=R+n.pop();return n.join(j)+o},q.prototype.addTo=function(e){return O(this,e)},B=function(e){var t=[],n=e.millennia;return n&&t.push(F(n,W)),n=e.centuries,n&&t.push(F(n,Z)),n=e.decades,n&&t.push(F(n,J)),n=e.years,n&&t.push(F(n,U)),n=e.months,n&&t.push(F(n,z)),n=e.weeks,n&&t.push(F(n,X)),n=e.days,n&&t.push(F(n,V)),n=e.hours,n&&t.push(F(n,P)),n=e.minutes,n&&t.push(F(n,I)),n=e.seconds,n&&t.push(F(n,Y)),n=e.milliseconds,n&&t.push(F(n,K)),t},ie.MILLISECONDS=t,ie.SECONDS=n,ie.MINUTES=i,ie.HOURS=o,ie.DAYS=s,ie.WEEKS=a,ie.MONTHS=l,ie.YEARS=u,ie.DECADES=c,ie.CENTURIES=f,ie.MILLENNIA=d,ie.DEFAULTS=h,ie.ALL=d|f|c|u|l|a|s|o|i|n|t;var oe=ie.setFormat=function(e){if(e){if("singular"in e||"plural"in e){var t=e.singular||[];t.split&&(t=t.split("|"));var n=e.plural||[];n.split&&(n=n.split("|"));for(var r=K;r<=W;r++)C[r]=t[r]||C[r],L[r]=n[r]||L[r]}"string"===typeof e.last&&(R=e.last),"string"===typeof e.delim&&(j=e.delim),"string"===typeof e.empty&&(D=e.empty),"function"===typeof e.formatNumber&&(H=e.formatNumber),"function"===typeof e.formatter&&(F=e.formatter)}},se=ie.resetFormat=function(){C=" millisecond| second| minute| hour| day| week| month| year| decade| century| millennium".split("|"),L=" milliseconds| seconds| minutes| hours| days| weeks| months| years| decades| centuries| millennia".split("|"),R=" and ",j=", ",D="",H=function(e){return e},F=Q};ie.setLabels=function(e,t,n,r,i,o,s){oe({singular:e,plural:t,last:n,delim:r,empty:i,formatNumber:o,formatter:s})},ie.resetLabels=se,se(),e&&e.exports?e.exports=ie:"function"===typeof window.define&&"undefined"!==typeof window.define.amd&&window.define("countdown",[],(function(){return ie}))})(e)}}]);
//# sourceMappingURL=chat~home.8adba228.js.map