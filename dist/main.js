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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/LO.js":
/*!*******************!*\
  !*** ./src/LO.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LexicoGraphicOrdering = function () {
  function LexicoGraphicOrdering(ctx, cities) {
    _classCallCheck(this, LexicoGraphicOrdering);

    this.ctx = ctx;
    this.cities = cities;
    this.fixedCities = cities;
    this.order = this.orderFunc(cities);
    this.shortestDistance = this.calculateTotalDistance(cities);
    this.bestPoints = cities;
    this.iterationNum = 0;
    this.nextOrder = this.nextOrder.bind(this);
    this.calculateTotalDistance = this.calculateTotalDistance.bind(this);
    this.orderFunc = this.orderFunc.bind(this);
    this.loSolve = this.loSolve.bind(this);
  }

  _createClass(LexicoGraphicOrdering, [{
    key: "orderFunc",
    value: function orderFunc(cities) {
      var orderedArr = [];
      for (var i = 0; i < cities.length; i++) {
        orderedArr[i] = i;
      }

      return orderedArr;
    }
  }, {
    key: "calculateTotalDistance",
    value: function calculateTotalDistance(arr) {
      var totalDistance = 0;

      for (var i = 0; i < arr.length - 1; i++) {
        var a = arr[i].x - arr[i + 1].x;
        var b = arr[i].y - arr[i + 1].y;
        var distance = Math.hypot(a, b);
        totalDistance += distance;
      };

      return totalDistance;
    }
  }, {
    key: "loSolve",
    value: function loSolve() {
      this.ctx.clearRect(0, 0, 400, 400);
      this.ctx.fillStyle = "black";
      this.ctx.globalAlpha = 0.2;
      this.ctx.fillRect(0, 0, 400, 400);

      for (var i = 0; i < this.cities.length; i++) {
        this.ctx.beginPath();
        var x = this.cities[this.order[i]].x;
        var y = this.cities[this.order[i]].y;
        var radius = 3;
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
      };

      this.ctx.beginPath();
      for (var _i = 0; _i < this.order.length - 1; _i++) {
        this.ctx.moveTo(this.fixedCities[this.order[_i]].x, this.fixedCities[this.order[_i]].y);
        this.ctx.lineTo(this.fixedCities[this.order[_i + 1]].x, this.fixedCities[this.order[_i + 1]].y);
        this.ctx.closePath();
      };
      this.ctx.strokeStyle = "#111e6c";
      this.ctx.stroke();

      this.ctx.beginPath();
      for (var _i2 = 0; _i2 < this.bestPoints.length - 1; _i2++) {
        this.ctx.moveTo(this.bestPoints[_i2].x, this.bestPoints[_i2].y);
        this.ctx.lineTo(this.bestPoints[_i2 + 1].x, this.bestPoints[_i2 + 1].y);
        this.ctx.closePath();
      };
      this.ctx.strokeStyle = "red";
      this.ctx.stroke();

      if (Math.floor(this.iterationNum / this.factorial(this.cities.length) * 100) < 100) {
        this.iterationNum += 1;
      }

      var totalDistance = this.calculateTotalDistance(this.cities);
      if (this.shortestDistance >= totalDistance) {
        this.shortestDistance = totalDistance;
        this.bestPoints = this.cities;
      }

      document.getElementById("percentComplete").innerHTML = "Percent Complete: " + Number(this.iterationNum / this.factorial(this.cities.length) * 100).toFixed(2) + "%";
      document.getElementById("brute-distance").innerHTML = "Shortest pixel distance so far: " + Math.floor(this.shortestDistance);
      this.nextOrder();
      debugger;
      console.log(this.order);
    }
  }, {
    key: "nextOrder",
    value: function nextOrder() {
      var orderedArray = this.order;
      var largestX = Infinity;
      var citiesArr = this.cities.slice();
      for (var i = 0; i < orderedArray.length - 1; i++) {
        if (orderedArray[i] < orderedArray[i + 1]) {
          largestX = i;
        }
      }

      var largestY = Infinity;
      for (var j = 0; j < orderedArray.length; j++) {
        if (orderedArray[largestX] < orderedArray[j]) {
          largestY = j;
        }
      }

      var _ref = [orderedArray[largestY], orderedArray[largestX]];
      orderedArray[largestX] = _ref[0];
      orderedArray[largestY] = _ref[1];
      var _ref2 = [citiesArr[orderedArray[largestY]], citiesArr[orderedArray[largestX]]];
      citiesArr[orderedArray[largestX]] = _ref2[0];
      citiesArr[orderedArray[largestY]] = _ref2[1];


      var splicedSuffix = orderedArray.splice(largestX + 1);
      orderedArray = orderedArray.concat(splicedSuffix.reverse());
      this.order = orderedArray;
      this.cities = citiesArr;
    }
  }, {
    key: "factorial",
    value: function factorial(num) {
      var result = 1;
      for (var i = 1; i <= num; i++) {
        result *= i;
      }

      return result;
    }
  }]);

  return LexicoGraphicOrdering;
}();

exports.default = LexicoGraphicOrdering;

/***/ }),

