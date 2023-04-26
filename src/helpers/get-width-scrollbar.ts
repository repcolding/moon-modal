const getWidthScrollBar = (): number => {
  const div = document.createElement('div')

  div.style.overflow = 'scroll'
  div.style.width = '50px'
  div.style.height = '50px'
  div.style.position = 'absolute'
  div.style.pointerEvents = 'none'

  document.body.append(div)
  const scrollWidth = div.offsetWidth - div.clientWidth

  div.remove()

  return scrollWidth
}

export { getWidthScrollBar }
