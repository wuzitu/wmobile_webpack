<template>
    <div>
        <van-cell-group :title="RC('titleTips')">
            <BoxTitle :titleName="RC('placeTips')"></BoxTitle>
            <Field v-model="cloudData.acNum" :label="RC('ACNum')" readonly />
            <van-cell :title="RC('brach')" is-link :value="cloudData.branch" @click="chooseBranch"></van-cell>
            <Popup v-model:show="cloudData.show" position="bottom" :style="{ height: '30%' }" >
                <Picker
                    title="标题"
                    :columns="columns"
                    @confirm="onConfirm"
                    @cancel="onCancel"
                    @change="onChange"
                />
            </Popup>
             <Field v-model="cloudData.place" :label="RC('place')" :placeholder="RC('placeHolder')"/>
        </van-cell-group>
        <div class="deviceList">
            <BoxTitle :titleName="RC('deviceTitle')"></BoxTitle>
             <Tabs v-model:active="active" swipeable color="#617CF0" class="tabsBottomBorder">
                <Tab v-for="(item, index) in cardMenu" :title="RC(item.title)" :key="'menu' + index"></Tab>
            </Tabs>
            <div class="deviceCardWrap" v-for="card in cardList" :key="card">
                <div class="bottomBorder"></div>
                <div>
                    <span class="company">{{ card.company }}</span>
                    <span class="model" :class="card.isOnline == 'true' ? 'isRun' : 'noRun'">{{ card.decice }}</span>
                </div>
                <p class="spanTips">{{ RC('model') }}{{ '：' + card.model }}</p>
                <p class="spanTips">{{ RC('serialNumber') }}{{ '：' + card.softver }}</p>
            </div>
        </div>
        <BottomButtonVue @submit="onSubmit" />
    </div>
</template>
<script setup>
import BoxTitle from "@/components/BoxTitle.vue"
import BottomButtonVue from "@/pages/System/BottomButton.vue"
import { Field ,Popup ,Picker ,Toast ,Tab, Tabs } from "vant"
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
const router = useRouter()
const { t } = useI18n()
let RC = (str) => {
    return t("ConnectCloudNet.CloudLogin." + str)
}
const cloudData = ref({
    acNum:"账号001",
    branch:"分支001",
    show:false,
    place:""
})
const cardMenu = ref([
    {
        title: "all"
    }, {
        title: "gate"
    }, {
        title: "AC"
    }, {
        title: "switch"
    }, {
        title: "AP"
    }
])
const cardList = ref([
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机",
        isOnline: "false",
        model: "MSG330-W",
        softver: "219801A1BW817AE00610"

    }, {
        isCheak: false,
        company: "H3C",
        decice: "AP",
        isOnline: "false",
        model: "wap662",
        softver: "219801A1BW817AE00610"

    }, {
        isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        model: "MSG330-W",
        softver: "219801A1BW817AE00610"

    }, {
        isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        model: "MSG330-W",
        softver: "219801A1BW817AE00610"

    }, {
        isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        model: "MSG330-W",
        softver: "219801A1BW817AE00610"

    }, {
        isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        model: "MSG330-W",
        softver: "219801A1BW817AE00610"

    }, {
        isCheak: false,
        company: "H3C",
        decice: "AP",
        isOnline: "false",
        model: "wap662",
        softver: "219801A1BW817AE00610"

    }

])
const columns = ref(["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华"])
const onConfirm = (value, index) => {
    Toast(`当前值: ${value}, 当前索引: ${index}`)
}
const onChange = (value, index) => {
    Toast(`当前值: ${value}, 当前索引: ${index}`)
}
const onCancel = () => Toast("取消")

const chooseBranch = () => {
    cloudData.value.show = true

}

const onSubmit = () => {
    const toast = Toast.loading({
        duration: 0,
        forbidClick: true,
        message: "设备一键上云中，请稍后",
    })
    let second = 3
    const timer = setInterval(() => {
        second--
        if (!second) {
            clearInterval(timer)
            Toast.clear()
            router.push("/")
        }
    }, 1000)
}
</script>
<style scoped>
    .deviceList{
        margin-top: 10px;
        background: #ffffff;
    }
    .deviceCardWrap{
        padding: 15px;
        padding-top: 0;
    }
    .model {
        padding: 3px 10px;
        font-size: 12px;
        color: #ffffff;
        border-radius: 3px;
        margin-left: 8px;
        display: inline-block;
        transform: scale(0.9);
    }
    .company {
        color: #333333;
    }
    .isRun {
        background: #21B480;
    }

    .noRun {
        background: #999999;
    }
    .spanTips{
        margin: 0;
        font-size: 12px;
        color: #666666;
    }
    .bottomBorder{
        margin-bottom: 15px;
        width: 100%;
        height: 1px;
        background: #d8d8d8;
    }
    .deviceList :nth-child(3) .bottomBorder{
        background: none;
    }
    .tabsBottomBorder{
        border-bottom: 1px solid #d8d8d8;
    }

</style>