<template>
	<div>
		<config-provider :theme-vars="themeVars">
			<Form>
				<van-cell-group>
					<box-title :titleName="RC('FTPtitle')"></box-title>
					<van-cell :title="RC('FTPtype')">
						<template #right-icon>
							<RadioGroup v-model="tftpData.tftpCheck" direction="horizontal">
								<Radio name="1">SFTP</Radio>
								<Radio name="2">FTP</Radio>
							</RadioGroup>
						</template>
					</van-cell>

					<Field v-model="tftpData.tftpServer" name="tftpServer" type="text" :label="RC('FTPserve')"
						:rules="[{ validator:validatorIP, trigger: 'onChange', label: 'tftpServer'}]"
						:error-message="errorMsg.tftpServer"
						:placeholder="RC('serveTips')" required />
					<Field v-model="tftpData.tftpName" name="tftpName" type="text" :label="RC('FTPUname')"
						:rules="[{ validator:validatorName, trigger: 'onChange', label: 'tftpName'}]"
						:error-message="errorMsg.tftpName"
						:placeholder="RC('unameTips')" required />
					<Field v-model="tftpData.tftpPass" name="tftpPass" type="text" :label="RC('FTPPass')"
						:rules="[{ validator:validatorNull, trigger: 'onChange', label: 'tftpPass' }]"
						:error-message="errorMsg.tftpPass"
						:placeholder="RC('passTips')" required />
					<Field v-model="tftpData.tftpVpn" name="tftpVpn" type="text" :label="RC('VPN')"
						:rules="[{ validator:validatorNull, trigger: 'onChange', label: 'tftpVpn'}]"
						:error-message="errorMsg.tftpVpn"
						:placeholder="RC('vpnTips')" required />
					<Field v-model="tftpData.tftpPath" name="tftpPath" type="text" :label="RC('FTPwork')"
						:rules="[{ validator:validatorNull, trigger: 'onChange', label: 'tftpPath'}]"
						:error-message="errorMsg.tftpPath"
						:placeholder="RC('FTPworkTips')" required />
				</van-cell-group>
			</Form>
		</config-provider>
		<BottomButtonVue @submit="onSubmit" />
	</div>
</template>

<script setup>
import BoxTitle from "../../components/BoxTitle.vue"
import BottomButtonVue from "./BottomButton.vue"
import { ConfigProvider, Field, Form, RadioGroup, Radio } from "vant"
import { useI18n } from "vue-i18n"
import { defineEmits, ref } from "vue"
import test from "../../frame/utils/InterfaceType/test"
const { t } = useI18n()
let RC = (str) => {
    return t("SystemMenu.tftp." + str)
}
const tftpData = ref({
    tftpCheck: "1",
    tftpServer: "",
    tftpName: "",
    tftpPass: "",
    tftpVpn: "",
    tftpPath: ""
})
const errorMsg = ref({
    tftpName:"",
    tftpServer:"",
    tftpPass:"",
    tftpVpn:"",
    tftpPath:""
})
const themeVars = {
    cellGroupTitleColor: "#999999",
    cellValueColor: "#666666",
    filedInputTextColor: "#999999",
    cellTextColor: "#666666",
}
const emit = defineEmits(["submit"])

const onSubmit = () => {
    let flags = true
    for(let item in tftpData.value){
        let checkResult = validatorNull(tftpData.value[item],item)
        checkResult == false ? flags = false : ""
    }
    emit("submit", { tftpData: tftpData.value ,flags: flags})
}

const validatorNull = (val,r) => {
    if(typeof(r) == "string"){
        if(/\s/.test(val) || val == ""){
            errorMsg.value[r] = "内容不能为空"
            return false
        }
    }else{
        let label = r.label
        if(/\s/.test(val)){
            errorMsg.value[label] = "内容不能为空"
        }else{
            errorMsg.value[label] = ""
        }
    }
}

const validatorName = (val,r) => {
    let reg = /[|:*?,@/\\<>[\]\s]/gi
    if(!reg.test(val) && val != "a" && val != "al" && val != "all" && val.length < 56) {
        errorMsg.value[r.label] = ""
    }else{
        errorMsg.value[r.label] = "不能包含,|,/,:,*,?,<,>,@,且不能是空,a,al,all"
    }
}
const validatorIP = (val,r) => {
    let reg = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.((1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.){2}(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/
    if(reg.test(val)){
        errorMsg.value[r.label] = ""
    }else{
        errorMsg.value[r.label] = "请输入正确的ip地址"
    }
}
</script>

<style scoped>
</style>
