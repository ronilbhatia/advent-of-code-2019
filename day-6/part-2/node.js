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

  ancestors() {
    if (!this.parent) return [];
    const ancestors = [this.parent];
    let currNode = this.parent;

    while (currNode.parent) {
      ancestors.push(currNode.parent);
      currNode = currNode.parent;
    }

    return ancestors;
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
    this.nodes.forEach(node => numChildren += node.recursiveNumChildren());
    return numChildren;
  }

  static orbitalTransfersBetweenNodes(you, san) {
    const youAncestors = you.ancestors();
    const sanAncestors = san.ancestors();

    let orbitalTransfers;

    for (let i = 0; i < youAncestors.length; i++) {
      const ancestor = youAncestors[i];
      if (sanAncestors.includes(ancestor)) { 
        orbitalTransfers = i + sanAncestors.indexOf(ancestor);
        break;
      }
    }  
    
    return orbitalTransfers;
  }
}

Node.nodes = {};

module.exports = Node;