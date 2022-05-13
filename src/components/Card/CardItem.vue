<template>
    <span class="lineSpan" :class="ellipsis">{{ labels }}<slot></slot></span>
</template>
<script setup>
import { defineProps,toRef } from "vue"
const label = defineProps({
    label: String,
    ellipsis: Boolean
})
const labels = toRef(label, "label")

</script>
<style scoped>
    .lineSpan::before {
        content: '|';
        position: relative;
        left: -5px;
        color: #999999;
    }
    .lineSpan {
        margin: 0 5px;
        color: #666666;
        font-size: 14px;
    }
</style>