const TreeNode = require('./tree_node');

class MazeSolver {
  constructor(input) {
    this.grid = input;
    this.portals = this.findPortals();
    this.start = this.portals['AA'];
    this.end = this.portals['ZZ'];
    this.root = new TreeNode(this.start);
    this.visitedPositions = new Set();
    this.visitedPositions.add(this.start.toString())
    this.buildMoveTree();
  }

  buildMoveTree() {
    const queue = [this.root];
    const nonPortals = [' ', '#', '.'];

    while (queue.length) {
      const currNode = queue.shift();
      const neighbors = this.neighborPos(currNode.val);
      neighbors.forEach(neighbor => {
        const neighborVal = this.valueAt(neighbor);
        if (neighborVal === '#') return;

        // travel through portal
        
        if (!nonPortals.includes(neighborVal)) {
          const [neighborVals] = this.neighbors(neighbor);
          let name = neighborVals.find(el => !nonPortals.includes(el)) + neighborVal;
          if (this.portals[name].toString() === currNode.val.toString()) {
            name = name.split('').reverse().join('');
          } 
          if (name === 'AA' || name === 'ZZ') return;
          neighbor = this.portals[name];
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

  findPortals() {
    const nonPortals = [' ', '#', '.'];
    const portals = {};
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const curr = this.grid[i][j];
        if (!nonPortals.includes(curr)) {
          const [neighbors, spot] = this.neighbors([i, j])
          if (neighbors.includes('.')) {
            let name = neighbors.find(el => !nonPortals.includes(el)) + curr;
            // Complementary portal will be name reversed
            if (portals[name]) name = name.split('').reverse().join('');
            portals[name] = spot;
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