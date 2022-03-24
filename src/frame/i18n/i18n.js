import {
  createI18n
} from "vue-i18n"
import Cookies from "js-cookie"
import {
  Locale
} from "vant"
// 引入英文语言包
import enUS from "vant/es/locale/lang/en-US"

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
  const locales = require.context("./locales", true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key).default
    }
  })
  return messages
}

let lang = "cn"

async function initLang() {
  lang = Cookies.get("lang") || "en"
  if (lang == "en") {
    Locale.use("en", enUS)
  }
}
initLang()

export default createI18n({
  locale: lang || "cn",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages(),
})