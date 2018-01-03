/**
 * Created by gy102 on 2018/1/3.
 */

var path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/js/main.js')
    },
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: 'bundle.js'
    }
}
