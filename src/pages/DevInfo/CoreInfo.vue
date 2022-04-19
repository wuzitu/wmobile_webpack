<template>
    <div class="core-info">
         <div class="content">
             <div class="content-row">
                <div class="data-div">
                    <div class="content-col">
                        <div class="dot-div">
                            <div class="content-dot cpu-dot"></div>
                        </div>
                        <span class="content-title" :style="titleStyle">CPU</span>
                    </div>
                    <div class="content-col" :style="dataUnitStyle">
                        <span :style="dataStyle">{{ coreData.cpuRate }}</span>
                        <span :style="dataUnitStyle">%</span> 
                    </div>
                </div>
             </div>
             <div class="content-row">
                <div class="data-div">
                    <div class="content-col">
                        <div class="dot-div">
                            <div class=" content-dot store-dot"></div>
                        </div>
                        <span class="content-title" :style="titleStyle">{{ t("DevInfo.storage") }}</span>
                    </div>
                    <div class="content-col" :style="dataUnitStyle">
                        <span :style="dataStyle">{{ coreData.storeRate }}</span> %
                    </div>
                </div>

             </div>
             <div class="content-row">
                <div class="data-div">
                    <div class="content-col">
                        <div class="dot-div">
                            <div class="content-dot uprate-dot"></div>
                        </div>
                        <span class="content-title" :style="titleStyle">{{ t("DevInfo.uprate") }}</span>
                    </div>
                    <div class="content-col" >
                        <span :style="dataStyle">{{ coreData.upRate }}</span>
                        <span :style="dataUnitStyle"> Mbps </span>
                    </div>
                </div>

             </div>
             <div class="content-row">
                <div class="data-div">
                    <div class="content-col">
                        <div class="dot-div">
                            <div class="content-dot downrate-dot"></div>
                        </div>
                        <span class="content-title" :style="titleStyle">{{ t("DevInfo.downrate") }}</span>
                    </div>
                    <div class="content-col" :style="dataUnitStyle">
                        <span :style="dataStyle">{{ coreData.downRate }}</span>
                        <span :style="dataUnitStyle"> Mbps </span>
                    </div>
                </div>

             </div>
         </div>
    </div>
</template>

<script setup>
import { ref,defineProps } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"

const router = useRoute()
console.log(router.params)
const { t } = useI18n()

const props = defineProps(["coreData"])

let coreData = ref({ ...props.coreData }) || ref({})
coreData = ref({
    "cpuRate": "75",
    "storeRate": "25",
    "upRate":"1.5",
    "downRate":"1.5"
})

const dataStyle = {
    "font-size":"16px",
    "color":"#333333",
    "font-weight":"Bold",
    "padding-left":"10px"
}

const dataUnitStyle = {
    "font-size":"11px",
    "color":"#333333",
    "font-weight":"Bold",
    "margin-top": "4px"
}

const titleStyle = {
    "font-size": "13px",
    "font-family": "PingFang SC",
    "font-weight": "500",
    "color": "#666666",
}

</script>

<style scoped>

  .core-info {
      width: 375px;
      height: 90px;
      display: flex;
      align-items: center;
      background-color: #FFFFFF;
      justify-content: center;
  }

  .core-info .content {
      width: 345px;
      height: 60px;
      background-color: #f9f9f9;
      display: flex;
  }

 .core-info .content .content-row{
     flex:1;
     height: 60px;
     display: flex;
     justify-content: center;
     align-items: center;
  }

  .core-info .content .content-row:nth-child(2)::before,
  .core-info .content .content-row:nth-child(3)::before,
  .core-info .content .content-row:nth-child(4)::before{
        content: "";
        width: 1px;
        height: 40px;
        background:#D8D8D8;
        display: inline-block;
        float: left;
        margin-left: -1px;
   }

/*.core-info .content .content-row:nth-child(3) .data-div,*/
  .core-info .content .content-row .data-div{
      margin-left: 10px;
  }

   .core-info .content  .content-row .data-div {
        display: flex;
        flex-direction: column;
        height: 37px;
        width: 64px;
   }

   .core-info .content  .content-row .data-div .content-col {
        flex: 1 30px;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
   }

    .core-info .content .content-row .content-col .dot-div{
        display: inline-block;
        line-height: 10px;
        height: 10px;
        margin:0;
        padding:0;
        margin-bottom: 4px;
        margin-right: 4px;
    }
 .core-info .content .content-row .content-col .content-title{
      line-height: 10px;
      height: 10px;
  }

  .core-info .content .content-row .content-col .cpu-dot{
      background: #F43E3B;
  }

 .core-info .content .content-row .content-col .content-dot{
      width: 5px;
      height: 5px;
      border-radius: 50%;
      display:inline-block ;
  }

  .core-info .content .content-row .content-col .store-dot  {
      background: #00AF6D;

  }
  .core-info .content .content-row .content-col .uprate-dot  {
      background: #617CF0;
  }
  .core-info .content .content-row .content-col .downrate-dot  {
      background: #FF6A38;
  }
</style>