<template>
    <field
        v-model="passwordValue"
        :type="passwordType"
        :label="props.label"
        :placeholder="props.placeholder"
        :right-icon="passwordEye"
        :required="props.required"
        :error-message="props.errorMessage"
        @click-right-icon="inputTypeSwitch"
        @update:model-value="onUpdate"
    >
        <template #left-icon>
            <svg-icon v-show="props.leftIcon" class="ic_login_key" icon-class="ic_login_key"></svg-icon>
        </template>
    </field>
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
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: true
    },
    errorMessage: {
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

<style scoped>
    .ic_login_key {
        width: 18px;
        height: 18px;
        vertical-align: -3px;
    }
    :deep(.van-field__left-icon) {
        margin-right: 0;
    }
</style>