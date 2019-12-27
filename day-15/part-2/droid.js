const Node = require('./node');

class Droid {
  constructor() {
    this.map = {};
    this.timesVisited = {};
    this.currPos = [0, 0];
    this.root = new Node([0, 0]);
    this.visitedPositions = new Set();
    this.spotted = 0;
  }

  makeMove() {
    for (let i = 0; i < Droid.MOVES.length; i++) {
      const move = Droid.MOVES[i];
      const nextPos = [this.currPos[0] + move[0], this.currPos[1] + move[1]];
      if (this.map[nextPos] === 0) continue;
      if (!this.map[nextPos]) {
        this.nextPos = nextPos;
        return i + 1;
      }
    }

    let bestMove;
    for (let i = 0; i < Droid.MOVES.length; i++) {
      const move = Droid.MOVES[i];
      const nextPos = [this.currPos[0] + move[0], this.currPos[1] + move[1]];
      if (this.map[nextPos] === 1 || this.map[nextPos] === 2) {
        if (
          !bestMove ||
          this.timesVisited[nextPos] < this.timesVisited[this.nextPos]
        ) {
          this.nextPos = nextPos;
          bestMove = i + 1;
        }
      }
    }
    if (!bestMove) console.log('Something went wrong');
    return bestMove;
  }

  updateMap(status) {
    this.map[this.nextPos] = status;
    this.timesVisited[this.nextPos] = this.timesVisited[this.nextPos]
      ? this.timesVisited[this.nextPos] + 1
      : 1;
    if (status === 1) {
      this.currPos = this.nextPos;
    } else if (status === 2) {
      this.spotted++;
      this.currPos = this.nextPos;
      this.oxygen = this.nextPos;
      if (this.spotted === 100) {
        this.drawMap();
        this.buildMoveTree();
        this.findOxygen();
        return 'HALT';
      }
    }
  }

  drawMap() {
    let arr = new Array(50).fill(0).map(el => new Array(50));
    Object.keys(this.map).forEach(coordStr => {
      let coord = coordStr.split(',').map(num => parseInt(num));
      arr[coord[0] + 20][coord[1] + 20] =
        Droid.TILES[this.map[coordStr]] || ' ';
    });

    for (let y = 0; y < arr[0].length; y++) {
      let currRow = '';
      for (let x = 0; x < arr.length; x++) {
        if (x === 20 && y === 20) {
          currRow += 'S';
        } else {
          currRow += arr[x][y] || 'U';
        }
      }
      console.log(currRow);
    }
  }

  buildMoveTree() {
    let queue = [this.root];

    while (queue.length) {
      let currNode = queue.shift();
      let currPos = currNode.val;
      Droid.MOVES.forEach(move => {
        const nextPos = [currPos[0] + move[0], currPos[1] + move[1]];
        if (
          (this.map[nextPos] === 1 || this.map[nextPos] === 2) &&
          !this.visitedPositions.has(nextPos.toString())
        ) {
          let newNode = new Node(nextPos);
          queue.push(newNode);
          this.visitedPositions.add(nextPos.toString());
          currNode.addChild(newNode);
        }
      });
    }
  }

  findOxygen() {
    let queue = [this.root];

    while (queue.length) {
      let currNode = queue.shift();
      if (currNode.val.toString() === this.oxygen.toString()) {
        this.fillAir();
        return;
      }
      currNode.children.forEach(child => queue.push(child));
    }

    return null;
  }

  fillAir() {
    this.oxygenTree = new Node(this.oxygen);
    let queue = [this.oxygenTree];
    let currNode;

    while (queue.length) {
      currNode = queue.shift();
      let currPos = currNode.val;
      Droid.MOVES.forEach(move => {
        const nextPos = [currPos[0] + move[0], currPos[1] + move[1]];
        if (this.map[nextPos] === 1) {
          let newNode = new Node(nextPos);
          currNode.addChild(newNode);
          this.map[nextPos] = 2;
          queue.push(newNode);
        }
      });
    }
    this.drawMap();
    console.log(currNode.countParents());
  }
}

Droid.MOVES = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
];

Droid.TILES = {
  0: '#',
  1: '.',
  2: 'O'
};

module.exports = Droid;
