<template>
    <div class="height100">
        <van-sticky :offset-top="38">
            <div class="deviceHeader">
                <span>设备列表</span>
                <Search class="searchStyle" v-model="value" left-icon="none" placeholder="请输入设备名称或型号" />
                <svg-icon icon-class="ic_search" class="iconRight"></svg-icon>
            </div>
            <div>
                <Tabs v-model:active="active" swipeable color="#617CF0">
                    <Tab v-for="(item, index) in cardMenu" :title="item.title" :key="'menu' + index">
                        <div class="deviceCardWrap" v-for="(card, index) in cardList" :key="'haha' + index">
                            <Checkbox checked-color="#617CF0" class="singleCheck" v-model="card.isCheak"></Checkbox>
                            <device-card :cardData="card" />
                        </div>

                    </Tab>
                </Tabs>
            </div>
        </van-sticky>
        <div class="deviceBottom">
            <Checkbox v-model="checked" class="deviceCheck">全选</Checkbox>
            <Popover v-model:show="showPopover" placement="top-end" theme="dark" :actions="actions">
                <template #reference>
                    <div class="batch">
                        <svg-icon icon-class="ic_operation" class="iconRight"></svg-icon>
                        <span>批量操作</span>
                    </div>
                </template>
            </Popover>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search, ConfigProvider, Image as VanImage, Tab, Tabs, Sticky, Checkbox, Popover, CheckboxGroup } from "vant"
import DeviceCard from "./DeviceCard.vue"
const cardMenu = [
    {
        title: "全部"
    }, {
        title: "网关"
    }, {
        title: "AC"
    }, {
        title: "交换机"
    }, {
        title: "AP"
    }
]
const showPopover = ref(false);
const actions = [
    { text: '关闭自组网' },
    { text: '升级' },
    { text: '重启' },
    { text: '恢复出厂' },
    { text: '诊断文件' },
];
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

    }

])
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
