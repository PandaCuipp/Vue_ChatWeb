<template>
    <div class="app" v-cloak>
        <van-nav-bar
                class="bg-purple px-nav-bar"
                :border="false"
        >
            <div slot="left" class="flex-row align-center px-nav-bar-left">
                <van-image @click="$router.push({name:'userInfo'})"
                           round
                           width="35px"
                           height="35px"
                           :src="userHeads[userInfo.photo]"
                />
                <div class="p_l5 flex-column align-start">
                    <div class="text-white px-font12">{{userInfo.cnname||userInfo.username}}</div>
                    <div class="text-white px-font12">积分：{{todayResult.money|formatMoney}}</div>
                </div>
            </div>
            <div slot="right" class="flex-row">
                <div class="flex-column nav-right-icon" @click="$router.push({name:'rooms'})">
                    <van-icon :name="iconImages.huanfang" size="15"/>
                    <span class="inline px-font12 text-white">换房</span>
                </div>
                <van-icon @click="showKeFu=!showKeFu" name="service-o" color="white" size="20"/>
                <van-icon @click="$router.push({name:'wanFa'})" name="question-o" color="white" size="20"
                          class="nav-right-icon"/>
                <van-icon v-if="showVideo" @click="toggleVideo" :name="iconImages.laba" size="20"/>
                <van-icon v-else @click="toggleVideo" :name="iconImages.jingyin" size="20"/>
            </div>
        </van-nav-bar>
        <div class="content">
            <div v-for="(game ,i) of games" class="flex-row justify-around">
                <div @click="onJoinChatRoom(item)" v-for="(item,index) of game"
                     :class="['col',`col-bg${index+i+i}`]">
                    <div class="flex-row justify-center game-name font16">{{item.name}}</div>
                    <div class="flex-row justify-end font12 line30 text-white p_r5">最新开奖{{item.qihao.qihao}}期</div>
                    <div class="flex-row justify-center font14 line25 text-white">
                        <Balls :key="index" :balls="item.qihao.haoma_before"/>
                    </div>
                    <div class="flex-row justify-end font14 line30 text-white p_r10">
                        <span v-if="item.qihao.status===1">距离封盘剩余</span>
                        <span v-if="item.qihao.status===3">距开盘</span>
                        <span v-if="item.qihao.status===0" class="text-red">封盘中</span>
                        <span v-else> </span>
                    </div>
                    <div class="flex-row justify-end font14 line25 text-white p_r10">
                        <cDown :key="index" :time="item.countdown"/>
                    </div>
                </div>
            </div>
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
    </div>
</template>

<script>
    import {iconImages, userHeads} from "../utils/images";
    import {mapGetters} from "vuex";
    import Balls from "../components/balls/Balls";
    import cDown from "../components/cDown";
    import commonData from "../utils/commonData";
    import qq from "../assets/images/qq.png"
    import copy from "../assets/images/copy.png"
    import weixin from "../assets/images/weixin.png"
    import * as Clipboard from "clipboard";
    import {Toast} from "vant";
    import {formatMoney, isArray, isUndefined, webSocketApi} from "../utils/helpers";

    export default {
        components: {
            Balls,
            cDown,
        },
        filters: {
            formatMoney,
        },
        data() {
            return {
                icons: {
                    qq,
                    copy,
                    weixin,
                },
                showKeFu: false,
                userHeads,
                iconImages,
                downCountGames: [],
            }
        },
        computed: {
            ...mapGetters(['showVideo', 'userInfo', 'timerGameLists', 'agentQQ', 'agentWeiXin', 'todayResult']),
            games() {
                let gameLists = [...this.downCountGames];
                let games = [];
                while (gameLists.length) {
                    games.push(gameLists.splice(0, 2))
                }
                return games;
            }
        },
        created() {
            this.$store.commit('setShowVideo');
            this.initData();
            this.runGameListerTimer();
            this.initCopyComponent();
            if (!this.$socket) this.$connect(webSocketApi());
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') { // ios锁屏断线
                    this.initData();
                    this.runGameListerTimer();
                }
            });
        },
        watch: {
            timerGameLists(val) {
                this.setGames(val);
            }
        },
        destroyed() {
            this.clearGameListerTimer();
        },
        methods: {
            initData() {
                this.$store.dispatch('getUserInfo');
                this.$store.dispatch('getAgentQQ');
                this.$store.dispatch('getAgentWeiXin');
                this.$store.dispatch('getTodayResult');
            },
            onJoinChatRoom(item) {
                this.$store.commit('initUserChatHistoryLog');
                this.$router.push({name: 'chat', query: {game_id: item.game_id}})
            },
            clearGameListerTimer() {
                if (commonData.gameListTimer) {
                    clearInterval(commonData.gameListTimer);
                }
            },
            runGameListerTimer() {
                this.$store.dispatch('getTimerGameLists');
                this.clearGameListerTimer();
                commonData.gameListTimer = setInterval(this.onGamesListTimer, 1000)
            },
            async onGamesListTimer() {
                let game = this.downCountGames;
                let init = false;
                for (let i in game) {
                    game[i].countdown--;
                    if ((isUndefined(game[i].close) || game[i].close < 1) && game[i].countdown <= 0) {
                        init = true;
                    }
                    if (game[i].countdown <= 0) {
                        game[i].countdown = 0;
                    }
                }
                this.setGames(game);
                if (init) {
                    await this.getGames();
                }

            },
            async getGames() {
                return this.$store.dispatch('getTimerGameLists');
            },
            setGames(gameLists = []) {
                if (!isArray(gameLists)) {
                    return;
                }
                this.downCountGames = gameLists;
            },
            initCopyComponent() {
                let clipboard = new Clipboard('.copy');
                clipboard.on('success', function (e) {
                    Toast('复制成功');
                    e.clearSelection();
                });
            }
            ,
            toggleVideo() {
                this.$store.commit('setShowVideo', !this.showVideo);
                Toast('设置成功');
            }
        }
    }
</script>

<style scoped>
    .app {
        min-height: 100%;
        background-color: #3578C6;
    }

    .px-font12 {
        font-size: 12px;
    }

    .px-nav-bar {
        line-height: inherit;
        height: 44px;
    }

    .px-nav-bar-left {
        height: 44px;
    }

    .nav-right-icon {
        margin: 0 10px;
    }

    .content {
        padding: 10px 2px;
    }

    .col {
        width: 48%;
        height: 160px;
        margin: 5px 0;
        padding: 5px;
    }

    .game-name {
        color: #F19308;
        text-shadow: 3px 3px 3px #000;
    }

    .col-bg0 {
        background: url("../assets/images/game/main_bjsc.png");
        background-size: 100% 100%;
    }

    .col-bg1 {
        background: url("../assets/images/game/main_jssc.png");
        background-size: 100% 100%;
    }

    .col-bg2 {
        background: url("../assets/images/game/main_jssc.png");
        background-size: 100% 100%;
    }

    .col-bg3 {
        background: url("../assets/images/game/main_xyft.png");
        background-size: 100% 100%;
    }

    .col-bg4 {
        background: url("../assets/images/game/main_canada.png");
        background-size: 100% 100%;
    }

    .col-bg5 {
        background: url("../assets/images/game/main_jsssc.png");
        background-size: 100% 100%;
    }

    .col-bg6 {
        background: url("../assets/images/game/main_bj.png");
        background-size: 100% 100%;
    }

    .col-bg7 {
        background: url("../assets/images/game/main_canada.png");
        background-size: 100% 100%;
    }
</style>
