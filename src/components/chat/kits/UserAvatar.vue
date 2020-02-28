<template>
    <van-image round
               class="m_y5 bg-white"
               width="40px"
               height="40px"
               :src="src"
    />
</template>

<script>
    export default {
        name: "UserAvatar",
        props: {
            src: String
        }
    }
</script>

<style scoped>

</style>