/***/ "./src/SA.js":
/*!*******************!*\
  !*** ./src/SA.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimulatedAnnealing = function () {
  function SimulatedAnnealing(ctx, cities) {
    _classCallCheck(this, SimulatedAnnealing);

    this.ctx = ctx;
    this.cities = cities;
    this.shortestDistance = Infinity;
    this.bestPoints = [];
    this.startTemperature = 100;
    this.stopTemperature = .001;
    this.dropTemperatureProbability = .998;
    this.saSolve = this.saSolve.bind(this);
    this.calculateTotalDistance = this.calculateTotalDistance.bind(this);
    this.swap = this.swap.bind(this);
    this.saDraw = this.saDraw.bind(this);
  }

  _createClass(SimulatedAnnealing, [{
    key: "defaultSettings",
    value: function defaultSettings() {
      this.ctx.clearRect(0, 0, 400, 400);
      this.shortestDistance = Infinity;
      this.bestPoints = [];
      this.startTemperature = 100;
      this.stopTemperature = .001;
      this.dropTemperatureProbability = .998;
    }
  }, {
    key: "calculateTotalDistance",
    value: function calculateTotalDistance(arr) {
      var totalDistance = 0;

      for (var i = 0; i < arr.length - 1; i++) {
        var a = arr[i].x - arr[i + 1].x;
        var b = arr[i].y - arr[i + 1].y;
        var distance = Math.hypot(a, b);
        totalDistance += distance;
      };

      return totalDistance;
    }
  }, {
    key: "swap",
    value: function swap() {
      var copy = this.cities.slice();
      var limit = copy.length;
      var cityA = Math.floor(Math.random() * limit);
      var cityB = Math.floor(Math.random() * limit);
      var _ref = [copy[cityB], copy[cityA]];
      copy[cityA] = _ref[0];
      copy[cityB] = _ref[1];

      return copy;
    }
  }, {
    key: "saDraw",
    value: function saDraw() {
      this.ctx.clearRect(0, 0, 400, 400);
      this.ctx.fillStyle = "black";
      this.ctx.globalAlpha = 0.2;
      this.ctx.fillRect(0, 0, 400, 400);
      for (var i = 0; i < this.cities.length; i++) {
        this.ctx.beginPath();
        var x = this.cities[i].x;
        var y = this.cities[i].y;
        var radius = 3;
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
      };

      this.ctx.beginPath();
      for (var _i = 0; _i < this.bestPoints.length - 1; _i++) {
        this.ctx.moveTo(this.bestPoints[_i].x, this.bestPoints[_i].y);
        this.ctx.lineTo(this.bestPoints[_i + 1].x, this.bestPoints[_i + 1].y);
        this.ctx.closePath();
      };
      this.ctx.strokeStyle = "#111e6c";
      this.ctx.stroke();
    }
  }, {
    key: "saSolve",
    value: function saSolve() {

      if (this.startTemperature > this.stopTemperature) {
        var swappedCities = this.swap();
        var oldRouteCost = this.calculateTotalDistance(this.cities);
        var newRouteCost = this.calculateTotalDistance(swappedCities);
        var cost = newRouteCost - oldRouteCost;
        if (cost < 0 || Math.random() <= Math.exp((0 - cost) / this.startTemperature)) {
          this.cities = swappedCities;
          if (this.shortestDistance >= newRouteCost) {
            this.shortestDistance = newRouteCost;
            this.bestPoints = swappedCities;
          }
          document.getElementById("sa-temp").innerHTML = "Temperature: " + Math.floor(this.startTemperature);
          document.getElementById("sa-distance").innerHTML = "Shortest pixel distance so far: " + Math.floor(this.shortestDistance);
        }
      }
      this.startTemperature *= this.dropTemperatureProbability;
      this.saDraw();
    }
  }]);

  return SimulatedAnnealing;
}();

exports.default = SimulatedAnnealing;
;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _SA = __webpack_require__(/*! ./SA */ "./src/SA.js");

var _SA2 = _interopRequireDefault(_SA);

var _LO = __webpack_require__(/*! ./LO */ "./src/LO.js");

