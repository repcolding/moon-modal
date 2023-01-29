import { getWidthScrollBar } from '../helpers/get-width-scrollbar'

const widthScrollBar = getWidthScrollBar()

const showScrollBar = (cssVar) => {
  if (!document.documentElement.style.getPropertyValue(cssVar)) {
    return
  }

  document.body.style.overflow = ''
  document.body.style.paddingRight = ''

  document.documentElement.style.removeProperty(cssVar)
}

const hideScrollbar = (cssVar) => {
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${widthScrollBar}px`

  document.documentElement.style.setProperty(cssVar, `${widthScrollBar}px`)
}

export {
  showScrollBar,
  hideScrollbar
}
