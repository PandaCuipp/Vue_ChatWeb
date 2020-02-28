<template>
    <div class="bg-light-blue app">
        <van-nav-bar
                class="bg-light-blue"
                :border="false"
        >
            <div class="router-back" @click="$router.back()" slot="left">
                <van-icon color="white" name="arrow-left"/>
            </div>
            <p slot="title" class="text-white">个人中心</p>
        </van-nav-bar>
        <div class="bg-light-blue flex-row p_y20">
            <div style="flex:1" class="p_l10">
                <van-image @click="$router.push({name:'userHeads'})"
                           round
                           width="50px"
                           height="50px"
                           :src="userHeads[userInfo.photo]"
                />
            </div>
            <div style="flex:1" class="flex-column align-end p_r15">
                <div class="text-white line30 font14">{{userInfo.cnname}}</div>
                <div class="text-white line30 font14">ID：{{userInfo.id}}</div>
            </div>
        </div>

        <div class="bg-white content p_t20 px-w100">
            <van-cell @click="toggleNicknameModal(true)" icon="contact" title="昵称设置" is-link :value="userInfo.cnname"/>
            <van-cell @click="togglePasswordModal(true)" :icon="lock" title="修改密码" is-link/>
            <van-cell @click="$router.push({name:'userHeads'})" icon="user-circle-o" title="修改头像" is-link/>
            <van-cell icon="info-o" title="当前版本" :value="version"/>
            <div class="p_y25 m_t25 flex-row justify-center">
                <van-button @click="onLogout" style="width: 80%" round type="danger">退出登录</van-button>
            </div>
        </div>


        <!--修改昵称start-->
        <van-dialog
                :close-on-click-overlay="true"
                :before-close="beforeCloseNicknameModal"
                v-model="nickname.show"
                title="修改昵称"
                show-cancel-button
        >
            <div class="p_y20 p_x20">
                <van-field clearable left-icon="contact" class="field-border radius5" v-model="nickname.value"
                           placeholder="请输入昵称"/>
            </div>
        </van-dialog>
        <!--修改昵称end-->

        <!--修改密码start-->
        <van-dialog
                :close-on-click-overlay="true"
                :before-close="beforeClosePasswordModal"
                v-model="password.show"
                title="修改密码"
                show-cancel-button
        >
            <div class="p_y20 p_x20">
                <van-field clearable type="password" :left-icon="lock" class="field-border radius5 m_y5"
                           v-model="password.oldValue"
                           placeholder="请输入旧密码"/>
                <van-field clearable type="password" :left-icon="lock" class="field-border radius5 m_y5"
                           v-model="password.newValue"
                           placeholder="请输入新密码"/>
                <van-field clearable type="password" :left-icon="lock" class="field-border radius5 m_y5"
                           v-model="password.reValue"
                           placeholder="请输入确认密码"/>
            </div>
        </van-dialog>
        <!--修改密码end-->
    </div>
</template>

<script>
    import {userHeads} from "../utils/images";
    import {mapGetters} from "vuex";
    import lock from "../assets/images/black-lock.png"
    import {isBoolean, isEmpty} from "../utils/helpers";
    import {Toast} from "vant";
    import config from "../config";

    export default {
        data() {
            return {
                userHeads,
                lock,
                version: config.version,
                nickname: {
                    show: false,
                    value: '',
                },
                password: {
                    show: false,
                    oldValue: '',
                    newValue: '',
                    reValue: '',
                }
            }
        },
        computed: {
            ...mapGetters(['userInfo']),
        },
        created() {
            this.$store.dispatch('getUserInfo');
        },
        methods: {
            togglePasswordModal(state) {
                let show = isBoolean(state) ? state : !this.password.show;
                let password = {
                    oldValue: '',
                    newValue: '',
                    reValue: '',
                    show
                };
                this.password = password;
            },
            toggleNicknameModal(state) {
                let show = isBoolean(state) ? state : !this.nickname.show;
                let nickname = {};
                if (show) {
                    nickname.value = this.userInfo.cnname;
                } else {
                    nickname.value = '';
                }
                nickname.show = show;
                this.nickname = nickname;
            },
            async beforeCloseNicknameModal(action, done) {
                if (action === 'confirm') {
                    let value = this.nickname.value;
                    if (isEmpty(value)) {
                        Toast('昵称不能为空');
                        return done(false);
                    }
                    if (value === this.userInfo.cnname) {
                        return done();
                    }
                    let res = await this.$store.dispatch('setUserInfoEdit', {
                        type: 2,
                        value,
                    });
                    done(res);
                } else {
                    done();
                }
            },
            async beforeClosePasswordModal(action, done) {
                if (action === 'confirm') {
                    let password = this.password;
                    if (isEmpty(password.oldValue) || isEmpty(password.newValue) || isEmpty(password.reValue)) {
                        Toast('密码不能为空');
                        return done(false);
                    }
                    if (password.newValue !== password.reValue) {
                        Toast('两次输入密码不相同');
                        return done(false);
                    }
                    let res = await this.$store.dispatch('setUserChangePass', {
                        old_pass: password.oldValue,
                        new_pass: password.newValue,
                        new_passconfirm: password.reValue,
                    });
                    done(res);
                } else {
                    done();
                }
            },
            async onLogout() {
                try {
                    await this.$store.dispatch('userLogout');
                } catch (e) {
                    console.log(e)
                }
                // let res = await logout();
                // if (res) {
                //     navigateTo(config.loginRouteName)
                // }
            },
        }
    }
</script>

<style scoped>
    .app {
        min-height: 100vh;
    }

    .content {
        position: absolute;
        bottom: 0;
        border-radius: 15px 15px 0 0;
        min-height: 60vh;
    }
</style>
