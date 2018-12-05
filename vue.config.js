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
      },
      '/oauth': {
        target: 'https://aip.baidubce.com/',
        secure: false,
        changeOrigin: true,
        ws: true
      },
      '/server_api': {
        target: 'https://vop.baidu.com/',
        secure: false,
        changeOrigin: true,
        ws: true
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
