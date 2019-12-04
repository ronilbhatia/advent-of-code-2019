const MOVE_DIFFS = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1]
}

function getCoordsWithSteps(dirArr) {
  let currCoord = [0,0]
  let steps = 0
  const coordsHash = {}

  dirArr.forEach(dirStr => {
    const [dir, mag] = processDir(dirStr);

    let i = 0;

    while (i < mag) {
      steps += 1;
      currCoord = addCoords(currCoord, MOVE_DIFFS[dir])
      let currCoordStr = currCoord.toString();
      coordsHash[currCoordStr] = steps;
      i++;
    }
  })

  return coordsHash;
}

function processDir(dirStr) {
  const dir = dirStr[0]
  const mag = parseInt(dirStr.slice(1));
  return [dir, mag];
}

function addCoords(coord1, coord2) {
  return [coord1[0] + coord2[0], coord1[1] + coord2[1]];
}

function findIntersections(coords1, coords2) {
  const commonCoords = [];

  Object.keys(coords1).forEach(coord => {
    if (coords2[coord] !== undefined) commonCoords.push(coord);
  })

  return commonCoords;
}

function findBestDist(commonCoords, wire1Steps, wire2Steps) {
  let bestDist

  commonCoords.forEach(coord => {
    const currDist = wire1Steps[coord] + wire2Steps[coord];
    if (!bestDist || (currDist < bestDist)) bestDist = currDist;
  })

  return bestDist;
}

function crossedWires(file) {
  fetch(file)
    .then(res => res.text())
    .then(input => {
      const [wire1, wire2] = input.split('\n').map(str => str.split(','));
      const wire1Coords = getCoordsWithSteps(wire1);
      const wire2Coords = getCoordsWithSteps(wire2);
      
      const commonCoords = findIntersections(wire1Coords, wire2Coords);
      const bestDist = findBestDist(commonCoords, wire1Coords, wire2Coords)
      console.log(bestDist);
    })
}

crossedWires('input.txt')