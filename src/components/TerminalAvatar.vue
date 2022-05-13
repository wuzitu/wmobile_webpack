<template>
<div class="temail-avatar-box">
    <img :src="brandUrl" class="temail-avatar"/>
</div>
</template>
<script setup>
import { defineProps, ref ,watch } from "vue"
// 暂时只有两种手机型号，后期会加上其他图标
// imgUrlList 和 brandList这两个数组一一对应
const imgUrlList = ["img_head_iphone@3x", "img_head_mi@3x"]
// 手机型号与图标对应，暂时只写了两个，后期加入其他品牌手机
const brandList = ["iphone", "xiaomi"]
const brand = defineProps({
    brand: String
})
// 默认图片，由于UI未提供，暂以iphone图标代替
let brandUrl = ref(require("@/frame/assets/img/img_head_default@3x.png"))
watch(() => brand.brand, (newVal) => {
    brandList.map((item,index) => {
        if(newVal == item){
            brandUrl.value = require("@/frame/assets/img/" + imgUrlList[index] + ".png")
        }
    })
}, { deep: true,immediate:true }
)

</script>
<style scoped>
.temail-avatar{
    width: 41px;
    height: 41px;
}
</style>