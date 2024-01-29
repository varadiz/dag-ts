import DbIO from "./db-io"
import StorageIO from "./storage-io"
import Status from "./status"
import Source from "./source"
import Destination from "./destination"

interface Meta {
  start: Date
  end: Date | null
  status: Status
  source: Source
  destination: Destination
  input: DbIO | StorageIO | null
  output: DbIO | StorageIO | null
  error: Error | null
}

export default Meta
