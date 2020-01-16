class TreeNode {
  constructor(val, level, children = []) {
    this.val = val;
    this.level = level;
    this.children = children;
    this.parent = null;
  }

  addChild(child) {
    this.children.push(child);
    child.parent = this;
  }

  dfs(target, level) {
    if (this.val.toString() === target && this.level === level) return this;

    for (let i = 0; i < this.children.length; i++) {
      const res = this.children[i].dfs(target, level);
      if (res) return res;
    }

    return null;
  }

  countParents() {
    let parentCount = 0;
    let currNode = this;
    while (currNode.parent) {
      parentCount++;
      console.log(currNode.val, currNode.level);
      currNode = currNode.parent;
    }

    return parentCount;
  }
}

module.exports = TreeNode;