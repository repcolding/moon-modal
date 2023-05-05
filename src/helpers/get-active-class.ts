type Act = string | undefined

type Modal = HTMLElement
type Ass = Object

const getActiveClass = (modal: Modal, associated: Ass): Act => {
  for (const key in associated) {
    if (modal.classList.contains(key)) return associated[key]
  }

  return undefined
}

export { getActiveClass }
