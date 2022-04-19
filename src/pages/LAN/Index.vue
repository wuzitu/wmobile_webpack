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
  <p>2. 缺少.evn文件中的sessionID，或者浏览器中的cookie【sessionid=true】</p>

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
  let o = $req.getTableInstance("AllAP")
  let response = await $req.getAll([o])
  res.value = $req.getTableRows("AllAP", response)
  // console.log(res.value)
}

onMounted(async () => {})
</script>
