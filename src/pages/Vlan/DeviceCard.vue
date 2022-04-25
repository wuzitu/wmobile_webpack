<template>
    <div class="height100">
        <van-sticky :offset-top="38">
            <div class="deviceHeader">
                 <slot name="device-title"></slot>
                <Search class="searchStyle" v-model="value" left-icon="none" placeholder="请输入设备名称或型号" />
                <svg-icon icon-class="ic_search" class="iconRight"></svg-icon>
            </div>
        </van-sticky>
        <div class="dev-block">
            <Tabs v-model:active="active" swipeable color="#617CF0">
                <Tab v-for="(item, index) in cardMenu" :title="item.title" :key="'menu' + index">
                    <div class="deviceCardWrap" v-for="(card, index) in cardList" :key="'dev' + index">
                        <device-list :cardData="card" />
                    </div>
                </Tab>
            </Tabs>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { Search, ConfigProvider, Image as VanImage, Tab, Tabs, Sticky, Checkbox, Popover, CheckboxGroup } from "vant"
import DeviceList from "./DeviceList.vue"

const { t } = useI18n()

const returnData = () => {
    const data = {
        id: "4",
        ip: "1.2.2.1"
    }

    return data
}
defineExpose({
    returnData
})

const cardMenu = [
    {
        title: "全部"
    },
    {
        title: "网关"
    },
    {
        title: "AC"
    },
    {
        title: "交换机"
    },
    {
        title: "AP"
    }
]
const cardList = ref([
    {
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        model: "MSG330-W",
        sn: "218901A2WY8217E000T1"
    },
    {
        company: "H3C",
        decice: "AC",
        isOnline: "true",
        model: "MSG330-W",
        sn: "218901A2WY8217E000T2"
    },
    {
        company: "H3C",
        decice: "交换机",
        isOnline: "true",
        model: "MSG330-W",
        sn: "218901A2WY8217E000T3"
    },
    {
        company: "H3C",
        decice: "AP",
        isOnline: "true",
        model: "MSG330-W",
        sn: "218901A2WY8217E000T4"
    },
    {
        company: "H3C",
        decice: "AP",
        isOnline: "false",
        model: "MSG330-W",
        sn: "218901A2WY8217E000T5"
    },
    {
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        model: "MSG330-W",
        sn: "218901A2WY8217E000T6"
    },
    {
        company: "H3C",
        decice: "网关",
        isOnline: "false",
        model: "MSG330-W",
        sn: "218901A2WY8217E000T7"
    },
    {
        company: "H3C",
        decice: "交换机",
        isOnline: "false",
        model: "MSG330-W",
        sn: "218901A2WY8217E000T8"
    },
    {
        company: "H3C",
        decice: "交换机",
        isOnline: "true",
        model: "MSG330-W",
        sn: "218901A2WY8217E000T9"
    }
])
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

.dev-block {
    margin-bottom: 60px;
}

.searchStyle {
    flex: 1;
}

.iconRight {
    width: 14px;
    height: 14px;
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
    box-sizing: border-box;
    padding: 0 15px;
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
