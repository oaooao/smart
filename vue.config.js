module.exports = {
  configureWebpack: {},
  devServer: {
    proxy: {
      '/robot': {
        target: 'http://192.168.8.101:9090/',
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
