import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { fn2 } from './util';
import '../styles/index.less';

class Demo extends Component{
    render(){
        fn2();
        return (
            <div className="box">{this.props.text}</div>
        )
    }
}

ReactDOM.render(
    <Demo text="this is a text" />,
    document.querySelector('.container')
)

// const fn = (x, y) => x * y;
//
// class Demo{
//     test(){
//         console.log('demo');
//     }
// }