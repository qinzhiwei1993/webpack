/**
 * Created by gy102 on 2018/1/3.
 */

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname), //定义上下文执行环境。 定义为当前目录
    entry: {
        main: [path.resolve(__dirname, './src/js/main.js'), path.resolve(__dirname, './src/js/a.js')], //数组形式是将连个不相干的，没有依赖的文件打包到一个文件里面
        index: path.resolve(__dirname, './src/js/index.js'),
        b: path.resolve(__dirname, './src/js/b.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'), //指定生成文件的保存路径
        filename: 'js/[name].[hash].js', // [name]保留entry的命名入口文件的名字, [id]序号的名字 0 ， 1 , [hash], [chunkhash]
        // publicPath: "http://dev.h5.intgg.cn"  //指定线上的域名配置
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']), //清理文件

        //多页面的时候。需要生成多个html，此时就需要多次调用HtmlWebpackPlugin
        new HtmlWebpackPlugin({//配置生成的html的样式
            filename: 'index.[hash].html', //指定生成文件的名称
            template: 'index.html',  //定义生成html的模板
            inject: 'body', //执行应用的脚本放到头部还是body里面 【body head】
            title: 'this is index.html',//设置生成的html的title
            cache: true, //只有当文件改变时才会输出
            chunks: ['main', 'index'], //多页面时，指定需要使用的chunk，即生成的模块，js，css等
            // excludeChunks:[],//指定不需要使用的chunks。 当改页面需要加载大多数文件时，可以使用这个属性
            // minify: {
            //     collapseWhitespace: true,//删除空格
            //     removeComments: true,//删除注释
            // }, //是否对html进行压缩，是个对象，配置压缩注释和空格。  不压缩这是为false，默认值为false
        }),
        new HtmlWebpackPlugin({
            filename: 'a.[hash].html',
            template: 'index.html',
            inject: 'body',
            title: 'this is a.html',
            cache: true,
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            filename: 'b.[hash].html',
            template: 'index.html',
            inject: 'body',
            title: 'this is b.html',
            cache: true,
            chunks: ['b'],
        })
    ]
}
