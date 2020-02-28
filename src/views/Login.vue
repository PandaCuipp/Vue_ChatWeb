<template>
    <div class="flex-column justify-center container">
        <div class="content">
            <div class="flex-row justify-center align-center">
                <img class="logo-image" src="../assets/images/dt.png"/>
            </div>
            <van-cell>
                <van-field size="large" :border="false" class="inputs">
                    <input slot="input" class="slot-input" v-model="data.username" placeholder="请输入账号"/>
                    <van-icon slot="left-icon" color="white" name="contact"/>
                </van-field>
            </van-cell>
            <van-cell>
                <van-field :border="false" class="inputs">
                    <input type="password" slot="input" class="slot-input" v-model="data.password" placeholder="请输入密码"/>
                    <van-icon slot="left-icon" color="white" name="lock"/>
                </van-field>
            </van-cell>
            <div class="p_x25" style="width: 60%">
                <van-checkbox
                        @change="onCheckboxChange"
                        v-model="checked"
                        class="m_t5"
                        shape="square">
                    <span class="text-white line40 font14">记住密码</span>
                </van-checkbox>
            </div>
            <van-button type="info" class="btn-login" size="small" @click="onLogin">登录</van-button>
            <van-button @click="$router.push({name:'register'})" type="info" class="btn-reg" size="small">
                注册
            </van-button>

            <div @click="wxLogin" class="flex-row justify-center align-center wx-login">
                <img class="wx-login-img" src="../assets/images/wxlogin.png"/>
            </div>
        </div>
    </div>
</template>

<script>
    import config from "../config";
    import validator from "../utils/validator";
    import {login, userWxLogin} from "../api/models/user";
    import {goWxLogin, isArray, isEmpty, isFunction} from "../utils/helpers";
    import {getLoginToken} from "../utils/db";
    import {Toast} from "vant";


    export default {
        data() {
            return {
                checked: false,
                loading: null,
                data: {
                    username: '',
                    password: '',
                },
                rememberKey: '___rememberLocalKey',
                userNameKey: '___userNameLocalKey',
                passwordKey: '___passwordLocalKey',
            }
        },
        async created() {
            const token = getLoginToken();
            if (token) {
                this.loginSuccess();
            }
            // socket关闭
            if (isFunction(this.$disconnect)) this.$disconnect();

            // 如果连接中有微信返回的 code，则用此 code 调用后端接口，向微信服务器请求用户信息
            // 如果不是从微信重定向过来的，没有带着微信的 code，则直接进入首页
            if (this.$route.query.code) {
                let code = this.$route.query.code;
                if (isArray(code)) {
                    code = code.pop();
                }
                const res = await userWxLogin({code});
                if (res) {
                    this.loginSuccess();
                }

            }

            // 历史记住密码
            const remember = localStorage.getItem(this.rememberKey);
            this.checked = remember === 'true';
            const username = localStorage.getItem(this.userNameKey);
            if (!isEmpty(username)) {
                this.data.username = username;
            }
            const password = localStorage.getItem(this.passwordKey);
            if (!isEmpty(password)) {
                this.data.password = password;
            }
        },
        methods: {
            onCheckboxChange(val) {
                localStorage.setItem(this.rememberKey, val);
                if (!val) {
                    this.remember();
                }
            },
            remember(username = '', password = '') {
                localStorage.setItem(this.userNameKey, username);
                localStorage.setItem(this.passwordKey, password);
            },
            async onLogin() {
                this.showLoading('登录中...');
                let data = this.data;
                let valid = validator(data, {
                    username: 'required',
                    password: 'required',
                }, {
                    username: '用户名',
                    password: '密码',
                });
                if (valid) {
                    let res = await login(data);
                    this.closeLoading();
                    if (res.message) {
                        Toast(res.message)
                    }
                    if (res.state === 200) {
                        if (this.checked) {
                            this.remember(data.username, data.password);
                        }
                        this.loginSuccess();
                    }

                }

            },
            loginSuccess() {
                this.$store.dispatch('getUserInfo');
                this.$router.push({
                    name: config.homeName,
                    query: {formName: 'login'}
                });
            },
            wxLogin() {
                this.showLoading('登录中...', 1500);
                goWxLogin(encodeURIComponent(window.location.href));
            },
            showLoading(message = '', duration = 0) {
                this.closeLoading();
                const _toast = Toast.loading({
                    duration, // 0 持续展示 toast
                    forbidClick: true,
                    message,
                });
                if (duration === 0) {
                    this._toast = _toast;
                }

            },
            closeLoading() {
                if (this._toast) {
                    if (typeof this._toast.clear === 'function') {
                        this._toast.clear();
                    }
                    this._toast = null;
                }
            },
        }

    }
</script>

<style scoped>

    .container {
        min-height: 100vh;
        background: url('../assets/images/user_login_bg.png');
        background-size: 100% 100%;
    }

    .content {
        padding-left: 10%;
        padding-right: 10%;
    }

    .inputs {
        background-color: #8089B2;
        border-radius: 40px;
    }

    .slot-input {
        width: 100%;
        color: white;
        min-height: 30px;
        background-color: transparent;
        border-width: 0;
    }

    .slot-input::placeholder {
        color: #0AF6F9;
    }

    .van-cell {
        background-color: transparent;
        padding-bottom: 2px;
    }

    .left-icon {
        color: white;
    }

    .btn-login {
        display: block;
        border-radius: 100px;
        width: 100%;
        border-width: 0;
        height: 40px;
        margin-top: 20px;
        margin-bottom: 20px;
        background: linear-gradient(to bottom, #138A38 0%, #54AE70 100%);
    }

    .btn-reg {
        display: block;
        border-radius: 100px;
        width: 100%;

        border-width: 0;
        height: 40px;
        background: linear-gradient(to bottom, #78B5EA 0%, #1684D5 100%);
    }

    .logo-image {
        width: 120px;
        height: 120px;
    }

    .wx-login {
        padding-top: 10%;
    }

    .wx-login-img {
        width: 80px;
        height: 80px;
    }
</style>
