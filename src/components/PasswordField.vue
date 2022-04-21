<template>
    <field
        v-model="passwordValue"
        :type="passwordType"
        :label="props.label"
        :placeholder="props.placeholder"
        :left-icon="leftIcon"
        :right-icon="passwordEye"
        @click-right-icon="inputTypeSwitch"
        @update:model-value="onUpdate"
        required
    ></field>
</template>

<script setup>
import { ref } from "vue"
import { Field } from "vant"
const passwordType = ref("password")
const passwordEye = ref("eye-o")

const inputTypeSwitch = () => {
    if (passwordType.value == "password") {
        passwordType.value = "text"
        passwordEye.value = "closed-eye"
    } else {
        passwordType.value = "password"
        passwordEye.value = "eye-o"
    }
}

const props = defineProps({
    password: {
        type: String,
        default: ""
    },
    label: {
        type: String,
        default: ""
    },
    placeholder: {
        type: String,
        default: ""
    },
    leftIcon: {
        type: String,
        default: ""
    }
})

const passwordValue = props.password

const emit = defineEmits(["changePassword"])
const onUpdate = (value) => {
    emit("changePassword", value)
}
</script>