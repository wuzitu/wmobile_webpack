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
						:placeholder="RC('serveTips')" required />
					<Field v-model="tftpData.tftpName" name="tftpName" type="text" :label="RC('FTPUname')"
						:placeholder="RC('unameTips')" required />
					<Field v-model="tftpData.tftpPass" name="tftpPass" type="text" :label="RC('FTPPass')"
						:placeholder="RC('passTips')" required />
					<Field v-model="tftpData.tftpVpn" name="tftpVpn" type="text" :label="RC('VPN')"
						:placeholder="RC('vpnTips')" required />
					<Field v-model="tftpData.tftpPath" name="tftpPath" type="text" :label="RC('FTPwork')"
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
const themeVars = {
    cellGroupTitleColor: "#999999",
    cellValueColor: "#666666",
    filedInputTextColor: "#999999",
    cellTextColor: "#666666",
}
const emit = defineEmits(["submit"])
const onSubmit = () => {
    emit("submit", { tftpData: tftpData.value })
}
</script>

<style scoped>
</style>
