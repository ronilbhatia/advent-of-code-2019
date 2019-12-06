class Node {
  constructor(name, parent = null) {
    this.name = name;
    this.children = [];
    this.parent = parent;

    Node.nodes[this.name] = this;
  }

  addChild(child) {
    this.children.push(child);
  }

  recursiveNumChildren() {
    let numChildren = this.children.length;
    this.children.forEach(child => numChildren += child.recursiveNumChildren());
    return numChildren;
  }

  static buildNodesFromString(str) {
    const [parent, child] = str.split(')').map(name => {
      let node = Node.nodes[name];
      if (!node) node = new Node(name);
      return node;
    });
    child.parent = parent;
    parent.addChild(child);
  }

  static totalOrbits() {
    let numChildren = 0;
    Object.values(this.nodes)
      .forEach(node => numChildren += node.recursiveNumChildren());
    return numChildren;
  }
}

Node.nodes = {};

module.exports = Node;