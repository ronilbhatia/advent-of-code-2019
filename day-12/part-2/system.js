class System {
  constructor(...moons) {
    this.moons = moons;
  }

  cycleLength(dim) {
    const prevStates = new Set()
    let i = 0;
    let currState = [];
    this.moons.forEach(moon => currState.push(moon.pos[dim], moon.vel[dim]));
    let currStateStr = currState.toString();

    while (!prevStates.has(currStateStr)) {
      prevStates.add(currStateStr);
      this.step();
      currState = [];
      this.moons.forEach(moon => currState.push(moon.pos[dim], moon.vel[dim]));
      currStateStr = currState.toString();
      i += 1;
    }

    return i;
  }

  step() {
    const { moons } = this;
    moons.forEach((moon, i) => {
      const otherMoons = moons.slice(0, i).concat(moons.slice(i + 1));
      moon.pull(...otherMoons);
    });
    moons.forEach(moon => moon.move());
  }
}

module.exports = System;