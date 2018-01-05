##命令行参数

1、webpack --config [option]   指定配置文件。默认情况下指向webpack.config.js

    --progress 显示打包的百分比
    --display-module 显示打包的模块
    --colors 打印为彩色
    --display-reason 显示打包原因
    --watch 监听页面代码变化，实时打包编译

2、loaders 加载器

    style-loader 将css嵌入页面内
    css-loader   打包css
    less-loader  编译less为css
    bable-loaer  编译为可用的js文件
    postcss-loader  负责给css属性加上各个浏览器支持的前缀  demo03


3、plugins 插件    

    html-webpack-plugin 打包编译html
    clean-webpack-plugin  每次打包前清楚文件夹
    uglifyjs-webpack-plugin  压缩文件
    extract-text-webpack-plugin  从捆绑的包中提取内容到单独的文件