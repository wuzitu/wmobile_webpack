<template>
    <div class="cardWrap">
        <div class="title" @click="handleCard">
            <div>
                <slot name="title">
                    <span class="company">{{ title }}</span>
                </slot>
                <span class="model" v-if="online" :class="type == 'online' ? 'isRun' : 'noRun'">{{ device }}</span>
            </div>
            <div>
                <slot></slot>
            </div>
        </div>
        <slot name="rightIcon">
            <div @click="editTitle" :class="iconWrap" v-if="rightIcon=='ic_edit'">
                <svg-icon :icon-class="rightIcon" class="iconStyle" v-if="rightIcon=='ic_edit'"></svg-icon>
            </div>
            <div :class="iconWrap" v-if="rightIcon=='ic_arrow'" >
                <svg-icon :icon-class="rightIcon" class="icArrow"></svg-icon>
            </div>
            <div :class="iconWrap" @click="cardEdit" v-if="rightIcon!='ic_arrow'&&rightIcon!='ic_edit'&&rightIcon" >
                <svg-icon :icon-class="rightIcon" class="iconStyle"></svg-icon>
            </div>
        </slot>
        <Dialogs v-model:show="show" :title="t('SystemMenu.deviceCard.setDeviceName')" :confirmButtonText="t('Apply')"
            :cancelButtonText="t('Cancel')" confirmButtonColor="#617CF0" show-cancel-button @confirm="editNameFun" @cancel="cancel">
            <van-cell-group inset>
                <Field v-model="title" :label="t('SystemMenu.deviceCard.oldName')" readonly />
                <Field v-model="newName" :label="t('SystemMenu.deviceCard.newName')" :placeholder="t('SystemMenu.deviceCard.pleaceholder')" />
            </van-cell-group>
        </Dialogs>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n"
import { Dialog, Field } from "vant"
import { defineProps, ref, defineEmits,watch } from "vue"
const { t } = useI18n()
const Dialogs = Dialog.Component
const cardData = defineProps({
    title: String, //顶部标题
    online:Boolean, //是否显示在线
    type:String, //传入参数为online时，为在线图标为绿色，否则置灰
    device:String, //是否在线显示设备类别名称
    rightIcon:String, //右侧icon
    rightIconPosition: String, // icon在什么位置，top 上 ， middle 中 ，bottom 下。
    cardData: Object //点击事件的回调参数
})
const show = ref(false)
let iconWrap = ref("wrapTop")
const emit = defineEmits(["IconRightClick", "handleCard"])
const cardEdit = () => {
    emit("IconRightClick", cardData)
}
const handleCard = () => {
    emit("handleCard", cardData)
}
const editTitle = () => {
    show.value = true
}
const cancel = () => {
    show.value = false
    newName.value = ""
}
const newName = ref("")
const editNameFun = () => {
    emit("cardEditTitle", { cards:cardData,newName:newName.value })
}
watch(() => cardData.rightIconPosition, (newVal) => {
    if(newVal == "middle"){
        iconWrap = "wrapMiddle"
    }else if (newVal == "bottom"){
        iconWrap = "wrapBottom"
    }
}, { deep: true,immediate:true }
)

</script>

<style scoped>
.iconStyle {
    width: 15px !important;
    height: 15px !important;
}

.icArrow{
    width: 12px !important;
    height: 12px !important;
}
.wrapMiddle{
    display: flex;
    align-items: center;
}

.wrapBottom{
    display: flex;
    align-items: flex-end;
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

.title .lineSpan:nth-child(1){
    content: '';
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