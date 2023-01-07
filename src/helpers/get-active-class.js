const getListClass = modal => modal.classList.value.split(' ')

const isIncludes = (classList, key) => {
  for (const item of classList) {
    if (item === key) return true
  }

  return false
}

const getActiveClass = (modal, associated) => {
  const classList = getListClass(modal)

  for (const key in associated) {
    if (isIncludes(classList, key)) return associated[key]
  }

  return undefined
}

export {
  getActiveClass
}
