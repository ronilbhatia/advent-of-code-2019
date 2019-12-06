class Node {
  constructor(name, parent = null) {
    this.name = name;
    this.numChildren = 0;
    this.children = [];
    this.parent = parent;

    Node.nodes.push(this);
  }

  addChild(child) {
    this.children.push(child);
    this.numChildren += 1;
  }

  recursiveNumChildren() {
    let numChildren = this.numChildren;
    debugger
    this.children.forEach(child => numChildren += child.recursiveNumChildren());
    return numChildren;
  }

  static buildNodesFromString(str) {
    const [parent, child] = str.split(')').map(name => {
      let node = Node.nodes.find(node => node.name === name);
      if (!node) node = new Node(name);
      return node;
    });
    child.parent = parent;
    parent.addChild(child);
  }

  static totalOrbits() {
    let numChildren = 0;
    this.nodes.forEach(node => numChildren += node.recursiveNumChildren());
    return numChildren;
  }
}

Node.nodes = [];

module.exports = Node;