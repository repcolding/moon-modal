const getActiveClass = (
  modal: HTMLElement,
  associated: Object
): string | undefined => {
  for (const key in associated) {
    if (modal.classList.contains(key)) return associated[key]
  }

  return undefined
}

export { getActiveClass }