var _LO2 = _interopRequireDefault(_LO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  var canvas2 = document.getElementById("myCanvasTwo");
  var ctx2 = canvas2.getContext("2d");

  var canvas3 = document.getElementById("myCanvasThree");
  var ctx3 = canvas3.getContext("2d");

  var maxDimension = 400;

  var totalCities = 8;
  var cities = [];

  var populationNumber = 500;
  var populationArray = [];
  var fitness = [];
  var mutationRate = .05;
  var crossoverRate = .3;
  var numGenerations = 0;

  var shortestDistanceSoFar = Infinity;
  var bestPoints = [];

  var range = document.getElementById("cities-setter");
  var label = document.getElementById("city-num");
  range.addEventListener('change', changeTotalCities);

  function changeTotalCities() {
    totalCities = range.value;
    label.innerHTML = 'Number of Cities: ' + totalCities;
    remap();
  }

  createRandomPoints(totalCities, maxDimension, ctx, ctx2, ctx3);
  var SA = new _SA2.default(ctx2, cities);
  var LO = new _LO2.default(ctx3, cities);

  function createRandomPoints(totalCities, maxDimension) {
    createRandomCities(totalCities);

    for (var _len = arguments.length, ctxArr = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      ctxArr[_key - 2] = arguments[_key];
    }

    for (var i = 0; i < ctxArr.length; i++) {
      ctxArr[i].fillStyle = "black";
      ctxArr[i].globalAlpha = 0.2;
      ctxArr[i].fillRect(0, 0, maxDimension, maxDimension);

      for (var j = 0; j < cities.length; j++) {
        ctxArr[i].beginPath();
        var radius = 3;
        ctxArr[i].arc(cities[j].x, cities[j].y, radius, 0, 2 * Math.PI);
        ctxArr[i].fillStyle = "black";
        ctxArr[i].fill();
        ctxArr[i].closePath();
      };
    }

    populate(populationArray, populationNumber, cities);
  };

  function createRandomCities(totalCities) {
    for (var i = 0; i < totalCities; i++) {
      var rand_x = Math.random(i) * maxDimension;
      var rand_y = Math.random(i) * maxDimension;
      cities[i] = {
        x: rand_x,
        y: rand_y
      };
    };
  }

  function populate(popArray, num, fromArr) {
    for (var i = 0; i < num; i++) {
      var shuffled = shuffle(fromArr);
      popArray.push(shuffled);
    };

    return popArray;
  };

  function gaDraw() {
    ctx.clearRect(0, 0, maxDimension, maxDimension);
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.2;
    ctx.fillRect(0, 0, maxDimension, maxDimension);
    for (var i = 0; i < totalCities; i++) {
      ctx.beginPath();
      var x = cities[i].x;
      var y = cities[i].y;
      var radius = 3;
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();
    };
    cities = shuffle(cities);

    calculateFitness(populationArray);
    checkShortestDistance(populationArray);
    nextGeneration();
    numGenerations += 1;
    document.getElementById("ga-generation").innerHTML = 'Generations: ' + numGenerations;
  };

  function shuffle(toShuffle) {
    var a = toShuffle.length;
    var myArr = toShuffle.slice();
    while (a) {
      var b = Math.floor(Math.random() * a--);
      var _ref = [myArr[b], myArr[a]];
      myArr[a] = _ref[0];
      myArr[b] = _ref[1];
    };
    return myArr;
  };

  function checkShortestDistance(populationArr) {
    for (var i = 0; i < populationArr.length; i++) {
      var currentDistance = calculateTotalDistance(populationArr[i]);

      if (shortestDistanceSoFar > currentDistance) {
        shortestDistanceSoFar = currentDistance;
        bestPoints = populationArr[i].slice();
        document.getElementById("ga-distance").innerHTML = 'Shortest pixel distance so far: ' + Math.floor(shortestDistanceSoFar);
      };
    }

    ctx.beginPath();
    for (var _i = 0; _i < bestPoints.length - 1; _i++) {
      ctx.moveTo(bestPoints[_i].x, bestPoints[_i].y);
      ctx.lineTo(bestPoints[_i + 1].x, bestPoints[_i + 1].y);
      ctx.closePath();
    };
    ctx.strokeStyle = "#111e6c";
    ctx.stroke();
  };

  function calculateTotalDistance(array) {
    var sum = 0;
    for (var i = 0; i < array.length - 1; i++) {
      var a = array[i].x - array[i + 1].x;
      var b = array[i].y - array[i + 1].y;
      var distance = Math.hypot(a, b);
      sum += distance;
    };

    return sum;
  };

  function calculateFitness(populationArr) {
    for (var i = 0; i < populationArr.length; i++) {
      var dist = calculateTotalDistance(populationArr[i]);
      fitness[i] = 1 / dist;
    };

    var sum = 0;
    for (var _i2 = 0; _i2 < fitness.length; _i2++) {
      sum += fitness[_i2];
    };

    for (var _i3 = 0; _i3 < fitness.length; _i3++) {
      fitness[_i3] = fitness[_i3] / sum;
    };
  };

  function randomPick() {
    var index = 0;
    var i = Math.random();

    while (i > 0) {
      i -= fitness[index];

      if (i > 0) {
        index += 1;
      };
    };

    return populationArray[index];
  };

  function nextGeneration() {
    var newPopulationArray = [];

    for (var i = 0; i < populationArray.length; i++) {
      var firstParent = randomPick();
      var secondParent = randomPick();
      var childRoute = crossover(firstParent, secondParent, crossoverRate);
      var mutantChild = mutate(childRoute, mutationRate);
      newPopulationArray[i] = mutantChild;
    };
    populationArray = newPopulationArray;
  };

  function mutate(array, mutationRate) {
    if (Math.random() <= mutationRate) {
      return shuffle(array);
    };

    return array;
  };

  function crossover(firstParent, secondParent, crossoverRate) {
    if (Math.random() <= crossoverRate) {

      var limit = Math.floor(firstParent.length) + 1;
      var _start = Math.floor(Math.random() * limit);
      var child = firstParent.slice(_start, limit);

      for (var i = 0; i < secondParent.length; i++) {
        if (!child.includes(secondParent[i])) {
          child.push(secondParent[i]);
        };
      };
      return child;
    };
    return firstParent;
  };

  //buttons: buttons: buttons: buttons: buttons: 

  function start() {
    if (!window.GA) {
      window.GA = setInterval(gaDraw, 0);
    };
    if (!window.SAnn) {
      window.SAnn = setInterval(SA.saSolve.bind(this), 0);
    };
    if (!window.LOnn) {
      window.LOnn = setInterval(LO.loSolve.bind(this), 0);
    };
  };

  function stop() {
    clearInterval(window.GA);
    window.GA = null;
    clearInterval(window.SAnn);
    window.SAnn = null;
    clearInterval(window.LOnn);
    window.LOnn = null;
  };

  function remap() {
    stop();
    cities = [];
    shortestDistanceSoFar = Infinity;
    bestPoints = [];
    populationArray = [];
    numGenerations = 0;
    ctx.clearRect(0, 0, maxDimension, maxDimension);
    SA.defaultSettings();
    ctx3.clearRect(0, 0, maxDimension, maxDimension);
    createRandomPoints(totalCities, maxDimension, ctx, ctx2, ctx3);
    SA = new _SA2.default(ctx2, cities);
    LO = new _LO2.default(ctx3, cities);

    document.getElementById("ga-generation").innerHTML = "Generations: 0";
    document.getElementById("sa-temp").innerHTML = "Temperature: 0";
    document.getElementById("ga-distance").innerHTML = "Shortest pixel distance so far: 0";
    document.getElementById("sa-distance").innerHTML = "Shortest pixel distance so far: 0";
    document.getElementById("brute-distance").innerHTML = "Shortest pixel distance so far: 0";
    document.getElementById("percentComplete").innerHTML = "Percent Complete: 0.00%";
  }

  var play = document.getElementById("play");
  play.addEventListener("click", start);

  var pause = document.getElementById("pause");
  pause.addEventListener("click", stop);

  var reset = document.getElementById("reset");
  reset.addEventListener("click", remap);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xPLmpzIiwid2VicGFjazovLy8uL3NyYy9TQS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiTGV4aWNvR3JhcGhpY09yZGVyaW5nIiwiY3R4IiwiY2l0aWVzIiwiZml4ZWRDaXRpZXMiLCJvcmRlciIsIm9yZGVyRnVuYyIsInNob3J0ZXN0RGlzdGFuY2UiLCJjYWxjdWxhdGVUb3RhbERpc3RhbmNlIiwiYmVzdFBvaW50cyIsIml0ZXJhdGlvbk51bSIsIm5leHRPcmRlciIsImJpbmQiLCJsb1NvbHZlIiwib3JkZXJlZEFyciIsImkiLCJsZW5ndGgiLCJhcnIiLCJ0b3RhbERpc3RhbmNlIiwiYSIsIngiLCJiIiwieSIsImRpc3RhbmNlIiwiTWF0aCIsImh5cG90IiwiY2xlYXJSZWN0IiwiZmlsbFN0eWxlIiwiZ2xvYmFsQWxwaGEiLCJmaWxsUmVjdCIsImJlZ2luUGF0aCIsInJhZGl1cyIsImFyYyIsIlBJIiwiZmlsbCIsImNsb3NlUGF0aCIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZVN0eWxlIiwic3Ryb2tlIiwiZmxvb3IiLCJmYWN0b3JpYWwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwiTnVtYmVyIiwidG9GaXhlZCIsImNvbnNvbGUiLCJsb2ciLCJvcmRlcmVkQXJyYXkiLCJsYXJnZXN0WCIsIkluZmluaXR5IiwiY2l0aWVzQXJyIiwic2xpY2UiLCJsYXJnZXN0WSIsImoiLCJzcGxpY2VkU3VmZml4Iiwic3BsaWNlIiwiY29uY2F0IiwicmV2ZXJzZSIsIm51bSIsInJlc3VsdCIsIlNpbXVsYXRlZEFubmVhbGluZyIsInN0YXJ0VGVtcGVyYXR1cmUiLCJzdG9wVGVtcGVyYXR1cmUiLCJkcm9wVGVtcGVyYXR1cmVQcm9iYWJpbGl0eSIsInNhU29sdmUiLCJzd2FwIiwic2FEcmF3IiwiY29weSIsImxpbWl0IiwiY2l0eUEiLCJyYW5kb20iLCJjaXR5QiIsInN3YXBwZWRDaXRpZXMiLCJvbGRSb3V0ZUNvc3QiLCJuZXdSb3V0ZUNvc3QiLCJjb3N0IiwiZXhwIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhbnZhcyIsImdldENvbnRleHQiLCJjYW52YXMyIiwiY3R4MiIsImNhbnZhczMiLCJjdHgzIiwibWF4RGltZW5zaW9uIiwidG90YWxDaXRpZXMiLCJwb3B1bGF0aW9uTnVtYmVyIiwicG9wdWxhdGlvbkFycmF5IiwiZml0bmVzcyIsIm11dGF0aW9uUmF0ZSIsImNyb3Nzb3ZlclJhdGUiLCJudW1HZW5lcmF0aW9ucyIsInNob3J0ZXN0RGlzdGFuY2VTb0ZhciIsInJhbmdlIiwibGFiZWwiLCJjaGFuZ2VUb3RhbENpdGllcyIsInZhbHVlIiwicmVtYXAiLCJjcmVhdGVSYW5kb21Qb2ludHMiLCJTQSIsIkxPIiwiY3JlYXRlUmFuZG9tQ2l0aWVzIiwiY3R4QXJyIiwicG9wdWxhdGUiLCJyYW5kX3giLCJyYW5kX3kiLCJwb3BBcnJheSIsImZyb21BcnIiLCJzaHVmZmxlZCIsInNodWZmbGUiLCJwdXNoIiwiZ2FEcmF3IiwiY2FsY3VsYXRlRml0bmVzcyIsImNoZWNrU2hvcnRlc3REaXN0YW5jZSIsIm5leHRHZW5lcmF0aW9uIiwidG9TaHVmZmxlIiwibXlBcnIiLCJwb3B1bGF0aW9uQXJyIiwiY3VycmVudERpc3RhbmNlIiwiYXJyYXkiLCJzdW0iLCJkaXN0IiwicmFuZG9tUGljayIsImluZGV4IiwibmV3UG9wdWxhdGlvbkFycmF5IiwiZmlyc3RQYXJlbnQiLCJzZWNvbmRQYXJlbnQiLCJjaGlsZFJvdXRlIiwiY3Jvc3NvdmVyIiwibXV0YW50Q2hpbGQiLCJtdXRhdGUiLCJzdGFydCIsImNoaWxkIiwiaW5jbHVkZXMiLCJHQSIsInNldEludGVydmFsIiwiU0FubiIsIkxPbm4iLCJzdG9wIiwiY2xlYXJJbnRlcnZhbCIsImRlZmF1bHRTZXR0aW5ncyIsInBsYXkiLCJwYXVzZSIsInJlc2V0Il0sIm1h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TUFBeEIsQ0FBYjtBQUNBcUcsT0FBS2hFLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCc0QsS0FBL0I7O0FBRUEsTUFBTVcsUUFBUXZHLFNBQVNDLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBZDtBQUNBc0csUUFBTWpFLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDNkQsSUFBaEM7O0FBRUEsTUFBTUssUUFBUXhHLFNBQVNDLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBZDtBQUNBdUcsUUFBTWxFLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDb0IsS0FBaEM7QUFDRCxDQWxSRCxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExleGljb0dyYXBoaWNPcmRlcmluZyB7XG4gIGNvbnN0cnVjdG9yKGN0eCwgY2l0aWVzKSB7XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy5jaXRpZXMgPSBjaXRpZXM7XG4gICAgdGhpcy5maXhlZENpdGllcyA9IGNpdGllcztcbiAgICB0aGlzLm9yZGVyID0gdGhpcy5vcmRlckZ1bmMoY2l0aWVzKTtcbiAgICB0aGlzLnNob3J0ZXN0RGlzdGFuY2UgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsRGlzdGFuY2UoY2l0aWVzKTtcbiAgICB0aGlzLmJlc3RQb2ludHMgPSBjaXRpZXM7XG4gICAgdGhpcy5pdGVyYXRpb25OdW0gPSAwO1xuICAgIHRoaXMubmV4dE9yZGVyID0gdGhpcy5uZXh0T3JkZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsRGlzdGFuY2UgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsRGlzdGFuY2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9yZGVyRnVuYyA9IHRoaXMub3JkZXJGdW5jLmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb1NvbHZlID0gdGhpcy5sb1NvbHZlLmJpbmQodGhpcyk7XG4gIH1cblxuICBvcmRlckZ1bmMoY2l0aWVzKSB7XG4gICAgbGV0IG9yZGVyZWRBcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNpdGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgb3JkZXJlZEFycltpXSA9IGk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9yZGVyZWRBcnI7XG4gIH1cblxuICBjYWxjdWxhdGVUb3RhbERpc3RhbmNlKGFycikge1xuICAgIGxldCB0b3RhbERpc3RhbmNlID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgbGV0IGEgPSBhcnJbaV0ueCAtIGFycltpICsgMV0ueDtcbiAgICAgIGxldCBiID0gYXJyW2ldLnkgLSBhcnJbaSArIDFdLnk7XG4gICAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLmh5cG90KGEsIGIpO1xuICAgICAgdG90YWxEaXN0YW5jZSArPSBkaXN0YW5jZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRvdGFsRGlzdGFuY2U7XG4gIH07XG5cbiAgbG9Tb2x2ZSgpIHtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgNDAwLCA0MDApO1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICB0aGlzLmN0eC5nbG9iYWxBbHBoYSA9IDAuMjtcbiAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCA0MDAsIDQwMCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2l0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGxldCB4ID0gdGhpcy5jaXRpZXNbdGhpcy5vcmRlcltpXV0ueDtcbiAgICAgIGxldCB5ID0gdGhpcy5jaXRpZXNbdGhpcy5vcmRlcltpXV0ueTtcbiAgICAgIGxldCByYWRpdXMgPSAzO1xuICAgICAgdGhpcy5jdHguYXJjKHgsIHksIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgdGhpcy5jdHguZmlsbCgpO1xuICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgfTtcblxuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcmRlci5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIHRoaXMuY3R4Lm1vdmVUbyh0aGlzLmZpeGVkQ2l0aWVzW3RoaXMub3JkZXJbaV1dLngsIHRoaXMuZml4ZWRDaXRpZXNbdGhpcy5vcmRlcltpXV0ueSk7XG4gICAgICB0aGlzLmN0eC5saW5lVG8odGhpcy5maXhlZENpdGllc1t0aGlzLm9yZGVyW2kgKyAxXV0ueCwgdGhpcy5maXhlZENpdGllc1t0aGlzLm9yZGVyW2kgKyAxXV0ueSk7XG4gICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB9O1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCIjMTExZTZjXCI7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgXG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJlc3RQb2ludHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICB0aGlzLmN0eC5tb3ZlVG8odGhpcy5iZXN0UG9pbnRzW2ldLngsIHRoaXMuYmVzdFBvaW50c1tpXS55KTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLmJlc3RQb2ludHNbaSArIDFdLngsIHRoaXMuYmVzdFBvaW50c1tpICsgMV0ueSk7XG4gICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICB9O1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJyZWRcIjtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICBcbiAgICBpZiAoTWF0aC5mbG9vcigodGhpcy5pdGVyYXRpb25OdW0gLyB0aGlzLmZhY3RvcmlhbCh0aGlzLmNpdGllcy5sZW5ndGgpKSAqIDEwMCkgPCAxMDApIHtcbiAgICAgIHRoaXMuaXRlcmF0aW9uTnVtICs9IDE7XG4gICAgfVxuXG4gICAgbGV0IHRvdGFsRGlzdGFuY2UgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsRGlzdGFuY2UodGhpcy5jaXRpZXMpO1xuICAgIGlmICh0aGlzLnNob3J0ZXN0RGlzdGFuY2UgPj0gdG90YWxEaXN0YW5jZSkge1xuICAgICAgdGhpcy5zaG9ydGVzdERpc3RhbmNlID0gdG90YWxEaXN0YW5jZTtcbiAgICAgIHRoaXMuYmVzdFBvaW50cyA9IHRoaXMuY2l0aWVzO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGVyY2VudENvbXBsZXRlXCIpLmlubmVySFRNTCA9IGBQZXJjZW50IENvbXBsZXRlOiAke051bWJlcih0aGlzLml0ZXJhdGlvbk51bSAvIHRoaXMuZmFjdG9yaWFsKHRoaXMuY2l0aWVzLmxlbmd0aCkgKiAxMDApLnRvRml4ZWQoMil9JWA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJicnV0ZS1kaXN0YW5jZVwiKS5pbm5lckhUTUwgPSBgU2hvcnRlc3QgcGl4ZWwgZGlzdGFuY2Ugc28gZmFyOiAke01hdGguZmxvb3IodGhpcy5zaG9ydGVzdERpc3RhbmNlKX1gO1xuICAgIHRoaXMubmV4dE9yZGVyKCk7XG4gICAgZGVidWdnZXJcbiAgICBjb25zb2xlLmxvZyh0aGlzLm9yZGVyKTtcbiAgfVxuXG4gIG5leHRPcmRlcigpIHtcbiAgICBsZXQgb3JkZXJlZEFycmF5ID0gdGhpcy5vcmRlcjtcbiAgICBsZXQgbGFyZ2VzdFggPSBJbmZpbml0eTtcbiAgICBsZXQgY2l0aWVzQXJyID0gdGhpcy5jaXRpZXMuc2xpY2UoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9yZGVyZWRBcnJheS5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGlmIChvcmRlcmVkQXJyYXlbaV0gPCBvcmRlcmVkQXJyYXlbaSArIDFdKSB7XG4gICAgICAgIGxhcmdlc3RYID0gaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbGFyZ2VzdFkgPSBJbmZpbml0eTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IG9yZGVyZWRBcnJheS5sZW5ndGg7IGorKykge1xuICAgICAgaWYgKG9yZGVyZWRBcnJheVtsYXJnZXN0WF0gPCBvcmRlcmVkQXJyYXlbal0pIHtcbiAgICAgICAgbGFyZ2VzdFkgPSBqO1xuICAgICAgfVxuICAgIH1cblxuICAgIFtvcmRlcmVkQXJyYXlbbGFyZ2VzdFhdLCBvcmRlcmVkQXJyYXlbbGFyZ2VzdFldXSA9IFtvcmRlcmVkQXJyYXlbbGFyZ2VzdFldLCBvcmRlcmVkQXJyYXlbbGFyZ2VzdFhdXTtcbiAgICBbY2l0aWVzQXJyW29yZGVyZWRBcnJheVtsYXJnZXN0WF1dLCBjaXRpZXNBcnJbb3JkZXJlZEFycmF5W2xhcmdlc3RZXV1dID0gW2NpdGllc0FycltvcmRlcmVkQXJyYXlbbGFyZ2VzdFldXSwgY2l0aWVzQXJyW29yZGVyZWRBcnJheVtsYXJnZXN0WF1dXTtcblxuICAgIGxldCBzcGxpY2VkU3VmZml4ID0gb3JkZXJlZEFycmF5LnNwbGljZShsYXJnZXN0WCArIDEpO1xuICAgIG9yZGVyZWRBcnJheSA9IG9yZGVyZWRBcnJheS5jb25jYXQoc3BsaWNlZFN1ZmZpeC5yZXZlcnNlKCkpO1xuICAgIHRoaXMub3JkZXIgPSBvcmRlcmVkQXJyYXk7XG4gICAgdGhpcy5jaXRpZXMgPSBjaXRpZXNBcnI7XG4gIH1cblxuICBmYWN0b3JpYWwobnVtKSB7XG4gICAgbGV0IHJlc3VsdCA9IDE7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbnVtOyBpKyspIHtcbiAgICAgIHJlc3VsdCAqPSBpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXVsYXRlZEFubmVhbGluZyB7XG4gIGNvbnN0cnVjdG9yKGN0eCwgY2l0aWVzKSB7XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy5jaXRpZXMgPSBjaXRpZXM7XG4gICAgdGhpcy5zaG9ydGVzdERpc3RhbmNlID0gSW5maW5pdHk7XG4gICAgdGhpcy5iZXN0UG9pbnRzID0gW107XG4gICAgdGhpcy5zdGFydFRlbXBlcmF0dXJlID0gMTAwO1xuICAgIHRoaXMuc3RvcFRlbXBlcmF0dXJlID0gLjAwMTtcbiAgICB0aGlzLmRyb3BUZW1wZXJhdHVyZVByb2JhYmlsaXR5ID0gLjk5ODtcbiAgICB0aGlzLnNhU29sdmUgPSB0aGlzLnNhU29sdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsRGlzdGFuY2UgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsRGlzdGFuY2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN3YXAgPSB0aGlzLnN3YXAuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNhRHJhdyA9IHRoaXMuc2FEcmF3LmJpbmQodGhpcyk7XG4gIH1cblxuICBkZWZhdWx0U2V0dGluZ3MoKSB7XG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIDQwMCwgNDAwKTtcbiAgICB0aGlzLnNob3J0ZXN0RGlzdGFuY2UgPSBJbmZpbml0eTtcbiAgICB0aGlzLmJlc3RQb2ludHMgPSBbXTtcbiAgICB0aGlzLnN0YXJ0VGVtcGVyYXR1cmUgPSAxMDA7XG4gICAgdGhpcy5zdG9wVGVtcGVyYXR1cmUgPSAuMDAxO1xuICAgIHRoaXMuZHJvcFRlbXBlcmF0dXJlUHJvYmFiaWxpdHkgPSAuOTk4O1xuICB9XG5cbiAgY2FsY3VsYXRlVG90YWxEaXN0YW5jZShhcnIpIHtcbiAgICBsZXQgdG90YWxEaXN0YW5jZSA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGxldCBhID0gYXJyW2ldLnggLSBhcnJbaSArIDFdLng7XG4gICAgICBsZXQgYiA9IGFycltpXS55IC0gYXJyW2kgKyAxXS55O1xuICAgICAgbGV0IGRpc3RhbmNlID0gTWF0aC5oeXBvdChhLCBiKTtcbiAgICAgIHRvdGFsRGlzdGFuY2UgKz0gZGlzdGFuY2U7XG4gICAgfTtcblxuICAgIHJldHVybiB0b3RhbERpc3RhbmNlO1xuICB9O1xuXG4gIHN3YXAoKSB7XG4gICAgbGV0IGNvcHkgPSB0aGlzLmNpdGllcy5zbGljZSgpO1xuICAgIGxldCBsaW1pdCA9IGNvcHkubGVuZ3RoO1xuICAgIGxldCBjaXR5QSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxpbWl0KTtcbiAgICBsZXQgY2l0eUIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsaW1pdCk7XG4gICAgW2NvcHlbY2l0eUFdLCBjb3B5W2NpdHlCXV0gPSBbY29weVtjaXR5Ql0sIGNvcHlbY2l0eUFdXTtcbiAgICByZXR1cm4gY29weTtcbiAgfVxuXG4gIHNhRHJhdygpIHtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgNDAwLCA0MDApO1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICB0aGlzLmN0eC5nbG9iYWxBbHBoYSA9IDAuMjtcbiAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCA0MDAsIDQwMCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNpdGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICBsZXQgeCA9IHRoaXMuY2l0aWVzW2ldLng7XG4gICAgICBsZXQgeSA9IHRoaXMuY2l0aWVzW2ldLnk7XG4gICAgICBsZXQgcmFkaXVzID0gMztcbiAgICAgIHRoaXMuY3R4LmFyYyh4LCB5LCByYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIH07XG5cbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmVzdFBvaW50cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIHRoaXMuY3R4Lm1vdmVUbyh0aGlzLmJlc3RQb2ludHNbaV0ueCwgdGhpcy5iZXN0UG9pbnRzW2ldLnkpO1xuICAgICAgdGhpcy5jdHgubGluZVRvKHRoaXMuYmVzdFBvaW50c1tpICsgMV0ueCwgdGhpcy5iZXN0UG9pbnRzW2kgKyAxXS55KTtcbiAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIH07XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIiMxMTFlNmNcIjtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIHNhU29sdmUoKSB7XG5cbiAgICBpZiAodGhpcy5zdGFydFRlbXBlcmF0dXJlID4gdGhpcy5zdG9wVGVtcGVyYXR1cmUpIHtcbiAgICAgIGxldCBzd2FwcGVkQ2l0aWVzID0gdGhpcy5zd2FwKCk7XG4gICAgICBsZXQgb2xkUm91dGVDb3N0ID0gdGhpcy5jYWxjdWxhdGVUb3RhbERpc3RhbmNlKHRoaXMuY2l0aWVzKTtcbiAgICAgIGxldCBuZXdSb3V0ZUNvc3QgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsRGlzdGFuY2Uoc3dhcHBlZENpdGllcyk7XG4gICAgICBsZXQgY29zdCA9IG5ld1JvdXRlQ29zdCAtIG9sZFJvdXRlQ29zdDtcbiAgICAgIGlmIChjb3N0IDwgMCB8fCAoTWF0aC5yYW5kb20oKSA8PSBNYXRoLmV4cCgoMCAtIGNvc3QpIC8gdGhpcy5zdGFydFRlbXBlcmF0dXJlKSkpIHtcbiAgICAgICAgdGhpcy5jaXRpZXMgPSBzd2FwcGVkQ2l0aWVzO1xuICAgICAgICBpZiAodGhpcy5zaG9ydGVzdERpc3RhbmNlID49IG5ld1JvdXRlQ29zdCkge1xuICAgICAgICAgIHRoaXMuc2hvcnRlc3REaXN0YW5jZSA9IG5ld1JvdXRlQ29zdDtcbiAgICAgICAgICB0aGlzLmJlc3RQb2ludHMgPSBzd2FwcGVkQ2l0aWVzO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2EtdGVtcFwiKS5pbm5lckhUTUwgPSBgVGVtcGVyYXR1cmU6ICR7TWF0aC5mbG9vcih0aGlzLnN0YXJ0VGVtcGVyYXR1cmUpfWA7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2EtZGlzdGFuY2VcIikuaW5uZXJIVE1MID0gYFNob3J0ZXN0IHBpeGVsIGRpc3RhbmNlIHNvIGZhcjogJHtNYXRoLmZsb29yKHRoaXMuc2hvcnRlc3REaXN0YW5jZSl9YDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zdGFydFRlbXBlcmF0dXJlICo9IHRoaXMuZHJvcFRlbXBlcmF0dXJlUHJvYmFiaWxpdHk7XG4gICAgdGhpcy5zYURyYXcoKTtcbiAgfVxuXG59OyIsImltcG9ydCBTaW11bGF0ZWRBbm5lYWxpbmcgZnJvbSAnLi9TQSc7XG5pbXBvcnQgTGV4aWNvR3JhcGhpY09yZGVyaW5nIGZyb20gJy4vTE8nO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCk9PntcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUNhbnZhc1wiKTtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICBjb25zdCBjYW52YXMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUNhbnZhc1R3b1wiKTtcbiAgY29uc3QgY3R4MiA9IGNhbnZhczIuZ2V0Q29udGV4dChcIjJkXCIpO1xuICBcbiAgY29uc3QgY2FudmFzMyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlDYW52YXNUaHJlZVwiKTtcbiAgY29uc3QgY3R4MyA9IGNhbnZhczMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICBcbiAgY29uc3QgbWF4RGltZW5zaW9uID0gNDAwO1xuICBcbiAgbGV0IHRvdGFsQ2l0aWVzID0gODtcbiAgbGV0IGNpdGllcyA9IFtdO1xuICBcbiAgY29uc3QgcG9wdWxhdGlvbk51bWJlciA9IDUwMDtcbiAgbGV0IHBvcHVsYXRpb25BcnJheSA9IFtdO1xuICBsZXQgZml0bmVzcyA9IFtdO1xuICBsZXQgbXV0YXRpb25SYXRlID0gLjA1O1xuICBsZXQgY3Jvc3NvdmVyUmF0ZSA9IC4zO1xuICBsZXQgbnVtR2VuZXJhdGlvbnMgPSAwO1xuICBcbiAgbGV0IHNob3J0ZXN0RGlzdGFuY2VTb0ZhciA9IEluZmluaXR5O1xuICBsZXQgYmVzdFBvaW50cyA9IFtdO1xuXG4gIGxldCByYW5nZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0aWVzLXNldHRlclwiKTtcbiAgbGV0IGxhYmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaXR5LW51bVwiKTtcbiAgcmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgY2hhbmdlVG90YWxDaXRpZXMpO1xuXG4gIGZ1bmN0aW9uIGNoYW5nZVRvdGFsQ2l0aWVzKCkge1xuICAgIHRvdGFsQ2l0aWVzID0gcmFuZ2UudmFsdWU7XG4gICAgbGFiZWwuaW5uZXJIVE1MID0gYE51bWJlciBvZiBDaXRpZXM6ICR7dG90YWxDaXRpZXN9YDtcbiAgICByZW1hcCgpO1xuICB9XG5cbiAgY3JlYXRlUmFuZG9tUG9pbnRzKHRvdGFsQ2l0aWVzLCBtYXhEaW1lbnNpb24sIGN0eCwgY3R4MiwgY3R4Myk7XG4gIGxldCBTQSA9IG5ldyBTaW11bGF0ZWRBbm5lYWxpbmcoY3R4MiwgY2l0aWVzKTtcbiAgbGV0IExPID0gbmV3IExleGljb0dyYXBoaWNPcmRlcmluZyhjdHgzLCBjaXRpZXMpO1xuICBcbiAgZnVuY3Rpb24gY3JlYXRlUmFuZG9tUG9pbnRzKHRvdGFsQ2l0aWVzLCBtYXhEaW1lbnNpb24sIC4uLmN0eEFycikge1xuICAgIGNyZWF0ZVJhbmRvbUNpdGllcyh0b3RhbENpdGllcyk7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdHhBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGN0eEFycltpXS5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICBjdHhBcnJbaV0uZ2xvYmFsQWxwaGEgPSAwLjI7XG4gICAgICBjdHhBcnJbaV0uZmlsbFJlY3QoMCwgMCwgbWF4RGltZW5zaW9uLCBtYXhEaW1lbnNpb24pO1xuICAgICAgXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNpdGllcy5sZW5ndGg7IGorKykge1xuICAgICAgICBjdHhBcnJbaV0uYmVnaW5QYXRoKCk7XG4gICAgICAgIGxldCByYWRpdXMgPSAzO1xuICAgICAgICBjdHhBcnJbaV0uYXJjKGNpdGllc1tqXS54LCBjaXRpZXNbal0ueSwgcmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgIGN0eEFycltpXS5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgIGN0eEFycltpXS5maWxsKCk7XG4gICAgICAgIGN0eEFycltpXS5jbG9zZVBhdGgoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcG9wdWxhdGUocG9wdWxhdGlvbkFycmF5LCBwb3B1bGF0aW9uTnVtYmVyLCBjaXRpZXMpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZVJhbmRvbUNpdGllcyh0b3RhbENpdGllcykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWxDaXRpZXM7IGkrKykge1xuICAgICAgbGV0IHJhbmRfeCA9IE1hdGgucmFuZG9tKGkpICogbWF4RGltZW5zaW9uO1xuICAgICAgbGV0IHJhbmRfeSA9IE1hdGgucmFuZG9tKGkpICogbWF4RGltZW5zaW9uO1xuICAgICAgY2l0aWVzW2ldID0ge1xuICAgICAgICB4OiByYW5kX3gsXG4gICAgICAgIHk6IHJhbmRfeSxcbiAgICAgIH07XG4gICAgfTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gcG9wdWxhdGUocG9wQXJyYXksIG51bSwgZnJvbUFycikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgIGxldCBzaHVmZmxlZCA9IHNodWZmbGUoZnJvbUFycik7XG4gICAgICBwb3BBcnJheS5wdXNoKHNodWZmbGVkKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHBvcEFycmF5O1xuICB9O1xuXG4gIGZ1bmN0aW9uIGdhRHJhdygpIHtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIG1heERpbWVuc2lvbiwgbWF4RGltZW5zaW9uKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMjtcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgbWF4RGltZW5zaW9uLCBtYXhEaW1lbnNpb24pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWxDaXRpZXM7IGkrKykge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgbGV0IHggPSBjaXRpZXNbaV0ueDtcbiAgICAgIGxldCB5ID0gY2l0aWVzW2ldLnk7XG4gICAgICBsZXQgcmFkaXVzID0gMztcbiAgICAgIGN0eC5hcmMoeCwgeSwgcmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9O1xuICAgIGNpdGllcyA9IHNodWZmbGUoY2l0aWVzKTtcblxuICAgIGNhbGN1bGF0ZUZpdG5lc3MocG9wdWxhdGlvbkFycmF5KTtcbiAgICBjaGVja1Nob3J0ZXN0RGlzdGFuY2UocG9wdWxhdGlvbkFycmF5KTtcbiAgICBuZXh0R2VuZXJhdGlvbigpO1xuICAgIG51bUdlbmVyYXRpb25zICs9IDE7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYS1nZW5lcmF0aW9uXCIpLmlubmVySFRNTCA9IGBHZW5lcmF0aW9uczogJHtudW1HZW5lcmF0aW9uc31gO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHNodWZmbGUodG9TaHVmZmxlKSB7XG4gICAgbGV0IGEgPSB0b1NodWZmbGUubGVuZ3RoO1xuICAgIGxldCBteUFyciA9IHRvU2h1ZmZsZS5zbGljZSgpO1xuICAgIHdoaWxlIChhKSB7XG4gICAgICBsZXQgYiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGEtLSk7XG4gICAgICBbbXlBcnJbYV0sIG15QXJyW2JdXSA9IFtteUFycltiXSwgbXlBcnJbYV1dO1xuICAgIH07XG4gICAgcmV0dXJuIG15QXJyO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGNoZWNrU2hvcnRlc3REaXN0YW5jZShwb3B1bGF0aW9uQXJyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3B1bGF0aW9uQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY3VycmVudERpc3RhbmNlID0gY2FsY3VsYXRlVG90YWxEaXN0YW5jZShwb3B1bGF0aW9uQXJyW2ldKTtcbiAgXG4gICAgICBpZiAoc2hvcnRlc3REaXN0YW5jZVNvRmFyID4gY3VycmVudERpc3RhbmNlKSB7XG4gICAgICAgIHNob3J0ZXN0RGlzdGFuY2VTb0ZhciA9IGN1cnJlbnREaXN0YW5jZTtcbiAgICAgICAgYmVzdFBvaW50cyA9IHBvcHVsYXRpb25BcnJbaV0uc2xpY2UoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYS1kaXN0YW5jZVwiKS5pbm5lckhUTUwgPSBgU2hvcnRlc3QgcGl4ZWwgZGlzdGFuY2Ugc28gZmFyOiAke01hdGguZmxvb3Ioc2hvcnRlc3REaXN0YW5jZVNvRmFyKX1gO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiZXN0UG9pbnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgY3R4Lm1vdmVUbyhiZXN0UG9pbnRzW2ldLngsIGJlc3RQb2ludHNbaV0ueSk7XG4gICAgICBjdHgubGluZVRvKGJlc3RQb2ludHNbaSArIDFdLngsIGJlc3RQb2ludHNbaSArIDFdLnkpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH07XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMTExZTZjXCI7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gIH07XG5cbiAgZnVuY3Rpb24gY2FsY3VsYXRlVG90YWxEaXN0YW5jZShhcnJheSkge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBsZXQgYSA9IGFycmF5W2ldLnggLSBhcnJheVtpICsgMV0ueDtcbiAgICAgIGxldCBiID0gYXJyYXlbaV0ueSAtIGFycmF5W2kgKyAxXS55O1xuICAgICAgbGV0IGRpc3RhbmNlID0gTWF0aC5oeXBvdChhLCBiKTtcbiAgICAgIHN1bSArPSBkaXN0YW5jZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHN1bTtcbiAgfTtcblxuICBmdW5jdGlvbiBjYWxjdWxhdGVGaXRuZXNzKHBvcHVsYXRpb25BcnIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvcHVsYXRpb25BcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBkaXN0ID0gY2FsY3VsYXRlVG90YWxEaXN0YW5jZShwb3B1bGF0aW9uQXJyW2ldKTtcbiAgICAgIGZpdG5lc3NbaV0gPSAxIC8gZGlzdDtcbiAgICB9O1xuXG4gICAgbGV0IHN1bSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaXRuZXNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzdW0gKz0gZml0bmVzc1tpXTtcbiAgICB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaXRuZXNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmaXRuZXNzW2ldID0gZml0bmVzc1tpXSAvIHN1bTtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHJhbmRvbVBpY2soKSB7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBsZXQgaSA9IE1hdGgucmFuZG9tKCk7XG5cbiAgICB3aGlsZSAoaSA+IDApIHtcbiAgICAgIGkgLT0gZml0bmVzc1tpbmRleF07XG5cbiAgICAgIGlmIChpID4gMCkge1xuICAgICAgICBpbmRleCArPSAxO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHBvcHVsYXRpb25BcnJheVtpbmRleF07XG4gIH07XG5cbiAgZnVuY3Rpb24gbmV4dEdlbmVyYXRpb24oKSB7XG4gICAgbGV0IG5ld1BvcHVsYXRpb25BcnJheSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3B1bGF0aW9uQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBmaXJzdFBhcmVudCA9IHJhbmRvbVBpY2soKTtcbiAgICAgIGxldCBzZWNvbmRQYXJlbnQgPSByYW5kb21QaWNrKCk7XG4gICAgICBsZXQgY2hpbGRSb3V0ZSA9IGNyb3Nzb3ZlcihmaXJzdFBhcmVudCwgc2Vjb25kUGFyZW50LCBjcm9zc292ZXJSYXRlKTtcbiAgICAgIGxldCBtdXRhbnRDaGlsZCA9IG11dGF0ZShjaGlsZFJvdXRlLCBtdXRhdGlvblJhdGUpO1xuICAgICAgbmV3UG9wdWxhdGlvbkFycmF5W2ldID0gbXV0YW50Q2hpbGQ7XG4gICAgfTtcbiAgICBwb3B1bGF0aW9uQXJyYXkgPSBuZXdQb3B1bGF0aW9uQXJyYXk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbXV0YXRlKGFycmF5LCBtdXRhdGlvblJhdGUpIHtcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA8PSBtdXRhdGlvblJhdGUpIHtcbiAgICAgIHJldHVybiBzaHVmZmxlKGFycmF5KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGFycmF5O1xuICB9O1xuXG4gIGZ1bmN0aW9uIGNyb3Nzb3ZlcihmaXJzdFBhcmVudCwgc2Vjb25kUGFyZW50LCBjcm9zc292ZXJSYXRlKSB7XG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPD0gY3Jvc3NvdmVyUmF0ZSkge1xuXG4gICAgICBsZXQgbGltaXQgPSBNYXRoLmZsb29yKGZpcnN0UGFyZW50Lmxlbmd0aCkgKyAxO1xuICAgICAgbGV0IHN0YXJ0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGltaXQpO1xuICAgICAgbGV0IGNoaWxkID0gZmlyc3RQYXJlbnQuc2xpY2Uoc3RhcnQsIGxpbWl0KTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWNvbmRQYXJlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFjaGlsZC5pbmNsdWRlcyhzZWNvbmRQYXJlbnRbaV0pKSB7XG4gICAgICAgICAgY2hpbGQucHVzaChzZWNvbmRQYXJlbnRbaV0pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9O1xuICAgIHJldHVybiBmaXJzdFBhcmVudDtcbiAgfTtcblxuXG5cbiAgLy9idXR0b25zOiBidXR0b25zOiBidXR0b25zOiBidXR0b25zOiBidXR0b25zOiBcblxuICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICBpZiAoIXdpbmRvdy5HQSkge1xuICAgICAgd2luZG93LkdBID0gc2V0SW50ZXJ2YWwoZ2FEcmF3LCAwKTtcbiAgICB9O1xuICAgIGlmICghd2luZG93LlNBbm4pIHtcbiAgICAgIHdpbmRvdy5TQW5uID0gc2V0SW50ZXJ2YWwoU0Euc2FTb2x2ZS5iaW5kKHRoaXMpLCAwKTtcbiAgICB9O1xuICAgIGlmICghd2luZG93LkxPbm4pIHtcbiAgICAgIHdpbmRvdy5MT25uID0gc2V0SW50ZXJ2YWwoTE8ubG9Tb2x2ZS5iaW5kKHRoaXMpLCAwKTtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh3aW5kb3cuR0EpO1xuICAgIHdpbmRvdy5HQSA9IG51bGw7XG4gICAgY2xlYXJJbnRlcnZhbCh3aW5kb3cuU0Fubik7XG4gICAgd2luZG93LlNBbm4gPSBudWxsO1xuICAgIGNsZWFySW50ZXJ2YWwod2luZG93LkxPbm4pO1xuICAgIHdpbmRvdy5MT25uID0gbnVsbDtcbiAgfTtcblxuICBmdW5jdGlvbiByZW1hcCgpIHtcbiAgICBzdG9wKCk7XG4gICAgY2l0aWVzID0gW107XG4gICAgc2hvcnRlc3REaXN0YW5jZVNvRmFyID0gSW5maW5pdHk7XG4gICAgYmVzdFBvaW50cyA9IFtdO1xuICAgIHBvcHVsYXRpb25BcnJheSA9IFtdO1xuICAgIG51bUdlbmVyYXRpb25zID0gMDtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIG1heERpbWVuc2lvbiwgbWF4RGltZW5zaW9uKTtcbiAgICBTQS5kZWZhdWx0U2V0dGluZ3MoKTtcbiAgICBjdHgzLmNsZWFyUmVjdCgwLCAwLCBtYXhEaW1lbnNpb24sIG1heERpbWVuc2lvbik7XG4gICAgY3JlYXRlUmFuZG9tUG9pbnRzKHRvdGFsQ2l0aWVzLCBtYXhEaW1lbnNpb24sIGN0eCwgY3R4MiwgY3R4Myk7XG4gICAgU0EgPSBuZXcgU2ltdWxhdGVkQW5uZWFsaW5nKGN0eDIsIGNpdGllcyk7XG4gICAgTE8gPSBuZXcgTGV4aWNvR3JhcGhpY09yZGVyaW5nKGN0eDMsIGNpdGllcyk7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhLWdlbmVyYXRpb25cIikuaW5uZXJIVE1MID0gXCJHZW5lcmF0aW9uczogMFwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2EtdGVtcFwiKS5pbm5lckhUTUwgPSBcIlRlbXBlcmF0dXJlOiAwXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYS1kaXN0YW5jZVwiKS5pbm5lckhUTUwgPSBcIlNob3J0ZXN0IHBpeGVsIGRpc3RhbmNlIHNvIGZhcjogMFwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2EtZGlzdGFuY2VcIikuaW5uZXJIVE1MID0gXCJTaG9ydGVzdCBwaXhlbCBkaXN0YW5jZSBzbyBmYXI6IDBcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJydXRlLWRpc3RhbmNlXCIpLmlubmVySFRNTCA9IFwiU2hvcnRlc3QgcGl4ZWwgZGlzdGFuY2Ugc28gZmFyOiAwXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwZXJjZW50Q29tcGxldGVcIikuaW5uZXJIVE1MID0gXCJQZXJjZW50IENvbXBsZXRlOiAwLjAwJVwiO1xuICB9XG5cbiAgY29uc3QgcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheVwiKTtcbiAgcGxheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhcnQpO1xuXG4gIGNvbnN0IHBhdXNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXVzZVwiKTtcbiAgcGF1c2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0b3ApO1xuXG4gIGNvbnN0IHJlc2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldFwiKTtcbiAgcmVzZXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlbWFwKVxufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9