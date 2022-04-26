<template>
 <div class="searchHeader">
                    <Search class="searchStyle" v-model="searchValue" left-icon="none"
                        :placeholder="placeholder.placeholder" />
                    <div>
                        <svg-icon icon-class="ic_search" class="iconRight"></svg-icon>
                    </div>
                </div>
</template>
<script setup>
import { Search, Image as VanImage } from "vant"
import { defineProps } from "vue"

const placeholder = defineProps({
    placeholder: String
})

</script>
<style scoped>
.searchHeader{
    padding-right: 10px;
    background: #ffffff;
    position: relative;
    display: flex;
    align-items: center;
}
.searchStyle {
    flex: 1;
}
.iconRight {
    width: 14px !important;
    height: 14px !important;
}
</style>