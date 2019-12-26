class Grid {
  constructor() {
    this.points = {}
    this.state = 1;
    this.blocks = 0;
  }

  addPoint(coord, type) {
    this.points[coord.toString()] = type;
  }

  processInstruction(instruction) {
    if (this.state === 1) {
      this.currCoord = [instruction];
    } else if (this.state === 2) {
      this.currCoord.push(instruction);
    } else {
      this.addPoint(this.currCoord, instruction);
      if (instruction === 2) this.blocks++;
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