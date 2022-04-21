<template>
    <div class="cardWrap" @click="selectPort(cards.sn)">
        <div class="title">
            <span>
                <span class="company">{{ cards.company }}</span>
                <span class="model" :class="cards.isOnline == 'true' ? 'isRun' : 'noRun'">{{ cards.decice }}</span>
            </span>
            <div>
                <div class="van-badge van-badge--top-right">9</div>
                <svg-icon icon-class="ic_port_s" class="iconStyle"></svg-icon>
            </div>
        </div>
        <p>
            <span>{{ t("Vlan.model") }}：{{ cards.model }}</span>
        </p>
        <p>
            <span>{{ t("Vlan.sn") }}：{{ cards.sn }}</span>
        </p>
    </div>
</template>
<script setup>
import { defineProps, ref } from "vue"
import { Toast } from "vant"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
const cardData = defineProps({ cardData: Object })
const cards = cardData.cardData

const selectPort = (sn) => {
    console.log("序列号：" + sn)
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
