<template>
    <div class="bottomButtonWrap">
        <div class="seizeASeat"></div>
        <div class="bottomButtonFixed">
            <van-button @click="cancel" class="bottombuttonStyle">{{$t('Cancel')}}</van-button>
            <van-button color="#617CF0" type="primary" @click="onSubmit" class="bottombuttonStyle">{{$t('Apply')}}</van-button>
        </div>
    </div>
</template>

<script setup>
import { defineProps,defineEmits } from "vue"
const emit = defineEmits(["submit","cancel"])
const cancelType = defineProps({
    cancelType: String
})
const cancel = () => {
    if(cancelType == "custom"){
        emit("cancel")
    }else{
        history.back(-1)
    }
}
const onSubmit = () => {
    emit("submit")
}
</script>
<style scoped>
.bottomButtonWrap{
    position: relative;
}
.bottomButtonFixed{
    position: fixed;
    width: 100%;
    display: flex;
    align-items: center;
    bottom: 0;

}
.seizeASeat{
    content: "";
    width: 100%;
    height: 55px;
}
.bottombuttonStyle{
    flex: 1;
}
</style>