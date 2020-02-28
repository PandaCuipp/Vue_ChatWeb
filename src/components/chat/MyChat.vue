<template>
    <div class="p_y10 container">
        <van-row>
            <van-col :span="24" v-for="(item,index) of data">
                <SystemMessage :key="index" :user="user" :message="item" v-if="item.system"/>
                <UserMessage @onImageLoad="scrollToBottom()" :key="index" :show-time="showTime" :user="user"
                             :message="item" v-else/>
            </van-col>
        </van-row>
        <div v-if="notOpen" class="chat-not-open"></div>
    </div>
</template>

<script>


    import SystemMessage from "./SystemMessage";
    import UserMessage from "./UserMessage";
    import {isArray} from "../../utils/helpers";

    export default {
        name: "MyChat",
        components: {
            SystemMessage,
            UserMessage,
        },
        props: {
            user: {
                type: Object,
                default() {
                    return {};
                }
            },
            data: {
                type: Array,
                default() {
                    return [];
                }
            },
            showTime: {
                type: Boolean,
                default: true,
            },
            notOpen: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            isCurrentUser(message) {
                // 任何时候只要有新消息都滚动
                return true;
                if (!message.user) {
                    return false;
                }
                return this.user._id === message.user._id;
            },
            scrollToBottom() {
                this.$nextTick(() => {
                    this.$el.scrollTop = this.$el.scrollHeight;
                    this.$el.pageYOffset = this.$el.scrollHeight;
                    this.$el.scrollIntoView({
                        behavior: "smooth",  // 平滑过渡
                        block: "end"
                    });
                })
            }
        },
        watch: {
            data(val) {
                if (isArray(val) && val.length && this.isCurrentUser(val[val.length - 1])) {
                    this.scrollToBottom();
                }
            }
        },
        data() {
            return {
                user1: {
                    _id: 1,
                    avatar: require("../../assets/images/heads/10.png"),
                },
                data1: [
                    {
                        createdAt: new Date(),
                        system: true,
                        text: '2019-12-24',
                        user: {_id: 0, avatar: null}
                    },
                    {
                        createdAt: new Date(),
                        system: true,
                        text: 'aaa加入房间',
                        user: {_id: 0, avatar: null,}
                    },
                    {
                        createdAt: new Date(),
                        system: false,
                        text: '10/10/10',
                        user: {_id: 2, name: 'aaa', avatar: require("../../assets/images/heads/11.png")}
                    },
                    {
                        createdAt: new Date(),
                        system: false,
                        text: '123/123/10',
                        user: {_id: 3, name: 'bbb', avatar: require("../../assets/images/heads/1.png")}
                    },
                    {
                        createdAt: new Date(),
                        system: false,
                        text: '123/123/10',
                        user: {_id: 1, name: 'ccc', avatar: require("../../assets/images/heads/1.png")}
                    },
                    {
                        createdAt: new Date(),
                        system: false,
                        image: 'http://proxy_api.56889.in:666/generator/11_201912151092.png',
                        user: {_id: 0, name: '管理员', avatar: null}
                    },
                ],
            }
        }
    }
</script>

<style scoped>
    .container {
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column-reverse;
        justify-content: flex-start;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 10px;
    }

    .chat-not-open {
        position: fixed;
        margin: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5) url("../../assets/images/game/not_open.png") no-repeat center;
    }
</style>
