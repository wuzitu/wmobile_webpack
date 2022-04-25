<template>
    <div class="dhcp-card">
        <van-sticky :offset-top="38">
            <div class="deviceHeader">
                <span>{{ t("Vlan.dhcpClient") }}</span>
                <Search class="searchStyle" v-model="value" left-icon="none" placeholder="请输入IP地址、MAC地址" />
                <svg-icon icon-class="ic_search" class="iconRight"></svg-icon>
            </div>
        </van-sticky>
        <div class="dev-block">
            <van-collapse v-model="activeName" accordion>
                <van-collapse-item :title="'IP地址：'+item.ip"  v-for="item in dhcpList" :key="item.mac">
                    <van-cell title="MAC地址" :value="item.mac" />
                    <van-cell title="过期时间" :value="item.expirationTime" />
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { Search } from "vant"

const { t } = useI18n()
const activeName = ref('1')

let dhcpList = [
    {
        ip:"192.168.0.1/24",
        mac:"0000-0000-0001",
        expirationTime:"2022-04-18 16:00:00"
    },
    {
        ip:"192.168.0.2/24",
        mac:"0000-0000-0002",
        expirationTime:"2022-04-19 16:00:00"
    },{
        ip:"192.168.0.3/24",
        mac:"0000-0000-0003",
        expirationTime:"2022-04-20 16:00:00"
    },
    {
        ip:"192.168.0.4/24",
        mac:"0000-0000-0004",
        expirationTime:"2022-04-21 16:00:00"
    },
    {
        ip:"192.168.0.5/24",
        mac:"0000-0000-0005",
        expirationTime:"2022-04-22 16:00:00"
    }
]
</script>

<style scoped>
.dhcp-card{
    margin-top: -55px;
}
.deviceHeader {
    padding-right: 10px;
    background: #ffffff;
    border-bottom: 1px solid #f2f3f5;
    position: relative;
    display: flex;
    align-items: center;
}

.deviceHeader span {
    padding-left: 15px;
    color: #333333;
    font-family: "Microsoft YaHei";
}

.deviceHeader::before {
    content: "";
    display: block;
    position: absolute;
    width: 4px;
    height: 12px;
    top: 50%;
    transform: translate(0, -50%);
    background: #617cf0;
}

.dev-block {
    margin-bottom: 60px;
}

.searchStyle {
    flex: 1;
}

.iconRight {
    width: 14px;
    height: 14px;
}

</style>
