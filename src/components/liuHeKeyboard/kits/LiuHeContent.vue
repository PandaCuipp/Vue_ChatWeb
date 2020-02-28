<template>
    <div class="flex-column flex1 font14 p_y15 q-content-container">
        <LiuHeSubNav v-if="subNav.length" :value="subNavIndex" @input="e=>$emit('onSubNavInput',e)" :data="subNav"/>
        <LiuHeSubNav v-if="subNav2.length>1"
                     :value="subNav2Index"
                     @input="e=>$emit('onSubNav2Input',e)"
                     :data="subNav2"/>
        <!--圆球start-->
        <div v-if="balls.data&&balls.data.length" class="flex-column align-center" style="overflow-x: auto">
            <div v-if="balls.title" class="line30 text-center tag-title">{{balls.title}}</div>
            <div class="flex-row justify-center p_y5" v-for="row of balls.data">
                <Ball :value="item.id"
                      :key="`lh-ball-${i}`"
                      :label="item.name"
                      :color="item.color"
                      :peilv="`${item.peilv}`"
                      :show-gem="item.showGem"
                      :active="isCheck(ballCheck,item.id)"
                      @onClick="$emit('onBallCheck',item)"
                      v-for="(item,i) of row"/>
            </div>
        </div>
        <!--圆球end-->


        <!--rules start-->
        <div v-if="rules.data&&rules.data.length" class="flex-column align-center">
            <div v-if="rules.title" class="line30 text-center tag-title">{{rules.title}}</div>
            <div class="flex-row justify-center flex-wrap p_y5">
                <Tag :key="`lh-rules-${i}`"
                     :label="item.name"
                     v-for="(item,i) of rules.data"
                     :active="isCheck(ruleCheck,item.id)"
                     @onClick="$emit('onRuleCheck',item)"
                     :value="item.id"/>
                <Ball v-if="false" :value="item.id"
                      :key="`lh-rules-${i}`"
                      :label="item.name"
                      color="#2FBCF6"
                      :peilv="`${item.peilv}`"
                      :active="isCheck(ruleCheck,item.id)"
                      @onClick="$emit('onRuleCheck',item)"
                      v-for="(item,i) of rules.data"/>
            </div>
        </div>
        <!--rules end-->

        <!--半波start-->
        <div v-if="wave.data&&wave.data.length">
            <div v-if="wave.title" class="line30 text-center tag-title">{{wave.title}}</div>
            <div v-for="(item,i) of wave.data"
                 :class="['ban-bo-item',waveCheck.indexOf(item.id)>-1?'active':'']">
                <Zodiac
                        :key="`lh-wave-${i}`"
                        :zodiac="item.name"
                        :balls="item.balls"
                        :active="isCheck(waveCheck,item.id)"
                        @onClick="$emit('onWaveCheck',item)">
                    <div slot="left" class="font14 flex-row">
                        <div>{{item.name}}</div>
                        <div class="p_x10 font12 text-light">{{item.peilv}}</div>
                    </div>
                </Zodiac>
            </div>
        </div>
        <!--半波end-->

        <!--生肖start-->
        <div v-if="zodiac.data&&zodiac.data.length">
            <div v-if="zodiac.title" class="line30 text-center tag-title">{{zodiac.title}}</div>
            <div v-for="(item,i) of zodiac.data"
                 :class="['zodiac-item',zodiacCheck.indexOf(item.id)>-1?'active':'']">
                <Zodiac
                        :key="`lh-wave-${i}`"
                        :leftSize="null"
                        :rightSize="null"
                        :zodiac="item.name"
                        :balls="item.balls"
                        :peilv="item.peilv"
                        :show-gem="item.showGem"
                        :active="isCheck(zodiacCheck,item.id)"
                        @onClick="$emit('onZodiacCheck',item)">
                </Zodiac>
            </div>
        </div>
        <!--生肖end-->


        <!--六肖start-->
        <div v-if="lZodiac.data&&lZodiac.data.length">
            <div v-if="lZodiac.title" class="line30 text-center tag-title">{{lZodiac.title}}</div>
            <van-row>
                <van-col :span="11">
                    <div v-for="(item,i) of lZodiac.leftData"
                         :class="['zodiac-item',zodiacCheck.indexOf(item.id)>-1?'active':'']">
                        <Zodiac
                                :key="`lh-wave-${i}`"
                                :leftSize="null"
                                :rightSize="null"
                                :zodiac="item.name"
                                :balls="item.balls"
                                :peilv="item.peilv"
                                leftSize="0.55rem"
                                rightSize="0.55rem"
                                padding="1px"
                                :active="isCheck(zodiacCheck,item.id)"
                                @onClick="onLeftZodiacCheck(item)">
                            <span slot="peilv" class="font12">{{item.peilv}}</span>
                        </Zodiac>
                    </div>
                </van-col>
                <van-col :span="13">
                    <div v-for="(item,i) of lZodiac.rightData"
                         :class="['zodiac-item',zodiacCheck.indexOf(item.id)>-1?'active':'']">
                        <Zodiac
                                :key="`lh-wave-${i}`"
                                :leftSize="null"
                                :rightSize="null"
                                :zodiac="item.name"
                                :balls="item.balls"
                                :peilv="item.peilv"
                                leftSize="0.55rem"
                                rightSize="0.55rem"
                                padding="1px"
                                :active="isCheck(zodiacCheck,item.id)"
                                @onClick="onRightZodiacCheck(item)">
                            <span slot="peilv" class="font12">{{item.peilv}}</span>
                        </Zodiac>
                    </div>
                </van-col>
            </van-row>

        </div>
        <!--六肖end-->


        <!--生肖start-->
        <!--<div class="flex-row justify-around flex-wrap">-->
        <!--<Zodiac zodiac="牛" :balls="[11,23,35,47]"/>-->
        <!--<Zodiac zodiac="猪" :balls="['01',13,25,37,49]" :active="true"/>-->
        <!--<Zodiac zodiac="猪" :balls="['01',13,25,37,49]" peilv="0.78"/>-->
        <!--<Zodiac zodiac="红波" size="0.8rem" peilv="0.78"/>-->
        <!--<Zodiac :balls="['01']" peilv="0.78"/>-->
        <!--</div>-->
        <!--生肖end-->

        <!--说明start-->
        <div v-if="remark&&remark.length" class="line50 text-light text-center">{{remark}}</div>
        <!--说明end-->
    </div>
