<template>
  <van-sticky>
    <van-row justify="space-between" align="center" id="app-header">
      <van-col span="12">
        <van-icon name="bars" size="30" @click="menuClick" />
        <h1>H3C</h1>
      </van-col>

      <van-col span="6">
        <span>
          <van-icon name="add" size="20px" />|
        </span>
        <span>
          <van-icon name="friends" size="20px" />
        </span>
      </van-col>
    </van-row>
  </van-sticky>
  <!-- 弹出层，存放路由，多语言等内容 -->
  <van-popup v-model:show="menuShow" position="left" teleport="body" :style="{ height: '100%' }">
    <div id="nav" @click="menuClick">
      <div id="menu-link">
        <router-link to="/">{{ $t("MENU.dashboard") }}</router-link>|
        <router-link to="/LAN">{{ $t("MENU.LAN") }}</router-link>
      </div>
      <!-- {{ $t("message") }} -->
      语言：
      <van-button
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
        @click="changeLanguage(locale)"
      >{{ locale }}</van-button>
    </div>
  </van-popup>

  <router-view />
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance()
// 菜单点击
const menuShow = ref(false);
const menuClick = () => {
  menuShow.value = !menuShow.value;
};


const changeLanguage = (locale) => {
  proxy.$i18n.locale = locale
}
</script>

<style>
#app {
  /* font-family: "HPSimplified", Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
  max-width: 100%;
}
</style>

<style scoped>
#app-header {
  background-color: rgba(0, 150, 213, 1);
  color: white;
}
#app-header h1 {
  padding: 0;
  margin: 0;
  display: inline-block;
  font-size: 30px;
  font-weight: bold;
}
#nav {
  padding: 30px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  /* height: 100%; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#menu-link {
  height: 470px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
