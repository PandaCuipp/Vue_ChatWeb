<template>
    <div class="flex-column flex1 px-w100 bg-white liu-he-key-footer">
        <MyKeyboard
                :class="[body?'has-body-height':'not-has-body-height']"
                :value="value"
                @input="onInput"
                :readonly="readonly"
                :quickText="quickText"
                @onSend="$emit('onSend',value)"
                @onQuick="onLongPress"
                @onBack="onBack"
                @onPress="onPress"
                @onLongPress="onLongPress"
                @onInputClick="e=>$emit('onInputClick',e)"
                :placeholder="placeholder"
                type="number"
                :body="body">
            <div v-show="body" class="flex-column flex1 q-key-footer-con">
                <van-row class="flex flex1" v-for="col of keys">
                    <van-col v-for="item of col" class="flex-row justify-center align-center" :span="24/col.length">
                        <div
                                @touchstart="onQKeyTouchstart(item)"
                                @touchend="onQKeyTouchend(item)"
                                class="no-select q-key-item-btn">
                            {{item}}
                        </div>
                    </van-col>
                </van-row>
            </div>
        </MyKeyboard>
    </div>
</template>

<script>

    import MyKeyboard from "../../keyboard/MyKeyboard";
    import {isEmpty} from "../../../utils/helpers";

    export default {
        name: "LiuHeFooter",
        components: {
            MyKeyboard,
        },
        props: {
            value: {
                type: String,
                default: '',
            },
            body: {
                type: Boolean,
                default: true,
            },
            placeholder: {
                type: String,
                default: '投注金额',
            },
            quickText: {
                type: String,
                default: ''
            },
            readonly: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                keys: [
                    [1, 2, 3, '<'],
                    [4, 5, 6, '.'],
                    [7, 8, 9, 0],
                ],
                timer: null,
            }
        },
        methods: {
            onQKeyTouchstart(val) {
                if (val === '<') {
                    this.timer = setTimeout(() => {
                        this.onLongPress(val)
                    }, 500);
                }

            },
            onQKeyTouchend(val) {
                this.timer && clearTimeout(this.timer);
                switch (val) {
                    case '<':
                        this.onBack();
                        break;
                    default:
                        this.onPress(val);
                }
            },
            onPress(val) {
                if (isEmpty(val)) {
                    return;
                }
                switch (val) {
                    case 'close':
                        this.$emit('onClose')
                        break;
                    default:
                        if (val === '.') {
                            if (this.value.indexOf(val) > -1) {
                                return;
                            }
                            if (!this.value.length) {
                                this.value = `0${val}`;
                                return;
                            }
                        }
                        this.onInput(`${this.value}${val}`);
                }
            },
            onInput(val) {
                this.$emit('input', val);
            },
            onBack() {
                let value = this.value.split('');
                if (value.length) {
                    value.pop();
                    this.onInput(value.join(''));
                }
            },
            onLongPress() {
                this.onInput('');
            },
        }
    }
</script>

<style scoped>
    .liu-he-key-footer {
        position: fixed;
        bottom: 0;
    }

    /*参考 ../LiuHeKeyboard.vue .con-has-keyboard*/
    .has-body-height {
        height: 6.66667rem;
    }

    /*参考 ../LiuHeKeyboard.vue .con-not-has-keyboard*/
    .not-has-body-height {
        height: 1.4rem;
    }

    .q-key-footer-con {
        background-color: #EBEBEB;
        height: 100%;
    }

    .q-key-item-btn {
        background-color: white;
        width: 50px;
        text-align: center;
        border-radius: 5px;
        line-height: 40px;
        height: 40px;
        font-size: 16px;
        box-shadow: -1px 1px 5px #ccc;
    }

    .q-key-item-btn:active {
        background-color: #eee;
    }
</style>
