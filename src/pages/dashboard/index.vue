<template>
  <van-row justify="center">
    <h1 id="topology">{{ $t("topology") }}</h1>
  </van-row>
  <van-row justify="center">
    <dev-list></dev-list>
  </van-row>
</template>

<script setup>
/**
 * 加载vue方法，setup语法糖： 
 * ref负责转换数据响应式
 * getCurrentInstance 获取proxy（vue）实例
 * onMounted对应组件生命周期
 */
import { ref, getCurrentInstance, onMounted } from 'vue';
/** 
 * 加载组件：使用@ 代表src目录，也可以使用../ 相对路径
 * 加载组件使用大写命名，使用时带横杠 例如DevList，对应<dev-list>
 */
import DevList from '@/frame/components/DevList.vue';


const data1 = ref(2)

data1.value++
const { proxy } = getCurrentInstance()
let $req = proxy.$req;


onMounted(async () => {
  // test ajax
  let o = $req.getTableInstance("RadioRunningCfg")
  let res = $req.getAll([o]);
  console.log(res)
})


</script>


<style scoped>
#topology {
  height: 300px;
  text-align: center;
  font-weight: 60px;
}
</style>


<i18n>
{
  "en": {
    "topology": "topology"
  },
  "cn":{
    "topology": "拓补图"
  }
}
</i18n>