class Node {
  constructor(val) {
    this.val = val;
    this.children = [];
    this.parent = null;
  }

  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  countParents() {
    let count = 0;
    let currNode = this;
    while (currNode.parent) {
      count++;
      currNode = currNode.parent;
    }

    return count;
  }
}

module.exports = Node;
