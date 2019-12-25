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
}

Grid.TILES = {
  0: 'empty',
  1: 'wall',
  2: 'block',
  3: 'horizontal paddle',
  4: 'ball'
}

module.exports = Grid;