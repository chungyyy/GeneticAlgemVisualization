import SimulatedAnnealing from './SA';

window.addEventListener("DOMContentLoaded", ()=>{
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const canvas2 = document.getElementById("myCanvasTwo");
  const ctx2 = canvas2.getContext("2d");
  
  const canvas3 = document.getElementById("myCanvasThree");
  const ctx3 = canvas3.getContext("2d");
  
  const maxDimension = 400;
  
  const totalCities = 10;
  let cities = [];
  
  const populationNumber = 500;
  let populationArray = [];
  let fitness = [];
  let mutationRate = .3;
  let crossoverRate = 0;
  
  let shortestDistanceSoFar = Infinity;
  let bestPoints = [];
  
  const SA = new SimulatedAnnealing(ctx2, cities);
  createRandomPoints(totalCities, maxDimension, ctx, ctx2, ctx3);
  
  function createRandomPoints(totalCities, maxDimension, ...ctxArr) {
    createRandomCities(totalCities);
    
    for (let i = 0; i < ctxArr.length; i++) {
      ctxArr[i].fillStyle = "black";
      ctxArr[i].globalAlpha = 0.2;
      ctxArr[i].fillRect(0, 0, maxDimension, maxDimension);
      
      for (let j = 0; j < cities.length; j++) {
        ctxArr[i].beginPath();
        let radius = 3;
        ctxArr[i].arc(cities[j].x, cities[j].y, radius, 0, 2 * Math.PI);
        ctxArr[i].fillStyle = "black";
        ctxArr[i].fill();
        ctxArr[i].closePath();
      };
      
    }
    populate(populationArray, populationNumber, cities);
  };

  function createRandomCities(totalCities) {
    for (let i = 0; i < totalCities; i++) {
      let rand_x = Math.random(i) * maxDimension;
      let rand_y = Math.random(i) * maxDimension;
      cities[i] = {
        x: rand_x,
        y: rand_y,
      };
    };
  }


  function populate(popArray, num, fromArr) {
    for (let i = 0; i < num; i++) {
      let shuffled = shuffle(fromArr);
      popArray.push(shuffled);
    };

    return popArray;
  };

  function gaDraw() {
    ctx.clearRect(0, 0, maxDimension, maxDimension);
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.2;
    ctx.fillRect(0, 0, maxDimension, maxDimension);
    for (let i = 0; i < totalCities; i++) {
      ctx.beginPath();
      let x = cities[i].x;
      let y = cities[i].y;
      let radius = 3;
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();
    };
    cities = shuffle(cities);

    calculateFitness(populationArray);
    checkShortestDistance(populationArray);
    nextGeneration();
    console.log("generations");
  };

  function shuffle(toShuffle) {
    let a = toShuffle.length;
    let myArr = toShuffle.slice();
    while (a) {
      let b = Math.floor(Math.random() * a--);
      [myArr[a], myArr[b]] = [myArr[b], myArr[a]];
    };
    return myArr;
  };

  function checkShortestDistance(populationArr) {

    // genetic algorithm
    for (let i = 0; i < populationArr.length; i++) {
      let currentDistance = calculateTotalDistance(populationArr[i]);
  
      if (shortestDistanceSoFar > currentDistance) {
        shortestDistanceSoFar = currentDistance;
        bestPoints = populationArr[i].slice();
        console.log(`shortest distance so far: ${shortestDistanceSoFar}`);
        console.log(bestPoints);
      };
    }

    
    ctx.beginPath();
    for (let i = 0; i < bestPoints.length - 1; i++) {
      ctx.moveTo(bestPoints[i].x, bestPoints[i].y);
      ctx.lineTo(bestPoints[i + 1].x, bestPoints[i + 1].y);
      ctx.closePath();
    };
    ctx.strokeStyle = "#111e6c";
    ctx.stroke();

  };

  function calculateTotalDistance(array) {
    let sum = 0;
    for (let i = 0; i < array.length - 1; i++) {
      let a = array[i].x - array[i + 1].x;
      let b = array[i].y - array[i + 1].y;
      let distance = Math.hypot(a, b);
      sum += distance;
    };

    return sum;
  };

  function calculateFitness(populationArr) {
    for (let i = 0; i < populationArr.length; i++) {
      let dist = calculateTotalDistance(populationArr[i]);
      fitness[i] = 1 / dist;
    };

    let sum = 0;
    for (let i = 0; i < fitness.length; i++) {
      sum += fitness[i];
    };

    for (let i = 0; i < fitness.length; i++) {
      fitness[i] = fitness[i] / sum;
    };
  };

  function randomPick() {
    let index = 0;
    let i = Math.random();

    while (i > 0) {
      i -= fitness[index];

      if (i > 0) {
        index += 1;
      };
    };

    return populationArray[index];
  };

  function nextGeneration() {
    let newPopulationArray = [];

    for (let i = 0; i < populationArray.length; i++) {
      let firstParent = randomPick();
      let secondParent = randomPick();
      let childRoute = crossover(firstParent, secondParent, crossoverRate);
      let mutantChild = mutate(childRoute, mutationRate);
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

      let limit = Math.floor(firstParent.length) + 1;
      let start = Math.floor(Math.random() * limit);
      let child = firstParent.slice(start, limit);

      for (let i = 0; i < secondParent.length; i++) {
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
      window.GA = setInterval(gaDraw, 10);
    };
    if (!window.SAnn) {
      window.SAnn = setInterval(SA.saSolve.bind(this), 10);
    };
  };

  function stop() {
    clearInterval(window.GA);
    window.GA = null;
    clearInterval(window.SAnn);
    window.SAnn = null;
  };

  function remap() {
    stop();
    cities = [];
    shortestDistanceSoFar = Infinity;
    bestPoints = [];
    populationArray = [];
    ctx.clearRect(0, 0, maxDimension, maxDimension);
    ctx2.clearRect(0, 0, maxDimension, maxDimension);
    ctx3.clearRect(0, 0, maxDimension, maxDimension);
    createRandomPoints(totalCities, maxDimension, ctx, ctx2, ctx3);
  }

  const play = document.getElementById("play");
  play.addEventListener("click", start);
  const play2 = document.getElementById("play2");
  play2.addEventListener("click", start);
  const play3 = document.getElementById("play3");
  play3.addEventListener("click", start);

  const pause = document.getElementById("pause");
  pause.addEventListener("click", stop);

  const reset = document.getElementById("reset");
  reset.addEventListener("click", remap)
});
