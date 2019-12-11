const fs = require('fs');
const IntcodeComputer = require('../intcode_computer');

fs.readFile('input.txt', (err, data) => {
  const input = data.toString().split(',').map(el => parseInt(el));
  const machine = new IntcodeComputer(input, 0);
  machine.run();
  console.log(Object.keys(machine.paintbot.coloredPositions).length)
});