<template>
    <div class="height100">
        <!-- <van-sticky :offset-top="38"> -->
        <div class="stick">
            <box-title :titleName="gatewayTitle"></box-title>
            <Tabs v-model:active="active" swipeable color="#617CF0" @click="changeTab(active)">
                <Tab v-for="(item, index) in cardMenu" :title="item.title" :key="'menu' + index"></Tab>
            </Tabs>
        </div>
        <div class="deviceCardWrap" v-for="(card, index) in cardList" :key="'haha' + index">
            <device-card :cardData="card" @cardEdit="editCardFun" />
        </div>
        <!-- </van-sticky> -->
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue"
import { useI18n } from "vue-i18n"
import { Search, ConfigProvider, Image as VanImage, Tab, Tabs, Sticky, Checkbox, Popover, CheckboxGroup } from "vant"
import DeviceCard from "@/pages/Switch/DeviceCard.vue"
import BoxTitle from "@/components/BoxTitle.vue"
const { t } = useI18n()
let active = ref(0)
const gatewayTitle = t("Gateway.title")
const all = t("Gateway.all")
const online = t("Gateway.online")
const offline = t("Gateway.offline")
const editCardFun = (arr) => {
    console.log(arr)
    //修改网关名称
}
const { proxy } = getCurrentInstance()
const $req = proxy.$req
let allList = reactive([])
let onlineList = reactive([])
let offLineList = reactive([])
const cardList = reactive([])
let cardMenu = reactive([])
const getConf = async () => {
    /*let oDeviceList = $req.getTableInstance("DeviceList")
    oDeviceList.addFilter({ Type: "SW" })
    let response = await $req.getAll([oDeviceList])
    allList = $req.getTableRows("DeviceList", response)
    for (let i = 0; i < allList.length; i++) {
        if (allList[i].Status == "1") {
            onlineList.push(allList[i])
        } else {
            offLineList.push(allList[i])
        }
    }*/

    allList = [
        {
            Id: "1",
            HostName: "H3C",
            decice: "网关",
            Status: 1,
            IpAddress: "1.1.1.1",
            StandTime: "20d:5h:10m"
        }
        // {
        //     Id: "2",
        //     HostName: "H3C",
        //     decice: "网关",
        //     Status: 1,
        //     IpAddress: "1.1.1.1",
        //     StandTime: "20d:5h:10m"
        // },
        // {
        //     Id: "3",
        //     HostName: "H3C",
        //     decice: "网关",
        //     Status: 2,
        //     IpAddress: "1.1.1.1",
        //     StandTime: "20d:5h:10m"
        // }
    ]
    onlineList = [
        {
            Id: "1",
            HostName: "H3C",
            decice: "网关",
            Status: 1,
            IpAddress: "1.1.1.1",
            StandTime: "20d:5h:10m"
        }
        // {
        //     Id: "2",
        //     HostName: "H3C",
        //     decice: "网关",
        //     Status: 1,
        //     IpAddress: "1.1.1.1",
        //     StandTime: "20d:5h:10m"
        // }
    ]
    // offLineList = [
    //     {
    //         Id: "3",
    //         HostName: "H3C",
    //         decice: "网关",
    //         Status: 2,
    //         IpAddress: "1.1.1.1",
    //         StandTime: "20d:5h:10m"
    //     }
    // ]
    let tempt1 = { title: all + allList.length }
    let tempt2 = { title: online + onlineList.length }
    let tempt3 = { title: offline + offLineList.length }
    cardMenu.push(tempt1, tempt2, tempt3)
    cardList.push(...allList)
}
getConf()

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
