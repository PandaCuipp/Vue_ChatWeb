<template>
    <div class="flex-row justify-center align-center">
        <div v-for="item of countTimes[0]" class="flex-row justify-center align-center c-down-col c-down-bg1">
            {{item||'-'}}
        </div>
        <div class="c-down-col2 c-down-bg2"></div>
        <div v-for="item of countTimes[1]" class="flex-row justify-center align-center c-down-col c-down-bg1">
            {{item||'-'}}
        </div>
    </div>
</template>

<script>

    import countdown from "../utils/countdown";

    export default {
        name: "cDown",
        props: {
            time: Number,
        },
        computed: {
            countTimes() {
                let time = this.time || 0;
                let {hours, minutes, seconds} = countdown(0, time * 1000);
                minutes += hours * 60;
                minutes = `${minutes}`.split('');
                seconds = `${seconds}`.split('');
                if (minutes.length === 1) {
                    minutes.unshift('0')
                }
                if (seconds.length === 1) {
                    seconds.unshift('0')
                }
                return [minutes, seconds];
            },
        },
    }
</script>

<style scoped>
    .c-down-col {
        width: 20px;
        height: 30px;
    }

    .c-down-col2 {
        width: 10px;
        height: 15px;
        margin: 0 5px;
    }

    .c-down-bg1 {
        background: url("../assets/images/img_time_bg.png");
        background-size: 100% 100%;
    }

    .c-down-bg2 {
        background: url("../assets/images/img_time_fg.png");
        background-size: 100% 100%;
    }
</style>
