<template>
    <div class="cloudNet">
        <svg-icon icon-class="ic_logo_cloudnet" class="logoHeader"></svg-icon>
        <div class="inputGroup">
            <van-cell-group inset>
                <van-cell>
                    <template #title>
                        <div class="inputPosition">
                            <svg-icon icon-class="ic_login_id" class="iconLeft"></svg-icon>
                            <Field v-model="userData.userName" :placeholder="RC('login')" />
                        </div>
                    </template>
                </van-cell>
                <van-cell>
                    <template #title>
                        <div class="inputPosition">
                            <svg-icon icon-class="ic_login_key" class="iconLeft"></svg-icon>
                            <Field v-model="userData.userPwd" :type="userData.leftIcon ? 'password' : 'text'" :placeholder="RC('pass')" :border="false" />
                        </div>
                    </template>
                    <template #right-icon>
                        <svg-icon :icon-class="userData.leftIcon ? 'ic_login_invisible' : 'ic_login_visible'" @click="pwdHidden" class="iconRight"></svg-icon>
                    </template>
                </van-cell>
                <van-cell>
                    <template #title>
                        <div class="inputPosition">
                            <svg-icon icon-class="ic_login_address" class="iconLeft"></svg-icon>
                            <Field v-model="userData.address" placeholder="AutoNet"/>
                        </div>
                    </template>
                </van-cell>
                <p class="addressTips">您的设备将会被注册到默认分支的{{textAddress}}场所</p>
                <van-cell></van-cell>
            </van-cell-group>
        </div>
        <van-button round color="#617CF0" class="loginButton" @click="loginFun">{{ RC("LoginOasis") }}</van-button>
        <router-link to="/connectCloudNet/cloudRegister" @click="menuClick" class="toRegister">
            {{ RC("registerTips") }}
            <svg-icon icon-class="ic_arrow_blue" class="jiantou"></svg-icon>
        </router-link>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { Field ,Toast } from "vant"
import { ref ,computed } from "vue"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
let RC = (str) => {
    return t("ConnectCloudNet.CloudLogin." + str)
}
// let str4545 = "g5555dhujsahah"
// let a = /(?=.{6,32})(^\w)(?=\w\d+)/.test(str4545)
// console.log(a)
const router = useRouter()
const userData = ref({
    userName:"",
    userPwd:"",
    leftIcon:true,
    address:""
})
const pwdHidden = () => { userData.value.leftIcon = !userData.value.leftIcon }
const loginFun = () => {
    const toast = Toast.loading({
        duration: 0,
        forbidClick: true,
        message: "一键上云中",
    })
    // let second = 3
    // const timer = setInterval(() => {
    //     second--
    //     if (!second) {
    //         clearInterval(timer)
    //         Toast.clear()
    //         router.push("/connectCloudNet/cloudConfirm")
    //     }
    // }, 1000)
}
let textAddress = computed(() => {
    let addr = userData.value.address ? userData.value.address : "AutoNet"
    return addr
})
</script>

<style scoped>
.cloudNet {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -45px;
    background: #ffffff;
    justify-content: center;
}

.inputGroup {
    width: 340px;
    margin: 20px 0;
}

.inputPosition {
    display: flex;
    align-items: center;
}

.logoHeader {
    height: 50px;
    width: 180px;
}

.iconLeft,
.iconRight {
    height: 18px;
    width: 18px;
}

.iconRight {
    margin-top: 15px;
}

.loginButton {
    width: 290px;
    height: 50px;
    margin-bottom: 40px;
    font-size: 18px;
}
.toRegister{
    color: #617CF0;
    font-size: 14px;
    display: flex;
    align-items: center;
}
.jiantou{
    width: 14px;
    height: 14px;
}

.addressTips{
    font-size: 12px;
    text-align: center;
    color: #F43E3B;
    margin: 5px 0 0 0;
}
</style>