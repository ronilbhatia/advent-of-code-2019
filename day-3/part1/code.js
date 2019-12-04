const MOVE_DIFFS = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1]
}

function getCoords(dirArr) {
  let curr = [0, 0]
  const coords = []

  dirArr.forEach(dirStr => {
    const [dir, mag] = processDir(dirStr);

    let i = 0;

    while (i < mag) {
      curr = addCoords(curr, MOVE_DIFFS[dir])
      coords.push(curr.toString());
      i++;
    }
  })

  // Set will optimize our lookup when we want to find overlaps
  return new Set(coords);
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

  coords1.forEach(coord => {
    if (coords2.has(coord)) commonCoords.push(coord);
  })

  return commonCoords.map(coordStr => coordStr.split(',').map(coord => parseInt(coord)));
}

function findBestCoord(commonCoords) {
  let bestDist

  commonCoords.forEach(coord => {
    const currDist = Math.abs(coord[0]) + Math.abs(coord[1]);
    if (!bestDist || (currDist < bestDist)) bestDist = currDist;
  })

  bestDist;
}

function crossedWires(file) {
  fetch(file)
    .then(res => res.text())
    .then(input => {
      const [wire1, wire2] = input.split('\n').map(str => str.split(','));
      const wire1Coords = getCoords(wire1);
      const wire2Coords = getCoords(wire2);
      
      const commonCoords = findIntersections(wire1Coords, wire2Coords);
      
      const bestCoord = findBestCoord(commonCoords)
      console.log(bestCoord);
    })
}

crossedWires('input.txt')