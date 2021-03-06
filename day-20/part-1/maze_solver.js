const TreeNode = require('./tree_node');

class MazeSolver {
  constructor(input) {
    this.grid = input;
    this.portals = this.findPortals();
    console.log(this.portals);
    this.start = this.portals['AA'];
    this.end = this.portals['ZZ'];
    this.root = new TreeNode(this.start);
    this.visitedPositions = new Set();
    this.visitedPositions.add(this.start.toString())
    this.buildMoveTree();
  }

  buildMoveTree() {
    const queue = [this.root];

    while (queue.length) {
      const currNode = queue.shift();
      const neighbors = this.neighborPos(currNode.val);
      neighbors.forEach(neighbor => {
        const neighborVal = this.valueAt(neighbor);
        if (neighborVal === '#') return;

        // travel through portal
        if (this.isPortal(neighborVal)) {
          const [neighborVals] = this.neighbors(neighbor);
          let name = neighborVals.find(el => this.isPortal(el)) + neighborVal;
          if (name === 'AA' || name === 'ZZ') return;
          let reversedName = name;
          if (this.portals[name].toString() === currNode.val.toString()) {
            reversedName = name.split('').reverse().join('');
            if (name === reversedName) reversedName += name[0];
          }
          neighbor = this.portals[reversedName];
        }

        // add children and update visited positions
        if (!this.visitedPositions.has(neighbor.toString())) {
          this.visitedPositions.add(neighbor.toString());
          const nextNode = new TreeNode(neighbor);
          queue.push(nextNode);
          currNode.addChild(nextNode);
        }
      })
    }
  }

  isPortal(el) {
    const nonPortals = [' ', '#', '.'];
    return !nonPortals.includes(el);
  }

  findPortals() {
    const portals = {};
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const curr = this.grid[i][j];
        if (this.isPortal(curr)) {
          const [neighbors, spot] = this.neighbors([i, j])
          if (neighbors.includes('.')) {
            let name = neighbors.find(el => this.isPortal(el)) + curr;
            let reversedName = name;
            // Complementary portal will be name reversed. If name is palindrome
            // then we will make it three letters long all same letter.
            if (portals[name]) {
              reversedName = name.split('').reverse().join('');
              if (reversedName === name) reversedName += name[0];
            }
            portals[reversedName] = spot;
          }
        }
      }
    }

    return portals;
  }

  valueAt(pos) {
    return this.grid[pos[0]][pos[1]];
  }

  neighbors(pos) {
    const neighbors = [];
    let spot;

    MazeSolver.MOVE_DIRS.forEach(moveDir => {
      const nextX = moveDir[0] + pos[0];
      const nextY = moveDir[1] + pos[1];

      if (this.offGrid(nextX, nextY)) return;

      neighbors.push(this.grid[nextX][nextY]);
      if (this.grid[nextX][nextY] === '.') spot = [nextX, nextY]
    });

    return [neighbors, spot];
  }

  neighborPos(pos) {
    const neighbors = [];

    MazeSolver.MOVE_DIRS.forEach(moveDir => {
      const nextX = moveDir[0] + pos[0];
      const nextY = moveDir[1] + pos[1];

      if (this.offGrid(nextX, nextY)) return;

      neighbors.push([nextX, nextY]);
    });

    return neighbors;
  }

  offGrid(x, y) {
    return (x < 0 || y < 0 || x >= this.grid.length || y >= this.grid[0].length);
  }
}

MazeSolver.MOVE_DIRS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
];

module.exports = MazeSolver;