module.exports = {
  outputDir: '../dist',
  publicPath: process.env.NODE_ENV === 'production' ?
    '/web/mobile' : './',
  filenameHashing: false, // 想要去除生成文件的hash 值，置为false
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  productionSourceMap: true, // 生产环境是否生成 sourceMap 文件
  pluginOptions: {
    i18n: {
      locale: 'cn',
      fallbackLocale: 'en',
      localeDir: 'frame/language',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true
    }
  },

}