<template>
    <div>
        <Form @submit="onSubmit">
            <van-cell-group :title="RC('passTitleTips')" :theme-vars="themeVars">
                <box-title :titleName="RC('pwdTitles')"></box-title>
                <password-field v-model="newPwd" name="newPwd" :label="RC('newPass')" required
                    :placeholder="RC('NPtips')"
                    :rules="[{ validator: validatorPassword, trigger: 'onChange', label: 'newPwd' }]"
                    :error-message="passwdErr" @blur="onBlur"/>
                <password-field v-model="againPwd" name="againPwd" :label="RC('confirmPass')"
                    :placeholder="RC('CPtips')" required
                    :rules="[{ validator: validatorPassword, trigger: 'onChange', label: 'againPwd' }]"
                    :error-message="confirmPasswdErr" @blur="onBlur"/>
                <Field v-model="pwdTips" type="text" name="pwdTips" :label="RC('passTips')"
                    :placeholder="RC('PTtips')" />
            </van-cell-group>
        </Form>
        <BottomButtonVue @submit="onSubmit" />
    </div>
</template>
<script setup>
import { defineEmits, ref } from "vue"
import BottomButtonVue from "./BottomButton.vue"
import { Field, Form } from "vant"
import BoxTitle from "@/components/BoxTitle.vue"
import PasswordField from "@/components/PasswordField.vue"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
let RC = (str) => {
    return t("SystemMenu.pwd." + str)
}
const emit = defineEmits(["submit"])
const newPwd = ref("")
const againPwd = ref("")
const pwdTips = ref("")
const passwdErr = ref("")
const confirmPasswdErr = ref("")
let reg = /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?![_!@#$%|^&*`~()+='"\-\[\]<>{},.\\\/:;]+$)[\da-zA-z_!@#$%|^&*`~()+='"\-\[\]<>{},.\\\/:;]{10,63}$/


// 提交密码
const onSubmit = (values) => {
    emit("submit", { values })
    //   console.log();
}
const validatorPassword = (val) => {
    if (reg.test(val) == false || val.indexOf("admin") != -1 || val.indexOf("nimda") != -1) {
        return RC("passTitleTips")
    }
}
// const validatorConfirmPasssword = (val) => {
//     if (reg.test(val) == false || val.indexOf("admin") != -1 || val.indexOf("nimda") != -1) {
//         return RC("passTitleTips")
//     }
// }

const onBlur = () => {
    if (reg.test(newPwd.value) != false && reg.test(againPwd.value) != false) {
        newPwd.value != againPwd.value ? confirmPasswdErr.value = RC("identicalPwdErr") : confirmPasswdErr.value = ""
    }
}


const themeVars = {
    cellGroupTitleColor: "#666666",
    cellGroupTitleFontSize: "14px",
    cellValueColor: "#666666",
    filedInputTextColor: "#999999"
}
</script>

<style scoped>
</style>