<template>
        <div class="register-box">
                <Form @submit="onSubmit">
                        <van-cell-group :title="RC('rgisterTitleTip')" :theme-vars="themeVars">
                                <box-title :titleName="RC('rgisterTitle')"></box-title>
                                <Field v-model="userName" name="userName" type="textarea" :label="RC('userName')"
                                        :placeholder="RC('userNameTip')" input-class="textarea" autosize />
                                <Field v-model="verificationCode" name="verificationCode" type="text"
                                        input-calss="field2" :label="RC('verificationCode')"
                                        :placeholder="RC('verificationCodeTip')" >
                                         <template #button>
                                                <div class="picture-verification-code">
                                                </div>
                                        </template>
                                </Field>
                                <Field v-model="phoneNumber" name="phoneNumber" type="text" :label="RC('phoneNumber')"
                                        :placeholder="RC('phoneNumberTip')" />
                                <Field v-model="phoneVerCode" name="phoneVerCode" type="text"
                                        :label="RC('phoneVerCode')" :placeholder="RC('phoneVerCodeTip')">
                                        <template #button>
                                                <div class="verification-code" @click="getCode()">
                                                获取验证码
                                                </div>
                                        </template>
                                </Field>
                                <password-field v-model="loginPassword" name="loginPassword"
                                        :label="RC('loginPassword')" :placeholder="RC('loginPasswdTip')" :required="false">
                                </password-field>
                                <password-field v-model="confirmPassword" name="confirmPassword"
                                        :label="RC('confirmPassword')" :placeholder="RC('confirmPasswordTip')" :required="false">
                                </password-field>
                        </van-cell-group>
                        <div class="agreement-box">
                                <!-- <RadioGroup > -->
                                        <Radio v-model="agree">同意</Radio>
                                <!-- </RadioGroup> -->
                                <div class="registrationTerms-box">
                                        <a href="https://lvzhou-at.h3c.com:31443/oasis/stable/mix/static/beforeLogin/frame/index.html#/provision">《用户条款》</a>
                                        <a href="https://oasis.h3c.com/oasis/stable/mix/static/beforeLogin/frame/index.html#/privacy">《隐私政策》</a>
                                </div>
                        </div>
                        <div class="rgister-button-box">
                                <van-button color="#617CF0" type="primary" @click="onSubmit" class="rgister-button">
                                        {{ RC('completeRegistration') }}</van-button>
                        </div>
                </Form>
                <span class="userName-rule">{{ RC('userNameRule') }}</span>
        </div>
</template>

<script setup>
import $ from "jquery"
import { createApp, onMounted, ref } from 'vue'
import { Field, Form, RadioGroup, Radio } from "vant"
import BoxTitle from "@/components/BoxTitle.vue"
import PasswordField from "@/components/PasswordField.vue"
import { useI18n } from "vue-i18n"
import { getPictureCode } from "@/frame/utils/lvzhouRq/lvzhouApi.js"
const app = createApp()
app.use(Radio)
app.use(RadioGroup)
const { t } = useI18n()
let RC = (str) => {
    return t("ConnectCloudNet.CloudRegister." + str)
}
const agree = ref(true)
// onMounted (() => {
// //     function getCode() {
// //     console.log("sssssss")
// //  }
// aaaa()
// console.log('mounted!')
// })
// const aaaa = () =>{
// 	$.ajax({
//         url:"https://oasis.h3c.com/v3/pinserver/getPin",
//         type:"get",				//jsonp只能支持get请求 src只能是get请求
//         dataType:"jsonp", //dataType表示返回值类型   （平时都是json，可以省略不写）
//         jsonp: "callback", //指定接收回调函数的变量的名称   通常都写callback
//         jsonpCallback: "hello", //指定回调函数名称    这样浏览器中的回调函数名后面就不会跟一长串数字了
//         Headers:{
//             "access-control-allow-origin":'*',
//         },
//         success:function (data){ //data经过jQuery封装返回就是json串
// 			console.log(data)
//         },error:function(xmlhttp){
//             console.log(xmlhttp.getResponseHeader("Server"))
//         }
//     })
// }
// const emit = defineEmits(['submit'])
// const pldPwd = ref()
// const newPwd = ref()
// const againPwd = ref()
// const pwdTips = ref()
// const onSubmit = (values) => {
//     emit('submit', { values })
//     //   console.log();
// }
// const validatorMessage = (val, r) => {
//     let label = r.label
//     let reg = /[^a-zA-Z0-9\\W_!@#$%|^&*`~()+='"\-\[\]<>{},.\\\/:; ]/g
//     console.log(val, reg.test(val))
//     return "校验不通过"
// }

const themeVars = {
    cellGroupTitleColor: "#999999",
    cellGroupTitleFontSize: "14px",
    cellValueColor: "#666666",
    filedInputTextColor: "#999999"
}
</script>

<style scoped>
.field2 {
        min-height: 100px !important;
}
.picture-verification-code{
        width: 73.5px;
        height: 26px;
        border: 1px solid #cccccc;
}
.agreement-box {
        margin-left: 89.5px;
        margin-top: 30px;
}

.registrationTerms-box {
        position: relative;
        left: 55px;
        top: -18px;
}

.registrationTerms-box a {
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: Medium;
        color: #F43E3B;
}

.rgister-button-box {
        position: fixed;
        width: 100%;
        display: flex;
        align-items: center;
        bottom: 0;
}

.rgister-button {
        width: 100%;
        height: 50px;
}

.userName-rule {
        font-family: PingFang-SC-Medium;
        font-weight: Medium;
        font-size: 11px;
        color: #999999;
        position: fixed;
        top: 170px;
        left: 114px;
}
.verification-code{
  font-family: PingFang-SC-Medium;
  font-size: 14px;
  color: #617CF0;
  font-weight: Medium;
}
.verification-code::before{
    content: '|';
    position: relative;
    left: -10px;
    color: #999999;
}
</style>