<template>
    <div class="app">
        <van-nav-bar
                fixed
                class="bg-purple"
                :border="false"
        >
            <div class="router-back" @click="$router.back()" slot="left">
                <van-icon color="white" name="arrow-left"/>
            </div>
            <div slot="title" class="flex-column justify-center align-center text-white">
                <div :class="titleClass">{{gameName}} 福利报表</div>
                <div class="font12 subTitle" v-if="subTitle">{{subTitle}}</div>
            </div>
            <van-button @click="showSheet=true" slot="right" block color="#3F51B5" type="info" size="mini">
                {{typeName}}
                <van-icon color="white" name="arrow-down"/>
            </van-button>
        </van-nav-bar>
        <div class="p_t46">
            <van-row class="p_t10 font14 line30 text-center text-white bg-purple">
                <van-col :span="8" :key="index" v-for="(item, index) of counts">
                    <div>{{item.name}}</div>
                    <div>{{item.value|formatMoney}}</div>
                </van-col>
            </van-row>
        </div>
        <van-pull-refresh v-model="loading" @refresh="initData()">
            <van-list
                    class="p_b50"
                    :value="false"
                    :finished="true"
                    finished-text="">
                <div @click="$router.push({name:'bettingInfo',query:{game_id,qihao:item.qihao}})"
                     class="font14 line40 p_x10 bg-white m_b5"
                     v-for="(item,index) of data">
                    <van-row>
                        <van-col :span="6">
                            {{getTypeInfo(item.type)}}
                        </van-col>
                        <van-col :span="8">
                            {{item.money|formatMoney}}
                        </van-col>
                        <van-col :span="10" class="font12">
                            {{item.date}}
                        </van-col>
                    </van-row>
                </div>
            </van-list>
        </van-pull-refresh>
        <Page :lists="lists" :size="data.length" @onChange="pageChange"/>
        <van-action-sheet v-model="showSheet" :actions="types" @select="onSheetSelect"/>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {bcAdd, formatMoney, isUndefined, paginationSplice} from "../utils/helpers";
    import Page from "../components/Page";

    export default {
        components: {
            Page,
        },
        filters: {
            formatMoney,
        },
        data() {
            return {
                loading: false,
                showSheet: false,
                type: -1,
                types: [
                    {value: -1, name: '全部', color: '#07C160'},
                    {value: 1, name: '佣金', color: undefined},
                    {value: 2, name: '红利返点', color: undefined},
                    {value: 3, name: '特殊返点', color: undefined},
                    {value: 4, name: '邀请返点', color: undefined},
                    {value: 5, name: '红包', color: undefined},
                ],
                game_id: undefined,
                subTitle: undefined,
                startTime: undefined,
                endTime: undefined,
                titleClass: [],
                per_page: 20,
                current_page: 1,
                infoTexts: {
                    tuishui: {
                        name: '佣金返点',
                        value: 0
                    },
                    lost: {
                        name: '红利返点',
                        value: 0
                    },
                    invite: {
                        name: '邀请返点',
                        value: 0
                    },
                    special: {
                        name: '特殊返点',
                        value: 0
                    },
                    hongbao: {
                        name: '红包',
                        value: 0
                    },
                },
            }
        },
        computed: {
            ...mapGetters(['simpleGameLists', 'userFuliReport']),
            lists() {
                return paginationSplice(this.userFuliReport, this.per_page, this.current_page)
            },
            typeName() {
                let type = this.type;
                for (let item of this.types) {
                    if (item.value == type) {
                        return item.name;
                    }
                }

            },
            data() {
                return this.lists.data[this.lists.current_page - 1] || [];
            },
            counts() {
                let infoTexts = this.infoTexts;
                for (let i in infoTexts) {
                    infoTexts[i].value = 0;
                }
                this.userFuliReport.forEach(item => {
                    if (infoTexts[item.type]) {
                        infoTexts[item.type].value = bcAdd(item.money, infoTexts[item.type].value);
                    }
                });
                return infoTexts;
            },
            gameName() {
                let game_id = this.game_id;
                if (!isUndefined(game_id)) {
                    let lists = [...this.simpleGameLists];
                    for (let item of lists) {
                        if (item.game_id == game_id) {
                            return item.name;
                        }
                    }
                }
                return '';
            },
        },
        created() {
            this.initSubTitle();
            this.initData();
            this.$store.dispatch('getSimpleGameLists')
        },
        methods: {
            onSheetSelect(item, index) {
                if (this.type != item.value) {
                    this.type = item.value;
                    this.showSheet = false;
                    this.types = this.types.map((item, i) => {
                        item.color = i === index ? '#07C160' : undefined;
                        return item;
                    });
                    this.initData();
                }

            },
            getTypeInfo(type) {
                let item = this.infoTexts[type] || {};
                return item.name || '';
            },
            async initData() {
                this.loading = true;
                this.pageChange(1)
                let {startTime, endTime, game_id, type} = this;
                let payload = {};
                if (type > -1) {
                    payload.type = type;
                }
                if (game_id) {
                    payload.game_id = game_id;
                }
                if (startTime) {
                    payload.start_time = startTime;
                }
                if (endTime) {
                    payload.end_time = endTime;
                }
                await this.$store.dispatch('getUserFuliReport', payload)
                this.loading = false;
            },
            initSubTitle() {
                let {startTime, endTime, game_id} = this.$route.query;
                this.startTime = startTime;
                this.endTime = endTime;
                this.game_id = game_id;
                if (startTime || endTime) {
                    this.subTitle = `(${startTime || '-'} ~ ${endTime || '-'})`;
                    this.titleClass = ['font12', 'line25']
                }

            },
            pageChange(page) {
                this.current_page = page;
            },

        }
    }
</script>

<style scoped>
    .app {
        background-color: #F2F2F2;
        min-height: 100vh;
    }

    .subTitle {
        line-height: 15px;
    }
</style>
