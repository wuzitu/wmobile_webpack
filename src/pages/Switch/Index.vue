<template>
    <div class="height100">
        <box-title :titleName="switchTitle"></box-title>
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
const switchTitle = t("Switch.title")
const all = t("Switch.all")
const online = t("Switch.online")
const offline = t("Switch.offline")
let allNum = ref(0)
let onlineNum = ref(0)
let offlineNum = ref(0)
let oData = {
    allNum: 3,
    onlineNum: 2,
    offlineNum: 2
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

const cardList = ref([
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机1",
        isOnline: "false",
        IPAddress: "1.1.1.1",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机2",
        isOnline: "false",
        IPAddress: "1.1.1.2",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机3",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机4",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机5",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机6",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机7",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机8",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机9",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机10",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机11",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机12",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机13",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机14",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机15",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机16",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机17",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机18",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机19",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机20",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机21",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机22",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机23",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机24",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机25",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机26",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机27",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机28",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机29",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机30",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机31",
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
