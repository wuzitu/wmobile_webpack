<template>
    <div class="ApListWrap">
        <van-collapse v-model="activeNames" class="apradiolist" accordion>
            <van-collapse-item title="" v-for="(item, index) in allData" :key="index" :name="item.radio">
                <template #title>
                    <div class="wifiTitle">
                        <span>Radio{{ item.radio }}</span>
                    </div>
                </template>

                <div title="">
                    <van-cell>
                        <template #title>{{ menuList.status }}</template>
                        <template #right-icon>
                            <Switch
                                :model-value="statusMap[item.status]"
                                @update:model-value="
                                    (newValue) => {
                                        statusChange(newValue, item)
                                    }
                                "
                                size="24"
                            />
                        </template>
                    </van-cell>

                    <van-cell>
                        <template #title>
                            {{ menuList.type }}
                        </template>
                        {{ item.type }}
                    </van-cell>

                    <van-cell is-link @click="showPopupchannel = true">
                        <template #title>
                            {{ menuList.CfgChannel }}
                        </template>
                        <template #value>
                            {{ item.CfgChannel }}
                        </template>
                    </van-cell>

                    <popup v-model:show="showPopupchannel" position="bottom" :style="{ height: '50%' }">
                        <picker :columns="columnsChannel" @confirm="onChannelConfirm" @cancel="onChannelCancel" @change="onChange" :default-index="columnsChannel.indexOf(item.CfgChannel)" />
                    </popup>

                    <van-cell is-link @click="showPopupBandwidth = true">
                        <template #title>
                            {{ menuList.bandwidth }}
                        </template>
                        <template #value>
                            {{ bandwidthMap[item.bandwidth] }}
                        </template>
                    </van-cell>

                    <popup v-model:show="showPopupBandwidth" position="bottom" :style="{ height: '50%' }">
                        <picker :columns="columnsBandwidth" @confirm="onBandWidthConfirm" @cancel="onBandWidthCancel" @change="onChange" :default-index="columnsBandwidth.indexOf(bandwidthMap[item.bandwidth])" />
                    </popup>

                    <van-row class="powerline">
                        <van-col span="4">
                            <p>{{ menuList.power }}</p>
                        </van-col>
                        <van-col span="20">
                            <slider
                                v-model="item.power"
                                @change="
                                    (value) => {
                                        onPowerChange(value, item)
                                    }
                                "
                                :min="0"
                                :max="10"
                                :step="1"
                                active-color="#486CF4"
                            >
                                <template #button>
                                    <div class="custom-button">{{ item.power }}0%</div>
                                </template>
                            </slider>
                        </van-col>
                    </van-row>
                </div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script setup>
import { ref, defineProps } from "vue"
// import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Cell, CellGroup, Collapse, CollapseItem, Toast, Switch, Popup, Picker, Slider, Dialog, GridItem } from "vant"
// import SelectPicker from "../../components/SelectPicker"

const { t } = useI18n()

const show = ref(false)
// const RC = (str) => {
//     return t(str)
// }

let allData = ref([
    { ApName: "wtu630", radio: "1", status: "1", type: "2.4G", CfgChannel: "56", bandwidth: "1", power: "5" },
    { ApName: "wtu630", radio: "2", status: "0", type: "5G", CfgChannel: "5", bandwidth: "2", power: "1" },
    { ApName: "wtu630", radio: "3", status: "1", type: "2.4G", CfgChannel: "79", bandwidth: "3", power: "9" }
])

const statusMap = { "1": true, "0": false }
const statusMapRevert = { true: "1", false: "0" }

const menuList = ref({
    status: "状态",
    type: "类型",
    CfgChannel: "信道",
    bandwidth: "频宽",
    power: "功率"
})

const activeNames = ref(["1"])
const statusChange = (newValue, item) => {
    console.log(newValue)
    Dialog.confirm({
        title: t("CONFIRM_WINDOW"),
        message: t("DevInfo.IfChange")
    }).then(() => {
        item.status = statusMapRevert[newValue]
        Toast(t("SET_SUCCESS"))
    })
}

// selectPicker method

const showPopupchannel = ref(false)
const showPopupBandwidth = ref(false)
// const showPopuppower = ref(false)

const columnsChannel = ["5", "11", "45", "56", "79", "96", "142"]
const columnsBandwidth = ["20M", "40M", "80M", "160M", "80M+80M", "5M", "10M"]

const bandwidthMap = { "1": "20M", "2": "40M", "3": "80M", "4": "160M", "5": "80M+80M", "17": "5M", "18": "10M" }
const onChange = (value, index) => {
    Toast(`当前值: ${value}, 当前索引: ${index}`)
}

const onChannelCancel = (value) => {
    showPopupchannel.value = false
}
const onBandWidthCancel = (value) => {
    showPopupBandwidth.value = false
}
// const emit = defineEmits(["changeSelected"])
const onChannelConfirm = (value) => {
    showPopupchannel.value = false
}
const onBandWidthConfirm = (value) => {
    // 下发value, 关闭窗口，get返回值，自动就更新了视图。
    showPopupBandwidth.value = false
}

const onPowerChange = (value, item) => {
    console.log(value)
    console.log(item)
    setTimeout(() => {
        console.log("set start")
        item.power = value
        if (value == 0) {
            Toast(t("DevInfo.powerset") + "0")
        } else {
            Toast(t("DevInfo.powerset") + `${value}0%`)
        }
    }, 1000)
}

// const router = useRouter()
// console.log(router.params)
// const propsData = defineProps({ apName: String })
</script>

<style scoped>
.innercontent {
    width: 375px;
}
.vanPhotoWrap {
    display: flex;
    align-items: center;
    color: #333333;
    font-size: 14px;
    font-weight: 500px;
    width: 166px;
}
.cellline {
    width: 375px;
    height: 34px;
    display: flex;
    padding: 0 15px;
    justify-content: space-around;
    align-items: center;
}
.custom-title {
    margin-right: 4px;
    vertical-align: middle;
}

.search-icon {
    font-size: 16px;
    line-height: inherit;
}
.van-switch--on {
    background: #617cf0;
}
.custom-button {
    width: 26px;
    color: #fff;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    background-color: #486cf4;
    border-radius: 100px;
}
.powerline {
    height: 34px;
    padding: 0 15px;
    justify-content: center;
    align-items: center;
    color: #333333;
    font-size: 14px;
}
</style>
