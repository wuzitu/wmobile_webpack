<template>
    <div class="poe-port">
      <port-chart></port-chart>
    </div>
</template>

<script setup>
import { defineProps } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import PortChart from "./PortChart.vue"

const { t } = useI18n()

// const router = useRouter()
// console.log(router.params)
// const propsData = defineProps({ apName: String })
</script>

<style scoped>
.poe-port {
  width: 375px;
  height: auto;
}

</style>
