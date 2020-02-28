<template>
    <div class="flex-row lh-sub-nav-container">
        <div v-for="(item,index) of data"
             @click="$emit('input',item.id)"
             :class="['lh-sub-nav-item',value==item.id?'active':'']">
            {{item.name}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "LiuHeSubNav",
        props: {
            data: {
                type: Array,
                default() {
                    return [];
                },
            },
            value: [Number, String],
        },
    }
</script>

<style scoped>
    .lh-sub-nav-container {
        padding: 5px;
        overflow-x: auto;
        white-space: nowrap;
    }

    /*#FCFEFD ~ #CBEEE3*/
    .lh-sub-nav-item {
        margin: 2px 0;
        font-size: 12px;
        line-height: 23px;
        padding: 0 10px;
        border: solid 1px #eee;
        border-left-width: 0;
        background: linear-gradient(to bottom, #FCFEFD 0%, #CBEEE3 100%);
        color: #666;
    }

    .lh-sub-nav-item:first-child {
        border-left-width: 1px;
    }


    /*#74C3AB ~ #7DD3B9*/
    .lh-sub-nav-item.active {
        color: #555;
        background: linear-gradient(to bottom, #74C3AB 0%, #7DD3B9 100%);
    }
</style>
