import { isElement } from '../utils/is-element'
import { getDom } from './get-dom'

const getEl = value => {
  return isElement(value) ? value : getDom(value)
}

export {
  getEl
}
