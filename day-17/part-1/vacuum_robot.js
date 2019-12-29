class VacuumRobot {
  constructor() {
    this.coords = [[]];
    this.intersections = [];
  }

  processInput(num) {
    num === 10
      ? this.coords.push([])
      : this.coords[this.coords.length - 1].push(num);
  }

  drawMap() {
    for (let i = 0; i < this.coords.length; i++) {
      let row = '';
      for (let j = 0; j < this.coords[i].length; j++) {
        if (this.coords[i][j] === 35 && this.isIntersection(i, j)) {
          row += 'O';
          this.intersections.push([i, j]);
        } else {
          row += VacuumRobot.CODE[this.coords[i][j]] || '>';
        }
      }
      console.log(row);
    }
  }

  isIntersection(i, j) {
    return (
      this.coords[i - 1] &&
      this.coords[i + 1] &&
      this.coords[j - 1] &&
      this.coords[j + 1] &&
      this.coords[i + 1][j] === 35 &&
      this.coords[i - 1][j] === 35 &&
      this.coords[i][j + 1] === 35 &&
      this.coords[i][j - 1] === 35
    );
  }

  sumAlignmentParams() {
    return this.intersections.reduce(
      (sum, intersection) => sum + intersection[0] * intersection[1],
      0
    );
  }
}

VacuumRobot.CODE = {
  35: '#',
  46: '.'
};

module.exports = VacuumRobot;
