const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
  const map = buildMap(data.toString());
  const asteroidCoords = getAsteroidCoords(map);
  let coordStrings = new Set(asteroidCoords.map(coord => coord.toString()));
  const monitoringStation = [17, 22];
  const sortedSlopes = allSlopesSorted(monitoringStation, asteroidCoords); 
  const asteroid200 = findAsteroid200(monitoringStation, coordStrings, sortedSlopes);
  // console.log(asteroid200);
});

function buildMap(data) {
  return data.split('\n').map(row => row.split(''));
}

function getAsteroidCoords(map) {
  const coords = [];

  for (let i = 0; i < map.length; i++) {
    const row = map[i];
    for (let j = 0; j < row.length; j++) {
      const el = row[j];
      if (el === '#') coords.push([j, i]);
    }
  }

  return coords;
}

function allSlopesSorted(monitoringStation, asteroidCoords) {
  const slopes = [];

  asteroidCoords.forEach(coord => {
    const slope = (coord[1] - monitoringStation[1]) / (coord[0] - monitoringStation[0]);
    if (!slopes.includes(slope) && !isNaN(slope) && !(slope === Infinity)) slopes.push(slope);
  })

  return slopes.sort((a, b) => a - b);
}

function findAsteroid200(monitoringStation, coordStrings, sortedSlopes) {
  let asteroidCount = 0;

  while (asteroidCount < 200) {
    let dir = 'R';
    sortedSlopes.forEach(slope => {
      const asteroid = asteroidInDir(monitoringStation, coordStrings, slope, dir);
      if (asteroid) {
        // console.log(asteroid)
        asteroidCount++;
        if (asteroidCount === 200) console.log(asteroid);
      }
    });

    dir = 'L';
    sortedSlopes.forEach(slope => {
      const asteroid = asteroidInDir(monitoringStation, coordStrings, slope, dir);
      if (asteroid) {
        asteroidCount++;
        // console.log(asteroid);
        if (asteroidCount === 200) console.log(asteroid);
      }
    });
  }
}

function asteroidInDir(monitoringStation, coordStrings, slope, dir) {
  let nextX = monitoringStation[0];
  let nextY = monitoringStation[1];
  let yIncrement = (dir === 'R') ? slope : -slope;
  let xIncrement = (dir === 'R') ? 1 : -1;

  if (slope === Infinity || slope === -Infinity) {
    xIncrement = 0;
    yIncrement = (dir === 'R') ? -1 : 1;
  }

  let nextPos = [nextX, nextY];
  while (true) {
    nextY += yIncrement;
    nextX += xIncrement;
    nextPos = [nextX, nextY];
    const nextCoord = [parseFloat(nextX.toFixed(4)), parseFloat(nextY.toFixed(4))].toString();
    // console.log("New coords...");
    // console.log([nextX, nextY])
    // console.log(nextCoord);
    if (!validPos(nextPos)) return false;
    if (coordStrings.has(nextCoord)) return nextCoord;
  }
}

function validPos(pos) {
  return between(pos[0], -1, 35) && between(pos[1], -1, 40); 
}

function between(num, param1, param2) {
  return (num > param1 && num < param2) || (num < param1 && num > param2);
}

function distance(coord1, coord2) {
  const dx = coord1[0] - coord2[0];
  const dy = coord1[1] - coord2[1];
  return Math.sqrt((dx ** 2) + (dy ** 2));
}