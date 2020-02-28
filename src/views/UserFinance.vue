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
                <div :class="titleClass">积分账变</div>
                <div class="font12 subTitle" v-if="subTitle">{{subTitle}}</div>
            </div>
        </van-nav-bar>
        <van-pull-refresh v-model="loading" @refresh="onPage(this.userFinance.current_page)">
            <van-list
                    class="p_t46 m_t10 p_b50"
                    :value="false"
                    :finished="true"
                    finished-text="">
                <div class="bg-white font14 line30 radius5 m_y10 m_x10 p_x10 p_y10" :key="index"
                     v-for="(item,index) of userFinance.data||[]">
                    <van-row>
                        <van-col :span="8">{{item.type}}</van-col>
                        <van-col :span="16" class="font12 text-light text-end">{{item.date}}</van-col>
                    </van-row>
                    <van-row>
                        <van-col :span="24">{{item.content}}</van-col>
                    </van-row>
                    <van-row class="text-center">
                        <van-col :span="8" class="font12 text-light">原积分</van-col>
                        <van-col :span="8" class="font12 text-light">变动积分</van-col>
                        <van-col :span="8" class="font12 text-light">现积分</van-col>
                    </van-row>
                    <van-row class="text-center text-red">
                        <van-col :span="8">{{item.before_money|formatMoney}}</van-col>
                        <van-col :span="8" :class="[item.edit_money>0?'text-red':'text-light-green']">
                            {{item.edit_money|formatMoney}}
                        </van-col>
                        <van-col :span="8">{{item.money|formatMoney}}</van-col>
                    </van-row>
                </div>
            </van-list>
        </van-pull-refresh>
        <Page :lists="userFinance" @onChange="onPage"/>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import Page from "../components/Page";
    import {formatMoney, isNumeric} from "../utils/helpers";

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
                subTitle: undefined,
                startTime: undefined,
                endTime: undefined,
                titleClass: []
            }
        },
        computed: {
            ...mapGetters(['userFinance']),
        },
        created() {
            this.initSubTitle();
            this.onPage(1)
        },
        methods: {
            initSubTitle() {
                let {startTime, endTime} = this.$route.query;
                if (startTime || endTime) {
                    this.subTitle = `(${startTime || '-'} ~ ${endTime || '-'})`;
                    this.titleClass = ['font12', 'line25']
                }

            },
            onPage(page) {
                let payload = {};
                if (isNumeric(page)) {
                    payload.page = page;
                }
                let {startTime, endTime} = this;
                if (startTime) {
                    payload.start_time = startTime;
                }
                if (endTime) {
                    payload.end_time = endTime;
                }
                this.$store.dispatch('getUserFinance', payload);
            }
        }
    }
</script>

<style scoped>
    .app {
        background-color: #EEEEEE;
        min-height: 100vh;
    }

    .subTitle {
        line-height: 15px;
    }
</style>
