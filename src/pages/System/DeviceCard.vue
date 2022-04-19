<template>
    <div class="cardWrap">
        <div class="title">
            <span>
                <span class="company">{{cards.company}}</span>
                <span class="model" :class="cards.isOnline=='true'?'isRun':'noRun'">{{cards.decice}}</span>
            </span>
            <svg-icon icon-class="ic_edit" class="iconStyle"></svg-icon>
        </div>
        <p>
            <span>型号：{{cards.model}}</span>
            <span class="lineSpan">版本：{{cards.softver}}</span>
            <span class="upgrade" v-if="cards.isUpGrade=='true'">可升级</span>
        </p>
    </div>
</template>
    
<script setup>
    import {defineProps} from 'vue'
    const cardData = defineProps({cardData:Object})
    const cards = cardData.cardData
</script>
    
<style scoped>
    .iconStyle{
        width: 15px;
        height: 15px;
    }
    .cardWrap{
        background: #ffffff;
        padding: 10px;
        flex: 1;
    }
    .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        
    }
    p{
        margin: 5px 0;
        padding: 0;
        color: #666666;
    }

    p span{
        margin: 0 5px;
    }
    p span:nth-child(1){
        margin-left: 0;
    }
    .company{
        color: #333333;
    }
    .model{
        padding:3px 10px;
        font-size: 12px;
        color: #ffffff;
        border-radius: 3px;
        margin-left: 8px;
        display: inline-block;
        transform: scale(0.9);
    }
    .isRun{
        background: #21B480;
    }

    .noRun{
        background: #999999;
    }

    .lineSpan::before{
        content: '|';
        position: relative;
        left: -5px;
        color: #999999;
    }
    .upgrade{
        color: #F43E3B;
        border: 1px solid #F43E3B;
        display: inline-block;
        font-size: 12px;
        padding: 3px 4px;
        border-radius: 3px;
        transform: scale(0.8);
    }


</style>