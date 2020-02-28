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
                <div>{{gameName}} {{qhText}}下注详情</div>
            </div>
        </van-nav-bar>
        <van-pull-refresh v-model="loading" @refresh="initData()">
            <van-list
                    class="p_t46 p_b50"
                    :value="false"
                    :finished="true"
                    finished-text="">
                <div class="font14 line30 p_x10 bg-white m_b5 flex-row" v-for="(item,index) of data">
                    <div class="flex-column justify-center p_r5">
                        <span class="header-type text-white radius50 bg-light-green" v-if="item.all_result>0">负</span>
                        <span class="header-type text-white radius50 bg-red" v-else>胜</span>
                    </div>
                    <div class="flex1">
                        <van-row>
                            <van-col :span="12" class="text-light">
                                第{{item.qihao}}期
                            </van-col>
                            <van-col class="text-end text-light" :span="12">
                                {{item.xia_time*1000|dateFormat}}
                            </van-col>
                        </van-row>
                        <van-row>
                            <van-col :span="12">
                                {{item.page_name}}[{{item.page2_name}}/{{item.money}}]
                            </van-col>
                            <van-col :span="12" class="text-end">
                                <span :class="[item.all_result>0?'text-red':'text-light-green']">{{item.all_result|formatMoney}}</span>
                            </van-col>
                        </van-row>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
        <Page :lists="lists" :size="data.length" @onChange="pageChange"/>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {dateFormat, formatMoney, isUndefined, paginationSplice} from "../utils/helpers";
    import Page from "../components/Page";

    export default {
        components: {
            Page,
        },
        filters: {
            formatMoney,
            dateFormat,
        },
        data() {
            return {
                loading: false,
                game_id: undefined,
                qihao: undefined,
                per_page: 30,
                current_page: 1,
            }
        },
        computed: {
            ...mapGetters(['userReportQihaoInfo', 'simpleGameLists']),
            lists() {
                return paginationSplice(this.userReportQihaoInfo, this.per_page, this.current_page)
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
            qhText() {
                let qihao = this.qihao;
                if (!isUndefined(qihao)) {
                    return `第${qihao}期`
                }
                return '';
            },
        },
        created() {
            let {game_id, qihao} = this.$route.query;
            this.qihao = qihao;
            this.game_id = game_id;
            this.initData();
            this.$store.dispatch('getSimpleGameLists')
        },
        methods: {

            async initData() {
                this.loading = true;
                this.pageChange(1);
                let {qihao, game_id} = this;
                await this.$store.dispatch('getUserReportQihaoInfo', {game_id, qihao})
                this.loading = false;
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

    .header-type {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
    }
</style>
