<template>
    <div id="login">
        <div class="login-bg">
            <svg-icon class="ic_logo" icon-class="ic_logo"></svg-icon>
        </div>
        <div class="login-password">
            <field
                :type="passwordType"
                :placeholder="t('Password.placeholder1')"
                left-icon="lock"
                :right-icon="passwordEye"
                @click-right-icon="inputTypeSwitch"
            ></field>
            <p class="forget" @click="forgetTips">{{ t("Password.forget") }}</p>
            <van-button round type="primary" size="large" color="#617CF0" @click="initSubmit">{{ t("Login") }}</van-button>
        </div>
        <div class="go-cloud" @click="goToCloud">
            <span>云端管理</span>
            <svg-icon class="ic_arrow" icon-class="ic_arrow"></svg-icon>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { Field } from "vant"
import { useRouter } from "vue-router"
const { t } = useI18n()
const router = useRouter()
const passwordType = ref("password")
const passwordEye = ref("eye-o")

const inputTypeSwitch = () => {
    if (passwordType.value == "password") {
        passwordType.value = "text"
        passwordEye.value = "closed-eye"
    } else {
        passwordType.value = "password"
        passwordEye.value = "eye-o"
    }
}

const forgetTips = () => {

}

const goToCloud = () => {
    router.push({
        name: "GuideDownload"
    })
}
</script>

<style scoped>
    #login {
        height: 100vh;
        background-color: #fff;
    }
    .login-bg {
        display: flex;
        width: 375px;
        height: 295px;
        background: url("../../frame/assets/img/img_login_bg.png") no-repeat;
        background-size: 375px 295px;
        justify-content: center;
        align-items: center;
    }
    .ic_logo {
        width: 141px;
        height: 61px;
        margin-top: -34px;
    }
    .login-password {
        padding: 0 43px;
        margin-top: -27px;
    }
    .forget {
        font-size: 12px;
        color: #617CF0;
        text-align: right;
    }
    :deep(.van-button__text) {
        font-size: 18px;
    }
    .go-cloud {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;
        margin-top: 40px;
    }
    .go-cloud .ic_arrow {
        width: 12px;
        height: 12px;
    }
</style>