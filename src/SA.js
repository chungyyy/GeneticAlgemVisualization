export default class SimulatedAnnealing {
  constructor(ctx, cities) {
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

  defaultSettings() {
    this.ctx.clearRect(0, 0, 400, 400);
    this.shortestDistance = Infinity;
    this.bestPoints = [];
    this.startTemperature = 100;
    this.stopTemperature = .001;
    this.dropTemperatureProbability = .998;
  }

  calculateTotalDistance(arr) {
    let totalDistance = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      let a = arr[i].x - arr[i + 1].x;
      let b = arr[i].y - arr[i + 1].y;
      let distance = Math.hypot(a, b);
      totalDistance += distance;
    };

    return totalDistance;
  };

  swap() {
    let copy = this.cities.slice();
    let limit = copy.length;
    let cityA = Math.floor(Math.random() * limit);
    let cityB = Math.floor(Math.random() * limit);
    [copy[cityA], copy[cityB]] = [copy[cityB], copy[cityA]];
    return copy;
  }

  saDraw() {
    this.ctx.clearRect(0, 0, 400, 400);
    this.ctx.fillStyle = "black";
    this.ctx.globalAlpha = 0.2;
    this.ctx.fillRect(0, 0, 400, 400);
    for (let i = 0; i < this.cities.length; i++) {
      this.ctx.beginPath();
      let x = this.cities[i].x;
      let y = this.cities[i].y;
      let radius = 3;
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = "black";
      this.ctx.fill();
      this.ctx.closePath();
    };

    this.ctx.beginPath();
    for (let i = 0; i < this.bestPoints.length - 1; i++) {
      this.ctx.moveTo(this.bestPoints[i].x, this.bestPoints[i].y);
      this.ctx.lineTo(this.bestPoints[i + 1].x, this.bestPoints[i + 1].y);
      this.ctx.closePath();
    };
    this.ctx.strokeStyle = "#111e6c";
    this.ctx.stroke();
  }

  saSolve() {

    if (this.startTemperature > this.stopTemperature) {
      let swappedCities = this.swap();
      let oldRouteCost = this.calculateTotalDistance(this.cities);
      let newRouteCost = this.calculateTotalDistance(swappedCities);
      let cost = newRouteCost - oldRouteCost;
      if (cost < 0 || (Math.random() <= Math.exp((0 - cost) / this.startTemperature))) {
        this.cities = swappedCities;
        this.bestPoints = swappedCities;
        this.shortestDistance = newRouteCost;
        document.getElementById("sa-temp").innerHTML = `Temperature: ${Math.floor(this.startTemperature)}`;
        document.getElementById("sa-distance").innerHTML = `Shortest pixel distance so far: ${Math.floor(this.shortestDistance)}`;
      }
    }
    this.startTemperature *= this.dropTemperatureProbability;
    this.saDraw();
  }

};