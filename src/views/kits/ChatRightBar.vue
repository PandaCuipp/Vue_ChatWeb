<template>
    <div class="flex-column justify-center align-center chat-right-toolbar">
        <div @touchend="onKai" class="no-select c-r-toolbar-item px-kaijaing">
            <div class="kj-icon"></div>
        </div>
        <div @touchend="onShowChangLong" class="no-select c-r-toolbar-item px-cahnglong">
            <div class="cl-icon">
                <span class="font12" style="color: #9B4C0A">长龙</span>
            </div>
        </div>
        <div @touchend="onShowHBao" class="no-select c-r-toolbar-item hongbao"></div>

        <!--长龙列表start-->
        <van-overlay :custom-style="{backgroundColor:'rgba(0,0,0,0)'}" :show="showCLong" @click="showCLong = false">
            <div class="font14 cl-list-dialog">
                <div class="flex-column cl-list-container">
                    <div class="p_x5 line30 cl-list-title">长龙</div>
                    <div class="flex1 cl-list-content">
                        <template v-if="clLists.length">
                            <van-row :key="`chang-long-item-${index}`" class="cl-list-item"
                                     v-for="(item,index) of clLists">
                                <van-col :span="10" class="text-center">{{item.number}}</van-col>
                                <van-col :span="6" class="text-center">{{item.value}}</van-col>
                                <van-col :span="8" class="text-center">
                                    <span class="text-red">{{item.qihao}}</span>
                                    期
                                </van-col>
                            </van-row>
                        </template>
                        <van-row v-else class="cl-list-item text-light">
                            暂无长龙
                        </van-row>
                    </div>
                </div>
            </div>
        </van-overlay>
        <!--长龙列表end-->

        <!--红包列表start-->
        <van-dialog
                :close-on-click-overlay="true"
                :showConfirmButton="false"
                v-model="showHBao">
            <div class="flex-column align-center p_y15 bar-hb-container">
                <div v-if="hbLists.length" class="flex-row justify-center flex-wrap">
                    <div @touchend="onHBaoClick(item)" v-for="item of hbLists"
                         class="p_y5 p_x5 flex-column align-center">
                        <van-image class=""
                                   width="40px"
                                   height="40px"
                                   :src="hBaoImage"
                        />
                        <van-count-down
                                v-if="item.countdownTime>0"
                                class="p_x5 font12 line20 text-white bar-hb-item-title"
                                :time="item.countdownTime"/>
                        <div v-else class="text-center p_x10 font12 line20 text-white bar-hb-item-title">
                            {{item.showText}}
                        </div>
                    </div>
                </div>
                <div v-else class="text-light line50">
                    暂无红包
                </div>
            </div>
        </van-dialog>
        <!--红包列表end-->
    </div>
</template>

<script>
    import {isEmpty, numberConvertToUppercase} from "../../utils/helpers";
    import {Toast} from "vant";
    import moment from "moment";
    import {mapState} from "vuex";
    import hBaoImage from "../../assets/images/ic_rp_default_bg2.png";

    export default {
        name: "ChatRightBar",
        props: {
            kaiUrl: String,
            gameId: {
                type: [Number, String],
                required: true,
            },

        },
        data() {
            return {
                showCLong: false,
                showHBao: false,
                hBaoImage,
            }
        },
        computed: {
            ...mapState(['changLongLists', 'hBaoLists']),
            clLists() {
                let lists = Object.entries(this.changLongLists);
                return lists.map(item => {
                    const key = item[0].split('-');
                    const number = numberConvertToUppercase(key[0] || '')
                    return {
                        number,
                        value: key[1] || '',
                        qihao: item[1] || '',
                    }
                })
            },
            hbLists() {
                let lists = this.hBaoLists;
                return lists.map(item => {
                    item.showText = '查看';
                    if (item.type === 'timer') {
                        let start = moment();
                        let end = moment(item.start_time);
                        item.countdownTime = end.format('x') - start.format('x');
                        if (!item.get_status && item.countdownTime <= 0) {
                            item.showText = '可领取';
                        }
                    } else if (!item.get_status) {
                        item.showText = '可领取';
                    }
                    return item;
                });
            }
        },
        methods: {
            onHBaoClick(item) {
                if (item.type === 'timer' && item.countdownTime > 0) {
                    return;
                }
                this.$router.push({
                    name: 'redPacket',
                    query: {
                        id: item.id,
                        type: item.type,
                        get_status: item.get_status,
                    }
                })
            },
            onKai() {
                if (isEmpty(this.kaiUrl)) {
                    Toast('打开网址失败');
                    return;
                }
                window.open(this.kaiUrl);
            },
            async onShowChangLong() {
                Toast.loading({
                    loadingType: 'spinner',
                    forbidClick: true
                });
                await this.$store.dispatch('getChangLongLists', {game_id: this.gameId});
                Toast.clear();
                this.showCLong = true;
            },
            async onShowHBao() {
                Toast.loading({
                    loadingType: 'spinner',
                    forbidClick: true
                });
                await this.$store.dispatch('getHBaoLists');
                Toast.clear();
                this.showHBao = true;
            }
        }
    }
</script>

<style scoped>
    .chat-right-toolbar {
        position: fixed;
        z-index: 1;
        right: 0;
        bottom: 20%;
        width: 60px;
        height: 300px;
    }

    .c-r-toolbar-item {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        margin: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .px-kaijaing {
        background-color: #FE0201;
        padding: 1px;
    }

    .kj-icon {
        width: 100%;
        height: 100%;
        border: solid 2px white;
        border-radius: 50%;

        background: url('../../assets/images/136_open.png') no-repeat;
        background-size: 100% 100%;
    }

    .px-cahnglong {
        background-color: #FDC403;
        padding: 1px;
    }

    .cl-icon {
        width: 100%;
        height: 100%;
        border: solid 2px white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .hongbao {
        border-radius: 0;
        background: url('../../assets/images/ic_redpacket.png') no-repeat;
        background-size: 100% 100%;
    }

    .cl-list-dialog {
        position: fixed;
        height: 100%;
        right: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;

    }

    .cl-list-container {
        width: 120px;
        min-height: 80px;
        max-height: 350px;
    }

    .cl-list-title {
        border-radius: 5px 5px 0 0;
        background-color: #35A8F1;
        color: white;
    }

    .cl-list-content {
        padding: 5px;
        background-color: white;
        border-radius: 0 0 5px 5px;
    }

    .cl-list-item {
        line-height: 25px;
    }

    .bar-hb-container {
        max-height: 380px;
        overflow-y: auto;
    }

    .bar-hb-item-title {
        background-color: #666;
        border-radius: 20px;
    }
</style>
