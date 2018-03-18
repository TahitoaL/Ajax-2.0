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
/******/ 	__webpack_require__.p = "/dist/";
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

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY3NzL2FwcC5zY3NzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9hcHAuc2Nzcz81NjczIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/css/app.scss\n");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _notification_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notification.js */ \"./src/js/notification.js\");\n/* harmony import */ var _css_app_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/app.scss */ \"./src/css/app.scss\");\n/* harmony import */ var _css_app_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_app_scss__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nvar dev = \"development\" == \"development\"\r\n\r\nvar getRequest = async function () {\r\n  var response = await get('https://toal.000webhostapp.com/transports/contents/horaires.php')\r\n  let ret = JSON.parse(response)\r\n  return ret\r\n}\r\n\r\nvar getUris = async function (sens) {\r\n  let horaires = await getRequest()\r\n  let times = {}\r\n  times.rer = []\r\n  times.bus = []\r\n  times.metro = []\r\n  horaires.forEach(function (horaire) {\r\n    if (horaire.type == \"RER\" && sens == horaire.trajet) {\r\n      times.rer.push('https://toal.000webhostapp.com/transports/contents/horaire_ajax_rer.php?ligne=' + horaire.ligne + '&station=' + horaire.station + '&sens=' + horaire.sens)\r\n    } else if (horaire.type == \"BUS\" && sens == horaire.trajet) {\r\n      times.bus.push('https://toal.000webhostapp.com/transports/contents/horaire_ajax_bus.php?ligne=' + horaire.ligne + '&station=' + horaire.station + '&sens=' + horaire.sens)\r\n    } else if (horaire.type == \"METRO\" && sens == horaire.trajet) {\r\n      times.metro.push('https://toal.000webhostapp.com/transports/contents/horaire_ajax_metro.php?ligne=' + horaire.ligne + '&station=' + horaire.station + '&sens=' + horaire.sens)\r\n    }\r\n  })\r\n  console.log('fin de la création')\r\n  return times\r\n}\r\n\r\nvar getSchedules = async function (sens) {\r\n  let response = await getUris(sens)\r\n}\r\n\r\ngetSchedules('0').then(function (results) {\r\n  console.log(results)\r\n})\r\n\r\ndocument.querySelectorAll('button').forEach(function (button) {\r\n  button.addEventListener('click', function (e) {\r\n    e.preventDefault()\r\n    console.log('Bonjour les enfants')\r\n    Object(_notification_js__WEBPACK_IMPORTED_MODULE_0__[\"createNotification\"])(this.getAttribute('data-notification-type'), this.getAttribute('data-notification-text') == undefined ? this.innerHTML.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : this.getAttribute('data-notification-text'))\r\n  })\r\n})\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYXBwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwcC5qcz85MGU5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlTm90aWZpY2F0aW9ufSBmcm9tICcuL25vdGlmaWNhdGlvbi5qcydcclxuaW1wb3J0IGNzcyBmcm9tICcuLi9jc3MvYXBwLnNjc3MnXHJcblxyXG52YXIgZGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT0gXCJkZXZlbG9wbWVudFwiXHJcblxyXG52YXIgZ2V0UmVxdWVzdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICB2YXIgcmVzcG9uc2UgPSBhd2FpdCBnZXQoJ2h0dHBzOi8vdG9hbC4wMDB3ZWJob3N0YXBwLmNvbS90cmFuc3BvcnRzL2NvbnRlbnRzL2hvcmFpcmVzLnBocCcpXHJcbiAgbGV0IHJldCA9IEpTT04ucGFyc2UocmVzcG9uc2UpXHJcbiAgcmV0dXJuIHJldFxyXG59XHJcblxyXG52YXIgZ2V0VXJpcyA9IGFzeW5jIGZ1bmN0aW9uIChzZW5zKSB7XHJcbiAgbGV0IGhvcmFpcmVzID0gYXdhaXQgZ2V0UmVxdWVzdCgpXHJcbiAgbGV0IHRpbWVzID0ge31cclxuICB0aW1lcy5yZXIgPSBbXVxyXG4gIHRpbWVzLmJ1cyA9IFtdXHJcbiAgdGltZXMubWV0cm8gPSBbXVxyXG4gIGhvcmFpcmVzLmZvckVhY2goZnVuY3Rpb24gKGhvcmFpcmUpIHtcclxuICAgIGlmIChob3JhaXJlLnR5cGUgPT0gXCJSRVJcIiAmJiBzZW5zID09IGhvcmFpcmUudHJhamV0KSB7XHJcbiAgICAgIHRpbWVzLnJlci5wdXNoKCdodHRwczovL3RvYWwuMDAwd2ViaG9zdGFwcC5jb20vdHJhbnNwb3J0cy9jb250ZW50cy9ob3JhaXJlX2FqYXhfcmVyLnBocD9saWduZT0nICsgaG9yYWlyZS5saWduZSArICcmc3RhdGlvbj0nICsgaG9yYWlyZS5zdGF0aW9uICsgJyZzZW5zPScgKyBob3JhaXJlLnNlbnMpXHJcbiAgICB9IGVsc2UgaWYgKGhvcmFpcmUudHlwZSA9PSBcIkJVU1wiICYmIHNlbnMgPT0gaG9yYWlyZS50cmFqZXQpIHtcclxuICAgICAgdGltZXMuYnVzLnB1c2goJ2h0dHBzOi8vdG9hbC4wMDB3ZWJob3N0YXBwLmNvbS90cmFuc3BvcnRzL2NvbnRlbnRzL2hvcmFpcmVfYWpheF9idXMucGhwP2xpZ25lPScgKyBob3JhaXJlLmxpZ25lICsgJyZzdGF0aW9uPScgKyBob3JhaXJlLnN0YXRpb24gKyAnJnNlbnM9JyArIGhvcmFpcmUuc2VucylcclxuICAgIH0gZWxzZSBpZiAoaG9yYWlyZS50eXBlID09IFwiTUVUUk9cIiAmJiBzZW5zID09IGhvcmFpcmUudHJhamV0KSB7XHJcbiAgICAgIHRpbWVzLm1ldHJvLnB1c2goJ2h0dHBzOi8vdG9hbC4wMDB3ZWJob3N0YXBwLmNvbS90cmFuc3BvcnRzL2NvbnRlbnRzL2hvcmFpcmVfYWpheF9tZXRyby5waHA/bGlnbmU9JyArIGhvcmFpcmUubGlnbmUgKyAnJnN0YXRpb249JyArIGhvcmFpcmUuc3RhdGlvbiArICcmc2Vucz0nICsgaG9yYWlyZS5zZW5zKVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgY29uc29sZS5sb2coJ2ZpbiBkZSBsYSBjcsOpYXRpb24nKVxyXG4gIHJldHVybiB0aW1lc1xyXG59XHJcblxyXG52YXIgZ2V0U2NoZWR1bGVzID0gYXN5bmMgZnVuY3Rpb24gKHNlbnMpIHtcclxuICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBnZXRVcmlzKHNlbnMpXHJcbn1cclxuXHJcbmdldFNjaGVkdWxlcygnMCcpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcclxuICBjb25zb2xlLmxvZyhyZXN1bHRzKVxyXG59KVxyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJykuZm9yRWFjaChmdW5jdGlvbiAoYnV0dG9uKSB7XHJcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgY29uc29sZS5sb2coJ0JvbmpvdXIgbGVzIGVuZmFudHMnKVxyXG4gICAgY3JlYXRlTm90aWZpY2F0aW9uKHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLW5vdGlmaWNhdGlvbi10eXBlJyksIHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLW5vdGlmaWNhdGlvbi10ZXh0JykgPT0gdW5kZWZpbmVkID8gdGhpcy5pbm5lckhUTUwucmVwbGFjZSgvJi9nLCcmYW1wOycpLnJlcGxhY2UoLzwvZywnJmx0OycpLnJlcGxhY2UoLz4vZywnJmd0OycpIDogdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbm90aWZpY2F0aW9uLXRleHQnKSlcclxuICB9KVxyXG59KVxyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/app.js\n");

