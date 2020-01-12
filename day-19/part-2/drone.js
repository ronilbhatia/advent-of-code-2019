class Drone {
  constructor() {
    this.map = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
    this.i = 10; // starting at 10 to avoid blank rows early that infinite loop
    this.j = 0;
    this.start = 0;
    this.foundStart = false;
    this.state = 0; // 0 => X, 1 => Y
    this.coords = new Set();
    this.rowCount = 0;
  }

  provideInput() {
    if (this.state === 0) {
      this.state++;
      return this.i;
    } else if (this.state === 1) {
      return this.j;
    } else {
      // tell machine to stop and provide answer
      return this.answer;
    }
  }

  moveToNextRow() {
    console.log(
      'Row: ',
      this.i,
      'Start: ',
      this.start,
      'End: ',
      this.j - 1,
      'Num: ',
      this.rowCount
    );
    this.i++;
    this.j = this.start;
    this.foundStart = false;
    this.rowCount = 0;
  }

  receiveFeedback(feedback) {
    if (feedback === 1) {
      this.rowCount++;
      if (this.checkPoint()) return;
      this.coords.add([this.i, this.j].toString());
    }
    if (feedback === 1 && !this.foundStart) {
      this.start = this.j;
      this.foundStart = true;
    } else if (feedback === 0 && this.foundStart) {
      this.moveToNextRow();
    } else {
      this.j++;
    }
    this.state = 0;
  }

  checkPoint() {
    const topLeft = [this.i - 99, this.j - 99].toString();
    const topRight = [this.i, this.j - 99].toString();
    const bottomLeft = [this.i - 99, this.j].toString();
    if (
      this.coords.has(topLeft) &&
      this.coords.has(topRight) &&
      this.coords.has(bottomLeft)
    ) {
      this.state = 2;
      this.answer = topLeft;
      return true;
    }
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
