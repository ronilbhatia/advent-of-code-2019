class Moon {
  constructor(pos, vel = [0, 0, 0]) {
    this.pos = pos;
    this.vel = vel;
  }

  pull(...moons) {
    this.pullX(...moons);
    this.pullY(...moons);
    this.pullZ(...moons);
  }

  pullX(...moons) {
    const x = this.pos[0];
    let shift = 0;
    moons.forEach(moon => {
      debugger
      const otherX = moon.pos[0];
      shift = (x > otherX) ? shift - 1 : ((x < otherX) ? shift + 1 : shift);
    });
    this.vel[0] += shift;
  }

  pullY(...moons) {
    const y = this.pos[1];
    let shift = 0;
    moons.forEach(moon => {
      const otherY = moon.pos[1];
      shift = (y > otherY) ? shift - 1 : ((y < otherY) ? shift + 1 : shift);
    });
    this.vel[1] += shift;
  }

  pullZ(...moons) {
    const z = this.pos[2];
    let shift = 0;
    moons.forEach(moon => {
      const otherZ = moon.pos[2];
      shift = (z > otherZ) ? shift - 1 : ((z < otherZ) ? shift + 1 : shift);
    });
    this.vel[2] += shift;
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos[2] += this.vel[2];
  }

  totalEnergy() {
    const potentialEnergy = this.pos
      .map(coord => Math.abs(coord))
      .reduce((acc, el) => acc + el);
    const kineticEnergy = this.vel
      .map(coord => Math.abs(coord))
      .reduce((acc, el) => acc + el);
    return potentialEnergy * kineticEnergy;
  }
}

module.exports = Moon;