<template>
    <div class="flex-column flex1 font14 p_y15 q-content-container">
        <!--圆球start-->
        <div class="flex-row justify-center flex-wrap p_y5 q-content-tags">
            <div @touchstart="$emit('onBallCheck',item,i)"
                 :class="['q-content-ball-item',ballCheck.indexOf(item)>-1?'active':'']"
                 :key="i"
                 v-for="(item,i) of ball">
                {{item}}
            </div>
        </div>
        <!--圆球end-->

        <!--方球start-->
        <div class="flex-row justify-center flex-wrap p_y5 q-content-tags">
            <div @touchstart="$emit('onSBallCheck',item.value,i)"
                 class="q-content-sball-item"
                 :key="i"
                 :style="sBallStyle(item)"
                 v-for="(item,i) of sBall">
                {{item.value}}
            </div>
        </div>
        <!--方球end-->


        <!--标签start-->
        <div class="flex-column p_y5 q-content-tags" :key="index" v-for="(tag,index) of tags">
            <div v-if="tag.title&&tag.title.length" class="line30 text-center tag-title">{{tag.title}}</div>
            <div class="flex-row justify-center flex-wrap">
                <div @touchstart="$emit('onTagCheck',tagItemVal(item,tag.title),i)"
                     :class="['q-content-tag-item',tagCheck.indexOf(tagItemVal(item,tag.title))>-1?'active':'']"
                     :key="i"
                     v-for="(item,i) of tag.value">
                    {{item}}
                    <span v-show="tagCheck.indexOf(tagItemVal(item,tag.title))>-1"
                          class="q-content-tag-check"></span>
                </div>
            </div>
        </div>
        <!--标签end-->


        <!--说明start-->
        <div v-if="remark&&remark.length" class="line50 text-light text-center">{{remark}}</div>
        <!--说明end-->
    </div>
</template>

<script>

    export default {
        name: "QuickContent",
        props: {
            remark: {
                type: String,
                default: '',
            },
            tags: {
                type: Array,
                default() {
                    return []
                },
            },
            tagCheck: {
                type: Array,
                default() {
                    return []
                },
            },
            ball: {
                type: Array,
                default() {
                    return []
                },
            },
            ballCheck: {
                type: Array,
                default() {
                    return []
                },
            },
            sBall: {
                type: Array,
                default() {
                    return []
                },
            },
            sBallCheck: {
                type: Array,
                default() {
                    return []
                },
            },
        },
        methods: {
            tagItemVal(val, title) {
                if (title && title.length) {
                    // 分组名+值
                    return `${title}_${val}`;
                }
                return `${val}`;
            },
            sBallStyle({color, value}) {
                const active = this.sBallCheck.indexOf(value) > -1
                if (active) {
                    return {
                        color: '#DCDCDC',
                        backgroundColor: color,
                        borderColor: color,
                    }
                }
                return {
                    color,
                }

            }
        }
    }
</script>

<style scoped>
    .q-content-container {
        overflow-y: auto;
    }

    .q-content-ball-item {
        border: solid 1px #14B4F5;
        color: #14B4F5;
        width: 50px;
        font-weight: bold;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        margin: 5px;
    }

    .q-content-ball-item.active {
        color: white;
        background-color: #14B4F5;
    }

    .q-content-sball-item {
        border: solid 1px #92DCFA;
        width: 38px;
        line-height: 38px;
        text-align: center;
        border-radius: 3px;
        margin: 5px;
        text-shadow: 1px 1px 0 #333;
    }

    .q-content-tag-item {
        border: solid 1px #92DCFA;
        padding: 6px 10px;
        margin: 5px;
        border-radius: 3px;
        position: relative;
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

    .tag-title {
        color: #2FBCF6;
    }


</style>
