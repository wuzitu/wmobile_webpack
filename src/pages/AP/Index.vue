<template>
    <div>this is an AP page.</div>
    <ap-chart chartName="Ap-Chart!"></ap-chart>
    <ap-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item" :title="item" @click="goDetail(item)" />
    </ap-list>
</template>

<script setup>
import { ref } from "vue"
import ApChart from "./ApChart.vue"
import { List as ApList } from "vant"
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()
const goDetail = (item) => {
    pushWithQuery(item)
}
function pushWithQuery(query) {
    router.push({
        path: `/DevInfo/AP/${query}`,
        query: {
            ...route.query
        }
    })
}
const list = ref([])
list.value.push(1, 2, 3, 4, 5)
</script>
