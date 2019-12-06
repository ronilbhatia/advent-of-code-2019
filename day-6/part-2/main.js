const fs = require('fs')
const Node = require('./node');

function calcOrbits(inputFile) {
  fs.readFile(inputFile, (err, input) => {
    const orbitStrings = input.toString().split('\n');
    orbitStrings.forEach(orbitString => Node.buildNodesFromString(orbitString))
    const [you, san] = [Node.nodes['YOU'], Node.nodes['SAN']];
    console.log(Node.orbitalTransfersBetweenNodes(you, san));
  })
}

calcOrbits('input.txt');