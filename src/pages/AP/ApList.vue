<template>
    <div class="cardWrap">
        <div class="title">
            <span>
                <span class="company">H3C</span>
                <span class="model" :class="cards.Status == '1' ? 'isRun' : 'noRun'">{{ cards.HostName }}</span>
            </span>
            <svg-icon icon-class="ic_edit" class="iconStyle" @click.stop="clickEdit(cards)"></svg-icon>
        </div>
        <p>
            <span>IP：{{ cards.IpAddress }}</span>
            <!-- <span class="lineSpan">连接时长：{{ cards.linkTime }}</span> -->
            <span class="lineSpan">连接时长：20h:30min:20s</span>
        </p>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
const cardData = defineProps({ cardData: Object })
const emit = defineEmits(["clickEdit"])
const cards = cardData.cardData
const clickEdit = (value) => {
    // const devData = {
    //     devName: cards.decice,
    //     devType: cards.decice,
    //     onlinetime: cards.linkTimes,
    //     ipaddress: cards.IPAddress,
    //     devStatus: 2,
    //     macaddress: "0000-0000-00001",
    //     devSN: "123456789201215",
    //     devVersion: "R2401",
    //     isSupportPoe: true,
    //     isSupportWan: true
    // }
    // router.push({ path:`/DevInfo/${devData.devName}/${devData.devType}`})
    // router.push({ name: "DevInfo", params: devData })
    emit("clickEdit", value)
}
</script>

<style scoped>
.title span:nth-child(1) {
    display: flex;
    align-items: center;
}
.iconStyle {
    width: 18px;
    height: 18px;
}
.cardWrap {
    background: #ffffff;
    padding: 13px 15px;
    flex: 1;
}
.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
p {
    margin: 7px 0 0;
    padding: 0;
    color: #666666;
}

p span {
    margin: 0 10px;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    line-height: 0px;
}
p span:nth-child(1) {
    margin-left: 0;
}
.company {
    margin-top: 5px;
    margin-bottom: 3px;
    width: 28px;
    height: 11px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 0px;
}
.model {
    padding: 3px 10px;
    font-size: 12px;
    color: #ffffff;
    border-radius: 3px;
    margin-left: 10px;
    display: inline-block;
    transform: scale(0.9);
}
.isRun {
    width: 40px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background: #21b480;
    border-radius: 3px;
}

.noRun {
    width: 40px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background: #999999;
    border-radius: 3px;
}

.lineSpan::before {
    content: "|";
    position: relative;
    left: -10px;
    color: #999999;
}
.upgrade {
    color: #f43e3b;
    border: 1px solid #f43e3b;
    display: inline-block;
    font-size: 12px;
    padding: 3px 4px;
    border-radius: 3px;
    transform: scale(0.8);
}
</style>
