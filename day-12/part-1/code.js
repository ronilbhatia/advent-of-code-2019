const fs = require('fs');
const Moon = require('./moon');

// Small Test
// const moon1 = new Moon([-1, 0, 2]);
// const moon2 = new Moon([2, -10, -7]);
// const moon3 = new Moon([4, -8, 8]);
// const moon4 = new Moon([3, 5, -1]);

// Medium Test
// const moon1 = new Moon([-8, -10, 0]);
// const moon2 = new Moon([5, 5, 10]);
// const moon3 = new Moon([2, -7, 3]);
// const moon4 = new Moon([9, -8, -3]);

// Large Test
const moon1 = new Moon([0, 6, 1]);
const moon2 = new Moon([4, 4, 19]);
const moon3 = new Moon([-11, 1, 8]);
const moon4 = new Moon([2, 19, 15]);

for (let i = 0; i < 1000; i++) {
  moon1.pull(moon2, moon3, moon4)
  moon2.pull(moon1, moon3, moon4)
  moon3.pull(moon2, moon1, moon4)
  moon4.pull(moon2, moon3, moon1)
  moon1.move(moon2, moon3, moon4)
  moon2.move(moon1, moon3, moon4)
  moon3.move(moon2, moon1, moon4)
  moon4.move(moon2, moon3, moon1)
  const arr = []
  let moons = [moon1, moon2, moon3, moon4]
  moons.forEach(moon => arr.push(moon.pos[0]));
}

console.log(moon1.totalEnergy() + moon2.totalEnergy() + moon3.totalEnergy() + moon4.totalEnergy());

