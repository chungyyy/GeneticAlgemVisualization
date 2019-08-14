import { Cipher } from "crypto";

// import { createRandomPoints, RandomPointsCallBack } from './GA';

window.addEventListener("DOMContentLoaded", ()=>{
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  
  let maxDimension = 400;

  let totalCities = 7;
  let cities = [];

  let populationNumber = 10;
  let populationArray = [];

  let shortestDistanceSoFar = Infinity;
  let bestPoints = [];


  createRandomPoints(totalCities, maxDimension);

  function createRandomPoints(totalCities, maxDimension) {
    ctx.fillStyle = "black";
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
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();
    };

    console.log(populate(populationArray, populationNumber, cities));
    draw();
  };

  function populate(popArray, num, shuffleArray) {
    for (let i = 0; i < num; i++) {
      let shuffled = shuffle(shuffleArray)
      popArray[i] = shuffled;
    };
    return popArray;
  };

  function draw() {
    for (let i = 0; i < cities.length - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(cities[i].x, cities[i].y);
      ctx.lineTo(cities[i + 1].x, cities[i + 1].y);
      ctx.closePath();
      ctx.strokeStyle = "red";
      ctx.stroke();
    };
  };

  function shuffle(toShuffle) {
    // Fisher-Yates shuffle algorithm! shuffles in O(n) and with unbias!
    let a = toShuffle.length;
    while (a) {
      let b = Math.floor(Math.random() * a--);
      let temp = toShuffle[a];
      toShuffle[a] = toShuffle[b];
      toShuffle[b] = temp;
      console.log(toShuffle[a], toShuffle[b]);
      
    };
    console.log(toShuffle , "this is the toShuffle");
    return toShuffle;
  };

  function redraw() {
    ctx.clearRect(0, 0, maxDimension, maxDimension);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, maxDimension, maxDimension);
    for (let i = 0; i < cities.length; i++) {
      ctx.beginPath();
      let rand_x = cities[i].x;
      let rand_y = cities[i].y;
      let radius = 2;
      ctx.arc(rand_x, rand_y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();
    };
    shuffle(cities);

    draw();
    checkShortestDistance(cities);
  };

  function checkShortestDistance(array) {
    let currentDistance = calculateTotalDistance(array);

    if (shortestDistanceSoFar > currentDistance) {
      shortestDistanceSoFar = currentDistance;
      bestPoints = array.slice();
      console.log(`shortest distance so far: ${shortestDistanceSoFar}`);
      console.log(bestPoints);
    };

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
    }

    return sum;
  };


  //buttons: buttons: buttons: buttons: buttons: 

  function start() {
    if (!window.intervalId) {
      window.intervalId = setInterval(redraw, 1000);
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
