import Meta from './meta';
import Controller from './controller';

class Node {
  name: string;
  controller: Controller;
  edges: Node[];
  executed: boolean;

  constructor(name: string, controller: Controller) {
    this.name = name;
    this.controller = controller;
    this.edges = [];
    this.executed = false;
  }

  addEdge(node: Node) {
    this.edges.push(node);
  }

  async run(precedingMeta?: Meta): Promise<Meta> {

    console.log(`Running node ${this.name}`);
    console.log(`Preceding meta: ${JSON.stringify(precedingMeta)}`);

    const meta = await this.controller.execute(precedingMeta || undefined);
    this.executed = true;
    return meta;
  }
}

export default Node;
