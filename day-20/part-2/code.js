const fs = require('fs');
const MazeSolver = require('./maze_solver');

fs.readFile('input.txt', (err, data) => {
  const input = data
    .toString()
    .split('\n')
    .map(row => row.split(''));
  const mazeSolver = new MazeSolver(input);
  const endNode = mazeSolver.findEndNode();
  console.log(endNode.countParents());
});
