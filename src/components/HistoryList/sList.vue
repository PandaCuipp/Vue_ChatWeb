<template>
    <div class="bg-white">
        <van-row class="history-list-header">
            <van-col class="font12 text-center line20 history-list-header-text" :span="2">期号</van-col>
            <van-col class="font12 text-center line20 history-list-header-text" :span="13">
                <span class="h-header-ball-item">一</span>
                <span class="h-header-ball-item">二</span>
                <span class="h-header-ball-item">三</span>
                <span class="h-header-ball-item">四</span>
                <span class="h-header-ball-item">五</span>
                <span class="h-header-ball-item">六</span>
                <span class="h-header-ball-item">七</span>
                <span class="h-header-ball-item">八</span>
                <span class="h-header-ball-item">九</span>
                <span class="h-header-ball-item">十</span>
            </van-col>
            <van-col class="font12 text-center line20 history-list-header-text" :span="3">冠亚和</van-col>
            <van-col class="font12 text-center line20 history-list-header-text" :span="6">1~5龍虎</van-col>
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
                    <van-col class="font12 text-center line20" :span="2">{{item.qihao.substr(-4,4)}}</van-col>
                    <van-col class="font12 text-center line20 p_x2" :span="13">
                        <Balls :key="index" :balls="item.haoma" :margin-left="0" :margin-right="0" :width="`0.8rem`"
                               :height="`0.6rem`"/>
                    </van-col>
                    <van-col class="font12 line20 flex-row justify-around p_x3" :span="3">
                        <span class="font12">{{item.gYaHe.value}}</span>
                        <span class="font12" :style="{color:item.gYaHe.dxColor}">{{item.gYaHe.dx}}</span>
                        <span class="font12" :style="{color:item.gYaHe.dxColor}">{{item.gYaHe.ds}}</span>
                    </van-col>
                    <van-col class="font12 text-center line20" :span="6">
                    <span v-for="l of item.lh" class="font14" :style="{color:l.color}">
                        {{l.text}}
                    </span>
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
        name: "sList",
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
                    if (item.__type === 'sList') {
                        return item;
                    }
                    item.__type = 'sList';
                    let haoma = item.haoma || '';
                    if (isString(haoma)) {
                        haoma = haoma.split(',');
                        item.haoma = haoma;
                    }
                    item.gYaHe = this.gYaHe(haoma);
                    let lh = [
                        bcComp(haoma[0], haoma[9]),
                        bcComp(haoma[1], haoma[8]),
                        bcComp(haoma[2], haoma[7]),
                        bcComp(haoma[3], haoma[6]),
                        bcComp(haoma[4], haoma[5]),
                    ];
                    item.lh = lh.map(item => {
                        return {
                            text: lhText(item),
                            color: lhColor(item),
                        }
                    })
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
                let gYaHe = Number(haoma[0]) + Number(haoma[1]);
                if (isNaN(gYaHe)) {
                    gYaHe = 0;
                }
                let dx = gYaHe > 11;
                let ds = gYaHe % 2 === 0;
                let res = {
                    value: gYaHe,
                    dx: dx ? '大' : '小',
                    dxColor: dx ? 'red' : '#0089FF',
                    ds: ds ? '双' : '单',
                    dsColor: ds ? 'red' : '#0089FF',
                };
                return res;

            }
        }
    }
</script>

<style scoped>
    .s-list-container {
        max-height: 190px;
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
        /*width: 15px;*/
        /*margin: 0 1px;*/
        width: 0.5rem;
    }
</style>
