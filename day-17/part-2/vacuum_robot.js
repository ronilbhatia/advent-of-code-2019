class VacuumRobot {
  constructor() {
    this.currPos = [0, 0];
    this.map = {};
    this.coords = [[]];
    this.intersections = [];
    this.state = 0;
    this.states = ['MAIN', 'A', 'B', 'C', 'FEED'];
    this.pointer = 0;
    // [A, B, A, C, A, B, A, C, B, C]
    this.mainSequence = [
      65,
      44,
      66,
      44,
      65,
      44,
      67,
      44,
      65,
      44,
      66,
      44,
      65,
      44,
      67,
      44,
      66,
      44,
      67,
      10
    ];
    // [R4, L12, L8, R4]
    this.sequenceA = [
      82,
      44,
      52,
      44,
      76,
      44,
      49,
      50,
      44,
      76,
      44,
      56,
      44,
      82,
      44,
      52,
      10
    ];
    // [L8, R10, R10, R6]
    this.sequenceB = [
      76,
      44,
      56,
      44,
      82,
      44,
      49,
      48,
      44,
      82,
      44,
      49,
      48,
      44,
      82,
      44,
      54,
      10
    ];
    // [R4, R10, L12]
    this.sequenceC = [82, 44, 52, 44, 82, 44, 49, 48, 44, 76, 44, 49, 50, 10];
    this.sequences = {
      MAIN: this.mainSequence,
      A: this.sequenceA,
      B: this.sequenceB,
      C: this.sequenceC,
      FEED: [110, 10]
    };
  }

  provideInstruction() {
    const state = this.states[this.state];
    const currInstruction = this.sequences[state][this.pointer];
    this.pointer = currInstruction === 10 ? 0 : this.pointer + 1;
    if (currInstruction === 10) this.state++;
    return currInstruction;
  }

  processInput(num) {
    if (num === 10) {
      this.currPos[0]++;
      this.currPos[1] = 0;
      this.coords.push([]);
    } else {
      this.map[this.currPos] = num;
      this.currPos[1]++;
      this.coords[this.coords.length - 1].push(num);
    }
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
