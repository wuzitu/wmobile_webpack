<template>
    <div class="ApListWrap">
        <van-collapse v-model="activeNames" class="apradiolist">
            <van-collapse-item title="" v-for="item in allData" :key="item.radio">
                <template #title>
                    <div class="wifiTitle">
                        <!-- <svg-icon icon-class="ic_wifi" class="ic_wifi"></svg-icon> -->
                        <span>Radio{{ item.radio }}({{ item.status }})</span>
                    </div>
                </template>
                <div class="innercontent">
                    <van-cell v-for="(item, index) in menu" center :key="item">
                        <template #right-icon>
                            <Switch v-model="checked" @change="autoManageChange" size="24" />
                        </template>
                        <van-cell>IP地址：{{ item.channel }}</van-cell>
                        <van-cell>IP地址：{{ item.bandwidth }}</van-cell>
                    </van-cell>
                </div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script setup>
import { ref, defineProps } from "vue"
// import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Collapse, CollapseItem, Toast, Switch } from "vant"

const { t } = useI18n()
const checked = ref(true)
const activeNames = ref(["1"])
const autoManageChange = (value) => {
    const title = value ? "打开成功" : "关闭成功"
    Toast.success(title)
    console.log(value)
}

let allData = [
    { ApName: "wtu630", radio: "1", status: "up", type: "2.4G", channel: "56", bandwidth: "80", power: "50%" },
    { ApName: "wtu630", radio: "2", status: "down", type: "5G", channel: "5", bandwidth: "160", power: "10%" },
    { ApName: "wtu630", radio: "3", status: "up", type: "2.4G", channel: "79", bandwidth: "80", power: "50%" }
]

const menu = ref({
    status: "状态",
    type: "类型",
    channel: "信道",
    bandwidth: "带宽",
    power: "功率"
})
// const router = useRouter()
// console.log(router.params)
// const propsData = defineProps({ apName: String })
</script>

<style scoped>
.innercontent {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
