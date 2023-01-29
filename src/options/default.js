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
  }
}

const getOptions = (options) => {
  return {
    ...defaultOptions,
    ...options
  }
}

export {
  getOptions
}
