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
/******/ 	__webpack_require__.p = "/assets/js/";
/******/
/******/ 	// webpack-livereload-plugin
/******/ 	(function() {
/******/ 	  if (typeof window === "undefined") { return };
/******/ 	  var id = "webpack-livereload-plugin-script";
/******/ 	  if (document.getElementById(id)) { return; }
/******/ 	  var el = document.createElement("script");
/******/ 	  el.id = id;
/******/ 	  el.async = true;
/******/ 	  el.src = "http://localhost:35729/livereload.js";
/******/ 	  document.getElementsByTagName("head")[0].appendChild(el);
/******/ 	}());
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modernizr__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modernizr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_modernizr__);
var __svg__ = { filename: __webpack_require__.p +"../icons/icons.svg" };

__webpack_require__(2)(__svg__);
__webpack_require__(3);




__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.form-section form').submit(function (event) {
  var query = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).find('.query').val();

  if (!query) {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).find('.query').addClass('error');
    return false;
  } else {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).find('.query').removeClass('error');
  }

  var results = searchReuters(query);

  event.preventDefault();
});

function searchReuters(query) {
  // let arr = query.split(' ');

  __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      var http = window.location.protocol === 'http:' ? 'http:' : 'https:';
      options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    }
  });

  __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.ajax({
    url: 'https://hackzurich-trend-detection.herokuapp.com/api/search/?topics=' + query,
    type: 'GET',
    beforeSend: function beforeSend(xhr) {
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa('admin:superuser'));
    },
    success: function success(response) {
      jQuery.each(response, function (i, val) {
        console.log(val);
      });
      // $('.results-section .container .row').append('<a class="card-container col-md-4" href="' + response.item_1.link + ' target="_blank">\
      //   <div class="custom-card">\
      //     <div class="header" style="background: url(' + response.item_1.image_url + ');"></div>\
      //     <div class="body">\
      //       <p>' + response.item_1.title + '</p>\
      //     </div>\
      //   </div>\
      // </a>');
    }
  });
}

