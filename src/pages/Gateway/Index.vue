<template>
    <div class="height100">
        <box-title :titleName="gatewayTitle"></box-title>
        <!-- <van-sticky :offset-top="38"> -->
        <div>
            <Tabs v-model:active="active" swipeable color="#617CF0">
                <Tab v-for="(item, index) in cardMenu" :title="item.title" :key="'menu' + index">
                    <div class="deviceCardWrap" v-for="(card, index) in cardList" :key="'haha' + index">
                        <!-- <Checkbox checked-color="#617CF0" class="singleCheck" v-model="card.isCheak"></Checkbox> -->
                        <device-card :cardData="card" />
                    </div>
                </Tab>
            </Tabs>
        </div>
        <!-- </van-sticky> -->
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { Search, ConfigProvider, Image as VanImage, Tab, Tabs, Sticky, Checkbox, Popover, CheckboxGroup } from "vant"
import DeviceCard from "@/pages/Switch/DeviceCard.vue"
import BoxTitle from "@/components/BoxTitle.vue"
const { t } = useI18n()
const gatewayTitle = t("Gateway.title")
const all = t("Gateway.all")
const online = t("Gateway.online")
const offline = t("Gateway.offline")
let allNum = ref(0)
let onlineNum = ref(0)
let offlineNum = ref(0)
let oData = {
    allNum: 4,
    onlineNum: 3,
    offlineNum: 1
}
allNum.value = oData.allNum
onlineNum.value = oData.onlineNum
offlineNum.value = oData.offlineNum
let cardMenu = [
    {
        title: all + allNum.value
    },
    {
        title: online + onlineNum.value
    },
    {
        title: offline + offlineNum.value
    }
]

let cardList = ref([
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "false",
        IPAddress: "1.1.1.1",
        linkTimes: "20d:5h:10m"
    },
    {
        // isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "false",
        IPAddress: "1.1.1.2",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "网关20",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    }
])
</script>

<style scoped>
.deviceCardWrap {
    margin-top: 8px;
    display: flex;
    padding: 0 15px;
}
</style>
