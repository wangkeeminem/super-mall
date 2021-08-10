module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        '@':'/src',
        'assets':'@/assets',
        'common':"@/common",
        'network':'@/network',
        'components':'@/components',
        'views':'@/views'
      }
    }
  },
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8080,
    // https: false,
    // hotOnly: false,
    proxy: { // 设置代理
        '/': {
            target: 'http://localhost:5000/',
            changeOrigin: true,
            // pathRewrite: {
            //     '^/api': ''
            // }
        }
    },
    disableHostCheck: true
}


  
}
