// import { createRandomPoints, RandomPointsCallBack } from './GA';

window.addEventListener("DOMContentLoaded", ()=>{
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  
  const maxDimension = 400;

  const totalCities = 10;
  let cities = [];

  const populationNumber = 1000;
  let populationArray = [];
  let fitness = [];
  let mutationRate = .1;
  let crossoverRate = .8;

  let shortestDistanceSoFar = Infinity;
  let bestPoints = [];


  createRandomPoints(totalCities, maxDimension);

  function createRandomPoints(totalCities, maxDimension) {
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.3;
    ctx.fillRect(0, 0, maxDimension, maxDimension);

    for (let i = 0; i < totalCities; i++) {
      ctx.beginPath();
      let rand_x = Math.random(i) * maxDimension;
      let rand_y = Math.random(i) * maxDimension;
      let radius = 2;
      ctx.arc(rand_x, rand_y, radius, 0, 2 * Math.PI);
      cities[i] = {
        x: rand_x,
        y: rand_y,
      };
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();
    };

    populate(populationArray, populationNumber, cities);
    // redraw();
  };

  function populate(popArray, num, fromArr) {
    for (let i = 0; i < num; i++) {
      let shuffled = shuffle(fromArr);
      popArray.push(shuffled);
    };

    return popArray;
  };

  // for brute force
  // function draw() {
  //   for (let i = 0; i < cities.length - 1; i++) {
  //     ctx.beginPath();
  //     ctx.moveTo(cities[i].x, cities[i].y);
  //     ctx.lineTo(cities[i + 1].x, cities[i + 1].y);
  //     ctx.closePath();
  //     ctx.strokeStyle = "red";
  //     ctx.stroke();
  //   };
  // };

  function redraw() {
    ctx.clearRect(0, 0, maxDimension, maxDimension);
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.3;
    ctx.fillRect(0, 0, maxDimension, maxDimension);
    for (let i = 0; i < totalCities; i++) {
      ctx.beginPath();
      let rand_x = cities[i].x;
      let rand_y = cities[i].y;
      let radius = 2;
      ctx.arc(rand_x, rand_y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();
    };
    cities = shuffle(cities);

    // draw(); // this is what brute forcing through randomization would look like
    calculateFitness(populationArray); // gene algem
    checkShortestDistance(populationArray);
    nextGeneration(); // gene algem
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

    // bruteforce randomize
      // let currentDistance = calculateTotalDistance(cities);
      // if (shortestDistanceSoFar > currentDistance) {
      //   shortestDistanceSoFar = currentDistance;
      //   bestPoints = cities.slice();
      //   console.log(`shortest distance so far: ${shortestDistanceSoFar}`);
      //   console.log(bestPoints);
      // };

    for (let i = 0; i < bestPoints.length - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(bestPoints[i].x, bestPoints[i].y);
      ctx.lineTo(bestPoints[i + 1].x, bestPoints[i + 1].y);
      ctx.closePath();
      ctx.strokeStyle = "green";
      ctx.stroke();
    };
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
    if (!window.intervalId) {
      window.intervalId = setInterval(redraw, 1000/60);
    };
  };

  function stop() {
    clearInterval(window.intervalId);
    window.intervalId = null;
  };

  function remap() {
    stop();
    cities = [];
    shortestDistanceSoFar = Infinity;
    bestPoints = [];
    populationArray = [];
    ctx.clearRect(0, 0, maxDimension, maxDimension);
    createRandomPoints(totalCities, maxDimension);
  }

  const play = document.getElementById("play");
  play.addEventListener("click", start);

  const pause = document.getElementById("pause");
  pause.addEventListener("click", stop);

  const reset = document.getElementById("reset");
  reset.addEventListener("click", remap)
});
