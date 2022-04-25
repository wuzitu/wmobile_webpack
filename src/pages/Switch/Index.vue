<template>
    <div class="height100">
        <box-title :titleName="switchTitle"></box-title>
        <!-- <van-sticky :offset-top="38"> -->
        <div>
            <Tabs v-model:active="active" swipeable color="#617CF0" @click="changeTab(active)">
                <Tab v-for="(item, index) in cardMenu" :title="item.title" :key="'menu' + index">
                    <div class="deviceCardWrap" v-for="(card, index) in cardList" :key="'haha' + index">
                        <device-card :cardData="card" />
                    </div>
                </Tab>
            </Tabs>
        </div>
        <!-- </van-sticky> -->
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useI18n } from "vue-i18n"
import { Search, ConfigProvider, Image as VanImage, Tab, Tabs, Sticky, Checkbox, Popover, CheckboxGroup } from "vant"
import DeviceCard from "@/pages/Switch/DeviceCard.vue"
import BoxTitle from "@/components/BoxTitle.vue"
const { t } = useI18n()
let active = ref(0)
const switchTitle = t("Switch.title")
const all = t("Switch.all")
const online = t("Switch.online")
const offline = t("Switch.offline")
let allNum = ref(0)
let onlineNum = ref(0)
let offlineNum = ref(0)

let allList = [
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
        IPAddress: "1.1.1.4",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机5",
        isOnline: "false",
        IPAddress: "1.1.1.5",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机6",
        isOnline: "true",
        IPAddress: "1.1.1.6",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机7",
        isOnline: "true",
        IPAddress: "1.1.1.7",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机8",
        isOnline: "true",
        IPAddress: "1.1.1.8",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机9",
        isOnline: "false",
        IPAddress: "1.1.1.9",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机10",
        isOnline: "true",
        IPAddress: "1.1.1.10",
        linkTimes: "20d:5h:10m"
    }
]
let onlineList = [
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
        IPAddress: "1.1.1.4",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机6",
        isOnline: "true",
        IPAddress: "1.1.1.6",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机7",
        isOnline: "true",
        IPAddress: "1.1.1.7",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机8",
        isOnline: "true",
        IPAddress: "1.1.1.8",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机10",
        isOnline: "true",
        IPAddress: "1.1.1.10",
        linkTimes: "20d:5h:10m"
    }
]
let offLineList = [
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
        decice: "交换机5",
        isOnline: "false",
        IPAddress: "1.1.1.5",
        linkTimes: "20d:5h:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机9",
        isOnline: "false",
        IPAddress: "1.1.1.9",
        linkTimes: "20d:5h:10m"
    }
]
let cardMenu = [
    {
        title: all + allList.length
    },
    {
        title: online + onlineList.length
    },
    {
        title: offline + offLineList.length
    }
]

const cardList = reactive([])
cardList.push(...allList)
const changeTab = (activenum) => {
    if (activenum == 0) {
        cardList.length = 0
        cardList.push(...allList)
    } else if (activenum == 1) {
        cardList.length = 0
        cardList.push(...onlineList)
    } else {
        cardList.length = 0
        cardList.push(...offLineList)
    }
}
</script>

<style scoped>
.deviceCardWrap {
    margin-top: 8px;
    display: flex;
    padding: 0 15px;
}
</style>
