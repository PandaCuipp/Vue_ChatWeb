<template>
    <div class="bg-white">
        <van-row class="history-list-header">
            <van-col class="font12 text-center line20 history-list-header-text" span="4">期号</van-col>
            <van-col class="font12 text-center line20 history-list-header-text" span="12">
                开奖号码
            </van-col>
            <van-col class="font12 text-center line20 history-list-header-text" span="4">总和</van-col>
            <van-col class="font12 text-center line20 history-list-header-text" span="4">龍虎和</van-col>
        </van-row>
        <van-list
                class="s-list-container"
                :immediate-check="false"
                :value="loading"
                :finished="finished"
                :finished-text="finishedText"
                @load="onLoad"
        >
            <van-pull-refresh class="p_y5" :value="isLoading" @refresh="onRefresh">
                <van-row v-for="(item,index) of listsData">
                    <van-col class="font12 text-center line20" span="4">{{item.qihao}}</van-col>
                    <van-col class="font12 text-center line20" span="12">
                        <Balls :key="index" :balls="item.haoma"/>
                    </van-col>
                    <van-col class="font12 line20 flex-row justify-around" span="4">
                        <span class="font12">{{item.gYaHe.value}}</span>
                        <span class="font12 " :style="{color:item.gYaHe.dxColor}">{{item.gYaHe.dx}}</span>
                        <span class="font12" :style="{color:item.gYaHe.dxColor}">{{item.gYaHe.ds}}</span>
                    </van-col>
                    <van-col class="font12 text-center line20" span="4">
                        <span class="font12" :style="{color:item.gYaHe.lhColor}">{{item.gYaHe.lhText}}</span>
                    </van-col>
                </van-row>
            </van-pull-refresh>
        </van-list>
    </div>
</template>

<script>
    import Balls from "../balls/Balls";
    import {bcComp, isArray, lhColor, lhText, isObject, isString} from "../../utils/helpers";

    export default {
        name: "cList",
        components: {
            Balls,
        },
        props: {
            data: Array,
            finishedText: {
                type: String,
                default: '没有更多了'
            },
            // 是否正在下拉加载中
            isLoading: {
                type: Boolean,
                default: false
            },
            // 是否正在加载更多中
            loading: {
                type: Boolean,
                default: false
            },
            // 服务器数据是否加载完成（达到最底）
            finished: {
                type: Boolean,
                default: false
            },
        },
        computed: {
            listsData() {
                let data = [...this.data];
                return data.map(item => {
                    if (item.__type === 'cList') {
                        return item;
                    }
                    item.__type = 'cList';
                    let haoma = item.haoma || '';
                    if (isString(haoma)) {
                        haoma = haoma.split(',');
                        item.haoma = haoma;
                    }
                    item.gYaHe = this.gYaHe(haoma);
                    return item;
                });
            }
        },
        methods: {
            onLoad() {
                if (!this.data.length || this.isLoading || this.loading) {
                    return;
                }
                this.$emit('onLoad')
            },
            onRefresh() {
                this.$emit('onRefresh')
            },
            gYaHe(haoma) {
                let lh = bcComp(haoma[0], haoma[4]);
                let sum = haoma.reduce((a, b) => {
                    return Number(a) + Number(b);
                }, 0);
                let dx = sum >= 22;
                let ds = sum % 2 === 0;
                return {
                    value: sum,
                    dx: dx ? '大' : '小',
                    dxColor: dx ? 'red' : '#0089FF',
                    ds: ds ? '双' : '单',
                    dsColor: ds ? 'red' : '#0089FF',
                    lhText: lhText(lh),
                    lhColor: lhColor(lh),
                }

            }
        }
    }
</script>

<style scoped>
    .s-list-container {
        max-height: 200px;
        overflow-y: auto;
    }

    .history-list-header {
        background-color: #F5F5F5;
    }

    .history-list-header-text {
        color: #666;
    }

    /* 该样式应与方球保持统一  */
    /* 参考：components/balls/sBall.vue => .ball*/
    .h-header-ball-item {
        display: inline-block;
        text-align: center;
        width: 15px;
        margin: 0 1px;
    }
</style>
