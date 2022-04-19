<template>
    <password ref="initPassword"></password>
    <network ref="initNetwork"></network>
    <wireless ref="initWireless"></wireless>
    <div class="button-box">
        <van-button type="default" to="">{{ t("Previous") }}</van-button>
        <van-button type="primary" color="#617CF0" @click="initSubmit">{{ t("Complete") }}</van-button>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import Password from "./Password"
import Network from "./Network"
import Wireless from "./Wireless"
const { t } = useI18n()
const router = useRouter()

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

    goToLogin()
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