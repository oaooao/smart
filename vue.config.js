module.exports = {
  configureWebpack: {},
  devServer: {
    proxy: {
      '/robot': {
        target: 'http://192.168.8.102:9090/', // wifi
        secure: false,
        changeOrigin: true,
        ws: true
        // pathRewrite: {
        //   '^/robot': ''
        // }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
