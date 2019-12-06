const fs = require('fs')
const Node = require('./node');

function calcOrbits(inputFile) {
  fs.readFile(inputFile, (err, input) => {
    const orbitStrings = input.toString().split('\n');
    orbitStrings.forEach(orbitString => Node.buildNodesFromString(orbitString))
    console.log(Node.totalOrbits());
  })
}

calcOrbits('input.txt');