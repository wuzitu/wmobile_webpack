<template>
    <div class="box-title">
        <span class="box-span" v-if="props.titleName">{{ props.titleName }}</span>
        <slot></slot>
    </div>
</template>

<script setup>
const props = defineProps({
    titleName: String
})
</script>

<style scoped>
    .box-title{
        width: 100%;
        height: 44px;
        line-height: 44px;
        position: relative;
        color: #333;
        background: #fff;
        border-bottom: 1px solid #d8d8d8;
    }
    .box-title::before {
        content: "";
        display: block;
        position: absolute;
        width: 4px;
        height: 12px;
        top: 50%;
        transform: translate(0, -50%);
        background: #617cf0;
    }
    .box-span{
        margin-left: 15px;
        display: inline-block;
    }
</style>