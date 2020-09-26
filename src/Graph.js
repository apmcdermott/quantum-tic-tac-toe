// TTC boxes where you can put marks : nodes
// connection between 2 boxes where you put the marks : edges

// node id is the box no.
// nodes contain a list of all the connections (edges)
// edges have two nodes that they connect, plus the mark

class Node {
  constructor(id) {
    this.id = id
    this.edges = []
  }
}

class Edge {
  constructor(start, end, spooky) {
    this.start = start
    this.end = end
    this.spooky = spooky // spooky mark (e.g. X1)
  }
}

class Graph  {
  constructor() {
    this.nodes = {}
    this.edges = {}
  }

  addNode(id) {
    this.nodes[id] = new Node(id)
  }

  getNode(id) {
    return this.nodes[id]
  }

  containsNode(id) {
    return this.nodes[id] ? true : false
  }

  addEdge(start, end, spooky) {
    const startNode = this.getNode(start)
    const endNode = this.getNode(end)
    const edge = new Edge(startNode, endNode, spooky)

    // need to keep track of the edges from each turn (X1, O2, etc)
    this.edges[spooky] = edge

    // also need to add edge to both nodes
    startNode.edges.push(edge)
    endNode.edges.push(edge)
  }

  forEachNode(callback) {
    for (var node in this.nodes) {
      callback(node)
    }
  }
}

module.exports = Graph