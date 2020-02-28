<template>
    <div class="flex-column justify-center register-container">
        <van-nav-bar
                fixed
                :border="false"
                class="register-nav-bar">
            <div class="router-back" @click="$router.back()" slot="left">
                <van-icon color="white" name="arrow-left"/>
            </div>
            <div slot="title" class="flex-row justify-center align-center text-white">
                注册
            </div>
        </van-nav-bar>
        <div class=" register-content">
            <van-cell>
                <van-field :border="false" class="inputs">
                    <input slot="input" v-model="data.username" class="slot-input" placeholder="请输入用户名"/>
                    <van-icon slot="left-icon" color="white" name="contact"/>
                </van-field>
            </van-cell>
            <van-cell>
                <van-field :border="false" class="inputs">
                    <input type="password" v-model="data.new_pass" slot="input" class="slot-input" placeholder="请输入密码"/>
                    <van-icon slot="left-icon" color="white" name="lock"/>
                </van-field>
            </van-cell>

            <van-cell>
                <van-field :border="false" class="inputs">
                    <input type="password" v-model="data.new_passconfirm" slot="input" class="slot-input"
                           placeholder="请输入确认密码"/>
                    <van-icon slot="left-icon" color="white" name="lock"/>
                </van-field>
            </van-cell>

            <van-button @click="onRegister" type="info" class="btn-reg" size="small">注册
            </van-button>
        </div>
    </div>
</template>

<script>
    import validator from "../utils/validator";
    import {userRegister} from "../api/models/user";
    import config from "../config";

    export default {
        name: "Register",
        data() {
            return {
                data: {
                    username: '',
                    new_pass: '',
                    new_passconfirm: ''
                }
            }
        },
        methods: {
            async onRegister() {
                let data = this.data;
                let valid = validator(data, {
                    username: 'required|min:6',
                    new_pass: 'required|min:6',
                    new_passconfirm: 'required|same:new_pass',
                }, {
                    username: '用户名',
                    new_pass: '密码',
                    new_passconfirm: '确认密码',
                });
                if (valid) {
                    let res = await userRegister(data)
                    if (res) {
                        this.$router.push({
                            name: config.loginRouteName,
                        });
                    }

                }

            }
        }
    }
</script>

<style scoped>
    .register-container {
        min-height: 100vh;
        background: url('../assets/images/ic_select_login_bg.png');
        background-size: 100% 100%;
    }

    .register-nav-bar {
        background-color: transparent;
        box-shadow: 0 0 5px #666;
    }

    .register-content {
        padding-left: 15%;
        padding-right: 15%;
    }

    .inputs {
        background-color: transparent;
        border-radius: 40px;
    }

    .van-cell {
        background-color: transparent;
        padding-bottom: 5px;
    }

    .slot-input {
        color: white;
        background-color: transparent;
        border-width: 0;
    }

    .slot-input::placeholder {
        color: white;
    }

    .btn-reg {
        display: block;
        border-radius: 100px;
        width: 100%;
        margin-top: 60px;
        margin-bottom: 20px;
        border-width: 0;
        height: 40px;
        background: linear-gradient(to bottom, #78B5EA 0%, #1684D5 100%);
    }
</style>
