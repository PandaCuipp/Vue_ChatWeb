<template>
    <van-popup
            :lock-scroll="false"
            :style="{backgroundColor:'rgba(0,0,0,0)'}"
            :value="value"
            @input="e=>$emit('input',e)"
            :overlay="false"
            :overlay-style="{backgroundColor:'rgba(0,0,0,0)'}"
            position="top">
        <div class="animate">
            <div v-if="showLoading" class="flex-row justify-center align-center animate-loading">
                <van-loading type="spinner" size="50" color="#1989fa"/>
            </div>
            <iframe id="iframe1" style="height:100%;width:100%;border: none;"
                    src="./animate/car/index.html"></iframe>

            <div @touchend="$emit('onClose')" v-show="!showLoading"
                 class="p_r10"
                 style="position: fixed;top: -2px;left: 0;">
                <van-icon
                        color="white"
                        size="30"
                        name="arrow-left"/>
            </div>
        </div>

    </van-popup>
</template>

<script>
    import animateMixins10 from "./animateMixins10";

    export default {
        name: "VueCar",
        mixins: [animateMixins10],
        data() {
            return {
                isCar: true,
            }
        }

    }
</script>

<style scoped>
    .animate-loading {
        background-color: #333;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        color: white;
    }

</style>
