const path = require('path');
module.exports = {
  chainWebpack: config => config.resolve.alias.set('@', path.join(__dirname, 'src')),
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }
          ]
        }
      ]
    }
  }
}