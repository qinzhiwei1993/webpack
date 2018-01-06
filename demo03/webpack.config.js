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
            test: /\.(png|svg|jpg|git)$/i,
              loaders:[
                  {
                      loader: 'url-loader',
                      options:{
                          limit: 20000,
                          name: '[name]-[hash:5].[ext]'
                      }
                  },
                  'image-webpack-loader'
              ]
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            test: /\.ejs$/,
            loader: 'ejs-loader'
          },
          {
              test: /\.js$/,
              include: path.resolve(__dirname, './src'), //可以减少loader查询的文件，提高打包速度
              loader: 'babel-loader'
          },
          {
              test: /\.css$/,
              include: path.resolve(__dirname, './src'), //可以减少loader查询的文件，提高打包速度
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
                  }
              ]
          },
          {
              test: /\.less/,
              include: path.resolve(__dirname, './src'),
              loaders:[
                  'style-loader',
                  {
                      loader: 'css-loader',
                      options: {
                          importLoaders: 2
                      }
                  },
                  {
                      loader: 'postcss-loader', //兼容不同浏览器， 给css加上前缀
                      options:{
                          ident: 'postcss',
                          config:{
                              path: path.resolve(__dirname, './postcss.config.js'), //指定配置文件位置，不建议使用
                          }
                      }
                  },
                  "less-loader"
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