<template>
    <span class="drop">
        <span @click="ondropControl">{{ seletctedVal }}</span>
        <svg-icon :icon-class="icontoggle" class="icondown" @click="ondropControl"></svg-icon>
        <div :class="controlList" class="listSty">
            <div v-for="(item, index) in selectOptions" @click="selectDrop(item, index)" :class="item == seletctedVal ? 'selected' : 'noselected'">{{ item }}</div>
        </div>
    </span>
</template>
<script setup>
import { ref } from "vue"
import { defineProps } from "vue"
let oPropData = defineProps({ selectOptions: Array, index_AP: Number })
let selectOptions = oPropData.selectOptions
let icontoggle = ref("ic_list_down")
let seletctedVal = ref(selectOptions[0])
let controlList = ref("hide")
const ondropControl = () => {
    if (controlList.value == "hide") {
        controlList.value = "show"
        icontoggle.value = "ic_list_up"
    } else {
        controlList.value = "hide"
        icontoggle.value = "ic_list_down"
    }
}
const emit = defineEmits(["changeSelect"])
const selectDrop = (item, index) => {
    seletctedVal.value = item
    controlList.value = "hide"
    icontoggle.value = "ic_list_down"
    let changeSelectInfo = [oPropData.index_AP, index] //返回Ap下标,选中radio下标
    emit("changeSelect", changeSelectInfo)
}
</script>
<style scope>
.selected {
    display: none;
}
.icondown {
    width: 14px;
    height: 14px;
}
.hide {
    display: none;
}
.show {
    display: block;
}
.drop {
    position: relative;
    height: 44px;
}
.listSty {
    position: absolute;
    /* top: 30px; */
    left: 0px;
    z-index: 10;
    background: #fff;
    border: 1px solid #f7f7f7;
}
.listSty > div {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #f7f7f7;
}
</style>
