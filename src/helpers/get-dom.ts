const getDom = (selector: string): HTMLElement => {
  const element = document.querySelector(selector) as HTMLElement

  if (element) {
    return element
  }

  throw Error(`Элемпент не найден: ${selector}`)
}

export { getDom }
