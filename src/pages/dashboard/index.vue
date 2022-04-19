<template>
  <!-- 拓扑图 -->
  <topo-chart />
  <!-- 设备列表 -->

  <dev-list></dev-list>

</template>

<script setup>
/**
 * 加载vue方法，setup语法糖：
 * ref负责转换数据响应式
 * getCurrentInstance 获取proxy（vue）实例
 * onMounted对应组件生命周期
 */
import { ref, getCurrentInstance, onMounted } from "vue"
/**
 * 加载组件：使用@ 代表src目录，也可以使用../ 相对路径
 * 加载组件使用大写命名，使用时带横杠 例如DevList，对应<dev-list>
 */
import DevList from "@/components/DevList.vue"
import TopoChart from "./TopoChart.vue"

const data1 = ref(2)

data1.value++
const { proxy } = getCurrentInstance()
let $req = proxy.$req
const $t = proxy.$t
console.log(proxy)

onMounted(async () => {
  // test ajax
})
</script>
