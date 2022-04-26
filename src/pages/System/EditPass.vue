<template>
    <div>
        <Form @submit="onSubmit">
            <van-cell-group
                :title="RC('passTitleTips')"
                :theme-vars="themeVars"
            >
                <box-title :titleName="RC('pwdTitles')"></box-title>
                <Field
                    v-model="pldPwd"
                    name="pldPwd"
                    type="password"
                    :label="RC('oldPass')"
                    :placeholder="RC('OPtips')"
                    required
                    :rules="[{ validator: validatorMessage, trigger: 'onChange', label: 'pldPwd' }]"
                />
                <Field
                    v-model="newPwd"
                    type="password"
                    name="newPwd"
                    :label="RC('newPass')"
                    required
                    :placeholder="RC('NPtips')"
                    :rules="[{ validator: validatorMessage, trigger: 'onChange', label: 'newPwd' }]"
                />
                <Field
                    v-model="againPwd"
                    type="password"
                    name="againPwd"
                    :label="RC('confirmPass')"
                    :placeholder="RC('CPtips')"
                    required
                    :rules="[{ validator: validatorMessage, trigger: 'onChange', label: 'againPwd' }]"
                />
                <Field
                    v-model="pwdTips"
                    type="text"
                    name="pwdTips"
                    :label="RC('passTips')"
                    :placeholder="RC('PTtips')"
                />
            </van-cell-group>
        </Form>
        <BottomButtonVue @submit="onSubmit"/>
    </div>
</template>
<script setup>
import { defineEmits,ref } from "vue"
import BottomButtonVue from "./BottomButton.vue"
import { Field, Form } from "vant"
import BoxTitle from "@/components/BoxTitle.vue"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
let RC = (str) => {
    return t("SystemMenu.pwd." + str)
}
const emit = defineEmits(["submit"])
const pldPwd = ref("")
const newPwd = ref("")
const againPwd = ref("")
const pwdTips = ref("")
const onSubmit = (values) => {
    emit("submit", { values })
    //   console.log();
}
const validatorMessage = (val, r) => {
    let label = r.label
    let reg = /([0-9]+[a-z]+[A-Z]+).{10,63}/
    console.log(val, reg.test(val))
    return "校验不通过"
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