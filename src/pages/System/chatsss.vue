<template>
<div>
	<Button @click="getConf">AllAP</Button>
	<Button  @click="getConf1">请求2</Button>
	<Button  @click="getConf2">请求3</Button>
	<router-link  to="/connectCloudNet">一键上云</router-link>
	<div class="hahaha"></div>
  <router-view />
</div>
</template>

<script setup>
import $ from "jquery"
import { Button } from "vant"
import { ref, getCurrentInstance } from "vue"
import request from "@/frame/utils/lvzhouRq/request.js"
import { lvzhouInit,lvzhpuceshi } from "@/frame/utils/lvzhouRq/lvzhouApi"
const { proxy } = getCurrentInstance()
const $req = proxy.$req
const res = ref("")
const getConf = async () => {
    let o = $req.getTableInstance("AllAP")
    let response = await $req.getAll([o])
    res.value = $req.getTableRows("AllAPFast", response)
    console.log(res.value)
}

const getConf1 = () => {
    $.ajax({
        url:"https://oasis.h3c.com",
        type:"get",				//jsonp只能支持get请求 src只能是get请求
        dataType:"jsonp", //dataType表示返回值类型   （平时都是json，可以省略不写）
        jsonp: "callback", //指定接收回调函数的变量的名称   通常都写callback    
        jsonpCallback: "hello", //指定回调函数名称    这样浏览器中的回调函数名后面就不会跟一长串数字了
        Headers:{
            "access-control-allow-origin":'*',
        },
        success:function (data){ //data经过jQuery封装返回就是json串
			console.log(data)
        },error:function(xmlhttp){
            console.log(xmlhttp.getResponseHeader("Server"))
        }
    })

}

const getConf2 = async () => {
    let o = $req.getTableInstance("APSummary")
    let response = await $req.getAll([o])
    res.value = $req.getTableRows("AllAPFast", response)
    console.log(res.value)
}


</script>

<style>
    .chart {
    height: 400px;
}
</style>