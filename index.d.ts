interface options {
  modal: {
    active: string,
    associated?: object
  },
  overlay: {
    el: string | HTMLElement,
    active: string
  },
  timeout: number
}

declare class MoonModal {
  info: {
    current: HTMLElement,
    prev: undefined | HTMLElement
  }

  constructor (options: options)

  open (el: string | HTMLElement): {
    prev: undefined | HTMLElement,
    current: HTMLElement
  }

  close (): {
    current: HTMLElement
  }

  addModifierOverlay (className: string)

  removeModifierOverlay (className: string)

  initOuterClose ()

  destroy ()

  set timeout (value: number)
}

export {
  MoonModal
}
