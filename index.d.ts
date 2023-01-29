interface dispatch {
  open?: {
    start?: string,
    transitionEnd?: string
  },
  close?: {
    start?: string,
    transitionEnd?: string
  }
}

interface cssVars {
  sizeScrollBar?: string
}

interface options {
  modal: {
    active: string,
    associated?: object
  },
  overlay: {
    el: string | HTMLElement,
    active: string
  },
  timeout: number,
  dispatch?: dispatch,
  cssVars?: cssVars
}

declare class MoonModal {
  constructor (options: options)

  open (el: string | HTMLElement, timeout: number, hidingScrollbar: boolean): {
    prev: undefined | HTMLElement,
    current: HTMLElement
  }

  close (timeout?: number): {
    current: HTMLElement
  }

  addModifierOverlay (className: string)

  removeModifierOverlay (className: string)

  set timeout (value: number)

  get info (): {
    overlay: HTMLElement,
    active: HTMLElement,
    prev: undefined | HTMLElement,
    timeout: number
  }
}

export {
  MoonModal
}
