<template>
    <Form>
        <box-title :titleName="titleName"></box-title>
        <div class="init-password">
            <password-field
                class="anumsymbol"
                :password="password"
                :label="t('Password.password')"
                :placeholder="t('Password.placeholder1')"
                :rules="[{ validator: widget['passwordLogin'] }]"
                @changePassword="userPassword"
            ></password-field>
            <span class="password-rule">{{ t("Password.rules") }}</span>
        </div>
    </Form>
</template>

<script setup>
import { ref } from "vue"
import { Form } from "vant"
import { useI18n } from "vue-i18n"
import BoxTitle from "../../components/BoxTitle"
import PasswordField from "../../components/PasswordField"
import widget from "../../frame/utils/widget"
const password = ref("")

const { t } = useI18n()
const titleName = ref(t("Password.title1"))

const userPassword = (e) => {
    password.value = e
}

const mUserManager = () => {
    const ncTable = {
        NC: "StartProgress",
        operation: "merge",
        rows: [
            {
                Role: "TM",
                Username: "admin",
                Password: password.value
            }
        ]
    }
    return ncTable
}

const returnData = () => {
    let ncList = []

    if (widget.passwordLogin(password.value) == true) {
        ncList = [mUserManager()]
    }

    return ncList
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