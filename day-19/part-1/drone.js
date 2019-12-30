class Drone {
  constructor() {
    this.map = new Array(50).fill(0).map(() => new Array(50));
    this.i = 0;
    this.j = 0;
    this.state = 0; // 0 => X, 1 => Y
  }

  provideInput() {
    if (this.state === 0) {
      this.state++;
      return this.i;
    } else {
      return this.j;
    }
  }

  updatePosition() {
    this.j++;
    if (this.j >= 50) {
      this.i++;
      this.j = 0;
    }
  }

  receiveFeedback(feedback) {
    this.map[this.i][this.j] = feedback;
    this.updatePosition();
    this.state = 0;
  }

  countAffectedPoints() {
    return this.map.reduce(
      (sum, row) => sum + row.reduce((rowSum, el) => rowSum + el),
      0
    );
  }

  drawMap() {
    for (let i = 0; i < this.map.length; i++) {
      let row = '';
      for (let j = 0; j < this.map[0].length; j++) {
        row += this.map[i][j] === 0 ? '.' : '#';
      }
      console.log(row);
    }
  }
}

module.exports = Drone;
