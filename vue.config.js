const resolve = dir => require('path').join(__dirname, dir);

const apiProxyTable = {
  onProxyReq: proxyReq => {
    proxyReq.setHeader('Referer', process.env.OJ_SERVER)
  },
  target: `http://${process.env.OJ_SERVER}`,
  changeOrigin: true,
  xfwd: false
};
const wsProxyTable = {
  target: `ws://${process.env.OJ_WS || process.env.OJ_SERVER}`,
  changeOrigin: true,
  ws: true
};

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_u', resolve('src/utils'))
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: 'less-loader',
              options: { lessOptions: { javascriptEnabled: true } }
            }
          ]
        }
      ]
    }
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': apiProxyTable,
      '/ws': wsProxyTable
    }
  }
}
