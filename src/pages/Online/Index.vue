<template>
     <div class="content">
        <van-sticky :offset-top="38">
            <box-title :titleName="t('Network.onlineCfg')"></box-title>
             <h1>上网页面 后续持续更新......</h1>
        </van-sticky>
    </div>
</template>

<script setup>
    import { ref } from "vue"
    import { useI18n } from "vue-i18n"
    import BoxTitle from "@/components/BoxTitle"
	const { t } = useI18n()

</script>
    
<style scoped>

</style>
