type valueType = HTMLElement | string

const isElement = (value: valueType): boolean => {
  return value instanceof HTMLElement
}

export {
  isElement
}
