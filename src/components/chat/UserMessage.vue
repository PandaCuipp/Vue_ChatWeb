<template>
    <div class="flex-row font12 text-dark line25 p_x5">
        <UserAvatar :src="userAvatar" v-if="!isCurrentUser"/>
        <div class="flex flex1" :style="alignStyle">
            <MessageBox @onImageLoad="$emit('onImageLoad')" :show-time="showTime" :message="message"
                        :is-current-user="isCurrentUser"/>
        </div>
        <UserAvatar :src="userAvatar" v-if="isCurrentUser"/>
    </div>
</template>

<script>
    import {isEmpty, isNumber} from "../../utils/helpers";
    import UserAvatar from "./kits/UserAvatar";
    import MessageBox from "./kits/MessageBox";
    import {userHeads} from "../../utils/images";

    export default {
        name: "UserMessage",
        components: {
            UserAvatar,
            MessageBox,
        },
        data() {
            return {
                userHeads,
            }
        },
        props: {
            user: {
                type: Object,
                default() {
                    return {};
                }
            },
            message: {
                type: Object,
                default() {
                    return {};
                }
            },
            showTime: {
                type: Boolean,
                default: true,
            },
        },
        computed: {
            isCurrentUser() {
                if (!this.message.user) {
                    return false;
                }
                return this.user._id === this.message.user._id;
            },
            userAvatar() {
                let messageUser = this.message.user;
                if (isEmpty(messageUser)) {
                    messageUser = this.isCurrentUser ? this.user : {};
                }
                if (messageUser._id <= 0) {
                    return require('../../assets/images/person.png');
                }
                if (isNumber(messageUser.avatar)) {
                    return this.userHeads[messageUser.avatar || 0];
                }
                return messageUser.avatar || require('../../assets/images/heads/1.png');
            },
            alignStyle() {
                return {
                    'justify-content': this.isCurrentUser ? 'flex-end' : 'flex-start'
                }
            }
        }
    }
</script>

<style scoped>

</style>
