<template>
    <!-- <van-button @click="getConf">发送请求</van-button> -->
    <!-- <p>
        响应内容：
        {{ res }}
        {{ res.Client2G }}
        {{ res.Client5G }}
    </p> -->
    <!-- <p>{{ cards.IpAddress }}</p> -->

    <div class="ApListWrap">
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ RelClientNumsTitle }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ res.Current }}</van-col>
        </van-row>
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ Clients2_4GNumsTitle }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ res.Client2G }}</van-col>
        </van-row>
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ Clients5GNumsTitle }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ res.Client5G }}</van-col>
        </van-row>
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ APOnlineTime }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ routerData.JoinTime }}</van-col>
        </van-row>
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ APLinkTime }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ routerData.linkTime }}</van-col>
        </van-row>
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ APOfflineTime }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ routerData.OutTime }}</van-col>
        </van-row>
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ APUpRate }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ apInfo.APUpRate }}</van-col>
        </van-row>
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ APDownRate }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ apInfo.APDownRate }}</van-col>
        </van-row>
    </div>
</template>

<script setup>
import { defineProps, getCurrentInstance, ref, reactive, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

// 调取路由传参
const router = useRoute()
console.log(router.params)
const routerData = Object.assign({}, router.params)

// const cardData = defineProps({ cardData: Object })
// const cards = cardData.cardData

const RelClientNumsTitle = t("DevInfo.relclientnumsTitle")
const Clients2_4GNumsTitle = t("DevInfo.clients2_4GnumsTitle")
const Clients5GNumsTitle = t("DevInfo.clients5GnumsTitle")
const APOnlineTime = t("DevInfo.onlinetime")
const APLinkTime = t("DevInfo.linktime")
const APOfflineTime = t("DevInfo.offlinetime")
const APUpRate = t("DevInfo.uprate")
const APDownRate = t("DevInfo.downrate")

const apInfo = ref({
    RelClientNumsTitle: "15",
    Clients2_4GNumsTitle: "10",
    Clients5GNumsTitle: "5",
    APOnlineTime: "2022-03-16 11:00:30",
    APLinkTime: "5天10小时25分钟45秒",
    APOfflineTime: "无",
    APUpRate: "1Mbps",
    APDownRate: "1Mbps"
})
const { proxy } = getCurrentInstance()
const $req = proxy.$req
// 下面两种写法都是错的。
// const res = reactive()
// const res = ref()
const res = ref({})
const getConf = async () => {
    let o = $req.getTableInstance("ManualAP")
    let p = $req.getTableInstance("RadioOfManualAP")
    let q = $req.getTableInstance("AllAP")
    let r = $req.getTableInstance("DeviceList")
    let aAPAssociations = $req.getTableInstance("APAssociations")

    let aReqTable = []
    aReqTable.push(aAPAssociations)

    await $req.getAll(aReqTable).then((data) => {
        res.value = $req.getTableRows("APAssociations", data)
    })
    // 关键点：赋值写法，把数组中的对象提出来，上面就可以直接用了。上面写[0]报错了。赋值需要用value
    res.value = res.value[0]
}
// setup中直接执行，就可以在列表渲染前加载数据
getConf()
</script>

<style scoped>
.ApListWrap {
    background: #ffffff;
    /* padding: 10px; */
    /* flex: 1; */
    font-size: 14px;
    color: #333333;
    /* height: 800px; */
}
.apline {
    height: 50px;
    border-top: 1px solid #f7f7f7;
    border-bottom: 1px solid #f7f7f7;
    justify-content: center;
    align-items: center;
}
.apdetailtitle {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    padding-left: 16px;
}
.apdetailvalue {
    padding-left: 16px;
}
</style>
