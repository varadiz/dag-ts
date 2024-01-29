import Node from "./node";
import Controller from "./controller";
import Meta from "./meta";
import Status from "./status";
import Source from "./source";
import Destination from "./destination";

const genesysMeta: Meta = {
  start: new Date(),
  end: null,
  status: Status.RUNNING,
  source: Source.GCS,
  destination: Destination.BQ,
  input: null,
  output: null,
  error: null,
}

class DAG {
  nodes: Map<string, Node>;
  nodeMetas: Map<Node, Meta>;

  constructor() {
    this.nodes = new Map<string, Node>();
    this.nodeMetas = new Map<Node, Meta>();
  }

  addNode(name: string, controller: Controller) {
    if (!this.nodes.has(name)) {
      this.nodes.set(name, new Node(name, controller));
    }
  }

  addEdge(from: string, to: string) {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);

    if (fromNode && toNode) {
      fromNode.addEdge(toNode);
    }
  }

  async executeTasks() {
    const inDegree: Map<Node, number> = new Map();
    const zeroInDegreeQueue: Node[] = [];

    this.nodes.forEach(node => {
      inDegree.set(node, 0);
    });

    this.nodes.forEach(node => {
      node.edges.forEach(edge => {
        inDegree.set(edge, (inDegree.get(edge) || 0) + 1);
      });
    });

    inDegree.forEach((degree, node) => {
      if (degree === 0) {
        zeroInDegreeQueue.push(node);
      }
    });

    while (zeroInDegreeQueue.length) {
      const node = zeroInDegreeQueue.shift();
      if (node) {
        // FIXME: この辺うまく行ってない
        const predecessorMetas = Array.from(this.nodeMetas.entries())
          .filter(([n, _]) => node.edges.includes(n))
          .map(([_, meta]) => meta);

        const precedingMeta = this.combineMetas(predecessorMetas);

        const meta = await node.run(precedingMeta);
        console.log(meta); // これはおｋ
        this.nodeMetas.set(node, meta);
        console.log(this.nodeMetas.values()); // これはおｋ

        node.edges.forEach(edge => {
          const edgeInDegree = (inDegree.get(edge) ?? 0) - 1;
          inDegree.set(edge, edgeInDegree);
          if (edgeInDegree === 0) {
            zeroInDegreeQueue.push(edge);
          }
        });
      }
    }

    if (Array.from(inDegree.values()).some(degree => degree > 0)) {
      throw new Error("DAG has cycle");
    }
  }

  combineMetas(metas: Meta[]): Meta {
    return metas.reduce((combined, meta) => ({ ...combined, ...meta }), genesysMeta);
  }

}

export default DAG;
