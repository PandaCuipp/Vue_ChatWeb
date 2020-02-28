<template>
    <div class="p_y5 p_x5">
        <div @touchstart="$emit('onClick',{label,value,peilv})"
             :style="styles"
             class="q-content-ball-item">
            {{label}}
            <van-icon v-if="showGem" class="q-content-ball-item-gem" name="gem-o"/>
        </div>
        <slot>
            <div v-if="peilv"
                 :style="{color:active?'#2FBCF6':'#999'}"
                 class="text-center font12">{{peilv}}
            </div>
        </slot>
    </div>
</template>

<script>
    /**
     * 圆球
     * 绿：#1B8651
     * 红：#B12838
     * 蓝：#156DCA
     */
    export default {
        name: "Ball",
        props: {
            value: [Number, String],
            label: {
                type: [Number, String],
                default: '',
            },
            active: {
                type: Boolean,
                default: false,
            },
            showGem: {
                type: Boolean,
                default: false,
            },
            peilv: [Number, String],

            /*40px == 1.06667rem;*/
            size: {
                type: String,
                default: '1.06667rem',
            },
            bold: {
                type: Boolean,
                default: true,
            },
            borderRadius: {
                type: String,
                default: '50%',
            },
            color: {
                type: String,
                default: '#14B4F5',
            },
            textColor: {
                type: String
            },
            activeTextColor: {
                type: String,
                default: 'white',
            }
        },
        computed: {
            styles() {
                const {active, color, size, textColor, activeTextColor, borderRadius, bold} = this;
                let styles = {
                    width: size,
                    lineHeight: size,
                    borderRadius,
                    fontWeight: bold ? 'bold' : 'normal',
                    border: `solid 1px ${color}`,
                }
                if (active) {
                    return {
                        ...styles,
                        backgroundColor: color,
                        color: activeTextColor,
                    }
                }
                return {
                    ...styles,
                    color: textColor || color,
                }


            }
        }
    }
</script>


<style scoped>
    /*40px == 1.06667rem;*/
    .q-content-ball-item {
        width: 40px;
        line-height: 40px;
        text-align: center;
        position: relative;
    }

    .q-content-ball-item-gem {
        position: absolute;
        left: 5%;
        bottom: 5%;
    }
</style>
