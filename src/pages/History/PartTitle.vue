<template>
    <div class="part-title">
        <span class="part-span" v-if="props.titleName">{{ props.titleName }}</span>
        <slot></slot>
    </div>
</template>

<script setup>
const props = defineProps({
    titleName: String
})
</script>

<style scoped>
    .part-title{
        width: 100%;
        height: 44px;
        line-height: 44px;
        position: relative;
        color: #333;
        background: #fff;
        border-top: 1px solid #d8d8d8;
        border-bottom: 1px solid #d8d8d8;
    }
    .part-title::before {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 15px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #617cf0;
    }
    .part-span{
        margin-left: 25px;
        display: inline-block;
    }
</style>