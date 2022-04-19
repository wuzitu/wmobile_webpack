<template>
	<div>
		<config-provider :theme-vars="themeVars">
			<Form @submit="onSubmit">
				<van-cell-group title="文件服务器设置文件服务器设置文件服务器设置文件服务器设置">
					<div class="manageTitle">
						<span class="manageTitleText">文件服务器设置</span>
					</div>
					<van-cell title="文件服务器类型">
						<template #right-icon>
							<RadioGroup v-model="checked" direction="horizontal">
								<Radio name="1">SFTP</Radio>
								<Radio name="2">FTP</Radio>
							</RadioGroup>
						</template>
					</van-cell>

					<Field
						v-model="newAddress"
						name="newAddress"
						type="text"
						label="FTP服务:"
						placeholder="请输入新的管理地址"
						required
					/>
					<Field
						v-model="newAddress"
						name="newAddress"
						type="text"
						label="FTP用户名:"
						placeholder="请输入新的管理地址"
						required
					/>
					<Field
						v-model="newAddress"
						name="newAddress"
						type="text"
						label="FTP密码:"
						placeholder="请输入新的管理地址"
						required
					/>
					<Field
						v-model="newAddress"
						name="newAddress"
						type="text"
						label="VPN:"
						placeholder="请输入新的管理地址"
						required
					/>
					<Field
						v-model="newAddress"
						name="newAddress"
						type="text"
						label="工作路径:"
						placeholder="请输入新的管理地址"
						required
					/>
				</van-cell-group>
			</Form>
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
		</config-provider>
	</div>
</template>

<script setup>
import { ConfigProvider, Field, Form, RadioGroup, Radio } from "vant";
const onSubmit = (v) => {
	console.log(v)
}
const themeVars = {
	cellGroupTitleColor: "#999999",
	cellValueColor: "#666666",
	filedInputTextColor: "#999999",
	cellTextColor: "#666666",
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
