<template>
    <div>
        <van-nav-bar
                fixed
                class="bg-purple"
                :border="true"
        >
            <div class="router-back" @click="$router.back()" slot="left">
                <van-icon color="white" name="arrow-left"/>
            </div>
            <p slot="title" class="text-white">下注记录</p>
        </van-nav-bar>
        <van-pull-refresh v-model="loading" @refresh="init()">
            <van-list
                    class="p_t46 m_t10 p_b50"
                    :value="false"
                    :finished="true"
                    finished-text="">
                <van-row class="pl-row-item p_x15 p_y5" :key="index" v-for="(item,index) of data">
                    <van-col span="12" class="font12 line20 text-light">第{{item.qihao}}期</van-col>
                    <van-col span="12" class="font12 line20 text-light text-end">{{item.xia_time*1000|dateFormat}}
                    </van-col>
                    <van-col span="12" class="font14 line25">{{item.page_name}}[{{item.page2_name}}]</van-col>
                    <van-col span="12" class="font14 line25 text-end text-light-green">下注金额：{{item.money}}</van-col>
                </van-row>
            </van-list>
        </van-pull-refresh>
        <Page :lists="lists" :size="data.length" @onChange="pageChange"/>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {dateFormat, paginationSplice} from "../utils/helpers";
    import Page from "../components/Page";

    export default {
        components: {
            Page
        },
        filters: {
            dateFormat,
        },
        data() {
            return {
                loading: false,
                per_page: 50,
                current_page: 1,
            }
        },
        computed: {
            ...mapGetters(['notOpenLists']),
            lists() {
                return paginationSplice(this.notOpenLists, this.per_page, this.current_page)
            },
            data() {
                return this.lists.data[this.lists.current_page - 1] || []
            }
        },
        created() {
            this.init();
        },
        methods: {
            async init() {
                this.loading = true;
                this.pageChange(1);
                let game_id = this.$route.query.game_id;
                await this.$store.dispatch('getNotOpen', {game_id});
                this.loading = false;
            },
            pageChange(page) {
                this.current_page = page;
            }
        }
    }
</script>

<style scoped>
    .pl-row-item {
        border-bottom: solid 1px #eee;
    }
</style>
