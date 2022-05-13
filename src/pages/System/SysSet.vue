<template>
    <div>
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
console.log(route)
const type = route.query.type
const back = route.query.back ||  false
const submits = (data) => {
    console.log(data.values)
}
const tftpSubmits = (data) => {
    console.log(data.flags)
    if(back){
        history.back(-1)
    }
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
