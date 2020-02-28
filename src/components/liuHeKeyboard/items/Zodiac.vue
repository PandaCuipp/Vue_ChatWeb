<template>
    <div @click="$emit('onClick')" class="flex-row font12 zodiac-container" :style="styles">
        <div v-if="zodiac" class="flex-row justify-center align-center zodiac-left">
            <slot name="left">
                <Ball :size="leftSize" :bold="false" color="#204C74" :active="true" :show-gem="showGem" :label="zodiac"
                      :style="ballStyle"/>
            </slot>
        </div>
        <div v-if="balls.length" class="flex-row justify-center align-center zodiac-center">
            <Ball
                    :size="rightSize"
                    :bold="false"
                    :color="item.color"
                    :label="item.name"
                    :active="active"
                    v-for="(item,i) of balls"
                    :style="ballStyle"/>
        </div>
        <div class="flex-row justify-center align-center text-red  zodiac-right">
            <slot name="peilv">
                {{peilv}}
            </slot>
        </div>
    </div>
</template>

<script>
    import Ball from "./Ball";

    export default {
        name: "Zodiac",
        components: {
            Ball,
        },
        props: {
            active: {
                type: Boolean,
                default: false
            },
            showGem: {
                type: Boolean,
                default: false,
            },
            /*32px == 0.85333rem*/
            /*25px == 0.66667rem*/
            /*23px == 0.61333rem*/
            leftSize: {
                type: String,
                default: '0.66667rem',
            },
            rightSize: {
                type: String,
                default: '0.6rem',
            },
            zodiac: String,
            balls: {
                type: Array,
                default() {
                    return [];
                }
            },
            peilv: [Number, String],
            padding: {
                type: String,
                default: '2px',
            },
        },
        computed: {
            styles() {
                const {active} = this;
                return {
                    // backgroundColor: active ? '#eee' : 'white',
                }
            },
            ballStyle() {
                return {
                    padding: this.padding,
                }
            }
        }
    }
</script>

<style scoped>
    .zodiac-container {
        margin: 1px 0;
        /*border: solid 1px #eee;*/
    }

    .zodiac-left {
        /*border-right: solid 1px #eee;*/
    }

    .zodiac-right {
        /*border-left: solid 1px #eee;*/
        font-weight: bold;
    }
</style>
