<template>
    <van-popup v-model:show="menuShow" position="left" teleport="body" :style="{ height: '100%', width: '258px' }">
        <div id="nav" @click="menuClick">
            <van-list id="menu-link">
                <van-cell>
                    <svg-icon icon-class="ic_close" class="closeStyle"></svg-icon>
                </van-cell>
                <van-cell>
                    <router-link to="/InitWlan">{{ $t("MENU.initwlan") }}</router-link>
                </van-cell>
                <van-cell class="sidecell">
                    <router-link to="/">{{ $t("MENU.dashboard-side") }}</router-link>
                </van-cell>

                <van-collapse v-model="LanActive" accordion size="">
                    <van-collapse-item :title="$t('MENU.network')" name="1" @click.stop="onLv1Click" style="font-size: 30px;">
                        <van-cell>
                            <router-link to="/Online" @click="menuClick" class="sidecell-cell">{{ $t("MENU.online") }}</router-link>
                        </van-cell>
                        <van-cell>
                            <router-link to="/WiFi" @click="menuClick" class="sidecell-cell">{{ $t("MENU.wifi") }}</router-link>
                        </van-cell>
                        <van-cell>
                            <router-link to="/Vlan" @click="menuClick" class="sidecell-cell">{{ $t("MENU.vlan") }}</router-link>
                        </van-cell>
                    </van-collapse-item>
                    <van-collapse-item :title="$t('MENU.device')" name="2" @click.stop="onLv1Click">
                        <van-cell>
                            <router-link to="/GateWay" @click="menuClick" class="sidecell-cell">{{ $t("MENU.gateway") }}</router-link>
                        </van-cell>
                        <van-cell>
                            <router-link to="/Switch" @click="menuClick" class="sidecell-cell">{{ $t("MENU.switch") }}</router-link>
                        </van-cell>
                        <van-cell>
                            <router-link to="/AP" @click="menuClick" class="sidecell-cell">{{ $t("MENU.ap") }}</router-link>
                        </van-cell>
                    </van-collapse-item>
                </van-collapse>

                <van-cell>
                    <router-link to="/Terminal">{{ $t("MENU.terminal") }}</router-link>
                </van-cell>
                <van-cell>
                    <router-link to="/LAN">{{ $t("MENU.history") }}</router-link>
                </van-cell>
                <van-cell>
                    <router-link to="/System">{{ $t("MENU.system") }}</router-link>
                </van-cell>
                <van-cell>
                    <van-col to="/System" @click="logClick">{{ $t("MENU.logout") }}</van-col>
                </van-cell>
            </van-list>
            <van-col class="menu_item menu_item_lan" id="lan">
                <span class="cn" lang="cn" @click="changeLanguage('cn')">中文</span>
                <span class="s_line">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <span class="en" lang="en" @click="changeLanguage('en')">English</span>
            </van-col>

            <!-- <van-button v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale" @click="changeLanguage(locale)">
        {{ locale }}
      </van-button> -->
        </div>
    </van-popup>
</template>

<script setup>
import { ref, getCurrentInstance, inject } from "vue"
import { useRouter } from "vue-router"
import { List, Dialog } from "vant"
const { proxy } = getCurrentInstance()
const menuShow = inject("menuShow") // 接受父组件传值
const LanActive = ref([])
const router = useRouter()

const menuClick = () => {
    menuShow.value = !menuShow.value
}
const onLv1Click = () => {
    console.log("LV1click")
}
const changeLanguage = (locale) => {
    proxy.$i18n.locale = locale
}
// const VanDialog = Dialog.Component

const logClick = () => {
    Dialog.confirm({
        title: "退出登录",
        message: "请确认是否退出当前登录账号"
    })
        .then(() => {
            router.push({
                path: "/initwlan",
                query: {
                    id: ""
                }
            })
            // on confirm
        })
        .catch(() => {
            // on cancel
        })
}
</script>

<style scoped>
#nav {
    width: 220px;
    min-width: 60px;
    height: 100%;
    padding: 0 15px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}

#nav a {
    /* font-weight: bold; */
    color: #2c3e50;
}
#menu-link {
    width: 100%;
    height: 100%;
    display: flex;
    /* align-items: center; */
    flex-direction: column;
}
#nav a.router-link-exact-active {
    color: #42b983;
}
.sidecell-cell {
    width: 220px;
    height: 34px;
    /* font-size: 16px; */
}
.sidecell a {
    font-size: 16px;
}
/* .sidecell span {
  font-size: 30px;
} */
.closeStyle {
    width: 32px;
    height: 32px;
}
#lan {
    position: fixed;
    bottom: 50px;
}
.van-cell a {
    display: block;
    width: 100%;
}
</style>
