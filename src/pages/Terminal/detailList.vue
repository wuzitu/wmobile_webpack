<template>
    <div class="detailList">
        <van-cell :title="val" v-for="(key, val) in listData">
            <router-link v-if="typeof key === 'object'" :to="key.url" class="linkStyle">{{ key.name }}</router-link>
            <span v-else>{{ key }}</span>
        </van-cell>
        <!-- <van-cell :title="item" v-for="item in listTitle"></van-cell> -->
    </div>
</template>

<script setup>
import { defineProps, onMounted } from "vue"
import { Cell } from "vant"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
// const titleValue = ref(t("Terminal.terminalName"))

// const listTitle = [t("Terminal.terminalName")]
// const listTitle = [...[t("Terminal.TerminalDetailList")]]
const listDatas = defineProps({
    listData: Object
    // listTitle: Array
})
</script>

<style scoped>
.detailList .linkStyle {
    color: #617cf0 !important;
}
</style>

<style>
.detailList .van-cell {
    padding: 0 !important;
    height: 50px !important;
    width: 375px !important;
    border-bottom: 1px solid #d8d8d8;
}
.detailList .van-cell__title {
    width: 98px !important;
    height: 50px !important;
    background-color: #f9f9f9 !important;
    padding-left: 16px;
}
.detailList .van-cell__value {
    width: 261px !important;
    height: 50px !important;
    text-align: left !important;
    margin-left: 10px;
    color: #666666 !important;
}
.detailList .van-cell__title,
.detailList .van-cell__value {
    flex-basis: auto !important;
    line-height: 50px !important;
}
</style>
