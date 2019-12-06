const fs = require('fs')
const Node = require('./node');

function calcOrbits(inputFile) {
  fs.readFile(inputFile, (err, input) => {
    const orbitStrings = input.toString().split('\n');
    orbitStrings.forEach(orbitString => Node.buildNodesFromString(orbitString))
    const you = Node.nodes.find(node => node.name === 'YOU')
    const san = Node.nodes.find(node => node.name === 'SAN')
    console.log(Node.orbitalTransfersBetweenNodes(you, san));
  })
}

calcOrbits('testInput.txt');