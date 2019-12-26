const fs = require('fs');
const IntcodeComputer = require('./intcode_computer');

fs.readFile('input.txt', (err, data) => {
  const input = data.toString().split(',').map(el => parseInt(el));
  const machine = new IntcodeComputer(input, 1);
  machine.run();
  machine.grid.printGrid();
});
