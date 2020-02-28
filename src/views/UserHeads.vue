<template>
    <div class="app">
        <van-nav-bar
                class="bg-light-blue"
                :border="false"
        >
            <div class="router-back" @click="$router.back()" slot="left">
                <van-icon color="white" name="arrow-left"/>
            </div>
            <p slot="title" class="text-white">更换头像</p>
        </van-nav-bar>
        <div class="content">
            <div class="flex-row justify-center p_y10 bg-white">
                <van-image @click="$router.push({name:'userHeads'})"
                           round
                           width="50px"
                           height="50px"
                           :src="userHeads[index||userInfo.photo]"
                />
            </div>
            <div class="flex-row justify-center flex-wrap p_y20">
                <van-image v-for="(item,index) of userHeads"
                           @click="checkAvatar(index)"
                           round
                           class="m_x5 m_y5"
                           width="50px"
                           height="50px"
                           :src="item"
                />
            </div>
        </div>
        <div class="flex-row justify-center footer px-w100 bg-white p_y15">
            <van-button @click="onSubmit" style="width: 60%" size="small" round type="info">确认修改</van-button>
        </div>
    </div>
</template>

<script>
    import {userHeads} from "../utils/images";
    import {mapGetters} from "vuex";
    import {isEmpty, isUndefined} from "../utils/helpers";
    import {Toast} from "vant";

    export default {
        data() {
            return {
                userHeads,
                index: undefined,
            }
        },
        computed: {
            ...mapGetters(['userInfo']),
        },
        created() {
            this.$store.dispatch('getUserInfo');
        },
        methods: {
            checkAvatar(index) {
                this.index = index;
            },
            async onSubmit() {
                if (isEmpty(this.index) && isEmpty(this.userInfo.photo)) {
                    Toast('请选择头像')
                    return;
                }
                if (isUndefined(this.index) || this.index == this.userInfo.photo) {
                    Toast('更改头像成功')
                    this.$router.back();
                    return;
                }
                let res = await this.$store.dispatch('setUserInfoEdit', {
                    type: 1,
                    value: this.index,
                });
                if (res) {
                    this.$router.back();
                }
            }
        }
    }
</script>

<style scoped>
    .app {
        min-height: 100vh;
        background-color: #D5D5D5;
    }

    .footer {
        position: absolute;
        bottom: 0;
        flex: 1;
    }
</style>
