<template>
  <p>{{ $t("hello") }}</p>
  <van-cell title="选择单个日期" :value="date" @click="show = true" />
</template>

<script>
import { ref, getCurrentInstance } from "vue";

// export default defineComponent({
//   name: 'HelloI18n',
// })

export default {
  setup() {
    const date = ref("");
    const show = ref(false);
    const { proxy } = getCurrentInstance();
    console.log(getCurrentInstance().appContext.config.globalProperties);
    console.log(proxy)
    console.log(proxy.$t)
    console.log(proxy.$req)

    const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
    const onConfirm = (value) => {
      show.value = false;
      date.value = formatDate(value);
    };

    // var oRadioRunningCfg = req.getTableInstance(NC.RadioRunningCfg);
    // console.log(req, NC)
    // req.getAll([oRadioRunningCfg], (res)=>{
    //   console.log(res)
    // });

    return {
      date,
      show,
      onConfirm,
    };
  },
};
</script>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  },
  "cn":{
    "hello": "你好你好!"
  }
}
</i18n>

<style scoped>
p {
  font-size: 60px;
  color: blueviolet;
}
</style>
