<template>
    <div class="flex-column font14 container">
        <!--height: 50px; 1.33333rem-->
        <LiuHeNav :index="navIndex" :data="navData" @onCheck="onNavCheck" @onClose="onClose"/>

        <div :class="contentClass" style="padding-top: 1.33333rem">
            <LiuHeContent
                    :nav-index="navIndex"
                    :sub-nav-index="subNavIndex"
                    :sub-nav2-index="subNav2Index"
                    :sub-nav="subNav"
                    :sub-nav2="subNav2"
                    @onSubNavInput="onSubNavInput"
                    @onSubNav2Input="onSubNav2Input"
                    :ballCheck="ballCheck"
                    @onBallCheck="onBallCheck"
                    :ruleCheck="ruleCheck"
                    @onRuleCheck="onRuleCheck"
                    :waveCheck="waveCheck"
                    @onWaveCheck="onWaveCheck"
                    :zodiacCheck="zodiacCheck"
                    @onZodiacCheck="onZodiacCheck"
                    :remark="remark"/>
        </div>
        <LiuHeFooter readonly
                     v-model="value"
                     quickText="清除"
                     @onSend="onSend"
                     @onClose="toggleKeyBody(false)"
                     @onInputClick="onInputClick"
                     :body="showKeyBody"/>


        <!--确认弹框start-->
        <LiuHeConfirm
                v-if="showConfirm"
                :ball-check="ballCheck"
                :rule-check="ruleCheck"
                :wave-check="waveCheck"
                :zodiac-check="zodiacCheck"
                :nav="currentNav"
                :sub-nav="currentSubNav1"
                :sub-nav2="currentSubNav2"
                :money="value"
                v-model="showConfirm"/>
        <!--确认弹框end-->
    </div>
</template>

