class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
    this.parent = null;
  }

  addChild(child) {
    this.children.push(child);
    child.parent = this;
  }

  dfs(target) {
    if (this.val.toString() === target) return this;

    for (let i = 0; i < this.children.length; i++) {
      const res = this.children[i].dfs(target);
      if (res) return res;
    }

    return null;
  }

  countParents() {
    let parentCount = 0;
    let currNode = this;
    while (currNode.parent) {
      parentCount++;
      currNode = currNode.parent;
    }

    return parentCount;
  }
}

module.exports = TreeNode;