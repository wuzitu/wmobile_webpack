<template>
    <div>
       <box-title :titleName="RC('historyData')"></box-title>
        <div class="dev-block">
      <div class="dev-block">
        <Tabs v-model:active="active" swipeable color="#617CF0" line-width="115" @change="tabChange">
          <Tab v-for="(item, index) in cardMenu" :title="RC(item.title)" :key="'menu' + index" >
          </Tab>
        </Tabs>
      </div>
      </div>
    <TerminalHistory v-if="active == 1"></TerminalHistory>
	<FlowHistory v-if="active == 2"></FlowHistory>
	<APHistory v-if="active == 0"></APHistory>
    </div>
</template>
<script setup>
import { ref } from "vue"
import BoxTitle from "@/components/BoxTitle.vue"
import APHistory from "@/pages/History/APHistory.vue"
import TerminalHistory from "./TerminalHistory.vue"
import FlowHistory from "./FlowHistory.vue"
import { Tab, Tabs, Sticky} from "vant"
import { useI18n } from "vue-i18n"
const active = ref("")
console.log(active)
const { t } = useI18n()
let RC = (str) => {
    return t("History." + str)
}
const cardMenu = ref([
    {
        title: "AP"
    }, {
        title: "terminal"
    }, {
        title: "flow"
    }
])
const tabChange = () => {
}
</script>
<style scoped>

</style>