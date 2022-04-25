<template>
     <div class="content">
        <Online ref="initNetwork"></Online>
        <van-cell center :title="t('Network.customMTU')">
            <template #right-icon>
                <Switch v-model="checked" size="24" />
            </template>
        </van-cell>
        <div class="custom-mtu" v-if="checked">
            <field placeholder="46-1560"></field>
        </div>
    </div>
    <div class="button-box">
         <van-button type="primary" color="#617CF0" @click="initSubmit">{{ t("Apply") }}</van-button>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import Online from "./Online"
import { Switch, Toast, Dialog, Field} from "vant"

const { t } = useI18n()
const checked = ref(true)

</script>
<style scoped>
.content{
    margin-bottom: 80px;
}
.button-box {
    width: 100%;
    display: flex;
    flex: 2;
    position: fixed;
    bottom: 0;
}
.button-box button {
    flex: 1;
}
.van-switch--on {
    background: #617cf0;
}
.custom-mtu .van-field__control{
    background: #F7F8FA;
    border-radius: 4px;
}
</style>
