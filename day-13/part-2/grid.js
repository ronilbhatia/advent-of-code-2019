class Grid {
  constructor() {
    this.points = {}
    this.state = 1;
    this.ballDir = 1
    this.print = false;
  }

  addPoint(coord, type) {
    if (type === 3) this.paddle = coord;
    if (type === 4) {
      this.ballDir = this.ball ? (coord[0] > this.ball[0] ? 1 : -1) : 1
      this.ball = coord
    };
    this.points[coord.toString()] = type;
  }

  moveJoystick() {
    this.printGrid();
    if (this.ball[1] === 20) return (this.ball[0] === this.paddle[0]) ? 0 : this.ballDir;
    if (this.paddle[0] === this.ball[0]) return this.ballDir;
    if (this.paddle[0] === (this.ball[0] + this.ballDir)) return 0;
    if (this.ballDir === 1) {
      return (this.ball[0] < this.paddle[0]) ? -1 : 1;
    } else {
      return (this.ball[0] < this.paddle[0]) ? -1 : 1;
    }
  }

  processInstruction(instruction) {
    if (this.state === 1) {
      this.currCoord = [instruction];
    } else if (this.state === 2) {
      this.currCoord.push(instruction);
    } else {
      if (this.currCoord[0] === -1 && this.currCoord[1] === 0) {
        console.log(`Current Score: ${instruction}`);
      } else {
        this.addPoint(this.currCoord, instruction);
      }
    }
    this.state = (this.state % 3) + 1;
  }

  printGrid() {
    let arr = new Array(45).fill(0).map(el => new Array(23));
    Object.keys(this.points).forEach(coordStr => {
      let coord = coordStr.split(',').map(num => parseInt(num));
      arr[coord[0]][coord[1]] = Grid.TILES[this.points[coordStr]];
    });

    for (let y = 0; y < arr[0].length; y++) {
      let currRow = ''
      for (let x = 0; x < arr.length; x++) {
        currRow += arr[x][y];
      }
      console.log(currRow);
    }
  }
}

Grid.TILES = {
  0: ' ',
  1: 'W',
  2: 'B', // block
  3: 'H',
  4: 'b' // ball
}

module.exports = Grid;