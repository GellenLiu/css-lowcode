const path = require("path")
module.exports = {
  lintOnSave: false,
  publicPath:'./',  // 执行 npm run build 统一配置路径
  // css: {
  //   requireModuleExtension: true,
  //   loaderOptions: {
  //     // 给 sass-loader 传递选项
  //     css: {
  //       // @/ 是 src/ 的别名
  //       // 所以这里假设你有 `src/variables.sass` 这个文件
  //       // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
  //       modules: false,
  //     },
  //   }
  // },
  chainWebpack: config => {
    // my-loader为loader的别名，./src/myLoader.js是loader的位置
    config.resolveLoader.alias.set('getCss-loader', path.resolve(__dirname, './src/object/getCss-loader.js'))
    // 修改vue文件Loader的选项，增加新的处理loader
    const vueRule = config.module.rule('vue')
    vueRule.use('getCss-loader').loader('getCss-loader').end()
  },
}