<template>
     <div class="content">
        <van-sticky :offset-top="38">
           <div class="vlanHeader">
                <span>{{ t("Vlan.vlanListTitle") }}</span>
                <Search class="searchStyle" v-model="value" left-icon="none" placeholder="请输入VLAN ID(1-4094)" />
                <svg-icon icon-class="ic_search" class="iconRight"></svg-icon>
            </div>
             <p class="vlan-describe">{{ t("Vlan.describe") }}</p>
             <div class="vlanCardWrap" v-for="(vlanInfoListItem, index) in vlanInfoList" :key="'vlan' + index">
                <vlan-list :vlanData="vlanInfoListItem" />
            </div>
             <router-link to="/AddWifi">
                <div class="add-vlan">
                    <svg-icon icon-class="ic_addvlan" class="add-vlan-icon"></svg-icon>
                    <span class="add-vlan-title">{{ t("Vlan.addVlan") }}</span>
                </div>
            </router-link>
        </van-sticky>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { Search } from "vant"
import vlanList from "./VlanList"

const { t } = useI18n()
const vlanInfoList = ref([
    {
        id: "1",
        remarks: "默认VLAN",
        ip: "1.1.1.1/24",
        addressAssignment: "50%"
    },
    {
        id: "2",
        remarks: "用户VLAN",
        ip: "1.1.1.2/24",
        addressAssignment: "15%"
    },
    {
        id: "3",
        remarks: "访客VLAN",
        ip: "1.1.1.3/24",
        addressAssignment: "20%"
    }
])
</script>
<style scoped>
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

.vlan-describe {
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
.add-vlan-icon {
    width: 16px;
    height: 16px;
    vertical-align: middle;
}
.add-vlan-icon {
    width: 16px;
    height: 16px;
    vertical-align: middle;
}
.add-vlan-title {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #f43e3b;
    padding-left: 9px;
}
.add-vlan {
    width: 100px;
    height: 30px;
    margin: 0 auto;
    margin-top: 22px;
    text-align: center;
    line-height: 30px;
}
</style>
