class Drone {
  constructor() {
    this.map = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
    this.drawMap();
    this.i = 1200;
    this.j = 0;
    this.start = 0;
    this.foundStart = false;
    this.state = 0; // 0 => X, 1 => Y
    this.rowCount = 0;
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
    // if (this.j >= 1000) {
    //   this.i++;
    //   this.j = this.start;
    //   this.foundStart = false;
    // }
  }

  moveToNextRow() {
    console.log(
      'Row: ',
      this.i,
      this.rowCount,
      'Start: ',
      this.start,
      this.j - 1
    );
    this.i++;
    this.j = this.start;
    this.foundStart = false;
    this.rowCount = 0;
  }

  receiveFeedback(feedback) {
    // this.map[this.i][this.j] = feedback;
    if (feedback === 1) this.rowCount++;
    if (feedback === 1 && !this.foundStart) {
      this.start = this.j;
      this.foundStart = true;
    } else if (feedback === 0 && this.foundStart) {
      this.moveToNextRow();
    } else {
      this.updatePosition();
    }
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
