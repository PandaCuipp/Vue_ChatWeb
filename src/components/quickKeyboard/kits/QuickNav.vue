<template>
    <div class="flex-row justify-between quick-nav-container">
        <div class="flex-row align-center p_x5 nav-content">
            <div @touchstart="$emit('onCheck', i,item)" :class="['nav-item-btn',i===index?'active':'']"
                 :key="i"
                 v-for="(item,i) of data">
                {{item}}
            </div>
        </div>
        <div @touchstart="$emit('onClose')" class="flex-row justify-center align-center nav-right-con">
            <van-icon name="arrow-down"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "QuickNav",
        props: {
            index: {
                type: Number,
                default: 0,
            },
            data: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
    }
</script>

<style scoped>
    .quick-nav-container {
        height: 1.33333rem;
        background-color: #F5F6F7;
        border-color: #eee;
        border-bottom-width: 1px;
    }

    .nav-content {
        overflow-x: auto;
    }

    .nav-item-btn {
        border-radius: 2px;
        padding: 5px 15px;
        margin: 0 5px;
        border: solid 1px #F5F6F7;
    }

    .nav-item-btn.active {
        background-color: white;
        border-color: #3CC1F7;
    }

    .nav-right-con {
        width: 40px;
    }
</style>
