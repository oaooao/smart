module.exports = {
  configureWebpack: {},
  devServer: {
    proxy: {
      '/robot': {
        target: 'http://172.20.10.2:9090/',
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
