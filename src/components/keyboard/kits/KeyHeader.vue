<template>
    <div class="flex-row  input-border-height">
        <div class="font12 p_y5 p_l5" v-if="quickText&&quickText.length">
            <van-button @click="$emit('onQuick')" class="kui-btn flex" color="#62B1F6" size="small">{{quickText}}
            </van-button>
        </div>
        <div class="font14 p_x5 p_y5 flex flex1 keyboard-header-input-con">
            <div class="radius3 inline input-border">
                <input :ref="inputRef"
                       @click="$emit('onInputClick',$refs[inputRef])"
                       type="text"
                       @input="e=>$emit('input',e.target.value)" :value="value"
                       class="radius3 p_x5 input"
                       :placeholder="placeholder"/>
            </div>
            <div v-if="readonly"
                 @touchend="$emit('onInputClick',$refs[inputRef])"
                 class="keyboard-header-input-readonly"></div>
        </div>
        <div class="font12 p_y5 p_r5" v-if="value&&value.length">
            <van-button @click="$emit('onSend')" class="send-btn" color="#62B1F6" size="small">{{sendText}}
            </van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "KeyHeader",
        props: {
            quickText: {
                type: String,
                default: ''
            },
            sendText: {
                type: String,
                default: '发送'
            },
            value: {
                type: String,
                default: '',
            },
            placeholder: {
                type: String,
                default: '',
            },
            readonly: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                inputRef: '___key-header-input-ref'
            }
        },
        mounted() {
            // this.$refs[this.inputRef].focus();
            this.$emit('onInputMounted', this.$refs[this.inputRef]);
        }
    }
</script>


<style scoped>
    .input-border-height {
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .input-border {
        border: solid #ddd 1px;
        width: 100%;
        display: flex;
        justify-content: center;
        height: 40px;
    }

    .input {
        border: none;
        width: 100%;
    }

    .keyboard-header-input-con {
        position: relative;

    }

    .keyboard-header-input-readonly {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: transparent;
    }

    .kui-btn {
        min-width: initial;
    }

    .send-btn {
        min-width: initial;
        /*color: #1F90FF !important;*/
    }
</style>
