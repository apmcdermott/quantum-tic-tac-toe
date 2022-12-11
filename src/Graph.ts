// TTC boxes where you can put marks --> nodes
// entaglements between 2 boxes where you put the marks --> edges

// node id is the tic tac toe square, by number
// nodes contain a list of all the connections (edges)
// edges have two nodes that they connect, plus the mark

class GNode {
  id: number
  edges: Array<number>

  constructor(id: number) {
    this.id = id
    this.edges = []
  }
}

class Edge {
  start: number
  end: number
  spooky: string

  constructor(start, end, spooky) {
    this.start = start
    this.end = end
    this.spooky = spooky // spooky mark (e.g. X1)
  }
}

class Graph {
  nodes: Record<any, any>
  edges: Record<any, any>

  constructor() {
    this.nodes = {}
    this.edges = {}
  }

  addNode(id) {
    this.nodes[id] = new GNode(id)
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

    // need to create edges in both directions
    const edge = new Edge(startNode, endNode, spooky)
    const reverseEdge = new Edge(endNode, startNode, spooky)

    // need to keep track of the edges from each turn (X1, O2, etc)
    this.edges[spooky] = edge

    // also need to add the edge/reverseEdge to respective nodes
    startNode.edges.push(edge)
    endNode.edges.push(reverseEdge)
  }

  nodeCount(): number {
    return Object.keys(this.nodes).length
  }

  checkCycle(startNodeId: Number) {
    let visited = {}
  }
}

export default Graph
