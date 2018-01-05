var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname),
    entry: path.resolve(__dirname, './src/app.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].bundle.js'
    },
    module:{
      loaders:[
          {
              test: /\.js$/,
              include: path.resolve(__dirname, './src'), //可以减少loader查询的文件，提高打包速度
              loader: 'babel-loader'
          },
          {
              test: /\.css$/,
              include: path.resolve(__dirname, './src/css'), //可以减少loader查询的文件，提高打包速度
              loader: 'style-loader!css-loader!postcss-loader'
          }
      ]
    },
    plugins:[
        new CleanWebpackPlugin(['./dist']),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        })
    ]
}