<template>
    <div>
        <p>卡片列表组件使用展示，相应点击事件返回参数可以在控制台查看</p>
        <p>1、系统列表展示组件</p>
        <div  v-for="card in data" :key="card" class="deviceCardWrap">
            <Cards
                :title="card.company"
                :online="true"
                :type="card.isOnline == 'true' ?'online':''"
                :device="card.decice"
                rightIcon="ic_edit"
                @handleCard="systemCard"
                @cardEditTitle="systemRight">
                <CardLine>
                    <cardItemVue label="型号：">{{card.model}}</cardItemVue>
                    <cardItemVue label="版本：">r100</cardItemVue>
                </CardLine>
            </Cards>
        </div>
        <p>1、历史 AP</p>
        <div  v-for="card in data" :key="card" class="historyAp">
            <Cards
                :title="card.company"
                :online="true"
                :type="card.isOnline == 'true' ?'online':''"
                :device="card.decice"
                @handleCard="systemCard"
                rightIcon="ic_arrow"
                rightIconPosition="middle">
                <CardLine>
                    <cardItemVue label="型号：">{{card.model}}</cardItemVue>
                    </CardLine>
                <CardLine>
                    <cardItemVue label="时间：">2022-03-15 16:00:00:00</cardItemVue>
                    <cardItemVue label="事件：">online</cardItemVue>
                    </CardLine>
            </Cards>
        </div>
        <p>历史 流量</p>
        <div  v-for="card in data" :key="card" class="historyAp">
            <Cards>
                <template #title>
                    <svg-icon icon-class="ic_time" class="iconleft"></svg-icon>
                    <span class="flow-time">时间：2022-04-23</span>
                </template>
                <CardLine>
                    <cardItemVue label="上行流量：">{{card.upFlow}}</cardItemVue>
                    <cardItemVue label="下行流量：">{{card.downFlow}}</cardItemVue>
                </CardLine>
            </Cards>
        </div>
        <p>设备 网关</p>
        <div  v-for="card in data" :key="card" class="deviceCardWrap">
            <Cards
                :title="card.company"
                :online="true"
                :type="card.isOnline == 'true' ?'online':''"
                :device="card.decice"
                rightIcon="ic_edit"
                @handleCard="systemCard"
                @cardEditTitle="systemRight">
                <CardLine>
                    <cardItemVue label="IP：">{{card.IP}}</cardItemVue>
                    <cardItemVue label="连接时长：">{{card.connectTime}}</cardItemVue>
                </CardLine>
            </Cards>
        </div>
        <p>网络 wifi</p>
        <div  v-for="card in data" :key="card" class="deviceCardWrap">
            <Cards
                rightIcon="ic_deletewifi"
                @IconRightClick="systemRight">
                 <template #title>
                    <span class="wifi-name">WI-FI名称: public</span>
                </template>
                <CardLine>
                    <cardItemVue>备注：员工WIFI</cardItemVue>
                </CardLine>
                <CardLine>
                    <cardItemVue>密码：无</cardItemVue>
                    <cardItemVue>VLAN ID：有</cardItemVue>
                </CardLine>
            </Cards>
        </div>
    </div>
</template>

<script setup>
import Cards from "@/components/Card/ShowCard.vue"
import cardItemVue from "@/components/Card/CardItem.vue"
import CardLine from "@/components/Card/CardLine.vue"
const data = [
    {
        isCheak: false,
        company: "H3C",
        decice: "交换机",
        isOnline: "false",
        model: "MSG330-W",
        softver: "r3405",
        isUpGrade: "false",
        IP:"10.40.92.12",
        Time:"2022-03-15",
        upFlow:"564M",
        downFlow:"548M",
        connectTime:"20D:50H:10m"
    },
    {
        isCheak: false,
        company: "H3C",
        decice: "网关",
        isOnline: "true",
        model: "MSG330-W",
        softver: "r3405",
        isUpGrade: "false",
        IP:"10.40.92.12",
        Time:"2022-03-15",
        upFlow:"564M",
        downFlow:"565M",
        connectTime:"20D:50H:10m"
    }]

const systemCard = (data) => {
    console.log("左侧卡片点击",data)
}

const systemRight = (data) => {
    console.log("右侧icon点击",data)
}
</script>
<style scoped>
.deviceCardWrap {
    margin-top: 8px;
    display: flex;
    padding: 0 15px;

}

.historyAp{
    border-bottom: 1px solid #D8D8D8;
    padding: 0px 10px;
    background: #ffffff;
    /* margin-top: 11px; */
}

.iconleft{
    width: 16px;
    height: 16px;
}

.flow-time {
    display: inline-block;
    color: #333333;
    margin-left: 1.86667vw;
}
.wifi-name {
    color: #333333;
}
</style>