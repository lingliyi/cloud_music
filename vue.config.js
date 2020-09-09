const path = require('path')


module.exports = {
  // 缺少路径
  publicPath: './',

  // devServer: {
  //   proxy: {
  //     '/api': {
  //       // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
  //       target: 'http://127.0.0.1:3000',
  //       // 允许跨域
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // },
}
