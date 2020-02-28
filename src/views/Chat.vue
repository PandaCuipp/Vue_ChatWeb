<template>
    <div class="app" v-cloak>
        <div class="car-audio">
            <!--            <audio :ref="carSoundRef.bg" loop="loop" :src="require('../assets/mp3/car/bg.mp3')"></audio>-->
            <!--            <audio :ref="carSoundRef.cuttime" :src="require('../assets/mp3/car/cuttime.mp3')"></audio>-->
            <!--            <audio :ref="carSoundRef.over" :src="require('../assets/mp3/car/over.mp3')"></audio>-->
            <audio :ref="carSoundRef.staring" loop="loop" :src="require('../assets/mp3/car/staring.mp3')"></audio>
        </div>
        <div class="ship-audio">
            <!--            <audio :ref="shipSoundRef.bg" loop="loop" :src="require('../assets/mp3/ship/bg.mp3')"></audio>-->
            <audio :ref="shipSoundRef.running" loop="loop" :src="require('../assets/mp3/ship/running.mp3')"></audio>
            <!--            <audio :ref="shipSoundRef.kaisound" :src="require('../assets/mp3/ship/kaisound.mp3')"></audio>-->
        </div>
        <div class="five-audio">
            <!--            <audio :ref="fiveSoundRef.bg" loop="loop" :src="require('../assets/mp3/five/bg.mp3')"></audio>-->
            <audio :ref="fiveSoundRef.run" loop="loop" :src="require('../assets/mp3/five/run.mp3')"></audio>
        </div>

        <van-nav-bar
                fixed
                class="bg-light-blue px-w100"
                :border="false"
        >
            <div class="router-back" @touchend="$store.commit('setTimerGameInfo',{}),$router.back()" slot="left">
                <van-icon color="white" name="arrow-left"/>
            </div>
            <div slot="title" class="flex-row justify-between">
                <div class="flex-row">
                    <div class="text-white font12 p_r10">
                        房号：
                        <span class="font12" style="color: #FFC600">{{userInfo.room_id}}</span>
                    </div>
                    <div class="text-white font12 p_r10">积分：{{todayResult.money|formatMoney}}</div>
                    <div class="text-white font12 p_r10">盈亏：{{todayResult.result|formatMoney}}</div>
                </div>
                <div class="p_r5">
                    <van-icon @click="$router.push({name:'peiLv',query:{game_id}})" name="refund-o" class="m_x5"
                              color="white" size="20"/>
                </div>
            </div>
        </van-nav-bar>
        <div class="flex-column p_b10 chat-body">
            <div class="flex-row bg-light-blue header p_x5 sub-header-1">
                <div class="flex-row align-center header-left" style="flex: 1.2">
                    <van-image @click="$router.push({name:'userInfo'})"
                               round
                               class="m_y5 bg-white"
                               width="34px"
                               height="34px"
                               v-if="timerGameInfo"
                               :src="timerGameInfo.ico"
                    />
                    <div class="p_l5">
                        <div @click="showAnimateVideoFun(qihao.qihao - qihao.qihao_before === 2)"
                             class="font14 text-white line20">
                            开奖直播
                            <van-icon name="play-circle-o"/>
                        </div>
                        <div class="font14  text-white line20" v-if="timerGameInfo.qihao">
                            {{ballQihaoBefore}}期结果
                        </div>
                    </div>
                </div>
                <div class="flex-column header-right" style="flex: 0.8">
                    <div class="text-white font14 line30 p_l10">
                        <template v-if="timerGameInfo.qihao">{{qihao.qihao||''}}</template>
                    </div>
                    <div class="flex-row justify-around chat-count-down-text">
                        <div class="text-white font14 line20">
                            <span v-if="qihao.status">距封盘</span>
                            <span v-else>封盘中</span>
                        </div>
                        <div :class="['font14','line20',qihao.status?'text-white':'text-red2']">
                            {{countDownTime[0]}}
                            {{countDownTime[1]}}
                            :
                            {{countDownTime[2]}}
                            {{countDownTime[3]}}
                        </div>
                    </div>
                </div>
            </div>
            <!--开奖栏start-->
            <div class="flex-row justify-center align-center bg-light-blue sub-header-2"
                 @click="toggleShowHistoryLists()">
                <Balls
                        class="p_x5 balls"
                        width="0.5rem"
                        height="0.5rem"
                        marginLeft="0.05rem"
                        marginRight="0.05rem"
                        v-if="timerGameInfo.qihao"
                        :balls="ballHaomaBefore"/>
                <div class="flex-row justify-center align-center" style="flex: 1;">
                    <div class="font12 text-white">
                        {{lh.name}}
                    </div>
                    <div class="font12 bg-white p_x5 flex-row justify-center align-center"
                         style="margin-bottom: 1px;margin-right: 2px">
                        <span :class="{'lh-item-span':haomaBefore.length===5}">{{lh.value}}</span>
                        <span :class="{'lh-item-span':haomaBefore.length===5}"
                              :style="{color:lh.dxColor}">{{lh.dx}}</span>
                        <span :class="{'lh-item-span':haomaBefore.length===5}"
                              :style="{color:lh.dsColor}">{{lh.ds}}</span>
                        <span :class="{'lh-item-span':haomaBefore.length===5}" :style="{color:lh.lhColor}" v-if="lh.lh">{{lh.lh}}</span>
                    </div>
                    <van-icon name="arrow-down" size="0.7em" color="white"/>
                </div>
            </div>
            <!--开奖栏end-->

            <!--公告栏start-->
            <van-notice-bar
                    class="notice-bar"
                    v-show="!showHistoryLists&&noticeShow&&agentNotice&&agentNotice.length"
                    mode="closeable"
                    :text="agentNotice"
                    :speed="30"
                    @close="onNoticeClose"
                    left-icon="volume-o"/>
            <!--公告栏end-->

            <!--开奖历史start-->
            <div v-if="showHistoryLists" style="z-index: 1">

                <cList v-if="haomaBefore.length===5"
                       :data="historyLists"
                       :loading="hLoading"
                       :finished="hFinished"
                       @onLoad="onHLoad"
                       @onRefresh="onHRefresh"
                       :isLoading="hIsLoading"/>
                <sList v-if="haomaBefore.length===10"
                       :data="historyLists"
                       :loading="hLoading"
                       :finished="hFinished"
                       @onLoad="onHLoad"
                       @onRefresh="onHRefresh"
                       :isLoading="hIsLoading"/>
            </div>
            <!--开奖历史end-->
            <!--聊天室start-->
            <my-chat :not-open="isGameNotOpen||isChatExpire" :show-time="false" :data="userChatHistoryLog"
                     :user="{_id:userInfo.id,avatar:userInfo.photo}"/>
            <!--聊天室end-->
        </div>


        <!--客服start-->
        <van-dialog
                :close-on-click-overlay="true"
                :show-confirm-button="false"
                v-model="showKeFu"
                title="联系客服"
                show-cancel-button
        >
            <div class="flex-column align-center p_y20">
                <div class="flex-row p_b10">
                    <van-icon class="m_t5 m_r5" :name="icons.weixin" size="20"/>
                    <span style="color:#FF0000" class="inline line25">{{agentWeiXin}}</span>
                    <button :data-clipboard-text="agentWeiXin"
                            style="color:#40ADF2;border-width: 0;background-color: transparent"
                            class="inline line25 p_l10 copy">复制
                    </button>
                </div>
                <div class="flex-row">
                    <van-icon class="m_t10 m_r5" :name="icons.qq" size="16"/>
                    <span style="color:#FF0000" class="inline line30">{{agentQQ}}</span>
                    <button :data-clipboard-text="agentQQ"
                            style="color:#40ADF2;border-width: 0;background-color: transparent"
                            class="inline line30 p_l10 copy">复制
                    </button>
                </div>
            </div>
        </van-dialog>
        <!--客服end-->

        <!--提前返点start-->
        <van-dialog
                :close-on-click-overlay="true"
                v-model="showFanDian"
                :before-close="fanDianClose"
                title="提前返点"
                confirmButtonText="返点"
                show-cancel-button
        >
            <div class="flex-column align-center p_y20">
                <div class="flex-row p_b10 inline line25">
                    <span>应返金额：</span>
                    <span style="color:#FF0000">{{fanDianList.result|formatMoney}}</span>
                </div>
                <div class="flex-row p_b10 inline line25">
                    <span>已返金额：</span>
                    <span style="color:#FF0000">{{fanDianList.already_money|formatMoney}}</span>
                </div>
                <div class="flex-row p_b10 inline line25">
                    <span>待返金额：</span>
                    <span style="color:#FF0000">{{fanDianList.not_money|formatMoney}}</span>
                </div>
            </div>
        </van-dialog>
        <!--提前返点end-->

        <!--下注确认start-->
        <van-dialog
                :close-on-click-overlay="false"
                v-model="showConfirmBetModal"
                :before-close="onBetConfirmClose"
                show-cancel-button
        >
            <div class="flex-column align-center p_y20">
                <div slot="title" class="flex-row p_b10 inline line30 text-red">
                    <span class="p_x5">第{{confirmBetData.qihao||''}}期</span>
                    <span>下注确认</span>
                </div>

                <div style="width: 95%;max-height: 200px;overflow-y: auto">
                    <div class="flex-row justify-center line30" v-for="item of confirmBetData2">
                        <span>{{`【${item.page_name}：${item.page2_name}】`}}</span>
                        <span>{{item.money}}</span>
                    </div>
                </div>
                <div class="flex-row line30" style="width:80%; border-top: solid 1px #eee">
                    <span class="text-light">合计：</span>
                </div>
                <div class="flex-row line25">
                    <span>注单：</span>
                    <span>{{confirmBetTotal.counts}}</span>
                </div>
                <div class="flex-row line25">
                    <span>注额：</span>
                    <span>{{confirmBetTotal.amount}}</span>
                </div>
            </div>
        </van-dialog>
        <!--下注确认end-->


        <!--键盘start-->
        <van-popup
                :overlay-style="{backgroundColor:'rgba(0,0,0,0)'}"
                :value="showKeyboard"
                @click-overlay="closeKeyboard"
                position="bottom"
                :class="['px-w100',keyboardHeightClass]">
            <QuickKeyboard
                    v-model="quickValue"
                    :type="qKeyboard.type"
                    @onClose="toggleQuickKeyboard(false)"
                    @onSend="onQuickSend"
                    v-show="qKeyboard.show"/>
            <MyKeyboard
                    v-show="keyboard.show"
                    v-model="value"
                    @onInputMounted="e=>myKeyboardInputRef=e"
                    @onInputClick="toggleKeyboardBody(true)"
                    @onQuick="toggleQuickKeyboard"
                    @onSend="onSend"
                    @onPress="onPress"
                    @onBack="onBack"
                    @onLongPress="onLongPress"
                    @onClose="toggleKeyboard(false)"
                    :readonly="true"
                    :quickText="keyboard.quickText"
                    :placeholder="keyboard.placeholder"
                    :type="keyboard.type"
                    :body="keyboard.body"/>
        </van-popup>
        <!--键盘end-->

        <!--选单start-->
        <van-popup
                :overlay-style="{backgroundColor:'rgba(0,0,0,0)'}"
                v-model="showXuanDan"
                position="bottom"
        >
            <div class="flex-column justify-end xd-wrapper" @click.self="showXuanDan = false">
                <van-row class="bg-purple xd-nav-tar">
                    <van-col span="6" style="height: 100%">
                        <div @touchend="$router.push({name:'report'})" style="height: 100%"
                             class="flex-column justify-center align-center">
                            <van-icon name="chart-trending-o" color="white"/>
                            <div class="text-white font14 line30">报表查询</div>
                        </div>

                    </van-col>
                    <van-col span="6" style="height: 100%">
                        <div @touchend="$router.push({name:'record'})" style="height: 100%"
                             class="flex-column justify-center align-center">
                            <van-icon name="balance-list-o" color="white"/>
                            <div class="text-white font14 line30">上下分记录</div>
                        </div>
                    </van-col>
                    <van-col span="6" style="height: 100%">
                        <div @touchend="$router.push({name:'share',query:{index:1}})" style="height: 100%"
                             class="flex-column justify-center align-center">
                            <van-icon name="friends-o" color="white"/>
                            <div class="text-white font14 line30">邀请列表</div>
                        </div>
                    </van-col>
                    <van-col span="6" style="height: 100%">
                        <div @touchend="$router.push({name:'share'})" style="height: 100%"
                             class="flex-column justify-center align-center">
                            <van-icon name="share" color="white"/>
                            <div class="text-white font14 line30">我的分享页</div>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </van-popup>
        <!--选单end-->

        <!--底部导航栏start-->
        <van-tabbar ref="van-tabbar" class="bg-purple px-w100 chat__tabbar" inactive-color="white"
                    active-color="white"
                    v-model="active">
            <van-tabbar-item icon="service-o" @click="showKeFu=!showKeFu">客服</van-tabbar-item>
            <van-tabbar-item icon="exchange" @click="onTabbarClick(1)">选单</van-tabbar-item>
            <van-tabbar-item icon="wap-home-o" @click="$router.push({name:'home'})">首页</van-tabbar-item>
            <van-tabbar-item icon="description" @click="onTabbarClick(3)">下注记录</van-tabbar-item>
            <van-tabbar-item icon="coupon-o" @click="onTabbarClick(4)">投注</van-tabbar-item>
        </van-tabbar>
        <!--底部导航栏end-->

        <!--右边工具栏start-->
        <ChatRightBar v-show="!showHistoryLists" :game-id="game_id" :kai-url="userInfo.kaiUrl"/>
        <!--右边工具栏end-->


        <!--动画组件start-->
        <VueCar :data="qihao"
                @onClose="animateVideoClose()"
                @onReset="animateVideoClose(true)"
                v-if="showAnimateVideo&&animateType==='car'"
                v-model="showAnimateVideo"
                :is-run-moment="isRunMoment"
                :count-down="countdownTime"
                :start-count-down="startCountDown"
                :finish-game="finishGame"/>

        <VueShip :data="qihao"
                 @onClose="animateVideoClose()"
                 @onReset="animateVideoClose(true)"
                 v-else-if="showAnimateVideo&&animateType==='ship'"
                 v-model="showAnimateVideo"
                 :is-run-moment="isRunMoment"
                 :count-down="countdownTime"
                 :start-count-down="startCountDown"
                 :finish-game="finishGame"/>

        <VueFive :data="qihao"
                 @onClose="animateVideoClose()"
                 @onReset="animateVideoClose(true)"
                 v-else-if="showAnimateVideo&&animateType==='five'"
                 v-model="showAnimateVideo"
                 :is-run-moment="isRunMoment"
                 :count-down="countdownTime"
                 :finish-game="finishGame?qihao:null"/>

        <!--动画组件end-->

    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {
        bcAdd,
        bcComp,
        formatMoney,
        isArray,
        isBoolean,
        isEmpty,
        isString,
        lhColor,
        lhText,
        webSocketApi
    } from "../utils/helpers";
    import countdown from "../utils/countdown";
    import Balls from "../components/balls/Balls";
    import qq from "../assets/images/qq.png"
    import copy from "../assets/images/copy.png"
    import weixin from "../assets/images/weixin.png"
    import * as Clipboard from "clipboard";
    import {Toast} from "vant";
    import commonData from "../utils/commonData";
    import sList from "../components/HistoryList/sList";
    import cList from "../components/HistoryList/cList";
    import MyChat from "../components/chat/MyChat";
    import MyKeyboard from "../components/keyboard/MyKeyboard";
    import QuickKeyboard from "../components/quickKeyboard/QuickKeyboard";
    import ChatRightBar from "./kits/ChatRightBar";
    import VueCar from "./animate/VueCar";
    import VueShip from "./animate/VueShip";
    import VueFive from "./animate/VueFive";
    import VueCarAudio from "./animate/audio/VueCarAudio";
    import VueShipAudio from "./animate/audio/VueShipAudio";
    import VueFiveAudio from "./animate/audio/VueFiveAudio";

    export default {
        components: {
            Balls,
            sList,
            cList,
            MyChat,
            MyKeyboard,
            QuickKeyboard,
            ChatRightBar,
            VueCar,
            VueShip,
            VueFive,
        },
        mixins: [VueCarAudio, VueShipAudio, VueFiveAudio],
        filters: {
            formatMoney
        },
        data() {
            return {
                active: -1,
                value: '',
                quickValue: '',
                myKeyboardInputRef: null,
                showKeyboard: false,
                showDefaultBall: false,
                keyboardHeightClass: 'keyboard-height-40',
                qKeyboard: {
                    show: false,
                    type: 'circle',
                },
                keyboard: {
                    show: false,
                    body: true,
                    type: 'circle', // circle、square、number
                    placeholder: '',
                    quickText: '快捷',
                },
                tabbarHeight: undefined,
                game_id: undefined,
                runTimer: false,
                showKeFu: false,
                showFanDian: false,
                showHistoryLists: false,
                noticeShow: true,
                // 开奖历史是否正在下拉加载中
                hIsLoading: false,
                // 开奖历史是否正在加载更多中
                hLoading: false,
                // 开奖历史服务器数据是否加载完成（达到最底）
                hFinished: false,
                qihao_min: undefined,
                showXuanDan: false,
                icons: {
                    qq,
                    copy,
                    weixin,
                },
                countdownTime: 0,
                confirmBetData: {},
                showConfirmBetModal: false,

                initGameInfo: false,
                showAnimateVideo: false,
                isRunMoment: false,
                startCountDown: false,
                autoOpenAnimateVideo: false, // 主动打开动画
                userClosed: false, // 用户主动关闭
                finishGame: null,
            }

        },
        watch: {
            timerGameInfo(val = {}) {
                this.countdownTime = val.countdown || 0;
            }
        },
        computed: {
            ...mapGetters(['showVideo', 'fanDianList', 'userInfo', 'todayResult', 'timerGameInfo', 'agentQQ', 'agentWeiXin', 'agentNotice', 'historyLists', 'userChatHistoryLog']),
            animateType() {
                let animateType = 'car';
                if (this.game_id == 5) {
                    animateType = 'ship';
                } else if (this.isCircleBall) {
                    animateType = 'five';
                }
                return animateType;
            },
            confirmBetData2() {
                return this.confirmBetData.data || [];
            },
            confirmBetTotal() {
                let data = this.confirmBetData2;
                let total = {
                    counts: 0,
                    amount: 0,
                };
                if (isArray) {
                    total = {
                        counts: data.length,
                        amount: data.reduce((a, b) => {
                            return bcAdd(a, b.money);
                        }, 0),
                    };
                }
                return total;
            },
            // 房间是否过期
            isChatExpire() {
                return Date.now() >= this.userInfo.roomLostTime * 1000;
            },
            // 游戏是否关闭
            isGameNotOpen() {
                return this.timerGameInfo.game_open < 1;
            },
            footerHeight() {
                if (this.tabbarHeight) {
                    return `${this.tabbarHeight}px`;
                }
                return '50px';
            },
            countDownTime() {
                let time = this.countdownTime;
                let {minutes, seconds} = countdown(0, time * 1000);
                minutes = `${minutes}`.split('');
                seconds = `${seconds}`.split('');
                if (minutes.length === 1) {
                    minutes.unshift('0')
                }
                if (seconds.length === 1) {
                    seconds.unshift('0')
                }
                return [...minutes, ...seconds];
            },
            qihao() {
                const timerGameInfo = this.timerGameInfo || {};
                return timerGameInfo.qihao || {};
            },
            ballHaomaBefore() {
                let timerGameInfo = this.haomaBefore;
                if (this.showDefaultBall) {
                    return timerGameInfo.map(item => 'default');
                }
                return timerGameInfo;
            },
            ballQihaoBefore() {
                let qihao = this.qihao.qihao_before;
                if (this.showDefaultBall) {
                    qihao = Number(qihao) + 1;
                    if (isNaN(qihao)) {
                        qihao = '';
                    }
                }
                return qihao;
            },
            haomaBefore() {
                let haomaBefore = this.qihao.haoma_before || '';
                return haomaBefore.split(',');
            },
            isCircleBall() {
                return [3, 8, 9].indexOf(Number(this.game_id)) > -1 || this.haomaBefore.length === 5;
            },
            lh() {
                let haoma = this.haomaBefore;
                let res = {};
                if (this.isCircleBall) {
                    let lh = bcComp(haoma[0], haoma[4]);
                    let sum = haoma.reduce((a, b) => {
                        return Number(a) + Number(b);
                    }, 0);
                    let dx = sum >= 22;
                    let ds = sum % 2 === 0;
                    res = {
                        name: '总和：',
                        value: sum,
                        dx: dx ? '大' : '小',
                        dxColor: dx ? 'red' : '#0089FF',
                        ds: ds ? '双' : '单',
                        dsColor: ds ? 'red' : '#0089FF',
                        lh: lhText(lh),
                        lhColor: lhColor(lh),
                    }
                } else {
                    let gYaHe = Number(haoma[0]) + Number(haoma[1]);
                    if (isNaN(gYaHe)) {
                        gYaHe = 0;
                    }
                    let dx = gYaHe > 11;
                    let ds = gYaHe % 2 === 0;
                    res = {
                        name: '冠亚和：',
                        value: gYaHe,
                        dx: dx ? '大' : '小',
                        dxColor: dx ? 'red' : '#0089FF',
                        ds: ds ? '双' : '单',
                        dsColor: ds ? 'red' : '#0089FF',
                    }
                }
                return res;

            }
        },
        async beforeDestroy() {
            try {
                await this.$store.dispatch('sendMessage', {
                    type: "outRoom"
                });
            } catch (e) {
                console.log(e);
            }
        },
        created() {

            this.initData();
            this.initCopyComponent();
            let game_id = this.$route.query.game_id;
            this.game_id = game_id;

            this.runGameTimer(game_id);
            window.onresize = () => {
                const vanTabbar = this.$refs['van-tabbar'];
                if (vanTabbar && vanTabbar.$el) {
                    this.tabbarHeight = vanTabbar.$el.scrollHeight;
                }
            }
            this.initWebSocket();
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') { // ios锁屏断线
                    this.initData();
                    this.runGameTimer(game_id);
                }
            });
        },
        mounted() {
            const vanTabbar = this.$refs['van-tabbar'];
            if (vanTabbar && vanTabbar.$el) {
                this.tabbarHeight = vanTabbar.$el.scrollHeight;
            }
            window.__topFun = this.$store.getters.kaijiangSound;
        },
        methods: {
            onNoticeClose() {
                this.noticeShow = false;
            },
            animateVideoOpen(isRunMoment = false) {
                this.showAnimateVideo = true;
                this.isRunMoment = isRunMoment;
            },
            animateVideoClose(isOnReset = false) {
                this.pauseCarSounds()
                this.pauseFiveSounds()
                this.pauseShipSounds()
                this.showAnimateVideo = false;
                this.isRunMoment = false;
                if (this.autoOpenAnimateVideo) {
                    this.autoOpenAnimateVideo = false;
                    if (!isOnReset) {
                        this.userClosed = true;
                    }

                }

            },
            showAnimateVideoFun(isRunMoment = false) {
                if (this.autoOpenAnimateVideo && this.timerGameInfo.game_open < 0) {
                    // 游戏未开放
                    this.autoOpenAnimateVideo = false;
                    return;
                }
                if (this.autoOpenAnimateVideo && this.haomaBefore.length < 5) {
                    // 游戏首期
                    this.autoOpenAnimateVideo = false;
                    return;
                }
                if (this.initGameInfo) {
                    this.animateVideoOpen(isRunMoment);
                } else {
                    if (this.autoOpenAnimateVideo) {
                        this.autoOpenAnimateVideo = false;
                        return;
                    }
                    Toast('正在加载数据中，请稍后再点击');
                }
            },
            clearGameTimer() {
                if (commonData.gameInfoTimer) {
                    clearInterval(commonData.gameInfoTimer);
                }
            },
            runGameTimer(game_id) {
                this.getGame(game_id).then(res => {
                }).catch(console.log);
                this.clearGameTimer();
                commonData.gameInfoTimer = setInterval(this.onGamesTimer, 1000);
            },
            async onGamesTimer() {
                if (this.startCountDown) {
                    this.startCountDown = false;
                }
                if (this.finishGame) {
                    this.finishGame = null;
                }
                let time = this.countdownTime;
                time--;
                if (time <= 0) {
                    time = 0;
                    // if (!this.showAnimateVideo && !this.userClosed) {
                    //     // 弹出开奖
                    //     this.autoOpenAnimateVideo = true;
                    //     this.showAnimateVideoFun();
                    // }
                }
                this.countdownTime = time;
                if (time === 0) {
                    // if (!this.showAnimateVideo && this.qihao.status <= 0) {
                    //     // 弹出开奖
                    //     this.showAnimateVideoFun(true);
                    // }
                    await this.getGame(this.game_id);
                }
                if (this.qihao.status <= 0 && time === 3) {
                    this.startCountDown = true;
                }

            },

            async getGame(game_id, isOpen = false) {
                const res = await this.$store.dispatch('getTimerGameInfo', {game_id});
                const qihao = res.qihao || {}
                if (isOpen) {
                    this.finishGame = qihao.haoma_before;
                    this.showDefaultBall = false;
                    this.userClosed = false;
                    this.$store.dispatch('prependHistoryLists', {game_id});
                }
                if (qihao.status <= 0) {
                    this.showDefaultBall = true;
                }
                if (!this.initGameInfo) {
                    this.initGameInfo = true;
                }
                return res;
            },
            async onBetConfirmClose(action, done) {
                if (action === 'confirm') {
                    if (!isEmpty(this.confirmBetData.receiveMsg)) {
                        this.onSend(this.confirmBetData.receiveMsg, 1);
                    }
                }
                this.confirmBetData = {};
                done();
            },
            async fanDianClose(action, done) {
                if (action === 'confirm') {
                    let res = await this.setTuiShui(1);
                    done(Boolean(res));
                }
                done();

            },
            async toggleFanDian(state) {
                state = isBoolean(state) ? state : !this.showFanDian;
                if (state) {
                    await this.setTuiShui(0);
                }
                this.showFanDian = state;

            },
            async setTuiShui(type = 0) {
                return this.$store.dispatch('setTuiShui', {type});
            },
            closeKeyboard() {
                if (this.keyboard.show) {
                    this.toggleKeyboard(false);
                } else {
                    this.toggleQuickKeyboard(false);
                }
            },
            async onSend(text, confirm = 0) {
                if (isEmpty(text)) {
                    Toast('请输入内容');
                    return;
                }
                let game_id = this.game_id;
                let data = {
                    type: 'betting',
                    game_id,
                    text,
                    confirm,
                };

                if (text.indexOf('上分') > -1 || text.indexOf('下分') > -1) {

                    data.type = 'fen';
                } else if (text.indexOf('查') > -1 || text.indexOf('取消') > -1) {
                    data.type = 'command';
                }
                await this.$store.dispatch('sendMessage', data);
                this.onLongPress();
                this.toggleKeyboard(false);
            },
            async onQuickSend({money, data}) {
                if (money <= 0) {
                    Toast('请输入投注金额');
                    return;
                }
                if (isEmpty(data)) {
                    Toast('请输入选择投注号码');
                    return;
                }
                const res = await this.$store.dispatch('userXiaZhu', {
                    money,
                    data,
                    game_id: this.game_id,
                });
                if (res) {
                    this.quickValue = '';
                    this.toggleQuickKeyboard(false);
                }
            },
            onBack() {
                let value = this.value.split('');
                if (value.length) {
                    value.pop();
                    this.value = value.join('');
                }
            },
            onPress(val) {
                if (isEmpty(val)) {
                    return;
                }
                switch (val) {
                    case '回水':
                        this.toggleKeyboard(false);
                        this.toggleFanDian(true);
                        break;
                    case '中/英':
                        if (this.myKeyboardInputRef) {
                            this.toggleKeyboardBody(false);
                            this.$nextTick(() => {
                                setTimeout(() => {
                                    this.myKeyboardInputRef.focus()
                                }, 120);
                            })
                        }
                        break;
                    default:
                        this.value = `${this.value}${val}`;
                }

            },
            // 长按删除
            onLongPress() {
                this.value = '';
            },
            toggleKeyboardBody(state) {
                state = isBoolean(state) ? state : !this.keyboard.body;
                this.keyboardHeightClass = state ? 'keyboard-height-40' : 'keyboard-height-px40';
                this.keyboard.body = state;
            },
            toggleKeyboard(state, showBody = true) {
                const placeholder = this.isCircleBall ? '位置/球号/金额' : '名次/车号/金额';
                state = isBoolean(state) ? state : !this.keyboard.show;
                this.keyboard = {
                    ...this.keyboard,
                    placeholder,
                    type: this.isCircleBall ? 'circle' : 'square',
                    show: state
                }
                this.keyboardHeightClass = showBody ? 'keyboard-height-40' : 'keyboard-height-px40';
                this.showKeyboard = state;
            },
            toggleQuickKeyboard(state) {
                state = isBoolean(state) ? state : !this.qKeyboard.show;
                this.qKeyboard = {
                    ...this.qKeyboard,
                    type: this.isCircleBall ? 'circle' : 'square',
                    show: state
                };
                if (state) {
                    this.keyboard.show = false;
                }
                this.keyboardHeightClass = 'keyboard-height-80'
                this.showKeyboard = state;
            },
            showConfirmBetting(data = {}) {
                let state = true;
                if (state && isEmpty(data)) {
                    state = false;
                }
                this.showConfirmBetModal = state;
                this.confirmBetData = data;
            },
            initWebSocket() {
                this.$options.sockets.onopen = (e) => {
                    this.$store.dispatch('userJoinRoom', this.game_id);
                }
                this.$options.sockets.onmessage = ({data}) => {
                    if (isString(data)) {
                        try {
                            data = JSON.parse(data);
                        } catch (e) {
                            console.log(e)
                            return;
                        }
                    }
                    let _msg = data.message || '';
                    if (data.code === 201) {
                        this.showConfirmBetting(data.data);
                    } else if (data.code === 209) {
                        this.getGame(this.game_id).then(res => {
                        }).catch(console.log);
                    } else if (data.code === 266 || _msg.endsWith('已经开奖') || _msg.endsWith('已开奖')) {
                        this.getGame(this.game_id, true).then(res => {
                        }).catch(console.log);
                    }

                }
                if (this.$socket) {
                    this.$store.dispatch('userJoinRoom', this.game_id);
                } else {
                    this.$connect(webSocketApi());
                }

            },
            initData() {
                this.$store.dispatch('getUserInfo');
                this.$store.dispatch('getAgentQQ');
                this.$store.dispatch('getAgentWeiXin');
                this.$store.dispatch('getAgentNotice');
                this.$store.dispatch('getTodayResult');

            },
            refresh() {
                this.$store.commit('setHistoryLists', [])
                this.initData();
                Toast('刷新成功');
            },

            onTabbarClick(index) {
                let game_id = this.game_id;
                switch (index) {
                    case 1:
                        this.toggleShowXuanDan();
                        break;
                    case 3:
                        this.$router.push({name: 'description', query: {game_id}})
                        break;
                    case 4:
                        this.toggleKeyboard();
                        break;
                }
            },
            initCopyComponent() {
                let clipboard = new Clipboard('.copy');
                clipboard.on('success', function (e) {
                    Toast('复制成功');
                    e.clearSelection();
                });
            },
            // 历史开奖加载更多记录
            async onHLoad() {
                this.hLoading = true;
                let game_id = this.$route.query.game_id;
                let historyLists = this.historyLists;
                let endItem = historyLists[historyLists.length - 1];
                let payload = {game_id};
                if (endItem && endItem.qihao) {
                    payload.qihao_max = endItem.qihao;
                } else {
                    this.hLoading = false;
                    this.hFinished = true;
                    return;
                }
                let data = await this.$store.dispatch('loadMoreHistoryLists', payload);
                this.hLoading = false;
                if (!data.length) {
                    this.hFinished = true;
                }
            },
            // 历史下拉刷新
            async onHRefresh() {
                this.qihao_min = undefined;
                this.hIsLoading = true;
                let game_id = this.$route.query.game_id;
                this.hFinished = false;
                await this.$store.dispatch('getHistoryLists', {game_id});
                this.hIsLoading = false;
            },
            toggleShowHistoryLists(status) {
                if (this.haomaBefore.length < 3) {
                    Toast('暂无开奖记录');
                    return;
                }
                status = isBoolean(status) ? status : !this.showHistoryLists;
                if (status) {
                    this.onHRefresh();
                }
                this.showHistoryLists = status;
            },
            toggleShowXuanDan(status) {
                status = isBoolean(status) ? status : !this.showXuanDan;
                this.showXuanDan = status;
            },
        },
        destroyed() {
            this.clearGameTimer();
        },
    }
</script>
<style>
    .van-nav-bar__title {
        max-width: inherit;
        padding-left: 30px;
    }
</style>
<style scoped>
    .app {
        height: 100%;
        background-color: #F4F4F4;
    }

    .balls {
        padding-bottom: 1px;
    }

    .lh-item-span {
        margin: 0 1px;
    }

    .xd-wrapper {
        width: 100%;
        height: 100%;
    }

    .xd-nav-tar {
        height: 80px;
    }

    .notice-bar {
        z-index: 1;
        height: 35px;
    }

    .keyboard-height-40 {
        height: 45%;
    }

    .keyboard-height-80 {
        height: 80vh;
    }

    .keyboard-height-px40 {
        height: 40px;
    }

    .chat-count-down-text {
        height: 25px;
    }

    .sub-header-1 {
        z-index: 1;
        padding-top: 40px;
        min-height: 95px;
    }

    .sub-header-2 {
        z-index: 1;
        min-height: 25px;
    }

    .chat__tabbar {
        min-height: 1.33333em;
    }

    .chat-body {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 1.33333em;
        width: 100%;
        /*height: calc(100vh - 1.33333em);*/
    }

</style>
