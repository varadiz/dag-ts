import Meta from "../meta"
import Controller from "../controller"
import Status from "../status"
import Source from "../source"
import Destination from "../destination"
import StorageIO from "../storage-io"
import DbIO from "../db-io"

class OrderGcsToBq implements Controller {
  execute = async (precedingMeta?: Meta): Promise<Meta> => {
    const meta: Meta = {
      start: new Date(),
      end: null,
      status: Status.RUNNING,
      source: Source.GCS,
      destination: Destination.BQ,
      input: precedingMeta?.output as StorageIO || "", // TODO: guard
      output: {
        tableId: `mytable`,
      } as DbIO,
      error: null,
    }

    await new Promise(resolve => setTimeout(resolve, 50));
    return meta;
  }
}

export default OrderGcsToBq
