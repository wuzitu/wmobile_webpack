<template>
    <div class="port-config">
        <box-title :titleName="sTitle"></box-title>
        <div class="port-list">
            <van-collapse v-model="activeNames" v-for="(port,index) in ports" :key="index" :change="changeCol(port)" accordion>
                <van-collapse-item  :title="port.name+' ('+ aStatus[port.status] +')'" :name="port.name">
                    <port-item :port="port" :model="sModel"></port-item>
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>

<script setup>
import { defineProps ,ref,computed} from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Collapse, CollapseItem } from "vant"
import BoxTitle from "@/components/BoxTitle"
import PortItem from "./PortItem"

const { t } = useI18n()

// const router = useRouter()
// console.log(router.params)
const activeNames = ref(0)
const props = defineProps({ portList:Array ,title:String ,model:String })
let ports = [...props.portList] || []
let sTitle = props.title
let sModel = ref(props.model)
const aStatus = ["DOWN","UP"]

let changeCol = (port,e) => {
    console.log(port.name)
}
</script>

<style scoped>
  .port-config {
      width: 375px;
      height: auto;
      margin-top: 8px;
  }
  .port-list {
      width: 375px;
      height: auto;
  }
</style>
