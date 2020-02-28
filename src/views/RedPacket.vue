<template>
    <div class="font14">
        <van-nav-bar
                style="backgroundColor:#F94A43"
                :border="false">
            <div class="router-back" @click="$router.back()" slot="left">
                <van-icon color="white" name="arrow-left"/>
            </div>
            <div slot="title" class="text-white">红包详情</div>
            <div @click="initData" slot="right" class="text-white">刷新</div>
        </van-nav-bar>
        <div class="red-packet-content">
            <div class="flex-row justify-center align-center red-packet-con-top">
                <van-image class="red-packet-con-top-img" @click="$router.back()" :src="caiImage"/>
            </div>
        </div>
        <div class="flex-row justify-center font16 line30">
            {{typeText}}红包金额：{{data.balance||0}} / {{data.money||0}}
        </div>
        <div class="flex-row p_t25 p_x15 font16 line30 red-pack-item">
            {{`领取${(data.all_nums || 0) - (data.nums || 0)}/${data.all_nums || 0}个`}}
        </div>
        <div v-for="item of lists" class="flex-row justify-between p_x15  p_y5 red-pack-item">
            <div class="flex-row">
                <van-image
                        round
                        width="40px"
                        height="40px"
                        style="margin-top: 2px"
                        class="m_r5"
                        :src="userHeads[item.photo]"/>
                <div class="line25">
                    <div class="font16">
                        {{item.cnname}}
                        <span class="text-light font14">（{{item.username}}）</span>
                    </div>
                    <div class="text-light font12">{{item.created_at}}</div>
                </div>
            </div>
            <div class="line50">{{item.money}}积分</div>
        </div>
        <van-overlay class="flex-column align-center justify-center" :show="show">
            <van-image @click="onReceive" class="h-bao-reive-img" :src="hBaoImage"/>
            <van-image @click="$router.back()" :src="closeImage"/>
        </van-overlay>
    </div>
</template>

<script>
    import hBaoImage from "../assets/images/ic_rp_default_bg2.png";
    import closeImage from "../assets/images/upgrade_close.png";
    import caiImage from "../assets/images/cai.png";
    import {getHongbaoInfo} from "../api/models/game";
    import {userHeads} from "../utils/images";

    export default {
        name: "RedPacket",
        data() {
            return {
                show: false,
                hBaoImage,
                closeImage,
                caiImage,
                userHeads,
                id: 0,
                get_status: 0,
                data: {
                    nums: 0,
                    all_nums: 0,
                    money: 0,
                    balance: 0,
                    list: [],
                },
            }
        },
        created() {
            this.id = this.$route.query.id;
            this.get_status = this.$route.query.get_status;
            this.initData();
        },
        computed: {
            lists() {
                return this.data.list || [];
            },
            typeText() {
                if (this.$route.query.type === 'timer') {
                    return '定时';
                }
                return '拼手气';
            }
        },
        watch: {
            data(val) {
                this.show = val.nums > 0 && !this.get_status && !this.lists.some(item => item.id === this.userInfo.id);
            }
        },
        methods: {
            async onReceive() {
                try {
                    const res = await this.$store.dispatch('receiveHbao', {id: this.id});
                    if (res) {
                        await this.initData();
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            async initData() {
                let {data} = await getHongbaoInfo({id: this.id});
                this.data = data;
            }
        }
    }
</script>

<style scoped>
    .red-packet-content {
        min-height: 100px;
        background: url('../assets/images/ic_redpacket_title_bg.png') no-repeat;
        background-size: 100% 60px;
    }

    .red-packet-con-top {
        position: absolute;
        top: 70px;
        left: 50%;
        margin-left: -35px;
        width: 70px;
        height: 70px;
        background-color: #CE4A34;
        border-radius: 50%;
    }

    .red-pack-item {
        border-bottom: solid 1px #eee;
    }

    .red-packet-con-top-img {
        width: 50px;
        height: 50px;
    }
</style>
