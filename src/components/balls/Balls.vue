<template>
    <cBall
            :balls="ballArrays"
            :width="width"
            :height="height"
            :marginLeft="marginLeft"
            :marginRight="marginRight"
            :ballClass="ballClass"
            v-if="ballArrays&&ballArrays.length===5"/>
    <sBall :balls="ballArrays"
           :width="width"
           :height="height"
           :marginLeft="marginLeft"
           :marginRight="marginRight"
           :ballClass="ballClass"
           v-else/>
</template>

<script>
    import {isString} from "../../utils/helpers";
    import cBall from "./cBall";
    import sBall from "./sBall";

    export default {
        name: "Balls",
        components: {
            cBall,
            sBall,
        },
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
        },
    }
</script>

<style scoped>

</style>
