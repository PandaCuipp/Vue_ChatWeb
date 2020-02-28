<template>
    <div class="font14">


        <van-popup
                v-model="show"
                :overlay-style="{backgroundColor:'rgba(0,0,0,0)'}"
                position="top">
            <div class="animate">
                <iframe id="iframe1" style="height:100%;width:100%;border: none;"
                        src="./animate/ship/index.html"></iframe>
            </div>
            <div class="flex-row flex-wrap">
                <van-button class="m_y5" type="primary" size="mini" @click="startcountdown">倒计时</van-button>
                <van-button class="m_y5" type="primary" size="mini" @click="midgame">动画中期</van-button>
                <van-button class="m_y5" type="primary" size="mini" @click="finishgame">开奖</van-button>
                <van-button class="m_y5" type="primary" size="mini" @click="resultpage">出结果</van-button>
                <van-button class="m_y5" type="primary" size="mini" @click="showcurrentresult">顶部的号码
                </van-button>

                <van-button class="m_y5" type="primary" size="mini" @click="startGame">开始5</van-button>
                <van-button class="m_y5" type="primary" size="mini" @click="stopGame">结束5</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {formatMoney, isFunction, isObject} from "../utils/helpers";

    export default {
        data() {
            return {
                iFrame: null,
                iWindow: null,
                iDoc: null,
                iContainer: null,
                show: true,
                iFrameHeight: '20%',
            }
        },
        mounted() {
            // console.log("window", iwindow);//获取iframe的window对象
            // console.log("document", idoc);  //获取iframe的document
            // console.log("html", idoc.documentElement);//获取iframe的html
            // console.log("head", idoc.head);  //获取head
            // console.log("body", idoc.body);  //获取body
            this.iframeZoom();

        },
        methods: {
            startGame() {
                if (this.iWindow && isObject(this.iWindow.__animate) && isFunction(this.iWindow.__animate.startGame)) {
                    this.iWindow.__animate.startGame(true);
                }
            },
            stopGame() {
                if (this.iWindow && isObject(this.iWindow.__animate) && isFunction(this.iWindow.__animate.stopGame)) {
                    let dataStr = {
                        preDrawCode: [2, 4, 6, 4, 5],
                        sumNum: 12,
                        sumBigSmall: "小",
                        sumSingleDouble: "单",
                        drawIssue: "170517061",
                        drawTime: "00:00:60",
                    };
                    this.iWindow.__animate.stopGame("170517061", [0, 4, 6, 4, 5]);
                }
            },
            initCurrentData(beforeQihao, currentQihao, haoma) {
                if (this.iWindow && isObject(this.iWindow.__animate) && isFunction(this.iWindow.__animate.initCurrentData)) {
                    this.iWindow.__animate.initCurrentData(beforeQihao, currentQihao, haoma);
                }
            },
            // 倒计时3秒
            startcountdown() {
                if (this.iWindow && isObject(this.iWindow.__animate) && isFunction(this.iWindow.__animate.startcountdown)) {
                    this.iWindow.__animate.startcountdown();
                }

            },
            // 动画中期
            midgame() {
                if (this.iWindow && isObject(this.iWindow.__animate) && isFunction(this.iWindow.__animate.midgame)) {
                    this.iWindow.__animate.midgame();
                }
            },
            // 开奖（有开奖结果的动画缓冲）
            finishgame() {
                if (this.iWindow && isObject(this.iWindow.__animate) && isFunction(this.iWindow.__animate.finishgame)) {
                    this.iWindow.__animate.finishgame("5,2,6,9,8,7,4,10,1,3", (res) => {
                        console.log(res);
                    });
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

                setTimeout(function () {
                    const iFrame = document.getElementById("iframe1");
                    const iWindow = iFrame.window || iFrame.contentWindow;
                    const iDoc = iWindow.document;
                    const jqIframe = $('.animate iframe');
                    const iContainer = jqIframe.contents().find(".container")
                    const iframeWidth = iContainer.width();//1125

                    W = W || document.body.clientWidth || document.documentElement.clientWidth;
                    const H = W * iContainer.height() / iframeWidth;
                    const zoomW = formatMoney(W / iframeWidth, 6);
                    console.log(iframeWidth, W, W / iframeWidth, H, zoomW)
                    self.iFrame = iFrame;
                    self.iWindow = iWindow;
                    self.iDoc = iDoc;
                    self.iContainer = iContainer;
                    iDoc.documentElement.style.zoom = zoomW;
                    const iFrameHeight = H + 20;
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
                    self.initCurrentData('10001', '10002', "5,2,6,9,8,7,4,10,1,3")
                }, 200);
            }
        }
    }
</script>

<style scoped>

</style>
