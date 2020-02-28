<template>
    <div class="flex-row justify-center font12 text-dark line25">
        <div v-if="!currentMessage.isJoinText">{{currentMessage.text}}</div>
        <div v-else>
            {{currentMessage.prefixText}}
            <span class="join-u-name">{{currentMessage.text}}</span>
            {{currentMessage.suffixText}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "SystemMessage",
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
            }
        },
        computed: {
            currentMessage() {
                let message = this.message;
                let text = message.text;
                if (!text || !text.length) {
                    return '';
                }
                let iText = '加入房间';
                if (text.endsWith(iText)) {
                    message.text = text.replace(iText, '');
                    message.prefixText = '欢迎';
                    message.suffixText = iText;
                    message.isJoinText = true;
                }
                return message;
            }
        }
    }
</script>

<style scoped>
    .join-u-name {
        color: #40ACF1;
    }
</style>
