/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_common_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_common_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_common_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_layer_layer_js__ = __webpack_require__(7);



var App = function App() {
    var app = document.getElementById('app');
    var layer = new __WEBPACK_IMPORTED_MODULE_1__component_layer_layer_js__["a" /* default */]();
    app.innerHTML = layer.template;
};

new App();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--4-1!../../../node_modules/postcss-loader/lib/index.js!./common.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--4-1!../../../node_modules/postcss-loader/lib/index.js!./common.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "body, html{\n    margin: 0;\n    padding: 0;\n    background: red;\n}\n\n.flex-div{\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n}\n\nul li {\n    list-style: none;\n}", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layer_less__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layer_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__layer_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layer_ejs__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layer_ejs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__layer_ejs__);
// import layer from "./layer.html";




function Layer() {
    return {
        name: 'layer',
        template: __WEBPACK_IMPORTED_MODULE_1__layer_ejs___default()({
            name: '模板',
            arr: ['oppop', 'iphone', 'HUAWEI']
        })
    };
}
/* harmony default export */ __webpack_exports__["a"] = (Layer);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--5-1!../../../../node_modules/postcss-loader/lib/index.js??postcss!../../../../node_modules/less-loader/dist/cjs.js!./layer.less", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--5-1!../../../../node_modules/postcss-loader/lib/index.js??postcss!../../../../node_modules/less-loader/dist/cjs.js!./layer.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(10);
exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".layer {\n  width: 600px;\n  height: 400px;\n  background: green;\n}\n.layer > div {\n  width: 400px;\n  height: 200px;\n  background: url(" + escape(__webpack_require__(2)) + ");\n}\n.layer .flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function (obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="layer">\n    <img src="' +
((__t = (__webpack_require__(2))) == null ? '' : __t) +
'" alt="">  <!--相对路径和绝对路径都不能用-->\n    <div>this is ' +
((__t = ( name )) == null ? '' : __t) +
' layer</div>\n    <ul>\n        ';
 for (var i = 0; i < arr.length; i++) {;
__p += '\n            <li> ' +
((__t = ( arr[i] )) == null ? '' : __t) +
'</li>\n        ';
 } ;
__p += '\n    </ul>\n</div>';

}
return __p
}

/***/ })
/******/ ]);