import Meta from './meta'

interface Controller {
  execute(precedingMeta?: Meta): Promise<Meta>
}

export default Controller
