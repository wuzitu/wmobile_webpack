<template>
    <div class="height100">
        <div class="stick van-hairline--bottom">
            <BoxTitle>
                <div class="deviceHeader">
                    <span>{{ RC('deviceTitle') }}</span>
                    <Search class="searchStyle" v-model="searchValue" left-icon="none"
                        :placeholder="RC('seacherTips')" />
                    <div>
                        <svg-icon icon-class="ic_search" class="iconRight"></svg-icon>
                    </div>
                </div>
            </BoxTitle>
            <Tabs v-model:active="active" swipeable color="#617CF0" @change="changeTabs">
                <Tab v-for="(item, index) in cardMenu" :title="RC(item.title)" :key="'menu' + index"></Tab>
            </Tabs>
        </div>
        <div class="cardContent">
            <div class="deviceCardWrap" v-for="card in cardList" :key="card">
                <Checkbox checked-color="#617CF0" class="singleCheck" v-model="card.isCheak"></Checkbox>
                <device-card :cardData="card" @cardEdit="editCardFun" />
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
        <Dialogs v-model:show="upgradeShow" :title="RC('bthUpgrade')" :confirmButtonText="t('Apply')"
            :cancelButtonText="t('Cancel')" confirmButtonColor="#617CF0" show-cancel-button @confirm="confirmUpgrade">
            <div class="upgradeWraps">
                <div>
                    <RadioGroup v-model="upgradeCheck" checked-color="#617CF0" direction="horizontal">
                        <Radio name="1">在线升级</Radio>
                        <p class="upgradeTipsStyle">自动从云简平台获取推荐版本升级。</p>
                        <Radio name="2">本地升级</Radio>
                        <p class="upgradeTipsStyle">从本地文件服务器获取版本升级。</p>
                    </RadioGroup>
                </div>
                <p class="confrimTips">{{RC("rfHead") + checkList.length + RC("bthUpgradeText")}}</p>
            </div>
        </Dialogs>
    </div>
</template>

<script setup>
import { ref, watch } from "vue"
import BoxTitle from "@/components/BoxTitle.vue"
import { Search, Tab, Dialog, Tabs, Checkbox, Popover, RadioGroup, Radio } from "vant"
import DeviceCard from "./DeviceCard.vue"
import { useI18n } from "vue-i18n"
const Dialogs = Dialog.Component
const { t } = useI18n()
let RC = (str) => {
    return t("SystemMenu.devicePage." + str)
}
let upgradeShow = ref(false)
const upgradeCheck = ref("1")
const cardMenu = ref([
    {
        title: "All"
    }, {
        title: "GW"
    }, {
        title: "AC"
    }, {
        title: "Switch"
    }, {
        title: "AP"
    }
])
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

    }, {
        isCheak: false,
        company: "H3C",
        decice: "AP",
        isOnline: "false",
        model: "wap662",
        softver: "r3405",
        isUpGrade: "true"

    }, {
        isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        model: "MSG330-W",
        softver: "r3405",
        isUpGrade: "false"

    }, {
        isCheak: false,
        company: "H3C",
        decice: "AC",
        isOnline: "true",
        model: "MSG330-W",
        softver: "r3405",
        isUpGrade: "false"

    }, {
        isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        model: "MSG330-W",
        softver: "r3405",
        isUpGrade: "false"

    }, {
        isCheak: false,
        company: "H3C",
        decice: "交换机",
        isOnline: "true",
        model: "MSG330-W",
        softver: "r3405",
        isUpGrade: "false"

    }, {
        isCheak: false,
        company: "H3C",
        decice: "AP",
        isOnline: "false",
        model: "wap662",
        softver: "r3405",
        isUpGrade: "true"

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
        upgradeShow.value = true
        break
    case "Diagnosis":
        break
    default:
        Dialog.confirm({
            title: titleText,
            message: context,
            confirmButtonColor: "#617CF0",
            confirmButtonText: t("Apply"),
            cancelButtonText: t("Cancel")
        }).then(() => { 
            
        })
        break
    }
}
//升级处理
const confirmUpgrade = () => {

}
watch(() => cardList, (newVal) => {
    let checklen = 0
    checkList.value = []
    newVal.value.map((item, index) => {
        if (item.isCheak) {
            checkList.value.push(item)
            checklen++
        }
    })
    checklen == newVal.value.length ? checkAll.value = true : checkAll.value = false
}, { deep: true }
)
</script>

<style scoped>
>>>.van-search__field {
    padding: 0 !important;
}

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
    margin-top: 95px;
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
.upgradeWraps{
    padding: 0 15px;
}
.upgradeTipsStyle{
    margin: 5px 0;
    margin-left: 30px;
    color: #666666;
}
.confrimTips{
    text-align: center;
}
</style>
