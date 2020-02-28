<template>
    <div class="p_y5 p_x5">
        <div class="flex-row justify-center flex-wrap">
            <div @touchstart="$emit('onClick',{label,value,peilv})"
                 :class="['q-content-tag-item',active?'active':'']">
                {{label}}
                <span v-show="active" class="q-content-tag-check"></span>
                <div :class="['q-content-tag-peilv',active?'active':'']" v-if="peilv">{{peilv}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * 标签
     */
    export default {
        name: "Tag",
        props: {
            value: [Number, String],
            label: {
                type: [Number, String],
                default: '',
            },
            peilv: {
                type: [Number, String],
                default: '40.999',
            },
            active: {
                type: Boolean,
                default: false,
            },
        }
    }
</script>

<style scoped>
    .q-content-tag-item {
        border: solid 1px #92DCFA;
        padding: 4px 8px;
        margin: 5px;
        min-width: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        position: relative;
        font-size: 14px;
    }

    .q-content-tag-peilv {
        font-size: 12px;
        color: #666;
    }

    .q-content-tag-peilv.active {
        color: #18B5F5;
    }

    .q-content-tag-item.active {
        color: #18B5F5;
        background-color: #F3FBFE;
    }


    .q-content-tag-check {
        display: inline-block;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        right: 0;
        background: url('../../../assets/images/tagSign.png') no-repeat;
        background-size: 100%;
    }


</style>
