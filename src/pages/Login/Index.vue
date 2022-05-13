<template>
    <div id="login">
        <div class="login-bg">
            <svg-icon class="ic_logo" icon-class="ic_logo"></svg-icon>
            <p class="logo-text">{{ t("logoText") }}</p>
        </div>
        <div class="login-password">
            <password-field :password="password" :placeholder="t('Password.placeholder1')" :left-icon="true" @changePassword="userPassword"></password-field>
            <p class="forget" @click="forgetTips">{{ t("Password.forget") }}</p>
            <van-button round type="primary" size="large" color="#617CF0" @click="onLoginSubmit">{{ t("Login") }}</van-button>
        </div>
        <div class="go-cloud" @click="goToCloud">
            <span>{{ t("LoginCloud") }}</span>
            <svg-icon class="ic_arrow" icon-class="ic_arrow"></svg-icon>
        </div>
        <dialogs v-model:show="show" :title="t('Tips')" show-cancel-button :cancel-button-text="t('Cancel')" :confirm-button-text="t('Apply')" @confirm="goToLogin">
            <div class="forget-text">
                <p class="forget-tips">
                    {{ t("Tips") }}:
                    <span>设置提示</span>
                </p>
                <p>{{ t("Password.LoginForget") }}</p>
            </div>
        </dialogs>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import { Dialog } from "vant"
import PasswordField from "../../components/PasswordField"
import CryptoJS from "crypto-js"
import axios from "axios"
import Base from "@/frame/utils/Base.js"
import qs from "qs"
import Cookies from "js-cookie"
const { t } = useI18n()
const router = useRouter()
const dialogs = Dialog.Component
const password = ref("")
const show = ref(false)

const userPassword = (e) => {
    password.value = e
}

const forgetTips = () => {
    show.value = true
}

const goToCloud = () => {
    router.push({
        name: "GuideDownload"
    })
}

// const initSubmit2 = () => {
//     router.push({
//         name: "DashBoard"
//     })
// }

function paraStringByteLength(sPwdorUser) {
    let charCode
    let totalByteLength = 0
    for (let i = 0; i < sPwdorUser.length; i++) {
        charCode = sPwdorUser.charCodeAt(i)
        if (charCode < 0x007f) {
            totalByteLength = totalByteLength + 1
        } else if (0x0080 <= charCode && charCode <= 0x07ff) {
            totalByteLength += 2
        } else if (0x0800 <= charCode && charCode <= 0xffff) {
            totalByteLength += 3
        } else {
            totalByteLength += 4
        }
    }

    return totalByteLength
}
const mkFlag = () => {
    let sUserName = "admin"
    let sPassWord = password.value
    let sLenName = paraStringByteLength(sUserName)
    let sLenPassWord = paraStringByteLength(sPassWord)
    let sFlagName = ""
    let sFlagPassWord = ""
    if (sLenName < 10) {
        sFlagName = "00" + sLenName + sUserName
    } else if (sLenName < 100) {
        sFlagName = "0" + sLenName + sUserName
    } else {
        sFlagName = sLenName + sUserName
    }
    if (sLenPassWord < 10) {
        sFlagPassWord = "00" + sLenPassWord + sPassWord
    } else if (sLenPassWord < 100) {
        sFlagPassWord = "0" + sLenPassWord + sPassWord
    } else {
        sFlagPassWord = sLenPassWord + sPassWord
    }
    let AESKEY = CryptoJS.enc.Utf8.parse("1111111111111111")
    let AESIV = CryptoJS.enc.Utf8.parse("2222222222222222")
    let sFlagStr = CryptoJS.AES.encrypt(sFlagName + sFlagPassWord, AESKEY, { iv: AESIV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString()
    return sFlagStr
}
function getQueryPara(sName, def) {
    let sHref = window.location.href
    let a = sHref.split("?")
    if (a.length == 1) {
        return def
    }

    let s = a[1]
    a = s.split("&")
    for (let i = 0; i < a.length; i++) {
        let a1 = a[i].split("=")
        if (sName == a1[0]) {
            if (a1[1].split("cn").length == 2) {
                return false
            }
            return a1[1]
        }
    }

    return def
}
const mkPostData = (sFlagStr) => {
    let sLang = "cn"
    // Cookie.set({ lang: sLang }, 360)
    let oData = {
        // eslint-disable-next-line camelcase
        user_name: "admin",
        flag: sFlagStr,
        ssl: getQueryPara("ssl", "false"),
        host: window.location.hostname,
        lang: sLang
    }
    let postData = oData ? qs.stringify(oData) : {}
    return postData
}
const onLoginSubmit = async () => {
    let sFlagStr = mkFlag()
    let postData = mkPostData(sFlagStr)
    let oResult = await axios({
        url: Base.getDynUrl("frame/login.php"),
        method: "POST",
        data: postData,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    })
    onLoginEnd(oResult.data)
}
const onLoginEnd = (oLoginResult) => {
    console.log(oLoginResult)
    if (oLoginResult.error) {
        if ("true" === oLoginResult.vcode) {
            console.log(oLoginResult.vcode)
        } else {
            // $("#vcode_cnt").hide()
        }
        // showLoginError(oLoginResult.error)
    } else if (oLoginResult.changePswd) {
        Cookies.set("sessionid", oLoginResult.sessionid)
        Cookies.set("loginid", oLoginResult.loginid)
    } else if (oLoginResult.url) {
        Cookies.set(oLoginResult.sessionid, "true")
        Cookies.set("sessionid", oLoginResult.sessionid)
        Cookies.set("loginid", oLoginResult.loginid)
        // window.location = oLoginResult.url
        router.push({
            name: "DashBoard"
        })
    }
}
</script>

<style scoped>
#login {
    height: 100vh;
    background-color: #fff;
}
.login-bg {
    display: flex;
    width: 375px;
    height: 295px;
    background: url("../../frame/assets/img/img_login_bg.png") no-repeat;
    background-size: 375px 295px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.ic_logo {
    width: 141px;
    height: 61px;
    margin-top: -34px;
}
.logo-text {
    margin: 0;
}
.login-password {
    padding: 0 43px;
    margin-top: -27px;
}
.forget {
    font-size: 12px;
    color: #617cf0;
    text-align: right;
}

.forget-text {
    padding: 0 12px;
}
.forget-tips {
    font-weight: bold;
}
.forget-tips span {
    color: #ee0a24;
}
:deep(.van-dialog__header) {
    padding-top: 5px;
}
:deep(.van-button__text) {
    font-size: 18px;
}
.go-cloud {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    margin-top: 40px;
}
.go-cloud .ic_arrow {
    width: 12px;
    height: 12px;
}
</style>
