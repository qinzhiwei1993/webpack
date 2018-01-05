'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.fn1 = fn1;
exports.fn2 = fn2;
function fn1() {
    console.log('This is fn1');
}

function fn2() {
    console.log('This is fn2');
}

_extends({ a: 1 }, { b: 2 });