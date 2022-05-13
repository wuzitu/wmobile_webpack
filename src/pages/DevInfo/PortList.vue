<template>
    <div class="port-config">
        <box-title :titleName="sTitle"></box-title>
        <div class="port-list">
            <van-collapse v-model="activeNames" v-for="(port, index) in ports" :key="index" :change="changeCol(port)" accordion>
                <van-collapse-item :title="port.name + ' (' + aStatus[port.status] + ')'" :name="port.name" @click="collapseFun">
                    <template #right-icon>
                        <svg-icon class="ic_list_up" :icon-class="isUp ? 'ic_list_up' : 'ic_list_down'"></svg-icon>
                    </template>
                    <port-item :port="port" :model="sModel"></port-item>
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Collapse, CollapseItem } from "vant"
import BoxTitle from "@/components/BoxTitle"
import PortItem from "./PortItem"
import SvgIcon from "../../components/SvgIcon.vue"

const { t } = useI18n()

// const router = useRouter()
// console.log(router.params)
const activeNames = ref(0)
const props = defineProps({ portList: Array, title: String, model: String })
let ports = [...props.portList] || []
let sTitle = props.title
let sModel = ref(props.model)
let isUp = ref(true)
const aStatus = ["DOWN", "UP"]

let changeCol = (port, e) => {
    console.log(port.name)
}

let collapseFun = () => {
    isUp.value = !isUp.value
}
</script>

<style scoped>
.ic_list_up {
    width: 16px;
    height: 24px;
}
.port-config {
    width: 375px;
    height: auto;
    margin-top: 10px;
}
.port-list {
    width: 375px;
    height: auto;
}

.port-list :deep(.van-collapse-item__content) {
    background: #f7f7f7;
    padding: var(--van-collapse-item-content-padding) !important;
    margin: 0;
}
</style>
