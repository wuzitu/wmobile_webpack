<template>
    <div>
        <Form @submit="onSubmit">
            <van-cell-group
                title="密码长度为10-63位，至少包括大写字母、小写字母、数字、符号中的两种，不能包含正序或反序的admin"
                :theme-vars="themeVars"
            >
                <div class="manageTitle">
                    <span class="manageTitleText">管理员密码</span>
                </div>
                <Field
                    v-model="pldPwd"
                    name="pldPwd"
                    type="password"
                    label="旧密码"
                    placeholder="请输入旧管理密码"
                    required
                    :rules="[{ validator: validatorMessage, trigger: 'onChange', label: 'pldPwd' }]"
                />
                <Field
                    v-model="newPwd"
                    type="password"
                    name="newPwd"
                    label="新密码"
                    required
                    placeholder="请输入新管理密码"
                    :rules="[{ validator: validatorMessage, trigger: 'onChange', label: 'newPwd' }]"
                />
                <Field
                    v-model="againPwd"
                    type="password"
                    name="againPwd"
                    label="确认新密码"
                    placeholder="请再次输入新管理密码"
                    required
                    :rules="[{ validator: validatorMessage, trigger: 'onChange', label: 'againPwd' }]"
                />
                <Field
                    v-model="pwdTips"
                    type="text"
                    name="pwdTips"
                    label="密码提示"
                    placeholder="请输入密码的提示信息"
                />
            </van-cell-group>
            <div class="buttonGroup">
                <van-button round color="#617CF0" plain class="buttonStyle">取消</van-button>
                <van-button
                    round
                    block
                    color="#617CF0"
                    type="primary"
                    class="buttonStyle"
                    native-type="submit"
                >确认</van-button>
            </div>
        </Form>
    </div>
</template>
    
<script setup>
import { defineEmits } from 'vue'
import { Field, Form } from "vant";

import { ref } from 'vue';
const emit = defineEmits(['submit'])
const pldPwd = ref('');
const newPwd = ref('');
const againPwd = ref('');
const pwdTips = ref('');
const onSubmit = (values) => {
    emit('submit', { values })
    //   console.log();
};
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
.manageTitle {
    padding: 10px 15px 10px 0;
    border-bottom: 1px solid #f2f3f5;
    position: relative;
}
.manageTitleText {
    font-size: 14px;
    padding-left: 15px;
    color: #333333;
    font-family: "Microsoft YaHei";
}
.manageTitle::before {
    content: "";
    display: block;
    position: absolute;
    width: 4px;
    height: 12px;
    top: 50%;
    transform: translate(0, -50%);
    background: #617cf0;
}
.buttonGroup {
    display: flex;
    align-items: center;
    padding: 40px 46px;
}
.buttonStyle {
    width: 152px;
    margin: 0 10px;
    height: 44px;
}
</style>