<template>
    <box-title :titleName="titleName"></box-title>
    <div class="init-password">
        <password-field
                :password="password"
                :label="t('Password.password')"
                :placeholder="t('Password.placeholder1')"
                @changePassword="userPassword"
        ></password-field>
        <field v-model="passwordTips" :label="t('Password.passwordTips')" :placeholder="t('Password.placeholder2')"></field>
        <span class="password-rule">{{ t("Password.rules") }}</span>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { Field } from "vant"
import { useI18n } from "vue-i18n"
import BoxTitle from "../../components/BoxTitle"
import PasswordField from "../../components/PasswordField"
const password = ref(""), passwordTips = ref("")

const { t } = useI18n()
const titleName = ref(t("Password.title1"))

const userPassword = (e) => {
    password.value = e
    console.log(password)
}

const returnData = () => {
    const data = {
        password: password,
        passwordTips: passwordTips
    }

    return data
}

defineExpose({
    returnData
})
</script>

<style scoped>
    .init-password {
        margin-bottom: 10px;
    }
    .init-password :deep(.van-field__label label) {
        color: #333;
    }
    .password-rule {
        display: flex;
        background: #fff;
        padding: 16px;
        font-size: 13px;
        color: #999;
    }
</style>