if (true) {
  if (false) {
    module.hot.accept();
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Load svg via ajax
 * @param  {string} url path to svg sprite
 * @generator: webpack-svgstore-plugin
 * @see: https://www.npmjs.com/package/webpack-svgstore-plugin
 * @return {[type]}     [description]
 */
var svgXHR = function(options) {
  var url = false;
  var baseUrl = undefined;

  options && options.filename
    ? url = options.filename
    : null;

  if (!url) return false;
  var _ajax = new XMLHttpRequest();
  var _fullPath;

  if (typeof XDomainRequest !== 'undefined') {
    _ajax = new XDomainRequest();
  }

  if (typeof baseUrl === 'undefined') {
    if (typeof window.baseUrl !== 'undefined') {
      baseUrl = window.baseUrl;
    } else {
      baseUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
  }

  _fullPath = (baseUrl + '/' + url).replace(/([^:]\/)\/+/g, '$1');
  _ajax.open('GET', _fullPath, true);
  _ajax.onprogress = function() {};
  _ajax.onload = function() {
    if(!_ajax.responseText || _ajax.responseText.substr(0, 4) !== "<svg") {
      throw Error("Invalid SVG Response");
    }
    if(_ajax.status < 200 || _ajax.status >= 300) {
      return;
    }
    var div = document.createElement('div');
    div.innerHTML = _ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);
  };
  _ajax.send();
};

module.exports = svgXHR;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

;(function(window){
var hadGlobal = 'Modernizr' in window;
var oldGlobal = window.Modernizr;
/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-flexbox-promises-serviceworker-touchevents-setclasses !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,s,i,a;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],n=C[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],a=i.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),x.push((o?"":"no-")+a.join("-"))}}function s(e){var n=S.className,t=Modernizr._config.classPrefix||"";if(_&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),_?S.className.baseVal=n:S.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):_?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function a(){var e=n.body;return e||(e=i(_?"svg":"body"),e.fake=!0),e}function l(e,t,r,o){var s,l,u,f,c="modernizr",d=i("div"),p=a();if(parseInt(r,10))for(;r--;)u=i("div"),u.id=o?o[r]:c+(r+1),d.appendChild(u);return s=i("style"),s.type="text/css",s.id="s"+c,(p.fake?p:d).appendChild(s),p.appendChild(d),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),d.id=c,p.fake&&(p.style.background="",p.style.overflow="hidden",f=S.style.overflow,S.style.overflow="hidden",S.appendChild(p)),l=t(d,e),p.fake?(p.parentNode.removeChild(p),S.style.overflow=f,S.offsetHeight):d.parentNode.removeChild(d),!!l}function u(e,n){return!!~(""+e).indexOf(n)}function f(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function c(n,t,r){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,n,t);var s=e.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(s){var i=s.error?"error":"log";s[i].call(s,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!t&&n.currentStyle&&n.currentStyle[r];return o}function d(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(f(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];o--;)s.push("("+f(n[o])+":"+r+")");return s=s.join(" or "),l("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==c(e,null,"position")})}return t}function p(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function m(e,n,o,s){function a(){f&&(delete E.style,delete E.modElem)}if(s=r(s,"undefined")?!1:s,!r(o,"undefined")){var l=d(e,o);if(!r(l,"undefined"))return l}for(var f,c,m,v,h,y=["modernizr","tspan","samp"];!E.style&&y.length;)f=!0,E.modElem=i(y.shift()),E.style=E.modElem.style;for(m=e.length,c=0;m>c;c++)if(v=e[c],h=E.style[v],u(v,"-")&&(v=p(v)),E.style[v]!==t){if(s||r(o,"undefined"))return a(),"pfx"==n?v:!0;try{E.style[v]=o}catch(g){}if(E.style[v]!=h)return a(),"pfx"==n?v:!0}return a(),!1}function v(e,n){return function(){return e.apply(n,arguments)}}function h(e,n,t){var o;for(var s in e)if(e[s]in n)return t===!1?e[s]:(o=n[e[s]],r(o,"function")?v(o,t||n):o);return!1}function y(e,n,t,o,s){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+z.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?m(a,n,o,s):(a=(e+" "+k.join(i+" ")+i).split(" "),h(a,n,t))}function g(e,n,r){return y(e,t,t,n,r)}var C=[],w={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){C.push({name:e,fn:n,options:t})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=w,Modernizr=new Modernizr;var x=[],S=n.documentElement,_="svg"===S.nodeName.toLowerCase(),P=w._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];w._prefixes=P;var b=w.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var r=["@media (",P.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");b(r,function(e){t=9===e.offsetTop})}return t});var T="Moz O ms Webkit",z=w._config.usePrefixes?T.split(" "):[];w._cssomPrefixes=z;var j={elem:i("modernizr")};Modernizr._q.push(function(){delete j.elem});var E={style:j.elem.style};Modernizr._q.unshift(function(){delete E.style});var k=w._config.usePrefixes?T.toLowerCase().split(" "):[];w._domPrefixes=k,w.testAllProps=y,w.testAllProps=g,Modernizr.addTest("flexbox",g("flexBasis","1px",!0)),Modernizr.addTest("promises",function(){return"Promise"in e&&"resolve"in e.Promise&&"reject"in e.Promise&&"all"in e.Promise&&"race"in e.Promise&&function(){var n;return new e.Promise(function(e){n=e}),"function"==typeof n}()}),Modernizr.addTest("serviceworker","serviceWorker"in navigator),o(),s(x),delete w.addTest,delete w.addAsyncTest;for(var N=0;N<Modernizr._q.length;N++)Modernizr._q[N]();e.Modernizr=Modernizr}(window,document);
module.exports = window.Modernizr;
if (hadGlobal) { window.Modernizr = oldGlobal; }
else { delete window.Modernizr; }
})(window);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map