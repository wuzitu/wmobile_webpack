const path = require("path")
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
    // outputDir: "../wmobile",
    publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
    filenameHashing: false, // 想要去除生成文件的hash 值，置为false
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    productionSourceMap: true, // 生产环境是否生成 sourceMap 文件
    pluginOptions: {
        i18n: {
            locale: "cn",
            fallbackLocale: "en",
            localeDir: "i18n/locales",
            enableLegacy: false,
            runtimeOnly: false,
            compositionOnly: true,
            fullInstall: true
        }
    },

    // postCSS 兼容移动端viewport配置
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require("postcss-px-to-viewport")({
                        unitToConvert: "px", // 需要转换的单位，默认为"px"
                        viewportWidth: 375, //  设计稿的视口宽度
                        unitPrecision: 5, // 单位转换后保留的精度
                        propList: ["*"], // 能转化为vw的属性列表
                        viewportUnit: "vw", //  希望使用的视口单位
                        fontViewportUnit: "vw", // 字体使用的视口单位
                        selectorBlackList: [], // 需要忽略的CSS选择器
                        minPixelValue: 1, // 最小的转换数值，如果为1的话，只有大于1的值会被转换
                        mediaQuery: false, // 媒体查询里的单位是否需要转换单位
                        replace: true, // 是否直接更换属性值，而不添加备用属性
                        // exclude: /node_modules/, // 忽略某些文件夹下的文件或特定文件
                        include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换，例如只转换 'src/mobile' 下的文件 (include: /\/src\/mobile\//)
                        landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
                        landscapeUnit: "vw", // 横屏时使用的单位
                        landscapeWidth: 568 // 横屏时使用的视口宽度
                    })
                ]
            }
        }
    },
    // 开发环境服务器配置,填写真实AC地址
    devServer: {
        proxy: {
            "/wnm": {
                target: "http://192.168.0.141",
                // ws: true,
                changeOrigin: true
            }
        }
    }, //配置svg icon
    chainWebpack(config) {
        // 多页面打包时，需循环处理, 提高首屏的加载速度
        // Object.keys(pages).forEach((page) => {
        //   config.plugin(`preload-${page}`).tap(() => [{
        //     rel: 'preload',
        //     // to ignore runtime.js
        //     fileBlackList: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        //     include: 'initial'
        //   }])
        // })

        // set svg-sprite-loader
        config.module.rule("svg").exclude.add(resolve("src/frame/assets/icon")).end()
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve("src/frame/assets/icon"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]"
            })
            .end()
        /**esLint, 在yarn serve的时候会提示语法错误 */
        config.module
            .rule("lint")
            .test(/\.js$/)
            .pre()
            .include.add(resolve("src"))
            .end()
            .use("eslint")
            .loader("eslint-loader")
            .options({
                fixed: true
            })
            .end()
        /**esLint */
    }
}
