<template>
    <div id="login">
        <div class="login-bg">
            <svg-icon class="ic_logo" icon-class="ic_logo"></svg-icon>
        </div>
        <div class="login-password">
            <password-field
                :password="password"
                :placeholder="t('Password.placeholder1')"
                :left-icon="true"
                @changePassword="userPassword"
            ></password-field>
            <p class="forget" @click="forgetTips">{{ t("Password.forget") }}</p>
            <van-button round type="primary" size="large" color="#617CF0" @click="initSubmit">{{ t("Login") }}</van-button>
        </div>
        <div class="go-cloud" @click="goToCloud">
            <span>{{ t("LoginCloud") }}</span>
            <svg-icon class="ic_arrow" icon-class="ic_arrow"></svg-icon>
        </div>
        <dialogs
            v-model:show="show"
            :title="t('Tips')"
            show-cancel-button
            :cancel-button-text="t('Cancel')"
            :confirm-button-text="t('Apply')"
            @confirm="goToLogin"
        >
            <div class="forget-text">
                <p class="forget-tips">{{ t("Tips") }}: <span>设置提示</span></p>
                <p>{{ t("Password.LoginForget") }}</p>
            </div>
        </dialogs>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import { Dialog } from "vant"
import PasswordField from "../../components/PasswordField"
const { t } = useI18n()
const router = useRouter()
const dialogs = Dialog.Component
const password = ref("")
const show = ref(false)

const userPassword = (e) => {
    password.value = e
}

const forgetTips = () => {
    show.value = true
}

const goToCloud = () => {
    router.push({
        name: "GuideDownload"
    })
}

const initSubmit = () => {
    router.push({
        name: "DashBoard"
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

    .forget-text {
        padding: 0 12px;
    }
    .forget-tips {
        font-weight: bold;
    }
    .forget-tips span {
        color: #ee0a24;
    }
    :deep(.van-dialog__header) {
        padding-top: 5px;
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