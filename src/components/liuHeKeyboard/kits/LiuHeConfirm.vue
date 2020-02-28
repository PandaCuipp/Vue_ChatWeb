<template>
    <van-dialog :value="value" @input="e=>$emit('input',e)" show-cancel-button>
        <div slot="title" class="p_b5">下注清单</div>
        <div class="p_x20 lh-confirm-content">
            <p v-for="item of data" v-if="data.length">【{{item.page2||item.page}}-{{item.name}}】{{item.peilv}} ×
                {{money}}</p>
            <template v-if="groupData.ids&&groupData.ids.length">
                <div v-for="item of groupData.ids" class="inline radius3 p_x5 lh-confirm-group-content">
                    <div class="text-center text-white line25 font12">{{item.join(',')}}</div>
                    <div class="text-center text-white line25 font12">({{groupData.peilv}})</div>
                </div>
            </template>
        </div>
        <van-row>
            <van-col :span="24" class="font12 m_t5 lh-confirm-footer" v-if="data.length">
                【合计】总注数：<span class="text-light-blue p_r5">{{data.length}}</span> 总金额：<span
                    class="text-light-blue">{{money|bcMul(data.length)}}</span>
            </van-col>
            <van-col :span="24" class="font12 m_t5 lh-confirm-footer" v-else-if="groupData.ids">
                【合计】总注数：<span class="text-light-blue p_r5">{{groupData.ids.length}}</span> 总金额：<span
                    class="text-light-blue">{{money|bcMul(groupData.ids.length)}}</span>
            </van-col>
        </van-row>
    </van-dialog>
</template>

<script>
    import {bcMul, isUndefined, isObject} from "../../../utils/helpers";
    import CommonMixins from "../mixins/CommonMixins";

    export default {
        name: "LiuHeConfirm",
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            money: {
                type: [String, Number],
                default: '0.00',
            },
            nav: {
                type: Object,
                default() {
                    return {};
                },
            },
            subNav: {
                type: Object,
                default() {
                    return {};
                },
            },
            subNav2: {
                type: Object,
                default() {
                    return {};
                },
            },
            ballCheck: {
                type: Array,
                default() {
                    return [];
                },
            },
            ruleCheck: {
                type: Array,
                default() {
                    return [];
                },
            },
            waveCheck: {
                type: Array,
                default() {
                    return [];
                },
            },
            zodiacCheck: {
                type: Array,
                default() {
                    return [];
                },
            },
        },
        filters: {bcMul},
        mixins: [CommonMixins],
        computed: {
            data() {
                const {nav, subNav, subNav2} = this;
                const page = nav.name;
                const page1 = subNav.name;
                const page2 = subNav2.name;
                if (page === '特码' || page === '正特' || page === '正码') {
                    return this.teMa(page, page1, page2);
                } else if (page === '半波') {
                    return this.banBo(page, page1, page2);
                } else if (page === '一肖' || page === '特肖' || page === '尾数') {
                    return this.weiShu(page, page1, page2);
                }
                return [];
            },
            groupData() {
                const {nav, subNav, subNav2} = this;
                const page = nav.name;
                const page1 = subNav.name;
                const page2 = subNav2.name;
                if (page === '六肖' || page === '连码' || page === '生肖连' || page === '尾数连' || page === '多不中一') {
                    return this.lianMa(page, page1, page2);
                }
                return {
                    page,
                    page1,
                    page2,
                    peilv: 0,
                    ids: [],
                    names: [],
                };
            },
        },
        methods: {
            // 特码、正特、正码
            teMa(page, page1, page2) {
                const {ruleCheck, ballCheck} = this;
                return [...ballCheck, ...ruleCheck].map(item => {
                    item.page = page;
                    item.page1 = page1;
                    item.page2 = page2;
                    return item;
                });
            },
            // 半波
            banBo(page, page1, page2) {
                const {waveCheck} = this;
                return [...waveCheck].map(item => {
                    item.page = page;
                    item.page1 = page1;
                    item.page2 = page2;
                    return item;
                });
            },
            // 一肖、特肖、尾数
            weiShu(page, page1, page2) {
                const {zodiacCheck} = this;
                return [...zodiacCheck].map(item => {
                    item.page = page;
                    item.page1 = page1;
                    item.page2 = page2;
                    return item;
                });
            },
            // 连码、生肖连、尾数连、多不中一
            lianMa(page, page1, page2) {
                const {ballCheck, zodiacCheck} = this;
                let ids = [], names = [];
                let peilv = undefined;
                if (page1 === '拖胆') {
                    const originData = [...ballCheck, ...zodiacCheck];
                    if (isObject(originData[0])) {
                        peilv = originData[0].peilv;
                    }
                    ids = this.tuoDan(this.sliceGem(originData));
                    // names = this.tuoDan(this.sliceGem(ids,'name'));
                } else {
                    const count = this.getCountByPage2(page2, 1);
                    [...ballCheck, ...zodiacCheck].forEach(item => {
                        ids.push(item.id);
                        names.push(item.name);
                        if (isUndefined(peilv)) {
                            peilv = item.peilv;
                        }
                    });
                    ids = this.zuHe(ids, count);
                    // names = this.zuHe(names, count);
                }
                let data = {
                    page,
                    page1,
                    page2,
                    ids,
                    names,
                    peilv,
                };
                return data;
            },
            // 拖胆
            tuoDan(data, key = 'id') {
                return [...data].reduce((a, b) => {
                    return a.map(j => {
                        let item = [];
                        b.map(i => {
                            item.push(i[key])
                        });
                        item.push(j[key]);
                        return item;
                    });

                });

            },
            // 组合
            zuHe(data, count = 3) {
                let result = [];
                let u2 = 0;
                const dataLength = data.length;
                for (let i = 0; i < Math.pow(2, dataLength); i++) {
                    let a = 0;
                    let dd = [];  //组合对象
                    for (let j = 0; j < dataLength; j++) {
                        if (i >> j & 1) {
                            a++;
                            dd.push(data[j]);
                        }
                    }
                    if (a === count) {
                        result[u2] = dd;
                        u2++;
                    }
                }
                return result;
            }
        }
    }
</script>

<style scoped>
    .lh-confirm-content {
        min-height: 100px;
        max-height: 260px;
        overflow-y: auto;
    }

    .lh-confirm-group-content {
        margin: 2px;
        background-color: #22527C;
    }

    .lh-confirm-footer {
        border: solid 1px #DFDFDF;
        line-height: 35px;
        color: #000;
    }
</style>