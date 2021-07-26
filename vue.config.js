const CopyWebpackPlugin = require('copy-webpack-plugin');
const resolve = dir => require('path').join(__dirname, dir);

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_u', resolve('src/utils'))
  },
  configureWebpack: {
    resolve: {
      /** other code */
      extensions: ['.js', '.vue', '.json', '.ts'] // 添加 .ts 扩展名
    },
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
        },
        {
          test: /\.tsx?$/,
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                appendTsSuffixTo: [
                  '\\.vue$'
                ],
                happyPackMode: false
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'node_modules/mavon-editor/dist/highlightjs',
            to: resolve('dist/highlightjs') // 插件将会把文件导出于/dist/highlightjs之下
          },
          {
            from: 'node_modules/mavon-editor/dist/markdown',
            to: resolve('dist/markdown') // 插件将会把文件导出于/dist/markdown之下
          },
          {
            from: 'node_modules/mavon-editor/dist/katex', // 插件将会把文件导出
            to: resolve('dist/katex')
          }]
      })
    ]
  },
  devServer: {
    disableHostCheck: true,
    port: 8080
  }
}
