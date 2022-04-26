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
                    <div class="deviceCardWrap" v-for="(cardItem, index) in cardList" :key="'dev' + index">
                         <div class="device-list" @click="selectPort(cardItem.sn)">
                            <div class="device-list-title">
                                <span>
                                    <span class="device-name">{{ cardItem.company }}</span>
                                    <span class="device-model" :class="cardItem.isOnline == 'true' ? 'isOnline' : 'isOffline'">{{ cardItem.decice }}</span>
                                </span>
                                <div>
                                    <div class="van-badge van-badge--top-right">9</div>
                                    <svg-icon icon-class="ic_port_s" class="iconStyle"></svg-icon>
                                </div>
                            </div>
                            <p><span>{{ t("Vlan.model") }}：{{ cardItem.model }}</span></p>
                            <p><span>{{ t("Vlan.sn") }}：{{ cardItem.sn }}</span></p>
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
         <van-popup
            v-model:show="show"
            round
            closeable
            position="bottom"
            :style="{ height: '80%', background: '#f7f7f7'}"
        >
            <div class="port-select">
                <span class="port-select-title">端口选择</span>
            </div>
            <van-divider :style="{ borderColor: '#D8D8D8' }"/>
            <div>
                <box-title titleName="设备信息"></box-title>
                <div class="DetailsWrap">
                    <div class="row">
                        <span :style="rowStyle">{{ t("DevInfo.name") }} : {{ oDevInfo.name }}</span>
                    </div>
                    <div class="row">
                        <span :style="rowStyle">{{ t("DevInfo.type") }} : {{ oDevInfo.type }}</span>
                    </div>
                    <div class="row">
                        <span :style="rowStyle">{{ t("DevInfo.model") }} : {{ oDevInfo.model }}</span>
                    </div>
                    <div class="row">
                    <span :style="rowStyle">{{ t("DevInfo.sn") }} : {{ oDevInfo.sn }}</span>
                    </div>
                </div>
            </div>
            <div class="port-select-info">
                <box-title titleName="端口选择"></box-title>
                <!-- <div>端口示意图</div> -->
                <div class="port-select-checkbox">
                    <van-checkbox-group v-model="checked" direction="horizontal" ref="checkboxGroup">
                        <van-checkbox name="1" icon-size="14px" checked-color="#617CF0">GE1/0/1</van-checkbox>
                        <van-checkbox name="2" icon-size="14px" checked-color="#617CF0">GE1/0/2</van-checkbox>
                        <van-checkbox name="3" icon-size="14px" checked-color="#617CF0">GE1/0/3</van-checkbox>
                        <van-checkbox name="4" icon-size="14px" checked-color="#617CF0">GE1/0/4</van-checkbox>
                        <van-checkbox name="5" icon-size="14px" checked-color="#617CF0">GE1/0/5</van-checkbox>
                        <van-checkbox name="6" icon-size="14px" checked-color="#617CF0">GE1/0/6</van-checkbox>
                        <van-checkbox name="7" icon-size="14px" checked-color="#617CF0">GE1/0/7</van-checkbox>
                        <van-checkbox name="8" icon-size="14px" checked-color="#617CF0">GE1/0/8</van-checkbox>
                        <van-checkbox name="9" icon-size="14px" checked-color="#617CF0" >GE1/0/9</van-checkbox>
                        <van-checkbox name="10" icon-size="14px" checked-color="#617CF0">GE1/0/10</van-checkbox>
                        <van-checkbox name="11" icon-size="14px" checked-color="#617CF0">GE1/0/11</van-checkbox>
                        <van-checkbox name="12" icon-size="14px" checked-color="#617CF0">GE1/0/12</van-checkbox>
                    </van-checkbox-group>
                </div>
                <van-divider :style="{ borderColor: '#D8D8D8' }"/>
                <div class="port-select-btn">
                    <van-checkbox name="port" v-model="allchecked" icon-size="14px" checked-color="#617CF0" @click="checkAll">全选</van-checkbox>
                    <span class="port-selected">已选择2个端口</span>
                    <van-button round type="primary">确认</van-button>
                </div>
            </div>
       </van-popup>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle"
import { Search, ConfigProvider, Image as VanImage, Tab, Tabs, Sticky, Checkbox, Popover, CheckboxGroup } from "vant"
const { t } = useI18n()
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
const show = ref(false)
const selectPort = (sn) => {
    console.log("序列号：" + sn)
    show.value = true
}
const oDevInfo = ref({
    "name":"H3C",
    "type":"网关",
    "model":"MSG360",
    "sn":"123456789201225"
})
const allchecked = ref(false)
const checked = ref([])
const checkboxGroup = ref(null)
const checkAll = () => {
    if(allchecked.value){
        checkboxGroup.value.toggleAll(true)
    }else{
        checkboxGroup.value.toggleAll()
    }
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
/* Device List */
.iconStyle {
    width: 15px;
    height: 15px;
}

.device-list {
    background: #ffffff;
    padding: 10px;
    flex: 1;
}

.device-list-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

p {
    margin: 5px 0;
    padding: 0;
    color: #666666;
}

p span {
    margin: 0 5px;
}

p span:nth-child(1) {
    margin-left: 0;
}

.device-name {
    color: #333333;
}

.device-model {
    padding: 3px 10px;
    font-size: 12px;
    color: #ffffff;
    border-radius: 3px;
    margin-left: 8px;
    display: inline-block;
    transform: scale(0.9);
}

.isOnline {
    background: #21b480;
}

.isOffline {
    background: #999999;
}

.lineSpan::before {
    content: "|";
    position: relative;
    left: -5px;
    color: #999999;
}
/* Port Select */
.port-select{
    width: 375px;
    height: 44px;
    background: #FFFFFF;
    border-radius: 12px 12px 0px 0px;
    text-align: center;
    line-height: 44px;
}
.port-select-title{
    width: 59px;
    height: 15px;
    font-size: 15px;
    font-family: PingFang SC;
    color: #333333;
}
.DetailsWrap{
    background: #FFFFFF;
    display: block;
    width: 375px;
    padding:10px 0px 10px 15px;
}
.DetailsWrap .row {
    display: block;
    line-height: 24px;
    vertical-align: center;
    text-align: start;
    overflow: auto;
}
.van-popup__close-icon--top-right {
    margin-top: -5px;
}
.van-divider{
    border-style: none;
    border-bottom: 1px solid #d8d8d8;
    margin: 0;
}
.port-select-info{
    margin-top: 10px;
    background: #FFFFFF;
}
.port-select-checkbox{
    margin: 15px auto;
    margin-left: 15px;
}
.port-select-checkbox .van-checkbox{
    padding-right: 20px;
    width: 76px;
    height: 30px;
}
.port-select-btn .van-checkbox{
    padding-right: 20px;
    width: 76px;
    height: 30px;
    margin-top: 6px;
}
.port-select-btn{
    width: 100%;
    background: #FFFFFF;
    margin-left: 15px;
    display: inline-flex;
    padding-top: 20px;
    padding-bottom: 20px;
}
.port-select-btn .van-button--primary{
    width: 120px;
    height: 40px;
    background: #617CF0;
    border-radius: 20px;
    margin-left: 40px;
}
.port-select-btn .port-selected{
    font-size: 13px;
    font-family: PingFang SC;
    color: #666666;
    line-height: 32px;
    margin-top: 6px;
}
</style>
