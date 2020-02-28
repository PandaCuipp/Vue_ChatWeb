<template>
    <div class="record-container">
        <van-nav-bar
                fixed
                class="bg-purple"
                :border="true"
        >
            <div class="router-back" @click="$router.back()" slot="left">
                <van-icon color="white" name="arrow-left"/>
            </div>
            <p slot="title" class="text-white">上下分记录</p>
        </van-nav-bar>
        <van-pull-refresh v-model="loading" @refresh="init()">
            <van-list
                    class="p_t46 m_t10 p_b50"
                    :value="false"
                    :finished="true"
                    finished-text="">
                <van-row class="pl-row-item p_x10 p_t5 font12 m_b5 bg-white" :key="index" v-for="(item,index) of data">
                    <van-row>
                        <van-col span="8" class="flex-row">
                            <van-image
                                    round
                                    class="bg-white"
                                    width="30px"
                                    height="30px"
                                    :src="userHeads[userInfo.photo]"
                            />
                            <div class="text-dark line25 p_x5">{{userInfo.username}}</div>
                        </van-col>
                        <van-col span="8" class="line25 text-dark">类型：<span
                                :class="[item.type==1?'text-green':'text-red']">{{item.type==1?'上分':'下分'}}</span>
                        </van-col>
                        <van-col span="8" class="line25 text-dark">积分：<span class="text-red">{{item.money}}</span>
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col span="8" class="line25 text-light text-center">申请时间</van-col>
                        <van-col span="8" class="line25 text-center">{{item.add_time}}</van-col>
                        <van-col span="8" class="line25 text-light text-center">状态</van-col>
                    </van-row>
                    <van-row>
                        <van-col span="8" class="line25 text-light text-center">审核时间</van-col>
                        <van-col span="8" class="line25 text-center">{{item.check_time}}</van-col>
                        <van-col span="8" :class="['line25','text-center',item.statusColor]">{{item.statusText}}
                        </van-col>
                    </van-row>
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
    import {userHeads} from "../utils/images";

    export default {
        components: {
            Page
        },
        filters: {
            dateFormat,
        },
        data() {
            return {
                userHeads,
                loading: false,
                per_page: 20,
                current_page: 1,
            }
        },
        computed: {
            ...mapGetters(['userRecordLists', 'userInfo']),
            lists() {
                return paginationSplice(this.userRecordLists.list, this.per_page, this.current_page)
            },
            data() {
                let data = this.lists.data[this.lists.current_page - 1] || [];
                return data.map(item => {
                    switch (item.status) {
                        case 0:
                            item.statusText = '待审核';
                            item.statusColor = 'text-light';
                            break;
                        case 1:
                            item.statusText = '已通过';
                            item.statusColor = 'text-green';
                            break;
                        case 2:
                            item.statusText = '已拒绝';
                            item.statusColor = 'text-red';
                            break;
                    }
                    return item;
                })
            }
        },
        created() {
            this.init();
            this.$store.dispatch('getUserInfo');
        },
        methods: {
            async init() {
                this.loading = true;
                this.pageChange(1);
                await this.$store.dispatch('getUserRecordLists');
                this.loading = false;
            },
            pageChange(page) {
                this.current_page = page;
            }
        }
    }
</script>

<style scoped>
    .record-container {
        min-height: 100vh;
        background-color: #eee
    }

    .pl-row-item {
        border-bottom: solid 1px #eee;
    }
</style>
