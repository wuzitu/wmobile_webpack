<template>
    <div class="height100">
        <EditPass @submit="submits" v-if="type == 'rootPass'"></EditPass>
        <EditTftp @submit="tftpSubmits" v-if="type == 'tftpServce'"></EditTftp>
        <EditAddress @submit="submitAddress" v-if="type == 'addressManage'"></EditAddress>
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
const tftpSubmits = (data) => {
    console.log(data)
}
const submitAddress = (data) => {
    console.log(data)
}
</script>

<style scoped>
.editWrap {
    height: 100vh;
}
</style>
