const removeClass = (el: HTMLElement, className: string) => {
  el.classList.remove(className)
}

const addClass = (el: HTMLElement, className: string) => {
  el.classList.add(className)
}

export { removeClass, addClass }
