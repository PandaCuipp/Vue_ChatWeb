<template>
    <div class="flex-column no-select container">
        <KeyHeader :quickText="quickText"
                   :readonly="readonly"
                   @onSend="$emit('onSend',value)"
                   @onQuick="$emit('onQuick')"
                   @onInputMounted="e=>$emit('onInputMounted',e)"
                   @onInputClick="e=>$emit('onInputClick',e)"
                   @input="e=>$emit('input',e.target.value)" :value="value"
                   :placeholder="placeholder"/>
        <slot>
            <KeyNumberBody v-if="type==='number'" v-show="body"
                           @onBack="$emit('onBack')"
                           @onSend="$emit('onSend',value)"
                           @onPress="e=>$emit('onPress',e)"
                           @onLongPress="e=>$emit('onLongPress')"/>
            <KeyBody v-else v-show="body" :type="type"
                     @onBack="$emit('onBack')"
                     @onClose="$emit('onClose')"
                     @onPress="e=>$emit('onPress',e)"
                     @onPressOut="e=>$emit('onPressOut',e)"
                     @onLongPress="e=>$emit('onLongPress')"/>
        </slot>
    </div>
</template>

<script>
    import {isEmpty} from "../../utils/helpers";
    import KeyHeader from "./kits/KeyHeader";
    import KeyBody from "./kits/KeyBody";
    import KeyNumberBody from "./kits/KeyNumberBody";

    export default {
        name: "MyKeyboard",
        components: {
            KeyHeader,
            KeyBody,
            KeyNumberBody,
        },
        props: {
            type: {
                type: String,
                default: 'circle', // square、number
            },
            placeholder: {
                type: String,
                default: '',
            },
            body: {
                type: Boolean,
                default: true,
            },
            value: {
                type: String,
                default: '',
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
        methods: {
            onPress(val) {
                if (isEmpty(val)) {
                    return;
                }
                switch (val) {
                    case 'close':
                        this.$emit('onClose');
                        break;
                    case '回水':
                    case '中/英':
                        this.$emit('onCheck', val);
                        break;
                    default:
                        this.value = `${this.value}${val}`;
                }

            },
            onBack() {
                let value = this.value.split('');
                if (value.length) {
                    value.pop();
                    this.value = value.join('');
                }
            },
            // 长按删除
            onLongPress() {
                this.value = '';
            }
        }
    }
</script>

<style scoped>
    .container {
        height: 100%;
    }
</style>
