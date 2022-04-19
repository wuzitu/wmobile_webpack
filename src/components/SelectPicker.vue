<template>
    <div class="select-box" @click="showPicker">
        <div class="selector">
            <span class="selected-val">{{ props.selected }}</span>
            <svg-icon class="ic_arrow_down" icon-class="ic_arrow_down"></svg-icon>
        </div>
    </div>
    <popup v-model:show="show" position="bottom">
        <picker
            :columns="props.columns"
            :default-index="selectedIndex"
            :confirm-button-text="RC('Apply')"
            :cancel-button-text="RC('Cancel')"
            @confirm="onConfirm"
            @cancel="onCancel"
        ></picker>
    </popup>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { Popup, Picker } from "vant"

// i18n
const { t } = useI18n()
const RC = (str) => {
    return t(str)
}

// props value
const props = defineProps({
    selected: {
        type: String,
        default: ""
    },
    columns: {
        type: Array,
        default: () => []
    }
})
const selectedIndex = props.columns.indexOf(props.selected)

// selectPicker method
const show = ref(false)
const showPicker = () => {
    show.value = true
}
const emit = defineEmits(["changeSelected"])
const onConfirm = (value) => {
    emit("changeSelected", value)
    show.value = false
}
const onCancel = () => {
    show.value = false
}
</script>

<style scoped>
    .select-box .selector {
        display: flex;
        height: 45px;
        border: 1px solid #9e9e9e;
        border-radius: 4px;
        padding: 0 9px 0 11px;
        align-items: center;
        justify-content: space-between;
    }
    .select-box .selected-val {
        line-height: 45px;
        color: #333;
    }
    .select-box .ic_arrow_down {
        width: 12px;
        height: 12px;
    }
</style>