/***/ }),

/***/ "./src/js/notification.js":
/*!********************************!*\
  !*** ./src/js/notification.js ***!
  \********************************/
/*! exports provided: createNotification */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createNotification\", function() { return createNotification; });\nfunction createNotification (type, text) {\r\n  let newElement = function (type, classes, content, parent) {\r\n    let el = document.createElement(type)\r\n    classes.forEach(function (cl) {\r\n      el.classList.add(cl)\r\n    })\r\n    if (content != \"\") {\r\n      el.innerHTML = content\r\n    }\r\n    parent.appendChild(el)\r\n    return el\r\n  }\r\n  var notifications = document.querySelectorAll('.notifications')\r\n  if (notifications.length == 0 && notifBox != \"\") {\r\n     var notifBox = newElement('div', ['notifications'], \"\", document.body)\r\n  } else {\r\n    var notifBox = notifications[0]\r\n  }\r\n  let types = ['success', 'error', 'info']\r\n  let titles = ['Succès', 'Erreur', 'Info']\r\n  let box = newElement('div', ['notification', 'notification-' + type], \"\", notifBox)\r\n  let title = newElement('span', ['notification__title'], titles[types.indexOf(type)] != undefined ? titles[types.indexOf(type)] : 'Notif', box)\r\n  let content = newElement('span', ['notification__content'], text, box)\r\n  let close = newElement('span', ['notification__close'], '<a href=\"#\">X</a>', box)\r\n  let progress_bar = newElement('span', ['notification__progress_bar'], '', box)\r\n  var closed = false\r\n  close.addEventListener('click', function (e) {\r\n    e.preventDefault()\r\n    closed = true\r\n    box.parentNode.removeChild(box)\r\n    clearTimeout(timer)\r\n  }, false)\r\n  let timer = setTimeout(function () {\r\n    box.setAttribute('style', 'animation-play-state: paused;')\r\n    setTimeout(function () {\r\n      box.setAttribute('style','animation-play-state: running;')\r\n      setTimeout(function () {\r\n        if (closed == false) {\r\n          box.parentNode.removeChild(box)\r\n        }\r\n      }, 500)\r\n    }, 4000)\r\n  }, 500)\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvbm90aWZpY2F0aW9uLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL25vdGlmaWNhdGlvbi5qcz82YzE3Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb3RpZmljYXRpb24gKHR5cGUsIHRleHQpIHtcclxuICBsZXQgbmV3RWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBjbGFzc2VzLCBjb250ZW50LCBwYXJlbnQpIHtcclxuICAgIGxldCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSlcclxuICAgIGNsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAoY2wpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbClcclxuICAgIH0pXHJcbiAgICBpZiAoY29udGVudCAhPSBcIlwiKSB7XHJcbiAgICAgIGVsLmlubmVySFRNTCA9IGNvbnRlbnRcclxuICAgIH1cclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbClcclxuICAgIHJldHVybiBlbFxyXG4gIH1cclxuICB2YXIgbm90aWZpY2F0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub3RpZmljYXRpb25zJylcclxuICBpZiAobm90aWZpY2F0aW9ucy5sZW5ndGggPT0gMCAmJiBub3RpZkJveCAhPSBcIlwiKSB7XHJcbiAgICAgdmFyIG5vdGlmQm94ID0gbmV3RWxlbWVudCgnZGl2JywgWydub3RpZmljYXRpb25zJ10sIFwiXCIsIGRvY3VtZW50LmJvZHkpXHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBub3RpZkJveCA9IG5vdGlmaWNhdGlvbnNbMF1cclxuICB9XHJcbiAgbGV0IHR5cGVzID0gWydzdWNjZXNzJywgJ2Vycm9yJywgJ2luZm8nXVxyXG4gIGxldCB0aXRsZXMgPSBbJ1N1Y2PDqHMnLCAnRXJyZXVyJywgJ0luZm8nXVxyXG4gIGxldCBib3ggPSBuZXdFbGVtZW50KCdkaXYnLCBbJ25vdGlmaWNhdGlvbicsICdub3RpZmljYXRpb24tJyArIHR5cGVdLCBcIlwiLCBub3RpZkJveClcclxuICBsZXQgdGl0bGUgPSBuZXdFbGVtZW50KCdzcGFuJywgWydub3RpZmljYXRpb25fX3RpdGxlJ10sIHRpdGxlc1t0eXBlcy5pbmRleE9mKHR5cGUpXSAhPSB1bmRlZmluZWQgPyB0aXRsZXNbdHlwZXMuaW5kZXhPZih0eXBlKV0gOiAnTm90aWYnLCBib3gpXHJcbiAgbGV0IGNvbnRlbnQgPSBuZXdFbGVtZW50KCdzcGFuJywgWydub3RpZmljYXRpb25fX2NvbnRlbnQnXSwgdGV4dCwgYm94KVxyXG4gIGxldCBjbG9zZSA9IG5ld0VsZW1lbnQoJ3NwYW4nLCBbJ25vdGlmaWNhdGlvbl9fY2xvc2UnXSwgJzxhIGhyZWY9XCIjXCI+WDwvYT4nLCBib3gpXHJcbiAgbGV0IHByb2dyZXNzX2JhciA9IG5ld0VsZW1lbnQoJ3NwYW4nLCBbJ25vdGlmaWNhdGlvbl9fcHJvZ3Jlc3NfYmFyJ10sICcnLCBib3gpXHJcbiAgdmFyIGNsb3NlZCA9IGZhbHNlXHJcbiAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjbG9zZWQgPSB0cnVlXHJcbiAgICBib3gucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChib3gpXHJcbiAgICBjbGVhclRpbWVvdXQodGltZXIpXHJcbiAgfSwgZmFsc2UpXHJcbiAgbGV0IHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICBib3guc2V0QXR0cmlidXRlKCdzdHlsZScsICdhbmltYXRpb24tcGxheS1zdGF0ZTogcGF1c2VkOycpXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgYm94LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCdhbmltYXRpb24tcGxheS1zdGF0ZTogcnVubmluZzsnKVxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoY2xvc2VkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICBib3gucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChib3gpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LCA1MDApXHJcbiAgICB9LCA0MDAwKVxyXG4gIH0sIDUwMClcclxufVxyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/notification.js\n");

/***/ })

/******/ });