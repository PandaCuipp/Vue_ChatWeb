<template>
    <div class="flex-column font14 no-select container">
        <!--height: 50px; 1.33333rem-->
        <QuickNav :index="navIndex" :data="navData" @onCheck="onNavCheck" @onClose="onClose"/>
        <div :class="contentClass">
            <QuickMenu v-show="menuData.length" :check="menuCheck" :data="menuData" @onCheck="onMenuCheck"/>
            <QuickContent
                    :tags="tagData"
                    :tagCheck="tagCheck"
                    @onTagCheck="onTagCheck"
                    :ball="ballData"
                    :ballCheck="ballCheck"
                    @onBallCheck="onBallCheck"
                    :sBall="sBallData"
                    :sBallCheck="sBallCheck"
                    @onSBallCheck="onSBallCheck"
                    :remark="remark"/>
        </div>
        <QuickFooter readonly
                     :value="value"
                     @input="val=>$emit('input',val)"
                     quickText="清除"
                     @onSend="onSend"
                     @onClose="toggleKeyBody(false)"
                     @onInputClick="onInputClick"
                     :body="showKeyBody"/>
    </div>
</template>

<script>
    import QuickNav from "./kits/QuickNav";
    import QuickContent from "./kits/QuickContent";
    import QuickMenu from "./kits/QuickMenu";
    import QuickFooter from "./kits/QuickFooter";
    import {__cReferData, __sReferData} from "./QuickKeyboardData";
    import {isBoolean, isEmpty} from "../../utils/helpers";

    export default {
        name: "QuickKeyboard",
        props: {
            type: {
                type: String,
                default: 'circle', // square
            },
            value: {
                type: String,
                default: '',
            }
        },
        components: {
            QuickNav,
            QuickMenu,
            QuickContent,
            QuickFooter,
        },
        data() {
            return {
                navIndex: 0,
                menuCheck: [],
                tagCheck: [],
                ballCheck: [],
                sBallCheck: [],
                showKeyBody: false,
            }
        },
        computed: {
            navName() {
                return this.navData[this.navIndex];
            },
            data() {
                return this.type === 'circle' ? __cReferData : __sReferData;
            },
            navData() {
                return this.data.navs || [];
            },
            menuData() {
                let menuGroup = this.data.menuGroup || {};
                return menuGroup[this.navIndex] || []
            },
            ballData() {
                let ballGroup = this.data.ballGroup || {};
                return ballGroup[this.navIndex] || []
            },
            sBallData() {
                let sBallGroup = this.data.sBallGroup || {};
                return sBallGroup[this.navIndex] || []
            },
            tagData() {
                let tagGroup = this.data.tagGroup || {};
                return tagGroup[this.navIndex] || []
            },
            remark() {
                let remarks = this.data.remarks || {};
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
            onSend() {
                let {
                    menuCheck,
                    tagCheck,
                    ballCheck,
                    sBallCheck
                } = this;
                let data = [];
                if (isEmpty(menuCheck)) {
                    data.push(...this.genResultData(this.navName, {ballCheck, sBallCheck, tagCheck}));
                } else {
                    menuCheck.forEach(item => {
                        if (item === '冠军') {
                            item = '第一名';
                        } else if (item === '亚军') {
                            item = '第二名';
                        }
                        data.push(...this.genResultData(item, {ballCheck, sBallCheck, tagCheck}));
                    })
                }
                this.$emit('onSend', {
                    money: this.value,
                    data,
                });

            },
            genResultData(item, {ballCheck, sBallCheck, tagCheck}) {
                let data = [];
                ballCheck.forEach(ball => {
                    data.push({
                        [item]: ball,
                    })
                });
                sBallCheck.forEach(ball => {
                    data.push({
                        [item]: ball,
                    })
                });
                tagCheck.forEach(tag => {
                    tag = tag.split('_');
                    let name, val;
                    if (tag.length === 2) {
                        name = tag[0];
                        val = tag[1];
                    } else {
                        name = item;
                        val = tag[0];
                    }
                    data.push({
                        [name]: val,
                    })
                });
                return data;
            },
            onInputClick(e) {
                this.toggleKeyBody();
            },
            toggleKeyBody(state) {
                state = isBoolean(state) ? state : !this.showKeyBody;
                this.showKeyBody = state;
            },
            onClose() {
                this.onNavCheck(0);
                this.$emit('onClose')
            },
            onNavCheck(index) {
                this.navIndex = index;
                this.menuCheck = [];
                this.tagCheck = [];
                this.ballCheck = [];
                this.sBallCheck = [];
                this.showKeyBody = false;
            },
            onMenuCheck(val) {
                let menuCheck = this.menuCheck;
                const index = menuCheck.indexOf(val);
                if (index > -1) {
                    menuCheck.splice(index, 1);
                } else {
                    menuCheck.push(val);
                }
            },
            onTagCheck(val) {
                let tagCheck = this.tagCheck;
                const index = tagCheck.indexOf(val);
                if (index > -1) {
                    tagCheck.splice(index, 1);
                } else {
                    tagCheck.push(val);
                }
            },
            onBallCheck(val) {
                let ballCheck = this.ballCheck;
                const index = ballCheck.indexOf(val);
                if (index > -1) {
                    ballCheck.splice(index, 1);
                } else {
                    ballCheck.push(val);
                }
            },
            onSBallCheck(val) {
                let sBallCheck = this.sBallCheck;
                const index = sBallCheck.indexOf(val);
                if (index > -1) {
                    sBallCheck.splice(index, 1);
                } else {
                    sBallCheck.push(val);
                }
            },
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

    .con-not-has-keyboard {
        height: calc(80vh - 1.33333rem - 1.06667rem);
    }

    .con-has-keyboard {
        height: calc(80vh - 1.33333rem - 6.66667rem);
    }
</style>
