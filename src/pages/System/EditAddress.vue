<template>
	<div>
		<van-config-provider :theme-vars="themeVars">
			<Form @submit="onSubmit">
				<van-cell-group title="修改管理地址">
					<div class="manageTitle">
						<span class="manageTitleText">管理地址</span>
					</div>
					<van-cell title="旧地址" value="wlan.h3c.com"></van-cell>
					<Field
						v-model="newAddress"
						name="newAddress"
						type="text"
						label="新地址"
						placeholder="请输入新的管理地址"
						required
					/>
				</van-cell-group>
			</Form>
			<div class="buttonGroup">
				<van-button round color="#617CF0" plain class="buttonStyle" @click="cancel">取消</van-button>
				<van-button
					round
					block
					color="#617CF0"
					type="primary"
					class="buttonStyle"
					native-type="submit"
				>确认</van-button>
			</div>
		</van-config-provider>
	</div>
</template>

<script setup>
import { Field, Form } from "vant"
import {defineEmits} from 'vue'
const emit = defineEmits()
const onSubmit = (v) => {
	console.log(v)
	emit('submitAddress','v')
}
const themeVars = {
	cellGroupTitleColor: "#666666",
	cellValueColor: "#666666",
	filedInputTextColor: "#999999"
}

const cancel = (()=>{
	history.back(-1)
})
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
