<template>
    <div class="app">
        <van-nav-bar
                fixed
                class="bg-purple"
                :border="true"
        >
            <div class="router-back" @click="$router.back()" slot="left">
                <van-icon color="white" name="arrow-left"/>
            </div>
            <div slot="title" class="flex-column justify-center align-center text-white">
                <div :class="titleClass">{{gameName}} 竞猜报表期号总览</div>
                <div class="font12 subTitle" v-if="subTitle">{{subTitle}}</div>
            </div>
        </van-nav-bar>
        <van-pull-refresh v-model="loading" @refresh="initData()">
            <van-list
                    class="p_t46 p_b50"
                    :value="false"
                    :finished="true"
                    finished-text="">
                <div @click="$router.push({name:'bettingInfo',query:{game_id,qihao:item.qihao}})"
                     class="font14 line30 p_x10 bg-white m_b5"
                     v-for="(item,index) of data">
                    <van-row>
                        <van-col :span="12">
                            第{{item.qihao}}期
                        </van-col>
                        <van-col class="text-end" :span="12">
                            <van-icon name="arrow" color="#999"/>
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col :span="8">
                            <span class="text-light">注单：</span>
                            <span class="text-red">{{item.counts}}</span>
                        </van-col>
                        <van-col :span="8">
                            <span class="text-light">注额：</span>
                            <span class="text-red">{{item.moneys|formatMoney}}</span>
                        </van-col>
                        <van-col :span="8">
                            <span class="text-light">结果：</span>
                            <span :class="[item.result>0?'text-red':'text-light-green']">{{item.result|formatMoney}}</span>
                        </van-col>
                    </van-row>
                </div>
            </van-list>
        </van-pull-refresh>
        <Page :lists="lists" :size="data.length" @onChange="pageChange"/>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {formatMoney, isUndefined, paginationSplice} from "../utils/helpers";
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
                game_id: undefined,
                subTitle: undefined,
                startTime: undefined,
                endTime: undefined,
                titleClass: [],
                per_page: 30,
                current_page: 1,
            }
        },
        computed: {
            ...mapGetters(['userReportQihao', 'simpleGameLists']),
            lists() {
                return paginationSplice(this.userReportQihao, this.per_page, this.current_page)
            },
            data() {
                return this.lists.data[this.lists.current_page - 1] || [];
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

            async initData() {
                this.loading = true;
                let {startTime, endTime, game_id} = this;
                let payload = {game_id};
                if (startTime) {
                    payload.start_time = startTime;
                }
                if (endTime) {
                    payload.end_time = endTime;
                }
                await this.$store.dispatch('getUserReportQihao', payload)
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
