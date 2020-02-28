<template>
    <div>
        <van-nav-bar
                fixed
                class="bg-light-blue"
                :border="true"
        >
            <div class="router-back" @click="$router.back()" slot="left">
                <van-icon color="white" name="arrow-left"/>
            </div>
            <p slot="title" class="text-white">玩法</p>
        </van-nav-bar>
        <div class="p_x10 p_t46 m_t10 p_b10">
            <van-row class="wf-row-item radius5 p_x10 p_y5 m_y5" :key="index" v-for="(item,index) of lists">
                <van-divider class="text-light-blue font16" style="border-color: #35A8F1" :hairline="true">
                    {{item.title}}
                </van-divider>
                <van-col span="24" class="font12">
                    <van-row class="line20" :key="'example'+i" v-for="(e,i) of item.examples">
                        <van-col span="24" class="font16 text-red line30">{{e.value}}</van-col>
                        <van-col span="24" class="font14 text-green">{{e.remark}}</van-col>
                        <van-col span="24" class="font12 text-dark" v-if="e.result&&e.result.length">({{e.result}})
                        </van-col>
                    </van-row>
                </van-col>
                <van-col span="24" class="font14 line50 text-pink">{{item.format}}</van-col>
            </van-row>
            <van-row class="wf-row-item radius5 p_x10 p_y5 m_y5">
                <van-divider class="text-pink font16" style="border-color: #D52B91" :hairline="true">上下分</van-divider>
                <van-col span="24" class="font14 line30 text-yellow text-center">{{sf}}</van-col>
                <van-col span="24" class="font14 line30 text-yellow text-center">{{xf}}</van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sf: '上分点上分然后输入金额发送即可',
                xf: '下分点下分然后输入金额发送即可',
                lists: [
                    {
                        title: '玩法一: (大小单双)',
                        examples: [
                            {value: '1大100', remark: '第一名大下注100元', result: '第一名开6-10号车为中奖'},
                            {value: '12大100', remark: '第一名大下注100元，第二名大下注100元', result: '第一名开大为中奖，第二名开大也中奖'},
                        ],
                        format: '格式：【位置】 【玩法】 【金额】',
                    },
                    {
                        title: '玩法二: (定位)',
                        examples: [
                            {value: '1/123/100', remark: '第一名买了1号车、2号车、3号车各100元', result: '第一名开1、2、3为中奖'},
                            {value: '123/1/100', remark: '第一名、第二名、第三名都买了1号车100元', result: '1号车跑到第一名、第二名、第三名为中奖'},
                        ],
                        format: '格式：【位置】 /【车号】/ 【金额】',
                    },
                    {
                        title: '玩法三: (和值)',
                        examples: [
                            {value: '和/341819/100', remark: '和3、和4、和18、和19下注100元', result: ''},
                        ],
                        format: '格式：【和】 【号码】/ 【金额】',
                    },
                ]
            }
        }
    }
</script>

<style scoped>
    .wf-row-item {
        border: solid 1px #eee;
    }
</style>
