// module.exports = {
//     plugins: [
//         require('precss'),
//         require('autoprefixer'),
//         //require('cssnano')()  //压缩
//     ]
// }

const ctx = { parser: true, map: 'inline' }

//根据开发环境还是生产环境配置
module.exports = (ctx) => ({ //ctx为上下文环境。 ctx.env是在scripts里配置的
    parser: ctx.parser ? 'sugarss' : false,
    map: ctx.env === 'development' ? ctx.map : false,
    plugins: {
        'postcss-import': {},
        'postcss-nested': {},
        'autoprefixer': {}, //兼容浏览器的特性
        'precss':{},//css的预处理器， 让css可以像sass一样工作
        cssnano: ctx.env === 'production' ? {} : false //压缩
    }
})