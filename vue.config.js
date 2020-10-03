const resolve = dir => require('path').join(__dirname, dir);
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
    disableHostCheck: true
  }
}
