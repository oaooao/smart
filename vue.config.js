module.exports = {
  devServer: {
    proxy: {
      '/robot': {
        target: 'http://172.20.10.4:9090',
        changeOrigin: true
        // ws: true
      }
    }
  },
  configureWebpack: {},
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
