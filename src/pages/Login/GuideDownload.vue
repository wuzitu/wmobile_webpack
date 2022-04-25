<template>
    <div class="guide-box">
        <div class="primaryCoverage-box">
            <div class="introduction-image-box">
                <img class="introduction-image"
                    src="@/frame/assets/img/img_downloadapp@3x.png" />
            </div>
            <div class="content-title-box">
                <div class="content-title-chinese">
                    云智能，网极简
                </div>
                <div class="content-title-english">
                    Clodnet APP Lite
                </div>
            </div>
            <div class="download-button-box">
                <van-button round color="#617CF0" class="download-button">{{ RC("download") }}</van-button>
            </div>
            <div class="copyright-box">
                <span>
                    新华三技术有限公司 版权所有
                </span>
                <span>
                    Copyright © 2019 New H3C Technologies Co., Ltd.
                </span>
                <span>
                    All rights reserved.
                </span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useI18n } from "vue-i18n"
const { t } = useI18n()
const RC = (str) => {
    return t("guidedownloade." + str)
}

</script>
<style scoped>
.guide-box {
    width: 100%;
    height: 788px;
    background-color: #4459D6;
    position: absolute;
}

.primaryCoverage-box {
    width: 329px;
    height: 613px;
    position: relative;
    left: 21.5px;
    top: 83px;
}

.content-title-box {
    width: 248px;
    height: 65.5px;
    position: relative;
    left: 44px;
    top: 18.5px;
}

.content-title-box {
    font-family: PingFang-SC-Medium;
    font-weight: Medium;
    color: #FFFFFF;
}

.introduction-image{
    width: 328px;
    height: 335px;
}
.content-title-chinese {
    font-size: 35.3px;
}

.content-title-english {
    font-size: 20.89px;
    opacity: 0.4;
    margin-left: 33.5px;
    margin-top: 15px;
}

.download-button-box {
    position: relative;
    top: 110.5px;
    left: 21.5px;
}

.download-button {
    width: 290px;
    height: 50px;
    font-size: 18px;
}

.copyright-box {
    width: 300px;
    height: 39px;
    position: relative;
    top: 135.5px;
    left: 26.5px;
}

.copyright-box span {
    display: inline-block;
    font-family: PingFang-SC-Medium;
    font-size: 10px;
    color: #141E59;
    font-weight: Medium;
}
.copyright-box span:nth-child(1){
    margin-left: 55px;
}
.copyright-box span:nth-child(3){
    margin-left: 87px;
}
</style>