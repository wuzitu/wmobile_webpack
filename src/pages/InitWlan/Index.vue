<template>
    <div v-show="isInit">
        <password ref="initPassword" @submit="initSubmit"></password>
        <network ref="initNetwork"></network>
        <wireless ref="initWireless" :serviceTemplate="serTemInit"></wireless>
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
    </div>
</template>

<script>
import oRequest from "../../frame/utils/request"

export default {
    data() {
        return {
            isInit: false,
            serTemInit: {}
        }
    },
    async created() {
        let NCList = []
        NCList.push(oRequest.getTableInstance("ServiceTemplates"))
        NCList.push(oRequest.getTableInstance("ServiceSecurity"))
        const response = await oRequest.getAll(NCList)
        const serviceTemplates = oRequest.getTableRows("ServiceTemplates", response)
        const serviceSecurity = oRequest.getTableRows("ServiceSecurity", response)

        for (let i = 0; i < serviceTemplates.length; i++) {
            let template = serviceTemplates[i]

            if (template.SSID == "H3C_Autonet" || template.Name == "H3C_Autonet") {
                this.serTemInit = template

                for (let j = 0; j < serviceSecurity.length; j++) {
                    let security = serviceSecurity[j]
                    if (template.Name == security.Name) {
                        this.serTemInit.AkmMode = security.AkmMode
                        break
                    }
                }
                break
            }
        }

        this.isInit = true
    }
}
</script>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Dialog, Toast } from "vant"
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

    if (passwordData.length == 0) {
        Toast(t("Password.placeholder1"))
    } else {
        show.value = true
    }
    console.log(networkData)
    console.log(wirelessData)
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