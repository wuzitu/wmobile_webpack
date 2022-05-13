<!--
    升级弹窗组件
    <UpgradePopUpVue v-model:upgradeShow="upgradeShows" :isNeedBack="true" @confirm="confirmUpgrade"/>
    接受参数：
        upgradeShows：Boolean , 必传参数 ，弹窗显示与否 。使用的时候请加上v-model:    v-model:upgradeShow="upgradeShows"
        isNeedBack: Boolean , 可选参数 ， 默认为false 点击本地文件服务器修改完成之后是否需要返回当前界面。
    事件：
        1、 confirm ， 点击确认，返回参数为升级方式 1为在线升级 ，2为本地升级
            const confirmUpgrade = (val) => {
                console.log(val.upgradeCheck)
            }
        cancel ，点击取消时的事件，无返回参数
    插槽： 支持增加tips的插槽，原有的不能改变
    <template #chooseTips></template>
 -->
<template>
    <div>
        <Dialogs v-model:show="show" :title="RC('title')" :confirmButtonText="t('Apply')"
            :cancelButtonText="t('Cancel')" :before-close="handleClose" confirmButtonColor="#617CF0" show-cancel-button @confirm="confirmUpgrade" @cancel="confirmCancel">
            <div class="upgradeWraps">
                <div>
                    <RadioGroup v-model="upgradeCheck" checked-color="#617CF0" direction="horizontal">
                        <Radio name="1">{{ RC('onlineUpgrade') }}</Radio>
                        <p class="upgradeTipsStyle">{{ RC('onlineUpgradeTips') }}</p>
                        <Radio name="2">{{ RC('localUpgrade') }}</Radio>
                        <p  class="upgradeTipsStyle">
                            <span  @click="toTftpServe" class="link">{{RC('localUpgradeKey')}}</span>
                            {{ RC('localUpgradeTips') }}
                        </p>
                    </RadioGroup>
                </div>
                <slot name="chooseTips"></slot>
            </div>
        </Dialogs>
    </div>
</template>
<script setup>
import { defineProps, ref, defineEmits, watch } from "vue"
import { useI18n } from "vue-i18n"
import { Dialog, RadioGroup, Radio } from "vant"
import { useRouter } from "vue-router"
const router = useRouter()
const Dialogs = Dialog.Component
const { t } = useI18n()
let RC = (str) => {
    return t("SystemMenu.upgradePopUp." + str)
}
const show = ref(upgradeShow.upgradeShow)
const upgradeCheck = ref("1")
const upgradeShow = defineProps({
    upgradeShow: Boolean,
    isNeedBack: Boolean //是否需要返回当前界面
})
const emit = defineEmits(["confirm", "cancel", "update:upgradeShow"])
const confirmUpgrade = () => {
    emit("confirm", { upgradeCheck:upgradeCheck.value })
}
const confirmCancel = () => {
    emit("cancel")
}
const toTftpServe = () => {
    if(upgradeShow.isNeedBack){
        router.push({ path:"/System/SysSet",query:{ type:"tftpServce",back:true } })
    }else{
        router.push({ path:"/System/SysSet",query:{ type:"tftpServce" } })
    }

}
const handleClose = () => {
    emit("update:upgradeShow", false)
}
watch(() => upgradeShow.upgradeShow, (newVal) => {
    show.value = newVal
}, { deep: true, immediate: true })
</script>
<style scoped>
.upgradeWraps {
    padding: 10px 15px;
}

.upgradeTipsStyle {
    margin: 5px 0;
    margin-left: 30px;
    font-size: 12px;
    margin: 10px 10px 10px 30px;
    color: #666666;
}

.link{
   color: #617CF0;
   font-size: 12px;
   border-bottom: 1px solid #617CF0;
}
.confrimTips {
    text-align: center;
}
</style>