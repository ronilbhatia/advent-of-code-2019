DIRECTIONS = {
  up: [0, 1],
  down: [0, -1],
  right: [1, 0],
  left: [-1, 0]
}

class PaintingRobot {
  constructor(startPanel) {
    this.currPos = [0, 0];
    this.state = 1; // which output does it have, paint color or turn dir?
    this.currPanel = startPanel; // 0 = black, 1 = white
    this.coloredPositions = {};
    this.currDir = 'up';
    this.totalPaints = 0;
  }

  receiveInstruction(instruction) {
    if (this.state === 1) {
      const posStr = this.currPos.toString();
      this.coloredPositions[posStr] = (instruction === 0) ? 0 : 1
      this.currPanel = instruction;
      this.totalPaints++;
      this.state = 2;
    } else {
      this.rotate(instruction);
      this.incrementPos();
      this.currPanel = this.coloredPositions[this.currPos.toString()] || 0;
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
    this.currPos = [this.currPos[0] + moveDiff[0], this.currPos[1] + moveDiff[1]];
  }

  spacesPainted() {
    return Object.keys(this.coloredPositions).length;
  }
  
  render() {
    const [xLow, xHigh] = this.findRange('x')
    const [yLow, yHigh] = this.findRange('y')
    
    for (let j = yHigh; j >= yLow; j--) {
      let str = ""
      for (let i = xLow; i <= xHigh; i++) {
        str += (this.coloredPositions[[i, j].toString()] === 1) ? '*' : ' ';
      }
      console.log(str);
    }
  }

  findRange(dim) {
    const coords = Object.keys(this.coloredPositions).map(coord => coord.split(','));
    const allVals = coords.map(coord => (dim === 'x') ? coord[0] : coord[1])
                          .map(val => parseInt(val));

    return [Math.min(...allVals), Math.max(...allVals)];        
  }
}

module.exports = PaintingRobot;