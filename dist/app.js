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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/css/app.scss":
/*!**************************!*\
  !*** ./src/css/app.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/css/app.scss?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _notification = __webpack_require__(/*! ./notification.js */ \"./src/js/notification.js\");\n\nvar _app = __webpack_require__(/*! ../css/app.scss */ \"./src/css/app.scss\");\n\nvar _app2 = _interopRequireDefault(_app);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nvar dev = \"development\" == \"development\";\nconsole.log(dev ? 'development' : 'production');\n\nvar getRequest = function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    var response, ret;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return get('https://toal.000webhostapp.com/transports/contents/horaires.php');\n\n          case 2:\n            response = _context.sent;\n            ret = JSON.parse(response);\n            return _context.abrupt('return', ret);\n\n          case 5:\n          case 'end':\n            return _context.stop();\n        }\n      }\n    }, _callee, this);\n  }));\n\n  return function getRequest() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nvar getUris = function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(sens) {\n    var horaires, times;\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            _context2.next = 2;\n            return getRequest();\n\n          case 2:\n            horaires = _context2.sent;\n            times = {};\n\n            times.rer = [];\n            times.bus = [];\n            times.metro = [];\n            horaires.forEach(function (horaire) {\n              if (horaire.type == \"RER\" && sens == horaire.trajet) {\n                times.rer.push('https://toal.000webhostapp.com/transports/contents/horaire_ajax_rer.php?ligne=' + horaire.ligne + '&station=' + horaire.station + '&sens=' + horaire.sens);\n              } else if (horaire.type == \"BUS\" && sens == horaire.trajet) {\n                times.bus.push('https://toal.000webhostapp.com/transports/contents/horaire_ajax_bus.php?ligne=' + horaire.ligne + '&station=' + horaire.station + '&sens=' + horaire.sens);\n              } else if (horaire.type == \"METRO\" && sens == horaire.trajet) {\n                times.metro.push('https://toal.000webhostapp.com/transports/contents/horaire_ajax_metro.php?ligne=' + horaire.ligne + '&station=' + horaire.station + '&sens=' + horaire.sens);\n              }\n            });\n            console.log('fin de la création');\n            return _context2.abrupt('return', times);\n\n          case 10:\n          case 'end':\n            return _context2.stop();\n        }\n      }\n    }, _callee2, this);\n  }));\n\n  return function getUris(_x) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\ngetUris('0').then(function () {\n  console.log('requetes terminées');\n});\n\ndocument.querySelectorAll('button').forEach(function (button) {\n  button.addEventListener('click', function (e) {\n    e.preventDefault();\n    console.log('Bonjour les enfants');\n    (0, _notification.createNotification)(this.getAttribute('data-notification-type'), this.getAttribute('data-notification-text') == undefined ? this.innerHTML.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : this.getAttribute('data-notification-text'));\n  });\n});\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/notification.js":
/*!********************************!*\
  !*** ./src/js/notification.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createNotification = createNotification;\nfunction createNotification(type, text) {\n  var newElement = function newElement(type, classes, content, parent) {\n    var el = document.createElement(type);\n    classes.forEach(function (cl) {\n      el.classList.add(cl);\n    });\n    if (content != \"\") {\n      el.innerHTML = content;\n    }\n    parent.appendChild(el);\n    return el;\n  };\n  var notifications = document.querySelectorAll('.notifications');\n  if (notifications.length == 0 && notifBox != \"\") {\n    var notifBox = newElement('div', ['notifications'], \"\", document.body);\n  } else {\n    var notifBox = notifications[0];\n  }\n  var types = ['success', 'error', 'info'];\n  var titles = ['Succès', 'Erreur', 'Info'];\n  var box = newElement('div', ['notification', 'notification-' + type], \"\", notifBox);\n  var title = newElement('span', ['notification__title'], titles[types.indexOf(type)] != undefined ? titles[types.indexOf(type)] : 'Notif', box);\n  var content = newElement('span', ['notification__content'], text, box);\n  var close = newElement('span', ['notification__close'], '<a href=\"#\">X</a>', box);\n  var progress_bar = newElement('span', ['notification__progress_bar'], '', box);\n  var closed = false;\n  close.addEventListener('click', function (e) {\n    e.preventDefault();\n    closed = true;\n    box.parentNode.removeChild(box);\n    clearTimeout(timer);\n  }, false);\n  var timer = setTimeout(function () {\n    box.setAttribute('style', 'animation-play-state: paused;');\n    setTimeout(function () {\n      box.setAttribute('style', 'animation-play-state: running;');\n      setTimeout(function () {\n        if (closed == false) {\n          box.parentNode.removeChild(box);\n        }\n      }, 500);\n    }, 4000);\n  }, 500);\n}\n\n//# sourceURL=webpack:///./src/js/notification.js?");

/***/ })

/******/ });