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

/**
 * @typedef {Object} Edge
 * @property {GNode} start - start node
 * @property {GNode} end - end node
 * @property {string} spooky - spooky mark (e.g. X1, O2, etc)
 */
class Edge {
  start: GNode;
  end: GNode;
  spooky: string;

  constructor(start: GNode, end: GNode, spooky: string) {
    this.start = start;
    this.end = end;
    this.spooky = spooky;
  }
}

/**
 * @typedef {Object} Graph
 * @property {Record<number, GNode>} nodes - map of node ids to nodes
 * @property {Record<string, Edge[]>} edges - map of spooky marks to edges
 */

class Graph {
  nodes: Record<number, GNode>;
  edges: Record<string, Edge[]>;

  constructor() {
    this.nodes = {};
    this.edges = {};
  }

  addNode(id: number) {
    this.nodes[id] = new GNode(id);
  }

  /**
   *
   * @param id - node id (0-8)
   * @returns GNode
   */
  getNode(id: number): GNode {
    return this.nodes[id];
  }

  containsNode(id: number) {
    return this.nodes[id] ? true : false;
  }

  /**
   *
   * @param start
   * @param end
   * @param spooky
   */
  addEdge(start: number, end: number, spooky: string) {
    const startNode = this.getNode(start);
    const endNode = this.getNode(end);

    // need to create edges in both directions
    const edge = new Edge(startNode, endNode, spooky);
    const reverseEdge = new Edge(endNode, startNode, spooky);

    // need to keep track of the edges from each turn (X1, O2, etc)
    if (this.edges[spooky]) {
      this.edges[spooky].push(edge);
    } else {
      this.edges[spooky] = [edge];
    }

    // also need to add the edge/reverseEdge to respective nodes
    startNode.edges.push(edge);
    endNode.edges.push(reverseEdge);
  }

  nodeCount(): number {
    return Object.keys(this.nodes).length;
  }

  hasCycle(startId: number) {
    const cycle = this.getCycle(startId);
    return Boolean(cycle[0].length > 0);
  }

  /**
   * @param {number} startId - id of node to start cycle search from
   * @returns [cycleNodeIds, cycleEdgeKeys] - node ids and edge keys in the cycle
   * @example
   * const [cycleNodeIds, cycleEdgeSpookys] = graph.getCycle(0);
   * console.log(cycleNodeIds); // [0, 1, 2]
   * console.log(cycleEdgeKeys); // [X1, O2, X3]
   */
  getCycle(startId: number): [Array<number>, Array<string>] {
    // need at least 2 nodes to have a cycle
    if (this.nodeCount() < 2) return [[], []];

    // possible cycle length === 2
    const start = this.getNode(startId);
    // set of nodes we've visited
    let visitedNodes = new Set<GNode>();

    let endToEdge = new Map<GNode, Edge>(); // maps end node to edge

    for (let edge of start.edges) {
      if (visitedNodes.has(edge.end)) {
        return [
          [edge.start.id, edge.end.id],
          [edge.spooky, endToEdge.get(edge.end)!.spooky],
        ];
      }

      visitedNodes.add(edge.end);
      endToEdge.set(edge.end, edge);
    }

    // possible cycle length > 2
    let q = [start]; // queue of nodes to visit
    let layers = new Map<GNode, number>(); // maps node to layer
    let prev = new Map<GNode, Edge | null>(); // maps node to its associated edge

    console.log('q', q);

    layers.set(start, 0);
    prev.set(start, null);

    while (q !== undefined && q.length > 0) {
      const curr = q.shift();
      if (curr === undefined) return [[], []];

      const currEdges = curr.edges;
      let layer = layers.get(curr);

      if (currEdges === undefined || layer === undefined) return [[], []];

      for (const edge of currEdges) {
        if (layers.has(edge.end)) {
          if (layers.get(edge.end) === layer - 1)
            // node we just came from
            continue;
          else {
            return this._constructPath(edge, prev);
          }
        }

        q.push(edge.end);
        layers.set(edge.end, layer + 1);
        prev.set(edge.end, edge);
      }
    }
    return [[], []];
  }

  _constructPath(
    edge: Edge,
    prev: Map<GNode, Edge | null>
  ): [Array<number>, Array<string>] {
    let cycleNodeIds: Array<number> = [];
    let cycleEdgeKeys = [edge.spooky];
    let currNode: GNode;
    let currEdge: Edge;

    // go around one way
    currNode = edge.start;
    while (prev.get(currNode)) {
      currEdge = prev.get(currNode)!; // get edge that got us to currNode
      cycleNodeIds.push(currNode.id);
      cycleEdgeKeys.push(currEdge?.spooky || '');
      currNode = currEdge.start; // get node that currEdge started from
    }
    cycleNodeIds.push(currNode.id); // get start node only once

    // go around the other way
    currNode = edge.end;
    while (prev.get(currNode)) {
      currEdge = prev.get(currNode)!; // get edge that got us to currNode
      cycleNodeIds.unshift(currNode.id);
      cycleEdgeKeys.unshift(currEdge.spooky);
      currNode = currEdge.start; // get node that currEdge started from
    }

    return [cycleNodeIds, cycleEdgeKeys];
  }
}

export default Graph;
