<template>
    <div class="font14 flex-column container">
        <div class="flex flex1 key-row" :key="index" v-for="(col,index) of keys">
            <button :style="colStyle(index,i,item)"
                    class="flex-row justify-center align-center flex1 key-col"
                    @touchstart="touchstart(item.text,$event)"
                    @touchend="touchend(item.text)"
                    v-for="(item,i) of col">
                <van-icon v-if="item.text==='back'" :size="35" :name="require('../../../assets/images/back.png')"/>
                <van-icon v-else-if="item.text==='close'" :size="25"
                          :name="require('../../../assets/images/a_down.png')"/>
                <template v-else>
                    {{item.text}}
                </template>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "KeyBody",
        props: {
            type: {
                type: String,
                default: 'circle', // square
            },
        },
        data() {
            return {
                timer: null,
                keys1: [
                    [
                        {text: '取消'},
                        {text: '上分'},
                        {text: '查'},
                        {text: '下分'},
                        {text: 'close', icon: 'arrow-down'},
                    ],
                    [
                        {text: '前三'},
                        {text: '中三'},
                        {text: '后三'},
                        {text: '总和'},
                        {text: 'back', icon: 'arrow-left'},
                    ],
                    [
                        {text: '豹子'},
                        {text: '对子'},
                        {text: '顺子'},
                        {text: '半顺'},
                        {text: '杂六'},
                    ],
                    [
                        {text: '大'},
                        {text: '1'},
                        {text: '2'},
                        {text: '3'},
                        {text: '龙', color: 'red'},
                    ],
                    [
                        {text: '小'},
                        {text: '4'},
                        {text: '5'},
                        {text: '6'},
                        {text: '和', color: 'white', bgColor: '#1F90FF'},
                    ],
                    [
                        {text: '单'},
                        {text: '7'},
                        {text: '8'},
                        {text: '9'},
                        {text: '虎', color: '#0202FF'},
                    ],
                    [
                        {text: '双'},
                        {text: '/'},
                        {text: '0'},
                        {text: '回水'},
                        {text: '中/英', color: 'white', bgColor: '#FFA601'},
                    ],
                ],
                keys2: [
                    [
                        {text: '取消'},
                        {text: '上分'},
                        {text: '查'},
                        {text: '下分'},
                        {text: '回水'},
                        {text: 'close', icon: 'arrow-down'},
                    ],
                    [
                        {text: '大'},
                        {text: '1'},
                        {text: '2'},
                        {text: '3'},
                        {text: 'back', icon: 'arrow-left'},
                    ],
                    [
                        {text: '小'},
                        {text: '4'},
                        {text: '5'},
                        {text: '6'},
                        {text: '龙', color: 'red'},
                    ],
                    [
                        {text: '单'},
                        {text: '7'},
                        {text: '8'},
                        {text: '9'},
                        {text: '虎', color: '#0202FF'},
                    ],
                    [
                        {text: '双'},
                        {text: '和', color: 'white', bgColor: '#1F90FF'},
                        {text: '0'},
                        {text: '/'},
                        {text: '中/英', color: 'white', bgColor: '#FFA601'},
                    ],
                ]
            }
        },
        computed: {
            keys() {
                if (this.type === 'circle') {
                    return this.keys1;
                }
                return this.keys2;
            }
        },
        methods: {
            touchstart(val, e) {
                if (e) {
                    e.preventDefault();
                }
                switch (val) {
                    case 'back':
                        this.$emit('onBack', val);
                        this.timer = setTimeout(() => {
                            this.longPress(val)
                        }, 500);
                        break;
                    case 'close':
                        this.$emit('onClose', val);
                        break;
                    default:
                        this.$emit('onPress', val);
                }
            },
            touchend(val) {
                this.timer && clearTimeout(this.timer);
            },
            longPress(val) {
                this.$emit('onLongPress', val);
            },
            colStyle(row, col, item) {
                const initStyle = {
                    color: item.color || '#333',
                    backgroundColor: item.bgColor || 'white'
                }
                if (row === 0) {
                    return {
                        ...initStyle,
                        borderTop: 'solid 1px #EFF0F1',
                        borderBottom: 'solid 1px #EFF0F1',
                    }
                } else if (col > 0) {
                    return {
                        ...initStyle,
                        border: 'solid 1px #EFF0F1',

                    }
                } else if (col === 1 && row === 1) {
                    return {
                        ...initStyle,
                        borderTop: 'solid 1px #EFF0F1'
                    }
                } else {
                    return {
                        ...initStyle,
                        borderRight: 'solid 1px #EFF0F1'
                    }
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
        border-width: 0;
        background-color: white;
        text-align: center;
        height: 100%;
        border-radius: 5px;
    }

    .key-col:active {
        opacity: 0.2;
        user-select: none;
    }
</style>
