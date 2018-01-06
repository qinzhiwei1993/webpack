// import layer from "./layer.html";
import './layer.less';

import layer from "./layer.ejs";

function Layer(){
    return {
        name: 'layer',
        template: layer({
            name: '模板',
            arr:[
                'oppop',
                'iphone',
                'HUAWEI'
            ]
        })
    }
}
export default Layer;