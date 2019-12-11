DIRECTIONS = {
  up: [0, 1],
  down: [0, -1],
  right: [1, 0],
  left: [-1, 0]
}

class PaintingRobot {
  constructor() {
    this.currPos = [0, 0];
    this.state = 1; // which output does it have, paint color or turn dir?
    this.currPanel = 0; // 0 = black, 1 = white
    this.coloredPositions = { '0,0': 0 };
    this.currDir = 'up';
    this.totalPaints = 0;
  }

  receiveInstruction(instruction) {
    // console.log('Robot state: ', this.state)
    if (this.state === 1) {
      const posStr = this.currPos.toString();
      this.coloredPositions[posStr] = (instruction === 0) ? 0 : 1
      this.currPanel = instruction;
      this.totalPaints++;
      this.state = 2;
      console.log('Painted position ', this.currPos, ' ', this.currPanel, instruction);
      // console.log(this.coloredPositions);
    } else {
      this.rotate(instruction);
      console.log('Rotated ', instruction, 'now facing ', this.currDir)
      this.incrementPos();
      console.log('New position is ', this.currPos);
      this.currPanel = this.coloredPositions[this.currPos.toString()] || 0;
      console.log('Current Panel ', this.currPanel);
      this.state = 1;
    }
  }

  rotate(instruction) {
    if (instruction === 0) {
      if (this.currDir === 'up') {
        this.currDir = 'left';
      } else if (this.currDir === 'left') {
        this.currDir = 'down';
      } else if (this.currDir === 'down') {
        this.currDir = 'right';
      } else if (this.currDir === 'right') {
        this.currDir = 'up';
      }
    } else if (instruction === 1) {
      if (this.currDir === 'up') {
        this.currDir = 'right';
      } else if (this.currDir === 'right') {
        this.currDir = 'down';
      } else if (this.currDir === 'down') {
        this.currDir = 'left';
      } else if (this.currDir === 'left') {
        this.currDir = 'up';
      }
    }
  }

  incrementPos() {
    const moveDiff = DIRECTIONS[this.currDir];
    console.log(this.currPos);
    this.currPos = [this.currPos[0] + moveDiff[0], this.currPos[1] + moveDiff[1]];
  }
}

module.exports = PaintingRobot;