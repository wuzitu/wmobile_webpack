<template>
    <div class="height100">
        <van-sticky :offset-top="40" z-index="1">
            <BoxTitle>
                <div class="deviceHeader">
                    <span>{{ RC('deviceTitle') }}</span>
                    <Search class="searchStyle" v-model="searchValue" left-icon="none"
                        :placeholder="RC('seacherTips')"
                        />
                    <div @click="onSearch">
                        <svg-icon icon-class="ic_search" class="iconRight"></svg-icon>
                    </div>
                </div>
            </BoxTitle>
            <Tabs v-model:active="active" swipeable color="#617CF0" @change="changeTabs">
                <Tab v-for="(item, index) in cardMenu" :title="RC(item.title)" :key="'menu' + index"></Tab>
            </Tabs>
        </van-sticky>
        <div class="cardContent">
            <div class="deviceCardWrap" v-for="card in cardList" :key="card">
                <Checkbox checked-color="#617CF0" class="singleCheck" v-model="card.isCheak"></Checkbox>
                <Cards
                    :title="card.company"
                    :online="true"
                    :type="card.isOnline == 'true' ?'online':''"
                    :device="card.decice"
                    rightIcon="ic_edit"
                    @handleCard="systemCard"
                    @cardEditTitle="editCardFun">
                    <CardLine>
                        <cardItemVue label="型号：">{{}}{{card.model}}</cardItemVue>
                        <cardItemVue label="版本：">{{}}{{card.model}}</cardItemVue>
                    </CardLine>
                </Cards>
            </div>
        </div>
        <div class="bottomWrap">
            <div class="deviceBottom van-hairline--top">
                <Checkbox v-model="checkAll" checked-color="#617CF0" @click="checkAllCard" class="deviceCheck">
                    {{ RC('selectAll')}}
                </Checkbox>
                <Popover v-model:show="showPopover" placement="top-end" theme="dark" :actions="actions"
                    @select="onSelect">
                    <template #reference>
                        <div class="batch">
                            <svg-icon icon-class="ic_operation" class="iconRight"></svg-icon>
                            <span>{{ RC('bthBtn') }}</span>
                        </div>
                    </template>
                </Popover>
            </div>
        </div>
        <UpgradePopUpVue v-model:upgradeShow="upgradeShows" :isNeedBack="true" @confirm="confirmUpgrade"/>
    </div>
</template>

<script setup>
import { ref, watch } from "vue"
import BoxTitle from "@/components/BoxTitle.vue"
import { Search, Tab, Dialog, Tabs, Checkbox, Popover, Sticky } from "vant"
import Cards from "@/components/Card/ShowCard.vue"
import cardItemVue from "@/components/Card/CardItem.vue"
import CardLine from "@/components/Card/CardLine.vue"
import UpgradePopUpVue from "@/components/UpgradePopUp.vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import { json } from "body-parser"
const router = useRouter()
const { t } = useI18n()
let RC = (str) => {
    return t("SystemMenu.devicePage." + str)
}

