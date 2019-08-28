export default class LexicoGraphicOrdering {
  constructor(ctx, cities) {
    this.ctx = ctx;
    this.cities = cities
    this.order = this.orderFunc(cities);
    this.shortestDistance = Infinity;
    this.bestPoints = cities;
    this.iterationNum = 0;
    this.nextOrder = this.nextOrder.bind(this);
    this.calculateTotalDistance = this.calculateTotalDistance.bind(this);
    this.orderFunc = this.orderFunc.bind(this);
    this.loSolve = this.loSolve.bind(this);
  }

  orderFunc(cities) {
    let orderedArr = [];
    for (let i = 0; i < cities.length; i++) {
      orderedArr[i] = i;
    }

    return orderedArr;
  }

  calculateTotalDistance(arr) {
    let totalDistance = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      let a = arr[i].x - arr[i + 1].x;
      let b = arr[i].y - arr[i + 1].y;
      let distance = Math.hypot(a, b);
      totalDistance += distance;
    };

    if (this.shortestDistance > totalDistance) {
      this.shortestDistance = totalDistance;
      this.bestPoints = arr;
    }

    return totalDistance;
  };

  loSolve() {
    this.ctx.clearRect(0, 0, 400, 400);
    this.ctx.fillStyle = "black";
    this.ctx.globalAlpha = 0.2;
    this.ctx.fillRect(0, 0, 400, 400);
    for (let i = 0; i < this.cities.length; i++) {
      this.ctx.beginPath();
      let x = this.cities[this.order[i]].x;
      let y = this.cities[this.order[i]].y;
      let radius = 3;
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = "black";
      this.ctx.fill();
      this.ctx.closePath();
    };

    this.ctx.beginPath();
    for (let i = 0; i < this.order.length - 1; i++) {
      this.ctx.moveTo(this.cities[this.order[i]].x, this.cities[this.order[i]].y);
      this.ctx.lineTo(this.cities[this.order[i + 1]].x, this.cities[this.order[i + 1]].y);
      this.ctx.closePath();
    };
    this.ctx.strokeStyle = "#111e6c";
    this.ctx.stroke();

    this.calculateTotalDistance(this.cities);

    this.ctx.beginPath();
    for (let i = 0; i < this.bestPoints.length - 1; i++) {
      this.ctx.moveTo(this.bestPoints[i].x, this.bestPoints[i].y);
      this.ctx.lineTo(this.bestPoints[i + 1].x, this.bestPoints[i + 1].y);
      this.ctx.closePath();
    };
    this.ctx.strokeStyle = "red";
    this.ctx.stroke();

    if (Math.floor((this.iterationNum / this.factorial(this.cities.length)) * 100) < 100) {
      this.iterationNum += 1;
    }
    this.nextOrder(this.order);
    document.getElementById("percentComplete").innerHTML = `Percent Complete: ${Number(this.iterationNum / this.factorial(this.cities.length) * 100).toFixed(2)}%`;
    document.getElementById("brute-distance").innerHTML = `Shortest pixel distance so far: ${Math.floor(this.shortestDistance)}`;
  }

  nextOrder(orderedArray) {
    let largestX = Infinity;
    let citiesArr = this.cities.slice();
    for (let i = 0; i < orderedArray.length - 1; i++) {
      if (orderedArray[i] < orderedArray[i + 1]) {
        largestX = i;
      }
    }

    let largestY = Infinity;
    for (let j = 0; j < orderedArray.length; j++) {
      if (orderedArray[largestX] < orderedArray[j]) {
        largestY = j;
      }
    }

    [orderedArray[largestX], orderedArray[largestY]] = [orderedArray[largestY], orderedArray[largestX]];
    [citiesArr[largestX], citiesArr[largestY]] = [citiesArr[largestY], citiesArr[largestX]];

    let splicedSuffix = orderedArray.splice(largestX + 1);
    orderedArray = orderedArray.concat(splicedSuffix.reverse());
    this.order = orderedArray;
    this.cities = citiesArr;
  }

  factorial(num) {
    let result = 1;
    for (let i = 1; i <= num; i++) {
      result *= i;
    }

    return result;
  }

}