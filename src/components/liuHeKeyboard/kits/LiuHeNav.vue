<template>
    <div class="flex-row justify-between px-w100 quick-nav-container">
        <div class="flex-row align-center p_x5 nav-content">
            <div @click="$emit('onCheck', item)" :class="['nav-item-btn',item.id===index?'active':'']"
                 v-for="item of data">
                {{item.name}}
            </div>
        </div>
        <div @click="$emit('onClose')" class="flex-row justify-center align-center nav-right-con">
            <van-icon name="arrow-down"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LiuHeNav",
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
        position: fixed;
        top: 0;
        height: 1.33333rem;
        background-color: #F5F6F7;
        border-color: #eee;
        z-index: 1;
        border-bottom-width: 1px;
    }

    .nav-content {
        overflow-x: scroll;
        /*overflow-x: auto;*/
    }

    .nav-item-btn {
        border-radius: 2px;
        padding: 5px 15px;
        margin: 0 5px;
        white-space: nowrap;
        border: solid 1px #F5F6F7;
    }

    .nav-item-btn.active {
        background-color: white;
        border-color: #3CC1F7;
    }

    .nav-right-con {
        width: 80px;
    }
</style>
