<template>
    <div class="font14 flex-row container">
        <div class="flex-column flex1">
            <div class="flex flex1 key-row" :key="index" v-for="(col,index) of keys">
                <div :style="colStyle(item)"
                     class="flex-row justify-center align-center flex1 key-col"
                     :key="i"
                     @touchstart="touchstart(item.text)"
                     @touchend="touchend(item.text)"
                     v-for="(item,i) of col">
                    {{item.text}}
                </div>
            </div>
        </div>
        <div class="flex-column key-number-right">
            <div :style="colStyle(item)"
                 class="flex-row justify-center align-center flex1 key-col"
                 :key="i"
                 @touchstart="touchstart(item.text)"
                 @touchend="touchend(item.text)"
                 v-for="(item,i) of keyRight">
                {{item.text}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "KeyNumberBody",
        data() {
            return {
                timer: null,
                keys: [
                    [
                        {text: '1'},
                        {text: '2'},
                        {text: '3'},
                    ],
                    [
                        {text: '4'},
                        {text: '5'},
                        {text: '6'},
                    ],
                    [
                        {text: '7'},
                        {text: '8'},
                        {text: '9'},
                    ],
                    [
                        {text: '0'},
                        {text: '.'},
                    ],
                ],
                keyRight: [
                    {text: '删除', color: 'white', bgColor: '#FFA601'},
                    {text: '完成', color: 'white', bgColor: '#1F90FF'},
                    // {text: '清除', color: 'white', bgColor: '#1F90FF'},
                ],
            }
        },

        methods: {
            touchstart(val) {
                if (val === '删除') {
                    this.timer = setTimeout(() => {
                        this.longPress(val)
                    }, 500);
                }

            },
            touchend(val) {
                this.timer && clearTimeout(this.timer);
                switch (val) {
                    case '删除':
                        this.$emit('onBack', val);
                        break;
                    case '清除':
                        this.longPress(val);
                        break;
                    case '完成':
                        this.$emit('onSend');
                        break;
                    default:
                        this.$emit('onPress', val);
                }
            },
            longPress(val) {
                this.$emit('onLongPress', val);
            },
            colStyle(item) {
                return {
                    color: item.color || '#333',
                    backgroundColor: item.bgColor || 'white',
                    border: 'solid 1px #EFF0F1',
                }

            }
        }
    }
</script>

<style scoped>
    .container {
        background-color: #EFF0F1;
        color: #333;
    }


    .key-col {
        background-color: white;
        text-align: center;
        height: 100%;
        border-radius: 5px;
    }

    .key-col:active {
        opacity: 0.2;
        user-select: none;
    }

    .key-number-right {
        width: 100px;
    }
</style>
