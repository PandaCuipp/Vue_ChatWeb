<template>
    <div>
        <van-nav-bar
                class="bg-purple"
                :border="true"
        >
            <div class="router-back" @click="$router.back()" slot="left">
                <van-icon color="white" name="arrow-left"/>
            </div>
            <div slot="title" class="flex-row justify-center align-center text-white">
                {{$route.query.title||''}}查询
            </div>
        </van-nav-bar>
        <div class="font14 flex-column justify-center r-input-content">
            <div class="flex-row justify-center p_y5 time-input">
                <div class="line40 p_r10">开始时间</div>
                <div>
                    <van-field @click="toggleTimePopup(true,'startTime')" readonly class="field-border-d radius5 p_y5"
                               v-model="startTime" placeholder="开始时间"/>
                </div>
            </div>
            <div class="flex-row justify-center p_y5 time-input">
                <div class="line40 p_r10">结束时间</div>
                <div>
                    <van-field @click="toggleTimePopup(true,'endTime')" readonly class="field-border-d radius5 p_y5"
                               v-model="endTime" placeholder="结束时间"/>
                </div>
            </div>
            <van-row class="p_x10 p_y25">
                <van-col class="text-center tool-item" :span="24/tools.length" :key="index"
                         v-for="(item,index) of tools">
                    <van-button @click="onToolbar(item.value)" type="info" size="mini">{{item.title}}</van-button>
                </van-col>
            </van-row>

            <div class="flex-row justify-center p_t10">
                <van-button @click="onPush" type="primary" size="small" style="width:50%">确定</van-button>
            </div>
        </div>
        <!--时间选择器start-->
        <van-popup
                class="time-popup"
                v-model="show"
                position="bottom"
        >
            <van-datetime-picker
                    @cancel="toggleTimePopup(false)"
                    @confirm="onDatePickerConfirm"
                    :show-toolbar="true"
                    v-model="currentDate"
                    type="date"
            />
        </van-popup>
        <!--时间选择器end-->
    </div>
</template>

<script>
    import {dateFormat, isBoolean} from "../utils/helpers";
    import moment from 'moment'

    export default {
        data() {
            return {
                show: false,
                startTime: '',
                endTime: '',
                currentDate: '',
                currentKey: '',
                tools: [
                    {title: '昨天', value: 'lastday'},
                    {title: '今天', value: 'today'},
                    {title: '上周', value: 'lastweek'},
                    {title: '本周', value: 'week'},
                    {title: '上月', value: 'lastmonth'},
                    {title: '本月', value: 'month'},
                ]
            }
        },
        created() {
            const nowDate = dateFormat(null, 'Y-m-d')
            this.startTime = nowDate;
            this.endTime = nowDate;
        },
        methods: {
            toggleTimePopup(show, key) {
                show = isBoolean(show) ? show : !this.show;
                if (show) {
                    this.currentKey = key;
                    this.currentDate = moment(this[key]).toDate() || new Date();
                }
                this.show = show;
            },
            onDatePickerConfirm(val) {
                this[this.currentKey] = dateFormat(val, 'Y-m-d');
                this.toggleTimePopup(false);
            },
            onPush() {
                let name = this.$route.query.name;
                let {startTime, endTime} = this;
                this.$router.push({
                    name,
                    query: {startTime, endTime},
                })
            },
            onToolbar(v) {
                let startTime = '';
                let endTime;
                // 早7点~早6点 报表时间
                let currentMoment = moment();
                currentMoment.add(1, 'days');
                const isToday = currentMoment.hours() <= 6;

                if (v === 'today') {
                    let offset = 1;
                    if (isToday) {
                        offset = 2;
                    }
                    startTime = moment().add(1 - offset, 'days').format('YYYY-MM-DD');
                    endTime = moment().add(1 - offset, 'days').format('YYYY-MM-DD');
                } else if (v === 'lastday') {
                    let offset = 1;
                    if (isToday) {
                        offset = 2;
                    }
                    startTime = moment().add(0 - offset, 'days').format('YYYY-MM-DD');
                    endTime = moment().add(0 - offset, 'days').format('YYYY-MM-DD');
                } else if (v === 'week') {
                    let offset = 1;
                    if (isToday && currentMoment.weekday() === 1) {
                        offset = 2;
                    }
                    startTime = moment().week(moment().week() - (1 - offset)).startOf('week').format('YYYY-MM-DD');   //这样是年月日的格式
                    endTime = moment().week(moment().week() - (1 - offset)).endOf('week').format('YYYY-MM-DD'); //这样是时间戳的格式
                } else if (v === 'lastweek') {
                    let offset = 1;
                    if (isToday && currentMoment.weekday() === 1) {
                        offset = 2;
                    }
                    startTime = moment().week(moment().week() - offset).startOf('week').format('YYYY-MM-DD');   //这样是年月日的格式
                    endTime = moment().week(moment().week() - offset).endOf('week').format('YYYY-MM-DD'); //这样是时间戳的格式

                } else if (v === 'month') {
                    let offset = 1;
                    if (isToday && currentMoment.weekday() === 1) {
                        offset = 2;
                    }
                    startTime = moment().month(moment().month() - (1 - offset)).startOf('month').format('YYYY-MM-DD');
                    endTime = moment().month(moment().month() - (1 - offset)).endOf('month').format('YYYY-MM-DD');
                } else if (v === 'lastmonth') {
                    let offset = 1;
                    if (isToday && currentMoment.weekday() === 1) {
                        offset = 2;
                    }
                    startTime = moment().month(moment().month() - offset).startOf('month').format('YYYY-MM-DD');
                    endTime = moment().month(moment().month() - offset).endOf('month').format('YYYY-MM-DD');
                }
                this.startTime = startTime
                this.endTime = endTime
            }
        }
    }
</script>

<style scoped>
    .r-input-content {
        min-height: 300px;
        border: solid 1px #ccc;
        margin: 20px;
    }
</style>
