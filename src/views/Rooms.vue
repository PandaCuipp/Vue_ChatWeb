<template>
    <div class="app">
        <van-nav-bar
                class="bg-purple"
                :border="false"
        >
            <div v-if="formName!=='login'" @click="onBack" slot="left" class="text-white font14 router-back">
                <van-icon color="white" name="arrow-left"/>
            </div>
            <div @click="onLogout" slot="right" class="text-white font14">
                退出登录
            </div>
        </van-nav-bar>
        <div class="flex-row justify-center p_t10 align-center">
            <div class="container">
                <div class="header">
                    <img src="../assets/images/ic_pop_add_club_tip.png">
                </div>
                <div style="overflow-y: auto;max-height: 80%">
                    <div class="content">
                        <div class="flex-row justify-center number">
                            <div v-for="(v,i) of numberFillArray"
                                 class="flex-row justify-center align-center number-item">
                                {{number.value[i]}}
                            </div>
                        </div>
                        <div class="keys">
                            <div v-for="col of keys" class="flex-row justify-center key-row">
                                <div @click="onKeyClick(item)" @mousedown="onKeyDown(item)" @mouseup="onKeyUp(item)"
                                     v-for="item of col" class="key-col">
                                    <img v-if="item.keydown"
                                         :src="item.hoverIcon">
                                    <img v-else :src="item.icon">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <div @click="intoRoomByCode" class="flex-row justify-center into">
                            <img src="../assets/images/keys/ic_select_login_btn_bg.png">
                        </div>
                        <div class="p_t5 p_x20">
                            <p class="text-white font12">最近进入的房间</p>
                        </div>
                        <div class="flex-row align-start flex-wrap p_x20 rooms">
                            <div @click="intoRoomById(i.id)" v-for="i of rooms"
                                 class="flex-column justify-center align-center room">
                                <img :src="roomHeads[i.room_photo]">
                                <p>{{i.room_name?i.room_name:i.room_id}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import ic_key_1 from "../assets/images/keys/ic_key_1.png"
    import ic_key_2 from "../assets/images/keys/ic_key_2.png"
    import ic_key_3 from "../assets/images/keys/ic_key_3.png"
    import ic_key_4 from "../assets/images/keys/ic_key_4.png"
    import ic_key_5 from "../assets/images/keys/ic_key_5.png"
    import ic_key_6 from "../assets/images/keys/ic_key_6.png"
    import ic_key_7 from "../assets/images/keys/ic_key_7.png"
    import ic_key_8 from "../assets/images/keys/ic_key_8.png"
    import ic_key_9 from "../assets/images/keys/ic_key_9.png"
    import ic_key_0 from "../assets/images/keys/ic_key_0.png"
    import ic_key_reset from "../assets/images/keys/ic_key_reset.png"
    import ic_key_delete from "../assets/images/keys/ic_key_delete.png"
    import hover_key_1 from "../assets/images/keys/ic_key_1_press.png"
    import hover_key_2 from "../assets/images/keys/ic_key_2_press.png"
    import hover_key_3 from "../assets/images/keys/ic_key_3_press.png"
    import hover_key_4 from "../assets/images/keys/ic_key_4_press.png"
    import hover_key_5 from "../assets/images/keys/ic_key_5_press.png"
    import hover_key_6 from "../assets/images/keys/ic_key_6_press.png"
    import hover_key_7 from "../assets/images/keys/ic_key_7_press.png"
    import hover_key_8 from "../assets/images/keys/ic_key_8_press.png"
    import hover_key_9 from "../assets/images/keys/ic_key_9_press.png"
    import hover_key_0 from "../assets/images/keys/ic_key_0_press.png"
    import hover_key_reset from "../assets/images/keys/ic_key_reset_press.png"
    import hover_key_delete from "../assets/images/keys/ic_key_delete_press.png"
    import {logout} from "../api/models/user";
    import {navigateTo} from "../utils/navigate";
    import config from "../config";
    import {intoRoom} from "../api/models/room";
    import {Toast} from "vant";
    import {roomHeads} from "../utils/images";

    export default {
        data() {
            return {
                roomHeads: roomHeads,
                rooms: [],
                formName: '',
                number: {
                    length: 6,
                    value: []
                },
                keys: [
                    [
                        {value: 1, icon: ic_key_1, hoverIcon: hover_key_1, keydown: false},
                        {value: 2, icon: ic_key_2, hoverIcon: hover_key_2, keydown: false},
                        {value: 3, icon: ic_key_3, hoverIcon: hover_key_3, keydown: false},
                    ],
                    [
                        {value: 4, icon: ic_key_4, hoverIcon: hover_key_4, keydown: false},
                        {value: 5, icon: ic_key_5, hoverIcon: hover_key_5, keydown: false},
                        {value: 6, icon: ic_key_6, hoverIcon: hover_key_6, keydown: false},
                    ],
                    [
                        {value: 7, icon: ic_key_7, hoverIcon: hover_key_7, keydown: false},
                        {value: 8, icon: ic_key_8, hoverIcon: hover_key_8, keydown: false},
                        {value: 9, icon: ic_key_9, hoverIcon: hover_key_9, keydown: false},
                    ],
                    [
                        {value: 'reset', icon: ic_key_reset, hoverIcon: hover_key_reset, keydown: false},
                        {value: 0, icon: ic_key_0, hoverIcon: hover_key_0, keydown: false},
                        {value: 'delete', icon: ic_key_delete, hoverIcon: hover_key_delete, keydown: false},
                    ],
                ]
            }
        },
        computed: {
            ...mapGetters(['userInfo']),
            numberFillArray() {
                return (new Array(this.number.length)).fill(0);
            }
        },
        created() {
            this.formName = this.$route.query.formName;
            this.$store.dispatch('getUserInfo');
            this.initRooms();
        },
        methods: {
            async initRooms() {
                // "id": 1,
                // "room_name": "cs1188房间",
                // "room_photo": 6,
                // "room_id": 524691
                let res = await intoRoom({type: 1});
                this.rooms = res.data;
            },
            async intoRoomByCode() {
                let code = this.number.value;
                if (code.length < this.number.length) {
                    Toast('请输入完整的房间号');
                    return;
                }
                let res = await intoRoom({
                    type: 3,
                    code: code.join(''),
                });
                this.goToHomePage(res);
            },
            async intoRoomById(parent_id) {
                let res = await intoRoom({
                    type: 2,
                    parent_id,
                });
                this.goToHomePage(res);
            },
            goToHomePage(res) {
                Toast(res.message);
                if (res.state === 200) {
                    this.$router.push({name: 'home'});
                }
            },
            onKeyUp(item) {
                setTimeout(() => {
                    item.keydown = false
                }, 200)
            },
            onKeyDown(item) {
                item.keydown = true;
            },
            onBack() {
                this.$router.back();
            },
            async onLogout() {
                let res = await logout();
                if (res) {
                    navigateTo(config.loginRouteName)
                }
            },
            onKeyClick(item) {
                switch (item.value) {
                    case 'reset':
                        this.number.value = [];
                        break;
                    case 'delete':
                        this.number.value.pop();
                        break;
                    default:
                        const number = this.number;
                        if (number.length <= number.value.length) {
                            return;
                        } else {
                            this.number.value.push(item.value);
                        }

                }

            }

        }
    }
</script>

<style scoped>
    .app {
        min-height: 100vh;
        background: url('../assets/images/user_login_bg.png');
        background-size: 100% 100%;
        flex: 1;
    }

    .container {
        width: 90%;
        height: 90vh;
        background: url('../assets/images/ic_pop_drop_bg.png') no-repeat;
        background-size: 100% 100%;
    }

    .header > img {
        width: 100%;
        margin-top: 5px;
    }

    .number-item {
        width: 30px;
        height: 38px;
        margin-left: 2px;
        margin-right: 2px;
        background: url('../assets/images/keys/ic_edit_nums_bg.png') no-repeat;
        background-size: 100% 100%;
        color: white;
    }

    .keys {
        padding: 10px;
    }

    .key-col > img {
        width: 70px;
        height: 40px;
        margin-left: 5px;
        margin-right: 5px;
    }

    .into {
        width: 100%;
        height: 50px;
    }

    .into > img {
        width: 90%;
        height: 100%;
    }

    .room {
        padding: 2px;
        max-width: 25%;
    }

    .room > img {
        width: 40px;
        height: 40px;
    }

    .room > p {
        line-height: 18px;
        padding: 0;
        margin: 0;
        font-size: 12px;
        color: white
    }
</style>
