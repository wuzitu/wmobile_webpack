<template>
  <p>{{ $t('hello') }}</p>
  
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelloI18n'
})
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
