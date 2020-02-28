import $ from 'jquery'
import {formatMoney, isFunction, isNumeric, isObject} from "../../utils/helpers";

export default {
    data() {
        return {
            iFrame: null,
            iWindow: null,
            iDoc: null,
            iContainer: null,
            showLoading: true,
            running: false,
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
        finishGame: Object,
        isRunMoment: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        this.iframeZoom();
    },
    watch: {
        countDown(time) {
            if (this.isRunMoment) {
                return;
            }
            if (!this.running && isNumeric(time)) {
                this.startcountdown(time, this.data.status < 1);
            }
        },
        // 开奖(有缓冲)
        finishGame(data) {
            if (data) {
                this.stopGame(data.qihao_before, data.haoma_before);
            }
        },
    },
    methods: {
        startGame() {
            if (this.iWindow && isObject(this.iWindow.__animate) && isFunction(this.iWindow.__animate.startGame)) {
                this.iWindow.__animate.startGame(true);
            }
        },
        stopGame(qihao, haoma, isInit = false) {
            if (this.iWindow && isObject(this.iWindow.__animate) && isFunction(this.iWindow.__animate.stopGame)) {
                this.iWindow.__animate.stopGame(qihao, haoma, () => {
                    this.running = false;
                    setTimeout(() => {
                        this.$emit('onReset');
                    }, 2000);
                }, isInit);

            }
        },
        // 设计倒计时
        startcountdown(time, isOpen = true) {
            if (this.iWindow && isObject(this.iWindow.__animate) && isFunction(this.iWindow.__animate.setCountDown)) {
                let otherText;
                if (isOpen && time == 0) {
                    this.running = true;
                    otherText = '开奖中......'
                    this.startGame();
                }
                const prefix = isOpen ? "<span style='color:red;'>封盘中</span>" : '距封盘 ';
                this.iWindow.__animate.setCountDown(time, prefix, otherText);
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
                    const zoomW = formatMoney(W / iframeWidth, 6);
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
                    const data = self.data;
                    self.stopGame(data.qihao_before, data.haoma_before, true);
                    self.showLoading = false;
                    if (self.isRunMoment) {
                        self.startcountdown(0);
                    }
                }
            });
        }
    }
}
