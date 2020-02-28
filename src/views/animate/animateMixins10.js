import $ from 'jquery'
import {bcAdd, formatMoney, isFunction, isNumeric, isObject} from "../../utils/helpers";

export default {
    data() {
        return {
            iFrame: null,
            iWindow: null,
            iDoc: null,
            iContainer: null,
            running: false,
            setCountDown: false,
            showLoading: true,
            iFrameHeight: '20%',
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object,
            default() {
                return {};
            }
        },
        // 更新倒计时
        countDown: [Number, String],
        // 开始3s倒计时
        startCountDown: {
            type: Boolean,
            default: false,
        },
        // 开奖(有缓冲)
        finishGame: String,
        isRunMoment: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        // console.log("window", iwindow);//获取iframe的window对象
        // console.log("document", idoc);  //获取iframe的document
        // console.log("html", idoc.documentElement);//获取iframe的html
        // console.log("head", idoc.head);  //获取head
        // console.log("body", idoc.body);  //获取body
        this.iframeZoom();
    },
    watch: {
        value(val) {
            if (val) {

            }
        },
        data(val) {
            if (val.qihao - val.qihao_before >= 2) {
                this.initCurrentData(val.qihao_before, Number(val.qihao_before) + 1, val.haoma_before);
            } else {
                this.initCurrentData(val.qihao_before, val.qihao, val.haoma_before);
            }

        },
        countDown(time) {
            if (this.isRunMoment) {
                return;
            }
            if (!this.running && isNumeric(time)) {
                this.setCountDown = true;
                this.startcountdown(time, this.data.status < 1);
            }
        },
        // 倒计时3s
        startCountDown(val) {
            if (this.isRunMoment) {
                return;
            }
            if (val) {
                this.startcountdown(3);
            }
        },
        // 开奖(有缓冲)
        finishGame(val) {
            if (val) {
                this.finishgame(val);
            }
        },
    },
    methods: {
        initCurrentData(beforeQihao, currentQihao, haoma) {
            if (this.iWindow && isObject(this.iWindow.__animate) && isFunction(this.iWindow.__animate.initCurrentData)) {
                this.iWindow.__animate.initCurrentData(beforeQihao, currentQihao, haoma);
            }
        },
        // 倒计时、复位
        startcountdown(time, isOpen = true) {
            if (this.iWindow && isObject(this.iWindow.__animate) && isFunction(this.iWindow.__animate.startcountdown)) {
                const self = this;
                const prefix = isOpen ?
                    "<span style='font-size: 0.6em;color:red;'>封盘中</span>" :
                    "<span style='font-size: 0.6em;'>距封盘</span>";
                this.iWindow.__animate.startcountdown(time, isOpen, prefix, (res) => {
                    self.running = true;
                    self.setCountDown = false;
                });
            }

        },
        // 动画中期
        midgame() {
            if (this.iWindow && isObject(this.iWindow.__animate) && isFunction(this.iWindow.__animate.midgame)) {
                this.iWindow.__animate.midgame();
            }
        },
        // 开奖（有开奖结果的动画缓冲）
        finishgame(val) {
            if (val && this.iWindow && isObject(this.iWindow.__animate) && isFunction(this.iWindow.__animate.finishgame)) {
                const self = this;
                this.iWindow.__animate.finishgame(val, res => {
                    self.running = false;
                    self.$emit('onReset');
                });
                setTimeout(() => {
                    this.startcountdown();
                }, 2000);
            }
        },
        // 出结果（最后一步）
        resultpage() {
            if (this.iWindow && isObject(this.iWindow.__animate) && isFunction(this.iWindow.__animate.resultpage)) {
                this.iWindow.__animate.resultpage("10,1,3,9,8,7,4,5,2,6", (res) => {
                    console.log(res);
                });
            }
        },
        // 改变顶部的号码
        showcurrentresult() {
            if (this.iWindow && isObject(this.iWindow.__animate) && isFunction(this.iWindow.__animate.showcurrentresult)) {
                this.iWindow.__animate.showcurrentresult("5,6,3,4,8,7,9,10,2,1");
            }
        },
        iframeZoom(W) {
            const self = this;
            $(function () {
                const iFrame = document.getElementById("iframe1");
                const iWindow = iFrame.window || iFrame.contentWindow;
                iWindow.onload = function () {
                    const iDoc = iWindow.document;
                    const jqIframe = $('.animate iframe');
                    const iContainer = jqIframe.contents().find(".container")
                    const iframeWidth = iContainer.width();//1125

                    W = W || document.body.clientWidth || document.documentElement.clientWidth;
                    const H = W * iContainer.height() / iframeWidth;
                    let zoomW = W / iframeWidth;
                    if (self.isCar) {
                        zoomW = bcAdd(zoomW, 0.01);
                    }
                    self.iFrame = iFrame;
                    self.iWindow = iWindow;
                    self.iDoc = iDoc;
                    self.iContainer = iContainer;
                    iDoc.documentElement.style.zoom = zoomW;
                    const iFrameHeight = H + 10;
                    self.iFrameHeight = iFrameHeight;
                    $(".animate").animate({
                        height: iFrameHeight
                    }, 600);
                    jqIframe.animate({
                        height: iFrameHeight
                    }, 600);
                    // $(".content").animate({
                    //     "height": H + 25
                    // }, 600);

                    jqIframe.contents().find(".container").fadeIn('slow');
                    jqIframe.contents().find("#preloader").fadeOut('slow');
                    const val = self.data;
                    self.initCurrentData(val.qihao_before, val.qihao, val.haoma_before);
                    self.showLoading = false;
                    if (self.isRunMoment) {
                        this.startcountdown(0);
                    }
                };
            });
        }
    }
}
