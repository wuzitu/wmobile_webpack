<template>
    <div class="ApListWrap">
        <van-collapse v-model="activeNames" class="apradiolist" accordion>
            <van-collapse-item title="" v-for="item in allData" :key="item.radio">
                <template #title>
                    <div class="wifiTitle">
                        <span>Radio{{ item.radio }}({{ item.status }})</span>
                    </div>
                </template>
                <div title="" v-for="menu in menuList" :key="menu">
                    <van-cell>
                        <template #title>
                            {{ menu.status }}
                        </template>
                        <template #right-icon>
                            <Switch v-model="checked" @change="autoManageChange" size="24" />
                        </template>
                    </van-cell>
                    <van-cell>
                        <template #title>
                            {{ menu.type }}
                        </template>
                        {{ item.type }}
                    </van-cell>

                    <van-cell is-link @click="showPopupchannel = true">
                        <template #title>
                            {{ menu.channel }}
                        </template>
                        <template #value>
                            {{ item.channel }}
                        </template>
                    </van-cell>

                    <popup v-model:show="showPopupchannel" position="bottom" :style="{ height: '50%' }">
                        <picker :columns="columnsChannel" @confirm="onConfirm" @cancel="onCancel" @change="onChange" :default-index="2" />
                    </popup>

                    <van-cell is-link @click="showPopuppower = true">
                        <template #title>
                            {{ menu.bandwidth }}
                        </template>
                        <template #value>
                            {{ item.bandwidth }}
                        </template>
                    </van-cell>
                    <popup v-model:show="showPopuppower" position="bottom" :style="{ height: '50%' }">
                        <picker :columns="columnsBandwidth" @confirm="onConfirm" @cancel="onCancel" @change="onChange" :default-index="2" />
                    </popup>

                    <van-row class="powerline">
                        <van-col span="4">
                            <p>{{ menu.power }}</p>
                        </van-col>
                        <van-col span="20">
                            <slider v-model="powervalue" @change="onPowerChange" :min="0" :max="100" :step="10" active-color="#486CF4">
                                <template #button>
                                    <div class="custom-button">{{ item.power }}%</div>
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
import { Cell, CellGroup, Collapse, CollapseItem, Toast, Switch, Popup, Picker, Slider } from "vant"
// import SelectPicker from "../../components/SelectPicker"

const { t } = useI18n()
const RC = (str) => {
    return t(str)
}
const checked = ref(true)
const activeNames = ref(["1"])
const autoManageChange = (value) => {
    const title = value ? "打开成功" : "关闭成功"
    Toast.success(title)
}

// selectPicker method

const showPopupchannel = ref(false)
const showPopuppower = ref(false)

const columnsChannel = ["11", "45", "56", "78", "96", "142"]
const columnsBandwidth = ["20M", "40M", "80M", "80+80M", "160M"]
const onChange = (value, index) => {
    Toast(`当前值: ${value}, 当前索引: ${index}`)
}
const onCancel = () => {
    show.value = false
}

const emit = defineEmits(["changeSelected"])
const onConfirm = (value) => {
    emit("changeSelected", value)
    show.value = false
}

let allData = [
    { ApName: "wtu630", radio: "1", status: "up", type: "2.4G", channel: "56", bandwidth: "80", power: "50" },
    { ApName: "wtu630", radio: "2", status: "down", type: "5G", channel: "5", bandwidth: "160", power: "10" },
    { ApName: "wtu630", radio: "3", status: "up", type: "2.4G", channel: "79", bandwidth: "80", power: "90" }
]

const menuList = ref([
    {
        status: "状态",
        type: "类型",
        channel: "信道",
        bandwidth: "频宽",
        power: "功率"
    }
])

const powervalue = ref(50)
const onPowerChange = (value) => Toast("当前值：" + value)

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
