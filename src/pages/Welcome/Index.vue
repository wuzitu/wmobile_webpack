<template>
    <div class="welcome-box">
        <svg-icon class="ic_logo" icon-class="ic_logo"></svg-icon>
        <p class="welcome-text">{{ t("WelcomeTxt1") }}</p>
        <p class="welcome-text">{{ t("WelcomeTxt2") }}</p>
        <van-button round type="primary" size="large" color="#617CF0" @click="startUser">{{ t("WelcomeBtn") }}</van-button>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
const { t } = useI18n()
const router = useRouter()

const startUser = () => {
    router.push({
        name: "InitWlan"
    })
}
</script>

<style scoped>
    .welcome-box {
        width: 375px;
        height: 100vh;
        background: url("../../frame/assets/img/img_welcom_bg.png") no-repeat;
        background-size: 375px 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .ic_logo {
        width: 141px;
        height: 61px;
        margin-top: 221px;
        margin-bottom: 30px;
    }
    .welcome-text {
        width: 145px;
        line-height: 32px;
        font-size: 24px;
        color: #333;
        text-align: center;
        margin: 0;
    }
    :deep(.van-button) {
        width: 290px;
        margin-top: 220px;
    }
</style>