let upgradeShows = ref(false)
const upgradeCheck = ref("1")
const cardMenu = ref([
    {
        title: "All"
    }, {
        title: "AC"
    }, {
        title: "Switch"
    }, {
        title: "AP"
    }
])
// smartMc/DeviceList
// {"method":"smartmc_topo_device","session_key":"session_key","lang":"cn"}: 
const showPopover = ref(false)
const checkAll = ref(false)
const actions = ref([
    {
        text: RC("bthColse"),
        type: "Colse"
    }, {
        text: RC("bthUpgrade"),
        type: "Upgrade"
    }, {
        text: RC("bthReboot"),
        type: "Reboot"
    }, {
        text: RC("bthSetF"),
        type: "SetF"
    }, {
        text: RC("bthDiagnosis"),
        type: "Diagnosis"
    },
])
const cardList = ref([
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机",
        isOnline: "false",
        model: "MSG330-W",
        softver: "r3405",
        isUpGrade: "false"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "AP",
        isOnline: "false",
        model: "wap662",
        softver: "r3405",
        isUpGrade: "true"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        model: "MSG330-W",
        softver: "r3405",
        isUpGrade: "false"
    }

])
const searchValue = ref("")
const active = ref()
const checkList = ref([])
const editCardFun = (v) => {
    console.log(v)
}
//切换tab函数
const changeTabs = (v) => {
    console.log(v)
}
const checkAllCard = () => {
    cardList.value.map((item) => {
        item.isCheak = checkAll.value
    })
}
const onSelect = (v) => {
    let cont = checkList.value.length
    let type = v
    if (cont == 0 || cont == undefined) {
        Dialog.alert({
            title: RC("bth" + type.type),
            message: RC("noChooseContent"),
            confirmButtonColor: "#617CF0",
            confirmButtonText: t("Apply")
        }).then(() => { })
        return
    } else {
        batchDevice(checkList.value, type)
    }
}
const batchDevice = (list, type) => {
    let titleText = RC("bth" + type.type)
    let context = RC("rfHead") + list.length + RC("bth" + type.type + "Text")
    console.log(titleText,context)
    switch (type.type) {
        case "Upgrade":
            upgradeShows.value = true
            break
        case "Diagnosis":
            break
        default:
            // Dialog.confirm({
            //     title: titleText,
            //     message: context,
            //     confirmButtonColor: "#617CF0",
            //     confirmButtonText: t("Apply"),
            //     cancelButtonText: t("Cancel")
            // }).then(() => {

            // })
            break
    }
}
//升级处理
const confirmUpgrade = (val) => {
    console.log(val.upgradeCheck)
}

const systemCard = (data) => {
    console.log(data.title)
    const devData = {
        "decice": "AC",
        "devName": "网关",
        "devType": "网关",
        "onlinetime": "123456789201215",
        "ipaddress":"1.1.1.1",
        "devStatus":2,
        "macaddress":"0000-0000-00001",
        "devSN":"123456789201215",
        "devVersion":"R2401",
        "isSupportPoe":true,
        "isSupportWan":true
    }
    router.push({ name:"DevInfo",query:{ "content":JSON.stringify(data) } })
}

watch(() => cardList, (newVal) => {
    let checklen = 0
    checkList.value = []
    newVal.value.map((item) => {
        if (item.isCheak) {
            checkList.value.push(item)
            checklen++
        }
    })
    checklen == newVal.value.length ? checkAll.value = true : checkAll.value = false
}, { deep: true }
)
// watch(() => router, (newVal) => {
//     let checklen = 0
//     checkList.value = []
//     newVal.value.map((item) => {
//         if (item.isCheak) {
//             checkList.value.push(item)
//             checklen++
//         }
//     })
//     checklen == newVal.value.length ? checkAll.value = true : checkAll.value = false
// }, { deep: true }
// )
const onSearch = () => {
    let keyword = searchValue.value
    let searchData = []
    cardList.value.map(( v , k ) => {
        let jsonData = JSON.stringify(v)
        if(jsonData.indexOf(keyword) > -1) {
            searchData.push(v)
        }
    })
    // console.log(searchData)
    cardList.value = searchData
}
</script>

<style scoped>

.deviceHeader {
    padding-right: 10px;
    background: #ffffff;
    border-bottom: 1px solid #f2f3f5;
    position: relative;
    display: flex;
    align-items: center;
}

.deviceHeader span {
    padding-left: 15px;
    color: #333333;
    font-family: "Microsoft YaHei";
}

.deviceHeader::before {
    content: "";
    display: block;
    position: absolute;
    width: 4px;
    height: 12px;
    top: 50%;
    transform: translate(0, -50%);
    background: #617cf0;
}

.stick {
    height: 90px;
    position: fixed;
    top: 45px;
    width: 100%;
    z-index: 1;
    background: #ffffff;
}

.cardContent {
    /* margin-top: 95px; */
}

.searchStyle {
    flex: 1;
}

.iconRight {
    width: 14px !important;
    height: 14px !important;
}

.deviceCardWrap {
    margin-top: 8px;
    display: flex;
    padding: 0 15px;

}

.singleCheck {
    margin-right: 15px;
}

.deviceBottom {
    display: flex;
    background: #ffffff;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
    box-sizing: border-box;
    padding: 0 15px;
    color: #666666;
}

.bottomWrap {
    position: relative;
    width: 100%;
    height: 60px;
}

.batch {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 40px;
    width: 80px;
    padding: 0 10px;
}


</style>
