const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 打包分析工具，可选用
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var path = require('path')
// sentry 接入，可选用
// const SentryPlugin = require('@tencent/webpack-sentry-plugin');

const glob = require('glob')
const titles = require('./title.js')

// 统一配置多页
const pages = {}
glob.sync('./src/pages/**/app.js').forEach((filePath) => {
  // 获取文件名 例如： './src/pages/login/app.js'  ==> 'login'
  let chunk = filePath.split('./src/pages/')[1].split('/app.js')[0]
  // const chunkFirstName = chunk.split('/')[0]
  // if (chunkFirstName === 'user') {
  //   chunk += '/index'
  // }
  pages[chunk] = {
    entry: filePath,
    template: 'public/index.html',
    title: titles[chunk],
    chunks: ['chunk-vendors', 'chunk-common', chunk]
  }
})
console.log('process.env.NODE_ENV ==' + process.env.NODE_ENV)
module.exports = {
  // baseUrl: '/pcpages',
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       extensions: ['.js', '.vue', '.scss'],
  //       alias: {
  //         '@': path.resolve(__dirname, 'src'),
  //         '@assets': path.resolve('src/assets')
  //       }
  //     }
  //   }
  // },
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  pages,
  lintOnSave: true,
  outputDir: './dist',
  productionSourceMap: !(process.env.NODE_ENV === 'production'),
  devServer: {
    port: 83,
    proxy: {
      '/openplatform': {
        target: 'http://yqitao.test.fxcloud.net/',
        ws: true,
        changeOrigin: true
      }
    } // 配置开发环境 URL 便于本地开发调试
  },
  chainWebpack: (config) => {
    config.plugins.delete('named-chunks')
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        // 修改它的选项...
        return options
      })
    // config.externals({
    //   'CKEDITOR': 'window.CKEDITOR'
    // })
  },
  configureWebpack: (config) => {
    const plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        },
        sourceMap: true
      })
    ]
    // splitChunk 配置
    const splitChunksConfig = {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
          minChunks: 2
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [...config.plugins, ...plugins]
      config.optimization.splitChunks = splitChunksConfig
    }
  }
}
