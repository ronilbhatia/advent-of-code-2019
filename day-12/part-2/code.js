const fs = require('fs');
const Moon = require('./moon');
const System = require('./system');

const moon1 = new Moon([0, 6, 1]);
const moon2 = new Moon([4, 4, 19]);
const moon3 = new Moon([-11, 1, 8]);
const moon4 = new Moon([2, 19, 15]);
const system = new System(moon1, moon2, moon3, moon4);
xCycle = system.cycleLength(0);
yCycle = system.cycleLength(1);
zCycle = system.cycleLength(2);
console.log(xCycle, yCycle, zCycle);
// lcm(xCycle, yCycle, zCycle) => need to implement this still

