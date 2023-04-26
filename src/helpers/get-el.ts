import { isElement } from '../utils/is-element'
import { getDom } from './get-dom'

type valueType = string | HTMLElement

const getEl = (value: valueType): HTMLElement => {
  return isElement(value) ? (value as HTMLElement) : getDom(String(value))
}

export { getEl }
