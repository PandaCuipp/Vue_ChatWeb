<template>
    <div class="container-404">
        <div class="back-btn-con">
            <van-button @click="$router.back()" round class="back-btn-404" type="info">返回</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NotFound",
    }
</script>

<style scoped>
    .container-404 {
        min-height: 100vh;
        background: url('../assets/images/404.png');
        background-size: 100% 100%;
    }

    .back-btn-con {
        position: fixed;
        bottom: 20%;
        padding: 0 15%;
        width: 100%;
    }

    .back-btn-404 {
        width: 100%;
    }
</style>
