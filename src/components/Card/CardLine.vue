<template>
    <div class="sectionCardLineWrap">
        <slot></slot>
    </div>
</template>
<script setup>
</script>
<style>
.sectionCardLineWrap .lineSpan:nth-child(1)::before{
    content: "";
    margin-left: 0;
}
.sectionCardLineWrap .lineSpan:nth-child(1){
    margin-left: 0;
    width: 100%;
}
.sectionCardLineWrap{
    margin: 5px 0;
}
</style>