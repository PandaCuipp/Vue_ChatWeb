<template>
    <div class="flex-row justify-center s-ball-app">
        <div v-for="ball of ballArrays" :style="ballStyle" :class="['ball',`ball-bg${ball}`,ballClass]"></div>
    </div>
</template>

<script>
    import {isNumber, isString} from "../../utils/helpers";

    export default {
        name: "sBall",
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
                if (isNumber(marginLeft) || isString(marginLeft)) {
                    marginLeft = isNumber(marginLeft) ? `${width}px` : marginLeft;
                    styles.marginLeft = marginLeft;
                }
                if (isNumber(marginRight) || isString(marginRight)) {
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
        width: 15px;
        height: 15px;
        /*margin: 0 1px;*/
    }

    .ball-bgdefault {
        background: url("../../assets/images/ball/ic_square_default.png");
        background-size: 100% 100%;
    }

    .ball-bg1 {
        background: url("../../assets/images/ball/ic_square_1.png");
        background-size: 100% 100%;
    }

    .ball-bg2 {
        background: url("../../assets/images/ball/ic_square_2.png");
        background-size: 100% 100%;
    }

    .ball-bg3 {
        background: url("../../assets/images/ball/ic_square_3.png");
        background-size: 100% 100%;
    }

    .ball-bg4 {
        background: url("../../assets/images/ball/ic_square_4.png");
        background-size: 100% 100%;
    }

    .ball-bg5 {
        background: url("../../assets/images/ball/ic_square_5.png");
        background-size: 100% 100%;
    }

    .ball-bg6 {
        background: url("../../assets/images/ball/ic_square_6.png");
        background-size: 100% 100%;
    }

    .ball-bg7 {
        background: url("../../assets/images/ball/ic_square_7.png");
        background-size: 100% 100%;
    }

    .ball-bg8 {
        background: url("../../assets/images/ball/ic_square_8.png");
        background-size: 100% 100%;
    }

    .ball-bg9 {
        background: url("../../assets/images/ball/ic_square_9.png");
        background-size: 100% 100%;
    }

    .ball-bg10 {
        background: url("../../assets/images/ball/ic_square_10.png");
        background-size: 100% 100%;
    }
</style>
