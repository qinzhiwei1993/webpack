const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');//删除声明了但是没有使用的模块  同时进行压缩

const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
})

module.exports = {
    entry: {
        index: './src/script/index.js',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'build/script'),
        filename: '[name].js'
    },
    module: {
        rules:[
            //模块规则（配置loader，解析器等选项）
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src/script')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },

    plugins: [
        extractLess, //
        new webpack.optimize.CommonsChunkPlugin({ //CommonsChunkPlugin  对global的变量  打包到一个js里面 react react-dom
            names: ["vendor", "runtime"],  //runtime 运行时环境打包
            // (the commons chunk name)

            // filename: "commons.js",
            // (the filename of the commons chunk)

            // minChunks: 3,
            // (Modules must be shared between 3 entries)

            // chunks: ["pageA", "pageB"],
            // (Only use these entries)
        }),
        new UglifyJSPlugin()

    ]
    // externals: {//外部有这两个现成的js。  不用在代码里面构建。
    //     'react': 'React',
    //     'react-dom': 'ReactDOM'
    // }
}