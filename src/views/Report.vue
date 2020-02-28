<template>
    <div>
        <van-nav-bar
                class="bg-purple"
                :border="true"
        >
            <div class="router-back" @click="$router.back()" slot="left">
                <van-icon color="white" name="arrow-left"/>
            </div>
            <div slot="title" class="flex-row justify-center align-center text-white">
                报表查询
            </div>
        </van-nav-bar>
        <van-cell-group class="p_y20">
            <van-cell :to="{name:'reportInput',query:{name:'fuliReport',title:'福利报表'}}" class="text-center" title="福利报表"
                      is-link/>
            <van-cell :to="{name:'reportInput',query:{name:'userFinance',title:'积分账变'}}" class="text-center"
                      title="积分账变"
                      is-link/>
            <van-cell :to="{name:'reportInput',query:{name:'bettingReport',title:'竞猜报表'}}" class="text-center"
                      title="竞猜报表" is-link/>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "Report"
    }
</script>

<style scoped>

</style>
