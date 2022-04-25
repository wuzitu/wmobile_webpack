<template>
    <password ref="initPassword"></password>
    <network ref="initNetwork"></network>
    <wireless ref="initWireless"></wireless>
    <div class="button-box">
        <van-button type="default" @click="goPrevious">{{ t("Previous") }}</van-button>
        <van-button type="primary" color="#617CF0" @click="initSubmit">{{ t("Complete") }}</van-button>
    </div>
    <dialogs
        v-model:show="show"
        show-cancel-button
        :cancel-button-text="t('Network.revise')"
        :confirm-button-text="t('Apply')"
        :message="t('Network.submitInit')"
        @confirm="goToLogin"
    ></dialogs>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Dialog } from "vant"
import Password from "./Password"
import Network from "./Network"
import Wireless from "./Wireless"
const { t } = useI18n()
const router = useRouter()
const dialogs = Dialog.Component
const show = ref(false)

const initPassword = ref()
const initNetwork = ref()
const initWireless = ref()
const initSubmit = () => {
    const passwordData = initPassword.value.returnData()
    const networkData = initNetwork.value.returnData()
    const wirelessData = initWireless.value.returnData()
    console.log(passwordData)
    console.log(networkData)
    console.log(wirelessData)

    show.value = true
}

const goPrevious = () => {
    router.push({
        name: "Login"
    })
}

const goToLogin = () => {
    router.push({
        name: "Login"
    })
}
</script>

<style scoped>
    .button-box {
        width: 100%;
        display: flex;
        flex: 2;
        position: fixed;
        bottom: 0;
    }
    .button-box button {
        flex: 1;
    }
</style>