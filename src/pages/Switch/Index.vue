<template>
    <div class="height100">
        <!-- <van-sticky :offset-top="38"> -->
        <div class="stick">
            <box-title :titleName="switchTitle"></box-title>
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
const switchTitle = t("Switch.title")
const all = t("Switch.all")
const online = t("Switch.online")
const offline = t("Switch.offline")
const onSuccess = () => {}
const onFailed = () => {}
const editCardFun = (arr) => {
    //{cards:{Id:"",HostName:'',....},newName:""}
    //编码btoa() 解码atob()
    console.log(arr)
    let newName = arr.newName
    let TCId = arr.cards.Id
    //修改交换机名
    let oBase = $req.getTableInstance("Base")
    oBase.addRows({ HostName: newName })
    let sXml = $req.makeEditChannelXml("edit-config", [oBase], "merge")
    // console.log(sXml)
    // sXml = "<rpc message-id='101' xmlns='urn:ietf:params:xml:ns:netconf:base:1.0'  xmlns:web='urn:ietf:params:xml:ns:netconf:base:1.0'>" + sXml + "</rpc>" //原来
    // console.log(sXml)
    // var strBase64 = btoa(sXml) //编码
    console.log(sXml)
    let oEditChannel = $req.getTableInstance("EditChannel")
    oEditChannel.addRows({ TargetType: "single", TCId: TCId, Save: true, XmlRequest: sXml })
    $req.action([oEditChannel], { onSuccess: onSuccess, onFailed: onFailed })
}
const { proxy } = getCurrentInstance()
const $req = proxy.$req
let allList = reactive([])
let onlineList = reactive([])
let offLineList = reactive([])
const cardList = reactive([])
let cardMenu = reactive([])
const getConf = async () => {
    //获取交换机
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
            decice: "交换机",
            Status: 1,
            IpAddress: "1.1.1.1",
            StandTime: "20d:5h:10m"
        },
        {
            Id: "2",
            HostName: "H3C",
            decice: "交换机",
            Status: 1,
            IpAddress: "1.1.1.1",
            StandTime: "20d:5h:10m"
        },
        {
            Id: "3",
            HostName: "H3C",
            decice: "交换机",
            Status: 2,
            IpAddress: "1.1.1.1",
            StandTime: "20d:5h:10m"
        },
        {
            Id: "4",
            HostName: "H3C",
            decice: "交换机",
            Status: 2,
            IpAddress: "1.1.1.1",
            StandTime: "20d:5h:10m"
        }
    ]
    onlineList = [
        {
            Id: "1",
            HostName: "H3C",
            decice: "交换机",
            Status: 1,
            IpAddress: "1.1.1.1",
            StandTime: "20d:5h:10m"
        },
        {
            Id: "2",
            HostName: "H3C",
            decice: "交换机",
            Status: 1,
            IpAddress: "1.1.1.1",
            StandTime: "20d:5h:10m"
        }
    ]
    offLineList = [
        {
            Id: "3",
            HostName: "H3C",
            decice: "交换机",
            Status: 2,
            IpAddress: "1.1.1.1",
            StandTime: "20d:5h:10m"
        },
        {
            Id: "4",
            HostName: "H3C",
            decice: "交换机",
            Status: 2,
            IpAddress: "1.1.1.1",
            StandTime: "20d:5h:10m"
        }
    ]
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
