<template>
    <div class="cardWrap" @click="clickCardWrap">
        <div class="title">
            <span>
                <span class="company">{{ cards.company }}</span>
                <span class="model" :class="cards.isOnline == 'true' ? 'isRun' : 'noRun'">{{ cards.decice }}</span>
            </span>
            <svg-icon icon-class="ic_edit" class="iconStyle" @click="clickEdit"></svg-icon>
        </div>
        <p>
            <span>IP：{{ cards.IPAddress }}</span>
            <span class="lineSpan">{{ t("Switch.linktime") }}：{{ cards.linkTimes }}</span>
        </p>
    </div>
</template>

<script setup>
import { defineProps, watch, reactive, toRef } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
const router = useRouter()
const cardData = defineProps({ cardData: Object })
const cards = toRef(cardData, "cardData")

const clickEdit = () => {}

const clickCardWrap = () => {
    const devData = {
        devName: cards.decice,
        devType: cards.decice,
        onlinetime: cards.linkTimes,
        ipaddress: cards.IPAddress,
        devStatus: 2,
        macaddress: "0000-0000-00001",
        devSN: "123456789201215",
        devVersion: "R2401",
        isSupportPoe: true,
        isSupportWan: true
    }
    // router.push({ path:`/DevInfo/${devData.devName}/${devData.devType}`})
    router.push({ name: "DevInfo", params: devData })
}
</script>

<style scoped>
.iconStyle {
    width: 15px;
    height: 15px;
}
.cardWrap {
    background: #ffffff;
    padding: 10px;
    flex: 1;
}
.title {
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
.company {
    color: #333333;
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
.isRun {
    background: #21b480;
}

.noRun {
    background: #999999;
}

.lineSpan::before {
    content: "|";
    position: relative;
    left: -5px;
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
