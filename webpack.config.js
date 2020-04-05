const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/webapp/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
            // options...
          }
        }
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/webapp/index.html'
    })
  ]
}
