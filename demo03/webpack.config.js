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
              loaders:[
                  'style-loader',
                  {
                     loader: 'css-loader',
                      options: {
                          importLoaders: 1
                      }
                  },
                  {
                      loader: 'postcss-loader', //兼容不同浏览器， 给css加上前缀
                      options:{
                          ident: 'postcss',
                          path: path.resolve(__dirname, './postcss.config.js'),
                          plugins: (loader) => [
                             require('postcss-import')({ root: loader.resourcePath }),
                             require('postcss-cssnext')(),
                             require('autoprefixer')(),
                             //require('cssnano')()  //压缩
                          ]
                      }
                  }
              ]
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