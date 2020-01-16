const TreeNode = require('./tree_node');

/*
- Keep track of level we are on.
- Have a visited positions Set for each level 
- Potentially limit how many levels deep we go? (avoid infinite recursion)
- Terminate building move tree once we hit end point at the outermost level
- Each node might need to keep track of both its position and level and we dfs
for where it's the end position and level is 0
- Create function for if something is an outer portal based on `i` & `j` values 
*/

class MazeSolver {
  constructor(input) {
    this.grid = input;
    this.portals = this.findPortals();
    console.log(this.portals);
    this.start = this.portals['AA'];
    this.end = this.portals['ZZ'];
    this.root = new TreeNode(this.start, 0);
    this.visitedPositions = { 0: new Set() };
    this.visitedPositions[0].add(this.start.toString())
    this.buildMoveTree();
  }

  buildMoveTree() {
    const queue = [this.root];
    let foundEnd = false;
    while (!foundEnd && queue.length) {
      const currNode = queue.shift();
      const neighbors = this.neighborPos(currNode.val);
      neighbors.forEach(neighbor => {
        const neighborVal = this.valueAt(neighbor);
        if (neighborVal === '#') return;
        let level = currNode.level;

        // travel through portal
        if (this.isPortal(neighborVal)) {
          if (this.isOuterPortal(currNode.val) && level === 0) return;
          const [neighborVals] = this.neighbors(neighbor);
          let name = neighborVals.find(el => this.isPortal(el)) + neighborVal;
          if (name === 'ZZ' && level === 0) foundEnd = true;
          if (name === 'AA' || name === 'ZZ') return;
          let reversedName = name;
          if (this.portals[name].toString() === currNode.val.toString()) {
            reversedName = name.split('').reverse().join('');
            if (name === reversedName) reversedName += name[0];
          }

          level = this.isOuterPortal(currNode.val) ? level - 1 : level + 1;
          // Assuming we don't have to recurse more than 99 levels deep to avoid
          // infinite recursion
          if (level >= 99) return; 
          neighbor = this.portals[reversedName];
        }

        // add children and update visited positions
        if (!this.visitedPositions[level] || !this.visitedPositions[level].has(neighbor.toString())) {
          if (!this.visitedPositions[level]) this.visitedPositions[level] = new Set();
          this.visitedPositions[level].add(neighbor.toString());
          const nextNode = new TreeNode(neighbor, level);
          if (!nextNode) console.log(nextNode);
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

  isOuterPortal(pos) {
    return (
      pos[0] === 2 || 
      pos[0] === this.grid.length - 3 || 
      pos[1] === 2 || 
      pos[1] === this.grid[0].length - 3
    );
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
            console.log(reversedName);
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