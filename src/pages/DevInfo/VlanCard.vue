<template>
<van-config-provider :theme-vars="themeVars">
    <div class="vlanHeader">
      <span>{{ t("DevInfo.vlanlist") }}</span>
      <van-Search class="searchStyle" v-model="value" left-icon="none" :placeholder="t('DevInfo.pleaseinputvlan')" />
      <svg-icon icon-class="ic_search" class="iconRight"></svg-icon>
    </div>

    <div class="vlanCardWrap" v-for="(vlanInfoListItem, index) in vlanInfoList" :key="'vlan' + index">
        <vlan-list :vlanData="vlanInfoListItem" />
    </div>

    <router-link to="/AddVLAN" >
        <div class="add-vlan">
            <svg-icon icon-class="ic_addvlan" class="add-vlan-icon"></svg-icon>
            <span class="add-vlan-title">{{ t('DevInfo.addvlan') }}</span>
        </div>
    </router-link>
 </van-config-provider>
</template>

<script setup>
import { defineStore } from "pinia"
import { ref, getCurrentInstance, provide } from "vue"
import { useI18n } from "vue-i18n"
import BoxTitle from "../../components/BoxTitle"
import VlanList from "./VlanList"
import { Switch, Toast, Dialog } from "vant"

const { t } = useI18n()

const checked = ref(true)
const vlanInfoList = ref([
    {
        backup: "默认VLAN",
        passwd: "有",
        vlanId: "1"
    },
    {
        backup: "用户VLAN",
        passwd: "无",
        vlanId: "10"
    },

    {
        backup: "访客VLAN",
        passwd: "有",
        vlanId: "100"
    }
])

const intelligentOptimization = (value) => {
    console.log(value)
    const status = value ? t("Wireless.open") : t("Wireless.close")
    Toast.success(status)
}

</script >

<style scope>
.vlanHeader {
    padding-right: 10px;
    background: #ffffff;
    border-bottom: 1px solid #f2f3f5;
    position: relative;
    display: flex;
    align-items: center;
}

.vlanHeader span {
    padding-left: 15px;
    color: #333333;
    font-family: "Microsoft YaHei";
}

.vlanHeader::before {
    content: "";
    display: block;
    position: absolute;
    width: 4px;
    height: 12px;
    top: 50%;
    transform: translate(0, -50%);
    background: #617cf0;
}
.searchStyle {
    flex: 1;
}
.iconRight {
    width: 14px;
    height: 14px;
}

.vlanCardWrap {
    margin-top: 8px;
    display: flex;
    padding: 0 15px;
}


.rightIcon {
    width: 12px;
    height: 12px;
    vertical-align: middle;
}

.add-vlan-icon{
    width: 16px;
    height: 16px;
    vertical-align: middle;
}
.vlan-list{
    margin-top: 10px;
}

.vlanCardWrap {
    margin-top: 8px;
    display: flex;
    padding: 0 15px;
}

.vlan-describe{
    width: 344px;
    height: 33px;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    line-height: 19px;
    padding-left: 15px;
    padding-right: 15px;
}

.header-title {
    float: right;
    padding-right: 10px;
    color: #666666;
}
.add-vlan{
    width: 100px;
    height: 30px;
    margin: 0 auto;
    margin-top: 22px;
    text-align: center;
    line-height: 30px;
}
.add-vlan-title{
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #F43E3B;
    padding-left: 9px;
}
</style>
