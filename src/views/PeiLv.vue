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
            <p slot="title" class="text-white">赔率</p>
        </van-nav-bar>
        <van-pull-refresh v-model="loading" @refresh="init()">
            <van-list
                    class="p_t46"
                    :value="false"
                    :finished="true"
                    finished-text="">
                <van-row class="pl-row-item" :key="index" v-for="(item,index) of lists">
                    <van-col span="8" class="font14 text-center line50">{{item.title}}</van-col>
                    <van-col span="8" class="font12">
                        <div class="text-red line50 font16" v-if="item.hasSubTitle">{{item.subTitle}}</div>
                        <!--<div :class="[item.hasSubTitle?'line25':'line50']">退水：{{item.out_tuishui}}</div>-->
                    </van-col>
                    <van-col span="8" class="font14 text-center line50 text-green">{{item.peilv}}</van-col>
                </van-row>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                loading: false,
            }
        },
        computed: {
            ...mapGetters(['peilv']),
            lists() {
                let lists = [...this.peilv];
                return lists.map(item => {
                    let name = item.remake.split('-');
                    item.title = name[0];
                    item.subTitle = name[1];
                    item.hasSubTitle = name.length === 2;
                    return item;
                });
            }
        },
        created() {
            this.init();
        },
        methods: {
            async init() {
                this.loading = true;
                let game_id = this.$route.query.game_id;
                await this.$store.dispatch('getPeilv', {game_id});
                this.loading = false;
            }
        }
    }
</script>

<style scoped>
    .pl-row-item {
        border-bottom: solid 1px #eee;
    }
</style>
