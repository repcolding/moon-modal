import { getWidthScrollBar } from '../helpers/get-width-scrollbar'

const widthScrollBar = getWidthScrollBar()

const showScrollBar = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''

  document.documentElement.style.removeProperty('--scrollbar')
}

const hideScrollbar = () => {
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${widthScrollBar}px`

  document.documentElement.style.setProperty('--scrollbar', `${widthScrollBar}px`)
}

export {
  showScrollBar,
  hideScrollbar
}
