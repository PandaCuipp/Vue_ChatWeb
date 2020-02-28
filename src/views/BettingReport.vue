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
                <div :class="titleClass">竞猜报表</div>
                <div class="font12 subTitle" v-if="subTitle">{{subTitle}}</div>
            </div>
        </van-nav-bar>
        <van-pull-refresh v-model="loading" @refresh="initData()">
            <van-list
                    class="p_t46 p_b50"
                    :value="false"
                    :finished="true"
                    finished-text="">
                <div @click="onPush(item.game_id)" class="font14 line30 p_x10 bg-white m_b5"
                     v-for="(item,index) of userReportUser">
                    <van-row>
                        <van-col :span="12">
                            {{getGameName(item.game_id)}}
                        </van-col>
                        <van-col class="text-end" :span="12">
                            <van-icon name="arrow" color="#999"/>
                        </van-col>
                    </van-row>
                    <van-row class="text-center">
                        <van-col :span="8">
                            <div class="text-light">注单</div>
                            <div>{{item.counts}}</div>
                        </van-col>
                        <van-col :span="8">
                            <div class="text-light">红利</div>
                            <div>{{item.lost|formatMoney}}</div>
                        </van-col>
                        <van-col :span="8">
                            <div class="text-light">游戏结果</div>
                            <div :class="[item.all_result>0?'text-red':'text-light-green']">
                                {{item.all_result|formatMoney}}
                            </div>
                        </van-col>
                    </van-row>
                    <van-row class="text-center">
                        <van-col :span="8">
                            <div class="text-light">注额</div>
                            <div>{{item.moneys|formatMoney}}</div>
                        </van-col>
                        <van-col :span="8">
                            <div class="text-light">返点</div>
                            <div>{{item.tuishui|formatMoney}}
                            </div>
                        </van-col>
                        <van-col :span="8">
                            <div class="text-light">彩种结果</div>
                            <div :class="[item.all_result>0?'text-red':'text-light-green']">
                                {{item.all_result|formatMoney}}
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {formatMoney} from "../utils/helpers";

    export default {
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
            ...mapGetters(['userReportUser', 'simpleGameLists']),
        },
        created() {
            this.initSubTitle();
            this.initData();
            this.$store.dispatch('getSimpleGameLists')
        },
        methods: {
            getGameName(game_id) {
                let lists = [...this.simpleGameLists];
                for (let item of lists) {
                    if (item.game_id == game_id) {
                        return item.name;
                    }
                }
            },
            async initData() {
                this.loading = true;
                let {startTime, endTime} = this;
                let payload = {};
                if (startTime) {
                    payload.start_time = startTime;
                }
                if (endTime) {
                    payload.end_time = endTime;
                }
                await this.$store.dispatch('getUserReportUser', payload)
                this.loading = false;
            },
            initSubTitle() {
                let {startTime, endTime} = this.$route.query;
                this.startTime = startTime;
                this.endTime = endTime;
                if (startTime || endTime) {
                    this.subTitle = `(${startTime || '-'} ~ ${endTime || '-'})`;
                    this.titleClass = ['font12', 'line25']
                }

            },
            onPush(game_id) {
                let {startTime, endTime} = this;
                this.$router.push({
                    name: 'bettingQihao',
                    query: {startTime, endTime, game_id},
                })
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
