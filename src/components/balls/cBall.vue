<template>
    <div class="flex-row justify-center c-ball-app">
        <div v-for="ball of ballArrays" :style="ballStyle" :class="['ball',`ball-bg${ball}`,ballClass]"></div>
    </div>
</template>

<script>
    import {isNumber, isString} from "../../utils/helpers";

    export default {
        name: "cBall",
        props: {
            balls: [String, Array],
            width: [String, Number],
            height: [String, Number],
            marginLeft: [String, Number],
            marginRight: [String, Number],
            ballClass: String,
        },
        computed: {
            ballArrays() {
                if (isString(this.balls)) {
                    return this.balls.split(',')
                }
                return this.balls;
            },
            ballStyle() {
                let {width, height, marginLeft, marginRight} = this;
                let styles = {};
                if (width) {
                    width = isNumber(width) ? `${width}px` : width;
                    styles.width = width;
                }
                if (height) {
                    height = isNumber(height) ? `${height}px` : height;
                    styles.height = height;
                }
                if (marginLeft) {
                    marginLeft = isNumber(marginLeft) ? `${width}px` : marginLeft;
                    styles.marginLeft = marginLeft;
                }
                if (marginRight) {
                    marginRight = isNumber(marginRight) ? `${marginRight}px` : marginRight;
                    styles.marginRight = marginRight;
                }
                return styles;

            }
        },
    }
</script>

<style scoped>
    .ball {
        width: 20px;
        height: 20px;
        margin: 0 2px;
    }

    .ball-bgdefault {
        background: url("../../assets/images/ball/ic_ball_default.png");
        background-size: 100% 100%;
    }

    .ball-bg0 {
        background: url("../../assets/images/ball/ic_ball_0.png");
        background-size: 100% 100%;
    }

    .ball-bg1 {
        background: url("../../assets/images/ball/ic_ball_1.png");
        background-size: 100% 100%;
    }

    .ball-bg2 {
        background: url("../../assets/images/ball/ic_ball_2.png");
        background-size: 100% 100%;
    }

    .ball-bg3 {
        background: url("../../assets/images/ball/ic_ball_3.png");
        background-size: 100% 100%;
    }

    .ball-bg4 {
        background: url("../../assets/images/ball/ic_ball_4.png");
        background-size: 100% 100%;
    }

    .ball-bg5 {
        background: url("../../assets/images/ball/ic_ball_5.png");
        background-size: 100% 100%;
    }

    .ball-bg6 {
        background: url("../../assets/images/ball/ic_ball_6.png");
        background-size: 100% 100%;
    }

    .ball-bg7 {
        background: url("../../assets/images/ball/ic_ball_7.png");
        background-size: 100% 100%;
    }

    .ball-bg8 {
        background: url("../../assets/images/ball/ic_ball_8.png");
        background-size: 100% 100%;
    }

    .ball-bg9 {
        background: url("../../assets/images/ball/ic_ball_9.png");
        background-size: 100% 100%;
    }

    .ball-bg10 {
        background: url("../../assets/images/ball/ic_ball_10.png");
        background-size: 100% 100%;
    }
</style>
