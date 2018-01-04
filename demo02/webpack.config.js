/**
 * Created by gy102 on 2018/1/3.
 */

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname), //定义上下文执行环境。 定义为当前目录
    entry: {
        main: [path.resolve(__dirname, './src/js/main.js'), path.resolve(__dirname, './src/js/a.js')], //数组形式是将连个不相干的，没有依赖的文件打包到一个文件里面
        index: path.resolve(__dirname, './src/js/index.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'), //指定生成文件的保存路径
        filename: 'js/[name].[hash].js', // [name]保留entry的命名入口文件的名字, [id]序号的名字 0 ， 1 , [hash], [chunkhash]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.[hash].html', //指定生成文件的名称
            template: 'index.html',  //定义生成html的模板
            inject: 'head' //执行应用的脚本放到头部还是body里面 【body head】
        })
    ]
}
