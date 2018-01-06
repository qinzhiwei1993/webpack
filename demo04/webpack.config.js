var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname),
    entry: path.resolve(__dirname, './src/main.js'),
    // devServer: {
    //     contentBase: './src',
    //     port: 8080
    // },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name]-[hash].js",
        publicPath: "/"
    },
    plugins:[
        new CleanWebpackPlugin(['./dist']),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        })
    ]
}