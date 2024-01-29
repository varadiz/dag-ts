import DAG from "./dag";
import OrderGcsToBq from "./controllers/order-gcs-to-bq";

const graph = new DAG();

const orderGcsToBq = new OrderGcsToBq();

graph.addNode("A", orderGcsToBq);
graph.addNode("B", orderGcsToBq);
graph.addNode("C", orderGcsToBq);
graph.addNode("D", orderGcsToBq);
graph.addNode("E", orderGcsToBq);
graph.addNode("F", orderGcsToBq);
graph.addNode("G", orderGcsToBq);
graph.addNode("H", orderGcsToBq);
graph.addNode("I", orderGcsToBq);
graph.addNode("J", orderGcsToBq);
graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("C", "F");
graph.addEdge("B", "D");
graph.addEdge("D", "E");
graph.addEdge("E", "G");
graph.addEdge("F", "G");
graph.addEdge("G", "H");
graph.addEdge("I", "J");

/**
 * A -> B -> C -> F
 *      |         |
 *      v         v
 *      D -> E -> G -> H
 *
 * I -> J
 */


(async () => {
  await graph.executeTasks();
})();
