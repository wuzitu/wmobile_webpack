<template>
	<div class="register-box">
		<Form @submit="onSubmit">
			<van-cell-group :title="RC('rgisterTitleTip')" :theme-vars="themeVars">
				<box-title :titleName="RC('rgisterTitle')"></box-title>
				<Field v-model="userName" name="userName" type="textarea" :label="RC('userName')" ref="userNameRef"
					:placeholder="RC('userNameTip')" input-class="textarea" autosize :error-message="userNameErr"
					:rules="[{ validator: validatorMessage, trigger: 'onChange', label: 'userName' }]" />
				<Field v-model="verificationCode" name="verificationCode" type="text" :label="RC('verificationCode')"
					:placeholder="RC('verificationCodeTip')" :error-message="picturecodeErr">
					<template #button>
						<div class="picture-verification-code" @click="switchPictureCode">
							<!-- <img class="picture-verification-img"
								src="data:image/bpm;base64,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" /> -->
							<!-- <img class="picture-verification-img" :src="picturecode.buf"/> -->
							<img class="picture-verification-img"
								src="data:image/bpm;base64,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" />
						</div>
					</template>
				</Field>
				<Field v-model="phoneNumber" name="phoneNumber" type="text" :label="RC('phoneNumber')"
					:placeholder="RC('phoneNumberTip')" @input="onPhoneChange"
					:rules="[{ validator: validatorPhone, trigger: 'onChange', label: 'phoneNumber' }]"
					:error-message="phoneError" />
				<Field v-model="phoneVerCode" name="phoneVerCode" type="text" :label="RC('phoneVerCode')"
					:placeholder="RC('phoneVerCodeTip')">
					<template #button>
						<div v-if="countDownState == false" class="verification-code" @click="getPhoneCode">
							{{ RC('getVerCode') }}
						</div>
						<div v-if="countDownState == true" class="count-down">
							{{ RC('countDownTip') }}{{ counter + 's' }}
						</div>
					</template>
				</Field>
				<password-field v-model="loginPassword" name="loginPassword" :label="RC('loginPassword')"
					:placeholder="RC('loginPasswdTip')" :required="false" :error-message="passwdErr" @blur="onBlur"
					:rules="[{ validator: validatorPass, trigger: 'onChange', label: 'loginPassword' }]">
				</password-field>
				<password-field v-model="confirmPassword" name="confirmPassword" :label="RC('confirmPassword')"
					:placeholder="RC('confirmPasswordTip')" :required="false" :error-message="confirmPasswdErr"
					@blur="onBlur"
					:rules="[{ validator: validatorConfirmPass, trigger: 'onChange', label: 'confirmPassword' }]">
				</password-field>
			</van-cell-group>
			<div class="agreement-box">
				<Radio v-model="agree">{{ RC('agree') }}</Radio>
				<div class="registrationTerms-box">
					<a
						href="https://lvzhou-at.h3c.com:31443/oasis/stable/mix/static/beforeLogin/frame/index.html#/provision">《{{
								RC('userTerms')
						}}》</a>
					<a href="https://oasis.h3c.com/oasis/stable/mix/static/beforeLogin/frame/index.html#/privacy">《{{
							RC('privacyPolicy')
					}}》</a>
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
import { createApp, onMounted, ref } from "vue"
import { Field, Form, RadioGroup, Radio } from "vant"
import BoxTitle from "@/components/BoxTitle.vue"
import PasswordField from "@/components/PasswordField.vue"
import { useI18n } from "vue-i18n"
const app = createApp()
app.use(Radio)
app.use(RadioGroup)
const { t } = useI18n()
let RC = (str) => {
    return t("ConnectCloudNet.CloudRegister." + str)
}
const agree = ref(true)
const userName = ref("")
const verificationCode = ref("")
const phoneNumber = ref("")
const loginPassword = ref("")
const confirmPassword = ref("")
const userNameErr = ref("")
const phoneError = ref("")
const picturecodeErr = ref("")
const passwdErr = ref("")
const confirmPasswdErr = ref("")

