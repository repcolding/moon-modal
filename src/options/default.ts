import { modalOptions } from '../types/types'

const defaultOptions = {
  dispatch: {
    open: {
      start: 'mm:open',
      transitionEnd: 'mm:open:end'
    },
    close: {
      start: 'mm:close',
      transitionEnd: 'mm:close:end'
    }
  },
  cssVars: {
    sizeScrollBar: '--mm-scrollbar'
  },
  timeout: 200
} as modalOptions

const fillOptions = (options) => {
  return {
    ...defaultOptions,
    ...options
  }
}

export { fillOptions }