<script>
    import LiuHeNav from "./kits/LiuHeNav";
    import LiuHeMenu from "./kits/LiuHeMenu";
    import LiuHeContent from "./kits/LiuHeContent";
    import LiuHeFooter from "./kits/LiuHeFooter";
    import LiuHeConfirm from "./kits/LiuHeConfirm";
    import {isArray, isBoolean, isEmpty, isNull, isNumeric} from "../../utils/helpers";
    import LiuHeSubNav from "./kits/LiuHeSubNav";
    import {mapGetters} from "vuex";
    import ValidateMixins from "./mixins/ValidateMixins";
    import CommonMixins from "./mixins/CommonMixins";

    export default {
        name: "LiuHeKeyboard",
        components: {
            LiuHeNav,
            LiuHeSubNav,
            LiuHeMenu,
            LiuHeContent,
            LiuHeFooter,
            LiuHeConfirm,
        },
        mixins: [CommonMixins, ValidateMixins],
        data() {
            return {
                value: '',
                navIndex: null,
                subNavIndex: 0,
                subNav2Index: 0,
                subNav: [],
                subNav2: [],
                ballCheck: [],
                ruleCheck: [],
                waveCheck: [],
                zodiacCheck: [],
                showKeyBody: false,
                currentNav: {},
                showConfirm: false,
            }
        },
        async created() {
            await this.$store.dispatch('getLiuPlayPage')
        },
        watch: {
            async navIndex(index) {
                if (isNumeric(index)) {
                    let currentNav = {};
                    for (let item of this.navData) {
                        if (item.id === index) {
                            currentNav = item;
                            this.subNav = item.subNav || [];
                            this.subNav2 = item.children || [];
                            if (!isEmpty(item.subNav)) {
                                this.subNavIndex = (item.subNav[0] || {}).id;
                            }
                            break;
                        }
                    }
                    this.currentNav = currentNav;
                    if (isArray(currentNav.children) && currentNav.children.length > 0) {
                        this.subNav2Index = currentNav.children[0].id;
                    }
                    await this.$store.dispatch('getLiuList', {page_id: currentNav.id});

                }
            }
        },
        computed: {
            ...mapGetters(['liuHeNavs', 'liuHeLists2']),
            currentSubNav1() {
                let {subNav, subNavIndex} = this;
                if (isEmpty(subNav)) {
                    return {};
                }
                return subNav.filter(item => item.id === subNavIndex)[0] || {};
            },
            currentSubNav2() {
                let {subNav2, subNav2Index} = this;
                if (isEmpty(subNav2)) {
                    return {};
                }
                return subNav2.filter(item => item.id === subNav2Index)[0] || {};
            },
            navData() {
                let navs = [];
                let navIndex = null;
                this.liuHeNavs.forEach(item => {
                    if (isNull(navIndex)) {
                        navIndex = item.class_id;
                    }
                    navs.push({
                        id: item.class_id,
                        name: item.page_name,
                        subNav: item.subNav,
                        children: (item.children || []).map(c => {
                            return {
                                id: c.page2,
                                name: c.page_name,
                            }
                        }),
                    })
                });
                this.navIndex = navIndex;
                return navs;
            },
            remark() {
                let remarks = {};
                return remarks[this.navIndex] || ''
            },
            contentClass() {
                return [
                    'flex-row',
                    this.showKeyBody ? 'con-has-keyboard' : 'con-not-has-keyboard',
                ];
            }
        },
        methods: {
            //规则（方形、标签）
            onRuleCheck(val) {
                let ruleCheck = this.ruleCheck;
                const index = ruleCheck.indexOf(val);
                if (index > -1) {
                    ruleCheck.splice(index, 1);
                } else {
                    ruleCheck.push(val);
                }
            },
            // 圆球
            onBallCheck(val) {
                let ballCheck = this.ballCheck;
                const index = ballCheck.indexOf(val);
                if (index > -1) {
                    val.showGem = false;
                    ballCheck.splice(index, 1);
                } else {
                    const page1 = this.currentSubNav1.name;
                    if (page1 === '拖胆') {
                        const count = this.getCountByPage2(this.currentSubNav2.name);
                        val.showGem = this.getGemCount(ballCheck) < count;
                    }
                    ballCheck.push(val);
                }
            },
            // 半波
            onWaveCheck(val) {
                let waveCheck = this.waveCheck;
                const index = waveCheck.indexOf(val);
                if (index > -1) {
                    waveCheck.splice(index, 1);
                } else {
                    waveCheck.push(val);
                }
            },
            // 生肖
            onZodiacCheck(val) {
                let zodiacCheck = this.zodiacCheck;
                const index = zodiacCheck.indexOf(val);
                if (index > -1) {
                    val.showGem = false;
                    zodiacCheck.splice(index, 1);
                } else {
                    const page1 = this.currentSubNav1.name;
                    if (page1 === '拖胆') {
                        const count = this.getCountByPage2(this.currentSubNav2.name);
                        val.showGem = this.getGemCount(zodiacCheck) < count;
                    }
                    zodiacCheck.push(val);
                }
            },
            onSend() {
                let {
                    value,
                } = this;
                if (!this.validate()) {
                    return;
                }
                this.showConfirm = true;


                this.$emit('onSend', {
                    money: value,
                    data: [],
                });

            },

            onInputClick(e) {
                this.toggleKeyBody();
            },
            toggleKeyBody(state) {
                state = isBoolean(state) ? state : !this.showKeyBody;
                this.showKeyBody = state;
            },
            onClose() {
                this.onNavCheck();
                this.$emit('onClose')
            },
            onNavCheck(item = {}) {
                if (this.navIndex === item.id) {
                    return;
                }
                this.navIndex = item.id;
                this.subNav = [];
                this.subNav2 = [];
                this.showKeyBody = false;
                this.initCheckByChangeNavIndex();
            },
            onSubNavInput(index) {
                if (this.subNavIndex === index) {
                    return;
                }
                this.subNavIndex = index;
                this.initCheckByChangeNavIndex();
            },
            onSubNav2Input(index) {
                if (this.subNav2Index === index) {
                    return;
                }
                this.subNav2Index = index;
                this.initCheckByChangeNavIndex();
            },
            initCheckByChangeNavIndex() {
                this.ballCheck = [];
                this.ruleCheck = [];
                this.waveCheck = [];
                this.zodiacCheck = [];
            }

        }
    }
</script>

<style scoped>
    .container {
        height: 100%;
        /*50px == 1.33333rem;*/
        /*40px == 1.06667rem;*/
        /*250px == 6.66667rem;*/
    }

    /*参考 ./kits/LiuHeFooter.vue .not-has-body-height*/
    .con-not-has-keyboard {
        padding-bottom: 1.4rem;
        /*height: calc(100% - 1.33333rem - 1.4rem);*/
    }

    /*参考 ./kits/LiuHeFooter.vue .has-body-height*/
    .con-has-keyboard {
        padding-bottom: 6.66667rem;
        /*height: calc(100% - 1.33333rem - 6.66667rem);*/
    }
</style>
