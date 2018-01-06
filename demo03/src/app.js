import "./css/common.css";
import Layer from "./component/layer/layer.js";


const App = function(){
    var app = document.getElementById('app');
    var layer = new Layer();
    app.innerHTML = layer.template;
}

new App();