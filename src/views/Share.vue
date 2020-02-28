<template>
    <div class="font14">
        <van-nav-bar
                class="bg-purple"
                :border="true"
        >
            <div class="router-back" @click="$router.back()" slot="left">
                <van-icon color="white" name="arrow-left"/>
            </div>
            <div slot="title" class="flex-row justify-center align-center share-title">
                <div class="bg-white flex-row justify-center share-title-container">
                    <div @click="index=i" :class="['share-title-item',index===i?'active':'']"
                         v-for="(item,i) of titles">{{item}}
                    </div>
                </div>
            </div>
        </van-nav-bar>

        <div v-if="index===0" class="flex-column justify-center align-center share-qr-code">
            <div class="line30 p_b10">
                <span class="text-light font12">我的邀请码：</span>
                <span class="text-red font14">{{userInviteCode.code}}</span>
                <button :data-clipboard-text="userInviteCode.code"
                        style="color:#40ADF2;border-width: 0;background-color: transparent"
                        class="inline font14 p_l10 copy">复制
                </button>
            </div>
            <div class="flex-row justify-center align-center flex-wrap">
                <div class="flex-column justify-center align-center p_x5 p_y5">
                    <div style="background-color: #F49900"
                         class="flex-row justify-center align-center share-qr-item-title">
                        <van-icon :name="require('../assets/images/android.png')"/>
                        <span class="text-white">下载地址</span>
                    </div>
                    <van-image width="150px"
                               height="150px"
                               :src="userInviteCode.photo"
                    />
                </div>
                <div class="flex-column justify-center align-center p_x5 p_y5">
                    <div style="background-color: #00ADEF"
                         class="flex-row justify-center align-center share-qr-item-title">
                        <van-icon :name="require('../assets/images/ios.png')"/>
                        <span class="text-white">下载地址</span>
                    </div>
                    <van-image width="150px"
                               height="150px"
                               :src="userInviteCode.applePhoto"
                    />
                </div>
                <div class="flex-column justify-center align-center p_x5 p_y5">
                    <div style="background-color: #09B152"
                         class="flex-row justify-center align-center share-qr-item-title">
                        <van-icon :name="require('../assets/images/web.png')"/>
                        <span class="text-white">官方网址</span>
                    </div>
                    <van-image width="150px"
                               height="150px"
                               :src="userInviteCode.webPhoto"
                    />
                </div>
                <div class="share-qr-item-end"/>
            </div>

        </div>
        <div v-else>
            <div class="font14 text-end line30 p_r15">
                邀请人数：
                <span class="text-red">{{userInviteLists.user_invite||0}}</span>
            </div>
            <van-row class="font12 text-light text-center p_t10">
                <van-col :span="8">用户名</van-col>
                <van-col :span="8">注单</van-col>
                <van-col :span="8">注额</van-col>
            </van-row>
            <van-row class="font12 text-center p_t10" v-for="(item,index) of lists">
                <van-col :span="8">{{item.username||''}}</van-col>
                <van-col :span="8">{{item.counts||0}}</van-col>
                <van-col :span="8">{{item.moneys||0}}</van-col>
            </van-row>
            <div class="font14 text-end line30 p_r15 p_t10">
                已返金额：
                <span class="text-red">{{userInviteLists.alreadyMoney||0}}</span>
            </div>
            <div class="font14 text-end line30 p_r15">
                未返金额：
                <span class="text-red">{{userInviteLists.notMoney||0}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import QrcodeVue from 'qrcode.vue'
    import * as Clipboard from "clipboard";
    import {Toast} from "vant";

    export default {
        components: {
            QrcodeVue
        },
        data() {
            return {
                index: 0,
                titles: [
                    '我的邀请码',
                    '邀请列表'
                ],
            }
        },
        computed: {
            ...mapGetters(['userInfo', 'userInviteCode', 'userInviteLists']),
            lists() {
                return this.userInviteLists.list || [];
            }
        },
        created() {
            let index = this.$route.query.index || 0;
            index = Number(index);
            if ([0, 1].indexOf(index) > -1) {
                this.index = index;
            }
            this.init();
            this.initCopyComponent();
        },
        methods: {
            init() {
                this.$store.dispatch('getUserInfo');
                this.$store.dispatch('getUserInviteCode');
                this.$store.dispatch('getUserInviteLists');
            },
            initCopyComponent() {
                let clipboard = new Clipboard('.copy');
                clipboard.on('success', function (e) {
                    Toast('复制成功');
                    e.clearSelection();
                });
            },
        }
    }
</script>

<style scoped>
    .share-title {
        height: 46px;
    }

    .share-title-container {
        padding: 1px;
    }

    .share-title-item {
        font-size: 12px;
        line-height: 25px;
        border-radius: 1px;
        padding: 0 14px;
        background-color: #3F51B5;
        color: white;
    }

    .share-title-item.active {
        color: #3F51B5;
        background-color: white;
    }

    .share-qr-code {
        padding-top: 20px;
    }

    .share-qr-item-title {
        width: 100px;
        border-radius: 3px;
        box-shadow: 0 0 3px #ccc;
        height: 30px;
    }

    .share-qr-item-end {
        width: 160px;
    }
</style>
