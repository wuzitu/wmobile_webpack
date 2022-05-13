<template>
    <div class="poe-port">
        <port-chart style="margin: 10px 10px 10px 10px" :bshowPoe="showPoe" :arrPortPos="arrPortPos" :aTestPorts="aTestPorts"></port-chart>
    </div>
</template>

<script setup>
import { defineProps, ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import PortChart from "./PortChart.vue"

const { t } = useI18n()
// const router = useRouter()
// console.log(router.params)
// const propsData = defineProps({ apName: String })
let showPoe = ref(true)

let arrPortPos = ref({
    port: [
        // [
        //     [1,2,3,4]
        // ],
        // [
        //     [5]
        // ]
        [
            [1, 3, 5, 7],
            [2, 4, 6, 8]
        ],
        [
            [9, 11, 13, 15],
            [10, 12, 14, 16]
        ],
        [
            [17, 19, 21, 23],
            [18, 20, 22, 24]
        ],
        [[], [25, 26]]
    ]
})

let aTestPorts = ref([
    { ifIndex: "1", ifName: "1", ifType: "1", Status: "0", PoeStatus: "1" },
    { ifIndex: "2", ifName: "2", ifType: "1", Status: "1", PoeStatus: "2" },
    { ifIndex: "3", ifName: "3", ifType: "1", Status: "2", PoeStatus: "0" },
    { ifIndex: "4", ifName: "4", ifType: "1", Status: "2", PoeStatus: "3" },
    { ifIndex: "5", ifName: "5", ifType: "1", Status: "1", PoeStatus: "3" },
    { ifIndex: "6", ifName: "6", ifType: "1", Status: "1", PoeStatus: "0" },
    { ifIndex: "7", ifName: "7", ifType: "1", Status: "2", PoeStatus: "0" },
    { ifIndex: "8", ifName: "8", ifType: "1", Status: "2", PoeStatus: "0" },
    { ifIndex: "9", ifName: "9", ifType: "1", Status: "1", PoeStatus: "4" },
    { ifIndex: "10", ifName: "10", ifType: "1", Status: "1", PoeStatus: "0" },
    { ifIndex: "11", ifName: "11", ifType: "1", Status: "1", PoeStatus: "1" },
    { ifIndex: "12", ifName: "12", ifType: "1", Status: "2", PoeStatus: "0" },
    { ifIndex: "13", ifName: "13", ifType: "1", Status: "0", PoeStatus: "0" },
    { ifIndex: "14", ifName: "14", ifType: "1", Status: "2", PoeStatus: "2" },
    { ifIndex: "15", ifName: "15", ifType: "1", Status: "2", PoeStatus: "0" },
    { ifIndex: "16", ifName: "16", ifType: "1", Status: "2", PoeStatus: "0" },
    { ifIndex: "17", ifName: "17", ifType: "1", Status: "1", PoeStatus: "4" },
    { ifIndex: "18", ifName: "18", ifType: "1", Status: "1", PoeStatus: "0" },
    { ifIndex: "19", ifName: "19", ifType: "1", Status: "1", PoeStatus: "5" },
    { ifIndex: "20", ifName: "20", ifType: "1", Status: "2", PoeStatus: "0" },
    { ifIndex: "21", ifName: "21", ifType: "1", Status: "2", PoeStatus: "0" },
    { ifIndex: "22", ifName: "22", ifType: "1", Status: "2", PoeStatus: "0" },
    { ifIndex: "23", ifName: "23", ifType: "1", Status: "2", PoeStatus: "0" },
    { ifIndex: "24", ifName: "24", ifType: "1", Status: "1", PoeStatus: "0" },
    { ifIndex: "25", ifName: "1", ifType: "2", Status: "2", PoeStatus: "0" },
    { ifIndex: "26", ifName: "2", ifType: "2", Status: "1", PoeStatus: "0" }
])
</script>

<style scoped>
.poe-port {
    width: 345px;
    height: auto;
    min-width: 345px;
    margin: 20px 10px 20px 10px;
}
</style>
