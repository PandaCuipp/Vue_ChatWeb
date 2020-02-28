<template>
    <div id="app" class="text-black">
        <div>
            <audio :ref="soundRef.kaijiang" :src="require('./assets/mp3/kaijiangle.mp3')"></audio>
            <audio :ref="soundRef.fengpan" :src="require('./assets/mp3/fengpanle.mp3')"></audio>
            <audio :ref="soundRef.xiazhu" :src="require('./assets/mp3/keyixiazhule.mp3')"></audio>
        </div>
        <router-view/>
    </div>
</template>
<script>/**
 * 支持无滚动条的页面以 Fullscreen api启动的全屏 或是 按f11启动的全屏
 * 不支持有滚动条的页面
 * @returns {boolean}
 */
import {mapGetters} from "vuex";
import config from "./config";
import AttachFastClick from "fastclick";
import {isFunction, isTrue} from "./utils/helpers";
import Loading from "./views/mixins/Loading";
import Vue from "vue";

function isFullscreenForNoScroll() {
    let explorer = window.navigator.userAgent.toLowerCase();
    if (explorer.indexOf('chrome') > 0) {//webkit
        if (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width) {
            return true;
        } else {
            return false;
        }
    } else {//IE 9+  fireFox
        if (window.outerHeight === window.screen.height && window.outerWidth === window.screen.width) {
            return true;
        } else {
            return false;
        }
    }
}

function checkFull() {
    //使用html5中的API判断是否全屏(返回当前全屏的元素)
    let FullEl = document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement;

    //若是不支持Html5中的API，可以使用以最原始的判断方式，但需要将页面的滚动条去掉
    if (FullEl === null) {
        return isFullscreenForNoScroll();
    }

    return true;
}

function fullScreen(el) {
    let rfs = el.requestFullScreen || el.webkitRequestFullScreen ||
        el.mozRequestFullScreen || el.msRequestFullScreen;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    } else if (typeof window.ActiveXObject != "undefined") {
        //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}

const SessionLoadingMessageKey = '__SessionLoadingMessageKey__'
export default {
    data() {
        return {
            soundRef: {
                kaijiang: '__kaijiangleSound',
                fengpan: '__fengpanleSound',
                xiazhu: '__keyixiazhuleSound',
            }
        }
    },
    async created() {
        this.initSocketOpen();
        this.$store.commit('setShowVideo');
        this.visibilityChange();
        // this._initShowLoading(SessionLoadingMessageKey);
    },
    mixins: [Loading],
    mounted() {
        // 点击全屏
        // this.fullScreen();
        this.onlyReadByWeixin();
        // ios双击缩放禁止
        this.prohibitScaling();
        this.initAudio();
        // this._closeLoading();
        if (isFunction(AttachFastClick)) {
            new AttachFastClick(document.body);
        }
    },
    computed: {
        ...mapGetters(['hasAudioSound', 'isConnected', 'connectCount']),
        isWeixin() {
            let userAgent = navigator.userAgent.toLowerCase(); //判断浏览器的类型
            return userAgent.indexOf('micromessenger') > -1;
        }
    },
    methods: {
        initSocketOpen() {
            this.$options.sockets.onopen = (event) => {
                Vue.prototype.$socket = event.currentTarget;
            }
        },
        visibilityChange() {
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') { // 解决ios等锁屏导致的socket断线不会重连问题
                    const meta = this.$route.meta || {};
                    if (meta.notToken) {
                        return;
                    }
                    if (!this.$socket && this.connectCount > 0 && !this.isConnected) {
                        // this.$store.commit('setCustomReconnect', true);
                        if (this.$socketObserver && typeof this.$socketObserver.reconnect === 'function') {
                            this._showLoading('重新连接中...');
                            this.$socketObserver.reconnect();
                        }
                        // this._setSessionLoadingMessage(SessionLoadingMessageKey, '重新连接中...');
                        // this._setSessionLoadingStatus(true);
                        // window.location.reload();
                    }
                }
            });
            this.$options.sockets.onopen = ({data}) => {
                this._closeLoading();
            }
        },
        prohibitScaling() {
            document.addEventListener('touchstart', function (event) {
                if (event.touches.length > 1) {
                    event.preventDefault();
                }
            });
            let lastTouchEnd = 0;
            document.addEventListener('touchend', function (event) {
                let now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
            document.addEventListener('gesturestart', function (event) {
                event.preventDefault();
            });
        },
        onlyReadByWeixin() {
            if (isTrue(config.onlyWx) && !this.isWeixin) {
                // 这里警告框会阻塞当前页面继续加载
                // alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
                // 以下代码是用javascript强行关闭当前页面
                window.location.href = "https://www.baidu.com/";
            }
        },
        initAudio() {
            this.$el.addEventListener('click', () => {
                if (!this.hasAudioSound) {
                    const {kaijiang, fengpan, xiazhu} = this.soundRef
                    this.$store.commit('setKaijiangSound', this.$refs[kaijiang]);
                    this.$store.commit('setFengpanSound', this.$refs[fengpan]);
                    this.$store.commit('setKeyixiazhuSound', this.$refs[xiazhu]);
                }

            });
        },
        fullScreen() {
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                return;
            }
            //这里的 el 可以是其他的页面元素，这样实现的就是这个元素的全屏，而不是整个页面的全屏
            if (checkFull()) {
                return;
            }
            fullScreen(document.documentElement);
            // ios
            setTimeout(() => {
                window.scrollTo(0, 1);
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    #app {
        width: 100%;
        max-width: 760px;
        min-width: 320px;
        min-height: 100vh;
        height: auto;
    }

</style>
