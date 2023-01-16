// TTC boxes where you can put marks --> nodes
// entaglements between 2 boxes where you put the marks --> edges

// node id is the tic tac toe square, by number
// nodes contain a list of all the connections (edges)
// edges have two nodes that they connect, plus the mark

class GNode {
  id: number;
  edges: Array<Edge>;

  constructor(id: number) {
    this.id = id;
    this.edges = [];
  }
}

class Edge {
  start: GNode;
  end: GNode;
  spooky: string;

  constructor(start: GNode, end: GNode, spooky: string) {
    this.start = start;
    this.end = end;
    this.spooky = spooky; // spooky mark (e.g. X1)
  }
}

class Graph {
  nodes: Array<GNode>;
  edges: { [key: string]: Array<Edge> };

  constructor() {
    this.nodes = [];
    this.edges = {};
  }

  addNode(id: number) {
    this.nodes[id] = new GNode(id);
  }

  getNode(id: number): GNode {
    return this.nodes[id];
  }

  containsNode(id: number) {
    return this.nodes[id] ? true : false;
  }

  addEdge(start: number, end: number, spooky: string) {
    const startNode = this.getNode(start);
    const endNode = this.getNode(end);

    // need to create edges in both directions
    const edge = new Edge(startNode, endNode, spooky);
    const reverseEdge = new Edge(endNode, startNode, spooky);

    console.log(this.edges);
    const spookyEdges = this.edges[spooky]
    if (spookyEdges) {

    } else {
      this.edges =
    }

    // need to keep track of the edges from each turn (X1, O2, etc)
    // if (this.edges[spooky]) {
    //   this.edges[spooky].push(edge);
    // } else {
    //   this.edges[spooky] = [edge];
    // }

    // also need to add the edge/reverseEdge to respective nodes
    // let e = startNode.edges;
    // endNode.edges?.push(reverseEdge);
  }

  nodeCount(): number {
    return Object.keys(this.nodes).length;
  }

  checkCycle(startNodeId: number) {
    let visited = {};
  }
}

export default Graph;
