<template>
    <div class="bg-purple flex-row justify-between line50 px-w100 page-container">
        <div @click="onChange('pre')" class="text-white text-center font14 page-pre">上一页</div>
        <div class="text-white font14 flex-row justify-center flex1">
            <div class="m_r5">{{lists.current_page}}/{{lists.last_page}}页</div>
            <div>{{pageSize}}/{{lists.total}}条</div>
        </div>
        <div @click="onChange('next')" class="text-white font14 text-center page-next">下一页</div>
    </div>
</template>

<script>
    import {isNumeric, paginationSplice} from "../utils/helpers";

    export default {
        name: "Page",
        props: {
            lists: {
                type: Object,
                default() {
                    return paginationSplice()
                }
            },
            size: Number
        },
        data() {
            return {
                // lists: {
                //     data: [],
                //     per_page: 20,
                //     total: 20,
                //     current_page: 1,
                //     last_page: 1,
                // }
            }
        },
        computed: {
            pageSize() {
                if (isNumeric(this.size)) {
                    return this.size;
                }
                return this.lists.data ? this.lists.data.length : 0;
            }
        },
        methods: {
            onChange(type) {
                let {current_page, last_page} = this.lists;
                if (type === 'pre') {
                    if (current_page <= 1) {
                        return;
                    }
                    this.$emit('onChange', current_page - 1);
                } else {
                    if (current_page >= last_page) {
                        return;
                    }
                    this.$emit('onChange', current_page + 1);
                }
            }
        }
    }
</script>

<style scoped>
    .page-container {
        position: fixed;
        bottom: 0;
    }

    .page-pre, .page-next {
        width: 60px;
    }
</style>
