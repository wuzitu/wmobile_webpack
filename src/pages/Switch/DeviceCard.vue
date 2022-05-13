<template>
    <div class="cardWrap">
        <div class="title" @click="clickCardWrap">
            <div>
                <span class="company">{{ cards.HostName }}</span>
                <span class="model" :class="cards.Status == 1 ? 'isRun' : 'noRun'">{{ cards.decice }}</span>
            </div>
            <p>
                <span>IP：{{ cards.IpAddress }}</span>
                <span class="lineSpan">{{ t("Switch.linktime") }}：{{ cards.StandTime }}</span>
            </p>
        </div>

        <div @click="cardEdit">
            <svg-icon icon-class="ic_edit" class="iconStyle"></svg-icon>
        </div>
        <Dialogs v-model:show="show" :title="RC('setDeviceName')" :confirmButtonText="t('Apply')" :cancelButtonText="t('Cancel')" confirmButtonColor="#617CF0" show-cancel-button @confirm="editNameFun" @cancel="cancel">
            <van-cell-group inset>
                <Field v-model="cards.HostName" :label="RC('oldName')" readonly />
                <Field v-model="newName" :label="RC('newName')" :placeholder="RC('pleaceholder')" />
            </van-cell-group>
        </Dialogs>
    </div>
</template>

<script setup>
import { defineProps, ref, watch, reactive, toRef } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Dialog, Field } from "vant"
const Dialogs = Dialog.Component
const show = ref(false)
const { t } = useI18n()
const router = useRouter()
const cardData = defineProps({ cardData: Object })
const cards = toRef(cardData, "cardData")
const emit = defineEmits(["cardEdit"])
const newName = ref("")
let RC = (str) => {
    return t("SystemMenu.deviceCard." + str)
}
const cardEdit = () => {
    show.value = true
    newName.value = ""
}
const clickCardWrap = () => {
    // router.push({ name: "DevInfo", params: { "content":JSON.stringify(cards.value) } })
    router.push({ path: "/DevInfo", query: { "content":JSON.stringify(cards.value) } })
}
const editNameFun = () => {
    show.value = true
    emit("cardEdit", { cards: cards.value, newName: newName.value })
}
const cancel = () => {
    show.value = false
    newName.value = ""
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
