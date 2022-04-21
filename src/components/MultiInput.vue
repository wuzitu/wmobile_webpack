<template>
    <div class="multi-input">
        <div class="input-config" v-if="props.maxCount > 0">
            <label class="input-label"><span class="required" v-show="props.required"></span>{{ props.label }}</label>
            <div class="input-list">
                <div class="input-item" v-for="(item, index) in valueList" :key="index">
                    <field
                        v-model="valueList[index]"
                        :border="false"
                        :placeholder="props.placeholder"
                        :required="props.required"
                    ></field>
                    <svg-icon
                        :class="index==0?'input-add ic_addvlan':'input-remove ic_deleteDNS'"
                        :icon-class="index==0?'ic_addvlan':'ic_deleteDNS'"
                        @click="multiInput(index)"
                    ></svg-icon>
                </div>
            </div>
        </div>
        <div class="border-bottom" v-show="props.border"></div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { Field, Toast } from "vant"

const props = defineProps({
    label: {
        type: String,
        default: ""
    },
    dataList: {
        type: Array,
        default: () => [""]
    },
    placeholder: {
        type: String,
        default: ""
    },
    maxCount: {
        type: Number,
        default: 0
    },
    maxToast: {
        type: String,
        default: ""
    },
    required: {
        type: Boolean,
        default: false
    },
    border: {
        type: Boolean,
        default: true
    }
})

const valueList = ref(props.dataList)

const multiInput = (index) => {
    if (index == 0) {
        if (valueList.value.length == props.maxCount) {
            Toast(props.maxToast)
        } else {
            valueList.value.push("")
        }
    } else {
        valueList.value.splice(index, 1)
    }
}

const returnData = () => {
    let data = JSON.parse(JSON.stringify(valueList.value))
    data.map((val, i) => {
        if (val == "") {
            data.splice(i, 1)
        }
    })

    return data
}

defineExpose({
    returnData
})
</script>

<style scoped>
    .multi-input {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .input-config {
        display: flex;
        align-items: baseline;
    }
    .input-label {
        width: 71px;
        color: #333;
        padding-left: 6px;
    }
    .required::before {
        margin-right: 0.53333vw;
        color: var(--van-field-required-mark-color);
        content: "*";
    }
    .input-item {
        display: flex;
        align-items: center;
    }
    .input-add, .input-remove {
        width: 16px;
        height: 16px;
    }
    .border-bottom {
        width: 91%;
        height: 0;
        border-bottom: 1px solid var(--van-border-color);;
    }
</style>