<template>
    <div class="flex-column q-menu-container">
        <div @click="$emit('onCheck',item)" :key="index" v-for="(item,index) of data"
             :class="['q-menu-item-btn',check.indexOf(item)>-1?'active':'']">
            {{item}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "LiuHeMenu",
        props: {
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            check: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .q-menu-container {
        width: 60px;
        overflow-y: auto;
    }

    .q-menu-item-btn {
        width: 60px;
        text-align: center;
        height: 40px;
        line-height: 40px;
    }

    .q-menu-item-btn.active {
        color: white;
        background-color: #14B4F5;
    }
</style>
