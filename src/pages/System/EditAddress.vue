<template>
	<div>
		<config-provider :theme-vars="themeVars">
			<Form>
				<van-cell-group :title="RC('addrTitle')">
					<box-title :titleName="RC('deviceTitle')"></box-title>
					<van-cell :title="RC('oldAddr')" value="wlan.h3c.com"></van-cell>
					<Field
						v-model="addrValue"
						name="addrValue"
						type="text"
						:label="RC('newAddr')"
						:placeholder="RC('addrPlaceholder')"
						required
					/>
				</van-cell-group>
			</Form>
		</config-provider>
		<BottomButtonVue @submit="onSubmit"/>
	</div>
</template>

<script setup>
import { Field, Form ,ConfigProvider } from "vant"
import { defineEmits,ref } from "vue"
import BoxTitle from "../../components/BoxTitle.vue"
import BottomButtonVue from "./BottomButton.vue"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
let RC = (str) => {
    return t("SystemMenu.addrManage." + str)
}
let addrValue = ref("")
const emit = defineEmits()
const onSubmit = () => {
    emit("submit",addrValue.value)
}
const themeVars = {
    cellGroupTitleColor: "#666666",
    cellValueColor: "#666666",
    filedInputTextColor: "#999999"
}

</script>

<style scoped>

</style>
