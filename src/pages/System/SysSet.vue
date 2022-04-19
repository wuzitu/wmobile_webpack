<template>
    <div class="height100">
        <EditPass @submit="submits" v-if="type == 'rootPass'"></EditPass>
        <EditTftp v-if="type == 'tftpServce'"></EditTftp>
        <EditAddress v-if="type == 'addressManage'"></EditAddress>
    </div>
</template>

<script setup>
import EditPass from "./EditPass"
import EditTftp from "./EditTftp"
import EditAddress from "./EditAddress"
import { useRoute } from "vue-router"
const route = useRoute()
const type = route.query.type
const submits = (data) => {
    console.log(data.values)
}
</script>

<style scoped>
.editWrap {
    height: 100vh;
}
</style>
