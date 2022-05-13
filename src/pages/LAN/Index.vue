<template>
    <div class>
        <h1>默认页面。This is an LAN page</h1>
        <h2>Netconf-demo</h2>
        <van-button @click="getConf">发送请求</van-button>
        <p>
            响应内容：
            {{ res }}
        </p>
    </div>
    <p>注意：请求不成功可排查：1. 新建NC表，需要重烧版本，或者修改bash中的rbac</p>
    <p>2. 请求没有权限，请进入Login页面重新登录一次。</p>

    <p>## 注意事项</p>
    <p>1. 示例页面：http://localhost:8080/#/LAN</p>
    <p>2. 想要拿到正确的netconf数据，必须有以下几个前提！</p>
    <p>a. public/nc.js 一定要定义这个netconf</p>
    <p>b. 如果新加了一个netconf，需要重新出版本，它才能被写入RBAC中，被正常使用。否则新字段没权限读取。</p>
    <p>c. 必须携带正确的cookie才能拿到，结果未windows.location="/"时，请重新去login一次。</p>
    <p>d. tmpJSON方案和真实的netconf方案冲突。通过.env.development 文件中的VUE_APP_LOCALDEBUG=false 即可定义。这个文件修改后需要重启 yarn serve</p>

    <br />
    <div class="box-styl">
        <h1>Pinia的使用demo</h1>
        <p class="section-box">
            Pinia的state: count =
            <b>{{ count }}</b>
        </p>
        <p class="section-box">
            Pinia的getters: doubleCount() =
            <b>{{ doubleCount() }}</b>
        </p>
        <div class="section-box">
            <p>Pinia的action: increment()</p>
            <button @click="increment">点我</button>
        </div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from "vue"

import { storeToRefs } from "pinia"
import appStore from "@/store"

// setup composition API模式
const { count } = storeToRefs(appStore.storeDemo)
const { increment, doubleCount } = appStore.storeDemo
const { proxy } = getCurrentInstance()
const $req = proxy.$req
const res = ref()
const getConf = async () => {
    let o = $req.getTableInstance("IfTable")
    let vlan = $req.getTableInstance("VLAN")
    // 因为menu的配置，必须对应nc中定义的menu字段，才能取到。否则需要重新烧版本。
    let response = await $req.getAll([o,vlan])
    res.value = $req.getTableRows("IfTable", response)
    // 加密 解密 xml 转Base64
    res.value = $req.getTableRows("VLAN", response)
    // console.log(res.value)
    $req.set("remove, merge", vlan)


    $req.action(vlan)
}

onMounted(async () => {})
</script>