</template>

<script>

    import Tag from "../items/Tag";
    import Ball from "../items/Ball";
    import Zodiac from "../items/Zodiac";
    import {isArray, isUndefined} from "../../../utils/helpers";
    import LiuHeSubNav from "./LiuHeSubNav";
    import {mapGetters} from "vuex";
    import {Toast} from "vant";

    export default {
        name: "LiuHeContent",
        components: {
            Tag,
            Ball,
            Zodiac,
            LiuHeSubNav,
        },
        computed: {
            ...mapGetters(['liuHeLists2', 'liuHeLists']),
            currentData() {
                return this.liuHeLists2(this.navIndex, this.subNav2Index) || {};
            },
            // 号码
            balls() {
                let balls = this.currentData.balls || {};
                if (!isArray(balls.data)) {
                    balls.data = []
                } else {
                    let data = [];
                    for (let item of balls.data) {
                        const row = (Number(item.name) - 1) % 7;
                        if (isUndefined(data[row])) {
                            data[row] = [];
                        }
                        data[row].push(item);

                    }
                    balls.data = data;
                }
                return balls || {};
            },
            // 规则
            rules() {
                let rules = this.currentData.rules || {};
                if (!isArray(rules.data)) {
                    rules.data = []
                }
                return rules || {};
            },
            // 半波
            wave() {
                let wave = this.currentData.wave || {};
                if (!isArray(wave.data)) {
                    wave.data = []
                }
                return wave || {};
            },
            // 生肖
            zodiac() {
                let zodiac = this.currentData.zodiac || {};
                if (zodiac.title === '六肖') {
                    return {};
                }
                if (!isArray(zodiac.data)) {
                    zodiac.data = []
                }
                return zodiac || {};
            },
            // 六肖
            lZodiac() {
                let zodiac = this.currentData.zodiac || {};
                if (zodiac.title !== '六肖') {
                    return {};
                }
                if (!isArray(zodiac.data)) {
                    zodiac.data = []
                }
                zodiac.leftData = [];
                zodiac.rightData = [];
                zodiac.data.forEach(item => {
                    const isEven = isArray(item.balls) && item.balls.some(ball => ball.name % 2 === 0);
                    if (isEven) {
                        zodiac.leftData.push(item);
                    } else {
                        zodiac.rightData.push(item);
                    }
                });
                console.log(zodiac)
                return zodiac || {};
            }
        },
        props: {
            navIndex: {
                type: [String, Number],
                default: 0,
            },
            subNavIndex: {
                type: [String, Number],
                default: 0,
            },
            subNav2Index: {
                type: [String, Number],
                default: 0,
            },
            // 二级导航
            subNav: {
                type: Array,
                default() {
                    return []
                },
            },
            // 三级导航
            subNav2: {
                type: Array,
                default() {
                    return []
                },
            },
            ballCheck: {
                type: Array,
                default() {
                    return []
                },
            },
            ruleCheck: {
                type: Array,
                default() {
                    return []
                },
            },
            waveCheck: {
                type: Array,
                default() {
                    return []
                },
            },
            zodiacCheck: {
                type: Array,
                default() {
                    return []
                },
            },

            remark: {
                type: String,
                default: '',
            },
        },
        methods: {
            isCheck(data, id) {
                if (!isArray(data)) {
                    return false;
                }
                return data.some(item => {
                    return item.id === id;
                })
            },
            // 六肖禁止只选左边
            onLeftZodiacCheck(item) {
                const zodiacCheck = [...this.zodiacCheck].map(item => item.id);
                const _data = [...this.lZodiac.leftData || []].map(item => item.id);
                if (zodiacCheck.length >= 5 && zodiacCheck.indexOf(item.id) === -1 && _data.some(id => id === item.id)) {
                    const len = zodiacCheck.filter(id => _data.indexOf(id) > -1).length;
                    if (len >= 5) {
                        Toast('六肖禁止全部选择双数');
                        return;
                    }

                }
                this.$emit('onZodiacCheck', item)
            },
            // 六肖禁止只选右边
            onRightZodiacCheck(item) {
                const zodiacCheck = [...this.zodiacCheck].map(item => item.id);
                const _data = [...this.lZodiac.rightData || []].map(item => item.id);
                if (zodiacCheck.length >= 5 && zodiacCheck.indexOf(item.id) === -1 && _data.some(id => id === item.id)) {
                    const len = zodiacCheck.filter(id => _data.indexOf(id) > -1).length;
                    if (len >= 5) {
                        Toast('六肖禁止全部选择单数');
                        return;
                    }

                }
                this.$emit('onZodiacCheck', item)
            }
        },
    }
</script>

<style scoped>
    .q-content-container {
        overflow-y: auto;
    }

    .tag-title {
        color: #2FBCF6;
    }

    .ban-bo-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 2%;
        padding-top: 5px;
        padding-bottom: 5px;
        border-bottom: solid 1px #fff;
    }

    .ban-bo-item.active {
        background-color: #F2F2F2;
        border-bottom: solid 1px #DFDFDF;
    }

    .zodiac-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 8%;
        padding-top: 5px;
        padding-bottom: 5px;
        border-bottom: solid 1px #fff;
    }

    .zodiac-item.active {
        background-color: #F2F2F2;
        border-bottom: solid 1px #DFDFDF;
    }

</style>