// 获取手机验证码相关
// let isSmsSend = ref(false)
let timer = ref("")
let counter = ref("80")
let countDownState = ref(false)


// 用户名边输边校验
const validatorMessage = (val) => {
    let reg = /^[a-zA-Z][a-zA-Z0-9_]{6,32}/
    reg.test(val) == false ? userNameErr.value = RC("userNameErr") : ""
}

// 手机号码边输边校验
const validatorPhone = (val) => {
    phoneError.value = ""
    let reg = /^1(3|4|5|6|7|8|9)\d{9}/
    reg.test(val) == false ? phoneError.value = RC("phoneError") : ""
}

// 密码边输入边校验
const validatorPass = (val) => {
    let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[_!@#$%|^&*`~()+='"\-[\]<>{},.\\/:;])[0-9a-zA-Z_!@#$%|^&*`~()+='"\-[\]<>{},.\\/:;]{8,32}/
    console.log(reg.test(val))
    reg.test(val) == false ? passwdErr.value = RC("passwdErr") : passwdErr.value = ""
}

// 确认密码边输入边校验
const validatorConfirmPass = (val) => {
    let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[_!@#$%|^&*`~()+='"\-[\]<>{},.\\/:;])[0-9a-zA-Z_!@#$%|^&*`~()+='"\-[\]<>{},.\\/:;]{8,32}/
    console.log(reg.test(val))
    reg.test(val) == false ? confirmPasswdErr.value = RC("passwdErr") : confirmPasswdErr.value = ""
}

// 失去焦点之后校验校验两个密码是否相同
const onBlur = () => {
    let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[_!@#$%|^&*`~()+='"\-[\]<>{},.\\/:;])[0-9a-zA-Z_!@#$%|^&*`~()+='"\-[\]<>{},.\\/:;]{8,32}/
    if (reg.test(loginPassword.value) != false && reg.test(confirmPassword.value) != false) {
        loginPassword.value != confirmPassword.value ? confirmPasswdErr.value = RC("identicalPwdErr") : confirmPasswdErr.value = ""
    }
}

// 获取图片验证码
const switchPictureCode = () => {
    console.log("switch ver code")
}

// 获取手机验证码
const getPhoneCode = () => {
    phoneNumber.value == "" ? phoneError.value = RC("phoneNull") : ""
    verificationCode.value == "" ? picturecodeErr.value = RC("picturecodeErr") : ""
    if (phoneNumber.value != "" && verificationCode.value != "" && picturecodeErr.value == "") {
        // 调用接口发送短信验证码
        // 倒计时80s
        countDown()
    }
}

// 重置倒计时
const reset = () => {
    // isSmsSend = false
    if (timer) {
        clearInterval(timer)
        counter.value = 80
        timer = null
    }
}

// 倒计时
const countDown = () => {
    countDownState.value = true
    timer = setInterval(() => {
        counter.value--
        if (counter.value < 0) {
            countDownState.value = false
            reset()
        }
    }, 1000)
}

// 当手机号变化时，重置发送按钮
const onPhoneChange = () => {
    reset()
}

// 点击注册
const onSubmit = () => {
    console.log("this is register")
}

const picturecode = JSON.parse("{\"url\":\"pinserver\",\"retCode\":0,\"buf\":\"data:image/bpm;base64,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\"}")
console.log(picturecode)
console.log(typeof (picturecode.buf))
console.log(picturecode.buf)

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

.picture-verification-code {
	width: 74px;
	height: 26px;
	border: 1px solid #cccccc;
}

.agreement-box {
	margin-left: 15px;
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
	position: absolute;
	top: 170px;
	left: 114px;
}

.verification-code {
	font-family: PingFang-SC-Medium;
	font-size: 14px;
	color: #617CF0;
	font-weight: Medium;
}

.count-down {
	width: 74px;
	height: 26px;
	font-size: 12px;
	background-color: #eeeeee;
	text-align: center;
	line-height: 26px;
	color: #999999;
}

.picture-verification-img {
	width: 74px;
	height: 26px;
}

.verification-code::before {
	content: '|';
	position: relative;
	left: -10px;
	color: #999999;
}
</style>