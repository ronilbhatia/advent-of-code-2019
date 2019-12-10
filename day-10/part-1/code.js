const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
  const map = buildMap(data.toString());
  const asteroidCoords = getAsteroidCoords(map);
  let coordStrings = new Set(asteroidCoords.map(coord => coord.toString()));
  let bestAsteroid, highestCount

  asteroidCoords.forEach(coord => {
    const currCount = asteroid(coord, asteroidCoords, coordStrings);
    if (!highestCount || currCount > highestCount) {
      highestCount = currCount;
      bestAsteroid = coord;
    }
  })
  console.log(bestAsteroid, highestCount);
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

function asteroid(asteroidCoord, allCoords, coordStrings) {
  let totalAsteroids = 0;

  allCoords.forEach(coord => {
    if (clearPath(asteroidCoord, coord, allCoords, coordStrings)) totalAsteroids++;
  })

  return totalAsteroids;
}

function clearPath(coord1, coord2, allCoords, coordStrings) {
  if (coord1[0] === coord2[0] && coord1[1] === coord2[1]) return false;
  const slope = (coord2[1] - coord1[1]) / (coord2[0] - coord1[0]);

  if (isNaN(slope)) {
    return !(allCoords.some(coord => coord[0] === 0 && between(coord[1], coord1[1], coord2[1])) ||
      allCoords.some(coord => coord[1] === 0 && between(coord[0], coord1[0], coord2[0])));
  } else if (slope === Infinity || slope === -Infinity) {
    return !allCoords.some(coord => coord[0] === coord1[0] && between(coord[1], coord1[1], coord2[1]))
  } else if (slope === 0) {
    return !allCoords.some(coord => coord[1] === coord1[1] && between(coord[0], coord1[0], coord2[0]))
  } else {
    let coord1Str = coord1.toString();
    let coord2Str = coord2.toString();
    let nextX = coord1[0];
    let nextY = coord1[1];
    let yIncrement = slope;
    let xIncrement = 1;

    if (coord1[0] > coord2[0]) {
      yIncrement = -slope;
      xIncrement = -1;
    }

    while (Math.abs(parseFloat(nextY.toFixed(4)) - coord1[1]) < Math.abs(coord2[1] - coord1[1]) &&
      Math.abs((parseFloat(nextX.toFixed(4)) - coord1[0]) < Math.abs(coord2[0] - coord1[0]))) {
      nextY += yIncrement;
      nextX += xIncrement;
      const nextCoord = [parseFloat(nextX.toFixed(4)), parseFloat(nextY.toFixed(4))].toString();

      if (![coord1Str, coord2Str].includes(nextCoord)) {
        if (coordStrings.has(nextCoord)) return false;
      }
    }

  }
  return true;
}

function between(num, param1, param2) {
  return (num > param1 && num < param2) || (num < param1 && num > param2);
}