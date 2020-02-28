<template>
    <van-row class="p_y5 message-box">
        <van-col :offset="1" :span="22"
                 class="flex px-font-12 text-dark px-line-20"
                 :style="alignStyle">
            <template v-if="isCurrentUser">
                <template v-if="showTime">
                    {{message.createAt|dateFormat(dateFormat)}}
                </template>
                <span class="p_x5">{{`${userName}`}}</span>
            </template>
            <template v-else>
                <!--<span class="p_x5 text-dark" v-if="userName&&userName.length">{{userName}}</span>-->
                <span class="p_x5">{{`${userName}`}}</span>
                <template v-if="showTime">
                    {{message.createAt|dateFormat(dateFormat)}}
                </template>
            </template>
        </van-col>
        <van-col :offset="1" :span="22"
                 class="flex"
                 :style="alignStyle">
            <div class="bg-white p_y5 p_x10 radius5 message-box-content">
                <van-image
                        @load="$emit('onImageLoad')"
                        @click="onImagePreview(message.image)"
                        v-if="message.image"
                        class="m_y5 bg-white"
                        :src="message.image"
                />
                <p v-else v-html="message.text"></p>

                <span :class="arrowClass"/>
            </div>
        </van-col>
    </van-row>
</template>

<script>
    import {dateFormat} from "../../../utils/helpers";
    import {ImagePreview} from "vant";

    export default {
        name: "MessageBox",
        filters: {
            dateFormat,
        },
        props: {
            showTime: {
                type: Boolean,
                default: true,
            },
            isCurrentUser: {
                type: Boolean,
                default: false,
            },
            dateFormat: {
                type: String,
                default: 'Y-m-d',
            },
            message: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed: {
            userName() {
                const user = this.message.user || {}
                return user.name;
            },
            arrowClass() {
                return [
                    'message-box-arrow',
                    this.isCurrentUser ? 'px-right-arrow' : 'px-left-arrow',
                ];
            },
            alignStyle() {
                return {
                    'justify-content': this.isCurrentUser ? 'flex-end' : 'flex-start'
                }
            }
        },
        methods: {
            onImagePreview(url) {
                ImagePreview({
                    images: [url],
                    showIndex: false,
                    closeOnPopstate: true,
                });
            }
        }
    }
</script>

<style scoped>
    .px-font-12 {
        font-size: 12px;
    }

    .px-line-20 {
        line-height: 20px;
    }

    .message-box-content {
        min-height: 30px;
        min-width: 50px;
        color: #000;
        position: relative;
    }

    .message-box-arrow {
        width: 0;
        height: 0;
        position: absolute;
        top: 5px;
        display: inline;
        border: solid transparent 6px;
    }

    .px-left-arrow {
        border-right-color: white;
        left: -12px;
    }

    .px-right-arrow {
        border-left-color: white;
        right: -12px;
    }
</style>
