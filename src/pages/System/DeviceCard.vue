<template>
    <div class="cardWrap">
        <div class="title" @click="handleCard">
            <div>
                <span class="company">{{ cards.company }}</span>
                <span class="model" :class="cards.isOnline == 'true' ? 'isRun' : 'noRun'">{{ cards.decice }}</span>
            </div>
            <p>
                <span>{{ RC('model') }}{{ '：' + cards.model }}</span>
                <span class="lineSpan">{{ RC('edition') }}{{ '：' + cards.softver }}</span>
                <span class="upgrade" v-if="cards.isUpGrade == 'true'">{{ RC('Upgradeable') }}</span>
            </p>
        </div>
        <div @click="cardEdit">
            <svg-icon icon-class="ic_edit" class="iconStyle"></svg-icon>
        </div>
        <Dialogs v-model:show="show" :title="RC('setDeviceName')" :confirmButtonText="t('Apply')"
            :cancelButtonText="t('Cancel')" confirmButtonColor="#617CF0" show-cancel-button @confirm="editNameFun" @cancel="cancel">
            <van-cell-group inset>
                <Field v-model="cards.company" :label="RC('oldName')" readonly />
                <Field v-model="newName" :label="RC('newName')" :placeholder="RC('pleaceholder')" />
            </van-cell-group>
        </Dialogs>
    </div>
</template>

<script setup>
import { defineProps, ref, toRef, defineEmits } from "vue"
import { useI18n } from "vue-i18n"
import { Dialog, Field } from "vant"
import { useRouter } from "vue-router"
const router = useRouter()
const Dialogs = Dialog.Component
const newName = ref("")
const { t } = useI18n()
let RC = (str) => {
    return t("SystemMenu.deviceCard." + str)
}
const show = ref(false)
const cardData = defineProps({ cardData: Object })
const cards = toRef(cardData, "cardData")
const emit = defineEmits(["cardEdit", "handleCard"])
const cardEdit = () => {
    show.value = true
}
const handleCard = () => {
    const devData = {
        decice: "AC",
        "devName": cards.value.decice,
        "devType": cards.value.decice,
        "onlinetime": "123456789201215",
        "ipaddress":"1.1.1.1",
        "devStatus":2,
        "macaddress":"0000-0000-00001",
        "devSN":"123456789201215",
        "devVersion":"R2401",
        "isSupportPoe":true,
        "isSupportWan":true
    }
    router.push({ name:"DevInfo",params:devData })
    // emit("handleCard", cards)
}
const cancel = () => {
    show.value = false
    newName.value = ""
}
const editNameFun = () => {
    emit("cardEdit", { cards:cards.value,newName:newName.value })
}

</script>

<style scoped>
.iconStyle {
    width: 15px !important;
    height: 15px !important;
}

.cardWrap {
    background: #ffffff;
    padding: 10px;
    flex: 1;
    display: flex;
    justify-content: space-between;
}

.title {
    display: flex;
    flex-direction: column;
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
    background: #21B480;
}

.noRun {
    background: #999999;
}

.lineSpan::before {
    content: '|';
    position: relative;
    left: -5px;
    color: #999999;
}

.upgrade {
    color: #F43E3B;
    border: 1px solid #F43E3B;
    display: inline-block;
    font-size: 12px;
    padding: 3px 4px;
    border-radius: 3px;
    transform: scale(0.8);
}
</style>