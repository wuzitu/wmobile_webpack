<template>
  <van-row justify="center">
    <h1 id="topology">{{ title }}</h1>
    <h1 id="topology">{{ $t('DashBoard.topology') }}</h1>
    <p>{{ RC('map') }}</p>
  </van-row>
</template>

<script setup>
import { ref } from 'vue';
// 用法1，推荐
import { useI18n } from 'vue-i18n'
// 用法2, 不推荐
import i18n from "@/i18n/i18n"
const { t } = useI18n()
const $t = i18n.global.t

const RC = (str) => {
  return t('DashBoard.' + str)
}

const title = ref(t('DashBoard.topology'))
console.log('i18n', $t('DashBoard.topology'))
</script>

<style scoped>
#topology {
  height: 300px;
  text-align: center;
  font-weight: 60px;
}
</style>

